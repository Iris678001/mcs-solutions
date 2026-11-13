import React from 'react';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3.5 mb-3">
            <img
              src="/assets/mcs-symbol.png"
              alt="MCS Emblem - Moclient Solutions Pvt. Ltd."
              className="w-11 h-11 object-contain drop-shadow-[0_2px_10px_rgba(56,189,248,0.3)]"
            />
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white tracking-tight font-mono">
                MCS
              </span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest pl-3 border-l border-slate-800">
                Moclient Solutions Pvt. Ltd.
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Institutional contractor providing mechanized housekeeping, industrial human resources, licensed security guard forces, and commercial linen management.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
            <span className="text-sky-400 font-semibold font-mono">Office:</span>
            <span>Palakkad, Kerala</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          <a
            href="#housekeeping"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('housekeeping');
            }}
            className="hover:text-white transition-colors"
          >
            Housekeeping
          </a>
          <a
            href="#manpower"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('manpower');
            }}
            className="hover:text-white transition-colors"
          >
            Manpower
          </a>
          <a
            href="#security"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('security');
            }}
            className="hover:text-white transition-colors"
          >
            Security
          </a>
          <a
            href="#laundry"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('laundry');
            }}
            className="hover:text-white transition-colors"
          >
            Laundry
          </a>
          <a
            href="#operations"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('operations');
            }}
            className="hover:text-white transition-colors text-sky-400"
          >
            Headquarters & Hub
          </a>
          <button
            onClick={onOpenBooking}
            className="text-white hover:text-sky-300 font-bold cursor-pointer underline decoration-sky-500 underline-offset-4"
          >
            Deploy Staff →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} Moclient Solutions Pvt. Ltd. (MCS) · Palakkad, Kerala. All personnel 100% PF/ESI compliant. PSARA Reg. No. 4892-DL.
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px]">
          <span>Palakkad, Kerala</span>
          <span className="text-slate-700">|</span>
          <span>Standby SLA: &lt; 2 Hours</span>
          <span className="text-slate-700">|</span>
          <a href="tel:+918137033055" className="hover:text-slate-300">Hotline: 8137 03 3055, 8157 01 1044</a>
        </div>
      </div>
    </footer>
  );
};
