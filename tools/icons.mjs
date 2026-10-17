/* Line icons for the "Other treatments" carousel: 64×64, drawn with strokes in currentColor. */

// a whole tooth with two roots, centred on x = 32
const TOOTH = 'M24 12c-5.5 0-9 4.2-9 10 0 4.8 1.8 8.4 3 12.4 1.4 4.8 1.6 11 3.6 15.6.8 1.8 1.9 2.6 2.9 2.6 1.8 0 2.4-2 2.9-4.6l1.4-7.6c.5-2.6 1.6-4 3.2-4s2.7 1.4 3.2 4l1.4 7.6c.5 2.6 1.1 4.6 2.9 4.6 1 0 2.1-.8 2.9-2.6 2-4.6 2.2-10.8 3.6-15.6 1.2-4 3-7.6 3-12.4 0-5.8-3.5-10-9-10-3.4 0-5.6 1.8-8 1.8S27.4 12 24 12z';
// the crown of a tooth only, flat underneath (y 14 → 32)
const CROWN = 'M24 14c-5 0-8.5 3.8-8.5 9 0 3.6 1.4 6.4 2.4 9h28.2c1-2.6 2.4-5.4 2.4-9 0-5.2-3.5-9-8.5-9-3.2 0-5.2 1.6-8 1.6S27.2 14 24 14z';
const ns = 'vector-effect="non-scaling-stroke"';
const tooth = (x = 0, y = 0, s = 1, extra = '') => `<path transform="translate(${x} ${y}) scale(${s})" ${ns} ${extra} d="${TOOTH}"/>`;
const crown = (x = 0, y = 0, s = 1, extra = '') => `<path transform="translate(${x} ${y}) scale(${s})" ${ns} ${extra} d="${CROWN}"/>`;
const star = (cx, cy, r) => `<path d="M${cx} ${cy - r}l${r * .28} ${r * .72} ${r * .72} ${r * .28}-${r * .72} ${r * .28}-${r * .28} ${r * .72}-${r * .28}-${r * .72}-${r * .72}-${r * .28} ${r * .72}-${r * .28}z"/>`;

