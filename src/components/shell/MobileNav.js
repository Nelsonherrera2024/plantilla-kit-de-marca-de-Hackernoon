'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sections, childHref } from '@/data/sections';
import Icon from '../ui/Icon';
import Logo from '../ui/Logo';
import brand, { siteHost } from '@/data/brand';
import styles from './MobileNav.module.css';

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef(null);
  const btnRef = useRef(null);
  const slug = pathname.split('/')[1] || '';
  const current = sections.find((s) => s.slug === slug);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const sheet = sheetRef.current;
    sheet.querySelector('[data-autofocus]')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
      if (e.key === 'Tab') {
        // Minimal focus trap
        const f = [...sheet.querySelectorAll('a, button')];
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={styles.root}>
      <header className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={`${brand.kitName} — home`}>
          <Logo variant="mark" tone="primary" title="" className={styles.mark} />
          <span className={styles.crumb}>
            {current ? (
              <>
                <span className={styles.slash}>/</span>
                {current.label}
              </>
            ) : (
              <span className={styles.tag}>brand</span>
            )}
          </span>
        </Link>
        <button
          ref={btnRef}
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-sheet"
          onClick={() => setOpen(true)}
        >
          <span>Menu</span>
          <Icon name="menu" size={18} />
        </button>
      </header>

      <div
        id="mobile-sheet"
        ref={sheetRef}
        className={styles.sheet}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!open}
      >
        <div className={styles.sheetHead}>
          <span className="eyebrow">{siteHost}</span>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} data-autofocus aria-label="Close menu">
            <Icon name="close" size={18} />
          </button>
        </div>

        {current && (
          <nav className={styles.onPage} aria-label={`${current.label} sections`}>
            <p className="eyebrow">{current.subpages ? 'Pages' : 'On this page'}</p>
            <ul role="list">
              {current.children.map((c) => (
                <li key={c.id}>
                  <Link href={childHref(current, c)} onClick={() => setOpen(false)}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav aria-label="Brand guidelines">
          <ul role="list" className={styles.grid}>
            <li className={styles.homeCell}>
              <Link href="/" className={`${styles.card} theme-terminal`} aria-current={pathname === '/' ? 'page' : undefined}>
                <Icon name="home" size={24} />
                <span className={styles.cardLabel}>Home</span>
                <span className={styles.cardNum}>00</span>
              </Link>
            </li>
            {sections.map((s, i) => (
              <li key={s.slug} style={{ '--i': i }}>
                <Link
                  href={`/${s.slug}`}
                  className={`${styles.card} theme-${s.theme}`}
                  aria-current={slug === s.slug ? 'page' : undefined}
                >
                  <Icon name={s.icon} size={24} />
                  <span className={styles.cardLabel}>{s.label}</span>
                  <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
