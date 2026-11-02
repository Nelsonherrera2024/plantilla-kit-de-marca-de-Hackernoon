'use client';

import { getPalette, textOn } from '@/data/colors';
import { copyText } from '@/lib/toast';
import s from './Palette.module.css';

/* One palette: its ten shades in a row. Click a shade to copy its HEX. */
export default function Palette({ id }) {
  const p = getPalette(id);
  return (
    <ol className={s.strip} aria-label={`${p.name} shades`}>
      {p.colors.map((c) => (
        <li key={c.hex}>
          <button
            type="button"
            className={s.shade}
            style={{ background: c.hex, color: textOn(c.hex) }}
            data-base={c.hex === p.base.toUpperCase() || undefined}
            onClick={() => copyText(c.hex)}
            aria-label={`${c.name}${c.hex === p.base.toUpperCase() ? " (base)" : ""}, ${c.hex}. Copy`}
          >
            <span className={s.step}>{c.label}</span>
            <span className={s.hex}>{c.hex}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
