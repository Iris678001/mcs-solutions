import React, { useState, useEffect, useCallback } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceSection } from './components/ServiceSection';
import { HeadquartersSection } from './components/HeadquartersSection';
import { OperationsSection } from './components/OperationsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MCS_SERVICES } from './data/mcsData';
import { ServiceType } from './utils/calculator';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    services?: ServiceType[];
    staffCount?: string;
  }>({
    services: ['housekeeping', 'manpower', 'security', 'laundry'],
    staffCount: '6-15 Personnel',
  });

  // Calculate scroll progress across the document
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
    setScrollProgress(progress);

    // Update active station based on scroll progress
    if (progress < 0.15) {
      setActiveStationIndex(0); // Hero
    } else if (progress < 0.35) {
      setActiveStationIndex(1); // Housekeeping
    } else if (progress < 0.55) {
      setActiveStationIndex(2); // Manpower
    } else if (progress < 0.75) {
      setActiveStationIndex(3); // Security
    } else if (progress < 0.90) {
      setActiveStationIndex(4); // Laundry
    } else {
      setActiveStationIndex(5); // Headquarters & Campus
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Navigate to section by element ID with header offset
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Jump to station index
  const handleSelectStation = (index: number) => {
    setActiveStationIndex(index);
    if (index === 0) {
      navigateToSection('hero');
    } else if (index === 1) {
      navigateToSection('housekeeping');
    } else if (index === 2) {
      navigateToSection('manpower');
    } else if (index === 3) {
      navigateToSection('security');
    } else if (index === 4) {
      navigateToSection('laundry');
    } else if (index === 5) {
      navigateToSection('operations');
    }
  };

  // Direct hire action from service card
  const handleOpenHireModal = (serviceId: ServiceType) => {
    setBookingPrefill({
      services: [serviceId],
    });
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* 1. Full-Screen Fixed 3D WebGL Spatial Scene */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ThreeCanvas
          scrollProgress={scrollProgress}
          activeServiceIndex={activeStationIndex}
        />
      </div>

      {/* 2. Content Overlay Layer */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        
        {/* Top Navigation */}
        <div className="pointer-events-auto">
          <Navbar
            onOpenBooking={() => setIsBookingOpen(true)}
            onNavigateSection={navigateToSection}
          />
        </div>

        {/* Hero Section */}
        <div className="pointer-events-auto">
          <HeroSection
            onExploreClick={() => navigateToSection('housekeeping')}
            onHeadquartersClick={() => navigateToSection('operations')}
            onSelectStation={handleSelectStation}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </div>

        {/* 4 Dedicated Human Workforce & Service Sections */}
        <main className="pointer-events-auto space-y-6 my-6">
          {MCS_SERVICES.map((service, index) => (
            <ServiceSection
              key={service.id}
              service={service}
              index={index}
              onFocusStation={handleSelectStation}
              onOpenHireModal={handleOpenHireModal}
            />
          ))}

          {/* MCS Physical Headquarters & 24/7 Operations Hub Showcase (Features Real Office Images) */}
          <HeadquartersSection
            onOpenBooking={() => setIsBookingOpen(true)}
          />

          {/* Operational Governance, Vetting & Certifications */}
          <OperationsSection />
        </main>

        {/* Quiet Footer */}
        <div className="pointer-events-auto mt-auto">
          <Footer
            onOpenBooking={() => setIsBookingOpen(true)}
            onNavigateSection={navigateToSection}
          />
        </div>
      </div>

      {/* Staffing Inquiry & Deployment Request Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefillData={bookingPrefill}
      />
    </div>
  );
}
