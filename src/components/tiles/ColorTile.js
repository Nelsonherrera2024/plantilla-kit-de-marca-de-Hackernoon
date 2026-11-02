'use client';

import Tile from '../ui/Tile';
import { textOn, palettes } from '@/data/colors';
import { copyText } from '@/lib/toast';
import s from './tiles.module.css';

// Three shades from each palette (300, 500, 700), up to 9 bands
const BANDS = palettes
  .flatMap((p) => [3, 5, 7].map((i) => p.colors[i]))
  .slice(0, 9)
  .map((c) => ({ ...c, on: textOn(c.hex) }));

export default function ColorTile({ area }) {
  return (
    <Tile slug="color" title="Color" area={area} className={s.color}>
      <ul role="list" className={`${s.bands} tile-control`} aria-label="Brand colors — click to copy HEX">
        {BANDS.map((c) => (
          <li key={c.hex} style={{ '--c': c.hex, '--on-c': c.on }}>
            <button type="button" className={s.band} onClick={() => copyText(c.hex)}>
              <span className={s.bandName}>{c.name}</span>
              <span className={s.bandHex}>{c.hex}</span>
              <span className="visually-hidden">— copy</span>
            </button>
          </li>
        ))}
      </ul>
    </Tile>
  );
}
