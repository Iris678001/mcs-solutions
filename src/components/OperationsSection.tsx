import React from 'react';

export const OperationsSection: React.FC = () => {
  return (
    <section id="compliance" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-t border-slate-900">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400 tracking-widest uppercase mb-3 font-mono">
          <span>Governance & Liability Protection</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">Statutory Framework</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-normal font-serif tracking-tight text-white mb-4 text-balance">
          Statutory Compliance & Workforce Due Diligence
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Every individual deployed under an MCS agreement is directly employed, background vetted, and legally covered under statutory labor laws. We insulate your management from principal employer liabilities.
        </p>
      </div>

      {/* 4-Step Operational Governance - Crisp Rectilinear Grid */}
      <div className="mb-14">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-mono">
          Onboarding & Deployment Standards:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800">
          {[
            {
              step: '01',
              title: 'Police & Identity Clearance',
              desc: 'Biometric identity cross-check, physical residential address verification, and jurisdictional police record clearance.',
            },
            {
              step: '02',
              title: 'Practical Equipment Training',
              desc: 'Intensive drills in mechanized auto-scrubbers, washroom chemical handling, gate protocols, and emergency evacuation.',
            },
            {
              step: '03',
              title: 'Biometric Attendance & ESI',
              desc: 'On-site check-in logs reconciled monthly with PF and ESI compliance receipts submitted directly to client administration.',
            },
            {
              step: '04',
              title: 'Guaranteed 2-Hour Relief SLA',
              desc: 'Dedicated branch-level reserve personnel dispatched immediately upon notice of scheduled absence or medical leaves.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-slate-950 p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-sky-400 font-mono tracking-widest block mb-3">
                  STAGE {item.step}
                </span>
                <h4 className="text-base font-bold text-white mb-2 leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Legal Accreditation - Factual Enterprise Table */}
      <div className="border border-slate-800 bg-slate-950 p-6 sm:p-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4 font-mono">
          Statutory Accreditations & Legal Compliance Acts:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-900/80 border border-slate-800">
            <span className="text-sky-400 font-bold block mb-1 font-mono uppercase tracking-wider text-[11px]">
              PSARA Act Certified
            </span>
            <div className="font-semibold text-white mb-1">Private Security Agencies Act</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Mandatory government licensing, background-checked guard force, and strict security protocol adherence.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800">
            <span className="text-sky-400 font-bold block mb-1 font-mono uppercase tracking-wider text-[11px]">
              100% PF & ESIC Compliance
            </span>
            <div className="font-semibold text-white mb-1">Employees' Provident Fund & Insurance</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Timely statutory monthly challans and health insurance cards issued to every deployed staff member.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800">
            <span className="text-sky-400 font-bold block mb-1 font-mono uppercase tracking-wider text-[11px]">
              Minimum Wages Act
            </span>
            <div className="font-semibold text-white mb-1">Direct Bank Remittance</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Transparent electronic payroll with zero cash payments, fully aligned with zonal minimum wage standards.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800">
            <span className="text-sky-400 font-bold block mb-1 font-mono uppercase tracking-wider text-[11px]">
              Contract Labour (R&A) Act
            </span>
            <div className="font-semibold text-white mb-1">Principal Employer Indemnity</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              All labor registrations and documentation maintained by MCS, protecting clients from third-party liabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
