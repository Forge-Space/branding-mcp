import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandCommunity } from '../../lib/branding-core/generators/brand-community.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#4F46E5', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-1',
    name: 'TestBrand',
    tagline: 'Unite and grow',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandCommunity', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    expect(result.communityApproach).toBeTruthy();
    expect(Array.isArray(result.platforms)).toBe(true);
    expect(Array.isArray(result.engagementTactics)).toBe(true);
    expect(result.moderationApproach).toBeTruthy();
    expect(Array.isArray(result.memberRecognition)).toBe(true);
    expect(Array.isArray(result.growthLevers)).toBe(true);
    expect(Array.isArray(result.communityGuidelines)).toBe(true);
    expect(Array.isArray(result.onboardingFlow)).toBe(true);
    expect(typeof result.successMetrics).toBe('object');
    expect(result.communityBriefSummary).toBeTruthy();
  });

  it('platforms has at least 2 entries', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    expect(result.platforms.length).toBeGreaterThanOrEqual(2);
  });

  it('engagement tactics has at least 2 entries', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    expect(result.engagementTactics.length).toBeGreaterThanOrEqual(2);
  });

  it('member recognition has at least 2 entries', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    expect(result.memberRecognition.length).toBeGreaterThanOrEqual(2);
  });

  it('community guidelines has at least 5 entries', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    expect(result.communityGuidelines.length).toBeGreaterThanOrEqual(5);
  });

  it('community guidelines mention brand name', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    const mentionsBrand = result.communityGuidelines.some((g) => g.includes('TestBrand'));
    expect(mentionsBrand).toBe(true);
  });

  it('onboarding flow has at least 5 steps', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    expect(result.onboardingFlow.length).toBeGreaterThanOrEqual(5);
  });

  it('success metrics has at least 5 keys', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    expect(Object.keys(result.successMetrics).length).toBeGreaterThanOrEqual(5);
  });

  it('brief summary contains brand name', () => {
    const brand = createTestBrand();
    const result = generateBrandCommunity(brand);
    expect(result.communityBriefSummary).toContain('TestBrand');
  });

  it('brief summary contains tagline when present', () => {
    const brand = createTestBrand({ tagline: 'Unite and grow' });
    const result = generateBrandCommunity(brand);
    expect(result.communityBriefSummary).toContain('Unite and grow');
  });

  it('bold style uses high-energy approach', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandCommunity(brand);
    expect(result.communityApproach.toLowerCase()).toContain('high-energy');
    expect(result.platforms).toContain('Instagram');
  });

  it('tech style includes developer-focused platforms', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandCommunity(brand);
    expect(result.platforms).toContain('GitHub Discussions');
    expect(result.engagementTactics.some((t) => t.toLowerCase().includes('hackathon'))).toBe(true);
  });

  it('tech style adds code-sharing and AI disclosure guidelines', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandCommunity(brand);
    const guidelinesText = result.communityGuidelines.join(' ');
    expect(guidelinesText.toLowerCase()).toMatch(/licen[sc]e|ai-generated/i);
  });

  it('elegant style uses exclusive / refined approach', () => {
    const brand = createTestBrand({ style: 'elegant' });
    const result = generateBrandCommunity(brand);
    expect(result.communityApproach.toLowerCase()).toContain('exclusive');
  });

  it('organic style promotes values-based community', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandCommunity(brand);
    expect(result.communityApproach.toLowerCase()).toContain('purpose-driven');
  });

  it('falls back to minimal for unknown style', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandCommunity(brand);
    expect(result.communityApproach).toBeTruthy();
    expect(result.platforms.length).toBeGreaterThanOrEqual(2);
  });

  it('works without tagline', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandCommunity(brand);
    expect(result.communityBriefSummary).not.toMatch(/undefined/);
    expect(result.communityBriefSummary).toContain('TestBrand');
  });
});
