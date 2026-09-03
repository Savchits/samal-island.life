import { useState } from 'react';
import { DollarSign, Check, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CostComparisonProps {
  onOpenBooking: () => void;
}

export function CostComparisonCalculator({ onOpenBooking }: CostComparisonProps) {
  const cities = [
    {
      name: 'Дубай (ОАЭ)',
      rent: 3200,
      visa: 400,
      internet: 180,
      food: 1200,
      gymSauna: 250,
      total: 5230,
      highlights: 'Конские цены на жилье, духота 45°C летом, жесткая банковская бюрократия.'
    },
    {
      name: 'Бали (Чангу / Убуд)',
      rent: 2400,
      visa: 350,
      internet: 120,
      food: 900,
      gymSauna: 200,
      total: 3970,
      highlights: 'Частые блэкауты, пробки на байках, петухи в 5 утра, налог E-VOA и риск депортации.'
    },
    {
      name: 'Пхукет (Таиланд)',
      rent: 2100,
      visa: 300,
      internet: 80,
      food: 800,
      gymSauna: 180,
      total: 3460,
      highlights: 'Сложные продления виз каждые 60-90 дней, туристический шум, языковой барьер.'
    },
    {
      name: 'Samal IT-Bunker',
      rent: 1850, // Average all-inclusive
      visa: 0, // Included via EO 86
      internet: 0, // Dual Starlink included
      food: 400, // Organic chef meals & coffee included
      gymSauna: 0, // Pool, Sauna, Cold plunge included
      total: 1850,
      isWinner: true,
      highlights: 'Всё включено: Starlink, сауна, бассейн, 0% налог, тишина джунглей, 3 года легальности.'
    }
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#05080e] overflow-hidden border-t border-b border-cyan-500/10">
      
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 backdrop-blur-md mb-4">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">Прозрачная экономика</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3">
            Сравнение Реальных Затрат в Месяц
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            В обычных странах к аренде виллы добавляются скрытые траты: виза-раны, генераторы, абонементы в коворкинги и налоги. В Бункере цена фиксирована и честна.
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cities.map((city, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                city.isWinner
                  ? 'bg-gradient-to-b from-cyan-950/70 via-slate-900/90 to-slate-950 border-cyan-400/60 shadow-2xl shadow-cyan-950/60 scale-105 relative z-10'
                  : 'bg-slate-900/40 border-white/10'
              }`}
            >
              <div>
                {city.isWinner && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Лучший выбор IT
                  </div>
                )}

                <h3 className="font-display text-base font-bold text-white mb-2">{city.name}</h3>
                
                {/* Total Monthly Pill */}
                <div className="my-4 pb-4 border-b border-white/10">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Итого в месяц:</div>
                  <div className={`font-display text-2xl font-black ${city.isWinner ? 'text-cyan-300' : 'text-slate-200'}`}>
                    ${city.total.toLocaleString()}
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Аренда жилья:</span>
                    <span className="font-mono font-medium">${city.rent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Визы / Виза-раны:</span>
                    <span className="font-mono font-medium">{city.visa === 0 ? <span className="text-emerald-400 font-bold">Включено ($0)</span> : `$${city.visa}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Starlink 24/7:</span>
                    <span className="font-mono font-medium">{city.internet === 0 ? <span className="text-emerald-400 font-bold">Включено ($0)</span> : `$${city.internet}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Бассейн, Сауна, Зал:</span>
                    <span className="font-mono font-medium">{city.gymSauna === 0 ? <span className="text-emerald-400 font-bold">Включено ($0)</span> : `$${city.gymSauna}`}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic pt-3 border-t border-white/5">
                  {city.highlights}
                </p>
              </div>

              {city.isWinner && (
                <div className="mt-6 pt-4">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    Занять номер со скидкой
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
