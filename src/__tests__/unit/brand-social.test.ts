import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandSocial } from '../../lib/branding-core/generators/brand-social.js';
import type { BrandIdentity, BrandStyle } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TestCo',
    tagline: 'Building better things',
    industry: 'technology software',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandSocial', () => {
  it('returns required top-level fields', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    expect(social.platforms).toBeDefined();
    expect(social.contentPillars).toBeDefined();
    expect(social.brandedHashtag).toBeDefined();
    expect(social.hashtags).toBeDefined();
    expect(social.bioVariations).toBeDefined();
    expect(social.postingStrategy).toBeDefined();
    expect(social.contentCalendar).toBeDefined();
    expect(social.voiceGuidelines).toBeDefined();
  });

  it('returns at least one platform config', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    expect(social.platforms.length).toBeGreaterThan(0);
    const p = social.platforms[0];
    expect(p.platform).toBeTruthy();
    expect(p.postFrequency).toBeTruthy();
    expect(p.contentFocus).toBeTruthy();
    expect(p.profileImageStyle).toBeTruthy();
    expect(p.optimalPostLength).toBeTruthy();
  });

  it('returns at least 3 content pillars', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    expect(social.contentPillars.length).toBeGreaterThanOrEqual(3);
    const pillar = social.contentPillars[0];
    expect(pillar.name).toBeTruthy();
    expect(pillar.description).toBeTruthy();
    expect(pillar.contentTypes.length).toBeGreaterThan(0);
  });

  it('returns branded hashtag with # prefix', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    expect(social.brandedHashtag).toMatch(/^#/);
    expect(social.brandedHashtag.toLowerCase()).toContain('testco');
  });

  it('returns at least 5 hashtags', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    expect(social.hashtags.length).toBeGreaterThanOrEqual(5);
    social.hashtags.forEach((tag) => expect(tag).toMatch(/^#/));
  });

  it('returns 5 bio variations', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    expect(social.bioVariations.length).toBe(5);
    social.bioVariations.forEach((bio) => expect(bio.length).toBeGreaterThan(0));
  });

  it('returns non-empty posting strategy', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    expect(social.postingStrategy.length).toBeGreaterThan(20);
  });

  it('returns content calendar with days and content', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    const days = Object.keys(social.contentCalendar);
    expect(days.length).toBeGreaterThan(0);
    days.forEach((day) => {
      expect(social.contentCalendar[day].length).toBeGreaterThan(0);
    });
  });

  it('returns voice guidelines with tone and doAndDont', () => {
    const brand = createTestBrand();
    const social = generateBrandSocial(brand);
    expect(social.voiceGuidelines.tone).toBeTruthy();
    expect(social.voiceGuidelines.doAndDont.do.length).toBeGreaterThan(0);
    expect(social.voiceGuidelines.doAndDont.dont.length).toBeGreaterThan(0);
    expect(typeof social.voiceGuidelines.sampleCopy).toBe('object');
  });

  it('adapts platforms for bold style', () => {
    const brand = createTestBrand({ style: 'bold' });
    const social = generateBrandSocial(brand);
    expect(social.platforms.length).toBeGreaterThan(0);
    expect(social.contentPillars.length).toBeGreaterThanOrEqual(4);
  });

  it('adapts platforms for tech style', () => {
    const brand = createTestBrand({ style: 'tech' });
    const social = generateBrandSocial(brand);
    const platformNames = social.platforms.map((p) => p.platform);
    expect(platformNames.some((n) => n === 'Twitter/X' || n === 'GitHub' || n === 'LinkedIn')).toBe(
      true
    );
  });

  it('adapts hashtags to health industry', () => {
    const brand = createTestBrand({ industry: 'health wellness clinic' });
    const social = generateBrandSocial(brand);
    expect(social.hashtags.some((h) => h === '#wellness' || h === '#health')).toBe(true);
  });

  it('adapts hashtags to finance industry', () => {
    const brand = createTestBrand({ industry: 'fintech finance platform' });
    const social = generateBrandSocial(brand);
    expect(social.hashtags.some((h) => h === '#finance' || h === '#fintech')).toBe(true);
  });

  it('falls back to minimal for unknown style', () => {
    const brand = createTestBrand({ style: 'unknown' as BrandStyle });
    const social = generateBrandSocial(brand);
    expect(social.platforms.length).toBeGreaterThan(0);
    expect(social.contentPillars.length).toBeGreaterThan(0);
  });

  it('includes brand name in branded hashtag', () => {
    const brand = createTestBrand({ name: 'My Brand' });
    const social = generateBrandSocial(brand);
    expect(social.brandedHashtag).toBe('#mybrand');
  });
});
