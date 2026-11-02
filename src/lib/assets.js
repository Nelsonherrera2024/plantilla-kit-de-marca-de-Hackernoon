import { MARK, HORIZONTAL, WORDMARK, LOGO_COLORS } from '@/data/logo';
import { toast } from './toast';
import config from '../../brand.config.js';

export const slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'brand';

const SHAPES = { mark: MARK, horizontal: HORIZONTAL, wordmark: WORDMARK };

/** Builds a standalone SVG of the logo in any colourway. */
export function logoSvg({ variant = 'mark', ink = LOGO_COLORS.primary, face = LOGO_COLORS.face, bg = null, pad = 0 } = {}) {
  const s = SHAPES[variant];
  const p = Math.round(Math.max(s.w, s.h) * pad);
  const W = s.w + p * 2;
  const H = s.h + p * 2;
  const rects = (list) => list.map(([x, y, w, h]) => `<rect x="${x + p}" y="${y + p}" width="${w}" height="${h}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * 2}" height="${H * 2}" shape-rendering="crispEdges">${
    bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : ''
  }<g fill="${face}">${rects(s.face)}</g><g fill="${ink}">${rects(s.ink)}</g></svg>`;
}

export function downloadLogoSvg(opts = {}, name = `${slug}-${opts.variant || 'mark'}.svg`) {
  const blob = new Blob([logoSvg(opts)], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Downloaded ${name}`);
}

/** Saves any text (CSS, JSON…) as a file. */
export function downloadText(text, name, type = 'text/plain') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Downloaded ${name}`);
}
