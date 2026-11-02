'use client';

import { useState } from 'react';
import Tile from '../ui/Tile';
import brand from '@/data/brand';
import s from './tiles.module.css';

// Faces without `weights` are treated as display/pixel faces (sized up, no tracking)
// Tabs are labelled by role (fonts can share a family); `weight` is the face's main weight.
const FACES = brand.fonts.map((f) => ({ id: f.id, name: f.name, role: f.role, ff: f.ff, short: f.role.split(/[ &]/)[0], weight: f.weights?.[0]?.[0], cls: f.weights ? '' : s.fPixel }));

export default function TypeTile({ area }) {
  const [i, setI] = useState(0);

  const face = FACES[i];

  return (
    <Tile slug="typography" title="Typography" area={area} className={s.type}>
      <div className={s.typeStage}>
        <span key={face.id} className={`${s.typeGlyph} ${face.cls}`} style={{ fontFamily: face.ff, fontWeight: face.weight }} aria-hidden="true">
          Aa
        </span>
        <div className={s.typeInfo} key={`i-${face.id}`} aria-live="polite">
          <span className={s.typeRole}>{face.role}</span>
          <span className={`${s.typeName} ${face.cls}`} style={{ fontFamily: face.ff, fontWeight: face.weight }}>{face.name}</span>
          <span className={`${s.typeSample} ${face.cls}`} style={{ fontFamily: face.ff }}>{brand.taglines[0]}</span>
        </div>
        <ul role="list" className={`${s.typeTabs} tile-control`}>
          {FACES.map((f, n) => (
            <li key={f.id}>
              <button
                type="button"
                className={`${s.typeTab} ${f.cls}`} style={{ fontFamily: f.ff }}
                aria-pressed={n === i}
                aria-label={`${f.name}, ${f.role}`}
                onMouseEnter={() => setI(n)}
                onFocus={() => setI(n)}
                onClick={() => setI(n)}
              >
                {f.short}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Tile>
  );
}
