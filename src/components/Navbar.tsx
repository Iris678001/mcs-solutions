import React from 'react';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-18">
        
        {/* MCS Brand Wordmark - Sharp Architectural Corporate Identity */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('hero');
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <img
            src="/assets/mcs-symbol.png"
            alt="MCS Emblem - Moclient Solutions Pvt. Ltd."
            className="w-9 h-9 object-contain drop-shadow-[0_2px_10px_rgba(56,189,248,0.35)] group-hover:scale-105 transition-transform"
          />
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-sky-400 transition-colors font-mono">
            MCS
          </span>
          <div className="hidden sm:flex flex-col border-l border-slate-800 pl-3 leading-none">
            <span className="text-[11px] font-bold text-slate-200 tracking-wider uppercase">
              Moclient Solutions Pvt. Ltd.
            </span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase mt-0.5">
              Facility & Workforce Management
            </span>
          </div>
        </a>

        {/* Corporate Navigation Links - Clean, Crisp Typographic Hierarchy */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <a
            href="#housekeeping"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('housekeeping');
            }}
            className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-sky-500"
          >
            Housekeeping
          </a>
          <a
            href="#manpower"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('manpower');
            }}
            className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-sky-500"
          >
            Manpower
          </a>
          <a
            href="#security"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('security');
            }}
            className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-sky-500"
          >
            Security
          </a>
          <a
            href="#laundry"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('laundry');
            }}
            className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-sky-500"
          >
            Laundry
          </a>
          <a
            href="#operations"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('operations');
            }}
            className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-sky-500 text-sky-400"
          >
            Headquarters & Hub
          </a>
          <a
            href="#compliance"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('compliance');
            }}
            className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-sky-500"
          >
            Compliance
          </a>
        </nav>

        {/* Primary Corporate Requisition CTA - Sharp Rectilinear Precision */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="tel:+918137033055"
            className="hidden xl:inline-block text-xs font-semibold text-slate-400 hover:text-white tracking-wide font-mono"
          >
            Dispatch: +91 8137 03 3055
          </a>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 transition-colors whitespace-nowrap cursor-pointer border border-sky-400/30"
          >
            Deploy Staff
          </button>
        </div>
      </div>
    </header>
  );
};
