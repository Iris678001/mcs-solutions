import React, { useState } from 'react';
import { ServiceDetail } from '../data/mcsData';

interface ServiceSectionProps {
  service: ServiceDetail;
  index: number;
  onFocusStation?: (stationIndex: number) => void;
  onOpenHireModal: (serviceId: ServiceDetail['id']) => void;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  service,
  index,
  onOpenHireModal,
}) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'equipment'>('roles');

  const isEven = index % 2 === 0;

  return (
    <section
      id={service.id}
      className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-t border-slate-900"
      data-testid={`service-section-${service.id}`}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isEven ? '' : 'lg:grid-flow-dense'}`}>
        
        {/* Main Content Column (7 cols) */}
        <div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}>
          {/* Category Header */}
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest mb-3 font-mono">
            <span>{`Division 0${service.stationIndex}`}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{service.category}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-serif tracking-tight text-white mb-4 text-balance">
            {service.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Operational Scope & Tooling Selector - Crisp Rectilinear Tabs */}
          <div className="border border-slate-800 bg-slate-950 mb-7">
            <div className="flex items-center border-b border-slate-800 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('roles')}
                className={`flex-1 py-3 px-4 text-center cursor-pointer transition-colors ${
                  activeTab === 'roles'
                    ? 'bg-slate-900 text-white border-b-2 border-sky-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Deployed Job Roles & Staffing
              </button>
              <button
                onClick={() => setActiveTab('equipment')}
                className={`flex-1 py-3 px-4 text-center cursor-pointer transition-colors border-l border-slate-800 ${
                  activeTab === 'equipment'
                    ? 'bg-slate-900 text-white border-b-2 border-sky-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Machinery & Equipment Provided
              </button>
            </div>

            <div className="p-5">
              {/* Tab 1: Roles Deployed */}
              {activeTab === 'roles' && (
                <ul className="space-y-3">
                  {service.rolesDeployed.map((role) => (
                    <li key={role} className="flex items-start gap-3 text-xs text-slate-200">
                      <span className="font-mono text-sky-400 font-bold shrink-0">—</span>
                      <span className="font-medium leading-relaxed">{role}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tab 2: Equipment & Tools Provided */}
              {activeTab === 'equipment' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 mb-3">
                    MCS furnishes all industrial equipment, certified safety consumables, and maintenance upkeep directly:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {service.equipmentProvided.map((item) => (
                      <div
                        key={item}
                        className="p-3 bg-slate-900/80 border border-slate-800/80 text-slate-200 flex items-start gap-2.5"
                      >
                        <span className="text-sky-400 font-mono font-bold">›</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Division Service Guarantee Footnote */}
            <div className="px-5 py-3 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <div>
                <span className="font-semibold text-slate-300">Replacement Guarantee:</span>
                <span className="ml-1 text-slate-400">Under 2 hours for scheduled absenteeism</span>
              </div>
              <div>
                <span className="font-semibold text-slate-300">Statutory:</span>
                <span className="ml-1 text-slate-400">100% PF, ESI, Minimum Wages & Police Checked</span>
              </div>
            </div>
          </div>

          {/* Action Row - Clean Corporate Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenHireModal(service.id)}
              className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer border border-sky-400/30"
            >
              Deploy {service.title.split('&')[0].trim()} Staff →
            </button>
          </div>
        </div>

        {/* Visual Column (5 cols): Authentic Photo Aperture */}
        <div className={`lg:col-span-5 ${isEven ? '' : 'lg:col-start-1'}`}>
          <div className="border bg-slate-900 border-slate-800">
            {/* Field Operations Header */}
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2 text-xs">
              <div className="text-slate-200 font-bold text-[11px] uppercase tracking-wider">
                {service.title.split('&')[0].trim()} Field Operations
              </div>
              <span className="text-slate-400 text-[10px] uppercase tracking-widest font-mono bg-slate-900 px-2.5 py-1 border border-slate-800">
                Personnel Photo
              </span>
            </div>

            {/* Visual Viewport */}
            <div className="aspect-16/11 w-full overflow-hidden bg-slate-950 relative">
              <img
                src={service.imageUrl}
                alt={`${service.title} - Real MCS staff on duty`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-100">
                <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                  {service.title.split('&')[0].trim()} Crew
                </span>
                <span className="text-slate-300 text-[10px] uppercase tracking-widest font-mono bg-slate-950/90 px-2 py-0.5 border border-slate-800">
                  Verified Staff
                </span>
              </div>
            </div>

            {/* Technical Equipment Specs List */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                Technical Hardware & Safety Specifications:
              </div>
              <div className="space-y-2">
                {service.equipment3D?.specs.map((spec) => (
                  <div key={spec} className="flex items-start gap-2 text-slate-300 text-[11px]">
                    <span className="text-sky-400 font-mono font-bold">›</span>
                    <span className="leading-snug">{spec}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Client Capital Expenditure:</span>
                <span className="font-bold text-sky-400 font-mono uppercase tracking-wider">Zero ($0) · MCS Furnished</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
