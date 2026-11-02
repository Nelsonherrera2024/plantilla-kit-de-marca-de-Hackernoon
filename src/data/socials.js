// Social profiles come from brand.config.js (`socials` and `socialCategories`).
import brand from './brand';

export const SOCIAL_CATEGORIES = [{ id: 'all', label: 'All' }, ...brand.socialCategories];
export const SOCIALS = brand.socials;
export const MOST_ACTIVE = brand.socials.filter((p) => p.featured).map((p) => p.id);

// Each profile wears its platform colour; text on that colour is black or white for contrast
const ink = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const l = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return l > 0.55 ? '#000' : '#fff';
};
export const brandVars = (p) => (p?.color ? { '--brand': p.color, '--brand-ink': ink(p.color) } : {});

/** Two-letter monogram for profiles without an icon, e.g. "X / Twitter" → "X", "LinkedIn" → "Li". */
export const monogram = (label) => {
  const first = label.split(/[\s/]+/)[0];
  return first.length <= 2 ? first : first[0].toUpperCase() + first[1].toLowerCase();
};
