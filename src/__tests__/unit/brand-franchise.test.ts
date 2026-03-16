import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandFranchise } from '../../lib/branding-core/generators/brand-franchise.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

const brand: BrandIdentity = {
  id: 'test-brand',
  name: 'TestBrand',
  tagline: 'Grow Together',
  industry: 'food retail',
  style: 'minimal',
  colors,
  typography,
  spacing,
  createdAt: new Date().toISOString(),
};

describe('generateBrandFranchise', () => {
  it('returns all required fields', () => {
    const result = generateBrandFranchise(brand);
    expect(result.standardsTone).toBeTruthy();
    expect(Array.isArray(result.onboardingProgramme)).toBe(true);
    expect(Array.isArray(result.complianceRequirements)).toBe(true);
    expect(result.approvedSupplierFocus).toBeTruthy();
    expect(typeof result.licensingTerms).toBe('object');
    expect(Array.isArray(result.operationsManualOutline)).toBe(true);
    expect(Array.isArray(result.brandProtectionPolicies)).toBe(true);
    expect(Array.isArray(result.franchiseeSupport)).toBe(true);
    expect(result.franchiseBriefSummary).toBeTruthy();
  });

  it('returns at least 3 onboarding programme items', () => {
    const result = generateBrandFranchise(brand);
    expect(result.onboardingProgramme.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 compliance requirements', () => {
    const result = generateBrandFranchise(brand);
    expect(result.complianceRequirements.length).toBeGreaterThanOrEqual(3);
  });

  it('licensing terms has standard franchise keys', () => {
    const result = generateBrandFranchise(brand);
    expect(result.licensingTerms.royalty_rate).toBeTruthy();
    expect(result.licensingTerms.territory_rights).toBeTruthy();
    expect(result.licensingTerms.initial_franchise_fee).toBeTruthy();
    expect(result.licensingTerms.non_compete).toBeTruthy();
  });

  it('operations manual outline has at least 12 chapters', () => {
    const result = generateBrandFranchise(brand);
    expect(result.operationsManualOutline.length).toBeGreaterThanOrEqual(12);
  });

  it('operations manual chapter 1 includes brand name', () => {
    const result = generateBrandFranchise(brand);
    expect(result.operationsManualOutline[0]).toContain('TestBrand');
  });

  it('brand protection policies has at least 7 items', () => {
    const result = generateBrandFranchise(brand);
    expect(result.brandProtectionPolicies.length).toBeGreaterThanOrEqual(7);
  });

  it('franchisee support has at least 5 items', () => {
    const result = generateBrandFranchise(brand);
    expect(result.franchiseeSupport.length).toBeGreaterThanOrEqual(5);
  });

  it('brief summary contains brand name and tagline', () => {
    const result = generateBrandFranchise(brand);
    expect(result.franchiseBriefSummary).toContain('TestBrand');
    expect(result.franchiseBriefSummary).toContain('Grow Together');
  });

  it('bold style returns more onboarding items and energetic tone', () => {
    const boldBrand = { ...brand, style: 'bold' as const };
    const result = generateBrandFranchise(boldBrand);
    expect(result.onboardingProgramme.length).toBeGreaterThanOrEqual(4);
    expect(result.standardsTone.toLowerCase()).toContain('energetic');
  });

  it('elegant style returns premium standards tone', () => {
    const elegantBrand = { ...brand, style: 'elegant' as const };
    const result = generateBrandFranchise(elegantBrand);
    expect(result.standardsTone.toLowerCase()).toContain('premium');
    expect(result.approvedSupplierFocus.toLowerCase()).toContain('premium');
  });

  it('tech style adds digital chapters to operations manual', () => {
    const techBrand = { ...brand, style: 'tech' as const };
    const result = generateBrandFranchise(techBrand);
    const hasDigitalChapter = result.operationsManualOutline.some((c) =>
      c.toLowerCase().includes('digital')
    );
    expect(hasDigitalChapter).toBe(true);
  });

  it('organic style adds sustainability chapters and certified supplier focus', () => {
    const organicBrand = { ...brand, style: 'organic' as const };
    const result = generateBrandFranchise(organicBrand);
    const hasSustainabilityChapter = result.operationsManualOutline.some((c) =>
      c.toLowerCase().includes('sustainability')
    );
    expect(hasSustainabilityChapter).toBe(true);
    expect(result.approvedSupplierFocus.toLowerCase()).toContain('certified');
  });

  it('corporate style adds legal/regulatory chapter', () => {
    const corporateBrand = { ...brand, style: 'corporate' as const };
    const result = generateBrandFranchise(corporateBrand);
    const hasLegalChapter = result.operationsManualOutline.some((c) =>
      c.toLowerCase().includes('legal')
    );
    expect(hasLegalChapter).toBe(true);
    expect(result.complianceRequirements.length).toBeGreaterThanOrEqual(5);
  });

  it('unknown style falls back to minimal standards tone', () => {
    const unknownBrand = { ...brand, style: 'unknown' as never };
    const result = generateBrandFranchise(unknownBrand);
    expect(result.standardsTone).toBeTruthy();
    expect(result.onboardingProgramme.length).toBeGreaterThanOrEqual(3);
  });

  it('brand without tagline still produces valid summary', () => {
    const noTaglineBrand = { ...brand, tagline: undefined };
    const result = generateBrandFranchise(noTaglineBrand);
    expect(result.franchiseBriefSummary).toContain('TestBrand');
    expect(result.franchiseBriefSummary).not.toContain('undefined');
  });
});
