import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandGlobalisation } from '../../lib/branding-core/generators/brand-globalisation.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#6B4CE6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'GlobalBrand',
    tagline: 'Connecting the world',
    industry: 'tech software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandGlobalisation', () => {
  const brand = createTestBrand();
  const result = generateBrandGlobalisation(brand);

  it('returns all required fields', () => {
    expect(result.localisationApproach).toBeTruthy();
    expect(result.brandStandardsFlexibility).toBeTruthy();
    expect(Array.isArray(result.culturalSensitivityFocus)).toBe(true);
    expect(Array.isArray(result.priorityMarkets)).toBe(true);
    expect(Array.isArray(result.localeAdaptations)).toBe(true);
    expect(Array.isArray(result.translationGuidelines)).toBe(true);
    expect(Array.isArray(result.internationalBrandArchitecture)).toBe(true);
    expect(Array.isArray(result.complianceRequirements)).toBe(true);
    expect(result.globalisationBriefSummary).toBeTruthy();
  });

  it('returns at least 3 cultural sensitivity focus items', () => {
    expect(result.culturalSensitivityFocus.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 priority markets', () => {
    expect(result.priorityMarkets.length).toBeGreaterThanOrEqual(3);
  });

  it('returns exactly 5 locale adaptations', () => {
    expect(result.localeAdaptations).toHaveLength(5);
  });

  it('locale adaptations have required fields', () => {
    for (const locale of result.localeAdaptations) {
      expect(locale.locale).toBeTruthy();
      expect(locale.language).toBeTruthy();
      expect(typeof locale.rtl).toBe('boolean');
      expect(Array.isArray(locale.keyAdaptations)).toBe(true);
      expect(locale.keyAdaptations.length).toBeGreaterThan(0);
      expect(locale.colourConsiderations).toBeTruthy();
      expect(locale.typographyNotes).toBeTruthy();
    }
  });

  it('Arabic locale is marked as RTL', () => {
    const ar = result.localeAdaptations.find((l) => l.locale === 'ar-SA');
    expect(ar).toBeDefined();
    expect(ar!.rtl).toBe(true);
  });

  it('non-Arabic locales are LTR', () => {
    const ltr = result.localeAdaptations.filter((l) => l.locale !== 'ar-SA');
    for (const l of ltr) {
      expect(l.rtl).toBe(false);
    }
  });

  it('returns at least 5 translation guidelines', () => {
    expect(result.translationGuidelines.length).toBeGreaterThanOrEqual(5);
  });

  it('translation guidelines reference the brand name', () => {
    const combined = result.translationGuidelines.join(' ');
    expect(combined).toContain('GlobalBrand');
  });

  it('returns at least 5 international brand architecture items', () => {
    expect(result.internationalBrandArchitecture.length).toBeGreaterThanOrEqual(5);
  });

  it('returns at least 6 compliance requirements', () => {
    expect(result.complianceRequirements.length).toBeGreaterThanOrEqual(6);
  });

  it('brief summary contains brand name and tagline', () => {
    expect(result.globalisationBriefSummary).toContain('GlobalBrand');
    expect(result.globalisationBriefSummary).toContain('Connecting the world');
  });

  it('tech style adds PIPL compliance requirement', () => {
    const combined = result.complianceRequirements.join(' ');
    expect(combined).toContain('PIPL');
  });

  it('tech style adds developer sub-brand architecture note', () => {
    const combined = result.internationalBrandArchitecture.join(' ');
    expect(combined.toLowerCase()).toContain('developer');
  });

  it('organic style adds environmental compliance', () => {
    const orgBrand = createTestBrand({ style: 'organic', industry: 'food organic' });
    const orgResult = generateBrandGlobalisation(orgBrand);
    const combined = orgResult.complianceRequirements.join(' ');
    expect(combined).toContain('Organic');
  });

  it('corporate style adds SOX compliance', () => {
    const corpBrand = createTestBrand({ style: 'corporate' });
    const corpResult = generateBrandGlobalisation(corpBrand);
    const combined = corpResult.complianceRequirements.join(' ');
    expect(combined).toContain('SOX');
  });

  it('falls back to minimal for unknown style', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const unknownResult = generateBrandGlobalisation(unknownBrand);
    expect(unknownResult.localisationApproach).toBeTruthy();
    expect(unknownResult.localeAdaptations).toHaveLength(5);
  });

  it('handles brand without tagline gracefully', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const noTagResult = generateBrandGlobalisation(noTagBrand);
    expect(noTagResult.globalisationBriefSummary).not.toContain('undefined');
    expect(noTagResult.globalisationBriefSummary).toContain('GlobalBrand');
  });
});
