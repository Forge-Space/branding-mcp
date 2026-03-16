import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandAffiliate } from '../../lib/branding-core/generators/brand-affiliate.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#2563EB', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'AffiliateTest',
    tagline: 'Partner with purpose',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandAffiliate', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.programApproach).toBeTruthy();
    expect(result.commissionTiers).toBeDefined();
    expect(result.contentGuidelines).toBeDefined();
    expect(result.recruitmentChannels).toBeDefined();
    expect(result.complianceRequirements).toBeDefined();
    expect(result.paymentStructure).toBeDefined();
    expect(result.trackingTools).toBeDefined();
    expect(result.onboardingSteps).toBeDefined();
    expect(result.affiliateBriefSummary).toBeTruthy();
  });

  it('returns exactly 3 commission tiers', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.commissionTiers).toHaveLength(3);
  });

  it('each commission tier has required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    for (const tier of result.commissionTiers) {
      expect(tier.tier).toBeTruthy();
      expect(tier.commissionRate).toMatch(/%/);
      expect(typeof tier.minimumSales).toBe('number');
      expect(tier.cookieDuration).toBeTruthy();
      expect(tier.paymentThreshold).toBeTruthy();
      expect(tier.benefits.length).toBeGreaterThan(0);
    }
  });

  it('commission tiers are ordered with increasing rates', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    const rates = result.commissionTiers.map((t) => parseInt(t.commissionRate));
    expect(rates[1]).toBeGreaterThan(rates[0]);
    expect(rates[2]).toBeGreaterThan(rates[1]);
  });

  it('returns at least 4 content guidelines', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.contentGuidelines.length).toBeGreaterThanOrEqual(4);
  });

  it('returns at least 3 recruitment channels', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.recruitmentChannels.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 7 compliance requirements', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.complianceRequirements.length).toBeGreaterThanOrEqual(7);
  });

  it('payment structure has required keys', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.paymentStructure.payment_schedule).toBeTruthy();
    expect(result.paymentStructure.payment_methods).toBeTruthy();
    expect(result.paymentStructure.minimum_threshold).toBeTruthy();
    expect(result.paymentStructure.refund_policy).toBeTruthy();
  });

  it('returns 5 tracking tools', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.trackingTools).toHaveLength(5);
  });

  it('returns 7 onboarding steps', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.onboardingSteps).toHaveLength(7);
  });

  it('brief summary contains brand name', () => {
    const brand = createTestBrand();
    const result = generateBrandAffiliate(brand);
    expect(result.affiliateBriefSummary).toContain('AffiliateTest');
  });

  it('brief summary contains tagline when present', () => {
    const brand = createTestBrand({ tagline: 'Partner with purpose' });
    const result = generateBrandAffiliate(brand);
    expect(result.affiliateBriefSummary).toContain('Partner with purpose');
  });

  it('tech style adds API and open-source compliance items', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandAffiliate(brand);
    const hasApiItem = result.complianceRequirements.some((r) => r.toLowerCase().includes('api'));
    expect(hasApiItem).toBe(true);
  });

  it('corporate style uses Net-60 payment schedule', () => {
    const brand = createTestBrand({ style: 'corporate' });
    const result = generateBrandAffiliate(brand);
    expect(result.paymentStructure.payment_schedule).toContain('Net-60');
  });

  it('organic style adds environmental compliance items', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandAffiliate(brand);
    const hasEnvItem = result.complianceRequirements.some(
      (r) => r.toLowerCase().includes('environmental') || r.toLowerCase().includes('sustainab')
    );
    expect(hasEnvItem).toBe(true);
  });

  it('elegant style uses 60-day cookie for Elite tier', () => {
    const brand = createTestBrand({ style: 'elegant' });
    const result = generateBrandAffiliate(brand);
    const elite = result.commissionTiers.find((t) => t.tier === 'Elite');
    expect(elite?.cookieDuration).toBe('60 days');
  });

  it('unknown style falls back to minimal', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandAffiliate(brand);
    expect(result.programApproach).toBeTruthy();
    expect(result.commissionTiers).toHaveLength(3);
  });

  it('brand without tagline produces valid summary', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandAffiliate(brand);
    expect(result.affiliateBriefSummary).not.toMatch(/undefined/);
    expect(result.affiliateBriefSummary).toContain('AffiliateTest');
  });
});
