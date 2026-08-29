import { NextResponse } from 'next/server';
import { CALCULATORS, CATEGORIES_META, CalculatorCategory } from '@/lib/registry';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://www.mycalculator.xyz';
  const today = new Date().toISOString().split('T')[0];

  // 1. Static Core Routes
  const staticRoutes = [
    { loc: `${baseUrl}`, freq: 'daily', priority: '1.0', lastmod: today },
    { loc: `${baseUrl}/calculators`, freq: 'daily', priority: '0.9', lastmod: today },
    { loc: `${baseUrl}/resources`, freq: 'weekly', priority: '0.8', lastmod: today },
    { loc: `${baseUrl}/about`, freq: 'monthly', priority: '0.5', lastmod: today },
    { loc: `${baseUrl}/contact`, freq: 'monthly', priority: '0.5', lastmod: today },
    { loc: `${baseUrl}/privacy`, freq: 'monthly', priority: '0.3', lastmod: today },
    { loc: `${baseUrl}/terms`, freq: 'monthly', priority: '0.3', lastmod: today },
    { loc: `${baseUrl}/disclaimer`, freq: 'monthly', priority: '0.3', lastmod: today },
  ];

  // 2. Category Hub Routes
  const categoryRoutes = (Object.keys(CATEGORIES_META) as CalculatorCategory[]).map((cat) => ({
    loc: `${baseUrl}/calculators/${cat}`,
    freq: 'weekly',
    priority: '0.85',
    lastmod: today,
  }));

  // 3. Dynamic Calculator Tools
  const calculatorRoutes = CALCULATORS.map((calc) => ({
    loc: `${baseUrl}/calculators/${calc.slug}`,
    freq: 'weekly',
    priority: calc.popular ? '0.95' : '0.80',
    lastmod: today,
  }));

  const allUrls = [...staticRoutes, ...categoryRoutes, ...calculatorRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
