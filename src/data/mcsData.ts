export interface ServiceDetail {
  id: 'housekeeping' | 'manpower' | 'security' | 'laundry';
  stationIndex: number;
  title: string;
  shortName: string;
  category: string;
  tagline: string;
  description: string;
  imageUrl: string;
  stats: { label: string; value: string }[];
  rolesDeployed: string[];
  equipmentProvided: string[];
  equipment3D: {
    name: string;
    specs: string[];
    description: string;
  };
  sla: string;
  compliance: string;
  caseStudy: {
    client: string;
    metric: string;
    outcome: string;
  };
}

export const MCS_SERVICES: ServiceDetail[] = [
  {
    id: 'housekeeping',
    stationIndex: 1,
    title: 'Professional Housekeeping & Janitorial Staffing',
    shortName: 'Housekeeping Staff',
    category: 'On-Site Cleaning Personnel',
    tagline: 'Reliable, uniformed cleaning staff and daily housekeeping crews deployed at your facility.',
    description:
      'We supply dedicated, background-checked housekeeping personnel for corporate offices, commercial complexes, hospitals, and residential communities. Our staff arrives in clean uniforms, fully trained in mechanized cleaning machines, washroom hygiene, and waste management.',
    imageUrl: '/src/assets/images/service_housekeeping_staff_1794468457948.jpg',
    stats: [
      { label: 'Active Housekeepers', value: '1,450+' },
      { label: 'Facilities Maintained', value: '380+' },
      { label: 'Attendance Reliability', value: '99.6%' },
      { label: 'Immediate Backup SLA', value: '< 2 Hours' },
    ],
    rolesDeployed: [
      'Daily Office Cleaning Janitors & Dusting Crew',
      'Continuous Washroom Hygiene Attendants',
      'Pantry Boys & Executive Hospitality Attendants',
      'Motorized Scrubber & High-Reach Glass Specialists',
      'Post-Construction & Deep-Cleaning Project Teams',
    ],
    equipmentProvided: [
      'Commercial walk-behind floor scrubbers & burnishers',
      'Industrial wet & dry HEPA vacuum machines',
      'Color-coded microfiber cross-contamination systems',
      'Non-toxic Diversey certified cleaning formulations',
    ],
    equipment3D: {
      name: 'Industrial Motorized Floor Auto-Scrubber T-500',
      specs: [
        'Dual Rotary Scrub Brushes (180 RPM)',
        'Parabolic Wet Vacuum Squeegee Blade',
        '75L Clean Solution & Recovery Tank System',
        'Caution Wet Floor A-Frame Safety Sign',
      ],
      description:
        'Mechanized facility floor restoration unit featuring counter-rotating scrub discs, high-suction water extraction squeegee, and safety hazard indicators.',
    },
    sla: 'Guaranteed 2-hour replacement for any staff absenteeism · Dedicated on-site supervisor',
    compliance: '100% PF, ESI, Minimum Wages Act, and OSHA workplace safety compliant',
    caseStudy: {
      client: 'Metropolitan Financial Tower (350,000 sq ft)',
      metric: '99.8% Shift Adherence',
      outcome: 'Deployed 42 full-time housekeeping staff across 3 shifts with zero facility downtime in 24 months.',
    },
  },
  {
    id: 'manpower',
    stationIndex: 2,
    title: 'Human Resources & Industrial Manpower Solutions',
    shortName: 'Manpower & HR',
    category: 'Skilled & General Workforce',
    tagline: 'Pre-vetted, disciplined labor for factories, warehouses, logistics, and office support.',
    description:
      'Eliminate hiring shortages and labor compliance risks. MCS sources, verifies, trains, and manages reliable personnel on contract or permanent deployments. We handle all statutory payroll, biometric attendance, and occupational safety.',
    imageUrl: '/src/assets/images/service_industrial_manpower_1794468459181.jpg',
    stats: [
      { label: 'Workers Deployed', value: '3,200+' },
      { label: 'Placement Turnaround', value: '48 Hours' },
      { label: 'Statutory Compliance', value: '100%' },
      { label: 'Retention Rate', value: '94.2%' },
    ],
    rolesDeployed: [
      'Warehouse Pickers, Packers & Forklift Drivers',
      'Assembly Line & Factory Production Labor',
      'Office Assistants, Document Runners & Peons',
      'Electro-Mechanical Technicians, Electricians & Plumbers',
      'Corporate Receptionists & Front-Desk Staff',
    ],
    equipmentProvided: [
      'Complete safety gear: ISI-certified helmets, steel-toe boots & hi-vis vests',
      'Biometric fingerprint & facial attendance check-in terminals',
      'Standardized uniform kits with photo ID credentials',
      'Mobile workforce roster management & replacement tracking',
    ],
    equipment3D: {
      name: 'HR Workforce Deployment & Biometric Roster Station',
      specs: [
        'Live Biometric Check-In & Statutory Verification',
        'Multi-Role Deployment: Supervisor, Technician & Logistics',
        'Glowing Shift Allocation Data Streams',
        'Zero Legal Liability & 100% PF/ESI Compliant',
      ],
      description:
        'Live workforce allocation command hub linking shift supervisors with on-duty technicians and warehouse handlers via biometric data synchronizers.',
    },
    sla: '48-hour bulk mobilization · 100% legal compliance indemnity guaranteed',
    compliance: 'Contract Labour (R&A) Act, EPF, ESI, Gratuity, Bonus & Workmen Compensation',
    caseStudy: {
      client: 'Apex National Logistics & Fulfillment Hub',
      metric: '+180 Workers in 72 Hrs',
      outcome: 'Supplied 180 trained warehouse pickers during seasonal rush with zero labor disputes or downtime.',
    },
  },
  {
    id: 'security',
    stationIndex: 3,
    title: 'Disciplined Security Guards & Perimeter Protection',
    shortName: 'Security Personnel',
    category: 'Manned Guarding Services',
    tagline: 'PSARA-licensed, physically fit security guards safeguarding your premises 24/7.',
    description:
      'Our security officers are rigorously trained in physical defense, gate control, visitor management, vehicle inspection, and emergency evacuation. Supervised by ex-defense personnel with regular surprise night patrols.',
    imageUrl: '/src/assets/images/service_security_personnel_1794468459622.jpg',
    stats: [
      { label: 'Guards on Active Duty', value: '1,800+' },
      { label: 'PSARA License Verified', value: '100%' },
      { label: 'Incidents Escalated', value: '0.00%' },
      { label: 'Emergency Response', value: '< 3 Mins' },
    ],
    rolesDeployed: [
      'Uniformed Static Gate & Perimeter Guards',
      'Armed Guards for Banks, Cash & High-Value Assets',
      'Courteous Female Security Frisking Officers',
      'Night Watchmen & Patrol Personnel',
      'Corporate Concierge & Visitor Register Ingress Attendants',
    ],
    equipmentProvided: [
      'Garrett handheld & walkthrough metal detectors (DFMD/HHMD)',
      'Under-vehicle inspection mirrors (UVIM)',
      'Dual-band communication walkie-talkies',
      'Visitor register & digital barcode visitor pass printing kits',
    ],
    equipment3D: {
      name: 'Optical Speed Gate Turnstiles & PTZ CCTV Dome',
      specs: [
        'Contactless RFID Card & Biometric Tap Reader',
        'Synchronized Tempered Acrylic Swing Barrier Gates',
        'Overhead PTZ Surveillance Dome with Laser Sweep',
        'Uniformed Peaked-Cap Security Officer on Sentry Duty',
      ],
      description:
        'Access control perimeter system featuring motorized turnstiles with swinging barrier flaps, sentry post, and pan-tilt surveillance dome.',
    },
    sla: 'Immediate replacement on guard sickness · 24/7 central control dispatch support',
    compliance: 'PSARA Licensed (Private Security Agencies Regulation Act) & Police Verified',
    caseStudy: {
      client: 'Horizon Corporate Tech Park (6 Buildings)',
      metric: '100% Incident Prevention',
      outcome: 'Managed 14,000 daily employee & visitor check-ins with 28 guard posts and zero security breaches.',
    },
  },
  {
    id: 'laundry',
    stationIndex: 4,
    title: 'Commercial Laundry & Linen Management Services',
    shortName: 'Laundry & Linen',
    category: 'Hospitality & Healthcare Linen Care',
    tagline: 'Spotless linen washing, uniform pressing, and scheduled doorstep delivery.',
    description:
      'We run dedicated commercial laundry operations for hotels, hospitals, corporate workwear, and educational campuses. Our team handles linen sorting, stain removal, hygienic hot-water disinfection, steam pressing, and organized return.',
    imageUrl: '/src/assets/images/service_commercial_laundry_1794468461339.jpg',
    stats: [
      { label: 'Daily Laundry Capacity', value: '25,000 kg' },
      { label: 'Thermal Disinfection', value: '85°C Hot Wash' },
      { label: 'Turnaround Time', value: '24 Hours' },
      { label: 'Linen Life Extended', value: '+30%' },
    ],
    rolesDeployed: [
      'Professional Industrial Washers & Chemical Handlers',
      'Commercial Flatwork Ironer & Steam Press Operators',
      'Linen Quality Inspectors & Folding Specialists',
      'Dedicated Pickup & Delivery Route Drivers',
    ],
    equipmentProvided: [
      'Continuous industrial barrier washers for medical disinfection',
      'High-speed roller flatwork ironers & steam press stations',
      'Enclosed stainless steel linen transport trolleys',
      'Dedicated sanitized fleet vehicles for daily pickup & drop',
    ],
    equipment3D: {
      name: '50kg Commercial Washer-Extractor & Linen Trolley',
      specs: [
        'Perforated Stainless Drum with Active Tumbling Linens',
        'PLC Touchscreen Terminal with 85°C Thermal Sanitize',
        'Industrial Utility Steam Pipes & Pressure Gauge',
        'Heavy-Duty Mobile Vinyl Linen Cart with Folded Towels',
      ],
      description:
        'Industrial commercial laundry processing unit featuring high-speed rotating drum, tumbling linens, touchscreen cycle display, and linen transport caddy.',
    },
    sla: 'Scheduled 24-hour routine cycle · Express 6-hour emergency linen delivery',
    compliance: 'Healthcare Grade-A Disinfection (CDC/WHO compliant) with bio-safe detergents',
    caseStudy: {
      client: 'Royal Orchid Luxury Hotel & Suites (480 Rooms)',
      metric: 'Zero Linen Stockouts',
      outcome: 'Provided daily 4,500 kg linen processing and uniform dry cleaning with 100% on-time delivery.',
    },
  },
];

