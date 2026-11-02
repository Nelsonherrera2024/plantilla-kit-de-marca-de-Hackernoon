import Tile from '../ui/Tile';
import s from './tiles.module.css';

/*
 * A contact sheet of placeholder image frames for common uses, in greys with
 * one frame in the brand accent. Swap it for a real photo by dropping an
 * <img> into the tile body instead.
 */
const FRAMES = [
  { label: 'Hero', area: 'a' },
  { label: 'Square', area: 'b', accent: true },
  { label: 'Portrait', area: 'c' },
  { label: 'Banner', area: 'd' },
  { label: 'Story', area: 'e' },
];

// A simple "picture" glyph: a sun and two hills
function Picture() {
  return (
    <svg viewBox="0 0 48 32" className={s.frameArt} aria-hidden="true">
      <circle cx="34" cy="10" r="4" />
      <path d="M0 32 L14 16 L24 26 L32 19 L48 32 Z" />
    </svg>
  );
}

export default function ImageryTile({ area }) {
  return (
    <Tile slug="imagery" title="Imagery" area={area} className={s.imagery}>
      <div className={s.sheet} role="img" aria-label="Placeholder image frames">
        {FRAMES.map((f) => (
          <div key={f.label} className={s.frame} style={{ gridArea: f.area }} data-accent={f.accent || undefined}>
            <Picture />
            <span className={s.frameRatio}>{f.label}</span>
          </div>
        ))}
      </div>
    </Tile>
  );
}
