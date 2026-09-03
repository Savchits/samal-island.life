import { Room, PainPoint, TelemetryMetric, Testimonial, FAQItem } from '../types';
import roomsJson from '../../data/rooms.json';
import pricingJson from '../../data/pricing.json';
import metaJson from '../../data/resort_meta.json';

export const RESORT_STATS = {
  totalRooms: roomsJson.totalRoomsCount || 6,
  availableRooms: roomsJson.availableCount || 2,
  elevation: `${metaJson.geo.elevation} над уровнем моря`,
  island: 'Остров Самал, Филиппины',
  starlinkSpeed: '350+ Мбит/с',
  solarCapacity: '25 кВт + 40 кВт·ч батареи',
  taxRate: '0% на международный доход',
  visaDuration: '36 месяцев (3 года)',
  davaoDistance: '20 минут на частном катере / пароме',
  telegramChannel: metaJson.social.telegramChannel,
  telegramAdmin: metaJson.social.telegramAdmin,
  whatsappNumber: metaJson.social.whatsapp,
};

export const HERO_SLIDES = [
  {
    id: 'master-studio-1',
    title: 'Рабочее место с панорамным остеклением и эргономичным креслом',
    tagline: 'БЕЗРАМОЧНЫЕ ОКНА 1.2 СМ ТОЛЩИНОЙ, ПРЯМОЙ ВИД НА ОКЕАН И ВУЛКАН',
    roomBadge: 'Мастер Студия • Окна 3х3м',
    starlinkBadge: 'Dual Starlink 350+ Мбит/с',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
    deskImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2000&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'cyber-deck-2',
    title: 'Номер на открытом воздухе с гамаком и проектором',
    tagline: 'ТАТАМИ, ГОРНЫЙ БРИЗ, ВЕЧЕРНЕЕ КИНО И ЧАЙНЫЕ ЦЕРЕМОНИИ',
    roomBadge: 'Cyber Zen Deck • 45м²',
    starlinkBadge: 'Dual Starlink 350+ Мбит/с',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
    deskImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'infinity-pool-3',
    title: 'Инфинити-бассейн с закатным видом на вулкан Апо и залив Давао',
    tagline: '265 МЕТРОВ НАД УРОВНЕМ МОРЯ — СВЕЖИЙ ГОРНЫЙ ВОЗДУХ И ПОЛНАЯ ТИШИНА',
    roomBadge: 'Lounge & Wellness Zone',
    starlinkBadge: 'Mesh Wi-Fi 6 на всей территории',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop',
    deskImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2000&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop'
  }
];

export const PAIN_POINTS: PainPoint[] = [
  {
    id: 'pain-1',
    category: 'КАЖДЫЕ ПАРУ МЕСЯЦЕВ',
    problemTitle: 'Виза-раны и стресс',
    problemDesc: 'Бесконечные перелеты каждые 30–60 дней, очереди на границе, допросы офицеров, потеря дней работы и постоянный страх получить отказ во въезде.',
    solutionTitle: 'Виза-раны',
    solutionDesc: '36 месяцев подряд легального проживания без единого выезда из страны.',
    solvedBadge: '100% Решено',
    iconName: 'PlaneTakeoff'
  },
  {
    id: 'pain-2',
    category: 'КОНСКИЕ ЦЕННИКИ',
    problemTitle: 'Цены Дубая и Бали',
    problemDesc: 'В Дубае и на Бали цены на жилье с нормальным интернетом улетели в стратосферу. Переплаты за аренду, налоги, депозиты и скрытые комиссии съедают $4,000–$7,000 в месяц.',
    solutionTitle: 'Цены Дубая и Бали',
    solutionDesc: 'Премиум-резорт «всё включено» с фиксированной честной ценой на весь год.',
    solvedBadge: '100% Решено',
    iconName: 'CreditCard'
  },
  {
    id: 'pain-3',
    category: 'СРЫВ СОЗВОНОВ И СДЕЛОК',
    problemTitle: 'Обрывы связи и света',
    problemDesc: 'Балийские и тайские блэкауты посреди важного питча инвесторам или релизного деплоя. Мобильный интернет умирает вместе с базовыми станциями.',
    solutionTitle: 'Обрывы связи и света',
    solutionDesc: '5х запас солнечной энергии 25 кВт + двойной спутниковый интернет 24/7 без секундного сбоя.',
    solvedBadge: '100% Решено',
    iconName: 'WifiOff'
  },
  {
    id: 'pain-4',
    category: 'ПЕТУХИ И ДУХОТА',
    problemTitle: 'Шум, жара и хаос',
    problemDesc: 'Орущие в 5 утра петухи за окном виллы, строительная пыль соседних строек, бешеная влажность и байкеры без глушителей прямо под дверью.',
    solutionTitle: 'Шум, жара и хаос',
    solutionDesc: 'Высота 265м над уровнем моря, горная прохлада, звукоизоляция 45 дБ и тишина джунглей.',
    solvedBadge: '100% Решено',
    iconName: 'VolumeX'
  },
  {
    id: 'pain-5',
    category: 'ПАРАНОЙЯ ДЕПОРТАЦИИ',
    problemTitle: 'Страх депортации',
    problemDesc: 'Работа по туристической визе в Таиланде или Индонезии — это нелегальщина и риск попасть в иммиграционную тюрьму или черный список.',
    solutionTitle: 'Страх депортации',
    solutionDesc: 'Официальная виза цифрового кочевника (Указ EO 86), карта резидента и полная безопасность.',
    solvedBadge: '100% Решено',
    iconName: 'ShieldAlert'
  }
];

