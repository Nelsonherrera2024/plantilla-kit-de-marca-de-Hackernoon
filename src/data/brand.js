// Re-exports brand.config.js with a few derived helpers.
import config from '../../brand.config.js';
import { shade, luminance } from './shades.js';

export default config;

/** Host part of the site URL, e.g. "brand.example.com". */
export const siteHost = config.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** File-name-safe brand slug, e.g. "your-brand". */
/** File name of the downloadable kit, e.g. "your-brand-kit.zip". */
export const kitFile = `${config.kitName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'brand-kit'}.zip`;

export const brandSlug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'brand';

/**
 * CSS generated from config: brand colour tokens and one .theme-<name> class
 * per section. Sections are greys: the theme colour is the page-header surface,
 * with a light (or dark) shade of it for text and for the titles on the dark
 * home tiles. The accent colour is kept for highlights: active tabs, buttons,
 * links and focus rings on every page.
 * Theme classes use :where() so .tile-mono (and anything else) can override them.
 */
export function themeCss() {
  const c = config.colors;
  const root =
    `html:root{--brand-accent:${c.accent};--brand-accent-ink:${c.accentInk};--brand-bg:${c.bg};--brand-charcoal:${c.charcoal};--brand-paper:${c.paper};` +
    `--page-accent:${c.accent};--page-accent-ink:${c.accentInk}}`;
  const themes = Object.entries(config.themes)
    .map(([name, base]) => {
      const light = luminance(base) > 0.35;
      const on = shade(base, light ? 900 : 50);
      const pop = luminance(base) < 0.2 ? shade(base, 100) : base;
      return `:where(.theme-${name}){--surface:${base};--on:${on};--accent:${on};--muted:${on};--pop:${pop}}`;
    })
    .join('');
  return root + themes;
}

/** Black or white, whichever reads better on `hex`. */
export function inkOn(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L > 0.36 ? '#000000' : '#FFFFFF';
}
