import { Waves, Flame, Coffee, Utensils, Dumbbell, ShieldCheck, Sparkles, FileCheck2, HeartPulse, Film, Trees, Compass } from 'lucide-react';
import { AMENITIES_LIST } from '../data/resortData';

export function Amenities() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Coffee':
        return <Coffee className="w-6 h-6" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="amenities" className="relative py-20 lg:py-28 bg-[#05080e] overflow-hidden border-t border-b border-cyan-500/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 backdrop-blur-md mb-4">
            <HeartPulse className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">Кибер-Гедонизм & Восстановление</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3">
            Инфраструктура Для Тела & Мозга
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Баланс между непрерывным потоком глубокой работы и быстрым восстановлением: сауна, инфинити-бассейн с закатным видом и кофе спешелти обжарки.
          </p>
        </div>

        {/* Visual Bento Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Bento Item 1: Infinity Pool */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden border border-cyan-500/25 bg-slate-900/60 group shadow-xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop"
                alt="Инфинити-бассейн с панорамой"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300 mb-2">
                  Панорамный инфинити-бассейн
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                  Закаты над заливом Давао и вулканом Апо
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Вода из подземного артезианского источника без запаха хлора. Идеальное место для отдыха после завершения спринта или код-ревью.
                </p>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Biohacking & Sauna */}
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/25 bg-slate-900/60 group shadow-xl">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full w-full overflow-hidden bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
                alt="Сауна и ледяная купель"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-md bg-amber-950/90 border border-amber-500/40 text-xs font-mono font-bold text-amber-300 mb-2">
                  Биохакинг сетап
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                  Кедровая сауна & Cold Plunge 6°C
                </h3>
                <p className="text-xs text-slate-300">
                  Контрастная термотерапия для сброса дофаминовой перегрузки и повышения стрессоустойчивости.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Amenities 8-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES_LIST.map((amenity, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                {getIcon(amenity.icon)}
              </div>
              <h4 className="font-display text-sm sm:text-base font-bold text-white mb-1.5">
                {amenity.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {amenity.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
