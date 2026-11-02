'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sections, HOME_THEME, childHref } from '@/data/sections';
import Icon from '../ui/Icon';
import Logo from '../ui/Logo';
import brand from '@/data/brand';
import styles from './NavRail.module.css';

const MODE_LABEL = { rail: 'Rail', standard: 'Standard', expanded: 'Expanded' };
const NEXT_MODE = { rail: 'standard', standard: 'expanded', expanded: 'rail' };

const pad = (n) => String(n).padStart(2, '0');


export default function NavRail({ mode, setMode }) {
  const pathname = usePathname();
  const activeSlug = pathname.split('/')[1] || '';
  const [open, setOpen] = useState(() => new Set(activeSlug ? [activeSlug] : []));
  const [activeChild, setActiveChild] = useState(null);
  const [tip, setTip] = useState(null);
  const listRef = useRef(null);

  // The current section's sub-tree is always open when you arrive.
  useEffect(() => {
    if (activeSlug) setOpen((prev) => (prev.has(activeSlug) ? prev : new Set(prev).add(activeSlug)));
  }, [activeSlug]);

  // Scroll-spy: highlight the sub-page currently in view.
  useEffect(() => {
    setActiveChild(null);
    const section = sections.find((s) => s.slug === activeSlug);
    if (!section) return;
    const els = section.children.map((c) => document.getElementById(c.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActiveChild(e.target.id));
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeSlug]);

  useEffect(() => {
    if (mode !== 'rail') setTip(null);
  }, [mode]);

  const toggleOpen = (slug) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });

  // Hover/active colors come from each section's `theme` in data/sections.js,
  // the same theme its homepage tile, page hero and pager card use.
  const showTip = (e, label, theme) => {
    if (mode !== 'rail') return;
    const r = e.currentTarget.getBoundingClientRect();
    setTip({ label, top: r.top + r.height / 2, theme });
  };
  const hideTip = () => setTip(null);

  // Arrow keys move between visible nav links (roving focus, Tab still works).
  const onListKey = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const items = [...listRef.current.querySelectorAll('[data-nav-item]')].filter((el) => !el.closest('[inert]'));
    const i = items.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    const next =
      e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
    items[next].focus();
  };

  const expanded = mode === 'expanded';

  return (
    <>
      <nav className={styles.nav} aria-label="Brand guidelines">
        <div className={styles.head}>
          <Link href="/" className={`${styles.brand}`} aria-label={`${brand.kitName} — home`}>
            <span className={styles.mark}>
              <Logo variant="mark" tone="primary" title="" />
            </span>
            <span className={styles.wordmark}>
              <Logo variant="wordmark" tone="primary" title="" className={styles.wordmarkSvg} />
              {/* "brand" tag, unless the name already ends with it */}
              {!/brand$/i.test(brand.name) && <span className={styles.brandTag}>brand</span>}
            </span>
          </Link>
        </div>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setMode(NEXT_MODE[mode])}
          aria-label={`Navigation: ${MODE_LABEL[mode]}. Switch to ${MODE_LABEL[NEXT_MODE[mode]]}`}
          onMouseEnter={(e) => showTip(e, 'Expand  ]')}
          onMouseLeave={hideTip}
          onFocus={(e) => showTip(e, 'Expand  ]')}
          onBlur={hideTip}
        >
          <span className={styles.toggleIcon} data-mode={mode}>
            <Icon name="panel" size={24} />
          </span>
          <span className={styles.label}>
            <span className={styles.toggleText}>{MODE_LABEL[mode]}</span>
            <span className={styles.dots} aria-hidden="true">
              {['rail', 'standard', 'expanded'].map((m) => (
                <i key={m} data-on={m === mode} />
              ))}
            </span>
          </span>
        </button>

        <ul role="list" className={styles.list} ref={listRef} onKeyDown={onListKey}>
          <li>
            <div className={styles.row}>
              <Link
                href="/"
                className={styles.item}
                aria-current={pathname === '/' ? 'page' : undefined}
                data-nav-item
                onMouseEnter={(e) => showTip(e, 'Home', HOME_THEME)}
                onMouseLeave={hideTip}
                onFocus={(e) => showTip(e, 'Home', HOME_THEME)}
                onBlur={hideTip}
              >
                <span className={`${styles.icon} theme-${HOME_THEME}`}>
                  <Icon name="home" size={24} />
                </span>
                <span className={styles.label}>Home</span>
                <span className={styles.num} aria-hidden="true">00</span>
              </Link>
            </div>
          </li>

          {sections.map((s, i) => {
            const active = activeSlug === s.slug;
            const isOpen = open.has(s.slug);
            const subVisible = expanded && isOpen;
            const subId = `nav-sub-${s.slug}`;
            return (
              <li key={s.slug} className={styles.group} data-open={isOpen}>
                <div className={styles.row}>
                  <Link
                    href={`/${s.slug}`}
                    className={styles.item}
                    aria-current={active ? 'page' : undefined}
                    data-nav-item
                    onMouseEnter={(e) => showTip(e, s.label, s.theme)}
                    onMouseLeave={hideTip}
                    onFocus={(e) => showTip(e, s.label, s.theme)}
                    onBlur={hideTip}
                  >
                    <span className={`${styles.icon} theme-${s.theme}`}>
                      <Icon name={s.icon} size={24} />
                    </span>
                    <span className={styles.label}>{s.label}</span>
                    <span className={styles.num} aria-hidden="true">{pad(i + 1)}</span>
                  </Link>
                  <button
                    type="button"
                    className={styles.disclose}
                    aria-expanded={isOpen}
                    aria-controls={subId}
                    aria-label={`${s.label} sub-pages`}
                    tabIndex={expanded ? 0 : -1}
                    aria-hidden={!expanded}
                    onClick={() => toggleOpen(s.slug)}
                  >
                    <Icon name="chevron" size={12} />
                  </button>
                </div>
                <div className={styles.subWrap} data-visible={subVisible} id={subId} inert={!subVisible}>
                  <ul role="list" className={styles.sub}>
                    {s.children.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={childHref(s, c)}
                          className={styles.subItem}
                          data-nav-item
                          aria-current={active && (activeChild === c.id || pathname === childHref(s, c)) ? (s.subpages ? 'page' : 'location') : undefined}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.foot}>
          <span className={styles.label}>
            <kbd>[</kbd>
            <kbd>]</kbd> resize · {brand.version}
          </span>
        </div>

        {tip && (
          <div
            className={`${styles.tip} ${tip.theme ? `theme-${tip.theme}` : ''}`}
            style={{ top: tip.top }}
            aria-hidden="true"
          >
            {tip.label}
          </div>
        )}
      </nav>
      <button
        type="button"
        className={styles.scrim}
        data-show={mode !== 'rail'}
        aria-label="Collapse navigation"
        tabIndex={-1}
        onClick={() => setMode('rail')}
      />
    </>
  );
}
