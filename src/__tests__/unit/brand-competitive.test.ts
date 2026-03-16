import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandCompetitive } from '../../lib/branding-core/generators/brand-competitive.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand-id',
    name: 'TestBrand',
    tagline: 'Test tagline',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandCompetitive', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    expect(result.positioningApproach).toBeTruthy();
    expect(result.competitiveAdvantages).toBeDefined();
    expect(result.competitiveMoat).toBeTruthy();
    expect(result.battlecardTone).toBeTruthy();
    expect(result.competitorProfiles).toBeDefined();
    expect(result.positioningMatrix).toBeDefined();
    expect(result.winLossThemes).toBeDefined();
    expect(result.objectionHandling).toBeDefined();
    expect(result.competitiveBriefSummary).toBeTruthy();
  });

  it('returns 3+ competitive advantages', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    expect(result.competitiveAdvantages.length).toBeGreaterThanOrEqual(3);
  });

  it('returns exactly 4 competitor profiles', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    expect(result.competitorProfiles).toHaveLength(4);
  });

  it('each competitor profile has required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    for (const profile of result.competitorProfiles) {
      expect(profile.competitorType).toBeTruthy();
      expect(profile.description).toBeTruthy();
      expect(profile.theirStrengths.length).toBeGreaterThanOrEqual(1);
      expect(profile.theirWeaknesses.length).toBeGreaterThanOrEqual(1);
      expect(profile.ourCounterMessage).toBeTruthy();
      expect(profile.winProbability).toBeTruthy();
    }
  });

  it('returns exactly 4 positioning matrix axes', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    expect(result.positioningMatrix).toHaveLength(4);
  });

  it('each positioning axis has axis, ourPosition, and competitorPosition', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    for (const axis of result.positioningMatrix) {
      expect(axis.axis).toBeTruthy();
      expect(axis.ourPosition).toBeTruthy();
      expect(axis.competitorPosition).toBeTruthy();
    }
  });

  it('returns exactly 2 win/loss themes', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    expect(result.winLossThemes).toHaveLength(2);
  });

  it('win/loss themes have reasons and implication', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    for (const theme of result.winLossThemes) {
      expect(theme.theme).toBeTruthy();
      expect(theme.reasons.length).toBeGreaterThanOrEqual(3);
      expect(theme.implication).toBeTruthy();
    }
  });

  it('returns 5 objection handling items', () => {
    const brand = createTestBrand();
    const result = generateBrandCompetitive(brand);
    expect(result.objectionHandling).toHaveLength(5);
  });

  it('brief summary contains brand name', () => {
    const brand = createTestBrand({ name: 'UniqueCompanyXYZ' });
    const result = generateBrandCompetitive(brand);
    expect(result.competitiveBriefSummary).toContain('UniqueCompanyXYZ');
  });

  it('brief summary contains tagline when present', () => {
    const brand = createTestBrand({ tagline: 'Clarity First' });
    const result = generateBrandCompetitive(brand);
    expect(result.competitiveBriefSummary).toContain('Clarity First');
  });

  it('no tagline brand still produces valid summary', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandCompetitive(brand);
    expect(result.competitiveBriefSummary).not.toMatch(/undefined/);
    expect(result.competitiveBriefSummary).toBeTruthy();
  });

  it('bold style produces impact-led positioning', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandCompetitive(brand);
    expect(result.positioningApproach).toContain('Impact-led');
  });

  it('tech style produces innovation-led positioning', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandCompetitive(brand);
    expect(result.positioningApproach).toContain('Innovation-led');
  });

  it('organic style produces values-led positioning', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandCompetitive(brand);
    expect(result.positioningApproach).toContain('Values-led');
  });

  it('unknown style falls back to minimal positioning', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandCompetitive(brand);
    expect(result.positioningApproach).toBeTruthy();
    expect(result.competitorProfiles).toHaveLength(4);
  });
});
