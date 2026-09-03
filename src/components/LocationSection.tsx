import { MapPin, Navigation, ShieldCheck, Plane, Anchor, Mountain, Sun, Clock } from 'lucide-react';
import { RESORT_STATS } from '../data/resortData';

export function LocationSection() {
  const travelSteps = [
    {
      icon: <Plane className="w-5 h-5 text-cyan-400" />,
      title: 'Аэропорт Давао (DVO)',
      desc: 'Прямые рейсы из Сингапура, Манилы, Себу, Дохи. Встреча резидентов на частном комфортном минивэне.',
      time: '0 мин'
    },
    {
      icon: <Anchor className="w-5 h-5 text-cyan-400" />,
      title: 'Приватный катер на о. Самал',
      desc: 'Быстрая переправа 10 минут по спокойному заливу без волн и морской болезни.',
      time: '15 мин'
    },
    {
      icon: <Mountain className="w-5 h-5 text-cyan-400" />,
      title: 'Подъем на высоту 265м',
      desc: 'Комфортная асфальтированная горная дорога прямо к воротам закрытого бункера.',
      time: '25 мин от трапа'
    }
  ];

  return (
    <section id="location" className="relative py-20 lg:py-28 bg-[#070b12] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 backdrop-blur-md mb-4">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">Геолокация & Безопасность</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3">
            Остров Самал • Залив Давао
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Идеальная уединенность в тропических джунглях на высоте 265 метров, всего в 25 минутах от международного аэропорта и мегаполиса с топовыми госпиталями.
          </p>
        </div>

        {/* 2 Column: Map & Island Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Visual Location Showcase (7 cols) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-900 shadow-2xl shadow-cyan-950/40">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
                alt="Остров Самал панорама"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Coordinates Pill */}
              <div className="absolute top-4 left-4 bg-slate-950/90 border border-cyan-500/40 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>7.0864° N, 125.7175° E • 265m Alt</span>
              </div>

              {/* Bottom Island Highlights */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold">
                    ✓ Зона нулевой преступности
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
                    ✓ Вне зоны тайфунов
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Самый безопасный регион Юго-Восточной Азии
                </h3>
              </div>
            </div>
          </div>

          {/* Travel Steps & Facts (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display text-base sm:text-lg font-bold text-white mb-4">
              Как добраться до Бункера:
            </h3>

            {travelSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-colors flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-display text-sm font-bold text-white">{step.title}</h4>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">{step.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-200">
                Трансфер из аэропорта на персональном автомобиле и катере включен в бронь.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