export const ROOMS_DATA: Room[] = [
  {
    id: 'master-sky-suite',
    name: 'Master Sky Suite (Пентхаус)',
    category: 'Панорамный Сьют',
    area: 55,
    status: 'available',
    priceMonthly: 1950,
    badge: 'Свободен • Главный вид',
    description: 'Флагманский номер с фронтальным панорамным остеклением 3х3м, балконом на океан и залив Давао, премиальным моторным столом и кроватью King-size.',
    specs: {
      windows: 'Безрамочный триплекс 12 мм с защитой от UV',
      desk: 'Моторизованный стол 180х80см + Herman Miller Embody',
      starlink: 'Выделенный Ethernet 1Gbps + Wi-Fi 6 (350+ Мбит/с)',
      bed: 'King-size матрас с эффектом памяти King Koil',
      view: '180° панорама: залив Давао, вулкан Апо, джунгли',
      noise: 'Акустический индекс 48 дБ (полная тишина)'
    },
    features: [
      'Панорамные окна 3х3 метра',
      'Электрический стол с регулировкой высоты и памятью',
      '4K 32" Type-C монитор LG UltraFine',
      'Личная ванная комната с тропическим душем из родниковой воды',
      'Система кондиционирования Daikin Inverter (бесшумная)',
      'Ежедневная уборка и прачечная включены'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
        caption: 'Рабочее место с видом на океан и горы',
        tag: 'Рабочая зона'
      },
      {
        url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop',
        caption: 'King-size кровать с парящей подсветкой',
        tag: 'Спальня'
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
        caption: 'Ванная комната со стеклянным тропическим душем',
        tag: 'Ванная'
      }
    ]
  },
  {
    id: 'cyber-zen-studio',
    name: 'Cyber Zen Studio (Open-Air Deck)',
    category: 'Дзен Студия',
    area: 45,
    status: 'available',
    priceMonthly: 1750,
    badge: 'Свободен • Терраса с кинотеатром',
    description: 'Атмосферный номер в японском минимализме с открытой деревянной террасой, бамбуковым гамаком, чайным столиком и 4K проектором для ночных сессий.',
    specs: {
      windows: 'Раздвижные стеклянные слайдеры в пол',
      desk: 'Дубовый стол 160см + эргокресло Steelcase Gesture',
      starlink: 'Wi-Fi 6 Mesh + Cat6 кабель к столу',
      bed: 'Подиум с татами и ортопедическим матрасом',
      view: 'Тропический реликтовый сад и закатное небо',
      noise: 'Только шелест пальм и пение цикад'
    },
    features: [
      'Встроенный лазерный 4K проектор с экраном 120"',
      'Приватная терраса с гамаком для рефлексии и чтения',
      'Чайный набор для гунфу ча и запас фермерского чая',
      'Высокоскоростная зарядка USB-C 100W PD на столе',
      'Экологичные материалы: тиковое дерево, камень, хлопок',
      'Умный дом с управлением светом и климатом через HomeKit'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
        caption: 'Терраса с гамаком и вечерним светом',
        tag: 'Терраса'
      },
      {
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop',
        caption: 'Спальная зона с подиумом и теплым деревом',
        tag: 'Интерьер'
      }
    ]
  },
  {
    id: 'jungle-pod-alpha',
    name: 'Jungle Pod Alpha',
    category: 'Акустический Кокон',
    area: 38,
    status: 'occupied',
    priceMonthly: 1600,
    badge: 'Занят (до Ноября 2026)',
    description: 'Уединенный номер с максимальным уровнем звукоизоляции среди тропических деревьев. Выбор Senior Backend / ML инженеров для состояния глубокого фокуса.',
    specs: {
      windows: 'Двойной шумопоглощающий стеклопакет',
      desk: 'Standing desk + Secretlab Titan Evo',
      starlink: 'Dual Starlink Low Latency',
      bed: 'Queen-size премиум матрас',
      view: 'Густые тропические заросли и птицы',
      noise: 'Шумоизоляция 50 дБ'
    },
    features: [
      'Звукопоглощающие акустические панели на стенах',
      'Студийный микрофонный сетап Shure SM7B на стойке',
      'Индивидуальный очиститель и ионизатор воздуха',
      'Световые сценарии для фокусировки и глубокого сна'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop',
        caption: 'Уютный рабочий номер в джунглях',
        tag: 'Интерьер'
      }
    ]
  },
  {
    id: 'jungle-pod-beta',
    name: 'Jungle Pod Beta',
    category: 'Акустический Кокон',
    area: 38,
    status: 'occupied',
    priceMonthly: 1600,
    badge: 'Занят (до Августа 2026)',
    description: 'Компактный бункерный сьют с боковым видом на океан и тишиной реликтовых джунглей Самала.',
    specs: {
      windows: 'Панорамный эркер в сторону океана',
      desk: 'Motorized Desk + Herman Miller Mirra 2',
      starlink: 'Dual Starlink + 5G резерв',
      bed: 'Queen-size ортопедический матрас',
      view: 'Океанская гладь сквозь кроны пальм',
      noise: 'Шумоизоляция 48 дБ'
    },
    features: [
      'Рабочее место в эркере с видом на горизонт',
      'Индивидуальная кофемашина DeLonghi с зерном спешелти',
      'Скоростной Wi-Fi 6 и кабельный LAN'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2032&auto=format&fit=crop',
        caption: 'Минималистичный интерьер спальни',
        tag: 'Спальня'
      }
    ]
  },
  {
    id: 'executive-founders-suite-1',
    name: 'Executive Founders Suite 1',
    category: 'Сьют для Ко-фаундеров / Пары',
    area: 52,
    status: 'occupied',
    priceMonthly: 2300,
    badge: 'Занят (до Февраля 2027)',
    description: 'Просторный двухзонный сьют с двумя независимыми моторизованными рабочими столами для фаундеров или IT-пары.',
    specs: {
      windows: 'Панорама на 2 стороны света',
      desk: '2 отдельных стола с мотором и креслами HM',
      starlink: 'Dedicated VLAN 500 Мбит/с',
      bed: 'King-size Master Bed',
      view: 'Закат над заливом Давао и огни ночного города',
      noise: 'Полная звукоизоляция комнат'
    },
    features: [
      'Два независимых полноценных рабочих места',
      'Гардеробная комната и зона для отдыха',
      'Большая терраса с шезлонгами',
      'Мини-бар с органическими напитками'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2000&auto=format&fit=crop',
        caption: 'Просторная гостиная и рабочая зона',
        tag: 'Гостиная'
      }
    ]
  },
  {
    id: 'executive-founders-suite-2',
    name: 'Executive Founders Suite 2',
    category: 'Сьют с Приватным Джакузи',
    area: 54,
    status: 'occupied',
    priceMonthly: 2450,
    badge: 'Занят (до Декабря 2026)',
    description: 'Премиальный угловой сьют с открытой верандой, кедровой купелью-джакузи и видом на 360° тропики и океан.',
    specs: {
      windows: 'Круговое остекление',
      desk: 'Custom Walnut Desk 200cm + HM Embody',
      starlink: 'Starlink Priority Business Tier',
      bed: 'King-size Luxury Cloud Bed',
      view: 'Бескрайний океан, горы и джунгли',
      noise: 'Премиум звукоизоляция'
    },
    features: [
      'Приватная подогреваемая кедровая купель на террасе',
      'Панорамный обзор рассветов и закатов',
      'Персональный винный шкаф и чайный бар'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop',
        caption: 'Терраса с видом на закатный океан',
        tag: 'Экстерьер'
      }
    ]
  }
];

