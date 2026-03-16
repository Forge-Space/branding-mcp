import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
} from '../../lib/branding-core/index.js';
import { generateBrandSustainability } from '../../lib/branding-core/generators/brand-sustainability.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#10B981', 'triadic');
  const typography = generateTypographySystem('sans-serif', 'sans-serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'EcoForge',
    tagline: 'Sustainable by design',
    industry: 'sustainability consulting',
    style: 'organic',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandSustainability', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandSustainability(brand);
    expect(result.esgApproach).toBeTruthy();
    expect(Array.isArray(result.environmentalCommitments)).toBe(true);
    expect(Array.isArray(result.socialCommitments)).toBe(true);
    expect(Array.isArray(result.governancePrinciples)).toBe(true);
    expect(Array.isArray(result.certifications)).toBe(true);
    expect(Array.isArray(result.sdgAlignment)).toBe(true);
    expect(result.reportingFramework).toBeTruthy();
    expect(result.sustainabilityBriefSummary).toBeTruthy();
  });

  it('includes at least 4 environmental commitments', () => {
    const brand = createTestBrand();
    const result = generateBrandSustainability(brand);
    expect(result.environmentalCommitments.length).toBeGreaterThanOrEqual(4);
  });

  it('includes at least 3 social commitments', () => {
    const brand = createTestBrand();
    const result = generateBrandSustainability(brand);
    expect(result.socialCommitments.length).toBeGreaterThanOrEqual(3);
  });

  it('includes at least 2 governance principles', () => {
    const brand = createTestBrand();
    const result = generateBrandSustainability(brand);
    expect(result.governancePrinciples.length).toBeGreaterThanOrEqual(2);
  });

  it('includes at least 2 certifications', () => {
    const brand = createTestBrand();
    const result = generateBrandSustainability(brand);
    expect(result.certifications.length).toBeGreaterThanOrEqual(2);
  });

  it('includes at least 3 SDG goals', () => {
    const brand = createTestBrand();
    const result = generateBrandSustainability(brand);
    expect(result.sdgAlignment.length).toBeGreaterThanOrEqual(3);
    expect(result.sdgAlignment.some((g) => g.includes('SDG'))).toBe(true);
  });

  it('includes brand name in sustainability brief summary', () => {
    const brand = createTestBrand();
    const result = generateBrandSustainability(brand);
    expect(result.sustainabilityBriefSummary).toContain('EcoForge');
  });

  it('includes tagline in sustainability brief summary when present', () => {
    const brand = createTestBrand();
    const result = generateBrandSustainability(brand);
    expect(result.sustainabilityBriefSummary).toContain('Sustainable by design');
  });

  it('handles brand without tagline gracefully', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandSustainability(brand);
    expect(result.sustainabilityBriefSummary).toContain('EcoForge');
    expect(result.sustainabilityBriefSummary).not.toContain('undefined');
  });

  it('organic style includes regenerative and Fairtrade certifications', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandSustainability(brand);
    expect(
      result.certifications.some((c) => c.includes('Organic') || c.includes('Fairtrade'))
    ).toBe(true);
  });

  it('corporate style includes GRI or TCFD or SASB in certifications or reporting', () => {
    const brand = createTestBrand({ style: 'corporate' });
    const result = generateBrandSustainability(brand);
    const combined = [...result.certifications, result.reportingFramework].join(' ');
    expect(combined).toMatch(/GRI|TCFD|SASB/);
  });

  it('tech style includes ISO 14001 or green web certifications', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandSustainability(brand);
    expect(
      result.certifications.some((c) => c.includes('ISO 14001') || c.includes('Green Web'))
    ).toBe(true);
  });

  it('bold style includes B Corp in certifications', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandSustainability(brand);
    expect(result.certifications.some((c) => c.includes('B Corp'))).toBe(true);
  });

  it('tech style includes additional SDG 9 for innovation', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandSustainability(brand);
    expect(result.sdgAlignment.some((g) => g.includes('SDG 9'))).toBe(true);
  });

  it('retro style ESG approach mentions repair or vintage or anti-consumption', () => {
    const brand = createTestBrand({ style: 'retro' });
    const result = generateBrandSustainability(brand);
    expect(result.esgApproach).toMatch(/repair|vintage|anti.consumption|nostalgia/i);
  });

  it('falls back to minimal style for unknown style', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandSustainability(brand);
    expect(result.esgApproach).toBeTruthy();
    expect(result.environmentalCommitments.length).toBeGreaterThan(0);
  });

  it('playful style ESG includes gamification or community themes', () => {
    const brand = createTestBrand({ style: 'playful' });
    const result = generateBrandSustainability(brand);
    expect(result.esgApproach).toMatch(/gamif|community|fun|accessible/i);
  });
});
