'use client';

import { useState } from 'react';
import { copyText } from '@/lib/toast';
import { downloadLogoSvg, downloadText } from '@/lib/assets';
import { palettes, paletteCss, paletteJson } from '@/data/colors';
import brand, { brandSlug, kitFile } from '@/data/brand';
import Palette from './Palette';
import { FontShowcase, TypeScale } from './Typography';
import { ImageryPolicy, Treatments, DosDonts } from './Imagery';
import { ProfileDirectory } from './Socials';
import { Introduction, Mission, Contents, Press } from './Overview';
import Logo from '../ui/Logo';
import { LOGO_COLORS, LOGO_BACKGROUNDS } from '@/data/logo';
import Icon from '../ui/Icon';
import s from './Showcases.module.css';

/* ---------- Logo ---------- */
const VARIANTS = [
  { id: 'mark', label: 'Square' },
  { id: 'horizontal', label: 'Horizontal' },
];

export function LogoPlayground() {
  const [bg, setBg] = useState(LOGO_BACKGROUNDS[0]);
  const [variant, setVariant] = useState(VARIANTS[0]);
  const [size, setSize] = useState(40);
  const width = variant.id === 'mark' ? size : Math.min(90, size * 2);
  return (
    <div className={s.playground}>
      <div className={`${s.stage}`} style={{ background: bg.bg }}>
        <div style={{ width: `${width}%` }}>
          <Logo
            key={`${variant.id}-${bg.id}`}
            variant={variant.id}
            tone={bg.tone}
            className={s.stageLogo}
            title={`${brand.name} ${variant.label.toLowerCase()} logo preview`}
          />
        </div>
      </div>
      <div className={s.toolbar}>
        <div className={s.seg} role="group" aria-label="Logo format">
          {VARIANTS.map((v) => (
            <button key={v.id} type="button" aria-pressed={v.id === variant.id} onClick={() => setVariant(v)}>
              {v.label}
            </button>
          ))}
        </div>
        <div className={s.seg} role="group" aria-label="Background">
          {LOGO_BACKGROUNDS.map((b) => (
            <button key={b.id} type="button" aria-pressed={b.id === bg.id} onClick={() => setBg(b)}>
              <i style={{ background: b.bg }} /> {b.label}
            </button>
          ))}
        </div>
        <label className={s.range}>
          <span>Size</span>
          <input type="range" min="15" max="70" value={size} onChange={(e) => setSize(+e.target.value)} />
        </label>
        <button
          type="button"
          className={s.dl}
          onClick={() =>
            downloadLogoSvg(
              { variant: variant.id, ink: LOGO_COLORS[bg.tone], bg: bg.bg, pad: 0.12 },
              `${brandSlug}-${variant.id}-${bg.tone}-on-${bg.id}.svg`,
            )
          }
        >
          <Icon name="download" size={16} /> SVG
        </button>
      </div>
    </div>
  );
}

// Every official colourway: both formats × both inks, on the background each belongs on
const COLOURWAYS = [
  { tone: 'primary', bg: brand.colors.bg, label: 'Primary' },
  { tone: 'secondary', bg: brand.colors.white, label: 'Secondary' },
];

function LogoCard({ variant, way }) {
  const name = `${brandSlug}-${variant}-${way.tone}.svg`;
  return (
    <li>
      <button type="button" className={s.dlCard} onClick={() => downloadLogoSvg({ variant, ink: LOGO_COLORS[way.tone] }, name)} aria-label={`Download ${name}`}>
        <span className={s.dlThumb} style={{ background: way.bg }} data-wide={variant !== 'mark' || undefined}>
          <Logo variant={variant} tone={way.tone} title="" className={variant === 'mark' ? s.fileImg : s.fileImgWide} />
        </span>
        <span className={s.dlMeta}>
          <span className={s.dlName}>{variant === 'mark' ? 'Mark' : 'Horizontal'} — {way.label.toLowerCase()}</span>
          <span className={s.dlExt}>SVG</span>
          <span className={s.dlGo} aria-hidden="true"><Icon name="download" size={16} /></span>
        </span>
      </button>
    </li>
  );
}

export function LogoVariations() {
  return (
    <div className={s.dlStack}>
      <ul role="list" className={s.dlFiles} data-even>
        {['mark', 'horizontal'].flatMap((v) => COLOURWAYS.map((w) => <LogoCard key={`${v}-${w.tone}`} variant={v} way={w} />))}
      </ul>
    </div>
  );
}

