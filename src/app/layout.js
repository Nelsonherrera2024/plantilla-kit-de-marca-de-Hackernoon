import localFont from 'next/font/local';
import AppShell from '@/components/shell/AppShell';
import brand, { themeCss } from '@/data/brand';
import './globals.css';

// One self-hosted typeface for the whole site: Inter (a variable font, 100–900).
// To use your own: drop a .woff2 into src/fonts, point `src` at it, and update
// `fonts` in brand.config.js so the Typography page describes it.
const inter = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--ff-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: brand.kitName, template: `%s — ${brand.kitName}` },
  description: brand.description,
  applicationName: brand.kitName,
  keywords: [`${brand.name} brand kit`, `${brand.name} media kit`, `${brand.name} logo`, `${brand.name} brand guidelines`],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: brand.kitName, title: brand.kitName, description: brand.description, url: '/' },
  twitter: { card: 'summary_large_image', title: brand.kitName, description: brand.description },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: brand.kitName,
  url: brand.siteUrl,
  description: brand.description,
  publisher: { '@type': 'Organization', name: brand.name, url: brand.homepage },
};

export const viewport = { themeColor: brand.colors.bg };

// Runs before paint: restores the nav state so there is no layout flash.
// Tablet widths always start collapsed (the nav overlays there).
const navBoot = `(function(){var d=document.documentElement,m='standard';try{var s=localStorage.getItem('bk-nav');if(s)m=s;if(innerWidth<1200)m='rail'}catch(e){}d.dataset.nav=m})()`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-nav="standard"
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: navBoot }} />
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
