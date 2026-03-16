import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
} from '../../lib/branding-core/index.js';
import { generateBrandContent } from '../../lib/branding-core/generators/brand-content.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TestCorp',
    tagline: 'Build the future',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandContent', () => {
  const brand = createTestBrand();

  it('returns all required top-level fields', () => {
    const result = generateBrandContent(brand);
    expect(result.editorialTone).toBeTruthy();
    expect(result.contentTypes).toBeTruthy();
    expect(result.headlinePattern).toBeTruthy();
    expect(result.seoApproach).toBeTruthy();
    expect(result.contentPillars).toBeTruthy();
    expect(result.editorialGuidelines).toBeTruthy();
    expect(result.distributionStrategy).toBeTruthy();
    expect(result.contentCalendar).toBeTruthy();
    expect(result.contentBriefSummary).toBeTruthy();
  });

  it('returns at least 2 content types', () => {
    const result = generateBrandContent(brand);
    expect(result.contentTypes.length).toBeGreaterThanOrEqual(2);
  });

  it('returns exactly 4 content pillars', () => {
    const result = generateBrandContent(brand);
    expect(result.contentPillars).toHaveLength(4);
  });

  it('each content pillar has required fields', () => {
    const result = generateBrandContent(brand);
    for (const pillar of result.contentPillars) {
      expect(pillar.name).toBeTruthy();
      expect(pillar.purpose).toBeTruthy();
      expect(pillar.topics.length).toBeGreaterThan(0);
      expect(pillar.formats.length).toBeGreaterThan(0);
    }
  });

  it('editorial guidelines has key fields', () => {
    const result = generateBrandContent(brand);
    expect(result.editorialGuidelines.tone).toBeTruthy();
    expect(result.editorialGuidelines.perspective).toBeTruthy();
    expect(result.editorialGuidelines.callToAction).toBeTruthy();
  });

  it('distribution strategy has required cadence fields', () => {
    const result = generateBrandContent(brand);
    expect(result.distributionStrategy.blog_cadence).toBeTruthy();
    expect(result.distributionStrategy.social_cadence).toBeTruthy();
    expect(result.distributionStrategy.newsletter_cadence).toBeTruthy();
  });

  it('returns exactly 4 weeks in content calendar', () => {
    const result = generateBrandContent(brand);
    expect(result.contentCalendar).toHaveLength(4);
  });

  it('each calendar week has required fields', () => {
    const result = generateBrandContent(brand);
    for (const week of result.contentCalendar) {
      expect(week.week).toBeGreaterThan(0);
      expect(week.theme).toBeTruthy();
      expect(week.formats.length).toBeGreaterThan(0);
    }
  });

  it('content calendar weeks are numbered 1-4', () => {
    const result = generateBrandContent(brand);
    expect(result.contentCalendar.map((w) => w.week)).toEqual([1, 2, 3, 4]);
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandContent(brand);
    expect(result.contentBriefSummary).toContain('TestCorp');
  });

  it('brief summary contains tagline when present', () => {
    const result = generateBrandContent(brand);
    expect(result.contentBriefSummary).toContain('Build the future');
  });

  it('tech style uses developer-focused content types', () => {
    const result = generateBrandContent(brand);
    const allTypes = result.contentTypes.join(' ');
    expect(allTypes).toMatch(/tutorial|blog|docs|changelog/i);
  });

  it('minimal style produces clean editorial tone', () => {
    const minimalBrand = createTestBrand({ style: 'minimal' });
    const result = generateBrandContent(minimalBrand);
    expect(result.editorialTone).toContain('concise');
  });

  it('playful style uses friendly CTAs', () => {
    const playfulBrand = createTestBrand({ style: 'playful' });
    const result = generateBrandContent(playfulBrand);
    expect(result.editorialGuidelines.callToAction).toContain('fun');
  });

  it('bold style produces confident editorial tone', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const result = generateBrandContent(boldBrand);
    expect(result.editorialTone).toContain('confident');
  });

  it('unknown style falls back to minimal patterns', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandContent(unknownBrand);
    expect(result.editorialTone).toBeTruthy();
    expect(result.contentTypes.length).toBeGreaterThan(0);
  });

  it('brand without tagline does not include undefined in summary', () => {
    const noTaglineBrand = createTestBrand({ tagline: undefined });
    const result = generateBrandContent(noTaglineBrand);
    expect(result.contentBriefSummary).not.toMatch(/undefined/);
  });
});
