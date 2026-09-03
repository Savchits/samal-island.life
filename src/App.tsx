import { useState } from 'react';
import { Globe2 } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PainVsSolution } from './components/PainVsSolution';
import { TaxAndVisa } from './components/TaxAndVisa';
import { LiveTelemetry } from './components/LiveTelemetry';
import { Amenities } from './components/Amenities';
import { RoomsGallery } from './components/RoomsGallery';
import { LocationSection } from './components/LocationSection';
import { CostComparisonCalculator } from './components/CostComparisonCalculator';
import { CommunityAndTestimonials } from './components/CommunityAndTestimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { I18nGeoPipelineModal } from './components/I18nGeoPipelineModal';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string | undefined>(undefined);
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState(false);

  const handleOpenBooking = (roomName?: string) => {
    setSelectedRoomForBooking(roomName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedRoomForBooking(undefined);
  };

  const handleScrollToRooms = () => {
    const el = document.getElementById('rooms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden">
      
      {/* Sticky Top Header */}
      <Header 
        onOpenBooking={handleOpenBooking} 
        onOpenI18nPipeline={() => setIsPipelineModalOpen(true)}
        onOpenAdmin={() => setIsAdminStudioOpen(true)}
      />

      {/* Main Content */}
      <main id="main-content">
        {/* 1. Hero Section (matching screenshot 1) */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onScrollToRooms={handleScrollToRooms}
        />

        {/* 2. Pain vs Solution Comparison (matching screenshot 2) */}
        <PainVsSolution onOpenBooking={handleOpenBooking} />

        {/* 3. 0% Tax & 3-Year Nomad Visa Shelter with Calculator */}
        <TaxAndVisa onOpenBooking={handleOpenBooking} />

        {/* 4. Live 24/7 Autonomy & Cyber-Engineering Telemetry */}
        <LiveTelemetry />

        {/* 5. Cyber-Hedonism Amenities: Infinity Pool, Cedar Sauna, Cold Plunge */}
        <Amenities />

        {/* 6. Exclusive 6 Rooms Showcase & Technical Workstations */}
        <RoomsGallery onOpenBooking={handleOpenBooking} />

        {/* 7. Location: Samal Island & Davao City Proximity */}
        <LocationSection />

        {/* 8. Monthly Cost Comparison: Dubai vs Bali vs Phuket vs Samal */}
        <CostComparisonCalculator onOpenBooking={handleOpenBooking} />

        {/* 9. IT Founders & Resident Community */}
        <CommunityAndTestimonials />

        {/* 10. Categorized Interactive FAQ Base */}
        <FAQSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Floating Pipeline Launcher */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        <a
          href="/admin"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0b101b]/95 hover:bg-cyan-950/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 text-xs font-mono shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          title="Вход в админку /admin"
        >
          <span>🔐</span>
          <span className="font-bold tracking-wide">/admin</span>
        </a>

        <button
          onClick={() => setIsPipelineModalOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0b101b]/95 hover:bg-cyan-950/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 text-xs font-mono shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Astro i18n & GEO Pipeline Dashboard"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <Globe2 className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
          <span className="font-bold tracking-wide">Pipeline</span>
          <span className="px-1.5 py-0.5 text-[9px] rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
            100% OK
          </span>
        </button>
      </div>

      {/* Application / Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        defaultRoomName={selectedRoomForBooking}
      />

      {/* i18n & GEO Automation Dashboard Modal */}
      <I18nGeoPipelineModal
        isOpen={isPipelineModalOpen}
        onClose={() => setIsPipelineModalOpen(false)}
      />
      
    </div>
  );
}
