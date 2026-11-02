'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavRail from './NavRail';
import MobileNav from './MobileNav';
import Toaster from '../ui/Toaster';
import styles from './Shell.module.css';

export const NAV_MODES = ['rail', 'standard', 'expanded'];

const isTablet = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches;

export default function AppShell({ children }) {
  const pathname = usePathname();
  const [mode, setModeState] = useState('standard');

  // Sync with the value the boot script put on <html>.
  useEffect(() => {
    setModeState(document.documentElement.dataset.nav || 'standard');
  }, []);

  const setMode = useCallback((next) => {
    document.documentElement.dataset.nav = next;
    setModeState(next);
    // Tablet overlays are transient — only persist the desktop preference.
    if (!isTablet()) {
      try { localStorage.setItem('bk-nav', next); } catch {}
    }
  }, []);

  const step = useCallback(
    (dir) => {
      const i = NAV_MODES.indexOf(document.documentElement.dataset.nav || 'standard');
      const next = NAV_MODES[Math.min(NAV_MODES.length - 1, Math.max(0, i + dir))];
      setMode(next);
    },
    [setMode],
  );

  // Keyboard: [ collapses, ] expands. Esc collapses the tablet overlay.
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (e.key === '[') step(-1);
      else if (e.key === ']') step(1);
      else if (e.key === 'Escape' && isTablet() && document.documentElement.dataset.nav !== 'rail') setMode('rail');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, setMode]);

  // On tablet, navigating closes the overlay.
  useEffect(() => {
    if (isTablet()) setMode('rail');
  }, [pathname, setMode]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <NavRail mode={mode} setMode={setMode} step={step} />
      <MobileNav />
      <main id="main" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <Toaster />
    </>
  );
}
