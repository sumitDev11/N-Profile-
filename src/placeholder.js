// Shown automatically if a photo file is missing from /public
export const PLACEHOLDER_PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c0f1e"/><stop offset="1" stop-color="#2e0710"/></linearGradient></defs>
<rect width="300" height="400" fill="url(#g)"/>
<circle cx="150" cy="150" r="58" fill="none" stroke="#d4af37" stroke-width="4" opacity=".8"/>
<path d="M60 340c10-70 50-105 90-105s80 35 90 105" fill="none" stroke="#d4af37" stroke-width="4" opacity=".8"/>
<text x="150" y="385" text-anchor="middle" font-family="serif" font-size="18" fill="#f5dd8c" opacity=".8">Photo coming soon</text>
</svg>`);

export const onImgError = (e) => {
  if (e.currentTarget.dataset.fallback) return;
  e.currentTarget.dataset.fallback = '1';
  e.currentTarget.src = PLACEHOLDER_PHOTO;
};
