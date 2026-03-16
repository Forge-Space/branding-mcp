import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandDigital } from '../../lib/branding-core/generators/brand-digital.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'DigiBrand',
    tagline: 'Digital first, always',
    industry: 'technology software',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandDigital', () => {
  const brand = createTestBrand();
  const result = generateBrandDigital(brand);

  it('returns all required top-level fields', () => {
    expect(result.uiLanguage).toBeTruthy();
    expect(result.gridSystem).toBeTruthy();
    expect(result.borderRadiusSystem).toBeTruthy();
    expect(result.shadowSystem).toBeTruthy();
    expect(result.animationStyle).toBeTruthy();
    expect(result.darkModeApproach).toBeTruthy();
    expect(result.iconStyle).toBeTruthy();
    expect(result.formPatterns).toBeTruthy();
    expect(result.digitalBriefSummary).toBeTruthy();
  });

  it('includes componentPatterns array with entries', () => {
    expect(Array.isArray(result.componentPatterns)).toBe(true);
    expect(result.componentPatterns.length).toBeGreaterThanOrEqual(3);
  });

  it('includes 5 component specs', () => {
    expect(result.componentSpecs).toHaveLength(5);
  });

  it('each component spec has required fields', () => {
    result.componentSpecs.forEach((spec) => {
      expect(spec.component).toBeTruthy();
      expect(Array.isArray(spec.variants)).toBe(true);
      expect(spec.variants.length).toBeGreaterThan(0);
      expect(typeof spec.cssProperties).toBe('object');
      expect(spec.accessibilityNotes).toBeTruthy();
    });
  });

  it('accessibilitySpec has all required fields', () => {
    const acc = result.accessibilitySpec;
    expect(acc.wcagTarget).toMatch(/WCAG/);
    expect(acc.minimumContrastBody).toBe('4.5:1');
    expect(acc.minimumContrastLargeText).toBe('3:1');
    expect(acc.minimumContrastUI).toBe('3:1');
    expect(acc.focusIndicator).toContain(brand.colors.primary.hex);
    expect(acc.minimumTouchTarget).toContain('44');
    expect(acc.reducedMotionSupport).toContain('prefers-reduced-motion');
    expect(Array.isArray(acc.screenReaderNotes)).toBe(true);
    expect(acc.screenReaderNotes.length).toBeGreaterThanOrEqual(3);
    expect(Array.isArray(acc.keyboardNavigationNotes)).toBe(true);
    expect(acc.keyboardNavigationNotes.length).toBeGreaterThanOrEqual(3);
  });

  it('designTokenSnippet contains CSS custom properties', () => {
    expect(result.designTokenSnippet).toContain(':root');
    expect(result.designTokenSnippet).toContain('--color-primary');
    expect(result.designTokenSnippet).toContain(brand.colors.primary.hex);
    expect(result.designTokenSnippet).toContain('--font-heading');
    expect(result.designTokenSnippet).toContain('--spacing-base');
  });

  it('brief summary contains brand name and tagline', () => {
    expect(result.digitalBriefSummary).toContain('DigiBrand');
    expect(result.digitalBriefSummary).toContain('Digital first, always');
  });

  it('brief summary contains WCAG target', () => {
    expect(result.digitalBriefSummary).toContain('WCAG');
  });

  it('bold style uses expressive animation', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const boldResult = generateBrandDigital(boldBrand);
    expect(boldResult.animationStyle).toContain('spring');
    expect(boldResult.componentPatterns).toContain('Full-bleed hero sections');
  });

  it('tech style prefers dark mode', () => {
    const techBrand = createTestBrand({ style: 'tech', industry: 'developer tools' });
    const techResult = generateBrandDigital(techBrand);
    expect(techResult.darkModeApproach).toContain('dark');
    expect(techResult.componentPatterns.some((p) => p.includes('Command palette'))).toBe(true);
  });

  it('playful style uses pill buttons and rounded corners', () => {
    const playfulBrand = createTestBrand({ style: 'playful' });
    const playfulResult = generateBrandDigital(playfulBrand);
    expect(playfulResult.borderRadiusSystem).toContain('pill');
    expect(playfulResult.animationStyle).toContain('bounce');
  });

  it('elegant style uses WCAG 2.1 AA target', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const elegantResult = generateBrandDigital(elegantBrand);
    expect(elegantResult.accessibilitySpec.wcagTarget).toContain('WCAG 2.1 AA');
  });

  it('corporate style uses WCAG 2.2 AA target', () => {
    const corpBrand = createTestBrand({ style: 'corporate' });
    const corpResult = generateBrandDigital(corpBrand);
    expect(corpResult.accessibilitySpec.wcagTarget).toContain('WCAG 2.2 AA');
  });

  it('retro style uses square corners', () => {
    const retroBrand = createTestBrand({ style: 'retro' });
    const retroResult = generateBrandDigital(retroBrand);
    expect(retroResult.borderRadiusSystem).toContain('0px');
  });

  it('unknown style falls back to minimal patterns', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const unknownResult = generateBrandDigital(unknownBrand);
    expect(unknownResult.uiLanguage).toContain('Clean');
    expect(unknownResult.componentPatterns.length).toBeGreaterThan(0);
  });

  it('brand without tagline works and excludes tagline from summary', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const noTagResult = generateBrandDigital(noTagBrand);
    expect(noTagResult.digitalBriefSummary).not.toContain('undefined');
    expect(noTagResult.digitalBriefSummary).toContain('DigiBrand');
  });
});
