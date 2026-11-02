import { scale } from './shades.js';

// Colour palettes. Each palette is ONE colour and its shades (50 lightest …
// 900 darkest), generated from `base`. Change `base` and every shade follows.
// Each palette becomes a sub-section of /color; the base shade is marked with a dot.
// All values are PLACEHOLDERS — replace them with your own.

const PALETTES = [
  {
    id: 'yellow',
    name: 'Signal Yellow',
    base: '#FFD400',
    tagline: 'Our main colour. Use it for the one thing you want people to notice.',
    notes: ['Use the lighter shades for backgrounds, and the darker ones for text on yellow.'],
  },
  {
    id: 'blue',
    name: 'Blue',
    base: '#2F5BFF',
    tagline: 'Our supporting colour, for links, charts and illustrations.',
  },
  {
    id: 'grey',
    name: 'Grey',
    base: '#6E6E73',
    tagline: 'Neutrals for text, borders and backgrounds.',
  },
];

export const palettes = PALETTES.map((p) => ({
  ...p,
  colors: scale(p.base).map(({ step, hex }) => ({ hex, name: `${p.name} ${step}`, label: String(step) })),
}));

export const getPalette = (id) => palettes.find((p) => p.id === id);

export const hexToRgb = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

/** Black or white text, whichever reads better on `hex` (WCAG relative luminance). */
export const textOn = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L > 0.36 ? '#000000' : '#FFFFFF';
};

/** Every colour as a flat list, named, for downloads. */
export const flatColors = () => palettes.flatMap((p) => p.colors.map((c) => ({ palette: p.name, name: c.name, hex: c.hex })));

const cssSlug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** The palettes as CSS custom properties. */
export const paletteCss = () =>
  `:root {\n${flatColors().map((c) => `  --${cssSlug(c.name)}: ${c.hex};`).join('\n')}\n}\n`;

/** The palettes as JSON. */
export const paletteJson = () =>
  JSON.stringify(palettes.map((p) => ({ palette: p.name, base: p.base, colors: p.colors.map((c) => ({ name: c.name, hex: c.hex })) })), null, 2) + '\n';
