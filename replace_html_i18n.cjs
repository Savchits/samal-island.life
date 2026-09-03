const fs = require('fs');

let html = fs.readFileSync('./index.html', 'utf8');

// We will systematically ensure all Russian strings are replaced with standard English text + data-i18n/data-i18n-html

// 1. Meta / Title
html = html.replace(/<title>[^<]+<\/title>/, '<title data-i18n="meta.title">Samal IT-Bunker — Arrive with a Suitcase, Start Coding in 1 Hour</title>');
html = html.replace(/<meta name="description" content="[^"]+" \/>/, '<meta name="description" content="3-year legal residency, 0% tax on foreign income, zero downtime power and Starlink, and an exclusive 6-person sanctuary. Samal Island, Philippines." />');

// 2. Header
html = html.replace(/<span id="header-places-count">[^<]+<\/span>/, '<span id="header-places-count" data-i18n-html="header.placesCount">Remaining: <strong class="text-emerald-300 font-bold">3</strong> of 6 spots</span>');
html = html.replace(/<span>СВЯЗАТЬСЯ →<\/span>/g, '<span data-i18n="header.contactBtn">CONTACT US →</span>');

// 3. Hero
html = html.replace(/<span id="hero-title-main">[^<]+<\/span>/, '<span id="hero-title-main" data-i18n="hero.titleMain">AUTONOMOUS IT-BUNKER</span>');
html = html.replace(/ТВОЯ 3-ЛЕТНЯЯ БРОНЯ И СВОБОДА/g, '<span data-i18n="hero.titleSub">YOUR 3-YEAR SHIELD & FREEDOM</span>');
html = html.replace(/<span id="hero-badge-solar">[^<]+<\/span>/, '<span id="hero-badge-solar" data-i18n="hero.badgeSolar">Powerful 🌞Solar Station</span>');
html = html.replace(/<span id="hero-badge-starlink">[^<]+<\/span>/, '<span id="hero-badge-starlink" data-i18n="hero.badgeStarlink">Starlink up to 350 Mbps</span>');
html = html.replace(/<span id="hero-badge-water">[^<]+<\/span>/, '<span id="hero-badge-water" data-i18n="hero.badgeWater">18,000L Water Reserves</span>');
html = html.replace(/БЕЗРАМОЧНЫЕ ОКНА 1\.2 СМ ТОЛЩИНОЙ, ПРЯМОЙ ВИД НА ОКЕАН И ВУЛКАН/g, 'FRAMELESS 1.2CM THICK GLASS, DIRECT OCEAN & VOLCANO VIEW');
html = html.replace(/Рабочее место с панорамным остеклением и эргономичным креслом/g, 'Ergonomic workspace with panoramic view and Herman Miller seating');
html = html.replace(/Мастер Студия • Окна 3х3м/g, 'Master Studio • 3x3m Windows');

html = html.replace(/<span id="hero-callout-msg-1">[^<]+<\/span>/, '<span id="hero-callout-msg-1" data-i18n="hero.callout1">Airport Pickup Included</span>');
html = html.replace(/<span id="hero-callout-msg-2-p1">[^<]+<\/span>/, '<span id="hero-callout-msg-2-p1" data-i18n="hero.callout2P1">90+- MINS & AT HOME WITH A </span>');
html = html.replace(/<span id="hero-callout-msg-2-p2"[^>]*>[^<]+<\/span>/, '<span id="hero-callout-msg-2-p2" class="text-gradient-cyan drop-shadow-[0_0_16px_rgba(6,182,212,0.7)]" data-i18n="hero.callout2P2">MILLION-DOLLAR VIEW</span>');

html = html.replace(/<span id="benefit-quiet">[^<]+<\/span>/, '<span id="benefit-quiet" data-i18n="hero.benQuiet">Quiet</span>');
html = html.replace(/<span id="benefit-cool">[^<]+<\/span>/, '<span id="benefit-cool" data-i18n="hero.benCool">Cool Breeze</span>');
html = html.replace(/<span id="benefit-safe">[^<]+<\/span>/, '<span id="benefit-safe" data-i18n="hero.benSafe">Away from Conflicts</span>');
html = html.replace(/<span id="benefit-visa">[^<]+<\/span>/, '<span id="benefit-visa" data-i18n="hero.benVisa">3-Year Visa</span>');
html = html.replace(/<span id="benefit-autonomy">[^<]+<\/span>/, '<span id="benefit-autonomy" data-i18n="hero.benAutonomy">Full Autonomy!</span>');

