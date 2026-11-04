# Brand Kit Template

An open-source brand guidelines site. Fill in one config file and deploy, and you get a brand kit people actually enjoy using: a bento-style home board, a collapsible nav rail, a logo playground with SVG export, colour palettes in shades, type specimens, image treatments and a downloadable kit.

**Live demo:** [brand-kit-template.preview.hackernoon.com](https://brand-kit-template.preview.hackernoon.com)

Everything you see is placeholder content for a made-up brand called **Your Brand**. Swap in your own.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hackernoon/brand-kit-template)

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Requires Node 20+. The only dependencies are `next`, `react` and `react-dom`.

## Make it yours

### 1. `brand.config.js`: start here

One file holds everything brand-specific:

| Key | What it controls |
| --- | --- |
| `name`, `kitName`, `siteUrl`, `description` | Titles, metadata, sitemap, robots.txt, footer |
| `taglines` | The homepage tagline and type specimens |
| `colors` | Accent, background and core UI colours |
| `logo.mark` | **Your logo, drawn as pixel art** (`#` = ink, `o` = fill, `.` = empty) |
| `logo.colors`, `logo.backgrounds` | Official colourways and the playground backgrounds |
| `fonts` | How the typeface is used, shown on /typography and the home tile |
| `socials`, `socialCategories` | Social Profiles section and home tile |
| `themes` | Each section's colour (page header, nav icon, home tile). Greys by default; the accent colour is kept for highlights. |

The wordmark is generated from `name` using a built-in 5×5 pixel alphabet. The favicon and every logo download are generated from the same geometry.

**Not a pixel logo?** Replace `src/components/ui/Logo.js` with your own `<svg>` (keep the `variant` and `tone` props), and update `logoSvg()` in `src/lib/assets.js` and `scripts/build-brand-kit.mjs` to export it.

### 2. Content: `src/data/`

| File | Section |
| --- | --- |
| `sections.js` | Navigation, routes, section titles and intros. Set `enabled: false` to hide a section. |
| `colors.js` | Palettes: each is one `base` colour, expanded into ten shades (50–900). |

Copy for the interactive blocks (Overview, Imagery, logo story) is at the top of each component in `src/components/section/`.

### 3. Fonts: `src/app/layout.js`

The whole site uses one self-hosted typeface, [Inter](https://rsms.me/inter/) (SIL Open Font License). To use your own, drop a `.woff2` into `src/fonts`, point `layout.js` at it, and update `fonts` in the config. The role tokens in `globals.css` (`--font-display`, `--font-mono`, etc.) all point at Inter; give any of them its own font if you want a second typeface.

### 4. Icons (optional)

The nav uses built-in 12×12 pixel glyphs (`src/components/ui/Icon.js`). To use your own icon set, drop SVGs into `src/icons/`, run `npm run icons`, and map names in `ALIASES`.

## How it's built

- **Next.js App Router** (JavaScript) with CSS Modules and CSS custom properties. Every section page is statically generated.
- **`/[section]`**: one route renders every section from `src/data/sections.js`. Each sub-section's interactive block is looked up by `section/child` in `src/components/section/Showcases.js`.
- **Themes**: `themeCss()` in `src/data/brand.js` turns `themes` in the config into `.theme-<name>` classes at build time.
- **Brand kit ZIP**: `npm run kit` (runs automatically before `dev` and `build`) writes `public/downloads/<kit-name>.zip` with every logo as SVG and the palettes as CSS and JSON. Put extra files (fonts, PDFs, photos) in a `kit-extras/` folder and they're bundled too. No `zip` CLI needed.

```
brand.config.js          ← edit first
src/
  app/                   layout, routes, favicon, sitemap, robots
  components/
    shell/               nav rail, mobile nav
    tiles/               home board tiles
    section/             section pages and interactive showcases
    ui/                  Logo, Icon, Tile, Toaster
  data/                  brand, sections, colors, shades, logo, socials
  fonts/                 self-hosted woff2
scripts/                 build-brand-kit.mjs, build-icons.mjs
```

## Keyboard

- `[` and `]` resize the nav (rail / standard / expanded).
- `/` jumps to search on the Social Profiles page.

## Accessibility

Keyboard navigable throughout, with visible focus rings, a skip link, no animation and a 12px minimum text size. If you change colours, check contrast: the Contrast palette illustration will help.

## License

Code: [MIT](LICENSE). Inter: SIL Open Font License. Placeholder content: use it however you like.

---

Originally built by [HackerNoon](https://hackernoon.com) for its own [brand & media kit]([url](https://brand.hackernoon.com/)), then open-sourced as a template here. 
