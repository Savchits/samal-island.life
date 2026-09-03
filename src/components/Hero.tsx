import { useState, useEffect } from 'react';
import { Send, MessageCircle, ChevronLeft, ChevronRight, Shield, Zap, Gem, Wifi, Sun, MapPin, Eye, ArrowRight } from 'lucide-react';
import { HERO_SLIDES, RESORT_STATS } from '../data/resortData';

interface HeroProps {
  onOpenBooking: (roomTitle?: string) => void;
  onScrollToRooms: () => void;
}

export function Hero({ onOpenBooking, onScrollToRooms }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section id="hero-section" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-cyber-radial">
      {/* Ambient background grid lines */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40"></div>
      
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Location Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 backdrop-blur-md mb-6 shadow-lg shadow-cyan-950/40">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-semibold tracking-wide">
            Остров Самал • Филиппины • {RESORT_STATS.elevation}
          </span>
        </div>

        {/* Main Big Headline */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-[1.12] mb-4">
          Автономный{' '}
          <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
            IT-Бункер
          </span>
          <br />
          на Филиппинах
        </h1>

        {/* Subtitle with accent */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal max-w-2xl mx-auto mb-8">
          Твоя 3-летняя броня, свобода и{' '}
          <span className="text-cyan-400 font-semibold underline decoration-cyan-500/60 decoration-2 underline-offset-4">
            кибер-гедонизм
          </span>
        </p>

        {/* Interactive Showcase / Slider Card */}
        <div className="relative mx-auto max-w-5xl rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-slate-900/80 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 mb-10 overflow-hidden group">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
            
            {/* Background Image with smooth transition */}
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
            />

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-slate-950/40"></div>

            {/* Top Badges Overlay */}
            <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 flex flex-wrap items-center justify-between gap-2 z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-md">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  {currentSlide.roomBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-md">
                  <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                  {currentSlide.starlinkBadge}
                </span>
              </div>

              {/* Slide Counter */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/20 text-slate-300 text-xs font-mono font-medium">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Фото {currentSlideIndex + 1} из {HERO_SLIDES.length}
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-900/90 border border-white/20 hover:border-cyan-400 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-900/90 border border-white/20 hover:border-cyan-400 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bottom Caption Info */}
            <div className="absolute bottom-3 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 text-left z-10">
              <div className="text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest text-cyan-300 mb-1">
                {currentSlide.tagline}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-white max-w-2xl leading-snug">
                  {currentSlide.title}
                </h3>
                
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 self-start sm:self-end">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoPlay(false);
                        setCurrentSlideIndex(idx);
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 transition-all rounded-full ${
                        idx === currentSlideIndex
                          ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400'
                          : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Actions (Primary & Secondary Buttons) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          {/* Telegram Primary Button */}
          <button
            onClick={() => onOpenBooking()}
            id="hero-telegram-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <Send className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            <span>Написать в Telegram</span>
          </button>

          {/* WhatsApp Button */}
          <a
            href={RESORT_STATS.whatsappNumber}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>WhatsApp</span>
          </a>

          {/* Rooms Details Button */}
          <button
            onClick={onScrollToRooms}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-0.5 transition-all"
          >
            <span>Номера и детали</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* 3 Key Feature Chips below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md flex items-center gap-4 text-left hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">100% Приватность</div>
              <div className="text-sm sm:text-base font-bold text-white">Закрытый клубный бункер</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md flex items-center gap-4 text-left hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">3-Кратная Автономия</div>
              <div className="text-sm sm:text-base font-bold text-white">Солнце + вода + Starlink</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md flex items-center gap-4 text-left hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Gem className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Эксклюзивно</div>
              <div className="text-sm sm:text-base font-bold text-white">Всего {RESORT_STATS.totalRooms} номеров (осталось {RESORT_STATS.availableRooms})</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
