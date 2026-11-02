import OverviewTile from './OverviewTile';
import LogoTile from './LogoTile';
import ColorTile from './ColorTile';
import TypeTile from './TypeTile';
import ImageryTile from './ImageryTile';
import DownloadsTile from './DownloadsTile';
import SocialTile from './SocialTile';
import styles from './BrandGrid.module.css';

// Grid areas are defined per breakpoint in BrandGrid.module.css.
// DOM order = reading/tab order, independent of visual placement.
// Add or remove a tile here and in the CSS areas.
export default function BrandGrid() {
  return (
    <section className={styles.grid} aria-label="Brand system index">
      <OverviewTile area="ov" />
      <LogoTile area="lg" />
      <ColorTile area="co" />
      <TypeTile area="ty" />
      <ImageryTile area="im" />
      <SocialTile area="so" />
      <DownloadsTile area="dl" />
    </section>
  );
}
