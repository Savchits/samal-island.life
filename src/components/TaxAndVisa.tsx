import { useState } from 'react';
import { Shield, DollarSign, Calculator, FileCheck, CheckCircle2, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';
import { RESORT_STATS } from '../data/resortData';

interface TaxAndVisaProps {
  onOpenBooking: () => void;
}

export function TaxAndVisa({ onOpenBooking }: TaxAndVisaProps) {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(8000);
  const [homeCountryTaxRate, setHomeCountryTaxRate] = useState<number>(35); // 35% typical EU/US/UK

  // Calculations
  const yearlyIncome = monthlyIncome * 12;
  const currentYearlyTax = (yearlyIncome * (homeCountryTaxRate / 100));
  const samalTax = 0;
  const yearlySavings = currentYearlyTax - samalTax;
  const threeYearsSavings = yearlySavings * 3;

  return (
    <section id="tax" className="relative py-20 lg:py-28 bg-[#070b12] overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm text-emerald-300 backdrop-blur-md mb-4">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Легальный статус и налоги</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3">
            0% Налогов & 36 Месяцев<br />
            <span className="text-gradient-cyan">Без Единого Выезда</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Официальное президентское постановление EO 86 и территориальный налоговый кодекс Филиппин: живи легально, работай глобально и сохраняй 100% своей прибыли.
          </p>
        </div>

        {/* 2 Column Layout: Legal Breakdown & Interactive Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Legal Features (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Box 1: 3-Year Nomad Visa */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md hover:border-cyan-500/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                    36 Месяцев Легального Проживания (Указ EO 86)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Забудь про панические сборы чемоданов каждые 60 дней. Филиппинская визовая программа позволяет продлевать статус без выезда из страны до 3 лет подряд прямо на месте через консьерж-службу Бункера.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/20">
                      ✓ Без виза-ранов
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/20">
                      ✓ Официальный ID резидента
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/20">
                      ✓ Оформление за 10 дней
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: 0% Foreign Income Tax */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-500/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                    Территориальный Налоговый Режим 0%
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    На Филиппинах иностранные резиденты платят налоги исключительно с доходов, полученных внутри страны. Если ваши клиенты, контракты, SaaS-проекты или криптовалюта находятся за рубежом — ставка налога составляет 0.00%.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-300 border border-emerald-500/20">
                      ✓ Криптовалюта 0%
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-300 border border-emerald-500/20">
                      ✓ Удаленный контракт 0%
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-300 border border-emerald-500/20">
                      ✓ Дивиденды 0%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Concierge VIP Pass */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                    Банковские Счета & Сим-карты
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Помощь в открытии местных счетов в крупнейших банках BDO и BPI, подключении безлимитных 5G e-SIM и получении карты резидента (ACR I-Card).
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Tax Savings Calculator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 sticky top-28">
              
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <span className="font-display font-bold text-white text-base">Калькулятор Экономии</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  0% Tax Regime
                </span>
              </div>

              {/* Slider 1: Monthly Income */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-400">Твой доход в месяц:</span>
                  <span className="font-mono text-cyan-300 text-base font-bold">
                    ${monthlyIncome.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="40000"
                  step="500"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>$2,000/мес</span>
                  <span>$20,000/мес</span>
                  <span>$40,000/мес</span>
                </div>
              </div>

              {/* Slider 2: Current Tax Rate */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-400">Текущий налог (ЕС / США / СНГ):</span>
                  <span className="font-mono text-amber-300 text-base font-bold">
                    {homeCountryTaxRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="55"
                  step="1"
                  value={homeCountryTaxRate}
                  onChange={(e) => setHomeCountryTaxRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>10% (Мин)</span>
                  <span>35% (Средний)</span>
                  <span>55% (Макс)</span>
                </div>
              </div>

              {/* Results Breakdown */}
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 mb-6 space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-slate-400">Налог в год дома:</span>
                  <span className="text-rose-400 font-mono font-bold line-through">
                    ${Math.round(currentYearlyTax).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-slate-400">Налог в Бункере на Самале:</span>
                  <span className="text-emerald-400 font-mono font-bold text-base">
                    $0 (0%)
                  </span>
                </div>
                <div className="pt-3 border-t border-cyan-500/20 flex justify-between items-baseline">
                  <span className="font-bold text-white text-xs sm:text-sm">Твоя чистая экономия за год:</span>
                  <span className="font-display text-xl sm:text-2xl font-black text-gradient-cyan">
                    +${Math.round(yearlySavings).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-slate-300 pt-1">
                  <span>Экономия за 3 года (визовый срок):</span>
                  <span className="font-mono font-bold text-emerald-300">
                    +${Math.round(threeYearsSavings).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
              >
                Зафиксировать 0% ставку на 3 года
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
