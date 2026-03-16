import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
} from '../../lib/branding-core/index.js';
import { generateBrandInterior } from '../../lib/branding-core/generators/brand-interior.js';
import type { BrandIdentity, BrandStyle } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Test Brand',
    tagline: 'Design for humans',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandInterior', () => {
  const brand = createTestBrand();

  it('returns all required fields', () => {
    const result = generateBrandInterior(brand);
    expect(result.spaceConcept).toBeTruthy();
    expect(result.materials).toBeDefined();
    expect(result.lightingApproach).toBeTruthy();
    expect(result.colourPaletteApplication).toBeTruthy();
    expect(result.furnitureDirection).toBeTruthy();
    expect(result.signageAndWayfinding).toBeTruthy();
    expect(result.biophilicElements).toBeTruthy();
    expect(result.spaceZones).toBeDefined();
    expect(result.accessibilityNotes).toBeDefined();
    expect(result.sustainabilityFeatures).toBeDefined();
    expect(result.interiorBriefSummary).toBeTruthy();
  });

  it('returns at least 3 materials', () => {
    const result = generateBrandInterior(brand);
    expect(result.materials.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 space zones', () => {
    const result = generateBrandInterior(brand);
    expect(result.spaceZones.length).toBeGreaterThanOrEqual(3);
  });

  it('each space zone has zone, percentage, and purpose fields', () => {
    const result = generateBrandInterior(brand);
    result.spaceZones.forEach((zone) => {
      expect(zone.zone).toBeTruthy();
      expect(zone.percentage).toMatch(/%/);
      expect(zone.purpose).toBeTruthy();
    });
  });

  it('returns at least 6 accessibility notes', () => {
    const result = generateBrandInterior(brand);
    expect(result.accessibilityNotes.length).toBeGreaterThanOrEqual(6);
  });

  it('returns at least 5 sustainability features', () => {
    const result = generateBrandInterior(brand);
    expect(result.sustainabilityFeatures.length).toBeGreaterThanOrEqual(5);
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandInterior(brand);
    expect(result.interiorBriefSummary).toContain('Test Brand');
  });

  it('brief summary contains tagline when present', () => {
    const result = generateBrandInterior(brand);
    expect(result.interiorBriefSummary).toContain('Design for humans');
  });

  it('bold style uses dramatic materials', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const result = generateBrandInterior(boldBrand);
    expect(result.spaceConcept.toLowerCase()).toMatch(/bold|dramatic|impact/i);
    expect(result.materials).toContain('Polished concrete');
  });

  it('elegant style uses premium materials', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const result = generateBrandInterior(elegantBrand);
    expect(result.materials).toContain('Marble');
    expect(result.furnitureDirection.toLowerCase()).toMatch(/bespoke|designer|premium/i);
  });

  it('tech style uses digital integration', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const result = generateBrandInterior(techBrand);
    expect(
      result.materials.some(
        (m) => m.toLowerCase().includes('aluminium') || m.toLowerCase().includes('glass')
      )
    ).toBe(true);
    expect(
      result.sustainabilityFeatures.some(
        (f) => f.toLowerCase().includes('smart') || f.toLowerCase().includes('bms')
      )
    ).toBe(true);
  });

  it('organic style prioritises biophilic elements', () => {
    const organicBrand = createTestBrand({ style: 'organic' });
    const result = generateBrandInterior(organicBrand);
    expect(result.biophilicElements.toLowerCase()).toMatch(/living|green|wall|tree/i);
    expect(result.sustainabilityFeatures.length).toBeGreaterThan(5);
  });

  it('retro style uses vintage materials', () => {
    const retroBrand = createTestBrand({ style: 'retro' });
    const result = generateBrandInterior(retroBrand);
    expect(
      result.materials.some(
        (m) => m.toLowerCase().includes('terrazzo') || m.toLowerCase().includes('brick')
      )
    ).toBe(true);
  });

  it('playful style uses colourful elements', () => {
    const playfulBrand = createTestBrand({ style: 'playful' });
    const result = generateBrandInterior(playfulBrand);
    expect(result.signageAndWayfinding.toLowerCase()).toMatch(/neon|mural|colour/i);
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as BrandStyle });
    const result = generateBrandInterior(unknownBrand);
    expect(result.spaceConcept).toBeTruthy();
    expect(result.materials.length).toBeGreaterThan(0);
  });
});
