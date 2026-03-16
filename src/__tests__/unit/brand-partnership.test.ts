import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
  generateBrandPartnership,
} from '../../lib/branding-core/index.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#2563EB', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

const brand: BrandIdentity = {
  id: 'test-brand',
  name: 'TechCorp',
  tagline: 'Innovation at scale',
  industry: 'technology',
  style: 'tech',
  colors,
  typography,
  spacing,
  createdAt: new Date().toISOString(),
};

describe('generateBrandPartnership', () => {
  it('returns all required top-level fields', () => {
    const result = generateBrandPartnership(brand);
    expect(result.partnershipApproach).toBeTruthy();
    expect(result.idealPartnerProfiles).toBeDefined();
    expect(result.collaborationThemes).toBeDefined();
    expect(result.partnerValueExchange).toBeTruthy();
    expect(result.screeningCriteria).toBeDefined();
    expect(result.partnershipTiers).toBeDefined();
    expect(result.collaborationFormats).toBeDefined();
    expect(result.outreachTemplate).toBeTruthy();
    expect(result.negotiationPrinciples).toBeDefined();
    expect(result.redFlags).toBeDefined();
    expect(result.partnershipBriefSummary).toBeTruthy();
  });

  it('returns at least 3 ideal partner profiles', () => {
    const result = generateBrandPartnership(brand);
    expect(result.idealPartnerProfiles.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 collaboration themes', () => {
    const result = generateBrandPartnership(brand);
    expect(result.collaborationThemes.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 screening criteria', () => {
    const result = generateBrandPartnership(brand);
    expect(result.screeningCriteria.length).toBeGreaterThanOrEqual(3);
  });

  it('returns exactly 3 partnership tiers', () => {
    const result = generateBrandPartnership(brand);
    expect(result.partnershipTiers.length).toBe(3);
  });

  it('each partnership tier has required fields', () => {
    const result = generateBrandPartnership(brand);
    for (const tier of result.partnershipTiers) {
      expect(tier.tier).toBeTruthy();
      expect(tier.description).toBeTruthy();
      expect(tier.commitment).toBeTruthy();
      expect(tier.investmentLevel).toBeTruthy();
      expect(Array.isArray(tier.benefits)).toBe(true);
      expect(Array.isArray(tier.requirements)).toBe(true);
    }
  });

  it('returns exactly 4 collaboration formats', () => {
    const result = generateBrandPartnership(brand);
    expect(result.collaborationFormats.length).toBe(4);
  });

  it('each collaboration format has required fields', () => {
    const result = generateBrandPartnership(brand);
    for (const fmt of result.collaborationFormats) {
      expect(fmt.format).toBeTruthy();
      expect(fmt.description).toBeTruthy();
      expect(fmt.timeline).toBeTruthy();
      expect(Array.isArray(fmt.channels)).toBe(true);
      expect(Array.isArray(fmt.kpis)).toBe(true);
    }
  });

  it('outreach template contains brand name', () => {
    const result = generateBrandPartnership(brand);
    expect(result.outreachTemplate).toContain('TechCorp');
  });

  it('outreach template contains tagline when present', () => {
    const result = generateBrandPartnership(brand);
    expect(result.outreachTemplate).toContain('Innovation at scale');
  });

  it('returns at least 5 negotiation principles', () => {
    const result = generateBrandPartnership(brand);
    expect(result.negotiationPrinciples.length).toBeGreaterThanOrEqual(5);
  });

  it('returns at least 4 red flags', () => {
    const result = generateBrandPartnership(brand);
    expect(result.redFlags.length).toBeGreaterThanOrEqual(4);
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandPartnership(brand);
    expect(result.partnershipBriefSummary).toContain('TechCorp');
  });

  it('tech style uses developer ecosystem approach', () => {
    const result = generateBrandPartnership(brand);
    expect(result.partnershipApproach.toLowerCase()).toMatch(/developer|ecosystem|api|platform/);
  });

  it('elegant style uses luxury partnership approach', () => {
    const elegantBrand: BrandIdentity = { ...brand, style: 'elegant' };
    const result = generateBrandPartnership(elegantBrand);
    expect(result.partnershipApproach.toLowerCase()).toMatch(/luxury|heritage|exclusiv/);
  });

  it('organic style uses sustainability-focused approach', () => {
    const organicBrand: BrandIdentity = { ...brand, style: 'organic' };
    const result = generateBrandPartnership(organicBrand);
    expect(result.partnershipApproach.toLowerCase()).toMatch(/sustain|mission|regenerat/);
  });

  it('unknown style falls back to minimal approach', () => {
    const unknownBrand: BrandIdentity = { ...brand, style: 'unknown' as never };
    const result = generateBrandPartnership(unknownBrand);
    expect(result.partnershipApproach).toBeTruthy();
    expect(result.idealPartnerProfiles.length).toBeGreaterThanOrEqual(3);
  });
});
