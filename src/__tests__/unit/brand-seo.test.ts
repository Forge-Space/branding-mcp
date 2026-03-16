import { describe, it, expect, beforeAll } from '@jest/globals';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandSeo } from '../../lib/branding-core/generators/brand-seo.js';
import type { BrandIdentity } from '../../lib/types.js';

let brand: BrandIdentity;

beforeAll(() => {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  brand = {
    id: 'test-seo',
    name: 'TechCorp',
    tagline: 'Build the future',
    industry: 'software technology',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
  };
});

describe('generateBrandSeo', () => {
  it('returns all required fields', () => {
    const result = generateBrandSeo(brand);
    expect(result.seoApproach).toBeTruthy();
    expect(result.targetKeywords).toBeDefined();
    expect(result.contentTypes).toBeDefined();
    expect(result.linkBuildingStrategy).toBeDefined();
    expect(result.technicalPriorities).toBeDefined();
    expect(result.localSeoGuidance).toBeTruthy();
    expect(result.onPageChecklist).toBeDefined();
    expect(result.contentCalendar).toBeDefined();
    expect(result.seoBriefSummary).toBeTruthy();
  });

  it('targetKeywords has 8 entries', () => {
    const result = generateBrandSeo(brand);
    expect(result.targetKeywords).toHaveLength(8);
  });

  it('contentTypes has at least 3 entries', () => {
    const result = generateBrandSeo(brand);
    expect(result.contentTypes.length).toBeGreaterThanOrEqual(3);
  });

  it('linkBuildingStrategy has at least 3 entries', () => {
    const result = generateBrandSeo(brand);
    expect(result.linkBuildingStrategy.length).toBeGreaterThanOrEqual(3);
  });

  it('technicalPriorities has at least 3 entries', () => {
    const result = generateBrandSeo(brand);
    expect(result.technicalPriorities.length).toBeGreaterThanOrEqual(3);
  });

  it('onPageChecklist has 10 entries', () => {
    const result = generateBrandSeo(brand);
    expect(result.onPageChecklist).toHaveLength(10);
  });

  it('contentCalendar has at least 3 entries', () => {
    const result = generateBrandSeo(brand);
    expect(result.contentCalendar.length).toBeGreaterThanOrEqual(3);
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandSeo(brand);
    expect(result.seoBriefSummary).toContain('TechCorp');
  });

  it('brief summary contains tagline when present', () => {
    const result = generateBrandSeo(brand);
    expect(result.seoBriefSummary).toContain('Build the future');
  });

  it('tech style uses developer-focused approach', () => {
    const result = generateBrandSeo(brand);
    expect(result.seoApproach.toLowerCase()).toContain('developer');
  });

  it('tech style content types include technical tutorials', () => {
    const result = generateBrandSeo(brand);
    const hasdev = result.contentTypes.some((t) => t.toLowerCase().includes('technical'));
    expect(hasdev).toBe(true);
  });

  it('bold style uses aggressive content approach', () => {
    const boldBrand: BrandIdentity = { ...brand, style: 'bold' };
    const result = generateBrandSeo(boldBrand);
    expect(result.seoApproach.toLowerCase()).toContain('aggressive');
  });

  it('elegant style has long-form editorial in content types', () => {
    const elegantBrand: BrandIdentity = { ...brand, style: 'elegant' };
    const result = generateBrandSeo(elegantBrand);
    const hasEditorial = result.contentTypes.some((t) => t.toLowerCase().includes('long-form'));
    expect(hasEditorial).toBe(true);
  });

  it('organic style local SEO mentions community', () => {
    const organicBrand: BrandIdentity = { ...brand, style: 'organic' };
    const result = generateBrandSeo(organicBrand);
    expect(result.localSeoGuidance.toLowerCase()).toContain('community');
  });

  it('unknown style falls back to minimal approach', () => {
    const unknownBrand: BrandIdentity = { ...brand, style: 'unknown' as never };
    const result = generateBrandSeo(unknownBrand);
    expect(result.seoApproach.toLowerCase()).toContain('clean');
  });

  it('targetKeywords include brand name', () => {
    const result = generateBrandSeo(brand);
    const hasBrandName = result.targetKeywords.some((k) => k.toLowerCase().includes('techcorp'));
    expect(hasBrandName).toBe(true);
  });

  it('minimal style uses clean content-first approach', () => {
    const minimalBrand: BrandIdentity = { ...brand, style: 'minimal' };
    const result = generateBrandSeo(minimalBrand);
    expect(result.seoApproach.toLowerCase()).toContain('clean');
    expect(result.contentTypes).toBeDefined();
    expect(result.linkBuildingStrategy).toBeDefined();
    expect(result.technicalPriorities).toBeDefined();
  });

  it('playful style uses viral content hooks', () => {
    const playfulBrand: BrandIdentity = { ...brand, style: 'playful' };
    const result = generateBrandSeo(playfulBrand);
    expect(result.seoApproach.toLowerCase()).toContain('viral');
    expect(
      result.contentTypes.some(
        (t) => t.toLowerCase().includes('quiz') || t.toLowerCase().includes('interactive')
      )
    ).toBe(true);
  });

  it('corporate style uses enterprise SEO', () => {
    const corporateBrand: BrandIdentity = { ...brand, style: 'corporate' };
    const result = generateBrandSeo(corporateBrand);
    expect(result.seoApproach.toLowerCase()).toContain('enterprise');
    expect(
      result.technicalPriorities.some(
        (t) => t.toLowerCase().includes('sitemap') || t.toLowerCase().includes('hreflang')
      )
    ).toBe(true);
  });

  it('retro style uses niche community SEO', () => {
    const retroBrand: BrandIdentity = { ...brand, style: 'retro' };
    const result = generateBrandSeo(retroBrand);
    expect(result.seoApproach.toLowerCase()).toContain('niche');
    expect(
      result.contentTypes.some(
        (t) => t.toLowerCase().includes('nostalgia') || t.toLowerCase().includes('heritage')
      )
    ).toBe(true);
  });

  it('fashion industry keywords extraction', () => {
    const fashionBrand: BrandIdentity = { ...brand, industry: 'fashion apparel clothing' };
    const result = generateBrandSeo(fashionBrand);
    expect(
      result.targetKeywords.some(
        (k) => k.toLowerCase().includes('fashion') || k.toLowerCase().includes('apparel')
      )
    ).toBe(true);
  });

  it('food industry keywords extraction', () => {
    const foodBrand: BrandIdentity = { ...brand, industry: 'food restaurant dining' };
    const result = generateBrandSeo(foodBrand);
    expect(
      result.targetKeywords.some(
        (k) => k.toLowerCase().includes('food') || k.toLowerCase().includes('dining')
      )
    ).toBe(true);
  });

  it('health industry keywords extraction', () => {
    const healthBrand: BrandIdentity = { ...brand, industry: 'health wellness fitness' };
    const result = generateBrandSeo(healthBrand);
    expect(
      result.targetKeywords.some(
        (k) => k.toLowerCase().includes('health') || k.toLowerCase().includes('wellness')
      )
    ).toBe(true);
  });

  it('finance industry keywords extraction', () => {
    const financeBrand: BrandIdentity = { ...brand, industry: 'finance banking investment' };
    const result = generateBrandSeo(financeBrand);
    expect(
      result.targetKeywords.some(
        (k) => k.toLowerCase().includes('finance') || k.toLowerCase().includes('investment')
      )
    ).toBe(true);
  });

  it('education industry keywords extraction', () => {
    const eduBrand: BrandIdentity = { ...brand, industry: 'education learning training' };
    const result = generateBrandSeo(eduBrand);
    expect(
      result.targetKeywords.some(
        (k) => k.toLowerCase().includes('education') || k.toLowerCase().includes('learning')
      )
    ).toBe(true);
  });

  it('generic industry falls back to first word', () => {
    const genericBrand: BrandIdentity = { ...brand, industry: 'consulting services' };
    const result = generateBrandSeo(genericBrand);
    expect(result.targetKeywords.some((k) => k.toLowerCase().includes('consulting'))).toBe(true);
  });

  it('brand without tagline omits tagline from summary', () => {
    const noTaglineBrand: BrandIdentity = { ...brand, tagline: '' };
    const result = generateBrandSeo(noTaglineBrand);
    expect(result.seoBriefSummary).not.toContain('"');
  });

  it('minimal link building includes guest posts', () => {
    const minimalBrand: BrandIdentity = { ...brand, style: 'minimal' };
    const result = generateBrandSeo(minimalBrand);
    expect(result.linkBuildingStrategy.some((s) => s.toLowerCase().includes('guest'))).toBe(true);
  });

  it('retro local SEO mentions vintage', () => {
    const retroBrand: BrandIdentity = { ...brand, style: 'retro' };
    const result = generateBrandSeo(retroBrand);
    expect(result.localSeoGuidance.toLowerCase()).toContain('vintage');
  });

  it('bold content calendar has weekly cadence', () => {
    const boldBrand: BrandIdentity = { ...brand, style: 'bold' };
    const result = generateBrandSeo(boldBrand);
    expect(result.contentCalendar.some((entry) => entry.toLowerCase().startsWith('week'))).toBe(
      true
    );
  });

  it('elegant content calendar has monthly cadence', () => {
    const elegantBrand: BrandIdentity = { ...brand, style: 'elegant' };
    const result = generateBrandSeo(elegantBrand);
    expect(result.contentCalendar.some((entry) => entry.toLowerCase().startsWith('month'))).toBe(
      true
    );
  });
});
