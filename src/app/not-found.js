import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80dvh', display: 'grid', placeContent: 'center', gap: 20, padding: 24, textAlign: 'center' }}>
      <p className="eyebrow" style={{ color: 'var(--page-accent)' }}>error 404</p>
      <h1 style={{ fontSize: 'var(--step-4)' }}>
        segfault
      </h1>
      <p style={{ color: 'var(--text-2)' }}>That page isn&apos;t part of the brand system (yet).</p>
      <Link href="/" style={{ color: 'var(--page-accent)', fontFamily: 'var(--font-mono)' }}>
        cd ~/brand
      </Link>
    </div>
  );
}
