// Shade scales: one base colour → 10 tints and shades (50 lightest … 900 darkest).
// Used by the palettes (src/data/colors.js) and the section themes (brand.config.js).

export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
// How far each step mixes toward white (−) or black (+); 500 is the base colour.
const MIX = { 50: -0.92, 100: -0.8, 200: -0.6, 300: -0.4, 400: -0.2, 500: 0, 600: 0.2, 700: 0.4, 800: 0.6, 900: 0.75 };

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (c) => '#' + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('').toUpperCase();

/** One step of a colour's shade scale, e.g. shade('#2F5BFF', 700). */
export function shade(hex, step) {
  const m = MIX[step] ?? 0;
  const target = m < 0 ? 255 : 0;
  return toHex(rgb(hex).map((v) => v + (target - v) * Math.abs(m)));
}

/** The full scale as [{ step, hex }]. */
export const scale = (hex) => STEPS.map((step) => ({ step, hex: shade(hex, step) }));

/** Relative luminance (WCAG), 0 = black, 1 = white. */
export function luminance(hex) {
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = rgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
