import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandEcommerce } from '../../lib/branding-core/generators/brand-ecommerce.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand-001',
    name: 'ShopFlow',
    tagline: 'Commerce made effortless',
    industry: 'ecommerce retail',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandEcommerce', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandEcommerce(brand);
    expect(result.storeConcept).toBeTruthy();
    expect(result.productPageLayout).toBeInstanceOf(Array);
    expect(result.checkoutPrinciples).toBeInstanceOf(Array);
    expect(result.merchandisingStrategy).toBeInstanceOf(Array);
    expect(result.trustSignals).toBeInstanceOf(Array);
    expect(result.seoGuidelines).toBeInstanceOf(Array);
    expect(result.accessibilityGuidelines).toBeInstanceOf(Array);
    expect(result.ecommerceBriefSummary).toBeTruthy();
  });

  it('returns at least 5 product page layout items for minimal style', () => {
    const brand = createTestBrand({ style: 'minimal' });
    const result = generateBrandEcommerce(brand);
    expect(result.productPageLayout.length).toBeGreaterThanOrEqual(5);
  });

  it('returns at least 5 checkout principles', () => {
    const brand = createTestBrand();
    const result = generateBrandEcommerce(brand);
    expect(result.checkoutPrinciples.length).toBeGreaterThanOrEqual(5);
  });

  it('returns at least 3 merchandising strategy items', () => {
    const brand = createTestBrand();
    const result = generateBrandEcommerce(brand);
    expect(result.merchandisingStrategy.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 trust signals', () => {
    const brand = createTestBrand();
    const result = generateBrandEcommerce(brand);
    expect(result.trustSignals.length).toBeGreaterThanOrEqual(3);
  });

  it('returns 8 SEO guidelines', () => {
    const brand = createTestBrand();
    const result = generateBrandEcommerce(brand);
    expect(result.seoGuidelines).toHaveLength(8);
  });

  it('SEO guidelines mention brand name', () => {
    const brand = createTestBrand();
    const result = generateBrandEcommerce(brand);
    const hasName = result.seoGuidelines.some((g) => g.includes('ShopFlow'));
    expect(hasName).toBe(true);
  });

  it('returns 8 accessibility guidelines', () => {
    const brand = createTestBrand();
    const result = generateBrandEcommerce(brand);
    expect(result.accessibilityGuidelines).toHaveLength(8);
  });

  it('brief summary contains brand name and tagline', () => {
    const brand = createTestBrand();
    const result = generateBrandEcommerce(brand);
    expect(result.ecommerceBriefSummary).toContain('ShopFlow');
    expect(result.ecommerceBriefSummary).toContain('Commerce made effortless');
  });

  it('brief summary still works without tagline', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandEcommerce(brand);
    expect(result.ecommerceBriefSummary).toContain('ShopFlow');
    expect(result.ecommerceBriefSummary).not.toContain('undefined');
  });

  it('bold style uses full-bleed hero concept', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandEcommerce(brand);
    expect(result.storeConcept.toLowerCase()).toContain('full-bleed');
  });

  it('elegant style features editorial or luxury framing', () => {
    const brand = createTestBrand({ style: 'elegant' });
    const result = generateBrandEcommerce(brand);
    expect(result.storeConcept.toLowerCase()).toMatch(/luxury|editorial|premium/);
  });

  it('tech style surfaces technical specs', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandEcommerce(brand);
    const techLayout = result.productPageLayout.some(
      (item) =>
        item.toLowerCase().includes('spec') ||
        item.toLowerCase().includes('sdk') ||
        item.toLowerCase().includes('technical')
    );
    expect(techLayout).toBe(true);
  });

  it('corporate style includes PO/invoice support in checkout', () => {
    const brand = createTestBrand({ style: 'corporate' });
    const result = generateBrandEcommerce(brand);
    const hasPo = result.checkoutPrinciples.some(
      (p) =>
        p.toLowerCase().includes('po') ||
        p.toLowerCase().includes('invoice') ||
        p.toLowerCase().includes('approver')
    );
    expect(hasPo).toBe(true);
  });

  it('organic style references certifications or provenance', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandEcommerce(brand);
    const hasCert = result.trustSignals.some(
      (s) =>
        s.toLowerCase().includes('certif') ||
        s.toLowerCase().includes('organic') ||
        s.toLowerCase().includes('fair')
    );
    expect(hasCert).toBe(true);
  });

  it('unknown style falls back to minimal', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandEcommerce(brand);
    const minimalBrand = createTestBrand({ style: 'minimal' });
    const minimalResult = generateBrandEcommerce(minimalBrand);
    expect(result.storeConcept).toBe(minimalResult.storeConcept);
  });
});
