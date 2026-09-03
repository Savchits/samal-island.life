import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { generateEli5Article, saveGeneratedVariantsToDisk, SUPPORTED_LANGUAGES, ArticleInput, GeneratedVariant } from './server/eli5-generator';
import { writeSitemap } from './scripts/build-sitemap';
import { writeLlmsTxt } from './scripts/update-llms';

function slugify(text: string): string {
  const ruMap: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
  };

  const latin = text.toLowerCase().split('').map(char => ruMap[char] || char).join('');
  return latin
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50) || 'article-' + Date.now();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Generate single language variant (ELI5 style)
  app.post('/api/articles/generate-single', async (req, res) => {
    try {
      const { title, content, targetLang, authorName, authorRole, tags, slug } = req.body;
      if (!title || !content || !targetLang) {
        return res.status(400).json({ error: 'Missing title, content, or targetLang' });
      }

      const variant = await generateEli5Article({
        title,
        content,
        authorName,
        authorRole,
        tags,
        slug
      }, targetLang);

      return res.json({ success: true, variant });
    } catch (err: any) {
      console.error('Error generating single variant:', err);
      return res.status(500).json({ error: err.message || 'Generation failed' });
    }
  });

  // Generate all 7 languages and automatically publish to disk + update sitemap & llms.txt
  app.post('/api/articles/generate-all', async (req, res) => {
    try {
      const { title, content, authorName, authorRole, tags, customSlug } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const slug = customSlug ? slugify(customSlug) : slugify(title);

      // Generate for all languages in parallel for maximum speed
      const variantPromises = SUPPORTED_LANGUAGES.map(async (langObj) => {
        try {
          return await generateEli5Article({
            title,
            content,
            authorName,
            authorRole,
            tags,
            slug
          }, langObj.code);
        } catch (genErr) {
          console.error(`Failed to generate for ${langObj.code}, skipping:`, genErr);
          return null;
        }
      });

      const results = await Promise.all(variantPromises);
      const variants: GeneratedVariant[] = results.filter((v): v is GeneratedVariant => v !== null);

      // Save all variants to disk in src/content/blog/{lang}/{slug}.md
      const savedFiles = await saveGeneratedVariantsToDisk(slug, variants, {
        name: authorName,
        role: authorRole
      });

      // Update sitemap and llms.txt
      try {
        writeSitemap();
      } catch (sitemapErr) {
        console.warn('Sitemap regeneration warning:', sitemapErr);
      }

      try {
        writeLlmsTxt();
      } catch (llmsErr) {
        console.warn('llms.txt regeneration warning:', llmsErr);
      }

      return res.json({
        success: true,
        slug,
        variants,
        savedFiles,
        message: `Successfully generated and saved ${variants.length} language variants!`
      });
    } catch (err: any) {
      console.error('Error generating all variants:', err);
      return res.status(500).json({ error: err.message || 'Batch generation failed' });
    }
  });

  // Admin Authentication
  const ADMIN_USERNAME = 'one1ro';
  const ADMIN_PASSWORD = 'qweasdzxcvB1!';
  const ADMIN_SECRET_TOKEN = 'bunker_auth_one1ro_' + Buffer.from('one1ro:qweasdzxcvB1!').toString('base64');

  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body || {};
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return res.json({
        success: true,
        token: ADMIN_SECRET_TOKEN,
        username: ADMIN_USERNAME,
        role: 'SUPER_ADMIN',
        expiresIn: '7d'
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Неверный логин или пароль'
    });
  });

  app.get('/api/admin/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '') || req.query.token;
    if (token === ADMIN_SECRET_TOKEN) {
      return res.json({ valid: true, username: ADMIN_USERNAME });
    }
    return res.status(401).json({ valid: false, error: 'Unauthorized' });
  });

  // List existing articles
  app.get('/api/articles', (req, res) => {
    try {
      const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');
      if (!fs.existsSync(contentDir)) {
        return res.json({ articles: [] });
      }

      const map: Record<string, {
        translationKey: string;
        title: string;
        date: string;
        languages: string[];
        description?: string;
        tags?: string[];
        author?: string;
      }> = {};

      const langDirs = fs.readdirSync(contentDir);
      for (const lang of langDirs) {
        const langPath = path.join(contentDir, lang);
        if (!fs.statSync(langPath).isDirectory()) continue;

        const files = fs.readdirSync(langPath).filter(f => f.endsWith('.md'));
        for (const file of files) {
          const slug = file.replace(/\.md$/, '');
          const fullPath = path.join(langPath, file);
          const raw = fs.readFileSync(fullPath, 'utf-8');
          const titleMatch = raw.match(/title:\s*["']?([^"'\r\n]+)["']?/);
          const dateMatch = raw.match(/pubDate:\s*([^\r\n]+)/);
          const descMatch = raw.match(/description:\s*["']?([^"'\r\n]+)["']?/);
          const authorMatch = raw.match(/name:\s*["']?([^"'\r\n]+)["']?/);

          if (!map[slug]) {
            map[slug] = {
              translationKey: slug,
              title: titleMatch ? titleMatch[1] : slug,
              date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
              description: descMatch ? descMatch[1] : '',
              author: authorMatch ? authorMatch[1] : 'Кирилл Романов',
              languages: []
            };
          }
          if (lang === 'ru' && titleMatch) {
            map[slug].title = titleMatch[1];
            if (descMatch) map[slug].description = descMatch[1];
          }
          if (!map[slug].languages.includes(lang)) {
            map[slug].languages.push(lang);
          }
        }
      }

      return res.json({ articles: Object.values(map) });
    } catch (err: any) {
      console.error('Error listing articles:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Get specific article across all languages
  app.get('/api/articles/:slug', (req, res) => {
    try {
      const slug = req.params.slug;
      const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');
      const results: Record<string, { frontmatter: string; body: string; title: string; description: string; faqs: any[] }> = {};

      for (const langObj of SUPPORTED_LANGUAGES) {
        const filePath = path.join(contentDir, langObj.code, `${slug}.md`);
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, 'utf-8');
          const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---([\s\S]*)$/);
          if (match) {
            const frontmatterRaw = match[1];
            const body = match[2].trim();
            const titleMatch = frontmatterRaw.match(/title:\s*["']?([^"'\r\n]+)["']?/);
            const descMatch = frontmatterRaw.match(/description:\s*["']?([^"'\r\n]+)["']?/);

            // Extract FAQs if present
            const faqs: Array<{ question: string; answer: string }> = [];
            const faqSection = frontmatterRaw.match(/faqs:\s*\n((?:\s*-\s*question:[\s\S]*?(?=\n\w|\n---|$))+)/);
            if (faqSection) {
              const qMatches = [...faqSection[1].matchAll(/question:\s*["']?([^"'\r\n]+)["']?\s*\r?\n\s*answer:\s*["']?([^"'\r\n]+)["']?/g)];
              for (const qm of qMatches) {
                faqs.push({ question: qm[1], answer: qm[2] });
              }
            }

            results[langObj.code] = {
              frontmatter: frontmatterRaw,
              body,
              title: titleMatch ? titleMatch[1] : slug,
              description: descMatch ? descMatch[1] : '',
              faqs
            };
          }
        }
      }

      return res.json({ slug, results });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Update / Edit article
  app.put('/api/articles/:slug', (req, res) => {
    try {
      const slug = req.params.slug;
      const { variants, authorName, authorRole, tags } = req.body;
      const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');

      if (!variants || typeof variants !== 'object') {
        return res.status(400).json({ error: 'Missing variants data' });
      }

      const updatedLangs: string[] = [];

      for (const [lang, data] of Object.entries(variants as Record<string, any>)) {
        const langDir = path.join(contentDir, lang);
        if (!fs.existsSync(langDir)) {
          fs.mkdirSync(langDir, { recursive: true });
        }

        const filePath = path.join(langDir, `${slug}.md`);
        let existingFrontmatter = '';
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, 'utf-8');
          const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---([\s\S]*)$/);
          if (match) {
            existingFrontmatter = match[1];
          }
        }

        // Build updated file
        const title = data.title || 'Статья Самал IT-Бункера';
        const description = data.description || '';
        const body = data.body || '';
        const today = new Date().toISOString().split('T')[0];

        let faqsYaml = '';
        if (data.faqs && Array.isArray(data.faqs) && data.faqs.length > 0) {
          faqsYaml = 'faqs:\n' + data.faqs.map((f: any) => `  - question: "${f.question.replace(/"/g, '\\"')}"\n    answer: "${f.answer.replace(/"/g, '\\"')}"`).join('\n');
        }

        const tagsList = data.tags || tags || ['IT-Бункер', 'Starlink', 'Самал'];
        const tagsYaml = 'tags: ' + JSON.stringify(tagsList);

        const newFileContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
translationKey: "${slug}"
lang: "${lang}"
pubDate: ${today}
updatedDate: ${today}
author:
  name: "${(authorName || 'Кирилл Романов').replace(/"/g, '\\"')}"
  role: "${(authorRole || 'Инфраструктурный архитектор Самал IT-Бункера').replace(/"/g, '\\"')}"
  avatar: "https://samal-bunker.com/img/author_romanov.webp"
image:
  url: "https://samal-bunker.com/img/hero_workspace.webp"
  alt: "${title.replace(/"/g, '\\"')}"
