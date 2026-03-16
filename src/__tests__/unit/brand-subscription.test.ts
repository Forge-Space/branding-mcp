import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandSubscription } from '../../lib/branding-core/generators/brand-subscription.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Acme',
    tagline: 'Ship faster',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandSubscription', () => {
  const brand = createTestBrand();
  const result = generateBrandSubscription(brand);

  it('returns all required fields', () => {
    expect(result.modelApproach).toBeTruthy();
    expect(result.tiers).toBeDefined();
    expect(result.pricingTiers).toBeDefined();
    expect(result.billingCadence).toBeTruthy();
    expect(result.freeTrialOffer).toBeTruthy();
    expect(result.retentionTactics).toBeDefined();
    expect(result.churnPreventionFlow).toBeDefined();
    expect(result.onboardingFlow).toBeDefined();
    expect(result.accessibilityNotes).toBeDefined();
    expect(result.copyTone).toBeTruthy();
    expect(result.subscriptionBriefSummary).toBeTruthy();
  });

  it('tiers is a non-empty array', () => {
    expect(result.tiers.length).toBeGreaterThanOrEqual(2);
  });

  it('pricingTiers matches tiers length', () => {
    expect(result.pricingTiers.length).toBe(result.tiers.length);
  });

  it('each pricingTier has required fields', () => {
    for (const tier of result.pricingTiers) {
      expect(tier.tier).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
      expect(tier.cta).toBeTruthy();
    }
  });

  it('retentionTactics has 3+ items', () => {
    expect(result.retentionTactics.length).toBeGreaterThanOrEqual(3);
  });

  it('churnPreventionFlow has 3+ items', () => {
    expect(result.churnPreventionFlow.length).toBeGreaterThanOrEqual(3);
  });

  it('onboardingFlow has 5+ items', () => {
    expect(result.onboardingFlow.length).toBeGreaterThanOrEqual(5);
  });

  it('accessibilityNotes has 7 WCAG items', () => {
    expect(result.accessibilityNotes.length).toBe(7);
  });

  it('brief summary contains brand name', () => {
    expect(result.subscriptionBriefSummary).toContain('Acme');
  });

  it('brief summary contains tagline', () => {
    expect(result.subscriptionBriefSummary).toContain('Ship faster');
  });

  it('tech style has usage-based billing mention', () => {
    expect(result.billingCadence).toContain('usage-based');
  });

  it('tech style has developer-specific onboarding', () => {
    const hasDevStep = result.onboardingFlow.some((s) => s.toLowerCase().includes('developer'));
    expect(hasDevStep).toBe(true);
  });

  it('bold style has 3 tiers', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const boldResult = generateBrandSubscription(boldBrand);
    expect(boldResult.tiers.length).toBe(3);
  });

  it('elegant style mentions concierge in retention', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const elegantResult = generateBrandSubscription(elegantBrand);
    const hasConcierge = elegantResult.retentionTactics.some((t) =>
      t.toLowerCase().includes('concierge')
    );
    expect(hasConcierge).toBe(true);
  });

  it('corporate style has enterprise billing mention', () => {
    const corpBrand = createTestBrand({ style: 'corporate', industry: 'enterprise software' });
    const corpResult = generateBrandSubscription(corpBrand);
    expect(corpResult.billingCadence.toLowerCase()).toContain('annual');
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const unknownResult = generateBrandSubscription(unknownBrand);
    expect(unknownResult.tiers).toEqual(['Free', 'Pro']);
  });

  it('no-tagline brand works without tagline in summary', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const noTagResult = generateBrandSubscription(noTagBrand);
    expect(noTagResult.subscriptionBriefSummary).not.toContain('undefined');
    expect(noTagResult.subscriptionBriefSummary).toContain('Acme');
  });
});
