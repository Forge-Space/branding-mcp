import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandInnovation } from '../../lib/branding-core/generators/brand-innovation.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Nexus Labs',
    tagline: 'Building tomorrow',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandInnovation', () => {
  const brand = createTestBrand();

  it('returns all required top-level fields', () => {
    const result = generateBrandInnovation(brand);
    expect(result.innovationCulture).toBeTruthy();
    expect(result.focusAreas).toBeDefined();
    expect(result.innovationThemes).toBeDefined();
    expect(result.processFrameworks).toBeDefined();
    expect(result.technologyBets).toBeDefined();
    expect(result.ideationMethods).toBeDefined();
    expect(result.innovationPillars).toBeDefined();
    expect(result.successMetrics).toBeDefined();
    expect(result.innovationCadence).toBeTruthy();
    expect(result.openInnovationApproach).toBeTruthy();
    expect(result.ipStrategy).toBeTruthy();
    expect(result.innovationBriefSummary).toBeTruthy();
  });

  it('returns at least 2 focus areas', () => {
    const result = generateBrandInnovation(brand);
    expect(result.focusAreas.length).toBeGreaterThanOrEqual(2);
  });

  it('returns at least 3 innovation themes', () => {
    const result = generateBrandInnovation(brand);
    expect(result.innovationThemes.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 process frameworks', () => {
    const result = generateBrandInnovation(brand);
    expect(result.processFrameworks.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 technology bets', () => {
    const result = generateBrandInnovation(brand);
    expect(result.technologyBets.length).toBeGreaterThanOrEqual(3);
  });

  it('returns exactly 4 ideation methods with required fields', () => {
    const result = generateBrandInnovation(brand);
    expect(result.ideationMethods.length).toBe(4);
    result.ideationMethods.forEach((m) => {
      expect(m.method).toBeTruthy();
      expect(m.description).toBeTruthy();
      expect(m.bestFor).toBeTruthy();
      expect(m.timeInvestment).toBeTruthy();
    });
  });

  it('returns exactly 3 innovation pillars with required fields', () => {
    const result = generateBrandInnovation(brand);
    expect(result.innovationPillars.length).toBe(3);
    result.innovationPillars.forEach((p) => {
      expect(p.pillar).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.initiatives.length).toBeGreaterThanOrEqual(2);
      expect(p.successCriteria).toBeTruthy();
    });
  });

  it('returns at least 3 success metrics', () => {
    const result = generateBrandInnovation(brand);
    expect(result.successMetrics.length).toBeGreaterThanOrEqual(3);
  });

  it('includes brand name in brief summary', () => {
    const result = generateBrandInnovation(brand);
    expect(result.innovationBriefSummary).toContain('Nexus Labs');
  });

  it('includes tagline in brief summary when present', () => {
    const result = generateBrandInnovation(brand);
    expect(result.innovationBriefSummary).toContain('Building tomorrow');
  });

  it('bold style uses disruptive experimentation culture', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const result = generateBrandInnovation(boldBrand);
    expect(result.innovationCulture.toLowerCase()).toContain('disrupt');
  });

  it('organic style uses regenerative culture', () => {
    const organicBrand = createTestBrand({ style: 'organic' });
    const result = generateBrandInnovation(organicBrand);
    expect(result.innovationCulture.toLowerCase()).toContain('regenerat');
  });

  it('corporate style uses structured innovation culture', () => {
    const corpBrand = createTestBrand({ style: 'corporate' });
    const result = generateBrandInnovation(corpBrand);
    expect(result.innovationCulture.toLowerCase()).toContain('structur');
  });

  it('tech style includes AI/ML in technology bets', () => {
    const result = generateBrandInnovation(brand);
    const betStr = result.technologyBets.join(' ');
    expect(betStr).toMatch(/AI|ML|LLM/i);
  });

  it('falls back to minimal for unknown style', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandInnovation(unknownBrand);
    expect(result.innovationCulture).toBeTruthy();
    expect(result.innovationCulture).toContain('Iterative');
  });

  it('handles brand without tagline gracefully', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const result = generateBrandInnovation(noTagBrand);
    expect(result.innovationBriefSummary).not.toMatch(/undefined/);
    expect(result.innovationBriefSummary).toBeTruthy();
  });

  it('open innovation approach includes brand name', () => {
    const result = generateBrandInnovation(brand);
    expect(result.openInnovationApproach).toContain('Nexus Labs');
  });
});
