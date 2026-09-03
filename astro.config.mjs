import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://samal-bunker.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'ko', 'zh', 'kk', 'tl', 'ceb'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  }
});
