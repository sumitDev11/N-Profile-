/**
 * Phone "Desktop site" mode fix.
 *
 * In desktop mode a phone browser lays the page out ~980px wide and then shrinks it to fit the
 * screen, so text becomes tiny and the desktop layout gets squeezed. Here we detect that case
 * (touch screen + layout much wider than the real screen) and:
 *   1. add `html.dm` → the CSS switches to the normal mobile layout (see vite.config.js), and
 *   2. zoom the page so that mobile layout fills the screen at a readable size.
 * Real desktops, laptops, tablets and normal phone browsing are not affected.
 *
 * Testing: add ?dm=412 to the URL to simulate a 412px-wide phone in desktop mode.
 */
const MIN_FAKE_WIDTH = 800; // desktop mode reports ~980px
const MAX_REAL_WIDTH = 600; // ...on a screen that is really phone-sized

function realScreenWidth() {
  const vv = window.visualViewport;
  const viaZoom = vv ? window.innerWidth * vv.scale : Infinity; // page is zoomed out to fit
  const viaScreen = window.screen && window.screen.width ? window.screen.width : Infinity;
  return Math.min(viaZoom, viaScreen);
}

export function isDesktopMode() {
  return document.documentElement.classList.contains('dm');
}

function apply() {
  const html = document.documentElement;
  const forced = Number(new URLSearchParams(window.location.search).get('dm')) || 0;
  const touch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  const real = realScreenWidth();
  const target =
    forced || (touch && window.innerWidth >= MIN_FAKE_WIDTH && real < MAX_REAL_WIDTH ? real : 0);

  if (target) {
    const width = Math.max(320, target);
    const zoom = window.innerWidth / width;
    html.classList.add('dm');
    html.style.zoom = String(zoom);
    html.style.setProperty('--dm-zoom', String(zoom)); // the 3D canvas undoes the zoom (see index.css)
    // make vw/vh (used via var(--vw)/var(--vh) in the CSS) mean the real phone screen
    html.style.setProperty('--vw', `${width / 100}px`);
    html.style.setProperty('--vh', `${window.innerHeight / zoom / 100}px`);
  } else if (html.classList.contains('dm')) {
    html.classList.remove('dm');
    html.style.zoom = '';
    html.style.removeProperty('--dm-zoom');
    html.style.removeProperty('--vw');
    html.style.removeProperty('--vh');
  }
}

export function setupDesktopMode() {
  apply();
  let t;
  const later = () => {
    clearTimeout(t);
    t = setTimeout(apply, 150);
  };
  window.addEventListener('orientationchange', later);
  window.addEventListener('load', apply);
  // the browser may apply its "zoom out to fit" a moment after start-up
  setTimeout(apply, 300);
}
