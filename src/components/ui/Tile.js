'use client';

import Link from 'next/link';
import Icon from './Icon';
import { sectionIndex, allSections } from '@/data/sections';
import styles from './Tile.module.css';

/**
 * Homepage board tile.
 * The title link is "stretched" over the whole card (::after), so the tile is
 * one big click target. Anything that needs its own interaction gets
 * className="tile-control" and sits above the stretched link.
 */
export default function Tile({ slug, title, index: indexProp, theme: themeProp, mono = true, area, className = '', children, headerless = false }) {
  // Numbering follows the enabled sections, so disabling one renumbers the rest.
  const index = indexProp ?? String(sectionIndex(slug) + 1).padStart(2, '0');
  // Colour theme comes from the section in src/data/sections.js unless overridden.
  // `mono` (default) puts it on the shared dark tile surface, using the theme's --pop colour.
  const theme = themeProp ?? allSections.find((x) => x.slug === slug)?.theme ?? 'ink';

  return (
    <article
      className={`${styles.tile} theme-${theme} ${mono ? 'tile-mono' : ''} ${className}`}
      style={{ gridArea: area }}
      aria-labelledby={headerless ? undefined : `tile-${slug}`}
    >
      {!headerless && (
        <header className={styles.head}>
          <h2 className={styles.title} id={`tile-${slug}`}>
            <Link href={`/${slug}`} className={styles.link}>
              {title}
            </Link>
          </h2>
          <span className={styles.meta} aria-hidden="true">
            <span>{index}</span>
            <span className={styles.arrow}>
              <Icon name="arrow" size={18} />
            </span>
          </span>
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </article>
  );
}

export { styles as tileStyles };
