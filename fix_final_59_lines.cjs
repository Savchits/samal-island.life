const fs = require('fs');

let html = fs.readFileSync('./index.html', 'utf8');

// Line 153
html = html.replace(/<span id="header-places-count">[^<]+<\/span>/, '<span id="header-places-count" data-i18n-html="header.placesCount">Remaining: <strong class="text-emerald-300 font-bold">3</strong> of 6 spots</span>');

// Line 340 & 343
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Номера и Цены<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="rooms.title">Rooms & Pricing</h2>');
html = html.replace(/<p class="text-slate-400 text-sm max-w-xl mx-auto">Всего 6 номеров\. На данный момент свободно только 3 места\.<\/p>/, '<p class="text-slate-400 text-sm max-w-xl mx-auto" data-i18n="rooms.sub">Only 6 rooms in total. Currently just 3 spots are available.</p>');

// Rooms m2 & buttons
html = html.replace(/>32 м²</g, '><span data-i18n="rooms.r1Size">32 m²</span><');
html = html.replace(/>45 м²</g, '><span data-i18n="rooms.r2Size">45 m²</span><');
html = html.replace(/>55 м²</g, '><span data-i18n="rooms.r3Size">55 m²</span><');
html = html.replace(/<span>Занять<\/span>/g, '<span data-i18n="rooms.r2Btn">Reserve</span>');
html = html.replace(/>Занять</g, '><span data-i18n="rooms.r2Btn">Reserve</span><');

// Tariffs header & badge
html = html.replace(/<span data-i18n="tariffs\.badge">[^<]+<\/span>/, '<span data-i18n="tariffs.badge">Transparent Comparison Matrix</span>');
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Сравнение Вариантов Проживания<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="tariffs.title">Living Options Comparison</h2>');
html = html.replace(/<p class="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">Сравните реальные расходы: самостоятельная организация быта против пакетного проживания без забот\.<\/p>/, '<p class="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto" data-i18n="tariffs.sub">Compare real expenses: managing daily hassles yourself vs. all-inclusive worry-free living.</p>');
html = html.replace(/Год всё вкл ⭐/g, '1-Year All-Inc ⭐');

// Calculator
html = html.replace(/Сколько стоит ваше время на быт/g, 'How much is your time worth on daily chores?');
html = html.replace(/Формула: <strong>Часы × ваша ставка\/час = деньги, которые вы не заработали<\/strong>/g, 'Formula: <strong>Hours × your hourly rate = Money you failed to earn</strong>');
html = html.replace(/\$25\/час/g, '$25/hr');
html = html.replace(/\$45\/час/g, '$45/hr');
html = html.replace(/\$80\/час/g, '$80/hr');
html = html.replace(/30 мин \/ день/g, '30 min / day');
html = html.replace(/2 часа \/ неделю/g, '2 hrs / week');
html = html.replace(/Поездки по прокатам, тесты, проверка техсостояния и документов\./g, 'Visiting rental shops, testing bikes, inspecting documents.');
html = html.replace(/3\+ часа/g, '3+ hrs');
html = html.replace(/>2 часа</g, '>2 hrs<');
html = html.replace(/1\.5–2 часа/g, '1.5–2 hrs');
html = html.replace(/-\$675\/мес/g, '-$675/mo');
html = html.replace(/-\$360\/мес/g, '-$360/mo');
html = html.replace(/-\$135 разово/g, '-$135 once');
html = html.replace(/-\$90 разово/g, '-$90 once');
html = html.replace(/-\$67 разово/g, '-$67 once');
html = html.replace(/data-i18n="tariffs\.col1BasePeriod">Ежемесячно:/g, 'data-i18n="tariffs.col1BasePeriod">Monthly:');
html = html.replace(/\$1,035\/мес/g, '$1,035/mo');
html = html.replace(/\(23 часа\)/g, '(23 hrs)');
html = html.replace(/\(6\.5 часов\)/g, '(6.5 hrs)');
html = html.replace(/Забронировать по спецтарифу →/g, 'Reserve at Special Rate →');

// Autonomy & Arrival
html = html.replace(/Никаких Блэкаутов и Падений Сети/g, 'Zero Blackouts & Zero Connection Drops');
html = html.replace(/Полный 5-кратный запас прочности всех систем жизнеобеспечения на высоте 265 метров над уровнем моря\./g, 'Full 5-fold engineered redundancy for all life-support and work systems at 265m elevation.');
html = html.replace(/Встреча в Аэропорту — Дома через 90 Минут/g, 'Airport Pickup — At Home in 90 Minutes');
html = html.replace(/Забудь про хаос прилета в Азию\. Мы берем на себя 100% логистики и быта с первой секунды касания шасси\./g, 'Forget the typical Asian arrival chaos. We handle 100% of logistics from the moment your wheels touch down.');

