import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Full public address of the site, used for the WhatsApp/Facebook link-preview image
 * (those apps ignore relative links like "/og-image.jpg").
 * Picked up automatically on the hosting platform — no manual editing needed:
 *   - SITE_URL       : set it yourself (e.g. a custom domain) — wins over everything
 *   - Netlify        : URL  (e.g. https://nitish-biodata.netlify.app)
 *   - Vercel         : VERCEL_PROJECT_PRODUCTION_URL (e.g. nitish-biodata.vercel.app)
 * Locally it stays empty, so links fall back to relative paths.
 */
function siteUrl() {
  const raw =
    process.env.SITE_URL ||
    process.env.URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    '';
  return raw.replace(/\/+$/, '');
}

const injectSiteUrl = () => ({
  name: 'inject-site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl()),
});

/**
 * Phone "Desktop site" mode support.
 * When a phone browser is switched to desktop mode it pretends to be ~980px wide, so the normal
 * mobile media queries never match. src/desktopMode.js detects that case and adds `html.dm`.
 * This PostCSS step makes every phone/tablet rule (max-width media queries) also apply under
 * `html.dm`, and stops desktop-only rules (min-width media queries) from applying there —
 * so the phone gets its proper mobile layout without any hand-duplicated CSS.
 */
function phoneDesktopModeCss() {
  const scope = (selectorList, prefix) =>
    selectorList
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        if (/^html\b/.test(s)) return s.replace(/^html/, `html${prefix.slice(4)}`);
        if (/^:root\b/.test(s)) return s.replace(/^:root/, `:root${prefix.slice(4)}`);
        return `${prefix} ${s}`;
      })
      .join(', ');

  // 11vw -> calc(11 * var(--vw)) so desktop mode can make viewport units mean the *real* phone size
  const unitVar = { vw: '--vw', vh: '--vh', svh: '--vh', dvh: '--vh' };
  const viewportUnits = /(-?\d*\.?\d+)(vw|svh|dvh|vh)\b/g;

  return {
    postcssPlugin: 'phone-desktop-mode',
    Declaration(decl) {
      if (decl.prop === '--vw' || decl.prop === '--vh') return; // the variable definitions themselves
      if (!viewportUnits.test(decl.value)) return;
      viewportUnits.lastIndex = 0;
      decl.value = decl.value.replace(viewportUnits, (_, n, u) => `calc(${n} * var(${unitVar[u]}))`);
    },
    Once(root) {
      root.walkAtRules('media', (at) => {
        const p = at.params;
        if (/print|prefers-/.test(p)) return;
        if (/max-width/.test(p)) {
          const clones = [];
          at.each((node) => {
            if (node.type === 'rule') {
              const c = node.clone();
              c.selector = scope(node.selector, 'html.dm');
              clones.push(c);
            }
          });
          at.after(clones);
        } else if (/min-width/.test(p)) {
          at.each((node) => {
            if (node.type === 'rule') node.selector = scope(node.selector, 'html:not(.dm)');
          });
        }
      });
    },
  };
}
phoneDesktopModeCss.postcss = true;

export default defineConfig({
  plugins: [react(), injectSiteUrl()],
  css: {
    postcss: { plugins: [phoneDesktopModeCss()] },
  },
  build: {
    target: 'es2020',
    // three.js lives in its own lazy-loaded chunk (Scene3D) and is ~1 MB before gzip
    chunkSizeWarningLimit: 1200,
  },
});
