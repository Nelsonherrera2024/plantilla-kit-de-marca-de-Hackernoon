// Logo geometry, generated from brand.config.js.
// Pixel art is axis-aligned, so each colour layer is a set of rectangles:
// [x, y, width, height]. ink = outline / wordmark, face = the fill inside the mark.
import config from '../../brand.config.js';

const U = 10; // one pixel of the drawing = 10 viewBox units

// 5×5 pixel alphabet for the generated wordmark ('#' = on)
const FONT = {
  A: ['.###.', '#...#', '#####', '#...#', '#...#'],
  B: ['####.', '#...#', '####.', '#...#', '####.'],
  C: ['.####', '#....', '#....', '#....', '.####'],
  D: ['####.', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '####.', '#....', '#####'],
  F: ['#####', '#....', '####.', '#....', '#....'],
  G: ['.####', '#....', '#..##', '#...#', '.###.'],
  H: ['#...#', '#...#', '#####', '#...#', '#...#'],
  I: ['#####', '..#..', '..#..', '..#..', '#####'],
  J: ['..###', '...#.', '...#.', '#..#.', '.##..'],
  K: ['#...#', '#..#.', '###..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#####'],
  M: ['##.##', '#.#.#', '#.#.#', '#...#', '#...#'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '.###.'],
  P: ['####.', '#...#', '####.', '#....', '#....'],
  Q: ['.###.', '#...#', '#.#.#', '#..#.', '.##.#'],
  R: ['####.', '#...#', '####.', '#..#.', '#...#'],
  S: ['.####', '#....', '.###.', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#.#.#', '##.##', '#...#'],
  X: ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
  Y: ['#...#', '.#.#.', '..#..', '..#..', '..#..'],
  Z: ['#####', '...#.', '..#..', '.#...', '#####'],
  0: ['.###.', '#..##', '#.#.#', '##..#', '.###.'],
  1: ['.##..', '..#..', '..#..', '..#..', '.###.'],
  2: ['####.', '....#', '.###.', '#....', '#####'],
  3: ['####.', '....#', '.###.', '....#', '####.'],
  4: ['#..#.', '#..#.', '#####', '...#.', '...#.'],
  5: ['#####', '#....', '####.', '....#', '####.'],
  6: ['.###.', '#....', '####.', '#...#', '.###.'],
  7: ['#####', '....#', '...#.', '..#..', '..#..'],
  8: ['.###.', '#...#', '.###.', '#...#', '.###.'],
  9: ['.###.', '#...#', '.####', '....#', '.###.'],
  '&': ['.##..', '#..#.', '.##.#', '#..#.', '.##.#'],
  '-': ['.....', '.....', '#####', '.....', '.....'],
  '.': ['.....', '.....', '.....', '.....', '..#..'],
  '!': ['..#..', '..#..', '..#..', '.....', '..#..'],
  ' ': ['...', '...', '...', '...', '...'],
};

/** Rows of characters → merged horizontal runs per layer. */
function rowsToRects(rows, map, ox = 0, oy = 0) {
  const out = Object.fromEntries(Object.values(map).map((k) => [k, []]));
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const layer = map[row[x]];
      if (!layer) { x++; continue; }
      let len = 1;
      while (row[x + len] === row[x]) len++;
      out[layer].push([(ox + x) * U, (oy + y) * U, len * U, U]);
      x += len;
    }
  });
  return out;
}

function buildMark(rows) {
  const { ink, face } = rowsToRects(rows, { '#': 'ink', o: 'face' });
  return { w: Math.max(...rows.map((r) => r.length)) * U, h: rows.length * U, ink, face };
}

function buildWordmark(text) {
  const ink = [];
  let x = 0;
  [...text.toUpperCase()].forEach((ch, i) => {
    const g = FONT[ch] || FONT[' '];
    if (i > 0) x += 1; // letter spacing
    ink.push(...rowsToRects(g, { '#': 'ink' }, x, 0).ink);
    x += g[0].length;
  });
  return { w: Math.max(1, x) * U, h: 5 * U, ink, face: [] };
}

function buildHorizontal(mark, word) {
  const gap = 3 * U;
  const dy = Math.round((mark.h - word.h) / 2 / U) * U;
  const shift = (list, dx, oy) => list.map(([x, y, w, h]) => [x + dx, y + oy, w, h]);
  return {
    w: mark.w + gap + word.w,
    h: mark.h,
    ink: [...mark.ink, ...shift(word.ink, mark.w + gap, dy)],
    face: [...mark.face],
  };
}

export const MARK = buildMark(config.logo.mark);
export const WORDMARK = buildWordmark(config.name);
export const HORIZONTAL = buildHorizontal(MARK, WORDMARK);

export const LOGO_COLORS = {
  primary: config.logo.colors.primary,
  secondary: config.logo.colors.secondary,
  face: config.logo.colors.face,
};

export const LOGO_BACKGROUNDS = config.logo.backgrounds;
