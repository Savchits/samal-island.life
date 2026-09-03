import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Core translation identifier: all localized versions share the exact same key
    translationKey: z.string(),
    lang: z.enum(['ru', 'en', 'ko', 'zh', 'kk', 'tl', 'ceb']),
    slug: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.object({
      name: z.string(),
      role: z.string(),
      avatar: z.string().optional()
    }),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string()).default([]),
    // Lifecycle status: Level 1 published immediately; Level 2 queued for native check
    status: z.enum(['published', 'review_pending', 'draft']).default('published'),
    level: z.enum(['level1', 'level2', 'level3']).default('level1'),
    schemaType: z.enum(['BlogPosting', 'Article']).default('Article'),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string()
      })
    ).optional()
  })
});

export const collections = {
  blog: blogCollection
};
