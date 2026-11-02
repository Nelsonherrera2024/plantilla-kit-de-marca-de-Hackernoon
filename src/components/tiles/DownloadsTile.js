'use client';

import Tile from '../ui/Tile';
import Icon from '../ui/Icon';
import { copyText } from '@/lib/toast';
import { downloadLogoSvg } from '@/lib/assets';
import brand, { brandSlug, kitFile } from '@/data/brand';
import s from './tiles.module.css';

const KIT = `/downloads/${kitFile}`;
const CMD = `curl -O ${brand.siteUrl.replace(/\/$/, '')}${KIT}`;

export default function DownloadsTile({ area }) {
  return (
    <Tile slug="downloads" title="Downloads" area={area} className={s.downloads}>
      <div className={`${s.term} tile-control`}>
        <button type="button" className={s.termLine} onClick={() => copyText(CMD, 'curl command')}>
          <span className={s.prompt}>$</span> {CMD}
          <span className={s.termCopy}>
            <Icon name="copy" size={14} />
            <span className="visually-hidden">Copy command</span>
          </span>
        </button>
        <div className={s.dlRow}>
          <button type="button" className={s.dlBtn} onClick={() => downloadLogoSvg({ variant: 'mark' }, `${brandSlug}-mark.svg`)}>
            <Icon name="download" size={16} /> mark.svg
          </button>
          <button type="button" className={s.dlBtn} onClick={() => downloadLogoSvg({ variant: 'horizontal' }, `${brandSlug}-horizontal.svg`)}>
            <Icon name="download" size={16} /> horizontal.svg
          </button>
          <a href={KIT} download className={s.dlBtn}>
            <Icon name="download" size={16} /> kit.zip
          </a>
        </div>
      </div>
    </Tile>
  );
}
