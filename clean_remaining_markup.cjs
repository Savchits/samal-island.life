const fs = require('fs');

global.window = {};
require('./i18n/en.js');
const en = window.TRANSLATIONS.en;

let html = fs.readFileSync('./index.html', 'utf8');

// Deep dive subheaders and quick tabs
html = html.replace(/<span>🏛️<\/span><span>Виза EO 86 & 36 мес<\/span>/g, '<span data-i18n="deepDive.nav.legal">🏛️ Visa EO 86 & 36 Mos</span>');
html = html.replace(/<span>🚫<\/span><span>Культура & Табу<\/span>/g, '<span data-i18n="deepDive.nav.rules">🚫 Culture & Taboos</span>');
html = html.replace(/<span>🏝️<\/span><span>Остров Самал<\/span>/g, '<span data-i18n="deepDive.nav.location">🏝️ Samal Island & Nature</span>');
html = html.replace(/<span>📊<\/span><span>Матрица 8 стран<\/span>/g, '<span data-i18n="deepDive.nav.comparison">📊 8-Country Matrix</span>');
html = html.replace(/<span>🏆<\/span><span>9 причин почему мы лучшие<\/span>/g, '<span data-i18n="deepDive.nav.whyBest">🏆 9 Reasons Why We Are Best</span>');
html = html.replace(/<span>❓<\/span><span>FAQ \(6 ответов\)<\/span>/g, '<span data-i18n="deepDive.nav.faq">FAQ (6 Answers)</span>');

// Legal text blocks
html = html.replace(/Официальный указ Президента Филиппин № 86 для цифровых специалистов[^<]+/g, 'Official Executive Order 86 of the President of the Philippines for digital specialists and founders.');
html = html.replace(/Подача и сопровождение через юридическую службу Бункера/g, 'Direct concierge submission through our legal department');
html = html.replace(/Филиппинский закон официально разрешает непрерывно продлевать туристический статус[^<]+/g, 'Philippine law allows continuous extension of tourist status up to 36 months without border runs.');
html = html.replace(/Всё продление происходит без твоего личного присутствия/g, 'All renewals are handled without your personal presence');
html = html.replace(/Официальная юридическая процедура для граждан при выезде на срок более 6 месяцев[^<]+/g, 'Official address registration and documentation support for long-term residency.');

// Rules title & match badges
html = html.replace(/A Place for the Aligned\. Read Before Reserving\.<br class="hidden sm:inline" \/> Прочитайте, прежде чем бронировать\./g, 'A Place for the Aligned. Read Before Reserving.');
html = html.replace(/Идеальный матч/g, 'Ideal Match');
html = html.replace(/● Продуктивная среда единомышленников/g, '● High-focus productive environment');
html = html.replace(/Не наш профиль/g, 'Not For You');
html = html.replace(/● Экономим ваше и наше время/g, '● Saving your time and ours');
html = html.replace(/Строгие табу/g, 'Strict Taboos');
html = html.replace(/● Нулевая толерантность к токсичности/g, '● Zero tolerance for toxicity');
html = html.replace(/<span>Базовые условия контракта<\/span>/g, '<span data-i18n="deepDive.rules.termsTitle">Core Contract Conditions</span>');
html = html.replace(/Формат долгосрочной резиденции для тех, кто ищет стабильную базу без суеты и постоянных переездов\./g, 'Long-term residence format for those seeking a stable home base without constant relocation.');
html = html.replace(/Фиксирует номер строго за вами и снимает его с показов\. Задаток невозвратен при отмене\./g, 'Locks the suite strictly under your name and removes it from listings. Non-refundable upon cancellation.');
html = html.replace(/Полная оплата первого периода производится в день заселения \(USDT\/USDC или банк\)\./g, 'Full payment for the initial period is settled on check-in day via USDT/USDC or bank wire.');

// Location image
html = html.replace(/alt="Остров Самал"/g, 'alt="Samal Island"');

// Why Best headline
html = html.replace(/Почему мы лучше любого предложения <br class="hidden sm:inline" \/><span class="text-gradient-cyan">на рынке в мире<\/span>/g, 'Why This Is the Best IT Setup in the World');

