import { useState } from 'react';
import { Bed, Monitor, Wifi, VolumeX, Eye, Check, ShieldAlert, Sparkles, ArrowRight, X } from 'lucide-react';
import { ROOMS_DATA, RESORT_STATS } from '../data/resortData';
import { Room } from '../types';

interface RoomsGalleryProps {
  onOpenBooking: (roomTitle?: string) => void;
}

export function RoomsGallery({ onOpenBooking }: RoomsGalleryProps) {
  const [filter, setFilter] = useState<'all' | 'available'>('all');
  const [selectedRoomModal, setSelectedRoomModal] = useState<Room | null>(null);
  const [modalActiveImageIdx, setModalActiveImageIdx] = useState(0);

  const filteredRooms = ROOMS_DATA.filter((r) => {
    if (filter === 'available') return r.status === 'available';
    return true;
  });

  const openRoomDetail = (room: Room) => {
    setSelectedRoomModal(room);
    setModalActiveImageIdx(0);
  };

  return (
    <section id="rooms" className="relative py-20 lg:py-28 bg-[#070b12] overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-600/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 backdrop-blur-md mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">Эксклюзивный фонд</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
              Всего 6 Номеров.<br />
              <span className="text-gradient-cyan">Свободно: {RESORT_STATS.availableRooms} из {RESORT_STATS.totalRooms}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
              Каждый номер спроектирован как изолированная кибер-крепость для продуктивной работы: панорамное остекление, моторизованный стол, акустический комфорт и Dual Starlink.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex p-1.5 rounded-xl bg-slate-900 border border-cyan-500/20 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Все номера ({ROOMS_DATA.length})
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === 'available'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Только свободные ({RESORT_STATS.availableRooms})
            </button>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredRooms.map((room) => {
            const isAvailable = room.status === 'available';
            const heroImage = room.images[0]?.url || '';

            return (
              <div
                key={room.id}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isAvailable
                    ? 'bg-slate-900/70 hover:bg-slate-900/90 border-cyan-500/30 hover:border-cyan-400 shadow-xl shadow-cyan-950/30'
                    : 'bg-slate-950/60 border-white/10 opacity-75 hover:opacity-90'
                }`}
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={heroImage}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-mono font-medium">
                      {room.area} м²
                    </span>
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-bold backdrop-blur-md border ${
                        isAvailable
                          ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 shadow-sm'
                          : 'bg-slate-950/80 border-slate-700 text-slate-400'
                      }`}
                    >
                      {isAvailable ? '✓ Свободен' : '● Занят'}
                    </span>
                  </div>

                  {/* Room Category Eyebrow */}
                  <div className="absolute bottom-3 left-3 text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-slate-950/80 px-2.5 py-0.5 rounded border border-cyan-500/20">
                    {room.category}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {room.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 line-clamp-2">
                      {room.description}
                    </p>

                    {/* Quick Specs List */}
                    <div className="space-y-2 mb-6 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{room.specs.desk}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{room.specs.starlink}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <VolumeX className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{room.specs.noise}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">Всё включено</div>
                      <div className="text-lg sm:text-xl font-display font-black text-white">
                        ${room.priceMonthly.toLocaleString()}
                        <span className="text-xs font-normal text-slate-400 font-sans"> / мес</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openRoomDetail(room)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 transition-colors"
                        aria-label="View Room Gallery"
                        title="Подробнее и фото"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {isAvailable ? (
                        <button
                          onClick={() => onOpenBooking(room.name)}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                        >
                          <span>Бронь</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenBooking(`Лист ожидания: ${room.name}`)}
                          className="px-3 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/5 text-xs font-semibold"
                        >
                          Лист ожидания
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Room Full Details & Gallery Modal */}
      {selectedRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0b121e] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedRoomModal(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  {selectedRoomModal.category} • {selectedRoomModal.area} м²
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-md font-bold ${
                    selectedRoomModal.status === 'available'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {selectedRoomModal.status === 'available' ? 'Свободен для заселения' : 'Временно занят'}
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                {selectedRoomModal.name}
              </h3>
            </div>

            {/* Image Preview & Thumbnails */}
            <div className="mb-6">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 mb-3 border border-white/10">
                <img
                  src={selectedRoomModal.images[modalActiveImageIdx]?.url || selectedRoomModal.images[0]?.url}
                  alt={selectedRoomModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md text-xs text-slate-200 border border-white/15 font-mono">
                  {selectedRoomModal.images[modalActiveImageIdx]?.caption}
                </div>
              </div>

              {/* Thumbnails */}
              {selectedRoomModal.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {selectedRoomModal.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setModalActiveImageIdx(idx)}
                      className={`relative aspect-[16/10] w-24 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === modalActiveImageIdx ? 'border-cyan-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.tag} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2 text-xs">
                <div className="font-bold text-cyan-300 font-mono uppercase">Рабочий Сетап</div>
                <div><strong className="text-white">Стол & Кресло:</strong> {selectedRoomModal.specs.desk}</div>
                <div><strong className="text-white">Связь:</strong> {selectedRoomModal.specs.starlink}</div>
                <div><strong className="text-white">Окна:</strong> {selectedRoomModal.specs.windows}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2 text-xs">
                <div className="font-bold text-emerald-300 font-mono uppercase">Комфорт & Сон</div>
                <div><strong className="text-white">Кровать:</strong> {selectedRoomModal.specs.bed}</div>
                <div><strong className="text-white">Вид из окон:</strong> {selectedRoomModal.specs.view}</div>
                <div><strong className="text-white">Акустика:</strong> {selectedRoomModal.specs.noise}</div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
                Что включено в номер:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedRoomModal.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="text-xs text-slate-400">Стоимость «всё включено»:</span>
                <div className="text-2xl font-display font-black text-white">
                  ${selectedRoomModal.priceMonthly.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ месяц</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedRoomModal(null);
                  onOpenBooking(selectedRoomModal.name);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
              >
                Оставить заявку на этот номер
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
