// ─────────────────────────────────────────────────────────────────────────────
//  brand.config.js — the one file to edit first.
//
//  Everything brand-specific that the site shows (name, colours, logo, fonts,
//  socials, contact details) comes from here. Section copy lives next door in
//  src/data/*.js, and fonts are loaded in src/app/layout.js.
//
//  Every value below is a PLACEHOLDER for a made-up brand called “Your Brand”.
//  Replace them with your own.
// ─────────────────────────────────────────────────────────────────────────────

const config = {
  // ── Identity ───────────────────────────────────────────────────────────────
  name: 'Your Brand', // shown in the nav, footer, titles and generated wordmark
  kitName: 'Your Brand Kit',
  siteUrl: 'https://brand.example.com', // used for metadata, sitemap and robots.txt
  homepage: 'https://example.com', // your main website
  description:
    'Your Brand Kit: logos, colours, typography, imagery and downloads, all in one interactive guide.',
  version: 'v1.0',
  handle: '@yourbrand', // your social handle
  contactEmail: 'brand@example.com',
  // Lines the homepage typewriter cycles through
  taglines: [
    'make things people love',
    'a living brand guide',
    'logos · colours · type · imagery',
    'fork it, make it yours',
  ],

  // ── Core colours ───────────────────────────────────────────────────────────
  // `accent` is the site's signature colour (links, focus rings, highlights).
  colors: {
    accent: '#FFD400', // Signal Yellow
    accentInk: '#000000', // text that sits on the accent
    bg: '#0B0B0C', // page background
    charcoal: '#2B2B2E',
    paper: '#F3F0E6',
    white: '#FFFFFF',
  },

  // ── Logo ───────────────────────────────────────────────────────────────────
  // The logo is pixel art drawn right here: '#' = ink, 'o' = face, '.' = empty.
  // Change the rows to redraw the mark. The wordmark is generated from `name`
  // using a built-in 5×5 pixel alphabet (A–Z, 0–9, space, & - . !).
  // Prefer a vector logo? Swap src/components/ui/Logo.js for an <svg>/<img>.
  logo: {
    mark: [
      '..#######..',
      '.#ooooooo#.',
      '#oooo#oooo#',
      '#oooo#oooo#',
      '#ooo###ooo#',
      '#o#######o#',
      '#ooo###ooo#',
      '#oooo#oooo#',
      '#oooo#oooo#',
      '.#ooooooo#.',
      '..#######..',
    ],
    // Official colourways. `primary` and `secondary` are the ink colours,
    // `face` fills the inside of the mark.
    colors: { primary: '#FFD400', secondary: '#2B2B2E', face: '#FFFFFF' },
    // Backgrounds offered in the logo playground, each with the ink that belongs on it
    backgrounds: [
      { id: 'ink', label: 'Black', bg: '#0B0B0C', tone: 'primary' },
      { id: 'accent', label: 'Yellow', bg: '#FFD400', tone: 'secondary' },
      { id: 'paper', label: 'Paper', bg: '#F3F0E6', tone: 'secondary' },
      { id: 'charcoal', label: 'Charcoal', bg: '#2B2B2E', tone: 'primary' },
    ],
    designer: 'Your Designer',
    year: '2026',
  },

  // ── Typography ─────────────────────────────────────────────────────────────
  // How the typeface is used, shown on /typography and the home tile. The whole
  // site is set in Inter (loaded in src/app/layout.js). `ff` must match a CSS
  // variable that layout.js loads (see the README to add your own font).
  fonts: [
    {
      id: 'headlines',
      name: 'Inter Bold',
      role: 'Headlines',
      job: 'Titles, headings and big statements',
      ff: 'var(--font-inter)',
      weights: [[800, 'ExtraBold'], [700, 'Bold'], [600, 'SemiBold']],
      stack: "'Inter', system-ui, sans-serif",
      href: 'https://rsms.me/inter/',
      variable: true,
    },
    {
      id: 'body',
      name: 'Inter Regular',
      role: 'Body & interface',
      job: 'Paragraphs, buttons, labels and everything else people read',
      ff: 'var(--font-inter)',
      weights: [[500, 'Medium'], [400, 'Regular']],
      stack: "'Inter', system-ui, sans-serif",
      href: 'https://rsms.me/inter/',
      sample: 'Clear words, short sentences, the important thing first.',
    },
  ],

  // ── Social profiles ────────────────────────────────────────────────────────
  // `featured: true` puts a profile in “Most active” and on the home tile.
  // `color` is the platform's own colour (optional). `cat` must match a category id.
  socialCategories: [
    { id: 'social', label: 'Social' },
    { id: 'media', label: 'Video & audio' },
    { id: 'code', label: 'Code & design' },
  ],
  socials: [
    { id: 'x', label: 'X / Twitter', href: 'https://x.com/', note: 'x.com/yourbrand', cat: 'social', color: '#FFFFFF', featured: true },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/', note: 'linkedin.com/company/yourbrand', cat: 'social', color: '#0A66C2', featured: true },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/', note: 'instagram.com/yourbrand', cat: 'social', color: '#E4405F', featured: true },
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/', note: 'youtube.com/@yourbrand', cat: 'media', color: '#FF0000', featured: true },
    { id: 'github', label: 'GitHub', href: 'https://github.com/', note: 'github.com/yourbrand', cat: 'code', color: '#FFFFFF', featured: true },
    { id: 'bluesky', label: 'Bluesky', href: 'https://bsky.app/', note: 'bsky.app/profile/yourbrand', cat: 'social', color: '#1185FE' },
    { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/', note: 'facebook.com/yourbrand', cat: 'social', color: '#1877F2' },
    { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/', note: 'tiktok.com/@yourbrand', cat: 'media', color: '#FE2C55' },
    { id: 'podcast', label: 'Podcast', href: 'https://example.com/podcast', note: 'example.com/podcast', cat: 'media', color: '#9933CC' },
    { id: 'dribbble', label: 'Dribbble', href: 'https://dribbble.com/', note: 'dribbble.com/yourbrand', cat: 'code', color: '#EA4C89' },
    { id: 'figma', label: 'Figma Community', href: 'https://www.figma.com/community', note: 'figma.com/@yourbrand', cat: 'code', color: '#A259FF' },
  ],

  // ── Section colours ────────────────────────────────────────────────────────
  // Each section in src/data/sections.js picks one of these by name. They're all
  // greys by default: the colour is the page-header background, and lighter or
  // darker shades of it are used for text and for the home tile titles.
  // Yellow (`colors.accent` above) is only used for highlights: active tabs,
  // buttons, links and focus rings.
  themes: {
    home: '#2B2B2E',
    overview: '#2B2B2E',
    logo: '#2B2B2E',
    color: '#2B2B2E',
    type: '#2B2B2E',
    imagery: '#2B2B2E',
    social: '#2B2B2E',
    downloads: '#2B2B2E',
  },
};

export default config;
