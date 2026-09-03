import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle2, Shield, Calendar, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ROOMS_DATA, RESORT_STATS } from '../data/resortData';
import { BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRoomName?: string;
}

export function BookingModal({ isOpen, onClose, defaultRoomName }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    telegramOrWhatsapp: '',
    email: '',
    occupation: 'Senior Software Engineer / Tech Lead',
    preferredRoomId: defaultRoomName || ROOMS_DATA[0].name,
    arrivalDate: '2026-09-01',
    stayDuration: '3 месяца (Оптимально)',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire celebratory cyber confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#3b82f6', '#10b981', '#ffffff']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090e17] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/80 overflow-hidden">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300 mb-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                Свободно {RESORT_STATS.availableRooms} из {RESORT_STATS.totalRooms} мест
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                Заявка на Резидентство в Бункере
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Мы отбираем адекватных единомышленников из IT. Заполни форму для короткого 15-минутного созвона-знакомства.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Твое имя / Никнейм *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Алексей"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Telegram / WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Telegram (@username) или Телефон *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@alex_dev или +7..."
                    value={formData.telegramOrWhatsapp}
                    onChange={(e) => setFormData({ ...formData, telegramOrWhatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email (для подтверждения) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@startup.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Role / Tech */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Чем ты занимаешься в IT?
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                >
                  <option value="Senior Software Engineer / Tech Lead">Senior Software Engineer / Tech Lead</option>
                  <option value="Startup Founder / Co-Founder">Startup Founder / Co-Founder</option>
                  <option value="Solidity / Web3 / Rust Developer">Solidity / Web3 / Rust Developer</option>
                  <option value="ML / AI Engineer / Data Scientist">ML / AI Engineer / Data Scientist</option>
                  <option value="Product Manager / Designer">Product Manager / Designer</option>
                  <option value="Crypto Trader / Fund Manager">Crypto Trader / Fund Manager</option>
                </select>
              </div>

              {/* Room Preference & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Интересующий номер
                  </label>
                  <select
                    value={formData.preferredRoomId}
                    onChange={(e) => setFormData({ ...formData, preferredRoomId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                  >
                    {ROOMS_DATA.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name} (${r.priceMonthly}/мес)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Срок проживания
                  </label>
                  <select
                    value={formData.stayDuration}
                    onChange={(e) => setFormData({ ...formData, stayDuration: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                  >
                    <option value="1 месяц">1 месяц (тест-драйв)</option>
                    <option value="3 месяца (Оптимально)">3 месяца (скидка 5%)</option>
                    <option value="6 месяцев">6 месяцев (скидка 10%)</option>
                    <option value="1 год (Флагман)">1 год (скидка 15% + виза под ключ)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Пожелания / Ориентировочная дата заезда
                </label>
                <input
                  type="text"
                  placeholder="Планирую прилет в конце месяца, нужен второй монитор..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900/80 border border-white/15 focus:border-cyan-400 text-white text-xs focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Отправить заявку консьержу</span>
              </button>

              <div className="text-center text-[11px] text-slate-400">
                🔒 Конфиденциальность гарантирована. Без спама.
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center mb-5 shadow-lg shadow-emerald-950">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-display text-xl font-bold text-white mb-2">
              Заявка успешно принята!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
              Спасибо, <strong className="text-white">{formData.name}</strong>! Консьерж свяжется с вами в Telegram (<strong className="text-cyan-300">{formData.telegramOrWhatsapp}</strong>) в течение 15 минут для подтверждения брони.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 text-left max-w-md mx-auto mb-6 space-y-1.5 font-mono">
              <div><strong>Выбранный номер:</strong> {formData.preferredRoomId}</div>
              <div><strong>Срок:</strong> {formData.stayDuration}</div>
              <div><strong>Статус:</strong> Предварительное резервирование</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={RESORT_STATS.telegramChannel}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Открыть Telegram канал</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
