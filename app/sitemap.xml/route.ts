import { NextResponse } from "next/server";
import { CALCULATORS, CATEGORIES_META, CalculatorCategory } from "@/lib/registry";

export async function GET() {
  const baseUrl = "https://www.mycalculator.xyz";
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    "",
    "/calculators",
    "/resources",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  const categories = Object.keys(CATEGORIES_META) as CalculatorCategory[];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Pages
  staticPages.forEach((p) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${p}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>${p === "" ? "1.0" : "0.8"}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 2. Categories
  categories.forEach((c) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/calculators/${c}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  });

  // 3. Calculators
  CALCULATORS.forEach((calc) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/calculators/${calc.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${calc.popular ? "0.95" : "0.8"}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
