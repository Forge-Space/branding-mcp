import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandPodcast } from '../../lib/branding-core/generators/brand-podcast.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TechCo',
    tagline: 'Build better, together',
    industry: 'software technology',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandPodcast', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.showConcept).toBeTruthy();
    expect(Array.isArray(result.recommendedFormats)).toBe(true);
    expect(result.publishingCadence).toBeTruthy();
    expect(result.hostPersona).toBeTruthy();
    expect(Array.isArray(result.guestSelectionCriteria)).toBe(true);
    expect(Array.isArray(result.distributionChannels)).toBe(true);
    expect(Array.isArray(result.monetisationStrategy)).toBe(true);
    expect(Array.isArray(result.productionChecklist)).toBe(true);
    expect(Array.isArray(result.growthStrategy)).toBe(true);
    expect(Array.isArray(result.accessibilityNotes)).toBe(true);
    expect(result.podcastBriefSummary).toBeTruthy();
  });

  it('returns at least 3 recommended formats', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.recommendedFormats.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 guest selection criteria', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.guestSelectionCriteria.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 2 distribution channels', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.distributionChannels.length).toBeGreaterThanOrEqual(2);
  });

  it('returns at least 3 monetisation strategies', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.monetisationStrategy.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 7 production checklist items', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.productionChecklist.length).toBeGreaterThanOrEqual(7);
  });

  it('returns at least 6 growth strategy items', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.growthStrategy.length).toBeGreaterThanOrEqual(6);
  });

  it('returns at least 7 accessibility notes', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.accessibilityNotes.length).toBeGreaterThanOrEqual(7);
  });

  it('includes brand name in brief summary', () => {
    const brand = createTestBrand();
    const result = generateBrandPodcast(brand);
    expect(result.podcastBriefSummary).toContain('TechCo');
  });

  it('includes tagline in brief summary when present', () => {
    const brand = createTestBrand({ tagline: 'Build better, together' });
    const result = generateBrandPodcast(brand);
    expect(result.podcastBriefSummary).toContain('Build better, together');
  });

  it('omits tagline from summary when not present', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandPodcast(brand);
    expect(result.podcastBriefSummary).not.toContain('undefined');
  });

  it('tech style adds screen-share and chapter-marker items to production checklist', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandPodcast(brand);
    const checklistText = result.productionChecklist.join(' ');
    expect(checklistText).toMatch(/Screen-share|Chapter markers/i);
  });

  it('bold style adds video recording to production checklist', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandPodcast(brand);
    const checklistText = result.productionChecklist.join(' ');
    expect(checklistText).toMatch(/[Vv]ideo recording/);
  });

  it('elegant style adds professional mastering to production checklist', () => {
    const brand = createTestBrand({ style: 'elegant' });
    const result = generateBrandPodcast(brand);
    const checklistText = result.productionChecklist.join(' ');
    expect(checklistText).toMatch(/[Mm]astering|[Cc]omposer/);
  });

  it('tech style includes tech growth channels', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandPodcast(brand);
    const growthText = result.growthStrategy.join(' ');
    expect(growthText).toMatch(/Discord|subreddit|Hacker News/i);
  });

  it('organic style includes NGO/impact co-promotion', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandPodcast(brand);
    const growthText = result.growthStrategy.join(' ');
    expect(growthText).toMatch(/NGO|impact/i);
  });

  it('unknown style falls back to minimal', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandPodcast(brand);
    expect(result.showConcept).toContain('signal-over-noise');
  });
});
