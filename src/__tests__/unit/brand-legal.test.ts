import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
} from '../../lib/branding-core/index.js';
import { generateBrandLegal } from '../../lib/branding-core/generators/brand-legal.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Acme Corp',
    tagline: 'Building the future',
    industry: 'technology software',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandLegal', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    expect(result).toHaveProperty('trademarkTone');
    expect(result).toHaveProperty('trademarkGuidelines');
    expect(result).toHaveProperty('brandUsageRules');
    expect(result).toHaveProperty('copyrightNotices');
    expect(result).toHaveProperty('toneOfVoiceLegal');
    expect(result).toHaveProperty('privacyCompliance');
    expect(result).toHaveProperty('disclaimers');
    expect(result).toHaveProperty('licensingTerms');
    expect(result).toHaveProperty('accessibilityCompliance');
    expect(result).toHaveProperty('legalBriefSummary');
  });

  it('trademarkGuidelines has at least 5 items', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    expect(result.trademarkGuidelines.length).toBeGreaterThanOrEqual(5);
  });

  it('brandUsageRules has at least 5 items', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    expect(result.brandUsageRules.length).toBeGreaterThanOrEqual(5);
  });

  it('copyrightNotices includes brand name and current year', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    const year = new Date().getFullYear().toString();
    const noticesStr = result.copyrightNotices.join(' ');
    expect(noticesStr).toContain('Acme Corp');
    expect(noticesStr).toContain(year);
  });

  it('privacyCompliance has at least 5 items', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    expect(result.privacyCompliance.length).toBeGreaterThanOrEqual(5);
  });

  it('disclaimers has at least 5 items including brand name', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    expect(result.disclaimers.length).toBeGreaterThanOrEqual(5);
    const disclaimerStr = result.disclaimers.join(' ');
    expect(disclaimerStr).toContain('Acme Corp');
  });

  it('licensingTerms has standard keys', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    expect(result.licensingTerms).toHaveProperty('brand_assets');
    expect(result.licensingTerms).toHaveProperty('photography');
    expect(result.licensingTerms).toHaveProperty('user_generated_content');
  });

  it('accessibilityCompliance has at least 6 items', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    expect(result.accessibilityCompliance.length).toBeGreaterThanOrEqual(6);
    const str = result.accessibilityCompliance.join(' ');
    expect(str).toContain('WCAG');
  });

  it('legalBriefSummary contains brand name and tagline', () => {
    const brand = createTestBrand();
    const result = generateBrandLegal(brand);
    expect(result.legalBriefSummary).toContain('Acme Corp');
    expect(result.legalBriefSummary).toContain('Building the future');
  });

  it('tech style adds open_source and sdk licensing terms', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandLegal(brand);
    expect(result.licensingTerms).toHaveProperty('open_source');
    expect(result.licensingTerms).toHaveProperty('sdk');
  });

  it('tech style adds API-related trademark guidelines', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandLegal(brand);
    const guidelinesStr = result.trademarkGuidelines.join(' ');
    expect(guidelinesStr).toContain('API');
  });

  it('tech style adds additional privacy compliance items', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandLegal(brand);
    expect(result.privacyCompliance.length).toBeGreaterThan(5);
    const str = result.privacyCompliance.join(' ');
    expect(str).toContain('API');
  });

  it('corporate style adds strict trademark guidelines', () => {
    const brand = createTestBrand({ style: 'corporate' });
    const result = generateBrandLegal(brand);
    const guidelinesStr = result.trademarkGuidelines.join(' ');
    expect(guidelinesStr).toContain('trademark');
    expect(result.trademarkGuidelines.length).toBeGreaterThan(5);
  });

  it('organic style adds environmental compliance items', () => {
    const brand = createTestBrand({ style: 'organic', industry: 'sustainable food' });
    const result = generateBrandLegal(brand);
    const str = result.privacyCompliance.join(' ');
    expect(str.toLowerCase()).toContain('environmental');
  });

  it('falls back gracefully for unknown style', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandLegal(brand);
    expect(result.trademarkTone).toBeTruthy();
    expect(result.brandUsageRules.length).toBeGreaterThanOrEqual(5);
  });

  it('works without tagline', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandLegal(brand);
    expect(result.legalBriefSummary).toContain('Acme Corp');
    expect(result.legalBriefSummary).not.toContain('undefined');
  });

  it('bold style copyright notice includes registered trademark symbol', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandLegal(brand);
    const noticesStr = result.copyrightNotices.join(' ');
    expect(noticesStr).toContain('®');
  });
});
