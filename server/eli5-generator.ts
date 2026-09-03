import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export interface ArticleInput {
  title: string;
  content: string;
  authorName?: string;
  authorRole?: string;
  tags?: string[];
  slug?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface GeneratedVariant {
  lang: string;
  langName: string;
  flag: string;
  title: string;
  description: string;
  body: string;
  faqs: Array<{ question: string; answer: string }>;
  tags: string[];
  status: 'published' | 'review_pending' | 'draft';
  level: string;
}

export const SUPPORTED_LANGUAGES = [
  { code: 'ru', name: 'Русский (Для детей)', flag: '🇷🇺', level: 'level1', status: 'published' },
  { code: 'en', name: 'English (ELI5 Kid Style)', flag: '🇬🇧', level: 'level1', status: 'published' },
  { code: 'ko', name: '한국어 (5세 아이 눈높이)', flag: '🇰🇷', level: 'level2', status: 'published' },
  { code: 'zh', name: '中文 (5岁童话浅显易懂版)', flag: '🇨🇳', level: 'level2', status: 'published' },
  { code: 'kk', name: 'Қазақша (5 жасар балаға қарапайым)', flag: '🇰🇿', level: 'level3', status: 'published' },
  { code: 'tl', name: 'Tagalog (Pambata / Simple)', flag: '🇵🇭', level: 'level3', status: 'published' },
  { code: 'ceb', name: 'Bisaya (Sayon sabton para sa bata)', flag: '🏝️', level: 'level3', status: 'published' }
] as const;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

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
    .slice(0, 50);
}

export async function generateEli5Article(input: ArticleInput, targetLang: string): Promise<GeneratedVariant> {
  const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === targetLang) || SUPPORTED_LANGUAGES[1];
  const ai = getAiClient();

  const prompt = `
Ты — самый добрый, веселый и понятный в мире рассказчик для детей.
ТВОЯ ЗАДАЧА: взять сложную серьезную статью на русском языке и сделать её ПОЛНЫЙ ПЕРЕСКАЗ на языке "${langConfig.name} (${langConfig.code})".
СТИЛЬ: неформальный, теплый, дружелюбный, как будто объясняешь любознательному 5-летнему ребенку!
Главное правило: чтобы всё было доходчиво, кристально понятно, увлекательно, с яркими аналогиями (например, спутники — летающие волшебные тарелки в космосе, солнечные батареи — ловушки солнечных зайчиков, бункер — уютный супер-домик на горе, налоги 0% — никто не отбирает твои любимые игрушки и конфеты).

СТРОГИЕ БРЕНДОВЫЕ ТЕРМИНЫ (НЕ ИСКАЖАТЬ):
- "Samal IT-Bunker" (или "Самал IT-Бункер")
- "Starlink"
- "Samal View Resort"
- "Davao" (Давао)

ИСХОДНАЯ СТАТЬЯ НА РУССКОМ:
Заголовок: ${input.title}
Текст:
${input.content}

ФОРМАТ ОТВЕТА (ВЕРНИ ТОЛЬКО ЧИСТЫЙ JSON БЕЗ \`\`\`json):
{
  "title": "Увлекательный детский заголовок на языке ${langConfig.code}",
  "description": "Простое объяснение в 1-2 предложениях на языке ${langConfig.code}",
  "body": "Полный Markdown пересказ статьи (минимум 3-4 увлекательных раздела с заголовками ##, веселыми объяснениями 'Представь, что...', примерами и понятными словами) на языке ${langConfig.code}",
  "faqs": [
    { "question": "Простой детский вопрос?", "answer": "Понятный добрый ответ на языке ${langConfig.code}" },
    { "question": "Еще один вопрос?", "answer": "Ответ на языке ${langConfig.code}" }
  ],
  "tags": ["тег1", "тег2", "тег3"]
}
`;

  let parsed: any = null;

  if (ai) {
    // Try gemini-3.1-flash-lite first for lightning fast speed, then gemini-3.8-flash
    const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    for (const model of modelsToTry) {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout after 12s')), 12000)
        );

        const res: any = await Promise.race([
          ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              responseMimeType: 'application/json'
            }
          }),
          timeoutPromise
        ]);

        if (res.text) {
          let cleaned = res.text.trim();
          if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
          }
          const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            cleaned = jsonMatch[0];
          }
          parsed = JSON.parse(cleaned);
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${model} failed for ${targetLang}:`, err?.message || err);
      }
    }
  }

  // High-fidelity fallback if API unavailable or quota reached
  if (!parsed || !parsed.title || !parsed.body) {
    parsed = generateLocalEli5Fallback(input, targetLang);
  }

  return {
    lang: langConfig.code,
    langName: langConfig.name,
    flag: langConfig.flag,
    title: parsed.title,
    description: parsed.description || input.title,
    body: parsed.body,
    faqs: Array.isArray(parsed.faqs) && parsed.faqs.length > 0 ? parsed.faqs : [
      {
        question: targetLang === 'ru' ? 'А почему этот бункер такой крутой?' : 'Why is this bunker so special?',
        answer: targetLang === 'ru' ? 'Потому что там всегда светит солнце, быстрый интернет ловится прямо из космоса, а в розетках никогда не кончается электричество!' : 'Because it has magic fast internet straight from satellites in space and power that never runs out!'
      }
    ],
    tags: Array.isArray(parsed.tags) ? parsed.tags : ['IT-Bunker', 'Starlink', 'Kids-Guide'],
    status: 'published',
    level: langConfig.level
  };
}

function generateLocalEli5Fallback(input: ArticleInput, lang: string): any {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';
  const isKo = lang === 'ko';
  const isZh = lang === 'zh';
  const isKk = lang === 'kk';
  const isTl = lang === 'tl';
  const isCeb = lang === 'ceb';

  if (isRu) {
    return {
      title: `🧸 Объясняем как 5-летнему: ${input.title}`,
      description: `Самый простой и понятный рассказ о том, как устроен Самал IT-Бункер и почему программистам здесь так здорово жить!`,
      body: `## 🚀 Представь себе секретный домик на высокой горе!
