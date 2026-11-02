import brand from '@/data/brand';
import s from './Typography.module.css';

const SAMPLE = 'The quick brown fox jumps over the lazy dog';
const getFont = (id) => brand.fonts.find((f) => f.id === id);

/* ---------- One font from brand.config.js: each weight with a sample line ---------- */
export function FontShowcase({ id }) {
  const font = getFont(id);
  if (!font) return null;
  const weights = font.weights || [[400, 'Regular']];
  return (
    <div className={s.font}>
      <ul className={s.weights}>
        {weights.map(([w, label]) => (
          <li key={w}>
            <span className={s.weightLabel}>{w} · {label}</span>
            <span className={s.sample} style={{ fontFamily: font.ff, fontWeight: w }}>{font.sample || SAMPLE}</span>
          </li>
        ))}
      </ul>
      {font.href && (
        <a className={s.link} href={font.href} target="_blank" rel="noreferrer">
          Get {font.name.split(' ')[0]} →
        </a>
      )}
    </div>
  );
}

/* ---------- Type scale: the size tokens in src/app/globals.css ---------- */
const SCALE = [
  { token: '--step-5', label: 'Display' },
  { token: '--step-4', label: 'Heading 1' },
  { token: '--step-3', label: 'Heading 2' },
  { token: '--step-2', label: 'Heading 3' },
  { token: '--step-1', label: 'Lead' },
  { token: '--step-0', label: 'Body' },
  { token: '--step--1', label: 'Caption' },
];

export function TypeScale() {
  return (
    <ul className={s.scale}>
      {SCALE.map((t, i) => (
        <li key={t.token}>
          <span className={s.weightLabel}>
            {t.label} <code>{t.token}</code>
          </span>
          <span className={s.scaleSample} style={{ fontSize: `var(${t.token})`, fontWeight: i < 4 ? 700 : 400 }}>
            {brand.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
