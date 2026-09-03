# Инструкция по добавлению статей и работе автоматического пайплайна i18n & GEO

## 1. Как добавить новую статью на русском языке

Для публикации новой статьи автору достаточно создать один файл в директории `src/content/blog/ru/`:

```markdown
---
title: "Название статьи на русском"
description: "SEO-описание статьи (150-160 символов)"
translationKey: "unikalnyj-slug-stati"
lang: "ru"
pubDate: 2026-09-03
author:
  name: "Кирилл Романов"
  role: "Инфраструктурный архитектор Самал IT-Бункера"
  avatar: "https://samal-bunker.com/img/author_romanov.webp"
image:
  url: "https://samal-bunker.com/img/hero_workspace.webp"
  alt: "Описание изображения для поисковиков"
tags: ["Starlink", "Инфраструктура", "IT-Бункер"]
status: "published"
level: "level1"
schemaType: "Article"
faqs:
  - question: "Вопрос 1?"
    answer: "Ответ на вопрос 1."
---

# Заголовок статьи

Основной текст статьи на русском языке в формате Markdown...
```

---

## 2. Что происходит автоматически после добавления (Пайплайн)

1. **Триггер (Webhook / GitHub Action)**:
   При коммите или push в `src/content/blog/ru/**.md` (или при нажатии кнопки в Web CMS) запускается скрипт:
   ```bash
   npx tsx scripts/translate-article.ts src/content/blog/ru/vasha-statya.md
   ```

2. **AI-перевод с сохранением брендового глоссария**:
   Скрипт использует Gemini 3.6-flash (с fallback на внутренний словарь при сетевых сбоях) и применяет жесткий глоссарий бренда (`IT-Bunker`, `Starlink`, `Samal View Resort`, названия номеров и техники не переводятся дословно).
   Переводятся:
   - `title`
   - `description`
   - `image.alt`
   - Вопросы и ответы в блоке `faqs`
   - Основной текст Markdown

3. **Маршрутизация по уровням языков (Language Levels)**:
   - **Уровень 1 (Английский — `en`)**:
     - Сохраняется в `src/content/blog/en/` со статусом `status: "published"`.
     - Мгновенно становится доступен на сайте по URL `/en/blog/[slug]/`.
   - **Уровень 2 (Корейский `ko`, Китайский `zh`)**:
     - Сохраняются в `src/content/blog/ko/` и `src/content/blog/zh/` со статусом `status: "review_pending"`.
     - Отправляются в очередь на вычитку носителем языка перед финальной индексацией.
   - **Уровень 3 (Казахский `kk`, Тагальский `tl`, Себуано `ceb`)**:
     - Сохраняются со статусом `status: "draft"`, `level: "level3"`.

4. **Автогенерация hreflang и sitemap.xml**:
   Скрипт `scripts/build-sitemap.ts` находит все статьи с одинаковым `translationKey` и формирует для каждой страницы взаимные перекрестные теги:
   ```xml
   <xhtml:link rel="alternate" hreflang="ru" href="https://samal-bunker.com/ru/blog/slug/" />
   <xhtml:link rel="alternate" hreflang="en" href="https://samal-bunker.com/en/blog/slug/" />
   <xhtml:link rel="alternate" hreflang="ko" href="https://samal-bunker.com/ko/blog/slug/" />
   <xhtml:link rel="alternate" hreflang="zh" href="https://samal-bunker.com/zh/blog/slug/" />
   <xhtml:link rel="alternate" hreflang="x-default" href="https://samal-bunker.com/en/blog/slug/" />
   ```

5. **Автоматическое обновление `llms.txt`**:
   Скрипт `scripts/update-llms.ts` сканирует коллекции контента и актуальные данные номеров из `data/rooms.json` и пересобирает `/llms.txt` с прямыми ссылками, датами публикации и краткими описаниями для поисковых AI-агентов (Perplexity, SearchGPT, Claude, Gemini).

6. **Проверка целостности и Schema.org (CI/CD Quality Gate)**:
   Скрипт `scripts/verify-seo-geo.ts` валидирует:
   - Взаимность всех hreflang-ссылок (Reciprocity).
   - Точное совпадение цен и характеристик номеров между `data/rooms.json` и Schema.org JSON-LD.
   - Полноту переводов на приоритетные языки.
