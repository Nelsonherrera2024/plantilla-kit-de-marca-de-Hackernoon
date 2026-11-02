import brand from './brand';
import { palettes } from './colors';

// Single source of truth for navigation, routes, sub-pages and home tiles.
// Add a section here and it appears in the nav rail, mobile menu and as a
// statically generated /[section] page. Set `enabled: false` to hide a section
// everywhere (nav, routes, pager, numbering) without deleting its content.
//
// Each child can carry `intro` (a paragraph) and `notes` (bullets), rendered in
// the sticky header column next to its content. Simple inline HTML is allowed.
// The interactive block next to each child is looked up by `${slug}/${child id}`
// in src/components/section/Showcases.js.
//
// `theme` names one of the themes in brand.config.js.
// All copy below is PLACEHOLDER text for the made-up brand in brand.config.js.

const N = brand.name;

export const allSections = [
  {
    slug: 'overview',
    label: 'Overview',
    icon: 'overview',
    theme: 'overview',
    seoTitle: `Overview of ${brand.kitName}`,
    lede: `Everything you need to use ${N} well: logos, colours, type, imagery and downloads. Start here.`,
    children: [
      {
        id: 'introduction',
        label: 'Introduction',
        intro: `<strong>Welcome</strong> to ${brand.kitName}. It’s for anyone who makes things with our name on them: teammates, partners, press and fans.`,
        notes: ['This is a living document. It changes as the brand does.'],
      },
      {
        id: 'mission',
        label: 'What We Stand For',
        intro: `Our mission: <strong>[why ${N} exists, and who it’s for]</strong>. Write it in one sentence.`,
        notes: ['Keep it short enough that anyone on the team can repeat it from memory.'],
      },
      {
        id: 'contents',
        label: 'What’s Inside',
        intro: 'Logos, colours, fonts, imagery, how we write, and where to find us. Pick a section.',
      },
      {
        id: 'press',
        label: 'Media & Press',
        intro: `Writing about ${N}? This site doubles as our <strong>media kit</strong>: logos, colours and fonts for press use are on the <a href="/downloads">Downloads</a> page.`,
      },
    ],
  },
  {
    slug: 'logo',
    label: 'Logo',
    icon: 'logo',
    theme: 'logo',
    lede: 'One mark, one wordmark, a few rules. Square for avatars and icons; horizontal when there’s room to say the name.',
    children: [
      {
        id: 'primary-logo',
        label: 'Primary Logo',
        intro: 'Preview the square mark and the horizontal lockup on each approved background, then export an SVG.',
      },
      {
        id: 'variations',
        label: 'Variations',
        intro: 'Every official colourway, generated straight from the logo source. Click one to download it.',
      },
      {
        id: 'how-to-use',
        label: 'How to Use',
        notes: [
          'Use the primary ink on dark backgrounds and the secondary ink on light ones.',
          'On colour backgrounds, avoid bright-on-bright and dark-on-dark pairings.',
          `Not sure? Ask us at <a href="mailto:${brand.contactEmail}">${brand.contactEmail}</a>.`,
        ],
      },
      {
        id: 'misuse',
        label: 'How Not to Use',
        intro: 'Use the logo exactly as drawn. No cropping, fading, recolouring, distorting, effects or rotation.',
      },
      {
        id: 'story',
        label: 'The Story',
        intro: 'Where the logo came from and what it means. Replace this with your own origin story.',
      },
    ],
  },
  {
    slug: 'color',
    label: 'Color',
    icon: 'color',
    theme: 'color',
    lede: `${palettes.length} colours, each in ten shades from light to dark. Click a shade to copy its HEX.`,
    children: palettes.map((p) => ({
      id: p.id,
      label: p.name.replace(' Palette', ''),
      intro: p.tagline,
      notes: p.notes,
    })),
  },
  {
    slug: 'typography',
    label: 'Typography',
    icon: 'type',
    theme: 'type',
    lede: 'One typeface, Inter, used everywhere: bold for headlines, regular for everything people read.',
    children: [
      ...brand.fonts.map((f) => ({
        id: `font-${f.id}`,
        label: f.name,
        intro: `<strong>${f.role}.</strong> ${f.job}.`,
        notes: f.license ? [`Free to use under the ${f.license}.`] : undefined,
      })),
      {
        id: 'type-scale',
        label: 'Type Scale',
        intro: 'Seven sizes, from display to caption. They scale with the screen.',
      },
    ],
  },
  {
    slug: 'imagery',
    label: 'Imagery',
    icon: 'imagery',
    theme: 'imagery',
    lede: 'Bright, honest and a little bit pixelated. How we choose, treat and credit images.',
    children: [
      {
        id: 'best-practices',
        label: 'Best Practices',
        intro: 'Our image policy in one line: <strong>Show real things, made by real people.</strong>',
        notes: ['Always credit the photographer or illustrator.', 'Avoid anything that could be hurtful to part of our audience.'],
      },
      {
        id: 'treatments',
        label: 'Treatments',
        intro: 'Run images through our signature treatments to make them feel like ours. Drop in your own image to try them.',
        notes: ['Everything happens in your browser. Nothing is uploaded.'],
      },
      {
        id: 'dos-and-donts',
        label: 'Do’s & Don’ts',
        intro: 'A quick checklist before you hit publish.',
      },
    ],
  },
  {
    slug: 'social-profiles',
    label: 'Social Profiles',
    icon: 'social',
    theme: 'social',
    lede: `Find, follow and tag ${N} online: every account, all in one place.`,
    children: [
      {
        id: 'all-profiles',
        label: 'Every Profile',
        intro: `The full list. Tag us as <strong>${brand.handle}</strong>. Search, filter by type, or copy a link.`,
        notes: ['Press <strong>/</strong> to jump to search.'],
      },
    ],
  },
  {
    slug: 'downloads',
    label: 'Downloads',
    icon: 'download',
    theme: 'downloads',
    seoTitle: `Download ${brand.kitName}`,
    seoDescription: `Download ${brand.kitName}: every ${N} logo file and the colour palettes as CSS and JSON.`,
    lede: 'Logos and colours, ready to use. Grab the kit and go build.',
    children: [
      {
        id: 'brand-kit',
        label: 'Brand Kit',
        intro: `${brand.kitName} in one ZIP: every logo file plus the colour palettes as CSS and JSON.`,
        notes: ['Or grab the pieces one by one.'],
      },
    ],
  },
];

// Home's colour theme (nav icon, "Back to The Board" cards). Sections set theirs above.
export const HOME_THEME = 'home';

export const sections = allSections.filter((s) => s.enabled !== false);

export const getSection = (slug) => sections.find((s) => s.slug === slug);

// Link to a child: its own page for `subpages` sections, an anchor otherwise
export const childHref = (s, c) => (s.subpages ? `/${s.slug}/${c.id}` : `/${s.slug}#${c.id}`);

export const sectionIndex = (slug) => sections.findIndex((s) => s.slug === slug);
