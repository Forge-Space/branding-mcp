import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandEmail } from '../../lib/branding-core/generators/brand-email.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'TestBrand',
    tagline: 'Building the future',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

const brand = createTestBrand();

describe('generateBrandEmail', () => {
  it('returns required top-level fields', () => {
    const result = generateBrandEmail(brand);
    expect(result.templates).toBeDefined();
    expect(result.campaigns).toBeDefined();
    expect(result.subjectLineExamples).toBeDefined();
    expect(result.preheaderExamples).toBeDefined();
    expect(result.colorUsage).toBeDefined();
    expect(result.typographyGuidelines).toBeDefined();
    expect(result.copyTone).toBeDefined();
    expect(result.bestPractices).toBeDefined();
    expect(result.footerElements).toBeDefined();
    expect(result.accessibilityNotes).toBeDefined();
  });

  it('returns at least 3 email templates', () => {
    const result = generateBrandEmail(brand);
    expect(result.templates.length).toBeGreaterThanOrEqual(3);
  });

  it('each template has required fields', () => {
    const result = generateBrandEmail(brand);
    for (const template of result.templates) {
      expect(template.name).toBeTruthy();
      expect(template.purpose).toBeTruthy();
      expect(Array.isArray(template.subjectLineFormulas)).toBe(true);
      expect(template.preheaderText).toBeTruthy();
      expect(Array.isArray(template.structure)).toBe(true);
      expect(template.designNotes).toBeTruthy();
    }
  });

  it('returns at least 2 campaigns', () => {
    const result = generateBrandEmail(brand);
    expect(result.campaigns.length).toBeGreaterThanOrEqual(2);
  });

  it('each campaign has required fields', () => {
    const result = generateBrandEmail(brand);
    for (const campaign of result.campaigns) {
      expect(campaign.type).toBeTruthy();
      expect(campaign.goal).toBeTruthy();
      expect(campaign.frequency).toBeTruthy();
      expect(Array.isArray(campaign.keyMessages)).toBe(true);
      expect(campaign.callToAction).toBeTruthy();
    }
  });

  it('returns at least 4 subject line examples', () => {
    const result = generateBrandEmail(brand);
    expect(result.subjectLineExamples.length).toBeGreaterThanOrEqual(4);
  });

  it('returns at least 3 preheader examples', () => {
    const result = generateBrandEmail(brand);
    expect(result.preheaderExamples.length).toBeGreaterThanOrEqual(3);
  });

  it('colorUsage has brand color values', () => {
    const result = generateBrandEmail(brand);
    expect(result.colorUsage.background).toBeTruthy();
    expect(result.colorUsage.text).toBeTruthy();
    expect(result.colorUsage.accent).toBeTruthy();
    expect(result.colorUsage.button).toBeTruthy();
  });

  it('typographyGuidelines references brand fonts', () => {
    const result = generateBrandEmail(brand);
    expect(result.typographyGuidelines.headingFont).toBeTruthy();
    expect(result.typographyGuidelines.bodyFont).toBeTruthy();
    expect(result.typographyGuidelines.fontSize).toBeTruthy();
    expect(result.typographyGuidelines.lineHeight).toBeTruthy();
  });

  it('returns at least 5 best practices', () => {
    const result = generateBrandEmail(brand);
    expect(result.bestPractices.length).toBeGreaterThanOrEqual(5);
  });

  it('returns footer elements', () => {
    const result = generateBrandEmail(brand);
    expect(result.footerElements.length).toBeGreaterThanOrEqual(3);
  });

  it('returns accessibility notes', () => {
    const result = generateBrandEmail(brand);
    expect(result.accessibilityNotes.length).toBeGreaterThanOrEqual(3);
  });

  it('adapts copy tone to minimal style', () => {
    const minimalBrand = createTestBrand({ style: 'minimal' });
    const result = generateBrandEmail(minimalBrand);
    expect(result.copyTone.toLowerCase()).toContain('clear');
  });

  it('adapts copy tone to playful style', () => {
    const playfulBrand = createTestBrand({ style: 'playful' });
    const result = generateBrandEmail(playfulBrand);
    expect(result.copyTone.toLowerCase()).toContain('fun');
  });

  it('adapts to corporate style', () => {
    const corpBrand = createTestBrand({ style: 'corporate', industry: 'finance banking' });
    const result = generateBrandEmail(corpBrand);
    expect(result.copyTone.toLowerCase()).toContain('professional');
    expect(result.campaigns.length).toBeGreaterThanOrEqual(2);
  });
});
