import type { MetadataRoute } from 'next';
import { CALCULATORS, CATEGORIES_META } from '@/lib/registry';
import { TRADING_TOOLS } from '@/lib/trading/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mycalculator.xyz';
  const currentDate = new Date();

  const sitemapMap = new Map<string, MetadataRoute.Sitemap[number]>();

  // 1. High-Priority Static & Dedicated Pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/calculators`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/trading`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.4 },
  ];

  staticPages.forEach((page) => {
    sitemapMap.set(page.url, page);
  });

  // 2. Categories
  Object.keys(CATEGORIES_META).forEach((cat) => {
    const url = `${baseUrl}/calculators/${cat}`;
    if (!sitemapMap.has(url)) {
      sitemapMap.set(url, {
        url,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  });

  // 3. Centralized Standard Calculators
  CALCULATORS.forEach((calc) => {
    const cleanSlug = calc.slug.replace(/^\//, '').trim();
    const fullUrl = `${baseUrl}/calculators/${cleanSlug}`;
    if (!sitemapMap.has(fullUrl)) {
      sitemapMap.set(fullUrl, {
        url: fullUrl,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: calc.popular ? 0.85 : 0.8,
      });
    }
  });

  // 4. All 42 Trading Calculators
  TRADING_TOOLS.forEach((tool) => {
    const cleanSlug = tool.slug.replace(/^\//, '').trim();
    const fullUrl = `${baseUrl}/trading/${cleanSlug}`;
    if (!sitemapMap.has(fullUrl)) {
      sitemapMap.set(fullUrl, {
        url: fullUrl,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: tool.popular ? 0.85 : 0.8,
      });
    }
  });

  return Array.from(sitemapMap.values());
}
