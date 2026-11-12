# Nitish Kumar — Marriage Biodata

A 3D, animated, mobile-first marriage biodata website (React + Vite).

## Edit the content

Everything you see on the page comes from **`src/data.js`**: name, personal details, education, career,
family tree, contact number, WhatsApp message, footer and the website credit. Edit it and save. No design
code needs to change.

| What | Where |
| --- | --- |
| Photos (gallery) | `public/photo-full.jpg`, `public/photo2.jpg` … (listed in `media.gallery` in `data.js`) |
| Hero photo (background removed) | `public/photo-hero.webp` |
| Background music | `public/song.mp3` (plays after "Open Biodata" is tapped) |
| WhatsApp / Facebook link preview | `public/og-image.jpg` (1200 × 630) |
| Page title & preview text | `index.html` |

Keep photos under ~500 KB each so the page opens quickly on mobile data.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173 (also reachable from your phone on the same Wi-Fi)
npm run build     # production build -> dist/
npm run preview   # serve the production build at http://localhost:4173
```

Requires Node.js 20.19+ or 22.12+.

## Deploy (free)

The WhatsApp link preview needs the site's full address. On Vercel and Netlify (Git-based deploys)
it's filled in **automatically** at build time (see `vite.config.js`).

### Vercel (recommended)

1. Push this folder to GitHub.
2. On vercel.com, click **Add New → Project** and import the repository.
3. Vercel detects Vite. Keep the defaults and click **Deploy**.
4. Share the link, e.g. `https://nitish-biodata.vercel.app`.

### Netlify (from GitHub)

1. On app.netlify.com, click **Add new site → Import an existing project** and choose the repository.
2. The build settings come from `netlify.toml` (`npm run build`, publish `dist`). Click **Deploy**.

### Netlify (drag-and-drop, no GitHub)

For a drag-and-drop deploy you build on your own computer, so tell the build your site address
first, otherwise WhatsApp won't show the preview photo:

```powershell
# PowerShell (Windows): use your real Netlify address
$env:SITE_URL = "https://nitish-biodata.netlify.app"; npm run build
```

Then drag the `dist` folder onto app.netlify.com/drop.

### Custom domain

Set an environment variable `SITE_URL=https://your-domain.com` in the Vercel/Netlify project
settings and redeploy.

### Preview didn't update on WhatsApp?

WhatsApp caches previews. Share the link with `?v=2` added at the end, or check it at
<https://developers.facebook.com/tools/debug/>.

## Notes

- The page has `noindex` so it doesn't appear in Google search (it contains a phone number).
  Remove the `robots` meta tag in `index.html` if you want it searchable.
- If a phone can't run the 3D background (no WebGL), the biodata still works without it.
- Phones switched to **"Desktop site"** mode get the desktop layout (shrunk to fit), like any
  desktop website. To preview it on a computer, make the browser window ~980px wide and very tall.
- "Download PDF" uses the browser's print dialog with a dedicated print layout.

---
Website crafted by [Sumit Kumar](https://sumitkumar-website.vercel.app/)
