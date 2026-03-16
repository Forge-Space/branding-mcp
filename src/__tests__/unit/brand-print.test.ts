import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandPrint } from '../../lib/branding-core/generators/brand-print.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

const createTestBrand = (overrides: Partial<BrandIdentity> = {}): BrandIdentity => ({
  id: 'test-brand',
  name: 'TestCorp',
  tagline: 'Built for clarity',
  industry: 'technology software',
  style: 'minimal',
  colors,
  typography,
  spacing,
  createdAt: new Date().toISOString(),
  ...overrides,
});

describe('generateBrandPrint', () => {
  it('returns all required top-level fields', () => {
    const result = generateBrandPrint(createTestBrand());
    expect(result.gridSystem).toBeTruthy();
    expect(result.typographyHierarchy).toBeTruthy();
    expect(result.paperStocks).toBeInstanceOf(Array);
    expect(result.printFinishes).toBeInstanceOf(Array);
    expect(result.colourApproach).toBeTruthy();
    expect(result.imageryGuidelines).toBeTruthy();
    expect(result.templates).toBeInstanceOf(Array);
    expect(result.colourSpec).toBeTruthy();
    expect(result.accessibility).toBeTruthy();
    expect(result.productionNotes).toBeInstanceOf(Array);
    expect(result.printBriefSummary).toBeTruthy();
  });

  it('returns 5 print templates', () => {
    const result = generateBrandPrint(createTestBrand());
    expect(result.templates).toHaveLength(5);
  });

  it('each template has required fields', () => {
    const result = generateBrandPrint(createTestBrand());
    for (const t of result.templates) {
      expect(t.name).toBeTruthy();
      expect(t.dimensions).toBeTruthy();
      expect(t.bleed).toBeTruthy();
      expect(t.safeZone).toBeTruthy();
      expect(typeof t.columns).toBe('number');
      expect(t.margins).toBeTruthy();
      expect(t.primaryUse).toBeTruthy();
    }
  });

  it('colourSpec contains brand primary colour', () => {
    const brand = createTestBrand();
    const result = generateBrandPrint(brand);
    expect(result.colourSpec.primaryColour).toContain(brand.colors.primary.hex);
  });

  it('colourSpec has 7 keys', () => {
    const result = generateBrandPrint(createTestBrand());
    expect(Object.keys(result.colourSpec)).toHaveLength(7);
  });

  it('accessibility has all required fields', () => {
    const result = generateBrandPrint(createTestBrand());
    expect(result.accessibility.minimumFontSize).toBeTruthy();
    expect(result.accessibility.bodyTextMinContrast).toBe('4.5:1');
    expect(result.accessibility.headlineMinContrast).toBe('3:1');
    expect(result.accessibility.notes).toBeInstanceOf(Array);
  });

  it('productionNotes has at least 6 items', () => {
    const result = generateBrandPrint(createTestBrand());
    expect(result.productionNotes.length).toBeGreaterThanOrEqual(6);
  });

  it('printBriefSummary mentions brand name', () => {
    const result = generateBrandPrint(createTestBrand({ name: 'AcmeCorp' }));
    expect(result.printBriefSummary).toContain('AcmeCorp');
  });

  it('bold style uses high-impact grid', () => {
    const result = generateBrandPrint(createTestBrand({ style: 'bold' }));
    expect(result.gridSystem).toContain('asymmetric');
  });

  it('elegant style uses editorial grid', () => {
    const result = generateBrandPrint(createTestBrand({ style: 'elegant' }));
    expect(result.gridSystem).toContain('editorial');
  });

  it('playful style uses irregular layout', () => {
    const result = generateBrandPrint(createTestBrand({ style: 'playful' }));
    expect(result.gridSystem).toContain('irregular');
  });

  it('organic style uses eco-friendly paper', () => {
    const result = generateBrandPrint(createTestBrand({ style: 'organic' }));
    expect(result.paperStocks[0]).toContain('recycled');
  });

  it('retro style uses vintage finishes', () => {
    const result = generateBrandPrint(createTestBrand({ style: 'retro' }));
    expect(result.printFinishes).toContain('Letterpress impression');
  });

  it('tech style uses minimal font size note', () => {
    const result = generateBrandPrint(createTestBrand({ style: 'tech' }));
    expect(result.accessibility.minimumFontSize).toContain('7pt');
  });

  it('unknown style falls back to minimal', () => {
    const result = generateBrandPrint(createTestBrand({ style: 'unknown' as never }));
    expect(result.gridSystem).toBeTruthy();
    expect(result.templates).toHaveLength(5);
  });
});