export const TELEMETRY_METRICS: TelemetryMetric[] = [
  {
    id: 'starlink-latency',
    label: 'Starlink Ping (Dual Dish)',
    value: '24 мс',
    status: 'optimal',
    unit: 'Low Latency',
    subtext: 'Автоматический фейловер между спутниками',
    icon: 'Radio'
  },
  {
    id: 'bandwidth',
    label: 'Суммарный Канал',
    value: '382 Мбит/с',
    status: 'optimal',
    unit: 'Down / 65 Up',
    subtext: 'Starlink Gen 3 + 5G Backup Hub',
    icon: 'Activity'
  },
  {
    id: 'solar-battery',
    label: 'Запас Энергии (LiFePO4)',
    value: '98%',
    status: 'optimal',
    unit: '39.2 / 40 кВт·ч',
    subtext: '25 кВт солнечных панелей на крышах',
    icon: 'Sun'
  },
  {
    id: 'microclimate',
    label: 'Климат (Высота 265м)',
    value: '24.5 °C',
    status: 'optimal',
    unit: 'Влажность 54%',
    subtext: 'Горный бриз — нет удушающей жары побережья',
    icon: 'Wind'
  },
  {
    id: 'noise-level',
    label: 'Фоновый Шум Внутри',
    value: '26 дБ',
    status: 'optimal',
    unit: 'Тише шепота',
    subtext: '0 петухов, 0 байков, только тишина джунглей',
    icon: 'Volume2'
  },
  {
    id: 'water-purity',
    label: 'Чистота Воды (PPM)',
    value: '22 PPM',
    status: 'optimal',
    unit: 'Родниковая',
    subtext: 'Артезианская скважина 120м + УФ стерилизация',
    icon: 'Droplets'
  }
];