// 4. Rooms section
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Номера и Цены<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="rooms.title">Rooms & Pricing</h2>');
html = html.replace(/<p class="text-slate-400 text-sm max-w-xl mx-auto">Всего 6 номеров\. На данный момент свободно только 3 места\.<\/p>/, '<p class="text-slate-400 text-sm max-w-xl mx-auto" data-i18n="rooms.sub">Only 6 rooms in total. Currently just 3 spots are available.</p>');
html = html.replace(/● Статус: <strong class="text-white">3 из 6 свободно<\/strong>/g, '● Status: <strong class="text-white">3 of 6 available</strong>');

// 5. Tariffs section
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Сравнение Вариантов Проживания<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="tariffs.title">Living Options Comparison</h2>');
html = html.replace(/<p class="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">Сравните реальные расходы: самостоятельная организация быта против пакетного проживания без забот\.<\/p>/, '<p class="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto" data-i18n="tariffs.sub">Compare real expenses: managing daily hassles yourself vs. all-inclusive worry-free living.</p>');

// 6. Autonomy
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Ноль отключений света, ноль падений сети<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="autonomy.title">Zero Blackouts, Zero Connection Drops</h2>');
html = html.replace(/5-кратное дублирование всех систем жизнеобеспечения на высоте 265м над уровнем моря\./g, '5-fold engineered redundancy for all life support and work systems at 265m elevation.');

// 7. Arrival
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Встреча в аэропорту — Дома через 90 минут<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="arrival.title">Airport Pickup — At Home in 90 Minutes</h2>');
html = html.replace(/Забудьте типичный азиатский хаос по прилёту\. Мы берем на себя 100% логистики\./g, 'Forget the typical Asian arrival chaos. We handle 100% of the logistics and settling-in.');

// 8. Services
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Все рутинные заботы под одной крышей<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="services.title">Every Routine Handled Under One Roof</h2>');
html = html.replace(/Мы позаботились обо всех бытовых вопросах, чтобы вы тратили 100% энергии на результат\./g, 'We took care of every single chore so you can devote 100% of your energy to high-value output.');

// 9. Club
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">До 2 человек на номер — Никакой толпы<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="club.title">Up to 2 People per Suite — Zero Crowd</h2>');
html = html.replace(/Мы осознанно отказались от формата шумных коливингов на 20 человек ради приватности и покоя\./g, 'We intentionally rejected the 20-person noisy coliving model in favor of an intimate, elite sanctuary.');

// 10. Reviews
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Проверено IT-специалистами на месте<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="reviews.title">Tested by Specialists on the Ground</h2>');
html = html.replace(/Реальные отзывы разработчиков, сменивших суету мегаполисов на автономность у океана\./g, 'Real feedback from engineers who traded city burnout for quiet oceanic autonomy.');

// 11. Trust
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Видеозвонок и спидтест до любой оплаты<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="trust.title">Video Call & Speedtest Before Any Payment</h2>');
html = html.replace(/Никаких скрытых условий\. Мы проводим персональный онлайн-румтур[^<]+/g, 'We never ask for blind deposits. We schedule a 1-on-1 live video walkthrough, test Starlink speeds together, show your exact suite, and answer every legal question.');
html = html.replace(/Записаться на видеотур в Telegram →/g, 'Schedule a Live Video Tour on Telegram →');

// 12. Final CTA & Footer
html = html.replace(/⚡ ВНИМАНИЕ: Осталось только 3 номера из 6/g, '⚡ ATTENTION: Only 3 of 6 suites remaining');
html = html.replace(/Осталось только 3 свободных номера из 6/g, 'Only 3 of 6 Rooms Remaining');
html = html.replace(/БОНУС ПЕРВЫМ РЕЗИДЕНТАМ:/g, 'EARLY RESIDENT BONUS:');
html = html.replace(/Как только все 6 номеров будут забронированы на 12 месяцев[^<]+/g, 'As soon as all 6 suites are booked for 12 months, we construct a brand-new infinity swimming pool on-site. Your rate remains locked for the entire year.');
html = html.replace(/Заказать сейчас в Telegram →/g, 'Message on Telegram →');
html = html.replace(/Написать в WhatsApp/g, 'Message on WhatsApp');

fs.writeFileSync('./index.html', html, 'utf8');
console.log('Processed initial batch of replacements.');
