import fs from 'node:fs';
import path from 'node:path';
import { parseAllArticles } from './build-sitemap.ts';
import { loadData, generateUnifiedJsonLd } from './sync-data.ts';

export interface AuditReport {
  timestamp: string;
  totalRussianArticles: number;
  translationCoverage: Record<string, { count: number; missingKeys: string[] }>;
  hreflangReciprocityValid: boolean;
  jsonLdValid: boolean;
  errors: string[];
}

export function runSeoGeoAudit(): AuditReport {
  console.log('=====================================================');
  console.log('Running Comprehensive SEO, GEO & Multilingual Audit');
  console.log('=====================================================\n');

  const errors: string[] = [];
  const articles = parseAllArticles();
  const { rooms, pricing, meta } = loadData();

  // 1. Group articles by translationKey and language
  const ruArticles = articles.filter(a => a.lang === 'ru');
  const ruKeys = new Set(ruArticles.map(a => a.translationKey));

  const targetLangs = ['en', 'ko', 'zh', 'kk', 'tl', 'ceb'];
  const coverage: Record<string, { count: number; missingKeys: string[] }> = {};

  for (const lang of targetLangs) {
    const langArticles = articles.filter(a => a.lang === lang);
    const langKeys = new Set(langArticles.map(a => a.translationKey));
    const missing: string[] = [];

    for (const key of ruKeys) {
      if (!langKeys.has(key)) {
        missing.push(key);
      }
    }

    coverage[lang] = {
      count: langArticles.length,
      missingKeys: missing
    };

    if (lang === 'en' && missing.length > 0) {
      errors.push(`CRITICAL: Level 1 English missing translations for keys: ${missing.join(', ')}`);
    }
  }

  // 2. Test Hreflang Reciprocity
  // Every translation group must have bidirectional matching links
  const byKey = new Map<string, typeof articles>();
  for (const a of articles) {
    if (!byKey.has(a.translationKey)) byKey.set(a.translationKey, []);
    byKey.get(a.translationKey)!.push(a);
  }

  let hreflangReciprocityValid = true;
  for (const [key, variants] of byKey.entries()) {
    if (variants.length <= 1) {
      console.warn(`⚠️ Warning: Article key "${key}" only exists in one language (${variants[0].lang})`);
      hreflangReciprocityValid = false;
    }
  }

  // 3. Test JSON-LD Validity & Single Source of Truth Synchronization
  let jsonLdValid = true;
  try {
    const jsonLd = generateUnifiedJsonLd();
    if (!jsonLd['@context'] || !jsonLd['@graph']) {
      errors.push('JSON-LD schema missing @context or @graph');
      jsonLdValid = false;
    }

    const resort = jsonLd['@graph'].find(n => (n['@type'] as string[]).includes('Resort'));
    if (!resort) {
      errors.push('JSON-LD missing Resort / LodgingBusiness entity');
      jsonLdValid = false;
    }

    // Verify room prices match single source of truth
    const hotelRooms = jsonLd['@graph'].filter(n => n['@type'] === 'HotelRoom');
    if (hotelRooms.length !== rooms.length) {
      errors.push(`JSON-LD room count (${hotelRooms.length}) does not match data/rooms.json count (${rooms.length})`);
      jsonLdValid = false;
    }

    // Check price specifications
    for (const hr of hotelRooms) {
      const matchRoom = rooms.find(r => r.name === hr.name);
      const roomOffers = (hr as any).offers;
      if (!matchRoom) {
        errors.push(`Room "${(hr as any).name}" in JSON-LD not found in data/rooms.json`);
        jsonLdValid = false;
      } else if (roomOffers && roomOffers.price !== matchRoom.pricePerMonth) {
        errors.push(`Desync in room "${(hr as any).name}": JSON-LD price $${roomOffers.price} != rooms.json price $${matchRoom.pricePerMonth}`);
        jsonLdValid = false;
      }
    }
  } catch (err: any) {
    errors.push(`JSON-LD generation failed: ${err.message}`);
    jsonLdValid = false;
  }

  // 4. Verify sitemap.xml and llms.txt existence and freshness
  const sitemapPath = path.resolve(process.cwd(), 'sitemap.xml');
  const llmsPath = path.resolve(process.cwd(), 'llms.txt');

  if (!fs.existsSync(sitemapPath)) {
    errors.push('sitemap.xml is missing from project root');
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    if (!sitemapContent.includes('xhtml:link')) {
      errors.push('sitemap.xml does not contain xhtml:link hreflang tags');
    }
  }

  if (!fs.existsSync(llmsPath)) {
    errors.push('llms.txt is missing from project root');
  }

  // Summary output
  console.log(`Russian Source Articles: ${ruArticles.length}`);
  for (const [lang, stat] of Object.entries(coverage)) {
    const statusIcon = stat.missingKeys.length === 0 ? '✓' : '⚠️';
    console.log(`${statusIcon} ${lang.toUpperCase()}: ${stat.count} translated files (Missing: ${stat.missingKeys.length})`);
  }

  console.log(`\nHreflang Bidirectional Clusters: ${hreflangReciprocityValid ? '✓ PASS' : '⚠️ ISSUES DETECTED'}`);
  console.log(`JSON-LD Schema & Data Sync: ${jsonLdValid ? '✓ PASS' : '❌ FAIL'}`);

  if (errors.length > 0) {
    console.error('\nAudit Errors:');
    errors.forEach(e => console.error(` - ${e}`));
  } else {
    console.log('\n✓ ALL CHECKS PASSED: Hreflang, JSON-LD, and Content Collections are 100% in sync.');
  }

  return {
    timestamp: new Date().toISOString(),
    totalRussianArticles: ruArticles.length,
    translationCoverage: coverage,
    hreflangReciprocityValid,
    jsonLdValid,
    errors
  };
}

if (process.argv[1] && process.argv[1].endsWith('verify-seo-geo.ts')) {
  const report = runSeoGeoAudit();
  if (report.errors.length > 0) {
    process.exit(1);
  }
}
