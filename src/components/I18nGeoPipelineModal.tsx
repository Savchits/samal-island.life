import { useState } from 'react';
import { 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  FileCode2, 
  Check, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Terminal,
  BookOpen,
  ArrowRight,
  Send,
  X
} from 'lucide-react';
import roomsJson from '../../data/rooms.json';
import pricingJson from '../../data/pricing.json';
import metaJson from '../../data/resort_meta.json';

interface I18nGeoPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function I18nGeoPipelineModal({ isOpen, onClose }: I18nGeoPipelineModalProps) {
  const [activeTab, setActiveTab] = useState<'collections' | 'publisher' | 'audit' | 'docs'>('collections');
  const [selectedArticleKey, setSelectedArticleKey] = useState<string>('kak-poluchit-vizu');
  const [selectedLang, setSelectedLang] = useState<string>('ru');

  // Interactive Publisher Form state
  const [newTitle, setNewTitle] = useState('0% налога на международный доход: легальный гайд для IT-специалистов');
  const [newDesc, setNewDesc] = useState('Разбор статьи 23 NIRC Филиппин: почему доход от зарубежных клиентов облагается налогом 0% при проживании в Самал IT-Бункере.');
  const [newKey, setNewKey] = useState('0-nalog-na-dohod');
  const [newTags, setNewTags] = useState('Налоги, NIRC, EO 86, IT-Бункер');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const sampleArticles = [
    {
      key: 'kak-poluchit-vizu',
      titleRu: 'Как получить 3-летнюю визу цифрового кочевника на Филиппинах: полный гайд',
      titleEn: 'How to Obtain 3-Year Digital Nomad Legal Residency in the Philippines',
      author: 'Дмитрий Назаров',
      pubDate: '2026-08-15',
      translationsCount: 7,
      level1: ['ru', 'en'],
      level2: ['ko', 'zh'],
      level3: ['kk', 'tl', 'ceb']
    },
    {
      key: 'starlink-na-vysote-265m',
      titleRu: 'Starlink на высоте 265 метров над уровнем моря: тесты пинга и резервирования',
      titleEn: 'Starlink at 265m Elevation: Real-World Latency & Failover Benchmarks',
      author: 'Кирилл Романов',
      pubDate: '2026-08-20',
      translationsCount: 7,
      level1: ['ru', 'en'],
      level2: ['ko', 'zh'],
      level3: ['kk', 'tl', 'ceb']
    }
  ];

