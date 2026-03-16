import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandRetail } from '../../lib/branding-core/generators/brand-retail.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#2563EB', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

const createTestBrand = (overrides: Partial<BrandIdentity> = {}): BrandIdentity => ({
  id: 'test-retail-brand',
  name: 'Retail Test Brand',
  tagline: 'Test tagline',
  industry: 'retail',
  style: 'minimal',
  colors,
  typography,
  spacing,
  createdAt: new Date().toISOString(),
  ...overrides,
});

describe('generateBrandRetail', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandRetail(brand);
    expect(result.storeConcept).toBeTruthy();
    expect(result.materials).toBeInstanceOf(Array);
    expect(result.lighting).toBeTruthy();
    expect(result.signageTypes).toBeInstanceOf(Array);
    expect(result.displaySystems).toBeInstanceOf(Array);
    expect(result.customerJourney).toBeInstanceOf(Array);
    expect(result.floorPlanGuidance).toBeDefined();
    expect(result.staffGuidelines).toBeInstanceOf(Array);
    expect(result.windowDisplay).toBeDefined();
    expect(result.digitalIntegration).toBeInstanceOf(Array);
    expect(result.sustainabilityFeatures).toBeInstanceOf(Array);
    expect(result.retailBriefSummary).toBeTruthy();
  });

  it('returns at least 3 materials', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.materials.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 2 signage types', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.signageTypes.length).toBeGreaterThanOrEqual(2);
  });

  it('returns at least 2 display systems', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.displaySystems.length).toBeGreaterThanOrEqual(2);
  });

  it('returns at least 2 customer journey steps', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.customerJourney.length).toBeGreaterThanOrEqual(2);
  });

  it('floor plan has at least 3 zones', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(Object.keys(result.floorPlanGuidance).length).toBeGreaterThanOrEqual(3);
  });

  it('staff guidelines has at least 4 items', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.staffGuidelines.length).toBeGreaterThanOrEqual(4);
  });

  it('window display has all required fields', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.windowDisplay.concept).toBeTruthy();
    expect(result.windowDisplay.changeFrequency).toBeTruthy();
    expect(result.windowDisplay.keyElements).toBeInstanceOf(Array);
    expect(result.windowDisplay.lightingApproach).toBeTruthy();
  });

  it('digital integration has at least 3 items', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.digitalIntegration.length).toBeGreaterThanOrEqual(3);
  });

  it('sustainability features has at least 3 items', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.sustainabilityFeatures.length).toBeGreaterThanOrEqual(3);
  });

  it('retail brief summary contains brand name', () => {
    const result = generateBrandRetail(createTestBrand());
    expect(result.retailBriefSummary).toContain('Retail Test Brand');
  });

  it('bold style returns frequent window change', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandRetail(brand);
    expect(result.windowDisplay.changeFrequency).toBe('Monthly');
  });

  it('elegant style has premium materials', () => {
    const brand = createTestBrand({ style: 'elegant' });
    const result = generateBrandRetail(brand);
    expect(
      result.materials.some(
        (m) =>
          m.toLowerCase().includes('velvet') ||
          m.toLowerCase().includes('marble') ||
          m.toLowerCase().includes('brass')
      )
    ).toBe(true);
  });

  it('tech style includes digital integration features', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandRetail(brand);
    expect(result.storeConcept.toLowerCase()).toContain('digital');
  });

  it('organic style includes natural materials', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandRetail(brand);
    expect(
      result.materials.some(
        (m) =>
          m.toLowerCase().includes('wood') ||
          m.toLowerCase().includes('stone') ||
          m.toLowerCase().includes('natural')
      )
    ).toBe(true);
  });

  it('unknown style falls back to minimal', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandRetail(brand);
    expect(result.storeConcept).toBeTruthy();
    expect(result.materials.length).toBeGreaterThanOrEqual(3);
  });
});
