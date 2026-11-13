/**
 * MCS Workforce & Service Staffing Estimation Engine
 * Pure deterministic calculations for deploying real human personnel and facility teams.
 */

export type ServiceType = 'housekeeping' | 'manpower' | 'security' | 'laundry';

export type ServiceTier = 'standard' | 'premium' | 'healthcare';

export type ShiftType = 'single' | 'continuous' | 'round_the_clock';

export interface EstimateInput {
  services: ServiceType[];
  facilityAreaSqFt: number; // area in sq ft
  shiftType: ShiftType;     // 8h shift, 12h shift, or 24/7 (3x8h)
  serviceTier: ServiceTier; // standard commercial, premium corporate, hospital/sterile
  housekeepingStaffCount?: number;
  manpowerCount?: number;
  securityGuardsCount?: number;
  laundryKgPerDay?: number;
}

export interface ServiceBreakdownItem {
  service: ServiceType;
  label: string;
  monthlyCost: number;
  allocatedStaff: number;
  details: string;
}

export interface EstimateResult {
  totalMonthlyCost: number;
  annualEstimate: number;
  bundleDiscountPercent: number;
  bundleDiscountAmount: number;
  netMonthlyCost: number;
  totalPersonnel: number;
  supervisorsCount: number;
  slaResponseHours: number;
  breakdown: ServiceBreakdownItem[];
}

// Monthly deployed cost per worker (inclusive of uniform, PF/ESI, training, background check)
const COST_PER_HOUSEKEEPER = 1850;
const COST_PER_MANPOWER_STAFF = 2200;
const COST_PER_SECURITY_GUARD = 2400;
const COST_PER_KG_LAUNDRY = 1.45;

const TIER_MULTIPLIERS: Record<ServiceTier, number> = {
  standard: 1.0,
  premium: 1.2,
  healthcare: 1.4,
};