export const icons = {
  replace: `${tooth(1, 14, .62)}${tooth(25, 14, .62, 'stroke-dasharray="3.2 3"')}<path d="M18 14c7-7 21-7 28 0"/><path d="M41.5 9.5l4.5 4.5-6 1.6"/>`,
  smile: `<path d="M8 27c7-3 15-3.6 24-.6 9-3 17-2.4 24 .6"/><path d="M8 27c6 11 14 16 24 16s18-5 24-16"/><path d="M14 30c11 4 25 4 36 0"/><path d="M21 31.6v5.4M27 32.6v7M37 32.6v7M43 31.6v5.4"/>${star(51, 12, 6)}`,
  dentures: `<path d="M12 12c-1 20 7 40 20 40s21-20 20-40"/><path d="M21 12c-.5 12 4 25 11 25s11.5-13 11-25"/>${[[16.5, 17], [17, 24.5], [18.8, 31.5], [22, 37.8], [26.6, 42.4], [32, 44], [37.4, 42.4], [42, 37.8], [45.2, 31.5], [47, 24.5], [47.5, 17]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6"/>`).join('')}`,
  fullmouth: `${[4, 18, 32, 46].map(x => crown(x - 6, 8, .44)).join('')}<rect x="6" y="24" width="52" height="7" rx="3.5"/><path d="M20 31v15M44 31v15"/><path d="M17.5 35h5M17.5 39h5M17.5 43h5M41.5 35h5M41.5 39h5M41.5 43h5"/>`,
  implant: `${crown(0, -4, 1)}<path d="M27 28v5h10v-5"/><path d="M26.5 33h11l-1.6 17.5L32 56l-3.9-5.5z"/><path d="M27 38h10M27.5 42.5h9M28 47h8"/>`,
  filling: `${tooth()}<path d="M25 19.5c3.5 3 10.5 3 14 0l-1.2 6.5c-3.6 2.2-8 2.2-11.6 0z" fill="currentColor" fill-opacity=".28"/>`,
  inlay: `${tooth()}<rect x="25.5" y="16.5" width="13" height="10" rx="2" fill="currentColor" fill-opacity=".28"/><path d="M29 21.5h6"/>`,
  crown: `${crown(0, -6, 1)}<path d="M18.6 31c.9 6.4 1.6 13 3.6 18 .8 2 2.9 2 3.5 0l2-8c.5-2 1.8-3 3.3-3s2.8 1 3.3 3l2 8c.6 2 2.7 2 3.5 0 2-5 2.7-11.6 3.6-18"/><path d="M18 31.5h28" stroke-dasharray="2.4 2.6"/>`,
  braces: `${[2, 22, 42].map(x => crown(x - 12, 10, .62)).join('')}<path d="M4 24.5h56"/>${[8.5, 28.5, 48.5].map(x => `<rect x="${x}" y="20.5" width="7" height="8" rx="1.5"/>`).join('')}<path d="M8 42c8 6 40 6 48 0" stroke-dasharray="2.4 3"/>`,
  aligner: `<path d="M9 40V29c0-5 2.4-8 5.8-8s5.8 3 5.8 8c0-5 2.4-8 5.8-8s5.8 3 5.8 8c0-5 2.4-8 5.8-8s5.8 3 5.8 8c0-5 2.4-8 5.8-8s5.8 3 5.8 8v11"/><path d="M5 42V28c0-7 4-11 9.4-11 2.6 0 4.8 1.3 6.2 3.4 1.4-2.1 3.6-3.4 6.2-3.4s4.8 1.3 6.2 3.4c1.4-2.1 3.6-3.4 6.2-3.4s4.8 1.3 6.2 3.4c1.4-2.1 3.6-3.4 6.2-3.4C55 17 59 21 59 28v14"/><path d="M5 42h54"/>`,
  rootcanal: `${tooth(0, 4, 1)}<path d="M32 2v34"/><rect x="28.5" y="2" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity=".28"/><path d="M27.2 34.5l-1.4 12M36.8 34.5l1.4 12"/>`,
  extraction: `${tooth(8, 14, .75)}<path d="M32 3v11M27 8l5-5 5 5"/><path d="M14 22c2-4 5-6 9-6M50 22c-2-4-5-6-9-6"/>`,
  gum: `${tooth(0, -2, 1)}<path d="M6 32c4.3-3.4 8.7-3.4 13 0s8.7 3.4 13 0 8.7-3.4 13 0 8.7 3.4 13 0"/><path d="M52 41s-4.5 5.4-4.5 8.3a4.5 4.5 0 0 0 9 0c0-2.9-4.5-8.3-4.5-8.3z" fill="currentColor" fill-opacity=".28"/>`,
  emergency: `${tooth(-6, 6, .9)}<path d="M28 16.5l-3.5 7.5 5.5 3-3.5 7.5"/><circle cx="51" cy="13" r="9"/><path d="M51 8v10M46 13h10"/>`,
  preventive: `<path d="M32 5l21 7.5V27c0 13.5-9 22.8-21 28-12-5.2-21-14.5-21-28V12.5z"/><path d="M22.5 30l7 7 12.5-13.5"/>`,
  laser: `${tooth(10, 12, .78)}<path d="M4 6l7 2.4L8.4 15z" fill="currentColor" fill-opacity=".28"/><path d="M10 12l14 14"/><path d="M27 21l1.5 5.5 5.5 1.5M24.5 30.5l3-1.5M33 22.5l-1.5 3"/>`,
  sedation: `${tooth(-4, 12, .78)}<path d="M53 4.5a9.5 9.5 0 1 0 7.5 15.2A8 8 0 0 1 53 4.5z"/><path d="M38 6h6l-6 7h6M43 18h4l-4 4.5h4"/>`,
  kids: `${tooth()}<path d="M27 21.5v2.5M37 21.5v2.5"/><path d="M26.5 28.5c3.2 3.4 7.8 3.4 11 0"/>`,
  cleaning: `${tooth(-8, 0, .9)}<path d="M37 59l22-22"/><path d="M33 55l10-10"/><path d="M34.5 49.5l-3-3M37.5 46.5l-3-3M40.5 43.5l-3-3"/>${star(52, 14, 5)}`,
  whitening: `${tooth(-5, 4, .92)}${star(50, 12, 7)}${star(55, 33, 4.5)}<path d="M24 20.5c1.2-2.6 3.4-4 6-4.2"/>`,
  screening: `<circle cx="27" cy="27" r="17"/><path d="M39.5 39.5L56 56" stroke-width="3.2"/>${tooth(17, 15.5, .32)}`,
  lab: `${crown(0, -2, .92)}<path d="M16 39h32l4 13H12z"/><path d="M22 39v-7M42 39v-7"/><path d="M47 4l9 9-12 4z" fill="currentColor" fill-opacity=".28"/><path d="M44 17l-6 6"/>`
};

export const iconSvg = (name, cls = 'svc-ico') =>
  `<svg class="${cls}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.preventive}</svg>`;
