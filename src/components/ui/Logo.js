import config from '../../../brand.config.js';
import { MARK, HORIZONTAL, WORDMARK, LOGO_COLORS } from '@/data/logo';
import styles from './Logo.module.css';

const SHAPES = { mark: MARK, horizontal: HORIZONTAL, wordmark: WORDMARK };

const TONES = {
  primary: { ink: LOGO_COLORS.primary, face: LOGO_COLORS.face },
  secondary: { ink: LOGO_COLORS.secondary, face: LOGO_COLORS.face },
  current: { ink: 'currentColor', face: LOGO_COLORS.face },
};

/**
 * The brand logo, rendered as crisp SVG from the pixel geometry in src/data/logo.js.
 * variant: 'mark' | 'horizontal' (mark + wordmark) | 'wordmark'
 * tone:    'primary' | 'secondary' | 'current' (ink follows CSS color)
 * ink/face: explicit colour overrides (only for demos, e.g. the misuse examples)
 */
export default function Logo({
  variant = 'mark',
  tone = 'primary',
  ink,
  face,
  className = '',
  title = config.name,
}) {
  const s = SHAPES[variant];
  const t = TONES[tone] || TONES.primary;
  return (
    <svg
      viewBox={`0 0 ${s.w} ${s.h}`}
      className={`${styles.logo} ${className}`}
      style={{ '--logo-ink': ink || t.ink, '--logo-face': face || t.face }}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {[...s.face.map((r) => ['face', r]), ...s.ink.map((r) => ['ink', r])].map(([layer, r], i) => (
        <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} className={layer === 'ink' ? styles.ink : styles.face} />
      ))}
    </svg>
  );
}
