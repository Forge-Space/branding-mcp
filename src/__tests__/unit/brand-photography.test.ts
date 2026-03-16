import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
  generateBrandPhotography,
} from '../../lib/branding-core/index.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Test Brand',
    tagline: 'Innovation for all',
    industry: 'tech startup',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandPhotography', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandPhotography(brand);
    expect(result.styleGuide).toBeDefined();
    expect(result.moodBoardKeywords).toBeDefined();
    expect(result.useCaseGuidelines).toBeDefined();
    expect(result.technicalRequirements).toBeDefined();
    expect(result.shootBriefSummary).toBeDefined();
  });

  it('styleGuide has all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandPhotography(brand);
    const { styleGuide } = result;
    expect(typeof styleGuide.aesthetic).toBe('string');
    expect(typeof styleGuide.lighting).toBe('string');
    expect(typeof styleGuide.mood).toBe('string');
    expect(Array.isArray(styleGuide.subjects)).toBe(true);
    expect(styleGuide.subjects.length).toBeGreaterThan(0);
    expect(Array.isArray(styleGuide.compositionRules)).toBe(true);
    expect(styleGuide.compositionRules.length).toBeGreaterThan(0);
    expect(styleGuide.colorTreatment).toBeDefined();
    expect(styleGuide.doAndAvoid).toBeDefined();
  });

  it('colorTreatment has all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandPhotography(brand);
    const { colorTreatment } = result.styleGuide;
    expect(typeof colorTreatment.palette).toBe('string');
    expect(typeof colorTreatment.saturation).toBe('string');
    expect(typeof colorTreatment.contrast).toBe('string');
    expect(typeof colorTreatment.grading).toBe('string');
    expect(Array.isArray(colorTreatment.filters)).toBe(true);
  });

  it('doAndAvoid has do and avoid arrays', () => {
    const brand = createTestBrand();
    const result = generateBrandPhotography(brand);
    const { doAndAvoid } = result.styleGuide;
    expect(Array.isArray(doAndAvoid.do)).toBe(true);
    expect(doAndAvoid.do.length).toBeGreaterThan(0);
    expect(Array.isArray(doAndAvoid.avoid)).toBe(true);
    expect(doAndAvoid.avoid.length).toBeGreaterThan(0);
  });

  it('returns 5 moodBoardKeywords', () => {
    const brand = createTestBrand();
    const result = generateBrandPhotography(brand);
    expect(result.moodBoardKeywords).toHaveLength(5);
    result.moodBoardKeywords.forEach((kw) => expect(typeof kw).toBe('string'));
  });

  it('useCaseGuidelines has all 6 use cases', () => {
    const brand = createTestBrand();
    const result = generateBrandPhotography(brand);
    const useCases = result.useCaseGuidelines;
    expect(useCases.website_hero).toBeDefined();
    expect(useCases.social_media).toBeDefined();
    expect(useCases.email_header).toBeDefined();
    expect(useCases.print_materials).toBeDefined();
    expect(useCases.presentations).toBeDefined();
    expect(useCases.product_catalog).toBeDefined();
  });

  it('technicalRequirements includes key specs', () => {
    const brand = createTestBrand();
    const result = generateBrandPhotography(brand);
    const { technicalRequirements } = result;
    expect(technicalRequirements.resolution).toBeDefined();
    expect(technicalRequirements.formats).toBeDefined();
    expect(technicalRequirements.aspect_ratios).toBeDefined();
    expect(technicalRequirements.color_space).toBeDefined();
    expect(technicalRequirements.minimum_width).toBeDefined();
    expect(technicalRequirements.delivery).toBeDefined();
  });

  it('shootBriefSummary contains brand name', () => {
    const brand = createTestBrand({ name: 'Acme Corp' });
    const result = generateBrandPhotography(brand);
    expect(result.shootBriefSummary).toContain('Acme Corp');
  });

  it('bold style produces high-contrast aesthetic', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandPhotography(brand);
    expect(result.styleGuide.aesthetic.toLowerCase()).toContain('dramatic');
    expect(result.styleGuide.colorTreatment.saturation.toLowerCase()).toContain('saturation');
  });

  it('playful style produces vibrant color treatment', () => {
    const brand = createTestBrand({ style: 'playful' });
    const result = generateBrandPhotography(brand);
    expect(result.styleGuide.aesthetic.toLowerCase()).toContain('vibrant');
    expect(result.moodBoardKeywords).toContain('joy');
  });

  it('elegant style produces refined aesthetic', () => {
    const brand = createTestBrand({ style: 'elegant' });
    const result = generateBrandPhotography(brand);
    expect(result.styleGuide.aesthetic.toLowerCase()).toContain('refined');
    expect(result.moodBoardKeywords).toContain('luxury');
  });

  it('organic style produces natural keywords', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandPhotography(brand);
    expect(result.moodBoardKeywords).toContain('natural');
  });

  it('retro style produces nostalgic keywords', () => {
    const brand = createTestBrand({ style: 'retro' });
    const result = generateBrandPhotography(brand);
    expect(result.moodBoardKeywords).toContain('nostalgic');
  });

  it('compositionRules have rule and example fields', () => {
    const brand = createTestBrand();
    const result = generateBrandPhotography(brand);
    result.styleGuide.compositionRules.forEach((rule) => {
      expect(typeof rule.rule).toBe('string');
      expect(typeof rule.example).toBe('string');
    });
  });

  it('falls back to minimal style for unknown style', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandPhotography(brand);
    expect(result.styleGuide.aesthetic).toBe(
      'Clean, uncluttered compositions with generous negative space'
    );
    expect(result.moodBoardKeywords).toContain('serene');
  });
});
