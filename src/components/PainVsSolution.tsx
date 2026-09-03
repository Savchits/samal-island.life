import { useState } from 'react';
import { CheckCircle2, AlertTriangle, Check, Flame, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PAIN_POINTS } from '../data/resortData';

interface PainVsSolutionProps {
  onOpenBooking: (roomTitle?: string) => void;
}

export function PainVsSolution({ onOpenBooking }: PainVsSolutionProps) {
  // 'solutions' (default as seen in screenshot) or 'problems'
  const [viewMode, setViewMode] = useState<'solutions' | 'problems'>('solutions');

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#05080e] overflow-hidden border-t border-b border-cyan-500/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Warning Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-300 backdrop-blur-md mb-5">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="font-semibold">Реальность жизни кочевника</span>
        </div>

        {/* Big Heading */}
        <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase max-w-4xl mx-auto leading-snug mb-3">
          Давай начистоту. Ты устал.<br />
          Устал от унизительных виза-ранов...
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Бесит азиатская духота, орущие в 5 утра петухи, нестабильный интернет посреди митингов и ощущение птичьих прав в чужих странах.
        </p>

        {/* Toggle Switch */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 backdrop-blur-md mb-12 shadow-xl">
          <button
            onClick={() => setViewMode('problems')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewMode === 'problems'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Знакомые боли (5 проблем)
          </button>
          <button
            onClick={() => setViewMode('solutions')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'solutions'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-950/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Решение в Бункере на Самале
          </button>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto mb-16 text-left">
          {PAIN_POINTS.map((item) => {
            const isSolution = viewMode === 'solutions';
            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSolution
                    ? 'bg-slate-900/50 hover:bg-slate-900/80 border-cyan-500/25 hover:border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                    : 'bg-rose-950/20 hover:bg-rose-950/30 border-rose-500/20 hover:border-rose-500/40'
                }`}
              >
                <div>
                  {/* Top Circle Icon */}
                  <div className="mb-4">
                    {isSolution ? (
                      <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-sm">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-sm">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Category Eyebrow */}
                  <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 mb-1.5">
                    {item.category}
                  </div>

                  {/* Card Title */}
                  <h4 className="font-display text-sm font-bold text-white mb-2.5">
                    {isSolution ? item.solutionTitle : item.problemTitle}
                  </h4>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {isSolution ? item.solutionDesc : item.problemDesc}
                  </p>
                </div>

                {/* Bottom Status / Tag */}
                <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>100% Решено</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Media Preview Cards (exactly matching Image 2 bottom section) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto text-left">
          
          {/* Media Card 1 */}
          <div className="group relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-900/60 hover:border-cyan-500/50 transition-all duration-300 shadow-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"
                alt="Рабочее место с видом на залив"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <span className="inline-block px-3 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300 mb-2">
                  Рабочее место с видом на залив и вулкан Апо
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  Окна 3х3м, тишина джунглей, эргономичное кресло и спутниковый интернет.
                </p>
              </div>
            </div>
          </div>

          {/* Media Card 2 */}
          <div className="group relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-900/60 hover:border-cyan-500/50 transition-all duration-300 shadow-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop"
                alt="Номер на открытом воздухе с гамаком"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <span className="inline-block px-3 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300 mb-2">
                  Номер на открытом воздухе с гамаком и проектором
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  Татами, горный бриз, вечернее кино и чайные церемонии.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