export const MCS_METRICS = [
  { value: '6,450+', label: 'Uniformed Staff Deployed Daily' },
  { value: '450+', label: 'Commercial & Industrial Clients' },
  { value: '100%', label: 'Police Verified & PF/ESI Compliant' },
  { value: '< 2 Hours', label: 'Guaranteed Staff Replacement SLA' },
];

export const MCS_CERTIFICATIONS = [
  { code: 'PSARA Certified', name: 'Private Security Agencies Act' },
  { code: 'ISO 9001:2015', name: 'Quality Management in Facility Staffing' },
  { code: '100% PF & ESI', name: 'Statutory Labor Law Compliance' },
  { code: 'Police Verified', name: 'Background & Criminal Checks' },
  { code: 'OHSAS 18001', name: 'Workplace Safety & Health' },
  { code: 'Green Clean Certified', name: 'Non-Toxic Cleaning Formulations' },
];

export const MCS_TESTIMONIALS = [
  {
    quote:
      'MCS provides us with 65 housekeeping staff and 20 security guards. Their staff is always in clean uniform, polite, and on time. Any time a worker is absent, MCS replaces them within 90 minutes.',
    author: 'Sunil Narayan',
    role: 'Chief Administrative Officer',
    company: 'Prime Global Business Towers',
  },
  {
    quote:
      'Finding 120 verified factory and warehouse workers on short notice was a nightmare until we partnered with MCS. They handle payroll, uniforms, and compliance without any hassle.',
    author: 'Rajesh Sharma',
    role: 'Vice President of Operations',
    company: 'Sterling Auto Components Ltd',
  },
  {
    quote:
      'Our hospital requires rigorous sanitization and spotless linens. MCS housekeeping staff and laundry services maintain impeccable hospital hygiene standards day in and day out.',
    author: 'Dr. Aruna Sengupta',
    role: 'Medical Superintendent',
    company: 'Apollo Care Hospitals',
  },
];
