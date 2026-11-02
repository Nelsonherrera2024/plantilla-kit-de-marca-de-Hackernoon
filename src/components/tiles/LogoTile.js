'use client';

import { useState } from 'react';
import Tile from '../ui/Tile';
import Logo from '../ui/Logo';
import brand from '@/data/brand';
import s from './tiles.module.css';

// Each background pairs with the official colourway that sits on it.
const BGS = [
  // First option = the shared dark tile surface, like every other tile
  { id: 'dark', theme: 'logo', mono: true, label: 'On dark', swatch: 'var(--tile-mono-bg)', tone: 'primary' },
  { id: 'accent', theme: 'accent', label: 'On accent', swatch: 'var(--brand-accent)', tone: 'secondary' },
];

export default function LogoTile({ area }) {
  const [bg, setBg] = useState(BGS[0]);
  return (
    <Tile slug="logo" title="Logo" theme={bg.theme} mono={!!bg.mono} area={area} className={`${s.logo}`}>
      <div className={s.logoStage}>
        <Logo key={bg.id} variant="mark" tone={bg.tone} className={s.logoMark} title={`${brand.name} mark`} />
        <Logo variant="wordmark" tone={bg.tone} title="" className={s.logoWordmark} />
      </div>
      <div className={`${s.controls} tile-control`} role="group" aria-label="Preview logo background">
        {BGS.map((b) => (
          <button
            key={b.id}
            type="button"
            className={s.dot}
            style={{ '--sw': b.swatch }}
            aria-pressed={bg.id === b.id}
            aria-label={b.label}
            title={b.label}
            onClick={() => setBg(b)}
          />
        ))}
      </div>
    </Tile>
  );
}
