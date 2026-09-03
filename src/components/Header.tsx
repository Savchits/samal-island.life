import { useState, useEffect } from 'react';
import { Send, MessageCircle, Menu, X, Shield, Radio, Globe2 } from 'lucide-react';
import { RESORT_STATS } from '../data/resortData';

interface HeaderProps {
  onOpenBooking: (roomTitle?: string) => void;
  onOpenI18nPipeline?: () => void;
}

export function Header({ onOpenBooking, onOpenI18nPipeline }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'О резорте', href: '#about' },
    { label: '0% Налогов', href: '#tax' },
    { label: 'Автономия', href: '#autonomy' },
    { label: 'Локация', href: '#location' },
    { label: 'Удобства', href: '#amenities' },
    { label: 'Номера', href: '#rooms' },
    { label: 'Вопросы', href: '#faq' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070b12]/90 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-2xl shadow-cyan-950/30'
          : 'bg-[#070b12]/40 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-lg shadow-cyan-500/10">
            <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-display text-sm font-extrabold tracking-wider text-white">
              <span>SAMAL</span>
              <span className="text-cyan-400">IT-BUNKER</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-medium">Свободно: {RESORT_STATS.availableRooms} из {RESORT_STATS.totalRooms} мест</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-300 transition-colors hover:scale-105 active:scale-95 duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Direct Admin Portal Link */}
          <a
            href="/admin"
            className="px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
            title="Панель управления статьями /admin"
          >
            <span>🔐</span>
            <span>Админка</span>
          </a>

          {/* i18n & GEO Pipeline Trigger */}
          {onOpenI18nPipeline && (
            <button
              onClick={onOpenI18nPipeline}
              className="px-2.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="Astro i18n, Hreflang & GEO Pipeline Engine"
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Pipeline</span>
            </button>
          )}

          {/* WhatsApp icon button */}
          <a
            href={RESORT_STATS.whatsappNumber}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-400 flex items-center justify-center text-emerald-400 transition-all hover:scale-105 shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Telegram Primary Button */}
          <button
            onClick={() => onOpenBooking()}
            id="header-telegram-cta"
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="tracking-wide uppercase">Написать в Telegram</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b12]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              Статус бункера: Онлайн (24/7)
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Свободно: {RESORT_STATS.availableRooms} места
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900/50 hover:bg-cyan-950/40 hover:text-cyan-300 text-slate-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>🔐</span>
              <span>ПАНЕЛЬ УПРАВЛЕНИЯ (/admin)</span>
            </a>

            {onOpenI18nPipeline && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenI18nPipeline();
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2"
              >
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span>i18n & GEO Pipeline Dashboard</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>НАПИСАТЬ В TELEGRAM</span>
            </button>
            <a
              href={RESORT_STATS.whatsappNumber}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>СВЯЗАТЬСЯ В WHATSAPP</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
