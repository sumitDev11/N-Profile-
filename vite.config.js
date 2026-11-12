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

export default defineConfig({
  plugins: [react(), injectSiteUrl()],
  build: {
    target: 'es2020',
    // three.js lives in its own lazy-loaded chunk (Scene3D) and is ~1 MB before gzip
    chunkSizeWarningLimit: 1200,
  },
});
