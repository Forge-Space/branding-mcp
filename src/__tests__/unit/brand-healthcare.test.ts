import { beforeAll, describe, expect, it } from '@jest/globals';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandHealthcare } from '../../lib/branding-core/generators/brand-healthcare.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#22C55E', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);

  return {
    id: 'health-brand',
    name: 'CareFlow',
    tagline: 'Clarity for every patient',
    industry: 'healthcare services',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandHealthcare', () => {
  let brand: BrandIdentity;

  beforeAll(() => {
    brand = createTestBrand();
  });

  it('returns all required fields', () => {
    const result = generateBrandHealthcare(brand);
    expect(result.positioning).toBeTruthy();
    expect(result.careSpecialties).toBeDefined();
    expect(result.trustSignals).toBeDefined();
    expect(result.regulatoryFramework).toBeDefined();
    expect(result.communicationPillars).toBeDefined();
    expect(result.accessibilityRequirements).toBeDefined();
    expect(result.patientJourney).toBeDefined();
    expect(result.healthcareBriefSummary).toBeTruthy();
  });

  it('includes at least 3 care specialties', () => {
    const result = generateBrandHealthcare(brand);
    expect(result.careSpecialties.length).toBeGreaterThanOrEqual(3);
  });

  it('tech style includes digital triage in patient journey', () => {
    const result = generateBrandHealthcare(brand);
    const hasDigitalTriage = result.patientJourney.some((step) =>
      step.toLowerCase().includes('digital triage')
    );
    expect(hasDigitalTriage).toBe(true);
  });

  it('corporate style includes enterprise trust language', () => {
    const corp = createTestBrand({ style: 'corporate' });
    const result = generateBrandHealthcare(corp);
    const hasEnterpriseTrust = result.trustSignals.some((signal) =>
      signal.toLowerCase().includes('enterprise')
    );
    expect(hasEnterpriseTrust).toBe(true);
  });

  it('unknown style falls back to minimal strategy', () => {
    const unknown = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandHealthcare(unknown);
    expect(result.positioning.toLowerCase()).toContain('clear, calm');
    expect(result.regulatoryFramework.length).toBeGreaterThanOrEqual(3);
  });

  it('summary includes brand name and excludes undefined tagline', () => {
    const noTag = createTestBrand({ tagline: undefined });
    const result = generateBrandHealthcare(noTag);
    expect(result.healthcareBriefSummary).toContain('CareFlow');
    expect(result.healthcareBriefSummary).not.toContain('undefined');
  });
});
