import { describe, it, expect, beforeAll } from '@jest/globals';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandInfluencer } from '../../lib/branding-core/generators/brand-influencer.js';
import type { BrandIdentity } from '../../lib/types.js';

let brand: BrandIdentity;

beforeAll(() => {
  const colors = generateColorPalette('#E91E8C', 'triadic');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  brand = {
    id: 'test-influencer',
    name: 'Spark',
    tagline: 'Ignite your influence',
    industry: 'lifestyle brand',
    style: 'bold',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
  };
});

describe('generateBrandInfluencer', () => {
  it('returns all required fields', () => {
    const result = generateBrandInfluencer(brand);
    expect(result.influencerApproach).toBeTruthy();
    expect(Array.isArray(result.contentPreferences)).toBe(true);
    expect(result.outreachTone).toBeTruthy();
    expect(Array.isArray(result.influencerTiers)).toBe(true);
    expect(Array.isArray(result.avoidList)).toBe(true);
    expect(result.campaignBriefTemplate).toBeTruthy();
    expect(typeof result.kpis).toBe('object');
    expect(Array.isArray(result.disclosureGuidelines)).toBe(true);
    expect(result.influencerBriefSummary).toBeTruthy();
  });

  it('returns 5 content preferences', () => {
    const result = generateBrandInfluencer(brand);
    expect(result.contentPreferences).toHaveLength(5);
  });

  it('returns exactly 4 influencer tiers', () => {
    const result = generateBrandInfluencer(brand);
    expect(result.influencerTiers).toHaveLength(4);
  });

  it('each tier has required fields', () => {
    const result = generateBrandInfluencer(brand);
    for (const tier of result.influencerTiers) {
      expect(tier.tier).toBeTruthy();
      expect(tier.followerRange).toBeTruthy();
      expect(tier.engagementExpectation).toBeTruthy();
      expect(tier.budgetGuidance).toBeTruthy();
      expect(tier.idealUseCase).toBeTruthy();
      expect(Array.isArray(tier.selectionCriteria)).toBe(true);
      expect(tier.selectionCriteria.length).toBeGreaterThan(0);
    }
  });

  it('tiers have expected names', () => {
    const result = generateBrandInfluencer(brand);
    const tierNames = result.influencerTiers.map((t) => t.tier);
    expect(tierNames).toContain('Mega Influencer');
    expect(tierNames).toContain('Macro Influencer');
    expect(tierNames).toContain('Micro Influencer');
    expect(tierNames).toContain('Nano Influencer');
  });

  it('returns at least 6 KPIs', () => {
    const result = generateBrandInfluencer(brand);
    expect(Object.keys(result.kpis).length).toBeGreaterThanOrEqual(6);
  });

  it('returns at least 7 disclosure guidelines', () => {
    const result = generateBrandInfluencer(brand);
    expect(result.disclosureGuidelines.length).toBeGreaterThanOrEqual(7);
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandInfluencer(brand);
    expect(result.influencerBriefSummary).toContain('Spark');
  });

  it('campaign brief template contains brand name', () => {
    const result = generateBrandInfluencer(brand);
    expect(result.campaignBriefTemplate).toContain('Spark');
  });

  it('bold style has high-energy content preferences', () => {
    const result = generateBrandInfluencer(brand);
    expect(result.contentPreferences.some((p) => /challenge|energy|live|reaction/i.test(p))).toBe(
      true
    );
  });

  it('minimal style has clean aesthetic preferences', () => {
    const minimalBrand = { ...brand, style: 'minimal' as const };
    const result = generateBrandInfluencer(minimalBrand);
    expect(result.contentPreferences.some((p) => /minimal|clean|flat/i.test(p))).toBe(true);
  });

  it('tech style adds developer KPIs', () => {
    const techBrand = { ...brand, style: 'tech' as const };
    const result = generateBrandInfluencer(techBrand);
    expect(result.kpis).toHaveProperty('developer_sign_ups');
    expect(result.kpis).toHaveProperty('github_stars');
  });

  it('organic style has sustainability-oriented approach', () => {
    const organicBrand = { ...brand, style: 'organic' as const };
    const result = generateBrandInfluencer(organicBrand);
    expect(result.influencerApproach).toMatch(/purpose|sustainability|conscious/i);
  });

  it('elegant style mentions prestige or luxury', () => {
    const elegantBrand = { ...brand, style: 'elegant' as const };
    const result = generateBrandInfluencer(elegantBrand);
    expect(result.influencerApproach).toMatch(/prestige|luxury|aspirational/i);
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand = { ...brand, style: 'unknown' as never };
    const result = generateBrandInfluencer(unknownBrand);
    const minimal = generateBrandInfluencer({ ...brand, style: 'minimal' });
    expect(result.influencerApproach).toBe(minimal.influencerApproach);
  });

  it('brand without tagline does not include undefined in summary', () => {
    const noTagBrand = { ...brand, tagline: undefined };
    const result = generateBrandInfluencer(noTagBrand);
    expect(result.influencerBriefSummary).not.toMatch(/undefined/);
    expect(result.campaignBriefTemplate).not.toMatch(/undefined/);
  });
});
