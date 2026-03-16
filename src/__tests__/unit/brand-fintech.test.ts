import { describe, it, expect, beforeAll } from '@jest/globals';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandFintech } from '../../lib/branding-core/generators/brand-fintech.js';
import { BrandIdentity } from '../../lib/types.js';

let brand: BrandIdentity;

beforeAll(() => {
  const colors = generateColorPalette('#1A73E8', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  brand = {
    id: 'test-fintech',
    name: 'Monzo',
    tagline: 'Banking made better',
    industry: 'fintech digital banking',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
  };
});

describe('generateBrandFintech', () => {
  it('returns all required fields', () => {
    const result = generateBrandFintech(brand);
    expect(result.positioning).toBeTruthy();
    expect(result.coreProducts).toBeInstanceOf(Array);
    expect(result.trustSignals).toBeInstanceOf(Array);
    expect(result.regulatoryFramework).toBeInstanceOf(Array);
    expect(result.securityPosture).toBeInstanceOf(Array);
    expect(result.messagingPillars).toBeInstanceOf(Array);
    expect(result.complianceChecklist).toBeInstanceOf(Array);
    expect(result.userJourney).toBeInstanceOf(Array);
    expect(result.fintechBriefSummary).toBeTruthy();
  });

  it('returns 4+ core products', () => {
    const result = generateBrandFintech(brand);
    expect(result.coreProducts.length).toBeGreaterThanOrEqual(4);
  });

  it('returns 4+ trust signals', () => {
    const result = generateBrandFintech(brand);
    expect(result.trustSignals.length).toBeGreaterThanOrEqual(4);
  });

  it('returns 4+ regulatory framework items', () => {
    const result = generateBrandFintech(brand);
    expect(result.regulatoryFramework.length).toBeGreaterThanOrEqual(4);
  });

  it('returns 4+ security posture items', () => {
    const result = generateBrandFintech(brand);
    expect(result.securityPosture.length).toBeGreaterThanOrEqual(4);
  });

  it('returns 3 messaging pillars', () => {
    const result = generateBrandFintech(brand);
    expect(result.messagingPillars.length).toBeGreaterThanOrEqual(3);
  });

  it('returns 8+ compliance checklist items', () => {
    const result = generateBrandFintech(brand);
    expect(result.complianceChecklist.length).toBeGreaterThanOrEqual(8);
  });

  it('returns 6+ user journey steps', () => {
    const result = generateBrandFintech(brand);
    expect(result.userJourney.length).toBeGreaterThanOrEqual(6);
  });

  it('brief summary contains brand name', () => {
    const result = generateBrandFintech(brand);
    expect(result.fintechBriefSummary).toContain('Monzo');
  });

  it('brief summary contains tagline', () => {
    const result = generateBrandFintech(brand);
    expect(result.fintechBriefSummary).toContain('Banking made better');
  });

  it('tech style adds PSD2 and Open Banking to regulatory framework', () => {
    const result = generateBrandFintech(brand);
    const hasPsd2 = result.regulatoryFramework.some((r) => r.includes('PSD2'));
    expect(hasPsd2).toBe(true);
  });

  it('tech style adds developer sign-up step to user journey', () => {
    const result = generateBrandFintech(brand);
    const hasDev = result.userJourney.some((s) => s.toLowerCase().includes('developer'));
    expect(hasDev).toBe(true);
  });

  it('tech style adds bug bounty to compliance checklist', () => {
    const result = generateBrandFintech(brand);
    const hasBugBounty = result.complianceChecklist.some((c) =>
      c.toLowerCase().includes('bug bounty')
    );
    expect(hasBugBounty).toBe(true);
  });

  it('corporate style produces enterprise-focused core products', () => {
    const corpBrand: BrandIdentity = { ...brand, style: 'corporate' };
    const result = generateBrandFintech(corpBrand);
    const hasCorp = result.coreProducts.some(
      (p) => p.toLowerCase().includes('treasury') || p.toLowerCase().includes('corporate')
    );
    expect(hasCorp).toBe(true);
  });

  it('organic style adds ESG/SFDR compliance', () => {
    const organicBrand: BrandIdentity = { ...brand, style: 'organic' };
    const result = generateBrandFintech(organicBrand);
    const hasSfdr = result.complianceChecklist.some((c) => c.includes('SFDR'));
    expect(hasSfdr).toBe(true);
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand: BrandIdentity = { ...brand, style: 'unknown' as never };
    const result = generateBrandFintech(unknownBrand);
    expect(result.positioning).toContain('Clean');
    expect(result.coreProducts.length).toBeGreaterThanOrEqual(4);
  });

  it('works without tagline', () => {
    const noTagBrand: BrandIdentity = { ...brand, tagline: undefined };
    const result = generateBrandFintech(noTagBrand);
    expect(result.fintechBriefSummary).not.toContain('undefined');
    expect(result.fintechBriefSummary).toBeTruthy();
  });
});
