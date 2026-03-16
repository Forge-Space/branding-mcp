import { describe, it, expect, beforeAll } from '@jest/globals';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandAnalytics } from '../../lib/branding-core/generators/brand-analytics.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#6B4CE6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Acme Corp',
    tagline: 'Making things better',
    industry: 'technology software',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandAnalytics', () => {
  let result: ReturnType<typeof generateBrandAnalytics>;

  beforeAll(() => {
    result = generateBrandAnalytics(createTestBrand());
  });

  it('returns all required fields', () => {
    expect(result.analyticsApproach).toBeTruthy();
    expect(result.primaryKpis).toBeDefined();
    expect(result.reportingCadence).toBeTruthy();
    expect(result.recommendedTools).toBeDefined();
    expect(result.attributionModel).toBeTruthy();
    expect(result.dashboards).toBeDefined();
    expect(result.measurementFramework).toBeDefined();
    expect(result.analyticsBriefSummary).toBeTruthy();
  });

  it('returns at least 5 primary KPIs', () => {
    expect(result.primaryKpis.length).toBeGreaterThanOrEqual(5);
  });

  it('returns at least 3 recommended tools', () => {
    expect(result.recommendedTools.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 4 dashboards', () => {
    expect(result.dashboards.length).toBeGreaterThanOrEqual(4);
  });

  it('each dashboard has required fields', () => {
    for (const d of result.dashboards) {
      expect(d.name).toBeTruthy();
      expect(d.audience).toBeTruthy();
      expect(d.updateFrequency).toBeTruthy();
      expect(d.metrics.length).toBeGreaterThan(0);
      expect(d.visualisationType).toBeTruthy();
    }
  });

  it('returns at least 6 measurement framework items', () => {
    expect(result.measurementFramework.length).toBeGreaterThanOrEqual(6);
  });

  it('brief summary contains brand name', () => {
    expect(result.analyticsBriefSummary).toContain('Acme Corp');
  });

  it('brief summary contains tagline', () => {
    expect(result.analyticsBriefSummary).toContain('Making things better');
  });

  it('tech style adds product & engineering dashboard', () => {
    const techResult = generateBrandAnalytics(createTestBrand({ style: 'tech' }));
    const dashNames = techResult.dashboards.map((d) => d.name);
    expect(dashNames).toContain('Product & Engineering Metrics');
  });

  it('tech style adds extra measurement framework items', () => {
    const techResult = generateBrandAnalytics(createTestBrand({ style: 'tech' }));
    const hasSegment = techResult.measurementFramework.some(
      (m) => m.toLowerCase().includes('segment') || m.toLowerCase().includes('posthog')
    );
    expect(hasSegment).toBe(true);
  });

  it('organic style adds ESG dashboard', () => {
    const organicResult = generateBrandAnalytics(createTestBrand({ style: 'organic' }));
    const dashNames = organicResult.dashboards.map((d) => d.name);
    expect(
      dashNames.some((n) => n.toLowerCase().includes('esg') || n.toLowerCase().includes('impact'))
    ).toBe(true);
  });

  it('corporate style has MMM attribution model', () => {
    const corpResult = generateBrandAnalytics(createTestBrand({ style: 'corporate' }));
    expect(corpResult.attributionModel.toLowerCase()).toContain('mix model');
  });

  it('bold style focuses on share of voice KPIs', () => {
    const boldResult = generateBrandAnalytics(createTestBrand({ style: 'bold' }));
    const kpiStr = boldResult.primaryKpis.join(' ');
    expect(kpiStr.toLowerCase()).toContain('voice');
  });

  it('elegant style focuses on NPS and LTV KPIs', () => {
    const elegantResult = generateBrandAnalytics(createTestBrand({ style: 'elegant' }));
    const kpiStr = elegantResult.primaryKpis.join(' ');
    expect(kpiStr.toLowerCase()).toContain('nps');
  });

  it('unknown style falls back to minimal', () => {
    const unknownResult = generateBrandAnalytics(createTestBrand({ style: 'unknown' as never }));
    expect(unknownResult.analyticsApproach).toBeTruthy();
    expect(unknownResult.primaryKpis.length).toBeGreaterThanOrEqual(5);
  });

  it('works without tagline', () => {
    const noTagResult = generateBrandAnalytics(createTestBrand({ tagline: undefined }));
    expect(noTagResult.analyticsBriefSummary).not.toContain('undefined');
    expect(noTagResult.analyticsBriefSummary).toContain('Acme Corp');
  });
});
