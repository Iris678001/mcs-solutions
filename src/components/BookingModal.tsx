import React, { useState, useEffect } from 'react';
import { ServiceType } from '../utils/calculator';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: {
    services?: ServiceType[];
    staffCount?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, prefillData }) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [facilityLocation, setFacilityLocation] = useState('');
  const [staffScale, setStaffScale] = useState('6-15 Personnel');
  const [message, setMessage] = useState('');
  const [services, setServices] = useState<ServiceType[]>([
    'housekeeping',
    'manpower',
    'security',
    'laundry',
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  useEffect(() => {
    if (prefillData?.services && prefillData.services.length > 0) {
      setServices(prefillData.services);
    }
  }, [prefillData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Contact person name is required';
    if (!companyName.trim()) newErrors.companyName = 'Company / Facility name is required';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Valid corporate email required';
    if (!phone.trim() || phone.length < 8) newErrors.phone = 'Valid phone number required';
    if (!facilityLocation.trim()) newErrors.facilityLocation = 'Facility location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const code = `MCS-DEP-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    setReferenceCode(code);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const toggleServiceChoice = (s: ServiceType) => {
    if (services.includes(s)) {
      if (services.length > 1) {
        setServices(services.filter((item) => item !== s));
      }
    } else {
      setServices([...services, s]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl my-8 text-slate-100">
        {/* Close Button - Crisp Rectilinear Box */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 border border-slate-800 hover:border-slate-600 transition-colors flex items-center justify-center text-sm font-bold cursor-pointer font-mono"
          aria-label="Close modal"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-sky-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold font-mono">
              ✓
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">
              Workforce Requisition Logged
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              Your inquiry has been assigned directly to our central operations dispatch room. An MCS operations supervisor will review facility parameters and contact you within 2 hours.
            </p>

            <div className="bg-slate-950 border border-slate-800 p-4 max-w-sm mx-auto mb-6 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Reference Token:</span>
                <span className="font-mono font-bold text-sky-400">{referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Divisions:</span>
                <span className="font-semibold text-white capitalize">{services.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Target Headcount:</span>
                <span className="text-slate-200">{staffScale}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Facility Location:</span>
                <span className="text-slate-200">{facilityLocation}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="text-xs font-bold text-sky-400 tracking-widest uppercase mb-1 font-mono">
                Moclient Solutions Pvt. Ltd. · Operations Command
              </div>
              <h3 id="booking-modal-title" className="text-xl sm:text-2xl font-normal font-serif text-white">
                Workforce Deployment & Staffing Requisition
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct personnel deployment for corporate facilities, industrial parks, and commercial complexes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Service Selection */}
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-2 font-mono">
                  1. Required Divisions:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'housekeeping' as ServiceType, label: 'Housekeeping' },
                    { id: 'manpower' as ServiceType, label: 'Manpower' },
                    { id: 'security' as ServiceType, label: 'Security' },
                    { id: 'laundry' as ServiceType, label: 'Laundry' },
                  ].map((s) => {
                    const isSelected = services.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleServiceChoice(s.id)}
                        className={`p-2.5 border text-left transition-colors font-medium cursor-pointer ${
                          isSelected
                            ? 'bg-sky-950/70 border-sky-500 text-sky-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs uppercase tracking-wider">{s.label}</span>
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-sky-400 font-bold' : 'text-slate-600'}`}>
                            {isSelected ? '✓' : '+'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sunil Kumar"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Company / Facility Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Industrial Park"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {errors.companyName && <p className="text-[11px] text-red-400 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operations@company.com"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Facility Location / City *
                  </label>
                  <input
                    type="text"
                    value={facilityLocation}
                    onChange={(e) => setFacilityLocation(e.target.value)}
                    placeholder="e.g. Sector 18, Commercial Zone"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {errors.facilityLocation && <p className="text-[11px] text-red-400 mt-1">{errors.facilityLocation}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Estimated Headcount Needed
                  </label>
                  <select
                    value={staffScale}
                    onChange={(e) => setStaffScale(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                  >
                    <option value="1-5 Personnel">1 - 5 Personnel (Small Facility)</option>
                    <option value="6-15 Personnel">6 - 15 Personnel (Medium Complex)</option>
                    <option value="16-40 Personnel">16 - 40 Personnel (Corporate Campus)</option>
                    <option value="40+ Personnel">40+ Personnel (Industrial / Multi-Site)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Specific Requirements or Shift Timing (Optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Need 4 security guards for 24/7 gate duty and 8 janitors for daily 8am-5pm office cleaning."
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              {/* Compliance & SLA Guarantee */}
              <div className="p-3 bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">100% Police Verified & PF/ESI Covered</span>
                <span className="text-slate-300 font-bold font-mono">&lt; 2-Hour Absentee SLA</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors cursor-pointer uppercase tracking-wider text-xs border border-sky-400/30"
                >
                  Submit Requisition
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
