import React from 'react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onHeadquartersClick: () => void;
  onSelectStation: (index: number) => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onHeadquartersClick,
  onSelectStation,
  onOpenBooking,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center items-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center"
    >
      {/* Subtle radial ambient scrim for perfect text legibility over 3D depth */}
      <div className="absolute inset-0 max-w-4xl mx-auto -z-10 bg-radial-[at_center] from-slate-950/95 via-slate-950/70 to-transparent pointer-events-none" />

      {/* Institutional Taxonomy Kicker */}
      <div className="inline-flex items-center justify-center gap-3 text-xs font-bold text-sky-400 tracking-widest uppercase mb-6 font-mono border-b border-slate-800/80 pb-2.5">
        <span>Corporate Facility Management</span>
        <span className="text-slate-600">/</span>
        <span>Human Resource Deployment</span>
      </div>

      {/* Master Headline - Elegant Serif, Authoritative & Classical */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif tracking-tight text-white leading-[1.12] mb-6 max-w-4xl mx-auto text-balance drop-shadow-[0_4px_24px_rgba(2,6,23,0.95)]">
        Housekeeping, Industrial Manpower & Facility Security Services
      </h1>

      {/* Subtitle / Value Proposition */}
      <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10 font-normal drop-shadow-[0_2px_12px_rgba(2,6,23,0.9)]">
        Moclient Solutions Pvt. Ltd. (MCS) delivers dedicated, legally compliant personnel deployments for commercial towers, industrial campuses, healthcare facilities, and logistics centers. Complete statutory PF/ESI compliance, on-site supervision, and 24/7 centralized dispatch.
      </p>

      {/* Institutional Guarantees Matrix - Sharp 4-Column Balanced Grid */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800 mb-10 text-xs text-slate-200 text-left">
        <div className="bg-slate-950 p-4 flex flex-col justify-between">
          <span className="font-bold text-sky-400 text-[11px] uppercase tracking-wider font-mono mb-1">
            Vetting & Clearance
          </span>
          <span className="text-slate-300 text-xs leading-normal">100% Police & Identity Background Verified</span>
        </div>
        <div className="bg-slate-950 p-4 flex flex-col justify-between">
          <span className="font-bold text-sky-400 text-[11px] uppercase tracking-wider font-mono mb-1">
            Statutory Governance
          </span>
          <span className="text-slate-300 text-xs leading-normal">Full PF, ESI & Minimum Wage Compliance</span>
        </div>
        <div className="bg-slate-950 p-4 flex flex-col justify-between">
          <span className="font-bold text-sky-400 text-[11px] uppercase tracking-wider font-mono mb-1">
            Relief Dispatch SLA
          </span>
          <span className="text-slate-300 text-xs leading-normal">Guaranteed 2-Hour Absentee Replacement</span>
        </div>
        <div className="bg-slate-950 p-4 flex flex-col justify-between">
          <span className="font-bold text-sky-400 text-[11px] uppercase tracking-wider font-mono mb-1">
            Equipped & Uniformed
          </span>
          <span className="text-slate-300 text-xs leading-normal">Standardized Uniforms, Photo IDs & Safety Gear</span>
        </div>
      </div>

      {/* Action Group - Precision Centered CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer border border-sky-400/30"
        >
          Deploy Staff / Request Roster →
        </button>

        <button
          onClick={onHeadquartersClick}
          className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs uppercase tracking-wider border border-slate-700 transition-colors cursor-pointer"
        >
          Our Corporate Headquarters
        </button>

        <button
          onClick={onExploreClick}
          className="px-5 py-3.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
        >
          4 Core Divisions ↓
        </button>
      </div>

      {/* 3D Camera Jump Navigation - Centered Linear Strip */}
      <div className="border border-slate-800 bg-slate-950/80 p-1.5 inline-flex flex-wrap items-center justify-center gap-1.5 text-xs">
        <span className="text-slate-500 font-bold px-3 text-[10px] uppercase tracking-wider font-mono">
          Interactive 3D Stations:
        </span>
        {[
          { label: 'Housekeeping', idx: 1 },
          { label: 'Manpower', idx: 2 },
          { label: 'Security', idx: 3 },
          { label: 'Laundry', idx: 4 },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onSelectStation(item.idx)}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors font-medium cursor-pointer text-xs uppercase tracking-wider"
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
};
