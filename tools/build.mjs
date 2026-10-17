/* ==========================================================================
   Origin Dental — static page generator
   Writes index.html, international-patients.html, services/*.html and doctors/*.html
   from tools/content.mjs. No dependencies:  node tools/build.mjs
   ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clinic as C, menu, services as S, doctors as D, team, leaders, reviews } from './content.mjs';
import { iconSvg } from './icons.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const hash = f => createHash('md5').update(readFileSync(join(ROOT, f))).digest('hex').slice(0, 10);
const V = { css: hash('assets/site.css'), js: hash('assets/site.js') };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const WA_TEXT = encodeURIComponent(`Hello ${C.name}, I would like to ask about an appointment.`);
const WA = `https://wa.me/${C.wa}?text=${WA_TEXT}`;
const MAP = `https://maps.google.com/maps?q=${C.lat},${C.lng}&amp;z=15&amp;output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&amp;destination=${C.lat},${C.lng}`;
// logo size from the PNG header, shown 64px tall
const png = readFileSync(join(ROOT, 'assets/img/logo.png'));
const LOGO = { w: Math.round(png.readUInt32BE(16) * 64 / png.readUInt32BE(20)), h: 64 };

/* ---------- icons (Font Awesome Free 6.5.0, CC BY 4.0; Google "G" mark) ---------- */
const SPRITE = `<!-- Icons: Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com - CC BY 4.0 -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><symbol id="i-phone" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></symbol><symbol id="i-envelope" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></symbol><symbol id="i-location-dot" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></symbol><symbol id="i-chevron-down" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></symbol><symbol id="i-chevron-right" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></symbol><symbol id="i-chevron-left" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></symbol><symbol id="i-bars" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></symbol><symbol id="i-xmark" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></symbol><symbol id="i-arrow-right" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></symbol><symbol id="i-check" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></symbol><symbol id="i-play" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></symbol><symbol id="i-pause" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></symbol><symbol id="i-circle-info" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></symbol><symbol id="i-whatsapp" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></symbol><symbol id="i-plus" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></symbol><symbol id="i-clock" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></symbol><symbol id="i-kit-medical" viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H96V32H64zm64 0V480H448V32H128zM512 480c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H480V480h32zM256 176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H320v48c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V288H208c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16h48V176z"/></symbol><symbol id="i-star" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></symbol><symbol id="i-google" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></symbol></svg>`;
const VB = { phone: '0 0 512 512', envelope: '0 0 512 512', 'location-dot': '0 0 384 512', 'chevron-down': '0 0 512 512', 'chevron-right': '0 0 320 512', 'chevron-left': '0 0 320 512', bars: '0 0 448 512', xmark: '0 0 384 512', 'arrow-right': '0 0 448 512', check: '0 0 448 512', play: '0 0 384 512', pause: '0 0 320 512', 'circle-info': '0 0 512 512', whatsapp: '0 0 448 512', plus: '0 0 448 512', clock: '0 0 512 512', 'kit-medical': '0 0 576 512', star: '0 0 576 512', google: '0 0 48 48' };
const ic = (n, extra = '') => `<i class="ic ic-${n}${extra ? ' ' + extra : ''}" aria-hidden="true"><svg viewBox="${VB[n]}"><use href="#i-${n}"/></svg></i>`;
const stars = n => `<span class="stars" aria-label="${n} out of 5 stars">${ic('star').repeat(n)}</span>`;

/* ---------- small builders ---------- */
const all = Object.keys(S);
const groupOf = slug => menu.find(m => typeof m === 'object' && m.items.includes(slug));
const priceLabel = s => s.priceText || `From ${s.price}`;
const svcImg = (R, s, sizes, eager = false) => {
  const [w, h] = s.ratio || [1200, 800];
  return `<img src="${R}assets/img/${s.image}-600.webp" srcset="${R}assets/img/${s.image}-600.webp 600w, ${R}assets/img/${s.image}.webp 1200w" sizes="${sizes}" alt="${esc(s.alt)}" width="${w}" height="${h}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}${s.pos ? ` style="object-position:${s.pos}"` : ''}>`;
};
const drImg = (R, d, sizes, eager = false) => d.round
  ? `<img src="${R}assets/img/${d.image}.webp" alt="Portrait of ${esc(d.name)}" width="320" height="320"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`
  : `<img src="${R}assets/img/${d.image}-480.webp" srcset="${R}assets/img/${d.image}-480.webp 480w, ${R}assets/img/${d.image}.webp 720w" sizes="${sizes}" alt="Portrait of ${esc(d.name)}" width="720" height="900"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
const drThumb = (R, d, size = 36) => `<img src="${R}assets/img/${d.round ? d.image + '-120' : d.image + '-240'}.webp" alt="" width="${size}" height="${size}" loading="lazy" decoding="async">`;

function serviceOptions(blank) {
  const opt = slug => `<option value="${slug}">${esc(S[slug].menu)}</option>`;
  return `<option value="not-sure">${blank}</option>` + menu.map(m => typeof m === 'object'
    ? `<optgroup label="${esc(m.label)}">${m.items.map(opt).join('')}</optgroup>` : '').join('') +
    `<optgroup label="Other treatments">${menu.filter(m => typeof m === 'string').map(opt).join('')}</optgroup>`;
}
const doctorOptions = blank => `<option value="any">${blank}</option>` + [...leaders, ...team].map(k => `<option value="${k}">${esc(D[k].name)}</option>`).join('');

/* ---------- page frame ---------- */
function head({ R, title, desc, image = 'assets/img/clinic-room.webp', ld = '', preload = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#1ba5e1">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${R}${image}">
<link rel="icon" type="image/png" href="${R}assets/img/icon-64.png">
<link rel="apple-touch-icon" href="${R}assets/img/icon-180.png">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecg.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/site.css?v=${V.css}">${preload ? `
<link rel="preload" as="image" href="${preload}" fetchpriority="high">` : ''}${ld}
</head>
<body id="top">
${SPRITE}
<a class="skip-link" href="#main">Skip to content</a>`;
}

