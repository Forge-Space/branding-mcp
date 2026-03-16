import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
  generateBrandUx,
} from '../../lib/branding-core/index.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TestCo',
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

describe('generateBrandUx', () => {
  const brand = createTestBrand();

  it('returns all required fields', () => {
    const result = generateBrandUx(brand);
    expect(result.writingVoice).toBeTruthy();
    expect(result.ctaStyle).toBeDefined();
    expect(result.errorMessageTone).toBeTruthy();
    expect(result.emptyStateApproach).toBeTruthy();
    expect(result.onboardingPattern).toBeTruthy();
    expect(result.loadingCopy).toBeDefined();
    expect(result.tooltipStyle).toBeTruthy();
    expect(result.notificationPattern).toBeTruthy();
    expect(result.microcopyExamples).toBeDefined();
    expect(result.formGuidelines).toBeDefined();
    expect(result.contentHierarchy).toBeDefined();
    expect(result.accessibilityGuidelines).toBeDefined();
    expect(result.contentStrategy).toBeDefined();
    expect(result.uxBriefSummary).toBeTruthy();
  });

  it('ctaStyle has at least 3 items', () => {
    const result = generateBrandUx(brand);
    expect(result.ctaStyle.length).toBeGreaterThanOrEqual(3);
  });

  it('loadingCopy has at least 2 items', () => {
    const result = generateBrandUx(brand);
    expect(result.loadingCopy.length).toBeGreaterThanOrEqual(2);
  });

  it('contentHierarchy includes H1 and H2', () => {
    const result = generateBrandUx(brand);
    expect(result.contentHierarchy.some((h) => h.startsWith('H1'))).toBe(true);
    expect(result.contentHierarchy.some((h) => h.startsWith('H2'))).toBe(true);
  });

  it('accessibilityGuidelines has at least 8 items', () => {
    const result = generateBrandUx(brand);
    expect(result.accessibilityGuidelines.length).toBeGreaterThanOrEqual(8);
  });

  it('microcopyExamples has required keys', () => {
    const result = generateBrandUx(brand);
    expect(result.microcopyExamples.primaryCTA).toBeDefined();
    expect(result.microcopyExamples.loadingStates).toBeDefined();
    expect(result.microcopyExamples.successMessages).toBeDefined();
    expect(result.microcopyExamples.errorMessages).toBeDefined();
    expect(result.microcopyExamples.emptyStates).toBeDefined();
  });

  it('formGuidelines has required keys', () => {
    const result = generateBrandUx(brand);
    expect(result.formGuidelines.labelPosition).toBeTruthy();
    expect(result.formGuidelines.placeholderPolicy).toBeTruthy();
    expect(result.formGuidelines.requiredIndicator).toBeTruthy();
    expect(result.formGuidelines.submitButton).toBeTruthy();
  });

  it('contentStrategy has required keys', () => {
    const result = generateBrandUx(brand);
    expect(result.contentStrategy.writingPrinciples.length).toBeGreaterThanOrEqual(3);
    expect(result.contentStrategy.terminology.length).toBeGreaterThanOrEqual(2);
    expect(result.contentStrategy.toneAdjustments.length).toBeGreaterThanOrEqual(2);
  });

  it('uxBriefSummary contains brand name', () => {
    const result = generateBrandUx(brand);
    expect(result.uxBriefSummary).toContain('TestCo');
  });

  it('uxBriefSummary contains tagline when present', () => {
    const result = generateBrandUx(brand);
    expect(result.uxBriefSummary).toContain('Test tagline');
  });

  it('playful style uses friendly CTAs', () => {
    const result = generateBrandUx(createTestBrand({ style: 'playful' }));
    expect(result.ctaStyle.some((cta) => cta.includes('!'))).toBe(true);
  });

  it('tech style uses technical loading copy', () => {
    const result = generateBrandUx(createTestBrand({ style: 'tech' }));
    expect(
      result.loadingCopy.some(
        (l) =>
          l.toLowerCase().includes('compil') ||
          l.toLowerCase().includes('fetch') ||
          l.toLowerCase().includes('execut') ||
          l.toLowerCase().includes('build')
      )
    ).toBe(true);
  });

  it('corporate style marks required with asterisk', () => {
    const result = generateBrandUx(createTestBrand({ style: 'corporate' }));
    expect(result.formGuidelines.requiredIndicator).toContain('Asterisk');
  });

  it('minimal style uses label above input', () => {
    const result = generateBrandUx(createTestBrand({ style: 'minimal' }));
    expect(result.formGuidelines.labelPosition).toContain('Above');
  });

  it('corporate style adds legal copy to content hierarchy', () => {
    const result = generateBrandUx(createTestBrand({ style: 'corporate' }));
    expect(result.contentHierarchy.some((h) => h.toLowerCase().includes('legal'))).toBe(true);
  });

  it('tech style adds code to content hierarchy', () => {
    const result = generateBrandUx(createTestBrand({ style: 'tech' }));
    expect(result.contentHierarchy.some((h) => h.toLowerCase().includes('code'))).toBe(true);
  });

  it('unknown style falls back to minimal', () => {
    const result = generateBrandUx(createTestBrand({ style: 'unknown' as never }));
    expect(result.writingVoice).toBeTruthy();
    expect(result.ctaStyle.length).toBeGreaterThan(0);
  });
});