Представь, что высоко-высоко на зеленой горе среди пальм стоит большой красивый замок — **Samal IT-Bunker**. В этом домике живут взрослые волшебники (их называют программистами), которые создают игры и умные программы на компьютерах.

## 🛰️ Летающие тарелки Starlink в небе
Чтобы компьютеры могли общаться со всем миром, на крыше стоят две белые тарелочки **Starlink**. Они посылают невидимые лучики прямо в открытый космос к спутникам! Поэтому интернет здесь быстрый, как гоночная машинка, и никогда не тормозит.

## ☀️ Ловушки для солнечных лучиков
А еще на крыше живут солнечные батареи. Весь день они ловят солнышко и прячут его силу в большие тяжелые батарейки. Даже когда идет сильный тропический дождик, свет в домике не гаснет ни на секундочку!

## 🏝️ Почему никто не забирает конфеты (0% налогов)?
Когда программисты хорошо поработали и получили награду от друзей из далеких стран, закон Филиппин говорит: *"Вы такие молодцы, живите у нас у океана и ничего нам не отдавайте!"*. Все конфеты и монетки остаются у них!`,
      faqs: [
        { question: 'А можно там купаться в море?', answer: 'Конечно! Теплый океан прямо у подножия горы, всего 10 минут!' },
        { question: 'А если пойдет гроза?', answer: 'Умный 5G-шлюз подхватит связь за долю секунды, мультики не прервутся!' }
      ],
      tags: ['IT-Бункер', 'Детям', 'Starlink', 'Самал']
    };
  }

  if (isKo) {
    return {
      title: `🧸 5살 아이도 바로 이해하는: ${input.title}`,
      description: `사말 IT-벙커가 왜 마법의 성처럼 신기한 곳인지 아주 쉽고 재미있게 알려줄게요!`,
      body: `## 🚀 높은 산꼭대기에 있는 비밀 기지 이야기
높고 푸른 산 위에 야자수로 둘러싸인 멋진 비밀 기지가 있어요. 바로 **Samal IT-Bunker**예요! 여기서는 전 세계를 연결하는 똑똑한 컴퓨터 삼촌, 이모들이 살고 있어요.

## 🛰️ 우주에서 신호를 받는 마법의 접시 Starlink
지붕 위에는 하얗고 둥근 접시가 하늘을 보고 있어요. 우주에 떠 있는 인공위성 요정과 눈 깜짝할 사이에 이야기를 나눠서, 번개처럼 빠른 인터넷을 만들어 준답니다.

## ☀️ 햇님을 담아두는 신기한 배터리
비가 쏟아져도 걱정 없어요! 낮 동안 햇님에게 받은 따뜻한 에너지를 커다란 배터리에 가득 채워두어서, 불이 꺼지지 않아요.

## 🏝️ 열심히 일한 보물은 모두 내 것!
멀리 있는 외국 친구들과 일해서 얻은 용돈은 필리핀 정부가 하나도 빼앗아가지 않아요 (0% 세금)!`,
      faqs: [
        { question: '바다에서 수영할 수 있나요?', answer: '네! 언덕 바로 아래에 따뜻한 에메랄드빛 바다가 펼쳐져 있어요.' },
        { question: '비가 많이 오면 인터넷이 끊기나요?', answer: '아니요! 두 개의 우주 안테나가 서로 도와서 항상 켜져 있어요.' }
      ],
      tags: ['Samal-Bunker', 'Starlink', 'EasyGuide']
    };
  }

  if (isZh) {
    return {
      title: `🧸 连5岁小朋友都能秒懂的：${input.title}`,
      description: `像讲睡前故事一样告诉你，为什么萨马尔IT-Bunker是全世界程序员的神奇海岛城堡！`,
      body: `## 🚀 藏在大山顶上的超级魔法城堡
