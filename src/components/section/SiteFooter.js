import Logo from '../ui/Logo';
import brand from '@/data/brand';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Logo variant="horizontal" tone="primary" title={brand.name} className={styles.mark} />
        <p>
          {brand.kitName}. <span className={styles.dim}>{brand.version}</span>
        </p>
      </div>
      <p className={styles.hint}>
        Tip: use the <kbd>[</kbd> <kbd>]</kbd> keys to resize the navigation.
      </p>
    </footer>
  );
}
