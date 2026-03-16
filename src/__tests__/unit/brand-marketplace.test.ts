import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandMarketplace } from '../../lib/branding-core/generators/brand-marketplace.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#2563EB', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

const brand: BrandIdentity = {
  id: 'test-marketplace',
  name: 'MarketBrand',
  tagline: 'Sell everywhere.',
  industry: 'retail ecommerce',
  style: 'bold',
  colors,
  typography,
  spacing,
  createdAt: new Date().toISOString(),
};

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return { ...brand, ...overrides };
}

describe('generateBrandMarketplace', () => {
  it('returns all required fields', () => {
    const result = generateBrandMarketplace(brand);
    expect(result.marketplaceApproach).toBeTruthy();
    expect(Array.isArray(result.primaryMarketplaces)).toBe(true);
    expect(Array.isArray(result.listingPrinciples)).toBe(true);
    expect(Array.isArray(result.advertisingApproach)).toBe(true);
    expect(Array.isArray(result.reviewStrategy)).toBe(true);
    expect(result.pricingApproach).toBeTruthy();
    expect(Array.isArray(result.fulfilmentOptions)).toBe(true);
    expect(Array.isArray(result.complianceChecklist)).toBe(true);
    expect(typeof result.successMetrics).toBe('object');
    expect(result.marketplaceBriefSummary).toBeTruthy();
  });

  it('has at least 3 primary marketplaces', () => {
    const result = generateBrandMarketplace(brand);
    expect(result.primaryMarketplaces.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 4 listing principles', () => {
    const result = generateBrandMarketplace(brand);
    expect(result.listingPrinciples.length).toBeGreaterThanOrEqual(4);
  });

  it('has at least 3 advertising approaches', () => {
    const result = generateBrandMarketplace(brand);
    expect(result.advertisingApproach.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 5 fulfilment options', () => {
    const result = generateBrandMarketplace(brand);
    expect(result.fulfilmentOptions.length).toBeGreaterThanOrEqual(5);
  });

  it('has at least 6 compliance checklist items', () => {
    const result = generateBrandMarketplace(brand);
    expect(result.complianceChecklist.length).toBeGreaterThanOrEqual(6);
  });

  it('includes brand name in compliance checklist', () => {
    const result = generateBrandMarketplace(brand);
    const hasName = result.complianceChecklist.some((item) => item.includes(brand.name));
    expect(hasName).toBe(true);
  });

  it('includes at least 6 success metrics', () => {
    const result = generateBrandMarketplace(brand);
    expect(Object.keys(result.successMetrics).length).toBeGreaterThanOrEqual(6);
  });

  it('brief summary contains brand name and tagline', () => {
    const result = generateBrandMarketplace(brand);
    expect(result.marketplaceBriefSummary).toContain(brand.name);
    expect(result.marketplaceBriefSummary).toContain(brand.tagline);
  });

  it('bold style includes Amazon and aggressive platforms', () => {
    const result = generateBrandMarketplace(createTestBrand({ style: 'bold' }));
    expect(result.primaryMarketplaces.some((p) => p.includes('Amazon'))).toBe(true);
  });

  it('tech style includes AWS Marketplace and developer-first platforms', () => {
    const result = generateBrandMarketplace(createTestBrand({ style: 'tech' }));
    expect(result.primaryMarketplaces.some((p) => p.includes('AWS Marketplace'))).toBe(true);
    expect(result.successMetrics).toHaveProperty('trial_to_paid_rate');
  });

  it('organic style includes ethical platforms', () => {
    const result = generateBrandMarketplace(createTestBrand({ style: 'organic' }));
    expect(
      result.primaryMarketplaces.some((p) => p.includes('Etsy') || p.includes('EarthHero'))
    ).toBe(true);
  });

  it('elegant style focuses on premium platforms', () => {
    const result = generateBrandMarketplace(createTestBrand({ style: 'elegant' }));
    expect(
      result.primaryMarketplaces.some((p) => p.includes('Farfetch') || p.includes('Net-a-Porter'))
    ).toBe(true);
  });

  it('corporate style includes enterprise channels and extra compliance', () => {
    const result = generateBrandMarketplace(createTestBrand({ style: 'corporate' }));
    expect(
      result.primaryMarketplaces.some(
        (p) => p.includes('Alibaba') || p.includes('ThomasNet') || p.includes('AWS')
      )
    ).toBe(true);
    expect(result.successMetrics).toHaveProperty('rfp_win_rate');
  });

  it('unknown style falls back to minimal', () => {
    const result = generateBrandMarketplace(createTestBrand({ style: 'unknown' as never }));
    expect(result.marketplaceApproach).toBeTruthy();
    expect(result.primaryMarketplaces.length).toBeGreaterThan(0);
  });

  it('brand without tagline still produces valid summary', () => {
    const result = generateBrandMarketplace(createTestBrand({ tagline: undefined }));
    expect(result.marketplaceBriefSummary).toContain(brand.name);
    expect(result.marketplaceBriefSummary).not.toContain('undefined');
  });
});
