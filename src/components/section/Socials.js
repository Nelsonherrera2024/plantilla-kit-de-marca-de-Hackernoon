'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SOCIALS, SOCIAL_CATEGORIES, brandVars, monogram } from '@/data/socials';
import { copyText } from '@/lib/toast';
import Icon from '../ui/Icon';
import s from './Socials.module.css';

// A profile's icon: its own SVG path (24×24 viewBox) if `icon` is set in
// brand.config.js, otherwise a pixel-font monogram of its name.
export function SocialIcon({ profile, size = 24 }) {
  if (profile?.icon) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
        <path d={profile.icon} />
      </svg>
    );
  }
  return (
    <span aria-hidden="true" style={{ display: 'inline-grid', placeItems: 'center', width: size, height: size, fontFamily: 'var(--font-pixel)', fontSize: size * 0.62, lineHeight: 1 }}>
      {monogram(profile?.label || '?')}
    </span>
  );
}



/* ---------- Directory ---------- */
export function ProfileDirectory() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const input = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !/input|textarea/i.test(document.activeElement?.tagName || '')) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const counts = useMemo(
    () => Object.fromEntries(SOCIAL_CATEGORIES.map((c) => [c.id, c.id === 'all' ? SOCIALS.length : SOCIALS.filter((p) => p.cat === c.id).length])),
    [],
  );
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return SOCIALS.filter((p) => (cat === 'all' || p.cat === cat) && (!term || `${p.label} ${p.note}`.toLowerCase().includes(term))).sort((a, b) =>
      a.label.localeCompare(b.label),
    );
  }, [q, cat]);

  return (
    <div className={s.stack}>
      <label className={s.search}>
        <span className="visually-hidden">Search profiles</span>
        <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${SOCIALS.length} profiles…`} />
        <kbd>/</kbd>
      </label>
      <div className={s.tabs} role="group" aria-label="Filter by type">
        {SOCIAL_CATEGORIES.map((c) => (
          <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
            {c.label} <span>{counts[c.id]}</span>
          </button>
        ))}
      </div>
      <p className={s.count} aria-live="polite">{list.length} {list.length === 1 ? 'profile' : 'profiles'}</p>
      {list.length === 0 ? (
        <p className={s.empty}>No profiles match “{q}”.</p>
      ) : (
        <ul role="list" className={s.dir}>
          {list.map((p) => (
            <li key={p.id} className={s.row} style={brandVars(p)}>
              <a href={p.href} target="_blank" rel="noreferrer" className={s.rowLink}>
                <span className={s.rowIcon}><SocialIcon profile={p} size={22} /></span>
                <span className={s.rowText}>
                  <span className={s.rowName}>{p.label}</span>
                  <span className={s.rowNote}>{p.note}</span>
                </span>
              </a>
              <button type="button" className={s.rowCopy} onClick={() => copyText(p.href, `${p.label} link`)} aria-label={`Copy ${p.label} link`}>
                <Icon name="copy" size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
