import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Send } from 'lucide-react';
import { FAQS, RESORT_STATS } from '../data/resortData';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export function FAQSection({ onOpenBooking }: FAQSectionProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'visa' | 'tech' | 'living' | 'booking'>('all');

  const filteredFaqs = FAQS.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'visa') return item.category === 'visa' || item.category === 'tax';
    return item.category === activeCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-[#05080e] overflow-hidden border-t border-cyan-500/10">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 backdrop-blur-md mb-4">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">База знаний</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3">
            Часто Задаваемые Вопросы
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Всё, что нужно знать о визах, переезде, Starlink и правилах проживания в Бункере.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Все вопросы' },
            { id: 'visa', label: 'Визы & Налоги' },
            { id: 'tech', label: 'Starlink & Электричество' },
            { id: 'living', label: 'Быт & Безопасность' },
            { id: 'booking', label: 'Бронирование' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="space-y-3 mb-14">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-slate-900/60 border border-cyan-500/15 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white hover:text-cyan-300 transition-colors"
                >
                  <span className="font-display text-xs sm:text-sm font-bold">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Help Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-display text-sm sm:text-base font-bold text-white mb-1">
              Остались нестандартные вопросы?
            </h4>
            <p className="text-xs text-slate-300">
              Напиши основателям напрямую в Telegram — ответим в течение 15 минут.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>Задать вопрос</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
