'use client';

import Link from 'next/link';
import Tile from '../ui/Tile';
import Icon from '../ui/Icon';
import brand, { siteHost } from '@/data/brand';
import s from './tiles.module.css';

const LINES = brand.taglines;

export default function OverviewTile({ area }) {

  return (
    <Tile slug="overview" area={area} headerless className={s.overview}>
      <div className={s.ovGrid} aria-hidden="true" />

      <div className={s.ovInner}>
        <div className={s.ovTop}>
          <span className="eyebrow">{siteHost}</span>

          <span className={`eyebrow ${s.ovStatus}`}>
            <i aria-hidden="true" /> {brand.version} · living document
          </span>
        </div>

        <h1 className={s.ovTitle}>
          {brand.kitName}
        </h1>

        <p className={s.ovTyped}>
          <span className={s.prompt}>&gt;</span> {LINES[0]}
        </p>

        <div className={s.ovFoot}>
          <Link href="/overview" className={`${s.cta} tile-control`}>
            Start with the overview <Icon name="arrow" size={16} />
          </Link>

        </div>
      </div>
    </Tile>
  );
}