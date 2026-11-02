import { notFound } from 'next/navigation';
import { sections, getSection } from '@/data/sections';
import SectionPage from '@/components/section/SectionPage';
import brand from '@/data/brand';

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }) {
  const { section } = await params;
  const s = getSection(section);
  if (!s) return {};
  const title = s.seoTitle || s.label;
  const description = s.seoDescription || s.lede;
  return {
    // custom SEO titles already name the kit, so skip the suffix
    title: s.seoTitle ? { absolute: s.seoTitle } : title,
    description,
    alternates: { canonical: `/${s.slug}` },
    openGraph: { title: s.seoTitle || `${title} — ${brand.kitName}`, description, url: `/${s.slug}` },
  };
}

export default async function Page({ params }) {
  const { section } = await params;
  const s = getSection(section);
  if (!s) notFound();
  return <SectionPage section={s} />;
}
