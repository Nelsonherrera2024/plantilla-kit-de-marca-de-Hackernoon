'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import brand from '@/data/brand';
import { palettes } from '@/data/colors';
import { brandSlug } from '@/data/brand';
import { toast } from '@/lib/toast';
import Icon from '../ui/Icon';
import s from './Imagery.module.css';
import sc from './Showcases.module.css';

/* ---------- Best practices ---------- */
// PLACEHOLDER policy line — replace with your own.
const POLICY = 'Show Real Things, Made By Real People.';

export function ImageryPolicy() {
  return (
    <figure className={s.policy}>
      <p className={s.policyLabel}>Our image policy</p>
      <blockquote className={s.policyQuote}>
        {POLICY.split(' ').map((w, i) => (
          <span key={i} className={s.word} style={{ '--i': i }}>{w} </span>
        ))}
      </blockquote>
      <figcaption className={s.policyNote}>
        Prefer real photos and original illustration over stock. Credit every creator, and avoid anything that could be
        hurtful to part of our audience.
      </figcaption>
    </figure>
  );
}

/* ---------- Treatments ---------- */
// Signature treatments applied in the browser. The colours come from your palettes.
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const core = [palettes[0].base];
const ramp = (palettes[1] || palettes[0]).colors.map((c) => c.hex);

const TREATMENTS = [
  { id: 'original', label: 'Original' },
  { id: 'pixel', label: 'Pixelate' },
  { id: 'dither', label: 'Dither' },
  { id: 'duotone', label: 'Duotone' },
];

// A generated sample so the lab works before anyone drops an image in
function drawSample(ctx, W, H) {
  const g = ctx.createLinearGradient(0, 0, W, H);
  ramp.forEach((c, i) => g.addColorStop(i / Math.max(1, ramp.length - 1), c));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 14; i++) {
    const r = (k) => { const x = Math.sin(i * 91.7 + k * 7.3) * 1e4; return x - Math.floor(x); };
    ctx.fillStyle = `rgba(255,255,255,${0.15 + r(3) * 0.35})`;
    ctx.beginPath();
    ctx.arc(r(1) * W, r(2) * H, 20 + r(4) * 90, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#000';
  ctx.font = `700 ${Math.round(H * 0.22)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(brand.name, W / 2, H / 2);
}

function apply(src, out, mode) {
  const W = src.width;
  const H = src.height;
  const lowW = mode === 'pixel' ? 96 : mode === 'dither' ? 240 : W;
  const lowH = Math.round((lowW / W) * H);
  out.width = lowW;
  out.height = lowH;
  const ctx = out.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(src, 0, 0, lowW, lowH);
  if (mode === 'original' || mode === 'pixel') return;
  const img = ctx.getImageData(0, 0, lowW, lowH);
  const d = img.data;
  const [dark, light] = mode === 'dither' ? [hex(brand.colors.bg), hex(core[0])] : [hex(ramp[ramp.length - 1]), hex(ramp[0])];
  for (let y = 0; y < lowH; y++) {
    for (let x = 0; x < lowW; x++) {
      const i = (y * lowW + x) * 4;
      const l = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
      if (mode === 'dither') {
        const c = l > BAYER[(y % 4) * 4 + (x % 4)] ? light : dark;
        d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2];
      } else {
        d[i] = dark[0] + (light[0] - dark[0]) * l;
        d[i + 1] = dark[1] + (light[1] - dark[1]) * l;
        d[i + 2] = dark[2] + (light[2] - dark[2]) * l;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
}

export function Treatments() {
  const srcRef = useRef(null);
  const outRef = useRef(null);
  const fileRef = useRef(null);
  const [mode, setMode] = useState('dither');
  const [drag, setDrag] = useState(false);
  const [ready, setReady] = useState(0);

  useEffect(() => {
    const c = document.createElement('canvas');
    c.width = 960;
    c.height = 540;
    drawSample(c.getContext('2d'), c.width, c.height);
    srcRef.current = c;
    setReady((n) => n + 1);
  }, []);

  useEffect(() => {
    if (srcRef.current && outRef.current) apply(srcRef.current, outRef.current, mode);
  }, [mode, ready]);

  const load = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return toast('That isn’t an image');
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      srcRef.current = c;
      URL.revokeObjectURL(url);
      setReady((n) => n + 1);
    };
    img.src = url;
  }, []);

  const save = () => {
    const a = Object.assign(document.createElement('a'), { href: outRef.current.toDataURL('image/png'), download: `${brandSlug}-${mode}.png` });
    a.click();
  };

  return (
    <div className={s.lab}>
      <div
        className={s.labStage}
        data-drag={drag || undefined}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); load(e.dataTransfer.files[0]); }}
      >
        <canvas ref={outRef} role="img" aria-label={`Sample image with the ${mode} treatment`} />
        <button type="button" className={`${s.chip} ${s.labDrop}`} onClick={() => fileRef.current?.click()} style={{ background: '#000' }}>
          Drop or choose an image
        </button>
        <input ref={fileRef} className={s.labFile} type="file" accept="image/*" onChange={(e) => load(e.target.files[0])} tabIndex={-1} aria-hidden="true" />
      </div>
      <div className={sc.toolbar}>
        <div className={sc.seg} role="group" aria-label="Treatment">
          {TREATMENTS.map((t) => (
            <button key={t.id} type="button" aria-pressed={mode === t.id} onClick={() => setMode(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" className={sc.dl} onClick={save}>
          <Icon name="download" size={16} /> PNG
        </button>
      </div>
    </div>
  );
}

/* ---------- Do's and don'ts ---------- */
const DOS = [
  'Use real people and real work whenever you can.',
  'Credit the photographer or illustrator, every time.',
  'Leave space for the logo in a corner.',
  'Use the palette colours for overlays and backgrounds.',
];
const DONTS = [
  'Generic stock photos of handshakes and lightbulbs.',
  'Images you don’t have the rights to use.',
  'Filters that change skin tones.',
  'Text baked into images (it can’t be translated or read by screen readers).',
];

export function DosDonts() {
  return (
    <div className={s.dd}>
      <div className={s.ddCol} data-kind="do">
        <h3>✓ Do</h3>
        <ul>{DOS.map((t) => <li key={t}><span aria-hidden="true">✓</span><span>{t}</span></li>)}</ul>
      </div>
      <div className={s.ddCol} data-kind="dont">
        <h3>✕ Don’t</h3>
        <ul>{DONTS.map((t) => <li key={t}><span aria-hidden="true">✕</span><span>{t}</span></li>)}</ul>
      </div>
    </div>
  );
}