/* How NOT to use — rendered live */
const MISUSE = [
  { id: 'crop', label: 'Don’t crop the logo.' },
  { id: 'opacity', label: 'Don’t change the opacity of the logo.' },
  { id: 'color', label: 'Don’t change the colours of the logo.', ink: '#E83FDD', face: '#3DDC84' },
  { id: 'distort', label: 'Don’t distort the logo.' },
  { id: 'effects', label: 'Don’t add special effects to the logo.' },
  { id: 'rotate', label: 'Don’t rotate any part of the logo.' },
];
export function Misuse() {
  return (
    <>
      {/* Filter used by the "special effects" example */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <filter id="misuse-fx">
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="9" />
        </filter>
      </svg>
      <ul role="list" className={s.misuse}>
        {MISUSE.map((m) => (
          <li key={m.id}>
            <div className={s.misuseStage}>
              <div className={`${s.misuseLogo} ${s[`mis_${m.id}`] || ''}`}>
                <Logo variant="mark" tone="secondary" ink={m.ink} face={m.face} title="" />
              </div>
            </div>
            <p>
              <span aria-hidden="true">✕</span> {m.label}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

/* How to use — placement on images + colour backgrounds */
const ramp = (palettes[1] || palettes[0]).colors.map((c) => c.hex);
export function LogoUsage() {
  const [corner, setCorner] = useState('bottom');
  return (
    <div className={s.stack}>
      <h3 className={s.subhead}>1. On images</h3>
      <div className={s.placement}>
        <div className={s.placementStage} data-corner={corner}>
          <div className={s.placementPhoto} style={{ background: `linear-gradient(120deg, ${ramp.join(', ')})` }} />
          <div className={s.placementLogo}>
            <Logo variant="mark" tone="primary" title="" />
          </div>
          <span className={s.padGuide} aria-hidden="true" />
        </div>
        <div className={s.toolbar}>
          <span className={s.toolLabel}>Try it</span>
          <div className={s.seg} role="group" aria-label="Logo corner">
            {['top', 'bottom'].map((c) => (
              <button key={c} type="button" aria-pressed={corner === c} onClick={() => setCorner(c)}>
                {c === 'top' ? 'Top left' : 'Bottom left'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className={s.toolLabel}>Place the mark in the top or bottom left corner, with even padding on both sides.</p>

      <h3 className={s.subhead}>2. On colours</h3>
      <div className={s.onColors}>
        <figure className={s.colorCase}>
          <div className={s.colorStage} style={{ background: '#FFFFFF' }}>
            <Logo variant="mark" tone="primary" title="Primary logo on white (avoid)" className={s.colorLogo} />
          </div>
          <figcaption><span className={s.no} aria-hidden="true">✕</span> Avoid bright colours on bright colours.</figcaption>
        </figure>
        <figure className={s.colorCase}>
          <div className={s.colorStage} style={{ background: '#1A1A1C' }}>
            <Logo variant="mark" tone="secondary" title="Secondary logo on near-black (avoid)" className={s.colorLogo} />
          </div>
          <figcaption><span className={s.no} aria-hidden="true">✕</span> Avoid dark colours on dark colours.</figcaption>
        </figure>
        <figure className={`${s.colorCase} ${s.colorWide}`}>
          <div className={s.colorStage} style={{ background: `linear-gradient(90deg, ${ramp[0]}, ${ramp[ramp.length - 1]})` }}>
            <Logo variant="horizontal" tone="secondary" title="Logo on a saturated gradient" className={s.colorLogoWide} />
          </div>
          <figcaption><span className={s.yes} aria-hidden="true">✓</span> Saturated backgrounds are fine, as long as the logo stays easy to read.</figcaption>
        </figure>
      </div>
    </div>
  );
}

/* The story — PLACEHOLDER copy */
export function LogoStory() {
  return (
    <div className={s.history}>
      <div className={s.historyBody}>
        <div className={s.historyText}>
          <p>
            Placeholder: tell the story of your logo here. Who designed it, when, and what problem it solved.
          </p>
          <p>
            Explain the idea behind the shape. This one is a sparkle inside a rounded badge, drawn on an{' '}
            {brand.logo.mark.length}×{brand.logo.mark.length} pixel grid, because the brand is about small moments of
            delight.
          </p>
          <p>
            Mention the key colour,{' '}
            <button type="button" className={s.hexChip} onClick={() => copyText(LOGO_COLORS.primary)}>{LOGO_COLORS.primary}</button>, and
            why it was chosen.
          </p>
        </div>
        <div className={s.historyImg}>
          <Logo variant="mark" tone="primary" title={`The ${brand.name} logo`} />
        </div>
      </div>
      <dl className={s.facts}>
        <div><dt>Designer</dt><dd>{brand.logo.designer}</dd></div>
        <div><dt>Year</dt><dd>{brand.logo.year}</dd></div>
        <div><dt>Key colour</dt><dd>{LOGO_COLORS.primary}</dd></div>
        <div><dt>Grid</dt><dd>{brand.logo.mark.length} × {Math.max(...brand.logo.mark.map((r) => r.length))} pixels</dd></div>
      </dl>
    </div>
  );
}

/* ---------- Downloads ---------- */
const KIT = `/downloads/${kitFile}`;
const SWATCHES = palettes.flatMap((p) => [p.colors[3].hex, p.colors[6].hex]).slice(0, 6);

export function BrandKit() {
  const packs = [
    {
      name: 'Brand kit',
      what: 'Every logo file as SVG, plus the colour palettes as CSS and JSON.',
      ext: 'ZIP',
      href: KIT,
      feature: true,
      preview: (
        <span className={s.pvKit}>
          <Logo variant="mark" tone="primary" title="" className={s.pvKitMark} />
          <span className={s.pvKitAa}>Aa</span>
          <span className={s.pvSwatches}>{SWATCHES.map((c) => <i key={c} style={{ background: c }} />)}</span>
        </span>
      ),
    },
    {
      name: 'Colours · CSS',
      what: 'Every palette as CSS custom properties.',
      ext: 'CSS',
      onClick: () => downloadText(paletteCss(), `${brandSlug}-colors.css`, 'text/css'),
      preview: <span className={s.pvFont} style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem' }}>--color: #…;</span>,
    },
    {
      name: 'Colours · JSON',
      what: 'Every palette as JSON, for design tokens and scripts.',
      ext: 'JSON',
      onClick: () => downloadText(paletteJson(), `${brandSlug}-colors.json`, 'application/json'),
      preview: <span className={s.pvFont} style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem' }}>{'{ "hex": … }'}</span>,
    },
  ];

  return (
    <div className={s.dlStack}>
      <ul role="list" className={s.dlPacks}>
        {packs.map((p) => {
          const inner = (
            <>
              <span className={s.dlPreview}>{p.preview}</span>
              <span className={s.dlPackText}>
                <span className={s.dlExt}>{p.ext}</span>
                <b>{p.name}</b>
                <span>{p.what}</span>
              </span>
              <span className={s.dlGo} aria-hidden="true"><Icon name="download" size={18} /></span>
            </>
          );
          return (
            <li key={p.name} data-feature={p.feature || undefined}>
              {p.href ? (
                <a className={s.dlPack} href={p.href} download aria-label={`Download ${p.name} (${p.ext})`}>{inner}</a>
              ) : (
                <button type="button" className={s.dlPack} onClick={p.onClick} aria-label={`Download ${p.name} (${p.ext})`}>{inner}</button>
              )}
            </li>
          );
        })}
      </ul>

      <h3 className={s.subhead}>Logo files · SVG</h3>
      <LogoVariations />
    </div>
  );
}

/* ---------- Registry ----------
 * `${sectionSlug}/${childId}` → live showcase. Lives inside this client module so
 * the server page only ever renders one client component (<Showcase id>), which
 * keeps the lookup stable across dev-server hot reloads. Anything not listed
 * renders nothing, so give every child in data/sections.js a showcase.
 */
const REGISTRY = {
  'overview/introduction': Introduction,
  'overview/mission': Mission,
  'overview/contents': Contents,
  'overview/press': Press,
  ...Object.fromEntries(palettes.map((p) => [`color/${p.id}`, () => <Palette id={p.id} />])),
  'logo/primary-logo': LogoPlayground,
  'logo/variations': LogoVariations,
  'logo/how-to-use': LogoUsage,
  'logo/misuse': Misuse,
  'logo/story': LogoStory,
  ...Object.fromEntries(brand.fonts.map((f) => [`typography/font-${f.id}`, () => <FontShowcase id={f.id} />])),
  'typography/type-scale': TypeScale,
  'imagery/best-practices': ImageryPolicy,
  'imagery/treatments': Treatments,
  'imagery/dos-and-donts': DosDonts,
  'social-profiles/all-profiles': ProfileDirectory,
  'downloads/brand-kit': BrandKit,
};

export function Showcase({ id, children }) {
  const C = REGISTRY[id];
  return C ? <C /> : children ?? null;
}
