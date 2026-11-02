// Builds public/downloads/<kit-name>.zip from brand.config.js:
// every logo as SVG (both formats × both inks) and the colour palettes as CSS and JSON.
// Usage: npm run kit   (also runs automatically before `npm run build` and `npm run dev`)
// No dependencies: the ZIP is written by hand (stored, uncompressed).
import { mkdirSync, writeFileSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import config from '../brand.config.js';
import { MARK, HORIZONTAL, WORDMARK, LOGO_COLORS } from '../src/data/logo.js';
import { paletteCss, paletteJson } from '../src/data/colors.js';

const ROOT = new URL('..', import.meta.url).pathname;
const slug = config.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'brand';
const KIT = `${config.kitName}`;

/* ---------- SVGs ---------- */
const SHAPES = { mark: MARK, horizontal: HORIZONTAL, wordmark: WORDMARK };
const svg = (shape, ink, face) => {
  const r = (list) => list.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${shape.w} ${shape.h}" width="${shape.w * 2}" height="${shape.h * 2}" shape-rendering="crispEdges"><g fill="${face}">${r(shape.face)}</g><g fill="${ink}">${r(shape.ink)}</g></svg>\n`;
};

const files = [];
for (const [variant, shape] of Object.entries(SHAPES)) {
  for (const tone of ['primary', 'secondary']) {
    files.push([`${KIT}/logos/${slug}-${variant}-${tone}.svg`, svg(shape, LOGO_COLORS[tone], LOGO_COLORS.face)]);
  }
}
files.push([`${KIT}/colors/${slug}-colors.css`, paletteCss()]);
files.push([`${KIT}/colors/${slug}-colors.json`, paletteJson()]);

// Bundle any extra files you drop into kit-extras/ (fonts, PDFs, photos…)
const EXTRAS = join(ROOT, 'kit-extras');
if (existsSync(EXTRAS)) {
  const walk = (dir, rel = '') =>
    readdirSync(dir, { withFileTypes: true }).forEach((e) => {
      if (e.name.startsWith('.')) return;
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p, `${rel}${e.name}/`);
      else files.push([`${KIT}/${rel}${e.name}`, readFileSync(p)]);
    });
  walk(EXTRAS);
}

files.push([`${KIT}/README.txt`, `${config.kitName}\n${config.siteUrl}\n\nlogos/   ${config.name} logo files (SVG)\ncolors/  colour palettes as CSS custom properties and JSON\n\nQuestions? ${config.contactEmail}\n`]);

/* ---------- Minimal ZIP writer (store, no compression) ---------- */
const CRC = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

function zip(entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const [name, content] of entries) {
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const fname = Buffer.from(name);
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(0, 8); // stored
    local.writeUInt32LE(0x00210000, 10); // 1980-01-01 (keeps builds reproducible)
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(fname.length, 26);
    locals.push(local, fname, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt32LE(0x00210000, 12);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(fname.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, fname);
    offset += 30 + fname.length + data.length;
  }
  const cdSize = centrals.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cdSize, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, ...centrals, end]);
}

const OUT_DIR = join(ROOT, 'public/downloads');
mkdirSync(OUT_DIR, { recursive: true });
const kitFile = `${config.kitName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'brand-kit'}.zip`;
writeFileSync(join(OUT_DIR, kitFile), zip(files));
console.log(`✓ ${files.length} files → public/downloads/${kitFile}`);
