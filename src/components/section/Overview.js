'use client';

import { useState } from 'react';
import Link from 'next/link';
import { copyText } from '@/lib/toast';
import { allSections } from '@/data/sections';
import brand from '@/data/brand';
import Icon from '../ui/Icon';
import Logo from '../ui/Logo';
import s from './Overview.module.css';

// PLACEHOLDER copy for the Overview section. Replace the constants below.

/* ---------- Introduction: grow the blob ---------- */
const MAX = 8;
const QUOTE = 'make this thing a bigger green blob in the cloud';

export function Introduction() {
  const [n, setN] = useState(0);
  const done = n >= MAX;
  const grow = () => setN((v) => (v >= MAX ? 0 : v + 1));

  return (
    <div className={s.intro}>
      <figure className={s.cloud}>
        <p className={s.hey}>Hey there 👋</p>
        <blockquote className={s.quote}>“{QUOTE}”</blockquote>
        <figcaption className={s.cite}>
          — in the ever-wise words of our founder and CEO, Sir{' '}
          <a href="https://hackernoon.com/u/David" target="_blank" rel="noreferrer">David Smooke</a>
        </figcaption>
        <div className={s.sky} aria-hidden="true">
          <span className={s.blob} style={{ '--scale': 0.55 + n * 0.16 }} data-done={done || undefined} />
        </div>
        <div className={s.blobBar}>
          <button type="button" className={s.grow} onClick={grow} aria-live="polite">
            {done ? '✨ Big enough. Now go make something. (reset)' : n === 0 ? 'Make it bigger' : `Bigger! (${n}/${MAX})`}
          </button>
          <span className={s.equation}>
            Consistent brand = recognisable brand = a brand people trust.
          </span>
        </div>
      </figure>
      <div className={s.cloud} style={{ placeItems: 'center', aspectRatio: '1' }}>
        <Logo variant="mark" tone="primary" title={`${brand.name} logo`} />
      </div>
    </div>
  );
}

/* ---------- Mission ---------- */
// PLACEHOLDER: replace with your own values, reasons and goals.
const VERBS = [
  { v: 'Clear', t: 'We say what we mean, in plain words.' },
  { v: 'Consistent', t: 'We look and sound the same everywhere people meet us.' },
  { v: 'Human', t: 'We’re friendly, helpful and easy to talk to.' },
];
const BECAUSE = [
  'People trust what they recognise.',
  'Consistency makes everything easier to find and use.',
  'A strong brand lets the work speak for itself.',
];
const HOPES = [
  { k: 'Align', t: 'One place for everyone to find the brand basics.' },
  { k: 'Save time', t: 'The right logo, colour or font in a few clicks.' },
  { k: 'Unify', t: 'Everything we make looks and sounds like us.' },
];

export function Mission() {
  const [i, setI] = useState(0);
  return (
    <div className={s.stack}>
      <div className={s.verbs}>
        <p className={s.verbLine}>
          Our brand is{' '}
          {VERBS.map((x, k) => (
            <span key={x.v}>
              <button
                type="button"
                className={s.verb}
                data-active={i === k || undefined}
                onMouseEnter={() => setI(k)}
                onFocus={() => setI(k)}
                onClick={() => setI(k)}
              >
                {x.v.toLowerCase()}
              </button>
              {k < VERBS.length - 1 ? (k === VERBS.length - 2 ? ', and ' : ', ') : ''}
            </span>
          ))}.
        </p>
        <p className={s.verbNote} key={i}>{VERBS[i].t}</p>
      </div>
      <p className={s.hopeHead}>Why?</p>
      <ol className={s.because}>
        {BECAUSE.map((t, k) => (
          <li key={k} style={{ '--i': k }}>
            <span className={s.becauseWord}>Because</span> {t.charAt(0).toLowerCase() + t.slice(1)}
          </li>
        ))}
      </ol>
      <p className={s.hopeHead}>What this guide is for</p>
      <ol className={s.hopes}>
        {HOPES.map((h, k) => (
          <li key={h.k} style={{ '--i': k }}>
            <b>{h.k}</b>
            <span>{h.t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Contents: the rest of the guide ---------- */
// One-line blurbs per section. Sections without a blurb are still listed.
const BLURBS = {
  logo: 'The mark, the wordmark and the rules.',
  color: 'Core colours and every palette.',
  typography: 'Our typefaces and when to use each.',
  imagery: 'How we choose and treat images.',
  'social-profiles': `Where to find, follow and tag ${brand.name}.`,
  downloads: 'Logo files, colours and the full kit.',
};

export function Contents() {
  return (
    <div className={s.stack}>
      <ul role="list" className={s.contents}>
        {allSections
          .filter((sec) => sec.slug !== 'overview' && sec.enabled !== false)
          .map((sec) => (
            <li key={sec.slug}>
              <Link href={`/${sec.slug}`} className={`${s.card} theme-${sec.theme} tile-mono`}>
                <span className={s.cardIcon}><Icon name={sec.icon} size={28} /></span>
                <span className={s.cardTitle}>{sec.label}</span>
                <span className={s.cardBlurb}>{BLURBS[sec.slug] || sec.lede}</span>
                <span className={s.cardGo} aria-hidden="true"><Icon name="arrow" size={16} /></span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

/* ---------- Media & press ---------- */
// Each topic opens on click with a short answer. `html` is trusted, hand-written copy.
const HELP = [
  {
    label: 'Using our logo in an article',
    html: `<p>Go ahead. Use the files on the <a href="/downloads">Downloads</a> page as they are, and follow the <a href="/logo#misuse">logo rules</a>.</p>`,
  },
  {
    label: 'Interviews and quotes',
    html: `<p>Placeholder: who to contact for interviews, and how quickly you usually reply.</p>`,
  },
  {
    label: 'Partnerships and co-branding',
    html: `<p>Placeholder: how partners can work with ${brand.name}, and who approves co-branded work.</p>`,
  },
];

function HelpItem({ h }) {
  const [open, setOpen] = useState(false);
  const id = `help-${h.label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <li className={s.helpItem} data-open={open || undefined} onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
      <button type="button" className={s.helpToggle} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {h.label} <span className={s.helpPlus} aria-hidden="true">+</span>
      </button>
      <div className={s.helpPanel} id={id}>
        <div>
          <div className={s.helpBody} dangerouslySetInnerHTML={{ __html: h.html }} />
        </div>
      </div>
    </li>
  );
}

export function Press() {
  return (
    <div className={s.press}>
      <div className={s.stack}>
        <p className={s.pressLead}>Common questions:</p>
        <ul role="list" className={s.helpList}>
          {HELP.map((h) => <HelpItem key={h.label} h={h} />)}
        </ul>
        <p className={s.pressLead}>Or reach out directly:</p>
        <div className={s.contact}>
          <button type="button" className={s.btnPrimary} onClick={() => copyText(brand.contactEmail, 'email')}>
            <Icon name="copy" size={16} /> {brand.contactEmail}
          </button>
          <a className={s.btnGhost} href={brand.homepage} target="_blank" rel="noreferrer">
            {brand.homepage.replace(/^https?:\/\//, '')} <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
