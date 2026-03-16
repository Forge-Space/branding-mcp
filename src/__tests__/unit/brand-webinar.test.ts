import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandWebinar } from '../../lib/branding-core/generators/brand-webinar.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'AcmeCo',
    tagline: 'Building the future',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandWebinar', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandWebinar(brand);
    expect(result.recommendedFormats).toBeDefined();
    expect(result.promotionStrategy).toBeDefined();
    expect(result.hostStyle).toBeDefined();
    expect(result.engagementTactics).toBeDefined();
    expect(result.followUpSequence).toBeDefined();
    expect(result.recommendedPlatform).toBeDefined();
    expect(result.productionChecklist).toBeDefined();
    expect(result.accessibilityNotes).toBeDefined();
    expect(result.successMetrics).toBeDefined();
    expect(result.webinarBriefSummary).toBeDefined();
  });

  it('returns at least 3 recommended formats', () => {
    const result = generateBrandWebinar(createTestBrand());
    expect(result.recommendedFormats.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 promotion strategy items', () => {
    const result = generateBrandWebinar(createTestBrand());
    expect(result.promotionStrategy.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 engagement tactics', () => {
    const result = generateBrandWebinar(createTestBrand());
    expect(result.engagementTactics.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 follow-up sequence items', () => {
    const result = generateBrandWebinar(createTestBrand());
    expect(result.followUpSequence.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 7 accessibility notes', () => {
    const result = generateBrandWebinar(createTestBrand());
    expect(result.accessibilityNotes.length).toBeGreaterThanOrEqual(7);
  });

  it('returns at least 6 production checklist items', () => {
    const result = generateBrandWebinar(createTestBrand());
    expect(result.productionChecklist.length).toBeGreaterThanOrEqual(6);
  });

  it('productionChecklist includes brand primary color', () => {
    const brand = createTestBrand();
    const result = generateBrandWebinar(brand);
    const hasColor = result.productionChecklist.some((item) =>
      item.includes(brand.colors.primary.hex)
    );
    expect(hasColor).toBe(true);
  });

  it('successMetrics has at least 6 keys', () => {
    const result = generateBrandWebinar(createTestBrand());
    expect(Object.keys(result.successMetrics).length).toBeGreaterThanOrEqual(6);
  });

  it('webinarBriefSummary contains brand name', () => {
    const brand = createTestBrand();
    const result = generateBrandWebinar(brand);
    expect(result.webinarBriefSummary).toContain('AcmeCo');
  });

  it('webinarBriefSummary contains tagline when present', () => {
    const brand = createTestBrand({ tagline: 'Building the future' });
    const result = generateBrandWebinar(brand);
    expect(result.webinarBriefSummary).toContain('Building the future');
  });

  it('tech style adds developer-specific extras', () => {
    const result = generateBrandWebinar(createTestBrand({ style: 'tech' }));
    const hasDev = result.productionChecklist.some(
      (item) => item.toLowerCase().includes('demo') || item.toLowerCase().includes('code')
    );
    expect(hasDev).toBe(true);
    expect(result.successMetrics['developer_sign_ups']).toBeDefined();
  });

  it('corporate style adds pipeline KPIs', () => {
    const result = generateBrandWebinar(createTestBrand({ style: 'corporate' }));
    expect(result.successMetrics['qualified_leads']).toBeDefined();
    expect(result.successMetrics['pipeline_influenced']).toBeDefined();
  });

  it('bold style adds countdown/overlay extras', () => {
    const result = generateBrandWebinar(createTestBrand({ style: 'bold' }));
    const hasBoldExtra = result.productionChecklist.some(
      (item) => item.toLowerCase().includes('countdown') || item.toLowerCase().includes('overlay')
    );
    expect(hasBoldExtra).toBe(true);
  });

  it('elegant style adds professional/personalised extras', () => {
    const result = generateBrandWebinar(createTestBrand({ style: 'elegant' }));
    const hasElegantExtra = result.productionChecklist.some(
      (item) =>
        item.toLowerCase().includes('lighting') || item.toLowerCase().includes('personalised')
    );
    expect(hasElegantExtra).toBe(true);
  });

  it('falls back to minimal for unknown style', () => {
    const result = generateBrandWebinar(createTestBrand({ style: 'unknown' as never }));
    expect(result.recommendedFormats).toContain('Single-topic deep dive');
    expect(result.webinarBriefSummary).toBeTruthy();
  });

  it('works without tagline', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandWebinar(brand);
    expect(result.webinarBriefSummary).not.toMatch(/undefined/);
    expect(result.webinarBriefSummary).toContain('AcmeCo');
  });
});
