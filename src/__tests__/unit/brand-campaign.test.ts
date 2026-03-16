import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandCampaign } from '../../lib/branding-core/generators/brand-campaign.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'TestCorp',
    tagline: 'Built for the future',
    industry: 'technology',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

const brand = createTestBrand();

describe('generateBrandCampaign', () => {
  it('returns all required top-level fields', () => {
    const result = generateBrandCampaign(brand);
    expect(result.campaignThemes).toBeDefined();
    expect(result.primaryObjective).toBeDefined();
    expect(result.secondaryObjectives).toBeDefined();
    expect(result.targetAudience).toBeDefined();
    expect(result.channels).toBeDefined();
    expect(result.phases).toBeDefined();
    expect(result.messagingPillars).toBeDefined();
    expect(result.creativeConcept).toBeDefined();
    expect(result.callToAction).toBeDefined();
    expect(result.successMetrics).toBeDefined();
    expect(result.budgetAllocation).toBeDefined();
    expect(result.campaignDuration).toBeDefined();
    expect(result.keyMessages).toBeDefined();
  });

  it('returns at least 4 campaign themes', () => {
    const result = generateBrandCampaign(brand);
    expect(result.campaignThemes.length).toBeGreaterThanOrEqual(4);
  });

  it('returns at least 3 channels with required fields', () => {
    const result = generateBrandCampaign(brand);
    expect(result.channels.length).toBeGreaterThanOrEqual(3);
    result.channels.forEach((ch) => {
      expect(ch.name).toBeTruthy();
      expect(ch.role).toBeTruthy();
      expect(ch.budget).toBeTruthy();
      expect(Array.isArray(ch.tactics)).toBe(true);
    });
  });

  it('returns exactly 4 campaign phases', () => {
    const result = generateBrandCampaign(brand);
    expect(result.phases.length).toBe(4);
    result.phases.forEach((phase) => {
      expect(phase.name).toBeTruthy();
      expect(phase.duration).toBeTruthy();
      expect(phase.goal).toBeTruthy();
      expect(Array.isArray(phase.tactics)).toBe(true);
      expect(Array.isArray(phase.kpis)).toBe(true);
      expect(phase.messaging).toBeTruthy();
    });
  });

  it('returns 3 key messages', () => {
    const result = generateBrandCampaign(brand);
    expect(result.keyMessages.length).toBe(3);
  });

  it('includes brand name in creative concept', () => {
    const result = generateBrandCampaign(brand);
    expect(result.creativeConcept).toContain('TestCorp');
  });

  it('uses tagline in key messages when tagline is present', () => {
    const result = generateBrandCampaign(brand);
    expect(result.keyMessages[0]).toContain('Built for the future');
  });

  it('falls back gracefully when no tagline is present', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const result = generateBrandCampaign(noTagBrand);
    expect(result.keyMessages[0]).toContain('TestCorp');
    expect(result.keyMessages[0]).not.toContain('undefined');
  });

  it('adapts channels for minimal style', () => {
    const minBrand = createTestBrand({ style: 'minimal' });
    const result = generateBrandCampaign(minBrand);
    expect(result.channels.some((ch) => ch.name === 'Content Marketing')).toBe(true);
  });

  it('adapts channels for bold style', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const result = generateBrandCampaign(boldBrand);
    expect(result.channels.some((ch) => ch.name === 'Social Media')).toBe(true);
  });

  it('adapts channels for corporate style', () => {
    const corpBrand = createTestBrand({ style: 'corporate' });
    const result = generateBrandCampaign(corpBrand);
    expect(result.channels.some((ch) => ch.name === 'LinkedIn')).toBe(true);
  });

  it('success metrics contain base fields', () => {
    const result = generateBrandCampaign(brand);
    expect(result.successMetrics['brand_awareness']).toBeTruthy();
    expect(result.successMetrics['roi']).toBeTruthy();
  });

  it('tech style includes developer-specific success metrics', () => {
    const result = generateBrandCampaign(brand);
    expect(result.successMetrics['developer_signups']).toBeTruthy();
  });

  it('budget allocation adds up correctly (all values are percentages)', () => {
    const result = generateBrandCampaign(brand);
    Object.values(result.budgetAllocation).forEach((v) => {
      expect(v).toMatch(/\d+%/);
    });
  });

  it('falls back to minimal style for unknown style', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandCampaign(unknownBrand);
    expect(result.channels.some((ch) => ch.name === 'Content Marketing')).toBe(true);
  });
});
