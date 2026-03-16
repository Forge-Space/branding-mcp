import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
  generateBrandPr,
} from '../../lib/branding-core/index.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Acme Corp',
    tagline: 'Built for tomorrow',
    industry: 'technology',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandPr', () => {
  const brand = createTestBrand();
  const result = generateBrandPr(brand);

  it('returns all required top-level fields', () => {
    expect(result.prApproach).toBeTruthy();
    expect(Array.isArray(result.mediaAngles)).toBe(true);
    expect(result.headlineFormula).toBeTruthy();
    expect(Array.isArray(result.pressReleases)).toBe(true);
    expect(Array.isArray(result.mediaContacts)).toBe(true);
    expect(Array.isArray(result.mediaKitContents)).toBe(true);
    expect(Array.isArray(result.spokespeople)).toBe(true);
    expect(Array.isArray(result.crisisProtocol)).toBe(true);
    expect(Array.isArray(result.embargoPractices)).toBe(true);
    expect(Array.isArray(result.measurementKpis)).toBe(true);
    expect(result.prBriefSummary).toBeTruthy();
  });

  it('returns at least 3 media angles', () => {
    expect(result.mediaAngles.length).toBeGreaterThanOrEqual(3);
  });

  it('returns exactly 3 press release templates', () => {
    expect(result.pressReleases.length).toBe(3);
  });

  it('each press release has required fields', () => {
    result.pressReleases.forEach((pr) => {
      expect(pr.type).toBeTruthy();
      expect(pr.headline).toBeTruthy();
      expect(pr.subheadline).toBeTruthy();
      expect(pr.dateline).toBeTruthy();
      expect(pr.boilerplate).toBeTruthy();
      expect(pr.quoteGuidance).toBeTruthy();
      expect(pr.callToAction).toBeTruthy();
    });
  });

  it('press release headlines include brand name', () => {
    result.pressReleases.forEach((pr) => {
      expect(pr.headline).toContain('Acme Corp');
    });
  });

  it('returns at least 2 media contacts', () => {
    expect(result.mediaContacts.length).toBeGreaterThanOrEqual(2);
  });

  it('each media contact has tier, outlet, angle, and preferredFormat', () => {
    result.mediaContacts.forEach((contact) => {
      expect(contact.tier).toBeTruthy();
      expect(contact.outlet).toBeTruthy();
      expect(contact.angle).toBeTruthy();
      expect(contact.preferredFormat).toBeTruthy();
    });
  });

  it('media kit contains at least 8 items including logo and brand overview', () => {
    expect(result.mediaKitContents.length).toBeGreaterThanOrEqual(8);
    const all = result.mediaKitContents.join(' ');
    expect(all).toContain('logo');
    expect(all.toLowerCase()).toContain('acme corp');
  });

  it('spokespeople list has at least 4 entries', () => {
    expect(result.spokespeople.length).toBeGreaterThanOrEqual(4);
  });

  it('crisis protocol has at least 5 steps', () => {
    expect(result.crisisProtocol.length).toBeGreaterThanOrEqual(5);
  });

  it('embargo practices includes embargo period guidance', () => {
    const all = result.embargoPractices.join(' ');
    expect(all.toLowerCase()).toContain('embargo');
  });

  it('measurement KPIs has at least 5 items', () => {
    expect(result.measurementKpis.length).toBeGreaterThanOrEqual(5);
  });

  it('brief summary contains brand name and tagline', () => {
    expect(result.prBriefSummary).toContain('Acme Corp');
    expect(result.prBriefSummary).toContain('Built for tomorrow');
  });

  it('tech style targets developer and tech media', () => {
    const outlets = result.mediaContacts.map((c) => c.outlet).join(' ');
    expect(outlets.toLowerCase()).toMatch(/tech|developer|hacker/i);
  });

  it('bold style uses disruption-focused media angles', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const boldResult = generateBrandPr(boldBrand);
    const angles = boldResult.mediaAngles.join(' ').toLowerCase();
    expect(angles).toMatch(/disrupt|market|category|vision/i);
  });

  it('elegant style targets luxury and premium media', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const elegantResult = generateBrandPr(elegantBrand);
    const outlets = elegantResult.mediaContacts
      .map((c) => c.outlet)
      .join(' ')
      .toLowerCase();
    expect(outlets).toMatch(/luxury|vogue|monocle|premium/i);
  });

  it('unknown style falls back to minimal approach', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const unknownResult = generateBrandPr(unknownBrand);
    expect(unknownResult.prApproach).toBeTruthy();
    expect(unknownResult.pressReleases.length).toBe(3);
  });

  it('brand without tagline produces valid output', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const noTagResult = generateBrandPr(noTagBrand);
    expect(noTagResult.prBriefSummary).not.toContain('undefined');
    expect(noTagResult.pressReleases[0].boilerplate).not.toContain('undefined');
  });
});
