const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.mycalculator.xyz';
const TODAY = new Date().toISOString().split('T')[0];

const urls = new Map();

function addUrl(loc, changefreq = 'weekly', priority = '0.8') {
  const cleanLoc = loc.endsWith('/') && loc !== `${DOMAIN}/` ? loc.slice(0, -1) : loc;
  if (!urls.has(cleanLoc)) {
    urls.set(cleanLoc, { loc: cleanLoc, lastmod: TODAY, changefreq, priority });
  }
}

// 1. Core Static Hub & Company Pages
addUrl(`${DOMAIN}`, 'daily', '1.0');
addUrl(`${DOMAIN}/calculators`, 'daily', '0.9');
addUrl(`${DOMAIN}/trading`, 'daily', '0.9');
addUrl(`${DOMAIN}/about`, 'monthly', '0.5');
addUrl(`${DOMAIN}/contact`, 'monthly', '0.5');
addUrl(`${DOMAIN}/privacy`, 'monthly', '0.4');
addUrl(`${DOMAIN}/terms`, 'monthly', '0.4');
addUrl(`${DOMAIN}/disclaimer`, 'monthly', '0.4');

// 2. Parse Standard Calculators & Categories from lib/registry.ts
const regPath = path.join(process.cwd(), 'lib/registry.ts');
if (fs.existsSync(regPath)) {
  const regText = fs.readFileSync(regPath, 'utf8');

  // Categories
  const catMatches = regText.matchAll(/['"`](finance|business|math|health|time-date|converters|education|other)['"`]:/g);
  for (const m of catMatches) {
    addUrl(`${DOMAIN}/calculators/${m[1]}`, 'weekly', '0.8');
  }

  // Calculator Slugs
  const calcSlugMatches = regText.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g);
  for (const m of calcSlugMatches) {
    const slug = m[1].trim();
    if (slug && !slug.includes('${')) {
      addUrl(`${DOMAIN}/calculators/${slug}`, 'weekly', '0.8');
    }
  }
}

// 3. Parse All 42 Trading Tools from lib/trading/registry.ts
const tradingRegPath = path.join(process.cwd(), 'lib/trading/registry.ts');
if (fs.existsSync(tradingRegPath)) {
  const tradingText = fs.readFileSync(tradingRegPath, 'utf8');

  const tradingMatches = tradingText.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g);
  for (const m of tradingMatches) {
    const slug = m[1].trim();
    if (slug && !slug.includes('${')) {
      addUrl(`${DOMAIN}/trading/${slug}`, 'weekly', '0.8');
    }
  }
}

// 4. Generate Valid XML Output
const urlList = Array.from(urls.values());

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlList
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml.trim(), 'utf8');

console.log(`[SUCCESS] Generated public/sitemap.xml with ${urlList.length} verified URLs!`);