// CTA & FAQ
html = html.replace(/<span>⚡ ВНИМАНИЕ: Осталось только <strong class="text-white text-sm sm:text-base">3 номера из 6<\/strong><\/span>/g, '<span data-i18n-html="finalCta.urgencyBadge">⚡ ATTENTION: Only 3 of 6 suites remaining</span>');
html = html.replace(/Готовы зафиксировать лучшую ставку на год\?/g, 'Ready to Lock In the Best Rate for the Entire Year?');
html = html.replace(/Напишите нам для персонального видеотура\. Мы покажем резорт в реальном времени, протестируем интернет и забронируем за вами номер\./g, 'Message us for a personal 1-on-1 live video walkthrough. We will test Starlink speeds together and secure your contract.');
html = html.replace(/🔒 Без риска: видео-тур и проверка скорости Starlink перед внесением задатка/g, '🔒 100% Risk-Free: live video walkthrough & Starlink speedtest before any deposit');
html = html.replace(/<span>Ответы на вопросы<\/span>/g, '<span data-i18n="deepDive.faq.badge">Frequently Asked Questions</span>');
html = html.replace(/Часто Задаваемые Вопросы/g, 'Frequently Asked Questions');

html = html.replace(/У нас всего 6 номеров\. Когда вы вносите задаток за 1 месяц[^<]+/g, 'With only 6 suites in total, reserving a room immediately closes that slot for all other applicants globally. The deposit covers holding costs and full room preparation.');
html = html.replace(/1\) Digital Nomad Visa по указу EO 86[^<]+<br \/>\s*2\) Туристическая виза с продлением на месте[^<]+/g, '1) Digital Nomad Status under Executive Order 86 with yearly renewal and 0% foreign tax.<br>2) Tourist visa extended locally on-site up to 36 consecutive months without leaving.');
html = html.replace(/Оплата производится строго в день прилёта[^<]+/g, 'Payment is completed strictly on arrival day via USDT/USDC cryptocurrency or direct bank transfer.');
html = html.replace(/Проживание с партнером доступно в номерах VIP-1 и VIP-2[^<]+/g, 'Couples are warmly welcomed in the VIP Panorama and Penthouse suites. Small pets may be considered individually provided quiet standards are observed.');
html = html.replace(/Установлены две независимые спутниковые тарелки Starlink Gen 3[^<]+/g, 'We operate dual Starlink Gen 3 low-latency dishes backed by our 25kW solar battery system. Electricity and internet remain 100% active during all weather.');
html = html.replace(/Напишите нам в Telegram или WhatsApp\. Мы согласуем время персонального видеозвонка[^<]+/g, 'Message us on Telegram or WhatsApp. We will arrange a live video tour, test internet speeds, and secure your contract.');

html = html.replace(/Забронируй Свое Место в Бункере/g, 'Reserve Your Sanctuary in the Bunker');
html = html.replace(/Как только все 6 номеров заняты на 12 месяцев — мы строим новый <strong>инфинити-бассейн<\/strong> на территории\. При этом <strong>цена для первых резидентов фиксируется и не растет весь год<\/strong>\./g, 'As soon as all 6 suites are booked for 12 months, we construct a brand-new infinity swimming pool on-site. Your rate remains locked for the entire year.');
html = html.replace(/<span>Написать в Telegram →<\/span>/g, '<span data-i18n="finalCta.tgBtn">Message on Telegram →</span>');

html = html.replace(/<div>Остров Самал, провинция Давао-дель-Норте, Филиппины • 265м над уровнем моря<\/div>/g, '<div data-i18n="footer.line2">Samal Island, Davao del Norte Province, Philippines • 265m Above Sea Level</div>');
html = html.replace(/<div class="text-\[10px\] text-slate-600 pt-2">© 2026 Samal IT-Bunker\. Все права защищены\. Постановление EO 86\.<\/div>/g, '<div class="text-[10px] text-slate-600 pt-2" data-i18n="footer.line3">© 2026 Samal IT-Bunker. All rights reserved. Operating under Executive Order 86.</div>');

fs.writeFileSync('./index.html', html, 'utf8');
console.log('Cleaned remaining markup.');