export function calculateServiceEstimate(input: EstimateInput): EstimateResult {
  const {
    services,
    facilityAreaSqFt = 25000,
    shiftType = 'single',
    serviceTier = 'standard',
    housekeepingStaffCount,
    manpowerCount,
    securityGuardsCount,
    laundryKgPerDay,
  } = input;

  if (!services || services.length === 0) {
    return {
      totalMonthlyCost: 0,
      annualEstimate: 0,
      bundleDiscountPercent: 0,
      bundleDiscountAmount: 0,
      netMonthlyCost: 0,
      totalPersonnel: 0,
      supervisorsCount: 0,
      slaResponseHours: 2,
      breakdown: [],
    };
  }

  const tierMultiplier = TIER_MULTIPLIERS[serviceTier] || 1.0;
  const shiftMultiplier = shiftType === 'round_the_clock' ? 2.8 : shiftType === 'continuous' ? 1.5 : 1.0;

  const breakdown: ServiceBreakdownItem[] = [];
  let rawTotalCost = 0;
  let totalStaff = 0;

  // 1. Housekeeping Staffing
  if (services.includes('housekeeping')) {
    const baseCleaners = housekeepingStaffCount && housekeepingStaffCount > 0
      ? housekeepingStaffCount
      : Math.max(2, Math.ceil(facilityAreaSqFt / 5000));
    
    const cleaners = Math.ceil(baseCleaners * (shiftType === 'round_the_clock' ? 2.5 : shiftType === 'continuous' ? 1.5 : 1.0));
    const cost = cleaners * COST_PER_HOUSEKEEPER * tierMultiplier;

    breakdown.push({
      service: 'housekeeping',
      label: 'Housekeeping & Janitorial Staff',
      monthlyCost: Math.round(cost),
      allocatedStaff: cleaners,
      details: `${cleaners} uniformed cleaning personnel with commercial cleaning equipment & sanitizers`,
    });

    rawTotalCost += cost;
    totalStaff += cleaners;
  }

  // 2. Human Resources & Manpower Staffing
  if (services.includes('manpower')) {
    const staff = manpowerCount && manpowerCount > 0
      ? manpowerCount
      : Math.max(3, Math.ceil(facilityAreaSqFt / 8000));
    
    const cost = staff * COST_PER_MANPOWER_STAFF * tierMultiplier * (shiftType === 'round_the_clock' ? 2.0 : 1.0);

    breakdown.push({
      service: 'manpower',
      label: 'Skilled & General Manpower Labor',
      monthlyCost: Math.round(cost),
      allocatedStaff: staff,
      details: `${staff} vetted workers (warehouse, technicians, factory labor, office attendants)`,
    });

    rawTotalCost += cost;
    totalStaff += staff;
  }

  // 3. Security Guard Personnel
  if (services.includes('security')) {
    const basePosts = securityGuardsCount && securityGuardsCount > 0
      ? securityGuardsCount
      : Math.max(2, Math.ceil(facilityAreaSqFt / 20000));
    
    const guardsNeeded = basePosts * (shiftType === 'round_the_clock' ? 3 : shiftType === 'continuous' ? 2 : 1);
    const cost = guardsNeeded * COST_PER_SECURITY_GUARD * tierMultiplier;

    breakdown.push({
      service: 'security',
      label: 'Uniformed Security Guard Personnel',
      monthlyCost: Math.round(cost),
      allocatedStaff: guardsNeeded,
      details: `${guardsNeeded} licensed, police-verified security guards covering ${basePosts} active posts`,
    });

    rawTotalCost += cost;
    totalStaff += guardsNeeded;
  }

  // 4. Commercial Laundry Logistics & Staff
  if (services.includes('laundry')) {
    const dailyKg = laundryKgPerDay && laundryKgPerDay > 0
      ? laundryKgPerDay
      : Math.max(40, Math.round(facilityAreaSqFt / 600));
    
    const monthlyKg = dailyKg * 30;
    const laundryCost = monthlyKg * COST_PER_KG_LAUNDRY * tierMultiplier;
    const laundryCrew = Math.max(1, Math.ceil(dailyKg / 150));

    breakdown.push({
      service: 'laundry',
      label: 'Commercial Laundry & Linen Staff',
      monthlyCost: Math.round(laundryCost),
      allocatedStaff: laundryCrew,
      details: `${dailyKg.toLocaleString()} kg/day processed by dedicated laundry crew with pickup & delivery vans`,
    });

    rawTotalCost += laundryCost;
    totalStaff += laundryCrew;
  }

  // Multi-service bundled discount
  let bundleDiscountPercent = 0;
  if (services.length === 2) bundleDiscountPercent = 5;
  else if (services.length === 3) bundleDiscountPercent = 10;
  else if (services.length >= 4) bundleDiscountPercent = 15;

  const bundleDiscountAmount = Math.round((rawTotalCost * bundleDiscountPercent) / 100);
  const netMonthlyCost = Math.round(rawTotalCost - bundleDiscountAmount);
  const annualEstimate = netMonthlyCost * 12;

  // Dedicated on-site supervisor: 1 per 10 workers
  const supervisorsCount = Math.max(1, Math.ceil(totalStaff / 10));
  const slaResponseHours = serviceTier === 'healthcare' ? 0.5 : serviceTier === 'premium' ? 1.0 : 2.0;

  return {
    totalMonthlyCost: Math.round(rawTotalCost),
    annualEstimate,
    bundleDiscountPercent,
    bundleDiscountAmount,
    netMonthlyCost,
    totalPersonnel: totalStaff,
    supervisorsCount,
    slaResponseHours,
    breakdown,
  };
}

export interface LeadFormInput {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  services: ServiceType[];
  facilityLocation: string;
  estimatedAreaSqFt: number;
  staffNeededCount?: string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLeadForm(input: Partial<LeadFormInput>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name or company representative name.';
  }

  if (!input.companyName || input.companyName.trim().length < 2) {
    errors.companyName = 'Please enter your business, society, or facility name.';
  }

  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = 'Please provide a valid contact email address.';
  }

  if (!input.phone || input.phone.trim().replace(/\D/g, '').length < 8) {
    errors.phone = 'Please provide a valid contact phone number (at least 8 digits).';
  }

  if (!input.services || input.services.length === 0) {
    errors.services = 'Please select at least one service you need staff for.';
  }

  if (!input.facilityLocation || input.facilityLocation.trim().length < 2) {
    errors.facilityLocation = 'Please specify the city or site address where staff is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
