import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandB2b } from '../../lib/branding-core/generators/brand-b2b.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-b2b',
    name: 'Acme Corp',
    tagline: 'Enterprise solutions that scale',
    industry: 'enterprise software',
    style: 'corporate',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandB2b', () => {
  it('returns all required fields', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(result.salesApproach).toBeTruthy();
    expect(Array.isArray(result.idealCustomerProfile)).toBe(true);
    expect(result.abmStrategy).toBeTruthy();
    expect(Array.isArray(result.buyerJourney)).toBe(true);
    expect(Array.isArray(result.salesEnablementKit)).toBe(true);
    expect(typeof result.qualificationFramework).toBe('object');
    expect(Array.isArray(result.partnerChannels)).toBe(true);
    expect(typeof result.successMetrics).toBe('object');
    expect(result.b2bBriefSummary).toBeTruthy();
  });

  it('ICP has at least 3 traits', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(result.idealCustomerProfile.length).toBeGreaterThanOrEqual(3);
  });

  it('buyer journey has at least 4 stages', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(result.buyerJourney.length).toBeGreaterThanOrEqual(4);
  });

  it('sales enablement kit has at least 4 materials', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(result.salesEnablementKit.length).toBeGreaterThanOrEqual(4);
  });

  it('qualification framework has required keys', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(result.qualificationFramework.budget).toBeTruthy();
    expect(result.qualificationFramework.authority).toBeTruthy();
    expect(result.qualificationFramework.need).toBeTruthy();
    expect(result.qualificationFramework.champion).toBeTruthy();
  });

  it('partner channels has at least 3 options', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(result.partnerChannels.length).toBeGreaterThanOrEqual(3);
  });

  it('success metrics has at least 6 KPIs', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(Object.keys(result.successMetrics).length).toBeGreaterThanOrEqual(6);
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(result.b2bBriefSummary).toContain('Acme Corp');
  });

  it('brief summary contains tagline', () => {
    const result = generateBrandB2b(createTestBrand());
    expect(result.b2bBriefSummary).toContain('Enterprise solutions that scale');
  });

  it('tech style uses product-led growth approach', () => {
    const result = generateBrandB2b(createTestBrand({ style: 'tech' }));
    expect(result.salesApproach.toLowerCase()).toContain('product-led');
  });

  it('tech style adds cloud marketplace to partner channels', () => {
    const result = generateBrandB2b(createTestBrand({ style: 'tech' }));
    expect(result.partnerChannels.some((c) => c.toLowerCase().includes('cloud'))).toBe(true);
  });

  it('corporate style uses MEDDIC qualification', () => {
    const result = generateBrandB2b(createTestBrand({ style: 'corporate' }));
    expect(result.qualificationFramework.methodology).toContain('MEDDIC');
  });

  it('corporate style adds executive sponsor to success metrics', () => {
    const result = generateBrandB2b(createTestBrand({ style: 'corporate' }));
    expect(Object.keys(result.successMetrics)).toContain('executive_sponsor_coverage');
  });

  it('elegant style uses relationship-led approach', () => {
    const result = generateBrandB2b(createTestBrand({ style: 'elegant' }));
    expect(result.salesApproach.toLowerCase()).toContain('relationship');
  });

  it('tech industry adds security questionnaire to enablement kit', () => {
    const result = generateBrandB2b(createTestBrand({ industry: 'tech saas', style: 'minimal' }));
    expect(result.salesEnablementKit.some((m) => m.toLowerCase().includes('security'))).toBe(true);
  });

  it('unknown style falls back to minimal', () => {
    const result = generateBrandB2b(createTestBrand({ style: 'unknown' as never }));
    expect(result.salesApproach).toBeTruthy();
    expect(result.idealCustomerProfile.length).toBeGreaterThan(0);
  });
});
