import Link from 'next/link';
import Tile from '../ui/Tile';
import { SocialIcon } from '../section/Socials';
import { SOCIALS, MOST_ACTIVE, brandVars } from '@/data/socials';
import s from './tiles.module.css';

const byId = Object.fromEntries(SOCIALS.map((p) => [p.id, p]));
// Most-active profiles first, topped up to 8 so the 4-column grid stays even
const TILE = [...new Set([...MOST_ACTIVE, ...SOCIALS.map((p) => p.id)])].slice(0, 8);

export default function SocialTile({ area }) {
  return (
    <Tile slug="social-profiles" title="Social Profiles" area={area} className={s.social}>
      <Link href="/social-profiles" className={`${s.socialGrid} tile-control`} tabIndex={-1} aria-hidden="true">
        {TILE.map((id) => (
          <span key={id} title={byId[id].label} style={brandVars(byId[id])}>
            <SocialIcon profile={byId[id]} size={24} />
          </span>
        ))}
      </Link>
    </Tile>
  );
}
