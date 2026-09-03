import { Shield, Send, MessageCircle, Navigation, Radio, Heart } from 'lucide-react';
import { RESORT_STATS } from '../data/resortData';

interface FooterProps {
  onOpenBooking: () => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="relative bg-[#04060a] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden text-slate-400 text-xs">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div className="font-display text-base font-black text-white">
                SAMAL <span className="text-cyan-400">IT-BUNKER</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              Автономный клубный IT-резорт на острове Самал (Филиппины). Твоя 3-летняя броня от виза-ранов, 0% налогов, 24/7 Starlink и абсолютная продуктивность.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Все системы бункера активны • Доступно {RESORT_STATS.availableRooms} из {RESORT_STATS.totalRooms} номеров</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Навигация
            </div>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-cyan-300 transition-colors">О резорте</a></li>
              <li><a href="#tax" className="hover:text-cyan-300 transition-colors">0% Налогов & Виза EO 86</a></li>
              <li><a href="#autonomy" className="hover:text-cyan-300 transition-colors">Автономия & Starlink</a></li>
              <li><a href="#location" className="hover:text-cyan-300 transition-colors">Локация о. Самал</a></li>
              <li><a href="#amenities" className="hover:text-cyan-300 transition-colors">Удобства & Сауна</a></li>
              <li><a href="#rooms" className="hover:text-cyan-300 transition-colors">Номера и цены</a></li>
              <li><a href="#faq" className="hover:text-cyan-300 transition-colors">Частые вопросы (FAQ)</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Connect & Location */}
          <div className="space-y-3">
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Связь с бункером
            </div>
            <div className="space-y-2">
              <a
                href={RESORT_STATS.telegramChannel}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <Send className="w-4 h-4" />
                <span>Telegram: @samal_it_bunker</span>
              </a>
              <a
                href={RESORT_STATS.whatsappNumber}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +63 917 123 4567</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] pt-2">
                <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>7.0864° N, 125.7175° E (Samal Island, 265m alt)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Samal IT-Bunker Resort. Все права защищены.</p>
          <p>
            Официальный статус цифрового кочевника в соответствии с EO 86 и RA 11981 (Republic of the Philippines).
          </p>
        </div>

      </div>
    </footer>
  );
}
