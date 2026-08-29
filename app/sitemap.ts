import { MetadataRoute } from "next";
import { CALCULATORS, CATEGORIES_META, CalculatorCategory } from "@/lib/registry";

export const dynamic = "force-dynamic";
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mycalculator.xyz";
  const currentDate = new Date();

  // 1. Static Core Routes (8 Pages)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // 2. Category Hub Routes (8 Hubs)
  const categoryRoutes: MetadataRoute.Sitemap = (
    Object.keys(CATEGORIES_META) as CalculatorCategory[]
  ).map((cat) => ({
    url: `${baseUrl}/calculators/${cat}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. 101+ Individual Tool Detail Routes
  const calculatorRoutes: MetadataRoute.Sitemap = CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: calc.popular ? 0.95 : 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes];
}
