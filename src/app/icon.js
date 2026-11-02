import { MARK, LOGO_COLORS } from '@/data/logo';

// Favicon, drawn from the logo mark in brand.config.js.
export const contentType = 'image/svg+xml';
export const size = { width: 64, height: 64 };

export default function Icon() {
  const pad = Math.round(Math.max(MARK.w, MARK.h) * 0.08);
  const W = MARK.w + pad * 2;
  const H = MARK.h + pad * 2;
  const rects = (list) => list.map(([x, y, w, h]) => `<rect x="${x + pad}" y="${y + pad}" width="${w}" height="${h}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges"><g fill="${LOGO_COLORS.face}">${rects(MARK.face)}</g><g fill="${LOGO_COLORS.primary}">${rects(MARK.ink)}</g></svg>`;
  return new Response(svg, { headers: { 'Content-Type': contentType } });
}
