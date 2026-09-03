import { Star, MessageSquareQuote, Shield, Users, Terminal } from 'lucide-react';
import { TESTIMONIALS } from '../data/resortData';

export function CommunityAndTestimonials() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#070b12] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 backdrop-blur-md mb-4">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">Закрытый IT-Клуб</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3">
            Сообщество, Где Все На Одной Волне
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Здесь живут фаундеры, ведущие инженеры и крипто-разработчики. Без случайных туристов, инфобизнесменов и токсичности.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl shadow-cyan-950/20"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {t.country}
                  </span>
                </div>

                {/* Highlight */}
                <h4 className="font-display text-xs sm:text-sm font-bold text-white mb-2.5">
                  «{t.highlight}»
                </h4>

                {/* Text Body */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {t.text}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-cyan-500/40"
                />
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-cyan-300 font-mono">{t.role} • {t.company}</div>
                  <div className="text-[11px] text-slate-400">{t.period}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
