const fs = require('fs');

global.window = {};
require('./i18n/en.js');
const en = window.TRANSLATIONS.en;

let html = fs.readFileSync('./index.html', 'utf8');

// Helper to replace text inside tags or add data-i18n
function replaceTag(regex, replacement) {
  html = html.replace(regex, replacement);
}

// 1. Image Alts & Aria labels
html = html.replace(/alt="Рабочее место"/g, 'alt="Workspace"');
html = html.replace(/alt="Терраса"/g, 'alt="Terrace"');
html = html.replace(/alt="Бассейн"/g, 'alt="Pool"');
html = html.replace(/alt="Стандарт"/g, 'alt="Standard Room"');
html = html.replace(/alt="Панорама"/g, 'alt="VIP Panorama"');
html = html.replace(/alt="Пентхаус"/g, 'alt="VIP Penthouse"');
html = html.replace(/aria-label="Предыдущий слайд"/g, 'aria-label="Previous slide"');
html = html.replace(/aria-label="Следующий слайд"/g, 'aria-label="Next slide"');

// 2. Rooms Section
html = html.replace(/<span data-i18n="rooms.badge">[^<]+<\/span>/, '<span data-i18n="rooms.badge">Room Selection</span>');
html = html.replace(/<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"[^>]*>Номера и Цены<\/h2>/, '<h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" data-i18n="rooms.title">Rooms & Pricing</h2>');
html = html.replace(/<p class="text-slate-400 text-sm max-w-xl mx-auto"[^>]*>Всего 6 номеров[^<]+<\/p>/, '<p class="text-slate-400 text-sm max-w-xl mx-auto" data-i18n="rooms.sub">Only 6 rooms in total. Currently just 3 spots are available.</p>');
html = html.replace(/● Статус: <strong class="text-white">[^<]+<\/strong>/g, '<span data-i18n-html="rooms.status">● Status: <strong class="text-white">3 of 6 available</strong></span>');

// Room 1
html = html.replace(/Занят до ноября/, '<span data-i18n="rooms.r1Badge">Occupied until Nov</span>');
html = html.replace(/>32 м²</, '><span data-i18n="rooms.r1Size">32 m²</span><');
html = html.replace(/data-i18n="rooms.r1Title">2х комнатные аппартаменты</, 'data-i18n="rooms.r1Title">2-Room Standard Apartment<');
html = html.replace(/data-i18n="rooms.r1Desc">[^<]+</, 'data-i18n="rooms.r1Desc">Cozy suite fully equipped for deep focus with a million-dollar panorama.<');
html = html.replace(/data-i18n="rooms.r1Feat1">[^<]+</, 'data-i18n="rooms.r1Feat1">✓ 140cm Motorized Standing Desk<');
html = html.replace(/data-i18n="rooms.r1Feat2">[^<]+</, 'data-i18n="rooms.r1Feat2">✓ Queen Orthopedic Mattress<');
html = html.replace(/data-i18n="rooms.r1Feat3">[^<]+</, 'data-i18n="rooms.r1Feat3">✓ Unlimited Starlink up to 350 Mbps<');
html = html.replace(/data-i18n="rooms.r1PriceLabel">Стоимость:</, 'data-i18n="rooms.r1PriceLabel">Rate:<');
html = html.replace(/data-i18n="rooms.r1PricePer">\/мес</, 'data-i18n="rooms.r1PricePer">/mo<');
html = html.replace(/data-i18n="rooms.r1Btn">Свободен</, 'data-i18n="rooms.r1Btn">Available<');

// Room 2
html = html.replace(/● Свободен \(1 из 2\)/, '<span data-i18n="rooms.r2Badge">● Available (1 of 2)</span>');
html = html.replace(/>45 м²</, '><span data-i18n="rooms.r2Size">45 m²</span><');
html = html.replace(/data-i18n="rooms.r2Title">[^<]+</, 'data-i18n="rooms.r2Title">VIP Frameless Glass Suite<');
html = html.replace(/data-i18n="rooms.r2Desc">[^<]+</, 'data-i18n="rooms.r2Desc">Sweeping panorama of Mt. Apo volcano and Davao Gulf. Integrated smart home.<');
html = html.replace(/data-i18n="rooms.r2Feat1">[^<]+</, 'data-i18n="rooms.r2Feat1">✓ Open-air terrace with hammock<');
html = html.replace(/data-i18n="rooms.r2Feat2">[^<]+</, 'data-i18n="rooms.r2Feat2">✓ 4K Laser Cinema Projector<');
html = html.replace(/data-i18n="rooms.r2Feat3">[^<]+</, 'data-i18n="rooms.r2Feat3">✓ Premium ergonomic executive chair<');
html = html.replace(/data-i18n="rooms.r2PriceLabel">Стоимость:</, 'data-i18n="rooms.r2PriceLabel">Rate:<');
html = html.replace(/data-i18n="rooms.r2Price">от \$800</, 'data-i18n="rooms.r2Price">from $800<');
html = html.replace(/data-i18n="rooms.r2PricePer">\/мес</, 'data-i18n="rooms.r2PricePer">/mo<');
html = html.replace(/<span>Занять<\/span>/, '<span data-i18n="rooms.r2Btn">Reserve</span>');

// Room 3
html = html.replace(/● Свободен \(2 из 2\)/, '<span data-i18n="rooms.r3Badge">● Available (2 of 2)</span>');
html = html.replace(/>55 м²</, '><span data-i18n="rooms.r3Size">55 m²</span><');
html = html.replace(/data-i18n="rooms.r3Title">[^<]+</, 'data-i18n="rooms.r3Title">VIP Open Air Penthouse<');
html = html.replace(/data-i18n="rooms.r3Desc">[^<]+</, 'data-i18n="rooms.r3Desc">42m² of luxury living space, floating king-size bed, gourmet kitchen, custom art.<');
html = html.replace(/data-i18n="rooms.r3Feat1">[^<]+</, 'data-i18n="rooms.r3Feat1">✓ Direct ocean & volcano panoramic view<');
html = html.replace(/data-i18n="rooms.r3Feat2">[^<]+</, 'data-i18n="rooms.r3Feat2">✓ Herman Miller Embody + 4K display<');
html = html.replace(/data-i18n="rooms.r3Feat3">[^<]+</, 'data-i18n="rooms.r3Feat3">✓ King Koil luxury king-size bed<');
html = html.replace(/data-i18n="rooms.r3PriceLabel">Стоимость:</, 'data-i18n="rooms.r3PriceLabel">Rate:<');
html = html.replace(/data-i18n="rooms.r3Price">от \$900</, 'data-i18n="rooms.r3Price">from $900<');
html = html.replace(/data-i18n="rooms.r3PricePer">\/мес</, 'data-i18n="rooms.r3PricePer">/mo<');
html = html.replace(/<span>Занять<\/span>/, '<span data-i18n="rooms.r3Btn">Reserve</span>');

// 3. Tariffs Tabs & Cards
html = html.replace(/data-i18n="tariffs.tab0">[^<]+</, 'data-i18n="tariffs.tab0">Self-Managed<');
html = html.replace(/data-i18n="tariffs.tab1">[^<]+</, 'data-i18n="tariffs.tab1">Monthly<');
html = html.replace(/data-i18n="tariffs.tab2">[^<]+</, 'data-i18n="tariffs.tab2">1-Year All-Inc ⭐<');

html = html.replace(/data-i18n="tariffs.c1Num">[^<]+</, 'data-i18n="tariffs.c1Num">Option 01<');
html = html.replace(/data-i18n="tariffs.c1Title">[^<]+</, 'data-i18n="tariffs.c1Title">Self-Managed<');
html = html.replace(/data-i18n="tariffs.c1Sub">[^<]+</, 'data-i18n="tariffs.c1Sub">Base room rental without service, all expenses paid separately<');
html = html.replace(/data-i18n="tariffs.c1RentLabel">[^<]+</, 'data-i18n="tariffs.c1RentLabel">Base Room Rental<');
html = html.replace(/data-i18n="tariffs.c1PricePer">\/мес</, 'data-i18n="tariffs.c1PricePer">/mo<');
html = html.replace(/data-i18n="tariffs.c1PriceNote">[^<]+</, 'data-i18n="tariffs.c1PriceNote">No annual rate lock<');
html = html.replace(/data-i18n="tariffs.srvBreakfast">[^<]+</g, 'data-i18n="tariffs.srvBreakfast">Breakfast + specialty coffee — $5/day (≈$150/mo)<');
html = html.replace(/data-i18n="tariffs.srvBike">[^<]+</g, 'data-i18n="tariffs.srvBike">Scooter rental — $160/mo<');
html = html.replace(/data-i18n="tariffs.srvPower">[^<]+</g, 'data-i18n="tariffs.srvPower">Electricity bill — ≈$35/mo<');
html = html.replace(/data-i18n="tariffs.srvLaundry">[^<]+</g, 'data-i18n="tariffs.srvLaundry">Laundry (1x/week) — $15/mo<');
html = html.replace(/data-i18n="tariffs.srvWater">[^<]+</g, 'data-i18n="tariffs.srvWater">Drinking spring water — $10/mo<');
html = html.replace(/data-i18n="tariffs.srvTransfer">[^<]+</g, 'data-i18n="tariffs.srvTransfer">Airport private transfer — $60 (one-time)<');

html = html.replace(/data-i18n="tariffs.c1CostBreakfast">[^<]+</, 'data-i18n="tariffs.c1CostBreakfast">$150/mo<');
html = html.replace(/data-i18n="tariffs.c1CostBike">[^<]+</, 'data-i18n="tariffs.c1CostBike">$160/mo<');
html = html.replace(/data-i18n="tariffs.c1CostPower">[^<]+</, 'data-i18n="tariffs.c1CostPower">≈ $35/mo<');
html = html.replace(/data-i18n="tariffs.c1CostLaundry">[^<]+</, 'data-i18n="tariffs.c1CostLaundry">$15/mo<');
html = html.replace(/data-i18n="tariffs.c1CostWater">[^<]+</, 'data-i18n="tariffs.c1CostWater">$10/mo<');
html = html.replace(/data-i18n="tariffs.c1CostTransfer">[^<]+</, 'data-i18n="tariffs.c1CostTransfer">$60 one-time<');

html = html.replace(/data-i18n="tariffs.c1TotalLabel">[^<]+</, 'data-i18n="tariffs.c1TotalLabel">Total Monthly Cost:<');
html = html.replace(/data-i18n="tariffs.c1TotalPer">\/мес</, 'data-i18n="tariffs.c1TotalPer">/mo<');
html = html.replace(/data-i18n="tariffs.c1TotalNote">[^<]+</, 'data-i18n="tariffs.c1TotalNote">+ $60 airport transfer one-time<');
html = html.replace(/data-i18n="tariffs.c1Btn">[^<]+</, 'data-i18n="tariffs.c1Btn">Choose without service<');

// Card 2
html = html.replace(/data-i18n="tariffs.c2Num">[^<]+</, 'data-i18n="tariffs.c2Num">Option 02<');
html = html.replace(/data-i18n="tariffs.c2Title">[^<]+</, 'data-i18n="tariffs.c2Title">Monthly Plan<');
html = html.replace(/data-i18n="tariffs.c2Sub">[^<]+</, 'data-i18n="tariffs.c2Sub">Room rental + power, water, and laundry included (paid monthly)<');
html = html.replace(/data-i18n="tariffs.c2RentLabel">[^<]+</, 'data-i18n="tariffs.c2RentLabel">Monthly Payment<');
html = html.replace(/data-i18n="tariffs.c2PricePer">\/мес</, 'data-i18n="tariffs.c2PricePer">/mo<');
html = html.replace(/data-i18n="tariffs.c2PriceNote">[^<]+</, 'data-i18n="tariffs.c2PriceNote">No long-term rate lock<');
html = html.replace(/data-i18n="tariffs.c2CostBreakfast">[^<]+</, 'data-i18n="tariffs.c2CostBreakfast">$150/mo<');
html = html.replace(/data-i18n="tariffs.c2CostBike">[^<]+</, 'data-i18n="tariffs.c2CostBike">$160/mo<');
html = html.replace(/data-i18n="tariffs.c2CostPower">[^<]+</, 'data-i18n="tariffs.c2CostPower">included<');
html = html.replace(/data-i18n="tariffs.c2CostLaundry">[^<]+</, 'data-i18n="tariffs.c2CostLaundry">included<');
html = html.replace(/data-i18n="tariffs.c2CostWater">[^<]+</, 'data-i18n="tariffs.c2CostWater">included<');
html = html.replace(/data-i18n="tariffs.c2CostTransfer">[^<]+</, 'data-i18n="tariffs.c2CostTransfer">$60 one-time<');
html = html.replace(/data-i18n="tariffs.c2TotalLabel">[^<]+</, 'data-i18n="tariffs.c2TotalLabel">Total Monthly Cost:<');
html = html.replace(/data-i18n="tariffs.c2TotalPer">\/мес</, 'data-i18n="tariffs.c2TotalPer">/mo<');
html = html.replace(/data-i18n="tariffs.c2TotalNote">[^<]+</, 'data-i18n="tariffs.c2TotalNote">+ bike/meals optional extra<');
html = html.replace(/data-i18n="tariffs.c2Btn">[^<]+</, 'data-i18n="tariffs.c2Btn">Reserve for $850/mo<');

// Card 3
html = html.replace(/data-i18n="tariffs.c3Badge">[^<]+</, 'data-i18n="tariffs.c3Badge">⭐ Best Value<');
html = html.replace(/data-i18n="tariffs.c3Num">[^<]+</, 'data-i18n="tariffs.c3Num">Option 03<');
html = html.replace(/data-i18n="tariffs.c3Title">[^<]+</, 'data-i18n="tariffs.c3Title">1-Year All-Inclusive<');
html = html.replace(/data-i18n="tariffs.c3Sub">[^<]+</, 'data-i18n="tariffs.c3Sub">Guaranteed locked rate for 12 months + full VIP service package<');
html = html.replace(/data-i18n="tariffs.c3RentLabel">[^<]+</, 'data-i18n="tariffs.c3RentLabel">1-Year Advance Payment<');
html = html.replace(/data-i18n="tariffs.c3PricePer">\/мес</, 'data-i18n="tariffs.c3PricePer">/mo<');
html = html.replace(/data-i18n="tariffs.c3PriceNote">[^<]+</, 'data-i18n="tariffs.c3PriceNote">Rate strictly locked for 12 full months<');
html = html.replace(/data-i18n="tariffs.c3CostBreakfast">[^<]+</, 'data-i18n="tariffs.c3CostBreakfast">included<');
html = html.replace(/data-i18n="tariffs.c3CostBike">[^<]+</, 'data-i18n="tariffs.c3CostBike">included<');
html = html.replace(/data-i18n="tariffs.c3CostPower">[^<]+</, 'data-i18n="tariffs.c3CostPower">included<');
html = html.replace(/data-i18n="tariffs.c3CostLaundry">[^<]+</, 'data-i18n="tariffs.c3CostLaundry">included<');
html = html.replace(/data-i18n="tariffs.c3CostWater">[^<]+</, 'data-i18n="tariffs.c3CostWater">included<');
html = html.replace(/data-i18n="tariffs.c3CostTransfer">[^<]+</, 'data-i18n="tariffs.c3CostTransfer">$60 one-time<');
html = html.replace(/data-i18n="tariffs.c3TotalLabel">[^<]+</, 'data-i18n="tariffs.c3TotalLabel">Total Monthly Cost:<');
html = html.replace(/data-i18n="tariffs.c3TotalPer">\/мес</, 'data-i18n="tariffs.c3TotalPer">/mo<');
html = html.replace(/data-i18n="tariffs.c3TotalNote">[^<]+</, 'data-i18n="tariffs.c3TotalNote">You save $520/mo (+$6,240/year)<');
html = html.replace(/data-i18n="tariffs.c3Btn">[^<]+</, 'data-i18n="tariffs.c3Btn">Lock In at $600/mo<');

// Calculator
html = html.replace(/data-i18n-html="tariffs\.calcToggleBtn">[^<]+<span[^>]*>[^<]+<\/span><\/span>/, '<span data-i18n-html="tariffs.calcToggleBtn">How much is your time worth on daily chores? <span class="text-cyan-400 font-semibold underline underline-offset-4">(Calculate)</span></span>');
html = html.replace(/data-i18n="tariffs\.calcTitle">[^<]+</, 'data-i18n="tariffs.calcTitle">⏱️ Lost Income & Time Calculator<');
html = html.replace(/data-i18n-html="tariffs\.calcSub">[^<]+<strong>[^<]+<\/strong><\/p>/, '<p class="text-xs sm:text-sm text-slate-300" data-i18n-html="tariffs.calcSub">Formula: <strong>Hours × Your hourly rate = Money you failed to earn</strong></p>');
html = html.replace(/data-i18n="tariffs\.calcRatePrompt">[^<]+</, 'data-i18n="tariffs.calcRatePrompt">Select your hourly rate:<');
html = html.replace(/data-i18n="tariffs\.calcColTask">[^<]+</, 'data-i18n="tariffs.calcColTask">Daily chore<');
html = html.replace(/data-i18n="tariffs\.calcColTime">[^<]+</, 'data-i18n="tariffs.calcColTime">Time required<');
html = html.replace(/data-i18n="tariffs\.calcColHours">[^<]+</, 'data-i18n="tariffs.calcColHours">Hours/month or one-time<');
html = html.replace(/data-i18n="tariffs\.calcColLoss">[^<]+</, 'data-i18n="tariffs.calcColLoss">Financial loss<');

html = html.replace(/data-i18n="tariffs\.calcRow1Task">[^<]+</, 'data-i18n="tariffs.calcRow1Task">🍳 Cooking breakfast<');
html = html.replace(/data-i18n="tariffs\.calcRow1TaskDesc">[^<]+</, 'data-i18n="tariffs.calcRow1TaskDesc">Grocery shopping + cooking + washing dishes<');
html = html.replace(/data-i18n="tariffs\.calcRow1Hours">[^<]+</, 'data-i18n="tariffs.calcRow1Hours">≈ 15 hrs / mo<');

html = html.replace(/data-i18n="tariffs\.calcRow2Task">[^<]+</, 'data-i18n="tariffs.calcRow2Task">🧺 Laundry & ironing<');
html = html.replace(/data-i18n="tariffs\.calcRow2TaskDesc">[^<]+</, 'data-i18n="tariffs.calcRow2TaskDesc">Dropping off laundry + drying + sorting clothes<');
html = html.replace(/data-i18n="tariffs\.calcRow2Hours">[^<]+</, 'data-i18n="tariffs.calcRow2Hours">≈ 8 hrs / mo<');

html = html.replace(/data-i18n="tariffs\.calcRow3Task">[^<]+</, 'data-i18n="tariffs.calcRow3Task">🛵 Searching & renting bike<');
html = html.replace(/data-i18n="tariffs\.calcRow3TaskDesc">[^<]+</, 'data-i18n="tariffs.calcRow3TaskDesc">Chatting with agents, deposits, picking up scooter<');
html = html.replace(/data-i18n="tariffs\.calcRow3Hours">[^<]+</, 'data-i18n="tariffs.calcRow3Hours">≈ 3+ hrs once<');

html = html.replace(/data-i18n="tariffs\.calcRow4Task">[^<]+</, 'data-i18n="tariffs.calcRow4Task">🔧 Bike maintenance & repairs<');
html = html.replace(/data-i18n="tariffs\.calcRow4TaskDesc">[^<]+</, 'data-i18n="tariffs.calcRow4TaskDesc">Oil changes, brake checks, punctures<');
html = html.replace(/data-i18n="tariffs\.calcRow4Hours">[^<]+</, 'data-i18n="tariffs.calcRow4Hours">≈ 2 hrs once<');

html = html.replace(/data-i18n="tariffs\.calcRow5Task">[^<]+</, 'data-i18n="tariffs.calcRow5Task">🚕 Airport taxi & SIM card<');
html = html.replace(/data-i18n="tariffs\.calcRow5TaskDesc">[^<]+</, 'data-i18n="tariffs.calcRow5TaskDesc">Haggling with drivers, finding airport kiosk<');
html = html.replace(/data-i18n="tariffs\.calcRow5Hours">[^<]+</, 'data-i18n="tariffs.calcRow5Hours">≈ 1.5–2 hrs once<');

html = html.replace(/data-i18n="tariffs\.calcSummaryMonthly">[^<]+</, 'data-i18n="tariffs.calcSummaryMonthly">Total lost monthly income to daily chores at<');
html = html.replace(/data-i18n="tariffs\.calcSummaryOnetime">[^<]+</, 'data-i18n="tariffs.calcSummaryOnetime">One-time initial time losses:<');
html = html.replace(/data-i18n="tariffs\.calcTakeaway">[^<]+</, 'data-i18n="tariffs.calcTakeaway">💡 In the «1-Year All-Inclusive» tariff, all these chores are eliminated. You reinvest that freed time directly into high-value work.<');
html = html.replace(/data-i18n="tariffs\.calcCtaBtn">[^<]+</, 'data-i18n="tariffs.calcCtaBtn">Free Up Your Time →<');
html = html.replace(/data-i18n="tariffs\.footnote">[^<]+</, 'data-i18n="tariffs.footnote">* In the «1-Year All-Inclusive» plan ($600/mo), all chores are handled turnkey: chef breakfast, scooter, utilities, housekeeping, and transfers are inside. Zero hidden fees.<');

// 4. Autonomy Section
html = html.replace(/data-i18n="autonomy\.badge">[^<]+</, 'data-i18n="autonomy.badge">Absolute Autonomy<');
html = html.replace(/data-i18n="autonomy\.card1Title">[^<]+</, 'data-i18n="autonomy.card1Title">Starlink up to 350 Mbps<');
html = html.replace(/data-i18n="autonomy\.card1Desc">[^<]+</, 'data-i18n="autonomy.card1Desc">Low-orbit satellite constellation. 38–45 ms ping to Singapore cloud nodes.<');
html = html.replace(/data-i18n="autonomy\.card2Title">[^<]+</, 'data-i18n="autonomy.card2Title">25 kW Solar Station<');
html = html.replace(/data-i18n="autonomy\.card2Desc">[^<]+</, 'data-i18n="autonomy.card2Desc">14 high-efficiency panels + industrial LiFePO4 batteries for 24/7 power autonomy.<');
html = html.replace(/data-i18n="autonomy\.card3Title">[^<]+</, 'data-i18n="autonomy.card3Title">18,000L Water Reservoir<');
html = html.replace(/data-i18n="autonomy\.card3Desc">[^<]+</, 'data-i18n="autonomy.card3Desc">Pure mountain artesian spring water with 3-stage filtration and UV sterilizer.<');
html = html.replace(/data-i18n="autonomy\.card4Title">[^<]+</, 'data-i18n="autonomy.card4Title">Smart Home & Climate<');
html = html.replace(/data-i18n="autonomy\.card4Desc">[^<]+</, 'data-i18n="autonomy.card4Desc">Whisper-quiet inverter ACs with ionization, automatic sensors, and smart lighting.<');
html = html.replace(/data-i18n="autonomy\.card5Title">[^<]+</, 'data-i18n="autonomy.card5Title">Power Surge & Surge Protector<');
html = html.replace(/data-i18n="autonomy\.card5Desc">[^<]+</, 'data-i18n="autonomy.card5Desc">Studio-grade voltage stabilization and industrial lightning rod protection.<');
html = html.replace(/data-i18n="autonomy\.card6Title">[^<]+</, 'data-i18n="autonomy.card6Title">265m Elevation & Security<');
html = html.replace(/data-i18n="autonomy\.card6Desc">[^<]+</, 'data-i18n="autonomy.card6Desc">Natural mosquito barrier, 3–4°C cooler breeze, and complete privacy from crowds.<');

// 5. Arrival Section
html = html.replace(/data-i18n="arrival\.badge">[^<]+</, 'data-i18n="arrival.badge">Zero Operational Friction<');
html = html.replace(/data-i18n="arrival\.step1Title">[^<]+</, 'data-i18n="arrival.step1Title">VIP Davao Airport Pickup (DVO)<');
html = html.replace(/data-i18n="arrival\.step1Desc">[^<]+</, 'data-i18n="arrival.step1Desc">Our driver meets you right at arrivals with a personalized sign and handles luggage.<');
html = html.replace(/data-i18n="arrival\.step2Title">[^<]+</, 'data-i18n="arrival.step2Title">Pre-Activated Unlimited SIM<');
html = html.replace(/data-i18n="arrival\.step2Desc">[^<]+</, 'data-i18n="arrival.step2Desc">Instant 5G high-speed internet connection right from the airport terminal.<');
html = html.replace(/data-i18n="arrival\.step3Title">[^<]+</, 'data-i18n="arrival.step3Title">Room 100% Prepped & Chilled<');
html = html.replace(/data-i18n="arrival\.step3Desc">[^<]+</, 'data-i18n="arrival.step3Desc">Cooled room, made bed, connected Wi-Fi, and a hot welcome chef meal waiting.<');
html = html.replace(/data-i18n="arrival\.quote">[^<]+</, 'data-i18n="arrival.quote">“Arrive and start working on the very same day, with zero daily hassles.”<');

// 6. Services Section
html = html.replace(/data-i18n="services\.badge">[^<]+</, 'data-i18n="services.badge">All-Inclusive Living<');
html = html.replace(/data-i18n="services\.item1Title">[^<]+</, 'data-i18n="services.item1Title">Chef Breakfast & Specialty Coffee<');
html = html.replace(/data-i18n="services\.item1Desc">[^<]+</, 'data-i18n="services.item1Desc">Freshly brewed artisanal espresso, tropical fruit bowls, and wholesome nutrition.<');
html = html.replace(/data-i18n="services\.item2Title">[^<]+</, 'data-i18n="services.item2Title">Lunch & Dinner by Resident Chef<');
html = html.replace(/data-i18n="services\.item2Desc">[^<]+</, 'data-i18n="services.item2Desc">Personalized healthy meals cooked on demand and served straight to your balcony.<');
html = html.replace(/data-i18n="services\.item3Title">[^<]+</, 'data-i18n="services.item3Title">Grocery & Supply Deliveries<');
html = html.replace(/data-i18n="services\.item3Desc">[^<]+</, 'data-i18n="services.item3Desc">Doorstep delivery of fresh mangoes, durian, groceries, and pharmacy needs.<');
html = html.replace(/data-i18n="services\.item4Title">[^<]+</, 'data-i18n="services.item4Title">Fitness Gym & Induction Training<');
html = html.replace(/data-i18n="services\.item4Desc">[^<]+</, 'data-i18n="services.item4Desc">Weights, pull-up stations, dumbbells, yoga mats, and an Olympic standard bar.<');
html = html.replace(/data-i18n="services\.item5Title">[^<]+</, 'data-i18n="services.item5Title">Powerful Scooters Included<');
html = html.replace(/data-i18n="services\.item5Desc">[^<]+</, 'data-i18n="services.item5Desc">Fully maintained, fueled automatic scooters ready in the covered parking lot.<');
html = html.replace(/data-i18n="services\.item6Title">[^<]+</, 'data-i18n="services.item6Title">In-Room Pro Tech & Ergonomics<');
html = html.replace(/data-i18n="services\.item6Desc">[^<]+</, 'data-i18n="services.item6Desc">4K displays, Herman Miller chairs, surge-protected hubs, and motor desks.<');
html = html.replace(/data-i18n="services\.item7Title">[^<]+</, 'data-i18n="services.item7Title">24/7 Personal Concierge<');
html = html.replace(/data-i18n="services\.item7Desc">[^<]+</, 'data-i18n="services.item7Desc">Assistance with visa stamps, island logistics, bookings, and technical errands.<');
html = html.replace(/data-i18n="services\.item8Title">[^<]+</, 'data-i18n="services.item8Title">In-Villa Therapeutic Massage<');
html = html.replace(/data-i18n="services\.item8Desc">[^<]+</, 'data-i18n="services.item8Desc">Authentic Hilot and deep-tissue recovery massages on your private terrace.<');
html = html.replace(/data-i18n="services\.item9Title">[^<]+</, 'data-i18n="services.item9Title">Freediving & Ocean Yoga<');
html = html.replace(/data-i18n="services\.item9Desc">[^<]+</, 'data-i18n="services.item9Desc">Coral reef sessions, paddleboards, and morning breathing practices overlooking the bay.<');
html = html.replace(/data-i18n="services\.item10Title">[^<]+</, 'data-i18n="services.item10Title">Custom Island Expeditions<');
html = html.replace(/data-i18n="services\.item10Desc">[^<]+</, 'data-i18n="services.item10Desc">Visits to giant bat sanctuaries, Hagimit waterfalls, and untouched white sand coves.<');
html = html.replace(/data-i18n="services\.item11Title">[^<]+</, 'data-i18n="services.item11Title">Cyber Lounge & Board Games<');
html = html.replace(/data-i18n="services\.item11Desc">[^<]+</, 'data-i18n="services.item11Desc">High-end sound system, cinema projector, VR headset, and networking firesides.<');

// 7. Club Section
html = html.replace(/data-i18n="club\.badge">[^<]+</, 'data-i18n="club.badge">Curated 6-Person Sanctuary<');
html = html.replace(/data-i18n="club\.card1Title">[^<]+</, 'data-i18n="club.card1Title">Strict Verification<');
html = html.replace(/data-i18n="club\.card1Sub">[^<]+</, 'data-i18n="club.card1Sub">Only vetted remote engineers, founders, and creators with proven track records.<');
html = html.replace(/data-i18n="club\.card1Desc">[^<]+</, 'data-i18n="club.card1Desc">No loud budget backpackers or disruptive parties. Mutual professional respect is mandatory.<');
html = html.replace(/data-i18n="club\.card2Title">[^<]+</, 'data-i18n="club.card2Title">Acoustic Silence<');
html = html.replace(/data-i18n="club\.card2Desc">[^<]+</, 'data-i18n="club.card2Desc">24/7 quiet hours in working zones. Studio-grade soundproofing and private balconies.<');
html = html.replace(/data-i18n="club\.card3Title">[^<]+</, 'data-i18n="club.card3Title">High-Caliber Network<');
html = html.replace(/data-i18n="club\.card3Desc">[^<]+</, 'data-i18n="club.card3Desc">Exchange architecture patterns, discuss AI breakthroughs, and build global ventures together.<');

// 8. Reviews
html = html.replace(/data-i18n="reviews\.badge">[^<]+</, 'data-i18n="reviews.badge">Resident Experiences<');
html = html.replace(/data-i18n="reviews\.r1Text">[^<]+</, 'data-i18n="reviews.r1Text">“I used to waste 3 hours every day in Bali just dealing with noisy neighbors, power cuts, and laundry. Here on Samal, my Starlink never drops, my AC runs 24/7 on solar, and my output tripled.”<');
html = html.replace(/data-i18n="reviews\.r2Text">[^<]+</, 'data-i18n="reviews.r2Text">“The 3-year EO 86 visa setup was seamlessly handled by the concierge. Waking up to Mt. Apo while sipping espresso on the cyber-deck is unmatched anywhere in Southeast Asia.”<');
html = html.replace(/data-i18n="reviews\.r3Text">[^<]+</, 'data-i18n="reviews.r3Text">“Having my meals prepared and my scooter ready means I can focus 100% on product delivery. The locked rate for the entire year gives me total peace of mind.”<');

// 9. Trust
html = html.replace(/data-i18n="trust\.badge">[^<]+</, 'data-i18n="trust.badge">100% Transparency<');
html = html.replace(/data-i18n="trust\.desc">[^<]+</, 'data-i18n="trust.desc">We never ask for blind deposits. We schedule a 1-on-1 live video walkthrough, test Starlink speeds together, show your exact suite, and answer every legal question.<');
html = html.replace(/data-i18n="trust\.btn">[^<]+</, 'data-i18n="trust.btn">Schedule a Live Video Tour on Telegram →<');

// 10. Deep Dive Sections
html = html.replace(/data-i18n="deepDive\.toggle\.badgeClosed">[^<]+</, 'data-i18n="deepDive.toggle.badgeClosed">Knowledge Base, Policies & Facts<');
html = html.replace(/data-i18n="deepDive\.toggle\.openBtn">[^<]+</, 'data-i18n="deepDive.toggle.openBtn">Expand all facts, rules, and conditions (6 sections) ↓<');

// Deep Dive Nav
html = html.replace(/data-i18n="deepDive\.nav\.legal">[^<]+</, 'data-i18n="deepDive.nav.legal">🏛️ Visa EO 86 & 36 Mos<');
html = html.replace(/data-i18n="deepDive\.nav\.rules">[^<]+</, 'data-i18n="deepDive.nav.rules">🚫 Culture & Taboos<');
html = html.replace(/data-i18n="deepDive\.nav\.location">[^<]+</, 'data-i18n="deepDive.nav.location">🏝️ Samal Island & Nature<');
html = html.replace(/data-i18n="deepDive\.nav\.comparison">[^<]+</, 'data-i18n="deepDive.nav.comparison">📊 8-Country Matrix<');
html = html.replace(/data-i18n="deepDive\.nav\.whyBest">[^<]+</, 'data-i18n="deepDive.nav.whyBest">🏆 9 Reasons Why We Are Best<');
html = html.replace(/data-i18n="deepDive\.nav\.faq">[^<]+</, 'data-i18n="deepDive.nav.faq">FAQ (6 Answers)<');

// Legal
html = html.replace(/data-i18n="deepDive\.legal\.badge">[^<]+</, 'data-i18n="deepDive.legal.badge">Official Legal Framework<');
html = html.replace(/data-i18n="deepDive\.legal\.title">[^<]+</, 'data-i18n="deepDive.legal.title">3-Year Legal Residency & 0% Foreign Income Tax<');
html = html.replace(/data-i18n="deepDive\.legal\.sub">[^<]+</, 'data-i18n="deepDive.legal.sub">Two official government avenues to reside legally in the Philippines without border runs.<');
html = html.replace(/data-i18n="deepDive\.legal\.pathATitle">[^<]+</, 'data-i18n="deepDive.legal.pathATitle">Executive Order 86 (EO 86)<');
html = html.replace(/data-i18n="deepDive\.legal\.pathABadge">[^<]+</, 'data-i18n="deepDive.legal.pathABadge">Official Status<');
html = html.replace(/data-i18n="deepDive\.legal\.pathA1">[^<]+</, 'data-i18n="deepDive.legal.pathA1">✓ Up to 3 years continuous renewable resident visa<');
html = html.replace(/data-i18n="deepDive\.legal\.pathA2">[^<]+</, 'data-i18n="deepDive.legal.pathA2">✓ 0% tax liability on income earned outside the Philippines<');
html = html.replace(/data-i18n="deepDive\.legal\.pathA3">[^<]+</, 'data-i18n="deepDive.legal.pathA3">✓ Full concierge submission with zero embassy queues<');
html = html.replace(/data-i18n="deepDive\.legal\.pathBTitle">[^<]+</, 'data-i18n="deepDive.legal.pathBTitle">Extended Tourist Status<');
html = html.replace(/data-i18n="deepDive\.legal\.pathBBadge">[^<]+</, 'data-i18n="deepDive.legal.pathBBadge">Zero Bureaucracy<');
html = html.replace(/data-i18n="deepDive\.legal\.pathB1">[^<]+</, 'data-i18n="deepDive.legal.pathB1">✓ Free 30-day entry visa stamp on arrival at the airport<');
html = html.replace(/data-i18n="deepDive\.legal\.pathB2">[^<]+</, 'data-i18n="deepDive.legal.pathB2">✓ Continuous extensions on-site up to 36 months without leaving<');
html = html.replace(/data-i18n="deepDive\.legal\.pathB3">[^<]+</, 'data-i18n="deepDive.legal.pathB3">✓ Passport renewals handled directly by our resident concierge<');
html = html.replace(/data-i18n="deepDive\.legal\.militaryNote">[^<]+</, 'data-i18n="deepDive.legal.militaryNote">🛡️ Official legal registration and address registration provided for all digital nomads.<');

// Rules
html = html.replace(/data-i18n="deepDive\.rules\.badge">[^<]+</, 'data-i18n="deepDive.rules.badge">Community Standards & Sanctuary Code<');
html = html.replace(/data-i18n="deepDive\.rules\.title">[^<]+</, 'data-i18n="deepDive.rules.title">A Place for the Aligned. Read Before Reserving.<');
html = html.replace(/data-i18n="deepDive\.rules\.sub">[^<]+</, 'data-i18n="deepDive.rules.sub">We are an exclusive residence club, not a public party hostel.<');
html = html.replace(/data-i18n="deepDive\.rules\.c1Title">[^<]+</, 'data-i18n="deepDive.rules.c1Title">Who It\'s For<');
html = html.replace(/data-i18n-html="deepDive\.rules\.c1Items">[^<]+<br>[^<]+<br>[^<]+<\/div>/, '<div class="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2" data-i18n-html="deepDive.rules.c1Items">• Remote software engineers, founders, quants, designers<br>• People who value quiet focus, pristine nature, and health<br>• Long-term residents seeking 6–12 months stability</div>');
html = html.replace(/data-i18n="deepDive\.rules\.c2Title">[^<]+</, 'data-i18n="deepDive.rules.c2Title">Who It\'s Not For<');
html = html.replace(/data-i18n-html="deepDive\.rules\.c2Items">[^<]+<br>[^<]+<br>[^<]+<\/div>/, '<div class="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2" data-i18n-html="deepDive.rules.c2Items">• Party tourists looking for nightlife and pub crawls<br>• Short stays under 1 month<br>• Demands for 24/7 hotel butler pampering</div>');
html = html.replace(/data-i18n="deepDive\.rules\.c3Title">[^<]+</, 'data-i18n="deepDive.rules.c3Title">Zero Tolerance Taboos<');
html = html.replace(/data-i18n-html="deepDive\.rules\.c3Items">[^<]+<br>[^<]+<br>[^<]+<\/div>/, '<div class="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2" data-i18n-html="deepDive.rules.c3Items">• Aggressive behavior or disrespect toward neighbors<br>• Review blackmail or toxic communication<br>• Noise disturbances during quiet hours</div>');
html = html.replace(/data-i18n="deepDive\.rules\.warning">[^<]+</, 'data-i18n="deepDive.rules.warning">⚠️ Any violation of core sanctuary safety rules results in immediate contract termination.<');
html = html.replace(/data-i18n="deepDive\.rules\.termsTitle">[^<]+</, 'data-i18n="deepDive.rules.termsTitle">Core Contract Conditions<');
html = html.replace(/data-i18n="deepDive\.rules\.t1">[^<]+</, 'data-i18n="deepDive.rules.t1">1. Term: 12-month standard contract with locked rate.<');
html = html.replace(/data-i18n="deepDive\.rules\.t1Desc">[^<]+</, 'data-i18n="deepDive.rules.t1Desc">Long-term residence format for those seeking a stable home base without constant relocation.<');
html = html.replace(/data-i18n="deepDive\.rules\.t2">[^<]+</, 'data-i18n="deepDive.rules.t2">2. Deposit: 1-month security deposit to lock the suite.<');
html = html.replace(/data-i18n="deepDive\.rules\.t2Desc">[^<]+</, 'data-i18n="deepDive.rules.t2Desc">Locks the suite strictly under your name and removes it from listings. Non-refundable upon cancellation.<');
html = html.replace(/data-i18n="deepDive\.rules\.t3">[^<]+</, 'data-i18n="deepDive.rules.t3">3. Settlement: Balance paid strictly upon arrival day (USDT / Bank).<');
html = html.replace(/data-i18n="deepDive\.rules\.t3Desc">[^<]+</, 'data-i18n="deepDive.rules.t3Desc">Full payment for the initial period is settled on check-in day via USDT/USDC or bank wire.<');

// Location
html = html.replace(/data-i18n="deepDive\.location\.badge">[^<]+</, 'data-i18n="deepDive.location.badge">Geography & Microclimate<');
html = html.replace(/data-i18n="deepDive\.location\.title">[^<]+</, 'data-i18n="deepDive.location.title">Samal Island: 265m Above Davao Gulf<');
html = html.replace(/data-i18n="deepDive\.location\.p1">[^<]+</, 'data-i18n="deepDive.location.p1">Located in the protected Davao Gulf, Samal Island is naturally shielded from Pacific typhoons by the surrounding mountain ranges.<');
html = html.replace(/data-i18n="deepDive\.location\.p2">[^<]+</, 'data-i18n="deepDive.location.p2">At an altitude of 265 meters, temperatures remain 3–4°C cooler than the coast, with a constant fresh mountain breeze eliminating tropical stuffiness.<');
html = html.replace(/data-i18n="deepDive\.location\.p3">[^<]+</, 'data-i18n="deepDive.location.p3">Pure artesian spring water sourced directly from our 80-meter mountain well.<');
html = html.replace(/data-i18n="deepDive\.location\.p4">[^<]+</, 'data-i18n="deepDive.location.p4">Just 30 minutes to Davao City international hospitals, modern malls, and Davao Airport (DVO).<');
html = html.replace(/data-i18n="deepDive\.location\.imgCaption">[^<]+</, 'data-i18n="deepDive.location.imgCaption">Panoramic viewpoint from Samal IT-Bunker overlooking Mt. Apo and Davao City skyline<');

// Comparison
html = html.replace(/data-i18n="deepDive\.comparison\.badge">[^<]+</, 'data-i18n="deepDive.comparison.badge">Global Destination Benchmark<');
html = html.replace(/data-i18n="deepDive\.comparison\.title">[^<]+</, 'data-i18n="deepDive.comparison.title">Samal IT-Bunker vs. 8 Nomad Hubs<');
html = html.replace(/data-i18n="deepDive\.comparison\.sub">[^<]+</, 'data-i18n="deepDive.comparison.sub">Evaluated across 16 critical metrics including power uptime, noise levels, visa ease, and cost.<');
html = html.replace(/data-i18n="deepDive\.comparison\.colCriterion">[^<]+</, 'data-i18n="deepDive.comparison.colCriterion">Metric / Criteria<');
html = html.replace(/data-i18n="deepDive\.comparison\.colSamal">[^<]+</, 'data-i18n="deepDive.comparison.colSamal">Samal Bunker<');
for (let i = 1; i <= 16; i++) {
  html = html.replace(new RegExp(`data-i18n="deepDive\\.comparison\\.c${i}">[^<]+<`), `data-i18n="deepDive.comparison.c${i}">${en.deepDive.comparison['c' + i]}<`);
}
html = html.replace(/data-i18n="deepDive\.comparison\.note">[^<]+</, 'data-i18n="deepDive.comparison.note">* Nomad community and coworking scores are intentionally calibrated (4/10): our primary focus is an exclusive 6-person IT sanctuary and deep silence, rather than mass transient tourism.<');

// Why Best
html = html.replace(/data-i18n="deepDive\.whyBest\.badge">[^<]+</, 'data-i18n="deepDive.whyBest.badge">9 Structural Pillars<');
html = html.replace(/data-i18n="deepDive\.whyBest\.title">[^<]+</, 'data-i18n="deepDive.whyBest.title">Why This Is the Best IT Setup in the World<');
html = html.replace(/data-i18n="deepDive\.whyBest\.sub">[^<]+</, 'data-i18n="deepDive.whyBest.sub">Hard facts, engineering data, and uncompromised comfort.<');
for (let i = 1; i <= 9; i++) {
  html = html.replace(new RegExp(`data-i18n="deepDive\\.whyBest\\.p${i}Title">[^<]+<`), `data-i18n="deepDive.whyBest.p${i}Title">${en.deepDive.whyBest['p' + i + 'Title']}<`);
  html = html.replace(new RegExp(`data-i18n="deepDive\\.whyBest\\.p${i}Desc">[^<]+<`), `data-i18n="deepDive.whyBest.p${i}Desc">${en.deepDive.whyBest['p' + i + 'Desc']}<`);
}

// FAQ
html = html.replace(/data-i18n="deepDive\.faq\.badge">[^<]+</, 'data-i18n="deepDive.faq.badge">Frequently Asked Questions<');
html = html.replace(/data-i18n="deepDive\.faq\.title">[^<]+</, 'data-i18n="deepDive.faq.title">Everything You Need to Know<');
for (let i = 1; i <= 6; i++) {
  html = html.replace(new RegExp(`data-i18n="deepDive\\.faq\\.q${i}">[^<]+<`), `data-i18n="deepDive.faq.q${i}">${en.deepDive.faq['q' + i]}<`);
  html = html.replace(new RegExp(`data-i18n-html="deepDive\\.faq\\.a${i}">[^<]+<br>[^<]+<`), `data-i18n-html="deepDive.faq.a${i}">${en.deepDive.faq['a' + i]}<`);
}
html = html.replace(/data-i18n="deepDive\.faq\.closeBtn">[^<]+</, 'data-i18n="deepDive.faq.closeBtn">Collapse Details ↑<');

// Final CTA & Footer
html = html.replace(/data-i18n="finalCta\.urgencyBadge">[^<]+</, 'data-i18n="finalCta.urgencyBadge">⚡ ATTENTION: Only 3 of 6 suites remaining<');
html = html.replace(/data-i18n="finalCta\.title">[^<]+</, 'data-i18n="finalCta.title">Only 3 of 6 Rooms Remaining<');
html = html.replace(/data-i18n="finalCta\.bonusBadge">[^<]+</, 'data-i18n="finalCta.bonusBadge">EARLY RESIDENT BONUS:<');
html = html.replace(/data-i18n="finalCta\.bonusDesc">[^<]+</, 'data-i18n="finalCta.bonusDesc">As soon as all 6 suites are booked for 12 months, we construct a brand-new infinity swimming pool on-site. Your rate remains locked for the entire year.<');
html = html.replace(/data-i18n="finalCta\.tgBtn">[^<]+</, 'data-i18n="finalCta.tgBtn">Message on Telegram →<');
html = html.replace(/data-i18n="finalCta\.waBtn">[^<]+</, 'data-i18n="finalCta.waBtn">Message on WhatsApp<');

html = html.replace(/data-i18n="footer\.line1">[^<]+</, 'data-i18n="footer.line1">SAMAL IT-BUNKER • RESIDENCE CLUB<');
html = html.replace(/data-i18n="footer\.line2">[^<]+</, 'data-i18n="footer.line2">Samal Island, Davao del Norte Province, Philippines • 265m Above Sea Level<');
html = html.replace(/data-i18n="footer\.line3">[^<]+</, 'data-i18n="footer.line3">© 2026 Samal IT-Bunker. All rights reserved. Operating under Executive Order 86.<');

fs.writeFileSync('./index.html', html, 'utf8');
console.log('Finished full sweep of index.html replacements.');
