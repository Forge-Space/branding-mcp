import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandLoyalty } from '../../lib/branding-core/generators/brand-loyalty.js';
import type { BrandIdentity, BrandStyle } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TestBrand',
    tagline: 'Test tagline',
    industry: 'technology',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandLoyalty', () => {
  const brand = createTestBrand();
  const result = generateBrandLoyalty(brand);

  it('returns all required fields', () => {
    expect(result.programApproach).toBeTruthy();
    expect(result.tiers).toBeInstanceOf(Array);
    expect(result.tierBenefits).toBeInstanceOf(Array);
    expect(result.earnMechanisms).toBeInstanceOf(Array);
    expect(result.redeemOptions).toBeInstanceOf(Array);
    expect(result.engagementTactics).toBeInstanceOf(Array);
    expect(result.expiryPolicy).toBeTruthy();
    expect(result.analyticsKpis).toBeDefined();
    expect(result.loyaltyBriefSummary).toBeTruthy();
  });

  it('returns at least 3 tiers', () => {
    expect(result.tiers.length).toBeGreaterThanOrEqual(3);
  });

  it('tierBenefits matches tiers count', () => {
    expect(result.tierBenefits.length).toBe(result.tiers.length);
  });

  it('each tierBenefit has tier and benefits array', () => {
    for (const tb of result.tierBenefits) {
      expect(tb.tier).toBeTruthy();
      expect(tb.benefits).toBeInstanceOf(Array);
      expect(tb.benefits.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('returns at least 3 earn mechanisms', () => {
    expect(result.earnMechanisms.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 2 redeem options', () => {
    expect(result.redeemOptions.length).toBeGreaterThanOrEqual(2);
  });

  it('returns at least 3 engagement tactics', () => {
    expect(result.engagementTactics.length).toBeGreaterThanOrEqual(3);
  });

  it('returns 6 analytics KPIs', () => {
    expect(Object.keys(result.analyticsKpis).length).toBe(6);
  });

  it('brief summary contains brand name', () => {
    expect(result.loyaltyBriefSummary).toContain('TestBrand');
  });

  it('brief summary contains tagline when present', () => {
    expect(result.loyaltyBriefSummary).toContain('Test tagline');
  });

  it('tech style uses tech-specific tiers', () => {
    expect(result.tiers).toContain('Contributor');
  });

  it('minimal style uses simple tiers', () => {
    const minimal = generateBrandLoyalty(createTestBrand({ style: 'minimal' }));
    expect(minimal.tiers).toContain('Member');
  });

  it('elegant style points never expire', () => {
    const elegant = generateBrandLoyalty(createTestBrand({ style: 'elegant' }));
    expect(elegant.expiryPolicy.toLowerCase()).toContain('never expire');
  });

  it('bold style has 4 tiers', () => {
    const bold = generateBrandLoyalty(createTestBrand({ style: 'bold' }));
    expect(bold.tiers.length).toBe(4);
  });

  it('organic style has eco-related earn mechanisms', () => {
    const organic = generateBrandLoyalty(createTestBrand({ style: 'organic' }));
    const hasEco = organic.earnMechanisms.some(
      (m) =>
        m.toLowerCase().includes('eco') ||
        m.toLowerCase().includes('refill') ||
        m.toLowerCase().includes('impact')
    );
    expect(hasEco).toBe(true);
  });

  it('falls back to minimal for unknown style', () => {
    const unknown = generateBrandLoyalty(createTestBrand({ style: 'unknown' as BrandStyle }));
    expect(unknown.tiers).toContain('Member');
  });

  it('works without tagline', () => {
    const noTag = generateBrandLoyalty(createTestBrand({ tagline: undefined }));
    expect(noTag.loyaltyBriefSummary).toContain('TestBrand');
    expect(noTag.loyaltyBriefSummary).not.toMatch(/undefined/);
  });
});