${tagsYaml}
status: "published"
level: "level1"
schemaType: "Article"
${faqsYaml}
---

${body.trim()}
`;

        fs.writeFileSync(filePath, newFileContent, 'utf-8');
        updatedLangs.push(lang);
      }

      // Refresh sitemap and llms.txt
      try { writeSitemap(); } catch (e) { console.warn('sitemap err:', e); }
      try { writeLlmsTxt(); } catch (e) { console.warn('llms err:', e); }

      return res.json({
        success: true,
        slug,
        updatedLanguages: updatedLangs,
        message: `Статья ${slug} успешно обновлена на языках: ${updatedLangs.join(', ')}`
      });
    } catch (err: any) {
      console.error('Error updating article:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Delete article across all languages
  app.delete('/api/articles/:slug', (req, res) => {
    try {
      const slug = req.params.slug;
      const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');
      const deletedFrom: string[] = [];

      if (fs.existsSync(contentDir)) {
        const langDirs = fs.readdirSync(contentDir);
        for (const lang of langDirs) {
          const filePath = path.join(contentDir, lang, `${slug}.md`);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            deletedFrom.push(lang);
          }
        }
      }

      // Refresh sitemap and llms.txt
      try { writeSitemap(); } catch (e) { console.warn('sitemap err:', e); }
      try { writeLlmsTxt(); } catch (e) { console.warn('llms err:', e); }

      return res.json({
        success: true,
        slug,
        deletedFrom,
        message: `Статья ${slug} успешно удалена со всех языков (${deletedFrom.join(', ')})`
      });
    } catch (err: any) {
      console.error('Error deleting article:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Direct route to Admin Panel
  app.get(['/admin', '/admin/*', '/admin.html'], (req, res) => {
    const adminPath = path.join(process.cwd(), 'public', 'admin.html');
    if (fs.existsSync(adminPath)) {
      return res.sendFile(adminPath);
    }
    return res.status(404).send('Admin page not found');
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