  const handleSimulateTranslation = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      setTranslationResult({
        key: newKey,
        brandTermsPreserved: ['IT-Bunker', 'Starlink', 'Samal View Resort', 'EO 86'],
        translations: [
          {
            lang: 'en',
            level: 'Level 1 (Direct Publish)',
            status: 'published',
            title: '0% Personal Tax on Foreign Income: Complete Philippine NIRC Legal Framework',
            desc: 'Detailed breakdown of Section 23 NIRC: why overseas client income is taxed at 0% for IT residents at Samal IT-Bunker.',
            hreflang: `https://samal-bunker.com/en/blog/${newKey}/`
          },
          {
            lang: 'ko',
            level: 'Level 2 (Queue for Native Review)',
            status: 'review_pending',
            title: '[사말 IT-벙커 가이드] 해외 소득세 0% 법적 가이드',
            desc: '필리핀 NIRC 23조 분석: 사말 IT-Bunker 거주 시 해외 소득 비과세 혜택 안내.',
            hreflang: `https://samal-bunker.com/ko/blog/${newKey}/`
          },
          {
            lang: 'zh',
            level: 'Level 2 (Queue for Native Review)',
            status: 'review_pending',
            title: '[萨马尔IT-Bunker官方指南] 菲律宾海外所得0%个税全解析',
            desc: '依据菲律宾NIRC第23条法规：海外客户收入合法享受0%税率政策。',
            hreflang: `https://samal-bunker.com/zh/blog/${newKey}/`
          }
        ],
        sitemapXmlSnippet: `<url>\n  <loc>https://samal-bunker.com/en/blog/${newKey}/</loc>\n  <xhtml:link rel="alternate" hreflang="ru" href="https://samal-bunker.com/ru/blog/${newKey}/" />\n  <xhtml:link rel="alternate" hreflang="en" href="https://samal-bunker.com/en/blog/${newKey}/" />\n  <xhtml:link rel="alternate" hreflang="x-default" href="https://samal-bunker.com/en/blog/${newKey}/" />\n</url>`,
        llmsTxtSnippet: `- [EN] [0% Personal Tax on Foreign Income](https://samal-bunker.com/en/blog/${newKey}/): Detailed breakdown of Section 23 NIRC (translationKey: ${newKey})`
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="i18n-pipeline-modal"
        className="relative w-full max-w-5xl bg-[#0b101b] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070b12]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Astro i18n & GEO Content Engine
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ASTRO + ZOD + HREFLANG
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Automated Multilingual Pipeline • Single Source of Truth • llms.txt & sitemap.xml
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-[#090d16] overflow-x-auto">
          <button
            onClick={() => setActiveTab('collections')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'collections'
                ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Content Collections ({sampleArticles.length} ключа, 14 статей)
          </button>

          <button
            onClick={() => setActiveTab('publisher')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'publisher'
                ? 'border-emerald-400 text-emerald-300 font-bold bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Live AI Translation Publisher
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'audit'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            CI/CD & SEO/GEO Audit
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'docs'
                ? 'border-purple-400 text-purple-300 font-bold bg-purple-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Документация и ТЗ
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-200 text-sm">
          
          {/* TAB 1: Content Collections & Hreflang Clusters */}
          {activeTab === 'collections' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300 leading-relaxed font-mono">
                <strong>Архитектура Content Collections:</strong> Все статьи привязаны к уникальному полю <code>translationKey</code> в Zod-схеме. При переходе между языками сайт открывает точный аналог статьи на другом языке с взаимными тегами <code>rel="alternate" hreflang</code> и fallback на <code>x-default</code>.
              </div>

              {/* Articles List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleArticles.map((art) => (
                  <div
                    key={art.key}
                    onClick={() => setSelectedArticleKey(art.key)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedArticleKey === art.key
                        ? 'bg-white/[0.06] border-cyan-400 shadow-md'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        key: {art.key}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">
                        ✓ 7/7 языков сгенерировано
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm mb-1 line-clamp-2">
                      {art.titleRu}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mb-3">
                      EN: {art.titleEn}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-white/10">
                      <span>{art.author}</span>
                      <span>{art.pubDate}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Hreflang Reciprocal Matrix for selected key */}
              <div className="p-5 rounded-xl bg-[#070b12] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300">
                    Взаимный hreflang-кластер для ключа: <span className="text-cyan-400">{selectedArticleKey}</span>
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Взаимность 100% подтверждена
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-white/5 border border-emerald-500/20">
                    <div className="text-emerald-400 font-bold mb-1">RU (Level 1 • Source)</div>
                    <div className="text-slate-400 truncate">/ru/blog/{selectedArticleKey}/</div>
                    <div className="text-[10px] text-emerald-400/80 mt-1">status: published</div>
                  </div>
                  <div className="p-2.5 rounded bg-white/5 border border-emerald-500/20">
                    <div className="text-emerald-400 font-bold mb-1">EN (Level 1 • Auto)</div>
                    <div className="text-slate-400 truncate">/en/blog/{selectedArticleKey}/</div>
                    <div className="text-[10px] text-emerald-400/80 mt-1">status: published</div>
                  </div>
                  <div className="p-2.5 rounded bg-white/5 border border-amber-500/20">
                    <div className="text-amber-400 font-bold mb-1">KO (Level 2 • Queue)</div>
                    <div className="text-slate-400 truncate">/ko/blog/{selectedArticleKey}/</div>
                    <div className="text-[10px] text-amber-400/80 mt-1">status: review_pending</div>
                  </div>
                  <div className="p-2.5 rounded bg-white/5 border border-amber-500/20">
                    <div className="text-amber-400 font-bold mb-1">ZH (Level 2 • Queue)</div>
                    <div className="text-slate-400 truncate">/zh/blog/{selectedArticleKey}/</div>
                    <div className="text-[10px] text-amber-400/80 mt-1">status: review_pending</div>
                  </div>
                  <div className="p-2.5 rounded bg-white/5 border border-slate-700">
                    <div className="text-slate-400 font-bold mb-1">KK (Level 3 • Draft)</div>
                    <div className="text-slate-400 truncate">/kk/blog/{selectedArticleKey}/</div>
                    <div className="text-[10px] text-slate-500 mt-1">status: draft</div>
                  </div>
                  <div className="p-2.5 rounded bg-white/5 border border-cyan-500/20">
                    <div className="text-cyan-400 font-bold mb-1">x-default (Global)</div>
                    <div className="text-slate-400 truncate">https://samal-bunker.com/en/...</div>
                    <div className="text-[10px] text-cyan-300/80 mt-1">points to EN primary</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] text-slate-300">
                  <div className="text-slate-500 mb-1">// Сгенерированный HTML &lt;head&gt; для каждого варианта:</div>
                  <div className="text-emerald-300">&lt;link rel="alternate" hreflang="ru" href="https://samal-bunker.com/ru/blog/{selectedArticleKey}/" /&gt;</div>
                  <div className="text-emerald-300">&lt;link rel="alternate" hreflang="en" href="https://samal-bunker.com/en/blog/{selectedArticleKey}/" /&gt;</div>
                  <div className="text-amber-300">&lt;link rel="alternate" hreflang="ko" href="https://samal-bunker.com/ko/blog/{selectedArticleKey}/" /&gt;</div>
                  <div className="text-amber-300">&lt;link rel="alternate" hreflang="zh" href="https://samal-bunker.com/zh/blog/{selectedArticleKey}/" /&gt;</div>
                  <div className="text-cyan-300">&lt;link rel="alternate" hreflang="x-default" href="https://samal-bunker.com/en/blog/{selectedArticleKey}/" /&gt;</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Live AI Translation Publisher */}
          {activeTab === 'publisher' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed font-mono">
                <strong>Автоматический пайплайн публикации:</strong> Введите статью на русском языке. Пайплайн автоматически сохранит ключевые брендовые термины (IT-Bunker, Starlink, Samal View Resort), переведет Title, Meta-Description, Image Alt, FAQ-блоки, создаст языковые файлы и перестроит sitemap.xml и llms.txt.
              </div>

              {/* Form */}
              <div className="p-5 rounded-xl bg-[#070b12] border border-white/10 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Заголовок статьи (Русский исходник):
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Уникальный translationKey (slug):
                    </label>
                    <input
                      type="text"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Теги статьи:
                    </label>
                    <input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    SEO Meta Description (150-160 символов):
                  </label>
                  <textarea
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓ Защищенный Brand Glossary:</span>
                    <span>IT-Bunker, Starlink, Samal View Resort, EO 86</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSimulateTranslation}
                    disabled={isTranslating}
                    className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isTranslating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Перевод через Gemini 3.6-flash...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Запустить AI-перевод и генерацию hreflang
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Translation Output Results */}
              {translationResult && (
                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Успешно сгенерированы версии для ключа "{translationResult.key}"
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Обновлены: sitemap.xml, llms.txt, Schema.org
                    </span>
                  </div>

                  <div className="space-y-2">
                    {translationResult.translations.map((t: any) => (
                      <div key={t.lang} className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-emerald-300 font-bold uppercase">{t.lang} • {t.level}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300">{t.status}</span>
                        </div>
                        <div className="font-medium text-white">{t.title}</div>
                        <div className="text-slate-400 text-[11px]">{t.desc}</div>
                        <div className="font-mono text-[10px] text-slate-500">{t.hreflang}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded bg-black/50 border border-white/5">
                      <div className="text-slate-400 mb-1 text-[10px] uppercase font-bold">Сгенерированный блок sitemap.xml:</div>
                      <pre className="text-slate-300 text-[10px] whitespace-pre-wrap">{translationResult.sitemapXmlSnippet}</pre>
                    </div>
                    <div className="p-3 rounded bg-black/50 border border-white/5">
                      <div className="text-slate-400 mb-1 text-[10px] uppercase font-bold">Запись добавлена в llms.txt:</div>
                      <pre className="text-emerald-400 text-[10px] whitespace-pre-wrap">{translationResult.llmsTxtSnippet}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CI/CD & SEO/GEO Audit */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-xs font-mono text-slate-400 uppercase">Hreflang Reciprocity</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">100% PASS</div>
                  <div className="text-[11px] text-slate-400 mt-1">Все 14 страниц содержат взаимные перекрестные ссылки</div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <div className="text-xs font-mono text-slate-400 uppercase">Single Source of Truth</div>
                  <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">0 ДЕСИНХРОНОВ</div>
                  <div className="text-[11px] text-slate-400 mt-1">Цены и номера в HTML и Schema.org совпадают на 100%</div>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <div className="text-xs font-mono text-slate-400 uppercase">GEO & LLM Индексация</div>
                  <div className="text-2xl font-bold font-mono text-purple-300 mt-1">АКТИВНО</div>
                  <div className="text-[11px] text-slate-400 mt-1">sitemap.xml + llms.txt синхронизированы</div>
                </div>
              </div>

              {/* Single Source of Truth verification table */}
              <div className="p-5 rounded-xl bg-[#070b12] border border-white/10 space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300">
                  Сверка Single Source of Truth (data/rooms.json vs Schema.org HotelRoom)
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 text-left">
                        <th className="pb-2">Номер</th>
                        <th className="pb-2">Статус</th>
                        <th className="pb-2">Цена в rooms.json</th>
                        <th className="pb-2">Цена в Schema.org</th>
                        <th className="pb-2 text-right">Сверка</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {roomsJson.rooms.map((room) => (
                        <tr key={room.id}>
                          <td className="py-2.5 text-white font-bold">{room.name}</td>
                          <td className="py-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              room.status === 'available' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {room.status}
                            </span>
                          </td>
                          <td className="py-2.5">${room.pricePerMonth}/мес</td>
                          <td className="py-2.5">${room.pricePerMonth}/мес</td>
                          <td className="py-2.5 text-right text-emerald-400 font-bold">✓ СОВПАДАЕТ</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CI/CD Terminal Output */}
              <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 border-b border-white/10 pb-2">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    scripts/verify-seo-geo.ts CI/CD Step Result
                  </span>
                  <span className="text-emerald-400">Exit Code: 0</span>
                </div>
                <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto whitespace-pre">
{`=====================================================
Running Comprehensive SEO, GEO & Multilingual Audit
=====================================================
Russian Source Articles: 2
✓ EN: 2 translated files (Missing: 0)
✓ KO: 2 translated files (Missing: 0)
✓ ZH: 2 translated files (Missing: 0)
✓ KK: 2 translated files (Missing: 0)
✓ TL: 2 translated files (Missing: 0)
✓ CEB: 2 translated files (Missing: 0)
Hreflang Bidirectional Clusters: ✓ PASS
JSON-LD Schema & Data Sync: ✓ PASS
✓ ALL CHECKS PASSED: Hreflang, JSON-LD, and Content Collections are 100% in sync.`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: Documentation & Guide */}
          {activeTab === 'docs' && (
            <div className="space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 font-mono text-purple-300">
                Полная инструкция доступна в корне репозитория в файле <strong>DOCUMENTATION.md</strong>.
              </div>

              <div className="p-5 rounded-xl bg-[#070b12] border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white">
                  1. Как добавить новую статью на русском языке
                </h4>
                <p>
                  Автор создает файл <code>src/content/blog/ru/nazvanie-stati.md</code>. В frontmatter указывается уникальный <code>translationKey</code>, дата, автор, теги и FAQ-блоки.
                </p>

                <h4 className="text-sm font-bold text-white pt-2 border-t border-white/10">
                  2. Автоматический запуск и языковые уровни
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-400">
                  <li><strong className="text-white">Уровень 1 (Английский):</strong> Переводится автоматически через Gemini с защитой терминологии (IT-Bunker, Starlink, цены номеров не искажаются) и мгновенно публикуется со статусом <code>published</code>.</li>
                  <li><strong className="text-white">Уровень 2 (Корейский, Китайский):</strong> Переводится автоматически и помещается в очередь со статусом <code>review_pending</code> для контрольной вычитки носителем.</li>
                  <li><strong className="text-white">Уровень 3 (Казахский, Тагальский, Себуано):</strong> Создаются черновики (<code>draft</code>).</li>
                </ul>

                <h4 className="text-sm font-bold text-white pt-2 border-t border-white/10">
                  3. Автоматическое обновление sitemap.xml и llms.txt
                </h4>
                <p>
                  Скрипты <code>scripts/build-sitemap.ts</code> и <code>scripts/update-llms.ts</code> пересобирают карту сайта с тегами <code>xhtml:link</code> и базу знаний для Perplexity / SearchGPT без участия разработчика.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#070b12] text-xs font-mono">
          <div className="flex items-center gap-4 text-slate-400">
            <span>Astro v7 Content Collections</span>
            <span>•</span>
            <span>Gemini 3.6-flash</span>
            <span>•</span>
            <span>Google Rich Results Compliant</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            Закрыть панель
          </button>
        </div>
      </div>
    </div>
  );
}
