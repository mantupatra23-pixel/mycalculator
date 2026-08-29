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

const registryPath = path.join(__dirname, '../lib/registry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf8');
const slugMatches = [...registryContent.matchAll(/slug:\s*["']([^"']+)["']/g)];
const uniqueSlugs = Array.from(new Set(slugMatches.map(m => m[1])));

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

staticPages.forEach(p => {
  xml += `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${p === "" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
});

categories.forEach(c => {
  xml += `  <url>\n    <loc>${baseUrl}/calculators/${c}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
});

uniqueSlugs.forEach(slug => {
  if (!categories.includes(slug)) {
    xml += `  <url>\n    <loc>${baseUrl}/calculators/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  }
});

xml += `</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log(`[SITEMAP] Generated physical public/sitemap.xml (${staticPages.length + categories.length + uniqueSlugs.length} valid URLs)`);
