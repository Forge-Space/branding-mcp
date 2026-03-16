import { generateBrandPitch } from '../../lib/branding-core/generators/brand-pitch.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-id',
    name: 'Acme Corp',
    tagline: 'Simplifying the complex',
    industry: 'tech software saas',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandPitch', () => {
  it('returns all required top-level fields', () => {
    const brand = createTestBrand();
    const result = generateBrandPitch(brand);
    expect(result.elevatorPitches).toBeDefined();
    expect(result.pitchDeck).toBeDefined();
    expect(result.oneLinePitch).toBeTruthy();
    expect(result.problemStatement).toBeTruthy();
    expect(result.solutionStatement).toBeTruthy();
    expect(result.uniqueValueProposition).toBeTruthy();
    expect(result.targetAudienceProfile).toBeTruthy();
    expect(result.competitiveAdvantages).toBeDefined();
    expect(result.callToAction).toBeTruthy();
    expect(result.investorHighlights).toBeDefined();
  });

  it('returns 3 elevator pitches with correct durations', () => {
    const brand = createTestBrand();
    const result = generateBrandPitch(brand);
    expect(result.elevatorPitches).toHaveLength(3);
    const durations = result.elevatorPitches.map((p) => p.duration);
    expect(durations).toContain('15s');
    expect(durations).toContain('30s');
    expect(durations).toContain('60s');
  });

  it('elevator pitches have script and wordCount', () => {
    const brand = createTestBrand();
    const result = generateBrandPitch(brand);
    for (const pitch of result.elevatorPitches) {
      expect(pitch.script).toBeTruthy();
      expect(typeof pitch.wordCount).toBe('number');
      expect(pitch.wordCount).toBeGreaterThan(0);
    }
  });

  it('returns 7-slide pitch deck', () => {
    const brand = createTestBrand();
    const result = generateBrandPitch(brand);
    expect(result.pitchDeck).toHaveLength(7);
  });

  it('pitch deck slides have title, content array, and speakerNotes', () => {
    const brand = createTestBrand();
    const result = generateBrandPitch(brand);
    for (const slide of result.pitchDeck) {
      expect(slide.title).toBeTruthy();
      expect(Array.isArray(slide.content)).toBe(true);
      expect(slide.content.length).toBeGreaterThan(0);
      expect(slide.speakerNotes).toBeTruthy();
    }
  });

  it('returns 4 competitive advantages', () => {
    const brand = createTestBrand();
    const result = generateBrandPitch(brand);
    expect(result.competitiveAdvantages).toHaveLength(4);
    for (const advantage of result.competitiveAdvantages) {
      expect(typeof advantage).toBe('string');
      expect(advantage.length).toBeGreaterThan(0);
    }
  });

  it('returns 4 investor highlights with required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandPitch(brand);
    expect(result.investorHighlights).toHaveLength(4);
    for (const highlight of result.investorHighlights) {
      expect(highlight.category).toBeTruthy();
      expect(highlight.headline).toBeTruthy();
      expect(highlight.detail).toBeTruthy();
    }
  });

  it('one-line pitch includes brand name and tagline', () => {
    const brand = createTestBrand();
    const result = generateBrandPitch(brand);
    expect(result.oneLinePitch).toContain('Acme Corp');
    expect(result.oneLinePitch).toContain('Simplifying the complex');
  });

  it('adapts pitch for bold style', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandPitch(brand);
    expect(result.callToAction).toContain('Join us');
  });

  it('adapts pitch for corporate style', () => {
    const brand = createTestBrand({ style: 'corporate' });
    const result = generateBrandPitch(brand);
    expect(result.callToAction).toContain('Partner');
  });

  it('adapts pitch for tech style', () => {
    const brand = createTestBrand({ style: 'tech', industry: 'SaaS platform' });
    const result = generateBrandPitch(brand);
    expect(result.callToAction).toContain('demo');
  });

  it('adapts problem statement for finance industry', () => {
    const brand = createTestBrand({ industry: 'finance banking' });
    const result = generateBrandPitch(brand);
    expect(result.problemStatement.toLowerCase()).toMatch(/financial|individuals|organizations/);
  });

  it('adapts problem statement for health industry', () => {
    const brand = createTestBrand({ industry: 'health wellness medical' });
    const result = generateBrandPitch(brand);
    expect(result.problemStatement.toLowerCase()).toMatch(/people|care|barriers/);
  });

  it('falls back to tech problem for unknown industry', () => {
    const brand = createTestBrand({ industry: 'underwater basket weaving' });
    const result = generateBrandPitch(brand);
    expect(result.problemStatement).toBeTruthy();
  });

  it('handles brand without tagline', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandPitch(brand);
    expect(result.oneLinePitch).toContain('Acme Corp');
    expect(result.elevatorPitches[0].script).toBeTruthy();
  });
});
