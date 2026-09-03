const fs = require('fs');
const path = require('path');

global.window = {};
require('./i18n/en.js');
require('./i18n/ru.js');
require('./i18n/tl.js');

const en = window.TRANSLATIONS.en;
const ru = window.TRANSLATIONS.ru;
const tl = window.TRANSLATIONS.tl;

function writeLang(code, data) {
  const content = `window.TRANSLATIONS = window.TRANSLATIONS || {};\n\nwindow.TRANSLATIONS.${code} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, 'i18n', `${code}.js`), content, 'utf8');
  console.log(`Saved: ./i18n/${code}.js`);
}

// 1. CEBUANO / BISAYA (ceb)
const ceb = JSON.parse(JSON.stringify(tl));
ceb.langName = "Cebuano / Bisaya";
ceb.flag = "🇵🇭";
ceb.header.selectLangTitle = "Pagpili og Pinulongan / Wika";
ceb.header.placesCount = "Nahibilin: <strong class=\"text-emerald-300 font-bold\">3</strong> sa 6 ka kwarto";
ceb.header.contactBtn = "PAGPAKIGKITA →";
ceb.hero.titleMain = "AUTONOMOUS IT-BUNKER";
ceb.hero.titleSub = "ANG IMONG 3-KA TUIG NGA KAPANALIPDAN UG KALINAW";
ceb.hero.badgeSolar = "Kusog nga 🌞Solar Station";
ceb.hero.badgeStarlink = "Starlink hangtod 350 Mbps";
ceb.hero.badgeWater = "18,000L Reserba sa Tubig";
ceb.hero.callout1 = "Apil ang Airport Pickup";
ceb.hero.callout2P1 = "90+- MINUTOS NAA NA SA BALAY NGA MAY ";
ceb.hero.callout2P2 = "TANAW NGA PANG-MILYON DOLYAR";
ceb.hero.benQuiet = "Hilom";
ceb.hero.benCool = "Bugnaw ang Hangin";
ceb.hero.benSafe = "Layo sa Kasamok";
ceb.hero.benVisa = "3-Ka Tuig nga Visa";
ceb.hero.benAutonomy = "Tibuok Autonomiya!";
ceb.rooms.title = "Mga Kwarto ug Presyo";
ceb.rooms.sub = "6 ra ka lawak sa kinatibuk-an. Sa pagkakaron, 3 na lang ang bakante.";
ceb.rooms.status = "● Kahimtang: <strong class=\"text-white\">3 sa 6 ang bakante</strong>";
ceb.tariffs.title = "Pagtandi sa mga Opsyon sa Pagpuyo";
ceb.tariffs.sub = "Itandi ang tinuod nga gasto: ikaw tanan vs. all-inclusive nga walay labad sa ulo.";
ceb.tariffs.perMo = "/buwan";
ceb.tariffs.once = "kausa";
ceb.tariffs.perHr = "/oras";
ceb.tariffs.calcTitle = "⏱️ Kwentada sa Nawala nga Kita ug Oras";
ceb.tariffs.calcCtaBtn = "Hawani ang Imong Oras →";
ceb.finalCta.urgencyBadge = "⚡ PAHINUMDOM: 3 na lang sa 6 ka suites ang nahibilin";
ceb.finalCta.title = "3 na lang ka Kwarto ang Bakante sa 6";
ceb.finalCta.tgBtn = "Mensahe sa Telegram →";
ceb.finalCta.waBtn = "Mensahe sa WhatsApp";
ceb.footer.line1 = "SAMAL IT-BUNKER • RESIDENCE CLUB";
ceb.footer.line2 = "Samal Island, Lalawigan sa Davao del Norte, Pilipinas • 265m Ibabaw sa Dagat";

writeLang('ceb', ceb);

// 2. KOREAN (ko)
const ko = JSON.parse(JSON.stringify(en));
ko.langName = "한국어";
ko.flag = "🇰🇷";
ko.meta = {
  title: "사말 IT 벙커 — 캐리어 하나로 입주, 1시간 만에 코딩 시작",
  description: "3년 합법 거주, 해외 소득 0% 비과세, 정전/단선 없는 스타링크 및 6인 전용 프라이빗 안식처. 필리핀 사말섬."
};
ko.header = {
  selectLangTitle: "언어 선택 / Select Language",
  logoSub: "필리핀 • EO 86",
  placesCount: "잔여: 6개 중 <strong class=\"text-emerald-300 font-bold\">3</strong>개 객실",
  contactBtn: "문의하기 →"
};
ko.hero = {
  flag: "🇵🇭",
  titleMain: "자율형 IT 벙커",
  titleSub: "당신의 3년 쉴드 & 자유",
  badgeSolar: "강력한 🌞태양광 발전소",
  badgeStarlink: "최대 350 Mbps 스타링크",
  badgeWater: "18,000L 청정수 비축",
  slide1Tag: "1.2CM 통유리, 오션뷰 및 화산 파노라마 뷰",
  slide1Title: "허먼밀러 의자와 파노라마 뷰를 갖춘 인체공학적 작업 공간",
  slide1Room: "마스터 스튜디오 • 3x3m 대형 창문",
  slide2Tag: "해발 265M에서 즐기는 백만 불짜리 파노라마",
  slide2Title: "• 시원한 바람 • 완벽한 고요함 • 100% 자립형 시스템",
  slide2Room: "SAMAL VIEW RESORT",
  slide3Tag: "모든 일상 가사를 턴키로 해결해 드립니다",
  slide3Title: "인생과 개발에만 집중하세요 — 나머지는 저희가 완벽히 케어합니다!",
  slide3Room: "ROOM #6",
  callout1: "공항 무료 픽업 포함",
  callout2P1: "90여 분 후 백만 불짜리 뷰를 가진 ",
  callout2P2: "나만의 홈 도착",
  benQuiet: "절대적 고요",
  benCool: "시원한 산들바람",
  benSafe: "분쟁 없는 안전지대",
  benVisa: "3년 거주 비자",
  benAutonomy: "100% 자율 자립!"
};
ko.rooms.title = "객실 및 가격 안내";
ko.rooms.sub = "총 6개 객실 한정. 현재 단 3자리만 예약 가능합니다.";
ko.rooms.status = "● 상태: <strong class=\"text-white\">6개 중 3개 가능</strong>";
ko.rooms.r1Title = "2룸 스탠다드 아파트먼트";
ko.rooms.r2Title = "VIP 프레임리스 글래스 스위트";
ko.rooms.r3Title = "VIP 오픈에어 펜트하우스";
ko.tariffs.title = "거주 옵션 비교";
ko.tariffs.sub = "직접 가사를 해결할 때의 기회비용 vs 올인클루시브 턴키 라이프를 비교해 보세요.";
ko.tariffs.tab0 = "직접 해결";
ko.tariffs.tab1 = "월별 결제";
ko.tariffs.tab2 = "1년 올인클루시브 ⭐";
ko.tariffs.perMo = "/월";
ko.tariffs.once = "1회";
ko.tariffs.perHr = "/시간";
ko.tariffs.c1Title = "직접 해결 플랜";
ko.tariffs.c2Title = "월 단위 플랜";
ko.tariffs.c3Title = "1년 올인클루시브 VIP";
ko.tariffs.calcTitle = "⏱️ 일상 가사로 인한 기회비용 계산기";
ko.tariffs.calcRatePrompt = "당신의 시급을 선택하세요:";
ko.tariffs.calcCtaBtn = "시간 절약하고 개발에 집중하기 →";
ko.autonomy.title = "정전 0회, 인터넷 끊김 0회";
ko.autonomy.sub = "해발 265m 고지대에서 구현된 5중 리던던시 안전 인프라.";
ko.arrival.title = "공항 픽업 — 90분 만에 쾌적한 입주 완료";
ko.services.title = "모든 가사와 루틴을 원스톱으로 케어";
ko.club.title = "객실당 최대 2인 — 번잡함 없는 6인 안식처";
ko.reviews.title = "현지 입주 IT 전문가들의 실제 후기";
ko.trust.title = "결제 전 실시간 화상 투어 & 스피드테스트 진행";
ko.trust.btn = "텔레그램으로 화상 투어 신청하기 →";
ko.deepDive.toggle.badgeClosed = "지식 베이스, 정책 및 세부 조건";
ko.deepDive.toggle.badgeOpen = "지식 베이스 펼침 (6개 섹션)";
ko.deepDive.toggle.openBtn = "모든 팩트, 규칙 및 거주 조건 펼쳐보기 (6개 섹션) ↓";
ko.deepDive.toggle.closeBtn = "지식 베이스 접기 ↑";
ko.finalCta.urgencyBadge = "⚡ 긴급: 6개 객실 중 3개만 남음";
ko.finalCta.title = "단 3개의 객실만 남아있습니다";
ko.finalCta.tgBtn = "텔레그램으로 문의하기 →";
ko.finalCta.waBtn = "왓츠앱으로 문의하기";
ko.footer.line1 = "SAMAL IT-BUNKER • 레지던스 클럽";
ko.footer.line2 = "필리핀 다바오 델 노르테 주 사말섬 • 해발 265m";

writeLang('ko', ko);

// 3. CHINESE (zh)
const zh = JSON.parse(JSON.stringify(en));
zh.langName = "中文";
zh.flag = "🇨🇳";
zh.meta = {
  title: "萨马尔 IT-Bunker — 拎包入住，1小时内开启高效编程",
  description: "3年合法居留，境外收入0%税率，零断电断网星链保障，仅限6人的顶级极客庇护所。菲律宾萨马尔岛。"
};
zh.header = {
  selectLangTitle: "选择语言 / Select Language",
  logoSub: "菲律宾 • EO 86",
  placesCount: "剩余席位: 6个房间中仅剩 <strong class=\"text-emerald-300 font-bold\">3</strong> 席",
  contactBtn: "立即联系 →"
};
zh.hero = {
  flag: "🇵🇭",
  titleMain: "全自主 IT 极客地堡",
  titleSub: "为您打造的 3 年数字护盾与自由天地",
  badgeSolar: "强劲 🌞太阳能电站",
  badgeStarlink: "星链高速高达 350 Mbps",
  badgeWater: "18,000L 高山储备纯净水",
  slide1Tag: "1.2厘米厚无框全景落地玻璃，直面大海与阿波火山",
  slide1Title: "配备赫曼米勒人体工学椅与绝美海景的全景极客工作站",
  slide1Room: "主套房 • 3x3米超大落地窗",
  slide2Tag: "海拔 265 米之巅的百万级海景视野",
  slide2Title: "• 清凉山风 • 绝对静谧 • 全自主运行",
  slide2Room: "SAMAL VIEW RESORT",
  slide3Tag: "一站式解决您的 100% 繁琐日常琐事",
  slide3Title: "尽情享受生活与创作——琐碎杂务全部交给我们！",
  slide3Room: "ROOM #6",
  callout1: "包含机场全程专车接机",
  callout2P1: "90分钟舒适抵达拥有 ",
  callout2P2: "百万级全景视野的家",
  benQuiet: "极致静谧",
  benCool: "清凉海风",
  benSafe: "远离纷扰",
  benVisa: "3年长期签证",
  benAutonomy: "全自主保障!"
};
zh.rooms.title = "房间类型与价格";
zh.rooms.sub = "全区仅设 6 间独立套房。目前仅剩 3 个宝贵席位。";
zh.rooms.status = "● 状态: <strong class=\"text-white\">6 间中仅剩 3 间可选</strong>";
zh.rooms.r1Title = "两居室标准品质套房";
zh.rooms.r2Title = "VIP 无框全景海景套房";
zh.rooms.r3Title = "VIP 露天全景星空顶层套房";
zh.tariffs.title = "居住方案全景对比";
zh.tariffs.sub = "对比自行打理日常琐事的隐形成本 vs 全包式无忧极客生活。";
zh.tariffs.tab0 = "自行打理",
zh.tariffs.tab1 = "按月支付",
zh.tariffs.tab2 = "年付全包 ⭐",
zh.tariffs.perMo = "/月";
zh.tariffs.once = "单次";
zh.tariffs.perHr = "/小时";
zh.tariffs.c1Title = "自行打理方案";
zh.tariffs.c2Title = "按月租赁方案";
zh.tariffs.c3Title = "1年全包尊享 VIP";
zh.tariffs.calcTitle = "⏱️ 家务琐事时间与机会成本计算器";
zh.tariffs.calcRatePrompt = "选择您的每小时收入费率:";
zh.tariffs.calcCtaBtn = "释放宝贵时间，专注于核心创造 →";
zh.autonomy.title = "零停电，零断网";
zh.autonomy.sub = "海拔 265 米高地上构建的 5 重工程冗余全自主保障体系。";
zh.arrival.title = "机场专车接机 — 90 分钟内舒心入住";
zh.services.title = "全方位全包服务，琐事一扫而空";
zh.club.title = "每套房最多 2 人 — 告别拥挤吵闹的 6 人小圈子";
zh.reviews.title = "常驻 IT 专家与创始人的真实评价";
zh.trust.title = "付款前 100% 透明视频实测与网速测试";
zh.trust.btn = "在 Telegram 预约实时视频看房 →";
zh.deepDive.toggle.badgeClosed = "知识库、居住准则与详尽细则";
zh.deepDive.toggle.badgeOpen = "知识库已展开 (6大核心板块)";
zh.deepDive.toggle.openBtn = "展开所有事实依据、规则与合约细则 (6个板块) ↓";
zh.deepDive.toggle.closeBtn = "收起知识库 ↑";
zh.finalCta.urgencyBadge = "⚡ 紧急提醒：6间套房中仅剩最后 3 间";
zh.finalCta.title = "仅剩最后 3 间可用套房";
zh.finalCta.tgBtn = "在 Telegram 发起咨询 →";
zh.finalCta.waBtn = "在 WhatsApp 发起咨询";
zh.footer.line1 = "SAMAL IT-BUNKER • 极客度假俱乐部";
zh.footer.line2 = "菲律宾北达沃省萨马尔岛 • 海拔 265 米";

writeLang('zh', zh);

// 4. KAZAKH (kk)
const kk = JSON.parse(JSON.stringify(ru));
kk.langName = "Қазақша";
kk.flag = "🇰🇿";
kk.meta = {
  title: "Samal IT-Bunker — Шабаданмен келесіз, 1 сағаттан соң код жазасыз",
  description: "3 жылдық заңды мәртебе, шетелдік табысқа 0% салық, өшпейтін Starlink пен электр, және 6 адамдық жабық клуб. Самал аралы, Филиппин."
};
kk.header.selectLangTitle = "Тілді таңдаңыз / Language";
kk.header.placesCount = "Қалғаны: 6 орынның <strong class=\"text-emerald-300 font-bold\">3</strong>-еуі бос";
kk.header.contactBtn = "БАЙЛАНЫСУ →";
kk.hero.titleMain = "АВТОНОМДЫ IT-БУНКЕР";
kk.hero.titleSub = "СІЗДІҢ 3 ЖЫЛДЫҚ ҚОРҒАНЫҢЫЗ ЖӘНЕ ЕРКІНДІГІҢІЗ";
kk.hero.badgeSolar = "Қуатты 🌞Күн станциясы";
kk.hero.badgeStarlink = "350 Мбит/с дейінгі Starlink";
kk.hero.badgeWater = "18 000L Су қоры";
kk.hero.callout1 = "Әуежайдан қарсы алу қосылған";
kk.hero.callout2P1 = "90+- МИНУТ ЖӘНЕ ҮЙДЕ ",
kk.hero.callout2P2 = "МИЛЛИОН $ КӨРІНІСПЕН";
kk.hero.benQuiet = "Тыныштық";
kk.hero.benCool = "Салқын самал";
kk.hero.benSafe = "Қақтығыстардан қашық";
kk.hero.benVisa = "3 жылдық виза";
kk.hero.benAutonomy = "Толық автономия!";
kk.rooms.title = "Бөлмелер және бағалар";
kk.rooms.sub = "Барлығы 6 бөлме. Қазіргі уақытта тек 3 орын бос.";
kk.tariffs.title = "Тұру нұсқаларын салыстыру";
kk.tariffs.perMo = "/ай";
kk.tariffs.once = "бір рет";
kk.tariffs.perHr = "/сағат";
kk.finalCta.urgencyBadge = "⚡ НАЗАР АУДАРЫҢЫЗ: 6 нөмірдің 3-еуі ғана қалды";
kk.finalCta.title = "Бар болғаны 3 бос нөмір қалды";
kk.finalCta.tgBtn = "Telegram-да хабарласу →";
kk.finalCta.waBtn = "WhatsApp-та жазу";

writeLang('kk', kk);

// 5. UKRAINIAN (uk)
const uk = JSON.parse(JSON.stringify(ru));
uk.langName = "Українська";
uk.flag = "🇺🇦";
uk.meta = {
  title: "Samal IT-Bunker — Прилітаєш з валізою, за годину кодиш",
  description: "Легальний статус на 3 роки, 0% податок на іноземний дохід, інтернет і світло без збоїв, та закритий клуб на 6 осіб. Острів Самал, Філіппіни."
};
uk.header.selectLangTitle = "Оберіть мову / Select Language";
uk.header.placesCount = "Залишилось: <strong class=\"text-emerald-300 font-bold\">3</strong> з 6 місць";
uk.header.contactBtn = "ЗВ'ЯЗАТИСЯ →";
uk.hero.titleMain = "АВТОНОМНИЙ IT-БУНКЕР";
uk.hero.titleSub = "ТВІЙ 3-РІЧНИЙ ЗАХИСТ ТА СВОБОДА";
uk.hero.badgeSolar = "Потужна 🌞Сонячна Станція";
uk.hero.badgeStarlink = "Starlink до 350 Мбіт/с";
uk.hero.badgeWater = "18 000L Запасів Води";
uk.hero.callout1 = "Зустріч в Аеропорту Включена";
uk.hero.callout2P1 = "90+- ХВИЛИН І ВДОМА З ";
uk.hero.callout2P2 = "ВИДОМ НА МІЛЬЙОН";
uk.hero.benQuiet = "Тиша";
uk.hero.benCool = "Прохолодний бриз";
uk.hero.benSafe = "Далеко від конфліктів";
uk.hero.benVisa = "Віза на 3 роки";
uk.hero.benAutonomy = "Повна автономія!";
uk.rooms.title = "Номери та Ціни";
uk.tariffs.title = "Порівняння Варіантів Проживання";
uk.tariffs.perMo = "/міс";
uk.tariffs.once = "разово";
uk.tariffs.perHr = "/год";
uk.tariffs.calcTitle = "⏱️ Розрахунок втраченої вигоди на побуті";
uk.finalCta.urgencyBadge = "⚡ УВАГА: Залишилось лише 3 номери з 6";
uk.finalCta.title = "Залишилось лише 3 вільних номери з 6";
uk.finalCta.tgBtn = "Замовити в Telegram →";
uk.finalCta.waBtn = "Написати у WhatsApp";

writeLang('uk', uk);

// 6. GERMAN (de)
const de = JSON.parse(JSON.stringify(en));
de.langName = "Deutsch";
de.flag = "🇩🇪";
de.meta = {
  title: "Samal IT-Bunker — Mit dem Koffer anreisen, in 1 Stunde coden",
  description: "3 Jahre legaler Aufenthalt, 0% Steuern auf Auslandseinkommen, unterbrechungsfreier Starlink-Strom und ein exklusives 6-Personen-Refugium. Samal, Philippinen."
};
de.header.selectLangTitle = "Sprache wählen / Language";
de.header.placesCount = "Verbleibend: <strong class=\"text-emerald-300 font-bold\">3</strong> von 6 Plätzen";
de.header.contactBtn = "KONTAKTIEREN →";
de.hero.titleMain = "AUTONOMER IT-BUNKER";
de.hero.titleSub = "DEIN 3-JAHRES-SCHUTZSCHILD & FREIHEIT";
de.hero.badgeSolar = "Starke 🌞Solaranlage";
de.hero.badgeStarlink = "Starlink bis zu 350 Mbps";
de.hero.badgeWater = "18.000L Wasserreserven";
de.hero.callout1 = "Inklusive Flughafen-Abholung";
de.hero.callout2P1 = "90+- MINUTEN & ZU HAUSE MIT ";
de.hero.callout2P2 = "MILLIONEN-DOLLAR-BLICK";
de.hero.benQuiet = "Ruhig";
de.hero.benCool = "Kühle Brise";
de.hero.benSafe = "Fernab von Krisen";
de.hero.benVisa = "3-Jahres-Visum";
de.hero.benAutonomy = "Vollste Autonomie!";
de.rooms.title = "Zimmer & Preise";
de.tariffs.title = "Vergleich der Wohnoptionen";
de.tariffs.perMo = "/Monat";
de.tariffs.once = "einmalig";
de.tariffs.perHr = "/Std";
de.tariffs.calcTitle = "⏱️ Rechner für entgangenen Verdienst";
de.finalCta.urgencyBadge = "⚡ ACHTUNG: Nur noch 3 von 6 Suiten verfügbar";
de.finalCta.title = "Nur noch 3 von 6 Zimmern frei";
de.finalCta.tgBtn = "Auf Telegram anschreiben →";
de.finalCta.waBtn = "Auf WhatsApp schreiben";

writeLang('de', de);

// 7. FRENCH (fr)
const fr = JSON.parse(JSON.stringify(en));
fr.langName = "Français";
fr.flag = "🇫🇷";
fr.meta = {
  title: "Samal IT-Bunker — Arrivez avec une valise, codez en 1 heure",
  description: "3 ans de résidence légale, 0% d'impôt sur les revenus étrangers, Starlink et électricité sans coupure, et sanctuaire exclusif pour 6 personnes. Île de Samal, Philippines."
};
fr.header.selectLangTitle = "Choisir la langue / Language";
fr.header.placesCount = "Restant : <strong class=\"text-emerald-300 font-bold\">3</strong> sur 6 places";
fr.header.contactBtn = "NOUS CONTACTER →";
fr.hero.titleMain = "IT-BUNKER AUTONOME";
fr.hero.titleSub = "VOTRE BOUCLIER ET LIBERTÉ DE 3 ANS";
fr.hero.badgeSolar = "Puissante 🌞Station Solaire";
fr.hero.badgeStarlink = "Starlink jusqu'à 350 Mbps";
fr.hero.badgeWater = "18 000L de Réserve d'Eau";
fr.hero.callout1 = "Transfert aéroport inclus";
fr.hero.callout2P1 = "90+- MIN ET À LA MAISON AVEC UNE ";
fr.hero.callout2P2 = "VUE À UN MILLION DE DOLLARS";
fr.hero.benQuiet = "Calme";
fr.hero.benCool = "Brise Fraîche";
fr.hero.benSafe = "Loin des conflits";
fr.hero.benVisa = "Visa 3 ans";
fr.hero.benAutonomy = "Pleine autonomie !";
fr.rooms.title = "Chambres & Tarifs";
fr.tariffs.title = "Comparatif des Options de Séjour";
fr.tariffs.perMo = "/mois";
fr.tariffs.once = "une fois";
fr.tariffs.perHr = "/heure";
fr.finalCta.urgencyBadge = "⚡ ATTENTION : Plus que 3 suites sur 6 disponibles";
fr.finalCta.title = "Seulement 3 chambres disponibles sur 6";
fr.finalCta.tgBtn = "Écrire sur Telegram →";
fr.finalCta.waBtn = "Écrire sur WhatsApp";

writeLang('fr', fr);

// 8. SPANISH (es)
const es = JSON.parse(JSON.stringify(en));
es.langName = "Español";
es.flag = "🇪🇸";
es.meta = {
  title: "Samal IT-Bunker — Llega con una maleta, programa en 1 hora",
  description: "Residencia legal de 3 años, 0% de impuestos sobre ingresos extranjeros, Starlink y energía ininterrumpida, y santuario exclusivo para 6 personas. Isla Samal, Filipinas."
};
es.header.selectLangTitle = "Seleccionar idioma / Language";
es.header.placesCount = "Restantes: <strong class=\"text-emerald-300 font-bold\">3</strong> de 6 plazas";
es.header.contactBtn = "CONTACTAR →";
es.hero.titleMain = "IT-BUNKER AUTÓNOMO";
es.hero.titleSub = "TU ESCUDO Y LIBERTAD POR 3 AÑOS";
es.hero.badgeSolar = "Potente 🌞Estación Solar";
es.hero.badgeStarlink = "Starlink hasta 350 Mbps";
es.hero.badgeWater = "18.000L de Reservas de Agua";
es.hero.callout1 = "Recogida en aeropuerto incluida";
es.hero.callout2P1 = "90+- MINUTOS Y EN CASA CON UNA ";
es.hero.callout2P2 = "VISTA DE UN MILLÓN DE DÓLARES";
es.hero.benQuiet = "Silencioso";
es.hero.benCool = "Brisa Fresca";
es.hero.benSafe = "Lejos de conflictos";
es.hero.benVisa = "Visa de 3 Años";
es.hero.benAutonomy = "¡Autonomía Total!";
es.rooms.title = "Habitaciones y Precios";
es.tariffs.title = "Comparación de Opciones de Estadía";
es.tariffs.perMo = "/mes";
es.tariffs.once = "una vez";
es.tariffs.perHr = "/hora";
es.finalCta.urgencyBadge = "⚡ ATENCIÓN: Solo quedan 3 de 6 suites disponibles";
es.finalCta.title = "Solo quedan 3 habitaciones disponibles de 6";
es.finalCta.tgBtn = "Contactar por Telegram →";
es.finalCta.waBtn = "Contactar por WhatsApp";

writeLang('es', es);

console.log("All 11 languages successfully compiled!");