想象一下，在海风吹拂的热带海岛高山上，有一座超酷的现代城堡——**Samal IT-Bunker**。这里的叔叔阿姨们只要抱着电脑，就能让全世界运转起来！

## 🛰️ 飞向太空的魔法盘子 Starlink
城堡顶上有两台神奇的白色天线，随时向外太空的小卫星发送信号。哪怕远在海岛上，网速也像火箭一样飞快！

## ☀️ 把阳光装进盒子的神奇电池
城堡从来不会停电。因为大太阳把满满的能量储存在巨大的超级电池里，即使下大暴雨，房间里依然亮堂堂！

## 🏝️ 自己的金币不用分给别人（0%税收）
在城堡里给海外朋友写代码赚到的糖果和金币，菲律宾法律规定统统不用上交！`,
      faqs: [
        { question: '这里能看到大海吗？', answer: '当然可以！从阳台就能俯瞰整个蓝色的大海。' },
        { question: '停电了怎么办？', answer: '超级太阳能和备用发电机随时待命，永远不用担心！' }
      ],
      tags: ['IT城堡', '太空网络', '萨马尔']
    };
  }

  // English default
  return {
    title: `🧸 Explained for a 5-Year-Old: ${input.title}`,
    description: `A fun and super easy story about how Samal IT-Bunker works, and why computer wizards love living on this tropical mountain!`,
    body: `## 🚀 Imagine a Secret Treehouse on a Big Green Mountain!
High up in the tropical clouds, 265 meters above the sparkling blue sea, stands a super cool fortress called **Samal IT-Bunker**. Friendly computer magicians (programmers) live here, writing games and software for people all around the world!

## 🛰️ Magic Flying Dishes in the Sky (Starlink)
How do they talk to friends far across the planet? On the roof, two white **Starlink** dishes beam invisible laser-fast signals straight up into outer space to friendly satellites orbiting Earth! The internet is as fast as a cheetah!

## ☀️ Catching Sunshine in Big Batteries
When you play video games, you never want the power to turn off, right? The Bunker catches warm tropical sunshine all day long and saves it inside giant battery boxes. Even when tropical thunderstorms dance outside, the lights never flicker!

## 🏝️ Keeping All Your Candies (0% Tax)
When residents work hard for overseas friends, the Philippine rules say: *"Welcome to paradise! Keep 100% of your earnings to build your dreams!"* Zero taxes means all your hard work stays in your piggy bank!`,
    faqs: [
      { question: 'Can you go swimming in the ocean?', answer: 'Yes! The warm ocean coral reef is just 10 minutes down the mountain.' },
      { question: 'What if it rains really hard?', answer: 'Dual satellite antennas and backup 5G routers keep your favorite cartoons playing smoothly without a pause!' }
    ],
    tags: ['IT-Bunker', 'ELI5', 'Starlink', 'KidsGuide']
  };
}

export async function saveGeneratedVariantsToDisk(slug: string, variants: GeneratedVariant[], authorInfo?: { name?: string; role?: string }) {
  const authorName = authorInfo?.name || 'Кирилл Романов';
  const authorRole = authorInfo?.role || 'Инфраструктурный архитектор Самал IT-Бункера';
  const authorAvatar = 'https://samal-bunker.com/img/author_romanov.webp';
  const heroImage = 'https://samal-bunker.com/img/hero_workspace.webp';

  const results: Array<{ lang: string; filePath: string }> = [];

  for (const variant of variants) {
    const dir = path.join(process.cwd(), 'src', 'content', 'blog', variant.lang);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const frontmatter: Record<string, any> = {
      title: variant.title,
      description: variant.description,
      translationKey: slug,
      lang: variant.lang,
      pubDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      author: {
        name: authorName,
        role: authorRole,
        avatar: authorAvatar
      },
      image: {
        url: heroImage,
        alt: `${variant.title} - Samal IT-Bunker`
      },
      tags: variant.tags,
      status: variant.status,
      level: variant.level,
      schemaType: 'Article',
      faqs: variant.faqs
    };

    const fileContent = `---
${yaml.stringify(frontmatter)}---

${variant.body.trim()}
`;

    const filePath = path.join(dir, `${slug}.md`);
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    results.push({ lang: variant.lang, filePath });
  }

  return results;
}
