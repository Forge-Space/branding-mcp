import { generateBrandNewsletter } from '../../lib/branding-core/generators/brand-newsletter.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TestCo',
    tagline: 'Delivering excellence',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandNewsletter', () => {
  const brand = createTestBrand();
  const result = generateBrandNewsletter(brand);

  it('returns all required fields', () => {
    expect(result.newsletterApproach).toBeTruthy();
    expect(result.recommendedFormats).toBeInstanceOf(Array);
    expect(result.publishingCadence).toBeTruthy();
    expect(result.subjectLineFormula).toBeTruthy();
    expect(result.personalisationStrategy).toBeInstanceOf(Array);
    expect(result.newsletterSections).toBeInstanceOf(Array);
    expect(result.deliverabilityChecklist).toBeInstanceOf(Array);
    expect(result.accessibilityGuidelines).toBeInstanceOf(Array);
    expect(result.successMetrics).toBeTruthy();
    expect(result.newsletterBriefSummary).toBeTruthy();
  });

  it('returns 3 recommended formats', () => {
    expect(result.recommendedFormats).toHaveLength(3);
  });

  it('returns personalisation strategy items', () => {
    expect(result.personalisationStrategy.length).toBeGreaterThanOrEqual(2);
  });

  it('returns at least 6 newsletter sections', () => {
    expect(result.newsletterSections.length).toBeGreaterThanOrEqual(6);
  });

  it('returns 10 deliverability checklist items', () => {
    expect(result.deliverabilityChecklist).toHaveLength(10);
  });

  it('deliverability checklist includes brand name', () => {
    expect(result.deliverabilityChecklist[0]).toContain('TestCo');
  });

  it('returns 7 accessibility guidelines', () => {
    expect(result.accessibilityGuidelines).toHaveLength(7);
  });

  it('returns at least 6 success metrics', () => {
    expect(Object.keys(result.successMetrics).length).toBeGreaterThanOrEqual(6);
  });

  it('success metrics include open_rate', () => {
    expect(result.successMetrics['open_rate']).toBeTruthy();
  });

  it('brief summary contains brand name and tagline', () => {
    expect(result.newsletterBriefSummary).toContain('TestCo');
    expect(result.newsletterBriefSummary).toContain('Delivering excellence');
  });

  it('bold style returns high-energy approach', () => {
    const boldResult = generateBrandNewsletter(createTestBrand({ style: 'bold' }));
    expect(boldResult.newsletterApproach.toLowerCase()).toContain('high-energy');
  });

  it('elegant style returns monthly cadence', () => {
    const elegantResult = generateBrandNewsletter(createTestBrand({ style: 'elegant' }));
    expect(elegantResult.publishingCadence.toLowerCase()).toContain('monthly');
  });

  it('tech style adds extra sections', () => {
    const techResult = generateBrandNewsletter(createTestBrand({ style: 'tech' }));
    expect(techResult.newsletterSections.length).toBeGreaterThan(6);
  });

  it('tech style adds extra success metrics', () => {
    const techResult = generateBrandNewsletter(
      createTestBrand({ style: 'tech', industry: 'technology' })
    );
    expect(Object.keys(techResult.successMetrics)).toContain('github_clicks');
  });

  it('corporate style adds lead attribution metrics', () => {
    const corpResult = generateBrandNewsletter(createTestBrand({ style: 'corporate' }));
    expect(Object.keys(corpResult.successMetrics)).toContain('qualified_lead_attribution');
  });

  it('unknown style falls back to minimal', () => {
    const unknownResult = generateBrandNewsletter(createTestBrand({ style: 'unknown' as never }));
    expect(unknownResult.newsletterApproach).toBeTruthy();
    expect(unknownResult.publishingCadence).toContain('Bi-weekly');
  });

  it('brand without tagline works correctly', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const noTagResult = generateBrandNewsletter(noTagBrand);
    expect(noTagResult.newsletterBriefSummary).not.toContain('undefined');
    expect(noTagResult.newsletterBriefSummary).toContain('TestCo');
  });
});