// Services & Club
html = html.replace(/Быт и Сервис Всё Включено/g, 'All-Inclusive Living & Turnkey Chores');
html = html.replace(/Мы взяли на себя каждую мелочь, чтобы освободить 100% твоего фокуса для работы и отдыха\./g, 'We took care of every single detail to liberate 100% of your energy for deep focus.');
html = html.replace(/«До 2 человек в номере» — Без Толпы/g, '«Up to 2 People per Room» — Zero Crowd');
html = html.replace(/Мы намеренно отказались от формата шумного коливинга на 20 человек в пользу тихого закрытого клуба\./g, 'We intentionally rejected the noisy 20-person coliving model in favor of an intimate sanctuary.');
html = html.replace(/data-i18n="club\.card1Num">01 \/ КРИТЕРИИ</g, 'data-i18n="club.card1Num">01 / CRITERIA<');
html = html.replace(/data-i18n="club\.card2Num">02 \/ АТМОСФЕРА</g, 'data-i18n="club.card2Num">02 / ATMOSPHERE<');
html = html.replace(/data-i18n="club\.card3Num">03 \/ НЕТВОРК</g, 'data-i18n="club.card3Num">03 / NETWORK<');

// Reviews & Trust
html = html.replace(/Опыт Тех, Кто Уже Здесь/g, 'Tested by Specialists on the Ground');
html = html.replace(/data-i18n="reviews\.r1Name">Алексей К\.</g, 'data-i18n="reviews.r1Name">Alex K.<');
html = html.replace(/data-i18n="reviews\.r2Name">Дмитрий М\.</g, 'data-i18n="reviews.r2Name">Dmitry M.<');
html = html.replace(/data-i18n="reviews\.r3Name">Илья В\.</g, 'data-i18n="reviews.r3Name">Ilya V.<');
html = html.replace(/«Прежде Чем Платить — Созвон»/g, '«Video Call Before Any Payment»');

// Deep dive prompt
html = html.replace(/Хотите узнать все факты, правила <br class="hidden sm:inline" \/><span class="text-gradient-cyan">и юридические детали\?<\/span>/g, 'Want to Explore All Facts, Rules & Legal Details?');
html = html.replace(/Для тех, кто хочет изучить каждую деталь перед бронированием: визовый статус, строгие табу комьюнити, географию острова Самал, матрицу 16 параметров против 8 стран и 9 глобальных бенчмарков\./g, 'For those who want to examine every detail before reserving: visa status, sanctuary taboos, Samal geography, 16-parameter benchmark against 8 countries, and 9 core pillars.');
html = html.replace(/<span>Остров Самал & Природа<\/span>/g, '<span data-i18n="deepDive.nav.location">🏝️ Samal Island & Nature</span>');

// Legal list items
html = html.replace(/data-i18n="deepDive\.legal\.pathA1"><span class="text-emerald-400">✓<\/span> 0% налог на международные доходы и крипту/g, 'data-i18n="deepDive.legal.pathA1"><span class="text-emerald-400">✓</span> 0% foreign income and crypto tax');
html = html.replace(/data-i18n="deepDive\.legal\.pathA2"><span class="text-emerald-400">✓<\/span> Продление 1 раз в год без выезда из страны/g, 'data-i18n="deepDive.legal.pathA2"><span class="text-emerald-400">✓</span> 1-year renewals on-site without border runs');
html = html.replace(/data-i18n="deepDive\.legal\.pathA3"><span class="text-emerald-400">✓<\/span> Официальное открытие счета в местном банке/g, 'data-i18n="deepDive.legal.pathA3"><span class="text-emerald-400">✓</span> Local bank account opening assistance');

html = html.replace(/data-i18n="deepDive\.legal\.pathB1"><span class="text-cyan-400">✓<\/span> До 36 месяцев непрерывного пребывания/g, 'data-i18n="deepDive.legal.pathB1"><span class="text-cyan-400">✓</span> Up to 36 months continuous stay');
html = html.replace(/data-i18n="deepDive\.legal\.pathB2"><span class="text-cyan-400">✓<\/span> Паспорт забирает и продлевает консьерж Бункера/g, 'data-i18n="deepDive.legal.pathB2"><span class="text-cyan-400">✓</span> Passport renewal handled by Bunker concierge');
html = html.replace(/data-i18n="deepDive\.legal\.pathB3"><span class="text-cyan-400">✓<\/span> Никаких виза-ранов, очередей и аэропортов/g, 'data-i18n="deepDive.legal.pathB3"><span class="text-cyan-400">✓</span> Zero visa runs, queues, or stress');

fs.writeFileSync('./index.html', html, 'utf8');
console.log('Fixed final 59 lines.');
