import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateServiceEstimate, validateLeadForm } from './calculator';

test('returns zero values when no services are selected', () => {
  const result = calculateServiceEstimate({
    services: [],
    facilityAreaSqFt: 50000,
    shiftType: 'single',
    serviceTier: 'standard',
  });

  assert.equal(result.totalMonthlyCost, 0);
  assert.equal(result.netMonthlyCost, 0);
  assert.equal(result.totalPersonnel, 0);
  assert.equal(result.breakdown.length, 0);
});

test('calculates actual housekeeping staff allocation correctly', () => {
  const result = calculateServiceEstimate({
    services: ['housekeeping'],
    facilityAreaSqFt: 25000,
    shiftType: 'single',
    serviceTier: 'standard',
  });

  assert.ok(result.totalMonthlyCost > 0);
  assert.ok(result.totalPersonnel >= 2);
  assert.equal(result.breakdown[0].service, 'housekeeping');
  assert.match(result.breakdown[0].label, /Housekeeping/i);
});

test('applies multi-service bundle discount for enterprise human resources', () => {
  const twoServices = calculateServiceEstimate({
    services: ['housekeeping', 'security'],
    facilityAreaSqFt: 30000,
    shiftType: 'single',
    serviceTier: 'standard',
  });
  assert.equal(twoServices.bundleDiscountPercent, 5);

  const fullSuite = calculateServiceEstimate({
    services: ['housekeeping', 'manpower', 'security', 'laundry'],
    facilityAreaSqFt: 50000,
    shiftType: 'continuous',
    serviceTier: 'premium',
  });
  assert.equal(fullSuite.bundleDiscountPercent, 15);
  assert.equal(fullSuite.breakdown.length, 4);
  assert.ok(fullSuite.totalPersonnel >= 10);
});

test('validates staffing inquiry form inputs correctly', () => {
  const invalidResult = validateLeadForm({
    fullName: '',
    companyName: '',
    email: 'bad',
    phone: '12',
    services: [],
    facilityLocation: '',
  });

  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.companyName);

  const validResult = validateLeadForm({
    fullName: 'Robert Sterling',
    companyName: 'Grand Horizon Towers',
    email: 'r.sterling@horizon.com',
    phone: '+1 800 555 0192',
    services: ['housekeeping', 'security'],
    facilityLocation: 'Downtown Financial Center',
    estimatedAreaSqFt: 45000,
  });

  assert.equal(validResult.isValid, true);
});
