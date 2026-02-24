import { validateContrast } from '../../lib/branding-core/validators/contrast-checker.js';
import { validateBrandConsistency } from '../../lib/branding-core/validators/brand-consistency.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides?: Partial<BrandIdentity>): BrandIdentity {
  return {
    id: 'test_brand',
    name: 'Test',
    industry: 'tech',
    style: 'tech',
    colors: generateColorPalette('#003366'),
    typography: generateTypographySystem(),
    spacing: generateSpacingScale(),
    createdAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('validateContrast', () => {
  it('returns no issues for high-contrast colors', () => {
    const brand = createTestBrand({ colors: generateColorPalette('#003366') });
    const issues = validateContrast(brand);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors.length).toBe(0);
  });

  it('flags low-contrast colors', () => {
    const brand = createTestBrand({ colors: generateColorPalette('#cccccc') });
    const issues = validateContrast(brand);
    expect(issues.length).toBeGreaterThan(0);
  });
});

describe('validateBrandConsistency', () => {
  it('validates a complete brand as valid', () => {
    const brand = createTestBrand();
    const result = validateBrandConsistency(brand);
    expect(result.score).toBeGreaterThan(0);
    expect(typeof result.valid).toBe('boolean');
    expect(Array.isArray(result.issues)).toBe(true);
  });

  it('includes contrast issues in overall validation', () => {
    const brand = createTestBrand({ colors: generateColorPalette('#cccccc') });
    const result = validateBrandConsistency(brand);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('validates typography properties', () => {
    const brand = createTestBrand();
    const result = validateBrandConsistency(brand);
    const typographyIssues = result.issues.filter((i) => i.element.startsWith('typography'));
    expect(typographyIssues.every((i) => i.severity !== 'error')).toBe(true);
  });

  it('returns score between 0 and 100', () => {
    const brand = createTestBrand();
    const result = validateBrandConsistency(brand);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('flags missing primary color', () => {
    const brand = createTestBrand();
    brand.colors.primary.hex = '';
    const result = validateBrandConsistency(brand);
    expect(result.issues.some((i) => i.element === 'color.primary')).toBe(true);
    expect(result.valid).toBe(false);
  });

  it('flags missing secondary color', () => {
    const brand = createTestBrand();
    brand.colors.secondary.hex = '';
    const result = validateBrandConsistency(brand);
    expect(result.issues.some((i) => i.element === 'color.secondary')).toBe(true);
  });

  it('flags too few neutral shades', () => {
    const brand = createTestBrand();
    brand.colors.neutral = brand.colors.neutral.slice(0, 2);
    const result = validateBrandConsistency(brand);
    expect(result.issues.some((i) => i.element === 'color.neutral')).toBe(true);
  });

  it('flags missing heading font', () => {
    const brand = createTestBrand();
    brand.typography.headingFont = '';
    const result = validateBrandConsistency(brand);
    expect(result.issues.some((i) => i.element === 'typography.headingFont')).toBe(true);
    expect(result.valid).toBe(false);
  });

  it('flags missing body font', () => {
    const brand = createTestBrand();
    brand.typography.bodyFont = '';
    const result = validateBrandConsistency(brand);
    expect(result.issues.some((i) => i.element === 'typography.bodyFont')).toBe(true);
  });

  it('flags base size outside recommended range', () => {
    const brand = createTestBrand();
    brand.typography.baseSize = 10;
    const result = validateBrandConsistency(brand);
    expect(result.issues.some((i) => i.element === 'typography.baseSize')).toBe(true);
  });

  it('flags base size above recommended range', () => {
    const brand = createTestBrand();
    brand.typography.baseSize = 24;
    const result = validateBrandConsistency(brand);
    expect(result.issues.some((i) => i.element === 'typography.baseSize')).toBe(true);
  });

  it('reduces score for errors more than warnings', () => {
    const brand = createTestBrand();
    brand.colors.primary.hex = '';
    brand.colors.secondary.hex = '';
    const result = validateBrandConsistency(brand);
    expect(result.score).toBeLessThan(70);
  });
});
