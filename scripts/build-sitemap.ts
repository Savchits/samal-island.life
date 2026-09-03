import fs from 'node:fs';
import path from 'node:path';

interface ArticleMeta {
  file: string;
  lang: string;
  slug: string;
  translationKey: string;
  title: string;
  description: string;
  pubDate: string;
  status: string;
}

const DOMAIN = 'https://samal-bunker.com';
const CONTENT_DIR = path.resolve(process.cwd(), 'src/content/blog');
const LANGUAGES = ['ru', 'en', 'ko', 'zh', 'kk', 'tl', 'ceb'];

export function parseAllArticles(): ArticleMeta[] {
  const articles: ArticleMeta[] = [];

  if (!fs.existsSync(CONTENT_DIR)) return articles;

  const langDirs = fs.readdirSync(CONTENT_DIR);
  for (const lang of langDirs) {
    const langPath = path.join(CONTENT_DIR, lang);
    if (!fs.statSync(langPath).isDirectory()) continue;

    const files = fs.readdirSync(langPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    for (const file of files) {
      const fullPath = path.join(langPath, file);
      const content = fs.readFileSync(fullPath, 'utf-8');

      // Simple frontmatter extractor
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!match) continue;

      const fm = match[1];
      const title = (fm.match(/title:\s*["']?([^"'\r\n]+)["']?/) || [])[1] || '';
      const description = (fm.match(/description:\s*["']?([^"'\r\n]+)["']?/) || [])[1] || '';
      const translationKey = (fm.match(/translationKey:\s*["']?([^"'\r\n]+)["']?/) || [])[1] || file.replace(/\.(md|mdx)$/, '');
      const pubDate = (fm.match(/pubDate:\s*([^\r\n]+)/) || [])[1] || new Date().toISOString().split('T')[0];
      const status = (fm.match(/status:\s*["']?([^"'\r\n]+)["']?/) || [])[1] || 'published';

      const slug = file.replace(/\.(md|mdx)$/, '');

      articles.push({
        file: fullPath,
        lang,
        slug,
        translationKey,
        title,
        description,
        pubDate: pubDate.trim(),
        status
      });
    }
  }

  return articles;
}

export function generateSitemapXml(): string {
  const articles = parseAllArticles();
  const currentDate = new Date().toISOString().split('T')[0];

  // Group articles by translationKey
  const byKey = new Map<string, ArticleMeta[]>();
  for (const art of articles) {
    if (!byKey.has(art.translationKey)) {
      byKey.set(art.translationKey, []);
    }
    byKey.get(art.translationKey)!.push(art);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // 1. Root / Homepage per language
  const activeLangs = ['ru', 'en', 'ko', 'zh', 'kk', 'tl', 'ceb'];
  for (const lang of activeLangs) {
    const pageUrl = lang === 'en' ? `${DOMAIN}/` : `${DOMAIN}/${lang}/`;
    xml += `  <url>
    <loc>${pageUrl}</loc>
`;
    // Add all alternate hreflangs
    for (const altLang of activeLangs) {
      const altUrl = altLang === 'en' ? `${DOMAIN}/` : `${DOMAIN}/${altLang}/`;
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/" />\n`;
    xml += `    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;
  }

  // 2. Each article URL with all xhtml:link alternates
  for (const [key, variants] of byKey.entries()) {
    // Only published articles or review_pending for non-drafts
    const visibleVariants = variants.filter(v => v.status !== 'draft');

    for (const variant of visibleVariants) {
      const loc = `${DOMAIN}/${variant.lang}/blog/${variant.slug}/`;
      xml += `  <url>
    <loc>${loc}</loc>
`;
      // Generate xhtml:link for every language variant that shares this translationKey
      for (const alt of visibleVariants) {
        const altHref = `${DOMAIN}/${alt.lang}/blog/${alt.slug}/`;
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${altHref}" />\n`;
      }
      // x-default points to English version or Russian if no EN
      const enVariant = visibleVariants.find(v => v.lang === 'en') || visibleVariants.find(v => v.lang === 'ru') || visibleVariants[0];
      const defaultHref = `${DOMAIN}/${enVariant.lang}/blog/${enVariant.slug}/`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultHref}" />\n`;

      xml += `    <lastmod>${variant.pubDate || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
`;
    }
  }

  xml += `</urlset>\n`;
  return xml;
}

export function writeSitemap() {
  const xml = generateSitemapXml();
  fs.writeFileSync(path.resolve(process.cwd(), 'sitemap.xml'), xml, 'utf-8');
  if (fs.existsSync(path.resolve(process.cwd(), 'public'))) {
    fs.writeFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), xml, 'utf-8');
  }
  console.log('Successfully generated sitemap.xml with full xhtml:link hreflang clusters.');
}

if (process.argv[1] && process.argv[1].endsWith('build-sitemap.ts')) {
  writeSitemap();
}