export const AMENITIES_LIST = [
  {
    icon: 'Waves',
    title: 'Инфинити-бассейн с панорамой',
    desc: 'Бассейн с родниковой водой без хлора и прямым видом на вулкан Апо и закатное солнце.'
  },
  {
    icon: 'Flame',
    title: 'Сауна и ледяная купель (Cold Plunge)',
    desc: 'Кедровая финская сауна на дровах и охлаждаемая купель 6°C для биохакинга и перезагрузки.'
  },
  {
    icon: 'Coffee',
    title: 'Specialty Coffee Bar (Free Flow)',
    desc: 'Свежеобжаренная арабика с плантаций Mt. Apo, профессиональная эспрессо-машина, фильтр V60 и альтернативное молоко.'
  },
  {
    icon: 'Utensils',
    title: 'Шеф-повар и органическое меню',
    desc: 'Свежайший тунец с рыбного рынка Давао, сочные манго, авокадо, фермерские стейки и кето/веган опции.'
  },
  {
    icon: 'Dumbbell',
    title: 'Воркаут и Дзен-площадка',
    desc: 'Турники, гантели, тренажеры Concept2, коврики для йоги и зона растяжки в окружении пальм.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Закрытый охраняемый периметр',
    desc: 'Круглосуточная охрана, видеонаблюдение по периметру, контроль доступа, полная конфиденциальность.'
  },
  {
    icon: 'Sparkles',
    title: 'Консьерж-сервис и логистика',
    desc: 'Встреча в аэропорту Давао на частном минивэне, персональный катер на остров, помощь с любыми вопросами.'
  },
  {
    icon: 'FileCheck2',
    title: 'Полное юридическое сопровождение',
    desc: 'Оформление 3-летней визы цифрового кочевника (EO 86), налоговое резидентство и регистрация бизнеса.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Алексей С.',
    role: 'Co-Founder & CTO',
    company: 'Fintech (Series A)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    period: 'Живет в Бункере 9 месяцев',
    rating: 5,
    highlight: 'После 3 лет на Бали я наконец-то сплю по 8 часов в тишине и не думаю про виза-раны.',
    text: 'На Бали меня доконали блэкауты посреди митингов с фондами и вечный рев байков под окном за $3500/мес. Здесь у меня гигабитный Starlink без единого дропа за 9 месяцев, идеальная прохлада на высоте и 0% налога. Это лучшее место для продуктивности в моей жизни.',
    country: 'Резидент Сьюта #1'
  },
  {
    id: 't-2',
    name: 'Дмитрий В.',
    role: 'Lead Solidity / Rust Dev',
    company: 'DeFi Protocol',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    period: 'Живет в Бункере 6 месяцев',
    rating: 5,
    highlight: '36 месяцев легального статуса без выезда — это чистый дзен.',
    text: 'Оформили визу кочевника за 2 недели прямо на месте. Никаких взяток, никаких серых схем. Мой рабочий сетап с окном 3х3м на океан разгружает мозг за секунду. Шеф готовит великолепно, сауна вечером смывает любой стресс код-ревью.',
    country: 'Резидент Сьюта #2'
  },
  {
    id: 't-3',
    name: 'Елена К.',
    role: 'AI Product Lead',
    company: 'Remote US Startup',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    period: 'Живет в Бункере 4 месяца',
    rating: 5,
    highlight: 'Безопасность 100% и потрясающее комьюнити без случайных туристов.',
    text: 'Всего 6 номеров — это значит, что вокруг только адекватные взрослые ребята из IT, никаких инста-тусовщиков и пьяных вечеринок. Мы часто брейнштормим у бассейна на закате. Продуктивность выросла раза в три.',
    country: 'Резидент Jungle Pod'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'visa',
    question: 'Как работает 3-летняя виза цифрового кочевника на Филиппинах?',
    answer: 'В соответствии с президентским указом EO 86 и специальными программами продления, IT-специалисты и удаленные предприниматели могут легально проживать на Филиппинах до 36 месяцев (3 лет) подряд без необходимости выезжать из страны на виза-раны. Наша юридическая служба берет на себя все оформление «под ключ» по прибытии.'
  },
  {
    id: 'faq-2',
    category: 'tax',
    question: 'Почему 0% налогов на международный доход?',
    answer: 'На Филиппинах действует территориальный принцип налогообложения для иностранных резидентов: доходы, полученные от источников за пределами Филиппин (удаленная работа на иностранную компанию, крипто-трейдинг, дивиденды, SaaS бизнес), не облагаются подоходным налогом на Филиппинах. Вы сохраняете 100% своего дохода легально.'
  },
  {
    id: 'faq-3',
    category: 'tech',
    question: 'Что если сломается Starlink или пойдет тропический ливень?',
    answer: 'В Бункере развернута отказоустойчивая инфраструктура уровня Tier 3: 2 независимые антенны Starlink Gen 3 работают в режиме агрегации и горячего резервирования. При облачности или шторме сигнал автоматически балансируется. Дополнительно установлен скоростной 5G промышленный шлюз с внешней направленной антенной. Обрыв связи физически исключен.'
  },
  {
    id: 'faq-4',
    category: 'tech',
    question: 'Как обеспечивается автономное электричество 24/7?',
    answer: 'Крыши резорта покрыты солнечной электростанцией мощностью 25 кВт, подключенной к блоку литий-железо-фосфатных аккумуляторов (LiFePO4) емкостью 40 кВт·ч. Этого запаса хватает на 72 часа автономной работы всего резорта со всеми кондиционерами даже в сплошной дождь. На случай затяжных дождей установлен бесшумный японский инверторный дизель-генератор с автозапуском.'
  },
  {
    id: 'faq-5',
    category: 'living',
    question: 'Где находится резорт и насколько там безопасно?',
    answer: 'Резорт расположен на острове Самал в заливе Давао на высоте 265 метров над уровнем моря. Регион Давао — самый безопасный на Филиппинах (город бывшего президента Родриго Дутерте с жесточайшим контролем правопорядка и нулевой преступностью). До международного аэропорта Давао (DVO) — всего 25 минут на частном катере и авто.'
  },
  {
    id: 'faq-6',
    category: 'living',
    question: 'Что входит в стоимость проживания «Всё включено»?',
    answer: 'В стоимость входит: проживание в выбранном сьюте, выделенное рабочее место с эргономичным креслом и монитором, безлимитный Starlink интернет, электричество и кондиционирование без лимитов, ежедневная уборка и смена белья, прачечная, безлимитный спешелти кофе и родниковая вода, доступ в инфинити-бассейн, финскую сауну, холодную купель и тренажерный зал, а также трансфер из аэропорта.'
  },
  {
    id: 'faq-7',
    category: 'booking',
    question: 'Как забронировать один из 2 оставшихся свободных номеров?',
    answer: 'Так как в Бункере всего 6 мест, мы проводим короткое 15-минутное онлайн-знакомство в Telegram/Google Meet, чтобы убедиться в совпадении ценностей резидентов. После подтверждения вы вносите депозит и фиксируете за собой номер на выбранные даты.'
  }
];
