import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandTraining } from '../../lib/branding-core/generators/brand-training.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'Test Brand',
    tagline: 'Learn and grow together',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandTraining', () => {
  const brand = createTestBrand();

  it('returns all required fields', () => {
    const result = generateBrandTraining(brand);
    expect(result.trainingCulture).toBeTruthy();
    expect(Array.isArray(result.deliveryFormats)).toBe(true);
    expect(result.assessmentApproach).toBeTruthy();
    expect(result.learningCadence).toBeTruthy();
    expect(Array.isArray(result.knowledgeBaseStructure)).toBe(true);
    expect(Array.isArray(result.onboardingModules)).toBe(true);
    expect(Array.isArray(result.learningPaths)).toBe(true);
    expect(Array.isArray(result.brandChampionProgramme)).toBe(true);
    expect(result.trainingBriefSummary).toBeTruthy();
  });

  it('returns at least 2 delivery formats', () => {
    const result = generateBrandTraining(brand);
    expect(result.deliveryFormats.length).toBeGreaterThanOrEqual(2);
  });

  it('returns at least 4 knowledge base items', () => {
    const result = generateBrandTraining(brand);
    expect(result.knowledgeBaseStructure.length).toBeGreaterThanOrEqual(4);
  });

  it('returns exactly 5 onboarding modules', () => {
    const result = generateBrandTraining(brand);
    expect(result.onboardingModules).toHaveLength(5);
  });

  it('each onboarding module has required fields', () => {
    const result = generateBrandTraining(brand);
    for (const module of result.onboardingModules) {
      expect(module.title).toBeTruthy();
      expect(module.duration).toBeTruthy();
      expect(module.format).toBeTruthy();
      expect(Array.isArray(module.objectives)).toBe(true);
      expect(module.objectives.length).toBeGreaterThanOrEqual(2);
      expect(module.assessmentMethod).toBeTruthy();
    }
  });

  it('returns exactly 4 learning paths', () => {
    const result = generateBrandTraining(brand);
    expect(result.learningPaths).toHaveLength(4);
  });

  it('each learning path has required fields', () => {
    const result = generateBrandTraining(brand);
    for (const path of result.learningPaths) {
      expect(path.role).toBeTruthy();
      expect(path.durationWeeks).toBeGreaterThan(0);
      expect(Array.isArray(path.phases)).toBe(true);
      expect(path.phases.length).toBeGreaterThanOrEqual(2);
      expect(Array.isArray(path.keyResources)).toBe(true);
    }
  });

  it('brand champion programme has at least 5 items', () => {
    const result = generateBrandTraining(brand);
    expect(result.brandChampionProgramme.length).toBeGreaterThanOrEqual(5);
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandTraining(brand);
    expect(result.trainingBriefSummary).toContain('Test Brand');
  });

  it('brief summary contains tagline when present', () => {
    const result = generateBrandTraining(brand);
    expect(result.trainingBriefSummary).toContain('Learn and grow together');
  });

  it('tech style uses developer-focused delivery', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const result = generateBrandTraining(techBrand);
    const formats = result.deliveryFormats.join(' ');
    expect(formats.toLowerCase()).toMatch(/pair|tech|code|lab/);
  });

  it('corporate style uses instructor-led and compliance training', () => {
    const corpBrand = createTestBrand({ style: 'corporate' });
    const result = generateBrandTraining(corpBrand);
    const formats = result.deliveryFormats.join(' ');
    expect(formats.toLowerCase()).toMatch(/instructor|compliance|certification/);
  });

  it('playful style uses gamified formats', () => {
    const playfulBrand = createTestBrand({ style: 'playful' });
    const result = generateBrandTraining(playfulBrand);
    const formats = result.deliveryFormats.join(' ');
    expect(formats.toLowerCase()).toMatch(/gamif|quiz|badge/);
  });

  it('elegant style uses masterclass and coaching', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const result = generateBrandTraining(elegantBrand);
    const formats = result.deliveryFormats.join(' ').toLowerCase();
    expect(formats).toMatch(/masterclass|coaching/);
  });

  it('unknown style falls back gracefully', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandTraining(unknownBrand);
    expect(result.trainingCulture).toBeTruthy();
    expect(result.onboardingModules.length).toBeGreaterThan(0);
  });

  it('brand without tagline handles gracefully in summary', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const result = generateBrandTraining(noTagBrand);
    expect(result.trainingBriefSummary).not.toContain('undefined');
    expect(result.trainingBriefSummary).toContain('Test Brand');
  });
});
