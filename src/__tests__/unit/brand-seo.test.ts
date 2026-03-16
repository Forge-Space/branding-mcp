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
});
