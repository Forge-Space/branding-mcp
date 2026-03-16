import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import {
  generateSvgLogo,
  defaultLogoConfig,
} from '../../lib/branding-core/generators/logo-generator.js';
import { generateBrandPackaging } from '../../lib/branding-core/generators/brand-packaging.js';
import type { BrandIdentity, BrandStyle } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  const logo = generateSvgLogo(defaultLogoConfig('TestCo', '#3B82F6'));
  return {
    id: 'test-001',
    name: 'TestCo',
    tagline: 'Build better.',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    logo,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandPackaging', () => {
  const brand = createTestBrand();

  it('returns all required top-level fields', () => {
    const result = generateBrandPackaging(brand);
    expect(result.formLanguage).toBeTruthy();
    expect(result.materials).toBeInstanceOf(Array);
    expect(result.colorApproach).toBeTruthy();
    expect(result.colorPaletteSummary).toBeInstanceOf(Array);
    expect(result.typographyApproach).toBeTruthy();
    expect(result.brandingElements).toBeInstanceOf(Array);
    expect(result.formats).toBeInstanceOf(Array);
    expect(result.printSpecs).toBeTruthy();
    expect(result.legalZones).toBeTruthy();
    expect(result.dilineGuide).toBeTruthy();
    expect(result.sustainability).toBeInstanceOf(Array);
    expect(result.unboxingExperience).toBeTruthy();
    expect(result.packagingBriefSummary).toBeTruthy();
  });

  it('materials has at least 3 entries', () => {
    const result = generateBrandPackaging(brand);
    expect(result.materials.length).toBeGreaterThanOrEqual(3);
  });

  it('formats includes standard packaging types', () => {
    const result = generateBrandPackaging(brand);
    const types = result.formats.map((f) => f.type);
    expect(types).toContain('Primary product box');
    expect(types).toContain('Shipping mailer');
  });

  it('each format has required fields', () => {
    const result = generateBrandPackaging(brand);
    for (const format of result.formats) {
      expect(format.type).toBeTruthy();
      expect(format.primaryUse).toBeTruthy();
      expect(format.sizeGuidance).toBeTruthy();
      expect(format.dieCutNotes).toBeTruthy();
    }
  });

  it('printSpecs has expected keys', () => {
    const result = generateBrandPackaging(brand);
    expect(result.printSpecs.colour_mode).toBeTruthy();
    expect(result.printSpecs.resolution).toBeTruthy();
    expect(result.printSpecs.bleed).toBeTruthy();
    expect(result.printSpecs.barcode_zone).toBeTruthy();
    expect(result.printSpecs.file_format).toBeTruthy();
  });

  it('legalZones has 6 entries', () => {
    const result = generateBrandPackaging(brand);
    expect(Object.keys(result.legalZones).length).toBe(6);
    expect(result.legalZones.barcode_sku).toBeTruthy();
    expect(result.legalZones.recycling_symbols).toBeTruthy();
  });

  it('colorPaletteSummary includes primary hex', () => {
    const result = generateBrandPackaging(brand);
    const allColors = result.colorPaletteSummary.join(' ');
    expect(allColors).toContain(brand.colors.primary.hex);
  });

  it('packagingBriefSummary contains brand name', () => {
    const result = generateBrandPackaging(brand);
    expect(result.packagingBriefSummary).toContain('TestCo');
  });

  it('elegant style includes gift box with magnetic closure', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const result = generateBrandPackaging(elegantBrand);
    const types = result.formats.map((f) => f.type);
    expect(types).toContain('Gift box with magnetic closure');
  });

  it('bold style includes gift box with magnetic closure', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const result = generateBrandPackaging(boldBrand);
    const types = result.formats.map((f) => f.type);
    expect(types).toContain('Gift box with magnetic closure');
  });

  it('playful style has appropriate form language', () => {
    const playfulBrand = createTestBrand({ style: 'playful' });
    const result = generateBrandPackaging(playfulBrand);
    expect(result.formLanguage.toLowerCase()).toContain('rounded');
  });

  it('organic style emphasises sustainability', () => {
    const organicBrand = createTestBrand({ style: 'organic' });
    const result = generateBrandPackaging(organicBrand);
    const sustainText = result.sustainability.join(' ').toLowerCase();
    expect(sustainText).toContain('compostable');
  });

  it('tech style mentions precision or modular', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const result = generateBrandPackaging(techBrand);
    expect(result.formLanguage.toLowerCase()).toMatch(/modular|precision|grid/);
  });

  it('minimal style has minimal number of materials', () => {
    const result = generateBrandPackaging(brand);
    expect(result.materials.length).toBeGreaterThanOrEqual(2);
    expect(result.materials[0]).toBeTruthy();
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as BrandStyle });
    const result = generateBrandPackaging(unknownBrand);
    expect(result.formLanguage).toBeTruthy();
    expect(result.materials.length).toBeGreaterThan(0);
  });
});
