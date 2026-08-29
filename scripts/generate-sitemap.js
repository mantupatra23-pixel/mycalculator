const fs = require('fs');
const path = require('path');

const baseUrl = "https://www.mycalculator.xyz";
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  "",
  "/calculators",
  "/resources",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer"
];

const categories = [
  "finance",
  "business",
  "math",
  "health",
  "time-date",
  "converters",
  "education",
  "other"
];

// Read calculators from lib/registry.ts
const registryFile = fs.readFileSync(path.join(__dirname, '../lib/registry.ts'), 'utf8');
const slugMatches = [...registryFile.matchAll(/slug:\s*["']([^"']+)["']/g)];
const slugs = Array.from(new Set(slugMatches.map(m => m[1])));

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// 1. Static Pages
staticPages.forEach(p => {
  xml += `  <url>
    <loc>${baseUrl}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${p === "" ? "1.0" : "0.8"}</priority>
  </url>\n`;
});

// 2. Categories
categories.forEach(c => {
  xml += `  <url>
    <loc>${baseUrl}/calculators/${c}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
});

// 3. All Calculators
slugs.forEach(s => {
  if (!categories.includes(s)) {
    xml += `  <url>
    <loc>${baseUrl}/calculators/${s}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  }
});

xml += `</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
console.log(`[SUCCESS] Generated public/sitemap.xml with ${staticPages.length + categories.length + slugs.length} URLs`);
