import Link from 'next/link';
import { sections, sectionIndex, HOME_THEME, childHref } from '@/data/sections';
import Icon from '../ui/Icon';
import SiteFooter from './SiteFooter';
import { Showcase } from './Showcases';
import { siteHost } from '@/data/brand';
import styles from './SectionPage.module.css';

const pad = (n) => String(n).padStart(2, '0');


export default function SectionPage({ section }) {
  const i = sectionIndex(section.slug);
  const prev = sections[i - 1];
  const next = sections[i + 1];

  return (
    <article className={styles.page} data-accent={section.theme}>
      <header className={`${styles.hero} theme-${section.theme}`}>
        <div className={styles.heroMeta}>
          <span className="eyebrow">
            {pad(i + 1)} / {pad(sections.length)}
          </span>
          <span className="eyebrow">{siteHost}/{section.slug}</span>
        </div>
        <h1 className={styles.title} data-long={section.label.length > 14 || undefined}>{section.label}</h1>
        <p className={styles.lede}>{section.lede}</p>
        <nav aria-label="On this page" className={styles.toc}>
          <ul role="list">
            {section.children.map((c, n) => (
              <li key={c.id}>
                <a href={section.subpages ? childHref(section, c) : `#${c.id}`}>
                  <span className="mono">{pad(i + 1)}.{n + 1}</span> {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Icon name={section.icon} size={240} className={styles.heroIcon} />
      </header>

      <div className={styles.blocks}>
        {section.children.map((c, n) => {
          return (
            <section key={c.id} id={c.id} className={styles.block} aria-labelledby={`h-${c.id}`}>
              <div className={styles.blockHead}>
                <span className={styles.blockNum}>
                  {pad(i + 1)}.{n + 1}
                </span>
                <h2 id={`h-${c.id}`}>{c.label}</h2>
                {c.intro && <p className={styles.blockIntro} dangerouslySetInnerHTML={{ __html: c.intro }} />}
                {c.notes?.length > 0 && (
                  <ul className={styles.blockNotes}>
                    {c.notes.map((n) => (
                      <li key={n} dangerouslySetInnerHTML={{ __html: n }} />
                    ))}
                  </ul>
                )}
                {c.image && (
                  <img className={styles.blockImg} src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} loading="lazy" />
                )}
              </div>
              <div className={styles.blockBody}>
                <Showcase id={`${section.slug}/${c.id}`} />
              </div>
            </section>
          );
        })}
      </div>

      <nav className={styles.pager} aria-label="Sections">
        {prev ? (
          <Link href={`/${prev.slug}`} className={`${styles.pagerLink} theme-${prev.theme}`} rel="prev">
            <span className="eyebrow">← Previous</span>
            <span className={styles.pagerTitle}>{prev.label}</span>
          </Link>
        ) : (
          <Link href="/" className={`${styles.pagerLink} theme-${HOME_THEME}`}>
            <span className="eyebrow">← Back to</span>
            <span className={styles.pagerTitle}>The Board</span>
          </Link>
        )}
        {next ? (
          <Link href={`/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext} theme-${next.theme}`} rel="next">
            <span className="eyebrow">Next →</span>
            <span className={styles.pagerTitle}>{next.label}</span>
          </Link>
        ) : (
          <Link href="/" className={`${styles.pagerLink} ${styles.pagerNext} theme-${HOME_THEME}`}>
            <span className="eyebrow">Back to →</span>
            <span className={styles.pagerTitle}>The Board</span>
          </Link>
        )}
      </nav>
      <SiteFooter />
    </article>
  );
}