function chrome(R, isHome, active) {
  const h = id => isHome ? `#${id}` : `${R}index.html#${id}`;
  const svc = slug => `${R}services/${slug}.html`;
  const dr = slug => `${R}doctors/${slug}.html`;
  const cur = name => active === name ? ' is-current' : '';
  const ddServices = menu.map((m, i) => typeof m === 'object'
    ? `<li class="has-sub"><button type="button" class="dd-parent" aria-expanded="false" aria-controls="dd-g${i}">${esc(m.label)}${ic('chevron-right', 'dd-chev')}</button>
            <ul class="dd dd--sub" id="dd-g${i}">${m.items.map(k => `<li><a href="${svc(k)}">${esc(S[k].menu)}</a></li>`).join('')}</ul></li>`
    : `<li><a href="${svc(m)}">${esc(S[m].menu)}</a></li>`).join('\n            ');
  const drawerServices = menu.map(m => typeof m === 'object'
    ? `<details class="sub"><summary>${esc(m.label)} ${ic('chevron-down', 'chev')}</summary>${m.items.map(k => `<a href="${svc(k)}">${esc(S[k].menu)}</a>`).join('')}</details>`
    : `<a href="${svc(m)}">${esc(S[m].menu)}</a>`).join('');
  const people = [...leaders, ...team];
  return `
<div class="topbar">
  <div class="wrap">
    <ul class="topbar-list">
      <li><a href="tel:${C.tel}">${ic('phone')}${C.phone}</a></li>
      <li class="hide-md"><a href="mailto:${C.email}">${ic('envelope')}${C.email}</a></li>
      <li class="hide-lg"><span>${ic('location-dot')}${C.address}</span></li>
    </ul>
    <div class="topbar-right">
      <span class="open-badge" data-open-badge>Mon–Sat 8 AM – 9 PM</span>
      <a class="topbar-cta" href="${h('book')}">Book appointment</a>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="${isHome ? '#top' : R + 'index.html'}"><img src="${R}assets/img/logo.webp" alt="${C.name} — Advanced dentistry, simplified" width="${LOGO.w}" height="${LOGO.h}"></a>
    <nav class="main-nav" aria-label="Main">
      <ul class="nav-links">
        <li class="has-dd${cur('about')}">
          <button type="button" class="nav-top" data-dropdown aria-expanded="false" aria-controls="dd-about">About us ${ic('chevron-down', 'chev')}</button>
          <ul class="dd" id="dd-about">
            <li><a href="${h('about')}">About ${C.name}</a></li>
            ${people.map(k => `<li><a href="${dr(k)}">${esc(D[k].name)}</a></li>`).join('\n            ')}
          </ul>
        </li>
        <li class="has-dd${cur('services')}">
          <button type="button" class="nav-top" data-dropdown aria-expanded="false" aria-controls="dd-services">Services ${ic('chevron-down', 'chev')}</button>
          <ul class="dd" id="dd-services">
            ${ddServices}
            <li class="dd-all"><a href="${R}services/index.html">View all treatments</a></li>
          </ul>
        </li>
        <li><a class="nav-top" href="${h('reviews')}">Testimonials</a></li>
        <li${active === 'intl' ? ' class="is-current"' : ''}><a class="nav-top" href="${R}international-patients.html">International patients</a></li>
        <li><a class="nav-top" href="${h('tour')}">Take a tour</a></li>
        <li class="has-dd dd-end">
          <button type="button" class="nav-top" data-dropdown aria-expanded="false" aria-controls="dd-contact">Contact us ${ic('chevron-down', 'chev')}</button>
          <ul class="dd" id="dd-contact">
            <li><a href="${h('find')}">Contact &amp; directions</a></li>
            <li><a href="${h('book')}">Book an appointment</a></li>
            <li><a href="tel:${C.tel}">Call ${C.phone}</a></li>
            <li><a href="${WA}" target="_blank" rel="noopener">Message us on WhatsApp</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${ic('bars')}</button>
  </div>
</header>
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-scrim" data-drawer-close></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer-head">
      <img src="${R}assets/img/logo.webp" alt="${C.name}" width="${Math.round(LOGO.w * .7)}" height="${Math.round(LOGO.h * .7)}">
      <button class="menu-toggle drawer-close" type="button" data-drawer-close aria-label="Close menu" style="display:grid">${ic('xmark')}</button>
    </div>
    <details><summary>About us ${ic('chevron-down', 'chev')}</summary><a href="${h('about')}">About ${C.name}</a>${people.map(k => `<a href="${dr(k)}">${esc(D[k].name)}</a>`).join('')}</details>
    <details><summary>Services ${ic('chevron-down', 'chev')}</summary>${drawerServices}<a class="drawer-all" href="${R}services/index.html">View all treatments</a></details>
    <a class="drawer-link" href="${h('reviews')}">Testimonials</a>
    <a class="drawer-link" href="${R}international-patients.html">International patients</a>
    <a class="drawer-link" href="${h('tour')}">Take a tour</a>
    <a class="drawer-link" href="${h('find')}">Contact us</a>
    <a class="btn btn-primary" href="${h('book')}">Book appointment</a>
    <a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} ${C.phone}</a>
  </div>
</div>`;
}

function foot(R, isHome) {
  const h = id => isHome ? `#${id}` : `${R}index.html#${id}`;
  const keySvc = ['implants', 'root-canal', 'braces', 'aligners', 'smile-design', 'whitening', 'full-mouth-rehabilitation', 'kids'];
  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="${isHome ? '#top' : R + 'index.html'}"><img src="${R}assets/img/logo.webp" alt="${C.name}" width="${LOGO.w}" height="${LOGO.h}" loading="lazy" decoding="async"></a>
        <p>A multispeciality dental practice in Kodambakkam, caring for Chennai families since ${C.founded}.</p>
        <a class="text-link" href="${h('reviews')}">${stars(5)} ${reviews.rating} on Google</a>
      </div>
      <div><h4>Treatments</h4><ul>${keySvc.map(k => `<li><a href="${R}services/${k}.html">${esc(S[k].menu)}</a></li>`).join('')}<li><a href="${R}services/index.html"><b>All ${all.length} treatments</b></a></li></ul></div>
      <div><h4>Our dentists</h4><ul>${[...leaders, ...team].map(k => `<li><a href="${R}doctors/${k}.html">${esc(D[k].name)}</a></li>`).join('')}</ul></div>
      <div><h4>Contact</h4><ul>
        <li>${C.address}</li>
        <li><a href="tel:${C.tel}">${C.phone}</a></li>
        <li><a href="mailto:${C.email}">${C.email}</a></li>
        <li>Mon–Sat 8 AM – 9 PM<br>Sunday 9 AM – 1 PM</li>
        <li>Emergency helpline 24/7</li>
        <li><a href="${R}international-patients.html">International patients</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> ${C.name}, Kodambakkam, Chennai.</span>
      <span>Concept website by <a href="https://www.chennaidigitalteam.com" target="_blank" rel="noopener">Chennai Digital Team</a></span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${WA}" target="_blank" rel="noopener" aria-label="Message us on WhatsApp">${ic('whatsapp')}</a>
<div class="mobile-bar">
  <a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} Call</a>
  <a class="btn btn-primary" href="${h('book')}">Book appointment</a>
</div>
<script src="${R}assets/site.js?v=${V.js}" defer></script>
</body>
</html>
`;
}

/* ---------- shared sections ---------- */
function moreTreatments(R, slugs, title = 'Other treatments') {
  return `
