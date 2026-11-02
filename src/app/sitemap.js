import { sections } from '@/data/sections';
import brand from '@/data/brand';

const BASE = brand.siteUrl.replace(/\/$/, '');

export default function sitemap() {
  return [
    { url: `${BASE}/`, priority: 1 },
    ...sections.flatMap((s) => [
      { url: `${BASE}/${s.slug}`, priority: 0.8 },
      ...(s.subpages ? s.children.map((c) => ({ url: `${BASE}/${s.slug}/${c.id}`, priority: 0.7 })) : []),
    ]),
  ];
}
