import React, { useState } from 'react';

interface HeadquartersSectionProps {
  onOpenBooking: () => void;
}

export const HeadquartersSection: React.FC<HeadquartersSectionProps> = ({ onOpenBooking }) => {
  const [activePhoto, setActivePhoto] = useState<'signage' | 'reception' | 'operations'>('signage');

  return (
    <section id="operations" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-t border-slate-900">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400 tracking-widest uppercase mb-3 font-mono">
          <span>Physical Infrastructure</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">Operations Control</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-normal font-serif tracking-tight text-white mb-4 text-balance">
          Our Corporate Headquarters & Centralized Operations Center
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Moclient Solutions Pvt. Ltd. (MCS) operates dedicated physical branch facilities and a centralized command center where personnel are vetted, biometric attendance is tracked, and 24/7 relief deployments are coordinated.
        </p>
      </div>

      {/* Two-Column Grid: Photo Showcase on Left, Facility Operations Intel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column (7 cols): Real Office Photography Showcase */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800">
          {/* Photo Switcher Header */}
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              MCS Verified Premises
            </div>
            
            <div className="inline-flex border border-slate-800 text-[11px]">
              <button
                onClick={() => setActivePhoto('signage')}
                className={`px-3 py-1.5 transition-all uppercase tracking-wider font-semibold cursor-pointer ${
                  activePhoto === 'signage'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                Corporate Signage
              </button>
              <button
                onClick={() => setActivePhoto('reception')}
                className={`px-3 py-1.5 transition-all uppercase tracking-wider font-semibold cursor-pointer border-l border-slate-800 ${
                  activePhoto === 'reception'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                Front Reception
              </button>
              <button
                onClick={() => setActivePhoto('operations')}
                className={`px-3 py-1.5 transition-all uppercase tracking-wider font-semibold cursor-pointer border-l border-slate-800 ${
                  activePhoto === 'operations'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                Operations Room
              </button>
            </div>
          </div>

          {/* Image Display */}
          <div className="h-[360px] sm:h-[440px] md:h-[480px] w-full overflow-hidden bg-slate-950 relative flex items-center justify-center">
            {activePhoto === 'signage' ? (
              <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                <img
                  src="/assets/aistudio/Glossy_MCS_Corporate_Signage_188fe491.png"
                  alt="MCS Corporate Signage - Moclient Solutions Pvt. Ltd."
                  className="h-full w-auto max-w-full object-contain mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <div className="bg-slate-950/90 px-3 py-1 border border-slate-800 text-[11px]">
                    <span className="font-bold text-white uppercase tracking-wider">Corporate Entrance Signboard:</span>
                    <span className="text-slate-400 ml-2">Moclient Solutions Pvt. Ltd. · 8137 03 3055, 8157 01 1044</span>
                  </div>
                  <span className="bg-slate-950/90 text-sky-400 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border border-slate-800">
                    Official Entity
                  </span>
                </div>
              </div>
            ) : activePhoto === 'reception' ? (
              <div className="relative w-full h-full">
                <img
                  src="/assets/images/mcs_office_reception_1794503519406.jpg"
                  alt="MCS Corporate Reception Desk and Branded Services Wall"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <div className="bg-slate-950/90 px-3 py-1 border border-slate-800 text-[11px]">
                    <span className="font-bold text-white uppercase tracking-wider">Corporate Reception:</span>
                    <span className="text-slate-400 ml-2">Visitor register & candidate clearance desk</span>
                  </div>
                  <span className="bg-slate-950/90 text-slate-300 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border border-slate-800">
                    Active Premises
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src="/assets/images/mcs_service_wall_1794503539448.jpg"
                  alt="MCS Central Operations Hub and 4-Division Service Command Wall"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <div className="bg-slate-950/90 px-3 py-1 border border-slate-800 text-[11px]">
                    <span className="font-bold text-white uppercase tracking-wider">Operations Command Room:</span>
                    <span className="text-slate-400 ml-2">Shift monitoring & 2-hour reliever dispatch desk</span>
                  </div>
                  <span className="bg-slate-950/90 text-slate-300 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border border-slate-800">
                    24/7 Operations
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Under-Photo Key Highlights - Sharp Grid */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800 border-x-0 border-b-0 text-center">
            <div className="p-3 bg-slate-950">
              <div className="text-sm font-black text-white uppercase tracking-wider font-mono">4 Divisions</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Single Point Command</div>
            </div>
            <div className="p-3 bg-slate-950">
              <div className="text-sm font-black text-white uppercase tracking-wider font-mono">24/7/365</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Central Dispatch Desk</div>
            </div>
            <div className="p-3 bg-slate-950">
              <div className="text-sm font-black text-white uppercase tracking-wider font-mono">&lt; 2 Hours</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Standby Reliever SLA</div>
            </div>
            <div className="p-3 bg-slate-950">
              <div className="text-sm font-black text-white uppercase tracking-wider font-mono">100% Legal</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">PF, ESI, PSARA Verified</div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): What Happens At Our Headquarters */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900 border border-slate-800 p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-2 font-mono">
              Operational Protocols
            </div>

            <h3 className="text-lg font-bold text-white mb-3">
              Direct Governance & Physical Infrastructure
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Every client contract is anchored by our physical branch offices. We handle recruitment, statutory compliance, uniform issuance, and emergency attendance management in-house.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-start gap-3">
                <span className="font-mono text-sky-400 font-bold shrink-0 text-xs">01.</span>
                <div>
                  <div className="font-bold text-white uppercase tracking-wide text-[11px]">
                    Physical Candidate Screening
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed mt-0.5">
                    Biometric authentication, physical address checks, and formal police record clearance prior to client facility induction.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-sky-400 font-bold shrink-0 text-xs">02.</span>
                <div>
                  <div className="font-bold text-white uppercase tracking-wide text-[11px]">
                    Machinery & Hygiene Training Facility
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed mt-0.5">
                    All housekeeping and security personnel complete practical training on industrial floor scrubbers, chemical safety, and entry protocols.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-sky-400 font-bold shrink-0 text-xs">03.</span>
                <div>
                  <div className="font-bold text-white uppercase tracking-wide text-[11px]">
                    Regional Reliever Standby Fleet
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed mt-0.5">
                    Branch-level reserve staff ready for immediate dispatch to ensure zero unattended posts or uncleaned areas.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenBooking}
                className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer border border-sky-400/30"
              >
                Deploy Staff / Request Roster →
              </button>
              <a
                href="tel:+918137033055"
                className="py-3 px-4 bg-slate-950 hover:bg-slate-800 text-slate-200 font-semibold text-xs uppercase tracking-wider border border-slate-800 transition-colors text-center font-mono"
              >
                Call: +91 8137 03 3055
              </a>
            </div>
            <div className="mt-3 text-[11px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/60 pt-2">
              <span>Lines: 8137 03 3055 / 8157 01 1044</span>
              <span className="text-slate-300 font-bold uppercase">Moclient Solutions Pvt. Ltd.</span>
            </div>
          </div>

          {/* Core Division Directory */}
          <div className="bg-slate-900 border border-slate-800 p-4 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
              Service Divisions Governed At Headquarters:
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-slate-950 border border-slate-800 text-slate-200">
                <strong className="text-white block font-bold">MANPOWER:</strong>
                <span className="text-slate-400">Skilled & Industrial Labor</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 text-slate-200">
                <strong className="text-white block font-bold">SECURITY:</strong>
                <span className="text-slate-400">Licensed Perimeter Guards</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 text-slate-200">
                <strong className="text-white block font-bold">HOUSEKEEPING:</strong>
                <span className="text-slate-400">Mechanized Cleaning Staff</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800 text-slate-200">
                <strong className="text-white block font-bold">LAUNDRY:</strong>
                <span className="text-slate-400">Commercial Linen Care</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