<section class="more" id="more-treatments" aria-labelledby="mt-title" data-carousel-box>
  <div class="more-bg" aria-hidden="true"></div>
  <div class="wrap">
    <div class="more-head">
      <h2 id="mt-title">${title}</h2>
      <div class="car-nav">
        <button class="car-btn" type="button" data-car-prev aria-label="Previous treatments">${ic('chevron-left')}</button>
        <button class="car-btn" type="button" data-car-next aria-label="Next treatments">${ic('chevron-right')}</button>
      </div>
    </div>
    <div class="car-track more-track" data-carousel data-autoplay="5000" tabindex="0" role="region" aria-label="${title}">
      ${slugs.map(k => `<a class="more-item" href="${R}services/${k}.html"><span class="more-ico">${iconSvg(S[k].icon)}</span><h3>${esc(S[k].title)}</h3><p>${esc(S[k].card)}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function reviewsBand(R) {
  return `
<section class="reviews" id="reviews" aria-labelledby="rv-title" data-carousel-box>
  <!-- PLACEHOLDER reviews for the concept site — replace with the clinic's live Google reviews before launch (see tools/content.mjs) -->
  <div class="wrap reviews-inner">
    <h2 id="rv-title" class="sr-only">What patients say about ${C.name} on Google</h2>
    <div class="rv-summary">
      <img class="rv-logo" src="${R}assets/img/icon-180.png" alt="" width="58" height="58" loading="lazy" decoding="async">
      <div>
        <b class="rv-clinic">${C.name}</b>
        <div class="rv-score"><b>${reviews.rating}</b>${stars(5)}</div>
        <span class="rv-count">Based on ${reviews.count} reviews</span>
        <span class="rv-powered">powered by <span class="g-word"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span></span>
        <a class="rv-write" href="${reviews.writeUrl}" target="_blank" rel="noopener">review us on <svg viewBox="0 0 48 48" aria-hidden="true"><use href="#i-google"/></svg></a>
      </div>
    </div>
    <div class="rv-carousel">
      <button class="rv-arrow rv-prev" type="button" data-car-prev aria-label="Previous reviews">${ic('chevron-left')}</button>
      <div class="car-track rv-track" data-carousel data-dots="rv-dots" data-autoplay="6500" tabindex="0" role="region" aria-label="Google reviews">
        ${reviews.items.map(r => `<article class="rv-card">
          <header><span class="rv-av" style="background:${r.color}">${r.name[0]}${r.guide ? '<span class="rv-guide" title="Local Guide"></span>' : ''}</span><span class="rv-who"><b>${esc(r.name)}</b><span>${r.when}</span></span><svg class="rv-g" viewBox="0 0 48 48" aria-hidden="true"><use href="#i-google"/></svg></header>
          ${stars(5)}
          <p class="rv-text" tabindex="0">${esc(r.text)}</p>
        </article>`).join('\n        ')}
      </div>
      <button class="rv-arrow rv-next" type="button" data-car-next aria-label="Next reviews">${ic('chevron-right')}</button>
    </div>
    <div class="rv-dots" id="rv-dots" aria-hidden="true"></div>
  </div>
</section>`;
}

function findUs(R, intro = "Two minutes' walk from Kodambakkam bus stop and a short auto ride from Kodambakkam railway station. Street parking is available in front of the clinic.") {
  return `
<section class="section" id="find" aria-labelledby="find-title">
  <div class="wrap">
    <div class="section-head">
      <span class="label">Location</span>
      <h2 id="find-title">Find us</h2>
      <p>${intro}</p>
    </div>
    <div class="location">
      <div class="map">
        <iframe src="${MAP}" title="Map showing ${C.name} near Kodambakkam Bus Stop, Chennai" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <div class="loc-info">
        <div><b>Address</b><span>${C.address}</span></div>
        <div><b>Reception</b><a href="tel:${C.tel}">${C.phone}</a></div>
        <div><b>Email</b><a href="mailto:${C.email}">${C.email}</a></div>
        <div><b>Opening hours</b><span class="open-badge" data-open-badge></span>
          <table class="hours"><tbody>
            ${C.hours.map(([d, n, t]) => `<tr data-day="${d}"><td>${n}</td><td>${t}</td></tr>`).join('\n            ')}
          </tbody></table>
        </div>
        <a class="btn btn-outline" href="${DIRECTIONS}" target="_blank" rel="noopener">Get directions</a>
      </div>
    </div>
  </div>
</section>`;
}

const cta = (R, title, text, bookHref) => `
    <div class="cta">
      <div><h2>${title}</h2><p>${text}</p></div>
      <div class="actions">
        <a class="btn btn-primary" href="${bookHref}">Book appointment</a>
        <a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} ${C.phone}</a>
      </div>
    </div>`;

const tCard = (R, k, sizes = '(max-width: 640px) calc(100vw - 40px), (max-width: 900px) calc(50vw - 30px), 360px') => `<a class="t-card" href="${R}services/${k}.html">
        <div class="t-card-img">${svcImg(R, S[k], sizes)}</div>
        <div class="t-card-body">
          <h3>${esc(S[k].title)}</h3>
          <p>${esc(S[k].card)}</p>
          <div class="t-card-foot"><span class="price">${S[k].priceText ? esc(S[k].priceText) : `From <b>${S[k].price}</b>`}</span><span class="text-link">Details ${ic('arrow-right')}</span></div>
        </div>
      </a>`;

const drCard = (R, k, sizes = '(max-width: 640px) calc(100vw - 40px), (max-width: 900px) calc(50vw - 30px), 360px') => {
  const d = D[k];
  return `<a class="dr-card" href="${R}doctors/${k}.html">
        <div class="dr-photo${d.round ? ' dr-photo--round' : ''}">${drImg(R, d, sizes)}</div>
        <h3>${esc(d.name)}</h3>
        <span class="dr-role">${esc(d.role)}</span>
        <span class="dr-quals">${esc(d.quals)}${d.speciality ? ` (${esc(d.speciality)})` : ''}</span>
      </a>`;
};

const crumbs = (R, trail) => `<nav class="crumbs" aria-label="Breadcrumb"><a href="${R}index.html">Home</a>${trail.map(([t, u]) => `${ic('chevron-right')}${u ? `<a href="${u}">${esc(t)}</a>` : `<span>${esc(t)}</span>`}`).join('')}</nav>`;

/* ---------- home ---------- */
function home() {
  const R = '';
  const ld = `\n<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Dentist', name: C.name, slogan: C.tagline, logo: 'assets/img/logo.png', image: 'assets/img/clinic-room.webp',
    telephone: C.phone, email: C.email, priceRange: '$$', foundingDate: String(C.founded),
    address: { '@type': 'PostalAddress', streetAddress: C.street, addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', postalCode: '600024', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: C.lat, longitude: C.lng },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '13:00' }]
  })}</script>`;
  // photo: another treatment's photo when the tile's own would not suit the crop
  const tile = (k, cls, sizes, title = S[k].title, text = '', photo = S[k]) => `<a class="tile${cls ? ' ' + cls : ''}" href="services/${k}.html">
        ${svcImg(R, { ...photo, alt: '' }, sizes)}
        <div class="tile-body">
          <h3>${esc(title)}</h3>${text ? `\n          <p>${esc(text)}</p>` : ''}
          <span class="tile-price">${S[k].priceText ? esc(S[k].priceText) : `From <b>${S[k].price}</b>`}${ic('arrow-right')}</span>
        </div>
      </a>`;
  const small = '(max-width: 640px) 252px, (max-width: 900px) calc(50vw - 25px), 327px';
  const finder = [
    ['Toothache or sensitivity', 'svc-checkups', '40% 50%', 'root-canal', 'Pain that lingers after something hot or cold, or wakes you at night, usually means the nerve inside the tooth is inflamed. A bite test and a digital X-ray show which tooth it is, and whether a filling is enough or it needs a root canal.', [['Treatment time', '60–90 minutes'], ['Visits', '1–2 visits'], ['Fee', 'From $50']]],
    ['Chipped or broken tooth', 'svc-emergency', '55% 40%', 'emergency', 'A small chip can usually be repaired with tooth-coloured bonding in one visit; a larger break may need a crown. Keep any broken piece, avoid chewing on that side, and come in the same day.', [['Availability', 'Same-day slots'], ['Helpline', 'Answered 24/7'], ['Fee', 'Consultation $8']]],
    ['Missing teeth', 'svc-implants', '50% 55%', 'implants', 'A gap lets the neighbouring teeth drift and the jawbone shrink. An implant replaces the root as well as the tooth, so the new tooth is fixed in place and the bone stays healthy.', [['Treatment time', 'About 60 minutes to place'], ['Visits', '2–3 visits over 3 months'], ['Fee', 'From $360 with crown']]],
    ['Crooked or gappy teeth', 'svc-aligners', '50% 40%', 'braces', 'Crowding, gaps and bite problems can be corrected at any age. A digital scan shows how your teeth would move before you choose between braces and clear aligners.', [['Treatment time', '6–24 months'], ['Visits', 'Reviews every 4–8 weeks'], ['Fee', 'From $400']]],
    ['Stained or yellow teeth', 'svc-whitening', '78% 50%', 'whitening', 'Stains from tea, coffee and turmeric respond well to professional whitening. We check your teeth first and tell you honestly how much lighter they are likely to get.', [['Treatment time', 'About 75 minutes'], ['Visits', '1 visit'], ['Fee', 'From $85']]],
    ['Bleeding gums', 'svc-gum-care', '62% 35%', 'gum-care', 'Bleeding when you brush is the earliest sign of gum disease, and the stage at which it can be fully reversed. A deep clean below the gumline usually settles it within a few weeks.', [['Treatment time', '45–60 minutes'], ['Visits', '1–3 visits'], ['Fee', 'From $17']]]
  ];
  const otherHome = ['dentures', 'oral-surgery', 'root-canal', 'crowns-bridges', 'fillings', 'inlays-onlays', 'full-mouth-rehabilitation', 'laser-dentistry', 'sedation-dentistry', 'teeth-cleaning', 'oral-cancer-screening', 'in-house-laboratory', 'emergency', 'teeth-replacement'];

  return head({ R, title: `${C.name} | Multispeciality Dental Clinic in Kodambakkam, Chennai`, desc: `${C.name}, Kodambakkam, Chennai — caring for families since ${C.founded}. Implants, root canals, braces and aligners, smile makeovers, dentures, laser and children's dentistry. Book online or call ${C.phone}.`, ld, preload: 'assets/media/tour-poster.webp' }) +
    chrome(R, true) + `
<main id="main">

<section class="hero-video" id="tour" aria-labelledby="hero-title">
  <h1 id="hero-title" class="sr-only">${C.name} — advanced dentistry, simplified. A multispeciality dental clinic in Kodambakkam, Chennai</h1>
  <video data-video data-after-load data-src="assets/media/tour.mp4" data-src-hd="assets/media/tour-hd.mp4" data-src-phone="assets/media/tour-phone.mp4" muted loop playsinline preload="none" poster="assets/media/tour-poster.webp" aria-label="A walk through ${C.name}: the entrance, reception, treatment rooms and the dental team"></video>
  <button class="video-btn" type="button">${ic('play')}${ic('pause').replace('aria-hidden="true"', 'aria-hidden="true" hidden')}<span data-label>Play the tour</span></button>
</section>

<section class="leaders" id="leaders" aria-labelledby="ld-title">
  <div class="wrap leaders-grid">
    <div class="leaders-copy">
      <h2 id="ld-title" class="sr-only">Our managing directors</h2>
      <p>${C.name}, established in ${C.founded}, is a multispeciality dental practice in the heart of Chennai, India. With a highly trained team of dentists and assistants, we promise to care for all the dental needs of you and your family.</p>
      <div class="years">
        <svg class="years-ico" viewBox="0 0 96 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 6C2 24 2 56 14 74M82 6c12 18 12 50 0 68"/><path transform="translate(22 6) scale(.82)" vector-effect="non-scaling-stroke" d="M24 12c-5.5 0-9 4.2-9 10 0 4.8 1.8 8.4 3 12.4 1.4 4.8 1.6 11 3.6 15.6.8 1.8 1.9 2.6 2.9 2.6 1.8 0 2.4-2 2.9-4.6l1.4-7.6c.5-2.6 1.6-4 3.2-4s2.7 1.4 3.2 4l1.4 7.6c.5 2.6 1.1 4.6 2.9 4.6 1 0 2.1-.8 2.9-2.6 2-4.6 2.2-10.8 3.6-15.6 1.2-4 3-7.6 3-12.4 0-5.8-3.5-10-9-10-3.4 0-5.6 1.8-8 1.8S27.4 12 24 12z"/></svg>
        <div><b>25+ years</b><span>of ${C.name}</span></div>
      </div>
    </div>
    <div class="leaders-docs">
      ${leaders.map(k => `<a class="leader" href="doctors/${k}.html">
        <span class="leader-photo"><img src="assets/img/${D[k].image}.webp" alt="Portrait of ${esc(D[k].name)}" width="320" height="320" decoding="async"></span>
        <h3>${esc(D[k].name)}</h3>
        <span class="leader-quals">${esc(D[k].quals)}<br>(${esc(D[k].speciality)})</span>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<div class="wrap qb-wrap">
  <form class="quick-book" id="quickBook" action="index.html#book" method="get" aria-label="Start a booking">
    <div class="qb-field"><label for="qb-service">Treatment</label><select id="qb-service" name="service">${serviceOptions('Not sure yet')}</select></div>
    <div class="qb-field"><label for="qb-doctor">Dentist</label><select id="qb-doctor" name="doctor">${doctorOptions('Any dentist')}</select></div>
    <div class="qb-field"><label for="qb-date">Preferred date</label><input id="qb-date" name="date" type="date"></div>
    <button class="btn btn-primary" type="submit">Continue booking ${ic('arrow-right')}</button>
  </form>
