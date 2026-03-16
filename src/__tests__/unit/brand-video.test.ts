import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandVideo } from '../../lib/branding-core/generators/brand-video.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides?: Partial<BrandIdentity>): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TestBrand',
    tagline: 'Great products, great people',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandVideo', () => {
  const brand = createTestBrand();

  it('returns all required fields', () => {
    const result = generateBrandVideo(brand);
    expect(result.videoAesthetic).toBeTruthy();
    expect(result.pacing).toBeTruthy();
    expect(result.recommendedFormats).toBeDefined();
    expect(result.colorGrade).toBeTruthy();
    expect(result.typographyMotion).toBeTruthy();
    expect(result.musicDirection).toBeDefined();
    expect(result.callToActionApproach).toBeTruthy();
    expect(result.productionNotes).toBeDefined();
    expect(result.videoBriefSummary).toBeTruthy();
  });

  it('returns at least 5 recommended formats', () => {
    const result = generateBrandVideo(brand);
    expect(result.recommendedFormats.length).toBeGreaterThanOrEqual(5);
  });

  it('returns at least 3 music direction items', () => {
    const result = generateBrandVideo(brand);
    expect(result.musicDirection.length).toBeGreaterThanOrEqual(3);
  });

  it('returns 4 production note categories', () => {
    const result = generateBrandVideo(brand);
    expect(result.productionNotes.length).toBe(4);
  });

  it('each production note has category and notes array', () => {
    const result = generateBrandVideo(brand);
    result.productionNotes.forEach((note) => {
      expect(note.category).toBeTruthy();
      expect(Array.isArray(note.notes)).toBe(true);
      expect(note.notes.length).toBeGreaterThan(0);
    });
  });

  it('production notes include Pre-production and Post-production sections', () => {
    const result = generateBrandVideo(brand);
    const categories = result.productionNotes.map((n) => n.category);
    expect(categories).toContain('Pre-production');
    expect(categories).toContain('Post-production');
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandVideo(brand);
    expect(result.videoBriefSummary).toContain('TestBrand');
  });

  it('brief summary contains tagline when present', () => {
    const result = generateBrandVideo(brand);
    expect(result.videoBriefSummary).toContain('Great products, great people');
  });

  it('brief summary omits tagline section when absent', () => {
    const brandNoTag = createTestBrand({ tagline: undefined });
    const result = generateBrandVideo(brandNoTag);
    expect(result.videoBriefSummary).not.toContain('undefined');
    expect(result.videoBriefSummary).toContain('TestBrand');
  });

  it('bold style returns high-energy aesthetic', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const result = generateBrandVideo(boldBrand);
    expect(result.videoAesthetic.toLowerCase()).toContain('high-energy');
  });

  it('tech style returns dark mode / futuristic aesthetic', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const result = generateBrandVideo(techBrand);
    expect(result.colorGrade.toLowerCase()).toContain('dark mode');
  });

  it('elegant style returns cinematic/slow pacing', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const result = generateBrandVideo(elegantBrand);
    expect(result.pacing.toLowerCase()).toMatch(/slow|long takes/);
  });

  it('organic style returns nature/documentary references', () => {
    const organicBrand = createTestBrand({ style: 'organic' });
    const result = generateBrandVideo(organicBrand);
    expect(result.videoAesthetic.toLowerCase()).toContain('natural');
  });

  it('retro style returns vintage references', () => {
    const retroBrand = createTestBrand({ style: 'retro' });
    const result = generateBrandVideo(retroBrand);
    expect(result.colorGrade.toLowerCase()).toContain('vintage');
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandVideo(unknownBrand);
    expect(result.videoAesthetic).toBeTruthy();
    expect(result.pacing).toBeTruthy();
  });
});
