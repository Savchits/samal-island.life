/**
 * Samal IT-Bunker Intelligent I18n Engine
 * Complete 100% full-page localization for 11 languages
 * Tagalog, Cebuano, English, Russian, Kazakh, Ukrainian, Korean, Chinese, German, French, Spanish
 */

(function () {
  const SUPPORTED_LANGS = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'tl', name: 'Tagalog', flag: '🇵🇭', native: 'Tagalog (Pilipinas)' },
    { code: 'ceb', name: 'Cebuano', flag: '🇵🇭', native: 'Bisaya / Cebuano' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', native: 'Русский' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', native: '한국어' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', native: '简体中文' },
    { code: 'kk', name: 'Kazakh', flag: '🇰🇿', native: 'Қазақша' },
    { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', native: 'Українська' },
    { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
    { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' }
  ];

  let currentLang = 'en';

  function getNestedTranslation(obj, path) {
    if (!obj || !path) return undefined;
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current === undefined || current === null) return undefined;
      current = current[key];
    }
    return current;
  }

  function detectBestLanguage() {
    // 1. URL parameter override: ?lang=xx
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && SUPPORTED_LANGS.some(l => l.code === urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }
    } catch (e) {}

    // 2. User manual choice in LocalStorage
    try {
      const saved = localStorage.getItem('bunker_selected_lang');
      if (saved && SUPPORTED_LANGS.some(l => l.code === saved)) {
        return saved;
      }
    } catch (e) {}

    // 3. Inspect browser & device languages
    const browserLangs = (navigator.languages && navigator.languages.length)
      ? navigator.languages.map(l => l.toLowerCase())
      : [(navigator.language || navigator.userLanguage || '').toLowerCase()].filter(Boolean);

    // 4. Timezone inspection
    let timeZone = '';
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (e) {}

    const isPhilippinesTZ = timeZone === 'Asia/Manila';

    // 5. Intelligent Geo & Device distinction for Philippines
    if (isPhilippinesTZ) {
      // If user has specific Filipino preferences or Cebuano
      for (const lang of browserLangs) {
        if (lang.startsWith('ceb')) return 'ceb';
        if (lang.startsWith('tl') || lang.startsWith('fil')) return 'tl';
        if (lang.startsWith('ru')) return 'ru';
        if (lang.startsWith('ko')) return 'ko';
        if (lang.startsWith('zh')) return 'zh';
        if (lang.startsWith('kk')) return 'kk';
        if (lang.startsWith('uk')) return 'uk';
        if (lang.startsWith('de')) return 'de';
        if (lang.startsWith('fr')) return 'fr';
        if (lang.startsWith('es')) return 'es';
      }
      // If Philippine timezone with en-PH or local device, show Tagalog
      const isEnPH = browserLangs.some(l => l === 'en-ph');
      if (isEnPH) return 'tl';
      return 'tl';
    }

    // 6. Match device language for worldwide users
    for (const lang of browserLangs) {
      if (lang.startsWith('tl') || lang.startsWith('fil')) return 'tl';
      if (lang.startsWith('ceb')) return 'ceb';
      if (lang.startsWith('ru')) return 'ru';
      if (lang.startsWith('kk') || lang.includes('kz')) return 'kk';
      if (lang.startsWith('uk') || lang.includes('ua')) return 'uk';
      if (lang.startsWith('ko')) return 'ko';
      if (lang.startsWith('zh')) return 'zh';
      if (lang.startsWith('de')) return 'de';
      if (lang.startsWith('fr')) return 'fr';
      if (lang.startsWith('es')) return 'es';
      if (lang.startsWith('en')) return 'en';
    }

    // 7. Explicit default fallback: ALWAYS 'en' if cannot determine
    return 'en';
  }

  function setLanguage(langCode) {
    if (!SUPPORTED_LANGS.some(l => l.code === langCode)) {
      langCode = 'en';
    }

    if (!window.TRANSLATIONS || !window.TRANSLATIONS[langCode]) {
      console.warn('Translation dictionary missing for:', langCode, 'falling back to en');
      if (window.TRANSLATIONS && window.TRANSLATIONS.en) {
        langCode = 'en';
      }
    }

    currentLang = langCode;
    try {
      localStorage.setItem('bunker_selected_lang', langCode);
    } catch (e) {}

    document.documentElement.lang = langCode;
    const t = (window.TRANSLATIONS && window.TRANSLATIONS[langCode]) || (window.TRANSLATIONS && window.TRANSLATIONS.en) || {};

    // 1. Traverse all [data-i18n] for text replacement
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedTranslation(t, key);
      if (val !== undefined && val !== null) {
        el.textContent = val;
      }
    });

    // 2. Traverse all [data-i18n-html] for HTML with formatting/icons
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = getNestedTranslation(t, key);
      if (val !== undefined && val !== null) {
        el.innerHTML = val;
      }
    });

    // 3. Update document title & meta description
    if (t.meta) {
      if (t.meta.title) document.title = t.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && t.meta.description) {
        metaDesc.setAttribute('content', t.meta.description);
      }
    }

    // 4. Update hero slide rotator if exists
    if (t.hero && window.updateHeroSlideTranslations) {
      window.updateHeroSlideTranslations([
        { tagline: t.hero.slide1Tag, title: t.hero.slide1Title, room: t.hero.slide1Room },
        { tagline: t.hero.slide2Tag, title: t.hero.slide2Title, room: t.hero.slide2Room },
        { tagline: t.hero.slide3Tag, title: t.hero.slide3Title, room: t.hero.slide3Room }
      ]);
    }

    // 5. Update Deep-Dive toggle button text dynamically
    const ddBtnText = document.getElementById('deep-dive-btn-text');
    const ddBadge = document.getElementById('deep-dive-preview-badge');
    const ddContent = document.getElementById('deep-dive-content');
    if (t.deepDive && t.deepDive.toggle) {
      const isOpen = ddContent && !ddContent.classList.contains('hidden');
      if (ddBtnText) {
        ddBtnText.innerText = isOpen ? t.deepDive.toggle.closeBtn : t.deepDive.toggle.openBtn;
      }
      if (ddBadge) {
        ddBadge.innerText = isOpen ? t.deepDive.toggle.badgeOpen : t.deepDive.toggle.badgeClosed;
      }
    }

    // 6. Update dynamic Calculator values
    if (typeof window.setTimeRate === 'function') {
      window.setTimeRate(window.currentSelectedRate || 45);
    }

    // 7. Update Switcher UI
    updateSwitcherUI();
  }

  function updateSwitcherUI() {
    const currentObj = SUPPORTED_LANGS.find(l => l.code === currentLang) || SUPPORTED_LANGS[0];

    const triggers = document.querySelectorAll('.lang-switcher-trigger');
    triggers.forEach(btn => {
      btn.innerHTML = `
        <span class="text-base sm:text-lg leading-none">${currentObj.flag}</span>
        <span class="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase">${currentObj.code}</span>
        <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      `;
    });

    const menuItems = document.querySelectorAll('.lang-option-btn');
    menuItems.forEach(item => {
      const code = item.getAttribute('data-lang');
      if (code === currentLang) {
        item.classList.add('bg-cyan-500/20', 'text-cyan-300', 'font-bold');
        item.classList.remove('text-gray-300', 'hover:bg-neutral-800');
        const check = item.querySelector('.lang-check-icon');
        if (check) check.classList.remove('hidden');
      } else {
        item.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'font-bold');
        item.classList.add('text-gray-300', 'hover:bg-neutral-800');
        const check = item.querySelector('.lang-check-icon');
        if (check) check.classList.add('hidden');
      }
    });
  }

  function initSwitcherDropdowns() {
    const containers = document.querySelectorAll('.lang-switcher-container');
    if (!containers.length) return;

    containers.forEach((container, idx) => {
      const menuId = `lang-dropdown-menu-${idx}`;
      container.innerHTML = `
        <button type="button" class="lang-switcher-trigger group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/20 hover:border-cyan-500/50 text-white transition-all shadow-lg focus:outline-none" aria-expanded="false">
        </button>
        <div id="${menuId}" class="lang-dropdown-menu hidden absolute right-0 mt-2 w-56 sm:w-64 max-h-[380px] overflow-y-auto rounded-2xl bg-[#0b111a] border border-cyan-500/30 shadow-2xl p-1.5 z-50 custom-scrollbar backdrop-blur-xl">
          <div class="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-white/5 mb-1" data-i18n="header.selectLangTitle">
            Select Language / Wika
          </div>
          ${SUPPORTED_LANGS.map(lang => `
            <button type="button" data-lang="${lang.code}" class="lang-option-btn w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs sm:text-sm transition-colors text-gray-300 hover:bg-slate-800/80">
              <div class="flex items-center gap-2.5">
                <span class="text-lg leading-none">${lang.flag}</span>
                <div>
                  <div class="font-medium text-white leading-tight">${lang.name}</div>
                  <div class="text-[10px] text-slate-400 font-mono">${lang.native}</div>
                </div>
              </div>
              <svg class="lang-check-icon w-4 h-4 text-cyan-400 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </button>
          `).join('')}
        </div>
      `;

      const trigger = container.querySelector('.lang-switcher-trigger');
      const menu = container.querySelector('.lang-dropdown-menu');

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = menu.classList.contains('hidden');
        document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.add('hidden'));
        if (isHidden) {
          menu.classList.remove('hidden');
        }
      });

      menu.querySelectorAll('.lang-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const selected = btn.getAttribute('data-lang');
          if (selected) {
            setLanguage(selected);
          }
          menu.classList.add('hidden');
        });
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.add('hidden'));
    });
  }

  // Expose API
  window.setLanguage = setLanguage;
  window.getLanguage = () => currentLang;
  window.SUPPORTED_LANGS = SUPPORTED_LANGS;

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSwitcherDropdowns();
      const detected = detectBestLanguage();
      setLanguage(detected);
    });
  } else {
    initSwitcherDropdowns();
    const detected = detectBestLanguage();
    setLanguage(detected);
  }
})();
