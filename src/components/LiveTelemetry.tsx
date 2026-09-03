import { useState, useEffect } from 'react';
import { Radio, Activity, Sun, Wind, Volume2, Droplets, RefreshCw, Cpu, Check, ShieldCheck, Zap } from 'lucide-react';
import { TELEMETRY_METRICS } from '../data/resortData';

export function LiveTelemetry() {
  const [metrics, setMetrics] = useState(TELEMETRY_METRICS);
  const [isPinging, setIsPinging] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Только что');

  const triggerLivePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      // Simulate minor live jitter (e.g. 21-26 ms ping, 360-395 mbps)
      const randomPing = Math.floor(Math.random() * 5) + 21;
      const randomSpeed = Math.floor(Math.random() * 35) + 365;
      const randomSolar = (Math.random() * 0.4 + 24.2).toFixed(1);

      setMetrics((prev) =>
        prev.map((m) => {
          if (m.id === 'starlink-latency') return { ...m, value: `${randomPing} мс` };
          if (m.id === 'bandwidth') return { ...m, value: `${randomSpeed} Мбит/с` };
          return m;
        })
      );
      setIsPinging(false);
      setLastUpdated(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 600);
  };

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio':
        return <Radio className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Wind':
        return <Wind className="w-5 h-5" />;
      case 'Volume2':
        return <Volume2 className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <section id="autonomy" className="relative py-20 lg:py-28 bg-[#05080e] overflow-hidden border-t border-b border-cyan-500/10">
      
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 backdrop-blur-md mb-4">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-semibold">Инженерия & Автономия</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
              Телеметрия Бункера 24/7
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              Прямой статус систем жизнеобеспечения, спутникового интернета и солнечной электростанции.
            </p>
          </div>

          {/* Refresh / Ping Test Button */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Обновлено: {lastUpdated}</span>
            <button
              onClick={triggerLivePing}
              disabled={isPinging}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isPinging ? 'Тестирование...' : 'Проверить пинг'}</span>
            </button>
          </div>
        </div>

        {/* Telemetry Cards Grid (6 Live Sensors) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-md hover:border-cyan-500/40 transition-all group shadow-lg shadow-cyan-950/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  {getMetricIcon(metric.icon)}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 mb-1">{metric.label}</div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-xs font-mono text-cyan-400/80 font-medium">
                    {metric.unit}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-normal pt-2 border-t border-white/5">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Autonomy Pillars Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
            <h4 className="font-display text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">1</span>
              Спутниковый Стек Starlink
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              2 антенны Starlink на разных мачтах, промышленный роутер Mikrotik с мгновенным переключением каналов за 0.05 сек, выделенный резерв 5G и генератор бесперебойного питания UPS.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
            <h4 className="font-display text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">2</span>
              25 кВт Солнце + 40 кВт·ч Аккумуляторы
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Японские и немецкие инверторы, LiFePO4 батареи с ресурсом 6000 циклов (15 лет), 72 часа автономности в режиме 100% нагрузки со всеми кондиционерами.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
            <h4 className="font-display text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">3</span>
              Микроклимат Высоты 265м
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Благодаря высоте 265м над уровнем моря температура на 4-5 градусов ниже, чем на побережье, дует свежий горный бриз, влажность комфортная, и полностью отсутствуют комары.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
