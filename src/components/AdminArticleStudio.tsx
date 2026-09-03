import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Download, 
  FileText, 
  RefreshCw, 
  Layers, 
  BookOpen, 
  Globe2, 
  Shield, 
  AlertCircle, 
  Edit3, 
  Check, 
  ExternalLink,
  ChevronRight,
  User,
  Tag,
  Flame,
  X,
  Eye,
  Columns3
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GeneratedVariant {
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

const PRESET_ARTICLES = [
  {
    title: 'Как работает космический интернет Starlink на острове Самал',
    content: `Резорт Samal IT-Bunker находится на высоте 265 метров над уровнем моря на тропическом острове Самал (Филиппины). 
Здесь развернута полностью автономная интернет-инфраструктура. Она состоит из двух независимых спутниковых станций Starlink Gen 3, работающих в режиме агрегации трафика и балансировки нагрузки. 
Сигнал поступает напрямую от созвездия низкоорбитальных спутников SpaceX. 
В дополнение к спутникам установлен промышленный 5G/LTE-роутер Teltonika с двумя местными SIM-картами (Globe и Smart) для мгновенного резервирования в случае тропического шторма. 
Задержка (ping) составляет всего 38–48 мс до Сингапура и Токио, а суммарная скорость достигает 280–350 Мбит/с. 
Питание обеспечивается гибридной солнечной электростанцией 24 кВт с аккумуляторами LiFePO4, поэтому перебои городской электросети острова никак не влияют на работу резидентов.`,
    tags: ['Starlink', 'IT-Бункер', 'Интернет', 'Космос']
  },
  {
    title: 'Почему IT-номады не платят налоги с зарубежного дохода на Филиппинах',
    content: `В Налоговом кодексе Филиппин (National Internal Revenue Code, NIRC) существует фундаментальная статья 23 (Section 23). 
Согласно этой норме, нерезиденты-иностранцы (Non-Resident Aliens, NRA) облагаются подоходным налогом исключительно на доходы, полученные из источников внутри территории Филиппин. 
Если вы являетесь IT-разработчиком, основателем стартапа или консультантом и получаете оплату от иностранных заказчиков на свои зарубежные банковские счета (US, EU, Wise, криптокошельки), ставка подоходного налога на Филиппинах составляет ровно 0%. 
При этом в 2026 году действует президентский указ EO 86 и программа Nomad Visa, позволяющая легально проживать в стране до 3 лет без риска возникновения локального налогового резидентства.`,
    tags: ['0% Налогов', 'Nomad Visa', 'Релокация', 'Законы']
  },
  {
    title: 'Что такое Самал IT-Бункер и почему здесь никогда не гаснет свет',
    content: `Самал IT-Бункер — это закрытая автономная резиденция для основателей IT-стартапов и senior-инженеров, расположенная на частной территории Samal View Resort. 
В отличие от обычных отелей на Бали или в Таиланде, бункер спроектирован по стандарту Tier-3 для дата-центров. 
На крыше установлена солнечная электростанция мощностью 24 кВт на базе инверторов Deye и батарей LiFePO4 емкостью 45 кВт·ч. 
В случае длительной облачности автоматически запускается бесшумный дизель-генератор с запасом топлива на 14 суток непрерывной работы. 
Переключение между источниками питания происходит за 10 миллисекунд через ИБП APC Smart-UPS, благодаря чему компьютеры, мониторы и роутеры резидентов не перезагружаются ни при каких обстоятельствах.`,
    tags: ['Автономия', 'Электричество', 'Бункер', 'Солнечные батареи']
  }
];

const TARGET_LANGS = [
  { code: 'ru', name: 'Русский (ELI5)', flag: '🇷🇺', label: 'Детский пересказ' },
  { code: 'en', name: 'English (ELI5)', flag: '🇬🇧', label: 'Kid Friendly' },
  { code: 'ko', name: '한국어 (5세)', flag: '🇰🇷', label: '아이 눈높이' },
  { code: 'zh', name: '中文 (5岁版)', flag: '🇨🇳', label: '童话科普' },
  { code: 'kk', name: 'Қазақша (5 жас)', flag: '🇰🇿', label: 'Қарапайым' },
  { code: 'tl', name: 'Tagalog (Pambata)', flag: '🇵🇭', label: 'Kuwento' },
  { code: 'ceb', name: 'Bisaya (Bata)', flag: '🏝️', label: 'Sayon' },
];

export function AdminArticleStudio({ onClose }: { onClose: () => void }) {
  // Input fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('Кирилл Романов');
  const [authorRole, setAuthorRole] = useState('Инфраструктурный архитектор Самал IT-Бункера');
  const [customTag, setCustomTag] = useState('');
  const [tags, setTags] = useState<string[]>(['IT-Бункер', 'Starlink', 'ОбъясняемДетям']);
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationLog, setGenerationLog] = useState<string>('');
  const [generatedVariants, setGeneratedVariants] = useState<GeneratedVariant[]>([]);
  const [activeLangTab, setActiveLangTab] = useState<string>('ru');
  const [viewMode, setViewMode] = useState<'preview' | 'side-by-side' | 'edit'>('preview');

  // Persistence status
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLang, setCopiedLang] = useState<string | null>(null);

  // Existing articles list
  const [existingArticles, setExistingArticles] = useState<any[]>([]);
  const [isLoadingExisting, setIsLoadingExisting] = useState(false);
  const [activeSection, setActiveSection] = useState<'create' | 'library'>('create');

  // Load existing articles on mount
  useEffect(() => {
    fetchExistingArticles();
  }, []);

  const fetchExistingArticles = async () => {
    try {
      setIsLoadingExisting(true);
      const res = await fetch('/api/articles');
      if (res.ok) {
        const data = await res.json();
        setExistingArticles(data.articles || []);
      }
    } catch (e) {
      console.warn('Failed to load existing articles:', e);
    } finally {
      setIsLoadingExisting(false);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_ARTICLES[0]) => {
    setTitle(preset.title);
    setContent(preset.content);
    setTags(preset.tags);
  };

  const handleAddTag = () => {
    if (customTag.trim() && !tags.includes(customTag.trim())) {
      setTags([...tags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Main Generation Handler: generates for all 7 languages
  const handleGenerateAll = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Пожалуйста, введите заголовок и текст статьи на русском языке!');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(10);
    setGenerationLog('Инициализация нейросети Gemini с режимом пересказа для 5-летних детей...');
    setGeneratedVariants([]);
    setSaveSuccess(false);

    try {
      // Step 1: Call API to batch generate or sequentially generate
      const res = await fetch('/api/articles/generate-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          authorName,
          authorRole,
          tags
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (data.variants && data.variants.length > 0) {
        setGeneratedVariants(data.variants);
        setGenerationProgress(100);
        setGenerationLog('Успешно! Все 7 языковых версий сгенерированы и сохранены в блог.');
        setSaveSuccess(true);
        setActiveLangTab('ru');

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Refresh existing articles list
        fetchExistingArticles();
      } else {
        throw new Error('No variants returned');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setGenerationLog(`Ошибка при генерации: ${err.message}. Попробуйте еще раз.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMarkdown = (variant: GeneratedVariant) => {
    const fullText = `---
title: "${variant.title}"
description: "${variant.description}"
lang: "${variant.lang}"
status: "${variant.status}"
---

${variant.body}
`;
    navigator.clipboard.writeText(fullText);
    setCopiedLang(variant.lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const handleDownloadMarkdown = (variant: GeneratedVariant) => {
    const fullText = `---
title: "${variant.title}"
description: "${variant.description}"
lang: "${variant.lang}"
status: "${variant.status}"
---

${variant.body}
`;
    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${variant.lang}-article.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentVariant = generatedVariants.find(v => v.lang === activeLangTab) || generatedVariants[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#060910] text-slate-100 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-cyan-500/20 bg-[#090d16]/90 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/10">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold tracking-wider text-white text-sm">
                BUNKER CMS
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-semibold">
                AI ELI5 Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Добавление статей и мгновенный пересказ для 5-летних на всех 7 языках
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900/80 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveSection('create')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSection === 'create'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Создать статью</span>
            </button>
            <button
              onClick={() => setActiveSection('library')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSection === 'library'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>База статей ({existingArticles.length})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Закрыть админку"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 overflow-hidden">
        {activeSection === 'create' ? (
          <div className="h-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 overflow-y-auto lg:overflow-hidden">
            
            {/* LEFT COLUMN: Input form on Russian */}
            <div className="lg:col-span-5 p-6 flex flex-col gap-4 overflow-y-auto bg-[#070b13]/60">
              
              {/* Presets Header */}
              <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    Готовые шаблоны для проверки в 1 клик:
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {PRESET_ARTICLES.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleApplyPreset(p)}
                      className="text-left px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-cyan-200 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{p.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Заголовок статьи на русском:</span>
                  <span className="text-[11px] text-slate-500">{title.length} симв.</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: Как работает автономный Starlink в бункере"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                />
              </div>

              {/* Content textarea */}
              <div className="space-y-1.5 flex-1 flex flex-col">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Текст или тезисы статьи на русском:</span>
                  <span className="text-[11px] text-slate-500">{content.split(/\s+/).filter(Boolean).length} слов</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Вставьте сюда любой сложный или подробный текст статьи, технические тезисы, инструкцию..."
                  className="w-full flex-1 min-h-[160px] p-3.5 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs leading-relaxed text-slate-200 placeholder-slate-500 resize-none transition-colors font-mono"
                />
              </div>

              {/* Author & Role */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-medium">Автор статьи:</label>
                  <select
                    value={authorName}
                    onChange={(e) => {
                      setAuthorName(e.target.value);
                      if (e.target.value === 'Кирилл Романов') setAuthorRole('Инфраструктурный архитектор Самал IT-Бункера');
                      if (e.target.value === 'Дмитрий Назаров') setAuthorRole('Визовый и налоговый юрист по ЮВА');
                      if (e.target.value === 'Алексей Соколов') setAuthorRole('Lead Network & Cloud Engineer');
                    }}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Кирилл Романов">Кирилл Романов</option>
                    <option value="Дмитрий Назаров">Дмитрий Назаров</option>
                    <option value="Алексей Соколов">Алексей Соколов</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-medium">Теги:</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="+ Тег"
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-400 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* ELI5 Style Banner */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                <span className="text-lg leading-none">🧸</span>
                <div className="text-[11px] text-amber-200/90 leading-relaxed">
                  <strong className="font-semibold text-amber-300">Режим пересказа для 5-летнего ребёнка (ELI5):</strong>
                  {' '}ИИ возьмет ваш текст и адаптирует его простыми добрыми словами, с яркими аналогиями («летающие тарелки Starlink», «ловушки для солнечных зайчиков», «никто не отбирает конфеты»).
                </div>
              </div>

              {/* Main Submit Action */}
              <button
                onClick={handleGenerateAll}
                disabled={isGenerating || !title.trim() || !content.trim()}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer ${
                  isGenerating
                    ? 'bg-slate-800 text-slate-400 cursor-wait'
                    : 'bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 hover:shadow-cyan-400/30 hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Создание пересказов для всех 7 языков...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Сгенерировать пересказ на всех 7 языках</span>
                  </>
                )}
              </button>

              {generationLog && (
                <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-500/20">
                  {generationLog}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Multilingual Result & Inspection */}
            <div className="lg:col-span-7 p-6 flex flex-col gap-4 overflow-y-auto bg-[#05080e]">
              
              {/* Language Selector Tabs */}
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 overflow-x-auto">
                <div className="flex items-center gap-1.5">
                  {TARGET_LANGS.map((lang) => {
                    const hasVariant = generatedVariants.some(v => v.lang === lang.code);
                    const isActive = activeLangTab === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => setActiveLangTab(lang.code)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-lg shadow-cyan-500/10'
                            : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
                        }`}
                      >
                        <span className="text-sm">{lang.flag}</span>
                        <span>{lang.name}</span>
                        {hasVariant && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* View Switchers */}
                {generatedVariants.length > 0 && (
                  <div className="flex items-center bg-slate-900/80 border border-white/10 rounded-xl p-1 text-[11px]">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        viewMode === 'preview' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400'
                      }`}
                    >
                      Превью
                    </button>
                    <button
                      onClick={() => setViewMode('side-by-side')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        viewMode === 'side-by-side' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400'
                      }`}
                    >
                      Сравнение
                    </button>
                  </div>
                )}
              </div>

              {/* Content Area */}
              {generatedVariants.length === 0 ? (
                <div className="flex-1 min-h-[400px] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400">
                    <Globe2 className="w-7 h-7 text-cyan-400/60" />
                  </div>
                  <div className="max-w-md space-y-1">
                    <h4 className="text-sm font-semibold text-slate-300">
                      Здесь появится пересказ статьи на 7 языках
                    </h4>
                    <p className="text-xs text-slate-500">
                      Введите заголовок и текст слева (или выберите один из 3 готовых шаблонов), затем нажмите кнопку «Сгенерировать».
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-4">
                  {/* Status Banner */}
                  <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-xs text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>
                        Статья готова и синхронизирована! Файлы сохранены в <strong>src/content/blog/{activeLangTab}/</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => currentVariant && handleCopyMarkdown(currentVariant)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Скопировать Markdown"
                      >
                        {copiedLang === activeLangTab ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Скопировано!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Копировать .md</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => currentVariant && handleDownloadMarkdown(currentVariant)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Скачать Markdown"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                        <span>Скачать</span>
                      </button>
                    </div>
                  </div>

                  {/* Body display depending on viewMode */}
                  {viewMode === 'side-by-side' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      {/* Left side: Russian Original */}
                      <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 flex flex-col gap-2 overflow-y-auto max-h-[500px]">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                          Оригинал на русском:
                        </span>
                        <h4 className="text-sm font-bold text-white">{title}</h4>
                        <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                          {content}
                        </p>
                      </div>

                      {/* Right side: ELI5 version */}
                      <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col gap-2 overflow-y-auto max-h-[500px]">
                        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                          Пересказ для 5-летки ({currentVariant?.langName}):
                        </span>
                        <h4 className="text-sm font-bold text-cyan-200">{currentVariant?.title}</h4>
                        <p className="text-xs text-cyan-300/80 italic pb-2 border-b border-cyan-500/20">
                          {currentVariant?.description}
                        </p>
                        <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans space-y-2">
                          {currentVariant?.body}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Standard Single Preview */
                    <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col gap-3 flex-1 overflow-y-auto max-h-[520px]">
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold">
                            {currentVariant?.lang.toUpperCase()} // ELI5 ADAPTATION
                          </span>
                          <span className="text-xs text-slate-400">
                            {currentVariant?.langName}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {currentVariant?.title}
                        </h3>
                        <p className="text-xs text-slate-400 italic">
                          {currentVariant?.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 py-1">
                        {currentVariant?.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[10px] font-mono">
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Main Story Body */}
                      <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                        {currentVariant?.body}
                      </div>

                      {/* FAQs for kids */}
                      {currentVariant?.faqs && currentVariant.faqs.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-white/10">
                          <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <span>🧸</span> Детские вопросы и ответы:
                          </span>
                          <div className="space-y-1.5">
                            {currentVariant.faqs.map((faq, i) => (
                              <div key={i} className="p-3 rounded-xl bg-amber-950/10 border border-amber-500/20 space-y-1">
                                <div className="text-xs font-semibold text-amber-200">
                                  ❓ {faq.question}
                                </div>
                                <div className="text-xs text-slate-300">
                                  💡 {faq.answer}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* LIBRARY VIEW: List of existing published articles */
          <div className="h-full p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Все статьи в базе бункера</h3>
                <p className="text-xs text-slate-400">
                  Все опубликованные статьи с мультиязычным hreflang и синхронизацией в Schema.org
                </p>
              </div>
              <button
                onClick={fetchExistingArticles}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingExisting ? 'animate-spin' : ''}`} />
                <span>Обновить список</span>
              </button>
            </div>

            {existingArticles.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                Статей пока не найдено. Создайте первую статью во вкладке «Создать статью»!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {existingArticles.map((art) => (
                  <div
                    key={art.translationKey}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono text-cyan-400">{art.translationKey}</span>
                        <span>{art.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {art.title}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        {art.languages.map((l: string) => (
                          <span
                            key={l}
                            className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono"
                          >
                            {l}
                          </span>
                        ))}
                      </div>

                      <span className="text-emerald-400 font-medium text-[11px]">
                        ✓ {art.languages.length} яз.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