</div>

<section class="intro" aria-label="About ${C.name} in brief">
  <div class="wrap">
    <p class="statement">Six specialists under one roof, and one rule since ${C.founded}. <span>Every option is explained and every price agreed in writing before treatment begins.</span></p>
    <dl class="figures">
      <div><dt>Caring for Chennai since</dt><dd>${C.founded}</dd></div>
      <div><dt>Specialist dentists</dt><dd>6</dd></div>
      <div><dt>Treatments under one roof</dt><dd>${all.length}</dd></div>
      <div><dt>Emergency helpline</dt><dd>24/7</dd></div>
    </dl>
  </div>
</section>

<section class="section section--flush" id="treatments" aria-labelledby="tr-title">
  <div class="wrap">
    <div class="head-split">
      <div><span class="label">Treatments</span><h2 id="tr-title">General, specialist and cosmetic dentistry</h2></div>
      <div><p>All ${all.length} treatments are carried out in one clinic, with one patient record shared between our dentists.</p><a class="text-link" href="services/index.html">See all treatments ${ic('arrow-right')}</a></div>
    </div>
    <div class="bento">
      ${tile('implants', 'tile--lg', '(max-width: 640px) 519px, (max-width: 900px) calc(100vw - 40px), 678px', 'Dental Implants', 'Fixed, natural-looking replacements for missing teeth.')}
      ${tile('root-canal', 'tile--wide', '(max-width: 900px) calc(100vw - 40px), 552px')}
      ${tile('braces', '', small, 'Braces & Clear Aligners', '', S.aligners)}
      ${tile('whitening', '', small)}
      ${tile('checkups', '', small)}
      ${tile('smile-design', '', small, 'Smile Makeovers')}
      ${tile('gum-care', '', small, 'Gum Care')}
      ${tile('kids', '', small)}
    </div>
    <div class="urgent">
      <div><h3>In pain right now?</h3><p>We keep same-day emergency slots every day, and the helpline is answered 24 hours a day.</p></div>
      <div class="actions">
        <a class="btn btn-primary" href="tel:${C.tel}">${ic('phone')} Call ${C.phone}</a>
        <a class="btn btn-outline" href="services/emergency.html">Emergency care</a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="about" aria-labelledby="ab-title">
  <div class="wrap">
    <div class="about-photo"><img src="assets/img/clinic-suite.webp" alt="A bright treatment room at ${C.name} with a dental chair beside the window" width="1200" height="800" loading="lazy" decoding="async"></div>
    <div class="about-body">
      <div class="about-card">
        <span class="label">About the practice</span>
        <h2 id="ab-title">Caring for Chennai families since ${C.founded}</h2>
        <p>${C.name} opened in ${C.founded} as a two-chair practice beside Kodambakkam bus stop. Today six specialists and our own dental laboratory work from the same clinic and share one patient record, so the dentist treating you always has your full history.</p>
        <figure class="pull">
          <blockquote>“A fixed tooth changes how someone eats, talks and smiles. I want every patient to know exactly what that will take before we begin.”</blockquote>
          <figcaption>${drThumb(R, D['vikram-sundaram'], 46)}<span><b>Dr. Vikram Sundaram</b>Lead Implantologist</span></figcaption>
        </figure>
      </div>
      <div class="about-side">
        <ul class="ticks">
          <li>${ic('check')}<span>Consultations in Tamil, English, Hindi, Telugu, Kannada and Malayalam</span></li>
          <li>${ic('check')}<span>Open until 9 PM Monday to Saturday, and on Sunday mornings</span></li>
          <li>${ic('check')}<span>Crowns, bridges and dentures made in our in-house laboratory</span></li>
          <li>${ic('check')}<span>EMI options for larger treatments</span></li>
        </ul>
        <a class="text-link" href="#leaders">Meet our managing directors ${ic('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--flush" id="clinic" aria-labelledby="cl-title">
  <div class="wrap">
    <div class="panel tech">
      <div class="tech-media">
        <div class="video-wrap">
          <video data-video data-src="assets/media/visit.mp4" muted loop playsinline preload="none" poster="assets/media/visit-poster.webp" aria-label="A dentist showing a patient how to brush, using a teeth model"></video>
          <button class="video-btn" type="button">${ic('play')}${ic('pause').replace('aria-hidden="true"', 'aria-hidden="true" hidden')}<span data-label>Play the clip</span></button>
        </div>
        <div class="tech-photo"><img src="assets/img/clinic-room.webp" alt="A treatment room with a white dental chair beside the window" width="1200" height="800" loading="lazy" decoding="async"></div>
      </div>
      <div class="tech-copy">
        <span class="label">Inside the clinic</span>
        <h2 id="cl-title">Modern equipment, explained simply</h2>
        <p>Equipment matters most when it makes treatment easier to understand. This is what we use, and what it means for you.</p>
        <ol class="tech-list">
          <li><span class="num">01</span><div><h3>Low-dose digital X-rays</h3><p>Images appear on screen in seconds, so we can show you exactly what we see. The dose is a fraction of that from old film X-rays.</p></div></li>
          <li><span class="num">02</span><div><h3>3D CBCT scans for implants</h3><p>Every implant is planned on a 3D scan of your jaw, so the position, any bone graft and the price are settled before treatment starts.</p></div></li>
          <li><span class="num">03</span><div><h3>Intraoral scanner</h3><p>A quick digital scan replaces impression trays for crowns, veneers and aligners, and gives you a 3D model of your own teeth.</p></div></li>
          <li><span class="num">04</span><div><h3>Magnification for root canals</h3><p>Root canals are carried out under magnification with rotary instruments, for cleaner canals and shorter appointments.</p></div></li>
          <li><span class="num">05</span><div><h3>Hospital-grade sterilisation</h3><p>Instruments are sterilised in a Class B autoclave and opened from sealed pouches in front of you.</p></div></li>
        </ol>
      </div>
    </div>
  </div>
</section>
${moreTreatments(R, otherHome)}

<section class="section" id="dentists" aria-labelledby="dr-title">
  <div class="wrap">
    <div class="head-split">
      <div><span class="label">Our team</span><h2 id="dr-title">Meet your dentists</h2></div>
      <div><p>You will see the same dentist at every visit, someone who knows your history. The practice is led by our managing directors, <a href="doctors/meera-raghunathan.html">Dr. Meera Raghunathan</a> and <a href="doctors/arvind-subramanian.html">Dr. Arvind Subramanian</a>.</p></div>
    </div>
    <div class="team">
      ${team.map(k => `<a class="member" href="doctors/${k}.html">
        <div class="member-photo">${drImg(R, D[k], '(max-width: 640px) 181px, (max-width: 900px) calc(50vw - 27px), 279px')}</div>
        <h3>${esc(D[k].name)}</h3>
        <span class="member-role">${esc(D[k].role)}</span>
        <span class="member-meta">${D[k].facts[0][1]} experience<span class="hide-sm"> · ${D[k].facts[1][1]}</span></span>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--soft" id="stories" aria-labelledby="st-title">
  <div class="wrap stories" data-tabs>
    <span class="label">Patient stories</span>
    <h2 id="st-title">In our patients' words</h2>
    <div class="stories-tabs" role="tablist" aria-label="Patient stories by treatment">
      <button type="button" role="tab" id="stt-0" aria-controls="stp-0" aria-selected="true">Root canal</button>
      <button type="button" role="tab" id="stt-1" aria-controls="stp-1" aria-selected="false" tabindex="-1">Aligners</button>
      <button type="button" role="tab" id="stt-2" aria-controls="stp-2" aria-selected="false" tabindex="-1">Implants</button>
      <button type="button" role="tab" id="stt-3" aria-controls="stp-3" aria-selected="false" tabindex="-1">Children</button>
    </div>
    <figure class="story" role="tabpanel" id="stp-0" aria-labelledby="stt-0">
      <blockquote>I had put off a root canal for two years. Dr. Arjun finished it in one sitting, and all I felt was a little pressure.</blockquote>
      <figcaption><b>Nithya S.</b>Root canal treatment with Dr. Arjun Prakash</figcaption>
    </figure>
    <figure class="story" role="tabpanel" id="stp-1" aria-labelledby="stt-1">
      <blockquote>They showed me my new smile on a screen before I started aligners. Fourteen months later it looks exactly like the preview.</blockquote>
      <figcaption><b>Rahul V.</b>Clear aligners with Dr. Meera Krishnan</figcaption>
    </figure>
    <figure class="story" role="tabpanel" id="stp-2" aria-labelledby="stt-2">
      <blockquote>My mother is 68 and nervous of dentists. They explained every step in Tamil and wrote the cost down before touching anything.</blockquote>
      <figcaption><b>Karthik R.</b>Implants for his mother, with Dr. Vikram Sundaram</figcaption>
    </figure>
    <figure class="story" role="tabpanel" id="stp-3" aria-labelledby="stt-3">
      <blockquote>My daughter was frightened after a bad experience elsewhere. Dr. Meera let her ride the chair and count her own teeth first. Now she asks when she can go back.</blockquote>
      <figcaption><b>Divya M.</b>Mother of a six-year-old patient</figcaption>
    </figure>
  </div>
</section>

<section class="section" id="finder" aria-labelledby="fd-title">
  <div class="wrap finder" data-tabs>
    <div class="finder-side">
      <span class="label">Not sure what you need?</span>
      <h2 id="fd-title">Start with what you are feeling</h2>
      <p>Choose the problem closest to yours. If you are still unsure, book a consultation and we will advise you.</p>
    </div>
    <div class="finder-tabs" role="tablist" aria-label="Common dental problems" aria-orientation="vertical">
      ${finder.map(([t, img, pos], i) => `<button type="button" role="tab" id="ft-${i}" aria-controls="fp-${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}><span>${t}</span><span class="ft-pic"><img src="assets/img/${img}-240.webp" alt="" width="54" height="54" loading="lazy" decoding="async" style="object-position:${pos}"></span></button>`).join('\n      ')}
    </div>
    <div class="finder-panels">
      ${finder.map(([, , , k, text, facts], i) => {
        const d = D[S[k].doctor];
        return `<div class="finder-panel" role="tabpanel" id="fp-${i}" aria-labelledby="ft-${i}" tabindex="0">
        <span class="label">Likely treatment</span>
        <h3>${esc(k === 'braces' ? 'Braces & Clear Aligners' : S[k].title)}</h3>
        <p>${text}</p>
        <dl class="facts">${facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
        <div class="finder-doc">${drThumb(R, d, 44)}<span><b>${esc(d.name)}</b>${esc(d.role)}</span></div>
        <div class="actions">
          <a class="btn btn-primary" href="index.html?service=${k}#book">Book for this</a>
          <a class="btn btn-outline" href="services/${k}.html">About ${esc((k === 'braces' ? 'braces & clear aligners' : S[k].title).replace(/^(\w)/, c => c.toLowerCase()))}</a>
        </div>
      </div>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--soft" id="faq" aria-labelledby="hq-title">
  <div class="wrap faq-layout">
    <div class="faq-side">
      <span class="label">Questions</span>
      <h2 id="hq-title">Before your first visit</h2>
      <p>Answers to what patients most often ask us. For anything else, send us a message.</p>
      <a class="btn btn-outline" href="${WA}" target="_blank" rel="noopener">${ic('whatsapp')} Ask on WhatsApp</a>
    </div>
    <div class="faq">
      <details><summary>Will treatment hurt? ${ic('plus')}</summary><p>Most treatment is done under local anaesthetic, and we apply numbing gel before any injection. You can raise a hand to pause at any time.</p></details>
      <details><summary>I'm nervous about dentists. Can you help? ${ic('plus')}</summary><p>Yes. Tell us when you book and we will give you a longer first appointment, explain each step before we do it, and stop whenever you ask. <a href="services/sedation-dentistry.html">Conscious sedation</a> is also available.</p></details>
      <details><summary>How will I know what my treatment costs? ${ic('plus')}</summary><p>Each treatment page shows its starting price. After your examination you receive an itemised written estimate, and nothing starts until you have agreed to it.</p></details>
      <details><summary>Can I pay in instalments? ${ic('plus')}</summary><p>Yes. EMI options are available for larger treatments such as implants, braces and clear aligners. Reception can give you the monthly breakdown.</p></details>
      <details><summary>Can I get advice before I travel to Chennai? ${ic('plus')}</summary><p>Yes. Send your X-rays or photos on WhatsApp and we will outline your options and likely costs, so you can plan your visit. See <a href="international-patients.html">international patients</a>.</p></details>
      <details><summary>Is there parking near the clinic? ${ic('plus')}</summary><p>Street parking is available in front of the clinic, and we are two minutes' walk from Kodambakkam bus stop.</p></details>
    </div>
  </div>
</section>

<section class="section" id="book" aria-labelledby="bk-title">
  <div class="wrap">
    <div class="book-card">
      <div class="book-aside">
        <span class="label">Appointments</span>
        <h2 id="bk-title">Book an appointment</h2>
        <p>Send us your details and our reception team will call to confirm, usually within an hour during opening hours. For severe pain or swelling, please call us directly.</p>
        <ul class="contact-list">
          <li>${ic('phone')}<span><a href="tel:${C.tel}">${C.phone}</a><small>Reception</small></span></li>
          <li>${ic('clock')}<span><span class="open-badge" data-open-badge>Mon–Sat 8 AM – 9 PM</span><small>Sunday 9 AM – 1 PM</small></span></li>
          <li>${ic('kit-medical')}<span>Emergency helpline<small>Answered 24 hours a day</small></span></li>
        </ul>
      </div>
      <form class="book-form" id="bookForm" novalidate>
        <div class="field" data-field="name"><label for="f-name">Full name</label><input id="f-name" name="name" autocomplete="name" required><span class="err" role="alert"></span></div>
        <div class="field" data-field="phone"><label for="f-phone">Phone number</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+91 98765 43210" required><span class="err" role="alert"></span></div>
        <div class="field"><label for="f-service">Treatment</label><select id="f-service" name="service">${serviceOptions('Not sure, please advise')}</select></div>
        <div class="field"><label for="f-doctor">Preferred dentist</label><select id="f-doctor" name="doctor">${doctorOptions('No preference')}</select></div>
        <div class="field" data-field="date"><label for="f-date">Preferred date</label><input id="f-date" name="date" type="date" required><span class="err" role="alert"></span></div>
        <div class="field"><label for="f-email">Email <span class="opt">(optional)</span></label><input id="f-email" name="email" type="email" autocomplete="email"></div>
        <fieldset class="field field--full" data-field="slot">
          <legend>Preferred time</legend>
          <div class="slots">
            <input type="radio" name="slot" id="s-m" value="Morning"><label for="s-m">Morning<small>8 AM – 12 PM</small></label>
            <input type="radio" name="slot" id="s-a" value="Afternoon"><label for="s-a">Afternoon<small>12 – 4 PM</small></label>
            <input type="radio" name="slot" id="s-e" value="Evening"><label for="s-e">Evening<small>4 – 9 PM</small></label>
          </div>
          <span class="err" role="alert"></span>
        </fieldset>
        <div class="field field--full"><label for="f-note">Message <span class="opt">(optional)</span></label><textarea id="f-note" name="note" placeholder="Symptoms, questions, or anything we should know"></textarea></div>
        <div class="form-foot">
          <p>We will call to confirm your appointment. Your details are only used to arrange your visit.</p>
          <button class="btn btn-primary" type="submit">Request appointment</button>
        </div>
      </form>
    </div>
  </div>
</section>
${reviewsBand(R)}
${findUs(R)}

</main>` + `
<div class="modal" id="bookModal" aria-hidden="true">
  <div class="modal-scrim" data-modal-close></div>
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <h3 id="m-title">Thank you, we have your request</h3>
    <p>Our reception team will call you shortly to confirm your appointment.</p>
    <div class="summary">
      <div><b>Name:</b> <span id="sumName"></span></div>
      <div><b>Treatment:</b> <span id="sumService"></span></div>
      <div><b>Dentist:</b> <span id="sumDoctor"></span></div>
      <div><b>Preferred time:</b> <span id="sumWhen"></span></div>
    </div>
    <div class="modal-actions">
      <a class="btn btn-wa" id="waSend" href="https://wa.me/${C.wa}" target="_blank" rel="noopener">${ic('whatsapp')} Also send on WhatsApp</a>
      <button class="btn btn-outline" type="button" data-modal-close>Close</button>
    </div>
  </div>
</div>` + foot(R, true);
}

/* ---------- treatment page ---------- */
function servicePage(k) {
  const R = '../', s = S[k], d = D[s.doctor], g = groupOf(k);
  const book = `../index.html?service=${k}#book`;
  const others = all.filter(x => x !== k);
  return head({ R, title: `${s.title} in Chennai | ${C.name}, Kodambakkam`, desc: `${s.title} at ${C.name}, Kodambakkam, Chennai. ${s.lead} ${priceLabel(s)}.`, image: `assets/img/${s.image}.webp` }) +
    chrome(R, false, 'services') + `
<main id="main">

<section class="page-head" aria-labelledby="pg-title">
  <div class="wrap split">
    <div>
      ${crumbs(R, [['Treatments', '../services/index.html'], ...(g ? [[g.label]] : []), [s.title]])}
      <h1 id="pg-title">${esc(s.title)}</h1>
      <p class="lead">${esc(s.lead)}</p>
      <ul class="hero-facts hero-facts--page">${s.facts.map(([a, b]) => `<li><b>${a}</b>${b}</li>`).join('')}</ul>
      <div class="actions">
        <a class="btn btn-primary" href="${book}">Book a consultation</a>
        <a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} ${C.phone}</a>
      </div>
    </div>
    <div class="page-photo">${svcImg(R, s, '(max-width: 900px) 100vw, 600px', true)}</div>
  </div>
</section>

<section class="section" aria-labelledby="ab-title">
  <div class="wrap split split--top">
    <div class="prose">
      <h2 id="ab-title">About ${esc(s.aboutTitle || s.title.toLowerCase())}</h2>
      ${s.about.map((p, i) => `<p${i ? '' : ' style="margin-top:16px"'}>${esc(p)}</p>`).join('\n      ')}
    </div>
    <div class="box">
      <h3>This may be suitable if you have</h3>
      <ul class="ticks">${s.suitable.map(t => `<li>${ic('check')}<span>${esc(t)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section section--soft" aria-labelledby="of-title">
  <div class="wrap">
    <div class="section-head"><h2 id="of-title">What we offer</h2></div>
    <div class="cards-3">
      ${s.offers.map(o => `<div class="box offer"><h3>${esc(o.title)}</h3><ul>${o.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="fa-title">
  <div class="wrap">
    <div class="section-head"><h2 id="fa-title">How treatment works</h2></div>
    <ol class="steps">
      ${s.steps.map(([a, b]) => `<li><h3>${esc(a)}</h3><p>${esc(b)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="section section--soft" aria-labelledby="fq-title">
  <div class="wrap split split--top">
    <div>
      <span class="label">Your dentist</span>
      <a class="dr-strip${d.round ? ' dr-strip--round' : ''}" href="../doctors/${s.doctor}.html">
        <img src="../assets/img/${d.round ? d.image : d.image + '-240'}.webp" alt="Portrait of ${esc(d.name)}" width="${d.round ? 320 : 240}" height="${d.round ? 320 : 300}" loading="lazy" decoding="async">
        <div><h3>${esc(d.name)}</h3><p>${esc(d.role)}<br>${esc(d.quals)}${d.speciality ? ` (${esc(d.speciality)})` : ''}</p><span class="text-link">View profile ${ic('arrow-right')}</span></div>
      </a>
    </div>
    <div>
      <h2 id="fq-title" style="margin-bottom:18px">Frequently asked questions</h2>
      <div class="faq">
        ${s.faq.map(([q, a]) => `<details><summary>${esc(q)} ${ic('plus')}</summary><p>${esc(a)}</p></details>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>

<section class="section" aria-label="Book a consultation">
  <div class="wrap">${cta(R, 'Book a consultation', 'You will leave with a written treatment plan and estimate.', book)}
  </div>
</section>
${moreTreatments(R, others)}
${reviewsBand(R)}
${findUs(R)}

</main>` + foot(R, false);
}

/* ---------- all treatments ---------- */
function servicesIndex() {
  const R = '../';
  const groups = [...menu.filter(m => typeof m === 'object'), { label: 'General and specialist care', items: menu.filter(m => typeof m === 'string') }];
  return head({ R, title: `All dental treatments | ${C.name}, Kodambakkam, Chennai`, desc: `All ${all.length} treatments at ${C.name}: teeth replacement, implants, braces and aligners, root canals, oral surgery, laser, sedation, children's dentistry and more.` }) +
    chrome(R, false, 'services') + `
<main id="main">

<section class="page-head page-head--plain" aria-labelledby="pg-title">
  <div class="wrap">
    ${crumbs(R, [['Treatments']])}
    <span class="label">Treatments</span>
    <h1 id="pg-title">All treatments</h1>
    <p class="lead">${all.length} treatments under one roof, from a six-monthly check-up to a complete smile makeover. Every one is explained beforehand and priced in writing.</p>
    <nav class="jump" aria-label="Treatment groups">${groups.map((g, i) => `<a href="#g${i}">${esc(g.label)}</a>`).join('')}</nav>
  </div>
</section>
${groups.map((g, i) => `
<section class="section${i % 2 ? ' section--soft' : ''}" id="g${i}" aria-labelledby="g${i}-title">
  <div class="wrap">
    <div class="section-head"><h2 id="g${i}-title">${esc(g.label)}</h2></div>
    <div class="cards-3">
      ${g.items.map(k => tCard(R, k)).join('\n      ')}
    </div>
  </div>
</section>`).join('')}

<section class="section" aria-label="Book a consultation">
  <div class="wrap">${cta(R, 'Not sure which treatment you need?', 'Book a consultation and we will examine, explain your options and give you a written estimate.', '../index.html#book')}
  </div>
</section>
${reviewsBand(R)}
${findUs(R)}

</main>` + foot(R, false);
}

/* ---------- dentist page ---------- */
function doctorPage(k) {
  const R = '../', d = D[k];
  const first = d.short;
  const book = `../index.html?doctor=${k}#book`;
  const others = [...leaders, ...team].filter(x => x !== k);
  return head({ R, title: `${d.name}, ${d.role.split(' · ')[0]} | ${C.name}, Chennai`, desc: `${d.name} — ${d.role} at ${C.name}, Kodambakkam, Chennai. ${d.quals}${d.speciality ? ` (${d.speciality})` : ''}. ${d.facts[0][1]} experience.`, image: `assets/img/${d.image}.webp` }) +
    chrome(R, false, 'about') + `
<main id="main">

<section class="page-head" aria-labelledby="pg-title">
  <div class="wrap split">
    <div>
      ${crumbs(R, [['Our dentists', '../index.html#dentists'], [d.name]])}
      <span class="label">${esc(d.role)}</span>
      <h1 id="pg-title">${esc(d.name)}</h1>
      <p class="lead">${esc(d.quals)}${d.speciality ? ` (${esc(d.speciality)})` : ''}</p>
      <ul class="hero-facts hero-facts--page">${d.facts.map(([a, b]) => `<li><b>${a}</b>${b}</li>`).join('')}</ul>
      <div class="actions">
        <a class="btn btn-primary" href="${book}">Book with ${esc(first)}</a>
        <a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} ${C.phone}</a>
      </div>
    </div>
    <div class="page-photo ${d.round ? 'page-photo--round' : 'page-photo--portrait'}">${drImg(R, d, '(max-width: 900px) 320px, 380px', true).replace(`src="../assets/img/${d.image}-480.webp"`, `src="../assets/img/${d.image}.webp"`)}</div>
  </div>
</section>

<section class="section" aria-labelledby="ab-title">
  <div class="wrap split split--top">
    <div class="prose">
      <h2 id="ab-title">About ${esc(first)}</h2>
      ${d.about.map((p, i) => `<p${i ? '' : ' style="margin-top:16px"'}>${esc(p)}</p>`).join('\n      ')}
      <blockquote class="quote">${esc(d.quote)}<cite>${esc(d.name)}</cite></blockquote>
    </div>
    <div class="box">
      <h3 style="margin-bottom:14px">Experience and training</h3>
      <ol class="timeline">
        ${d.timeline.map(([w, b, s]) => `<li><span class="when">${w}</span><div><b>${esc(b)}</b><span>${esc(s)}</span></div></li>`).join('\n        ')}
      </ol>
      <h3 style="margin:24px 0 0">Areas of focus</h3>
      <div class="tags">${d.focus.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </div>
  </div>
</section>

<section class="section section--soft" aria-labelledby="tr-title">
  <div class="wrap">
    <div class="section-head"><h2 id="tr-title">Treatments with ${esc(first)}</h2></div>
    <div class="cards-3">
      ${d.treatments.map(t => tCard(R, t)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="od-title">
  <div class="wrap">
    <div class="section-head"><h2 id="od-title">Other dentists</h2></div>
    <div class="cards-5">
      ${others.map(o => drCard(R, o, '(max-width: 640px) calc(50vw - 30px), (max-width: 900px) calc(33vw - 30px), 210px')).join('\n      ')}
    </div>${cta(R, `Book with ${esc(first)}`, 'Choose a date and time, and we will call to confirm.', book).replace('class="cta"', 'class="cta" style="margin-top:56px"')}
  </div>
</section>
${reviewsBand(R)}
${findUs(R)}

</main>` + foot(R, false);
}

/* ---------- international patients ---------- */
function intlPage() {
  const R = '';
  const stay = [['Root canal treatment and crown', '4–5 days', 'One trip'], ['Crowns and bridges', '5–7 days', 'One trip'], ['Smile makeover with veneers', '7–10 days', 'One trip'], ['Dental implants', '3–4 days, then 5–7 days', 'Two trips, 3–4 months apart'], ['Full mouth rehabilitation', '10–14 days each', 'Two trips'], ['Clear aligners', '2–3 days', 'One trip, then video reviews'], ['Teeth whitening', '1 day', 'One trip']];
  return head({ R, title: `International patients | Dental treatment in Chennai | ${C.name}`, desc: `Planning dental treatment in Chennai from abroad? Send your X-rays on WhatsApp, get a written plan and estimate, and know exactly how long to stay. ${C.name}, Kodambakkam.`, image: 'assets/img/intl-travel.webp' }) +
    chrome(R, false, 'intl') + `
<main id="main">

<section class="page-head" aria-labelledby="pg-title">
  <div class="wrap split">
    <div>
      ${crumbs(R, [['International patients']])}
      <span class="label">International patients</span>
      <h1 id="pg-title">Dental treatment in Chennai, planned before you fly</h1>
      <p class="lead">Send us your X-rays and photos, get a written plan and estimate, then travel knowing exactly how long you need to stay.</p>
      <ul class="hero-facts hero-facts--page"><li><b>Time zone</b>IST (UTC +5:30)</li><li><b>Payment</b>Cards, UPI, bank transfer</li><li><b>Records</b>In English, emailed</li></ul>
      <div class="actions">
        <a class="btn btn-wa" href="${WA}" target="_blank" rel="noopener">${ic('whatsapp')} Send your X-rays</a>
        <a class="btn btn-outline" href="index.html#book">Book a consultation</a>
      </div>
    </div>
    <div class="page-photo"><img src="assets/img/intl-travel.webp" srcset="assets/img/intl-travel-600.webp 600w, assets/img/intl-travel.webp 1200w" sizes="(max-width: 900px) 100vw, 600px" alt="A traveller walking with a suitcase outside an airport terminal" width="1200" height="800" fetchpriority="high"></div>
  </div>
</section>

<section class="section" aria-labelledby="hw-title">
  <div class="wrap">
    <div class="section-head"><h2 id="hw-title">How it works</h2><p>Most of the planning happens before you travel, so your time in Chennai is spent on treatment, not waiting.</p></div>
    <ol class="steps steps--4">
      <li><h3>Share your records</h3><p>Send recent X-rays, photos of your teeth and a note about what you would like changed, on WhatsApp or email.</p></li>
      <li><h3>Video consultation</h3><p>The specialist talks you through the options and sends a written treatment plan, timeline and estimate in US dollars.</p></li>
      <li><h3>Treatment in Chennai</h3><p>Appointments are booked back to back, and our in-house laboratory keeps waiting time between visits to a minimum.</p></li>
      <li><h3>Aftercare at home</h3><p>You leave with your records and X-rays in English, and we stay in touch on WhatsApp for any questions.</p></li>
    </ol>
  </div>
</section>

<section class="section section--soft" aria-labelledby="st-title">
  <div class="wrap split split--top">
    <div>
      <h2 id="st-title">How long to stay</h2>
      <p class="muted" style="margin-top:12px">Typical time in Chennai for common treatments. Your written plan confirms the exact dates for your case.</p>
      <table class="stay">
        <thead><tr><th scope="col">Treatment</th><th scope="col">Time in Chennai</th><th scope="col">Trips</th></tr></thead>
        <tbody>${stay.map(([a, b, c]) => `<tr><th scope="row">${a}</th><td>${b}</td><td>${c}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="box">
      <h3>We help you with</h3>
      <ul class="ticks">${['Airport pickup on request', 'Hotels and serviced apartments nearby', 'A written estimate in US dollars', 'Long appointments that fit your trip', 'Records and X-rays for your home dentist', 'A fit-to-fly letter if you need one'].map(t => `<li>${ic('check')}<span>${t}</span></li>`).join('')}</ul>
      <a class="btn btn-primary" style="margin-top:22px" href="${WA}" target="_blank" rel="noopener">${ic('whatsapp')} Plan my visit</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="fq-title">
  <div class="wrap faq-layout">
    <div class="faq-side">
      <span class="label">Questions</span>
      <h2 id="fq-title">Travelling for treatment</h2>
      <p>If your question isn't here, message us — we usually reply within a few hours.</p>
    </div>
    <div class="faq">
      <details><summary>Can you give me a price before I travel? ${ic('plus')}</summary><p>Yes. From recent X-rays and photos we can give a written estimate. We confirm it after examining you in person, and if anything changes we agree the new cost before continuing.</p></details>
      <details><summary>How do I pay? ${ic('plus')}</summary><p>By international credit or debit card, UPI, or bank transfer. Payments are taken stage by stage as treatment is done, not all in advance.</p></details>
      <details><summary>What if I have a problem after I fly home? ${ic('plus')}</summary><p>Message us first — many questions can be answered from a photo. You leave with full records so a local dentist can help if needed, and any warranty repair on our work is done free on your next visit.</p></details>
      <details><summary>Which treatments suit a single trip? ${ic('plus')}</summary><p>Root canals, crowns, bridges, veneers, whitening and dentures can usually be completed in one trip. Implants need two trips because the bone needs three to four months to heal.</p></details>
    </div>
  </div>
</section>

<section class="section section--flush" aria-label="Contact us">
  <div class="wrap">${cta(R, 'Start planning your treatment', 'Send your X-rays on WhatsApp, or book a video consultation with one of our specialists.', 'index.html#book')}
  </div>
</section>
${reviewsBand(R)}
${findUs(R, "Ten minutes from Chennai Central by car, and about forty minutes from Chennai International Airport. Two minutes' walk from Kodambakkam bus stop.")}

</main>` + foot(R, false);
}

/* ---------- write everything ---------- */
const out = (rel, html) => { const f = join(ROOT, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); };
out('index.html', home());
out('international-patients.html', intlPage());
out('services/index.html', servicesIndex());
for (const k of all) out(`services/${k}.html`, servicePage(k));
for (const k of Object.keys(D)) out(`doctors/${k}.html`, doctorPage(k));
console.log(`built ${3 + all.length + Object.keys(D).length} pages (css ${V.css}, js ${V.js})`);
