import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandInvestor } from '../../lib/branding-core/generators/brand-investor.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#1A56DB', 'triadic');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'TechVenture',
    tagline: 'Build the future',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandInvestor', () => {
  const brand = createTestBrand();
  const result = generateBrandInvestor(brand);

  it('returns all required fields', () => {
    expect(result.communicationTone).toBeTruthy();
    expect(result.investmentThesis).toBeTruthy();
    expect(Array.isArray(result.competitiveMoat)).toBe(true);
    expect(Array.isArray(result.useOfFunds)).toBe(true);
    expect(Array.isArray(result.idealInvestorProfile)).toBe(true);
    expect(result.executiveSummary).toBeTruthy();
    expect(Array.isArray(result.investorDeck)).toBe(true);
    expect(Array.isArray(result.dueDiligenceChecklist)).toBe(true);
    expect(typeof result.faqAnswers).toBe('object');
    expect(result.investorBriefSummary).toBeTruthy();
  });

  it('returns 12 investor deck slides', () => {
    expect(result.investorDeck).toHaveLength(12);
  });

  it('each deck slide has required fields', () => {
    for (const slide of result.investorDeck) {
      expect(slide.slide).toBeTruthy();
      expect(slide.headline).toBeTruthy();
      expect(Array.isArray(slide.bullets)).toBe(true);
      expect(slide.speakerNotes).toBeTruthy();
    }
  });

  it('competitive moat has at least 2 items', () => {
    expect(result.competitiveMoat.length).toBeGreaterThanOrEqual(2);
  });

  it('use of funds has at least 2 items', () => {
    expect(result.useOfFunds.length).toBeGreaterThanOrEqual(2);
  });

  it('ideal investor profile has at least 2 items', () => {
    expect(result.idealInvestorProfile.length).toBeGreaterThanOrEqual(2);
  });

  it('due diligence checklist has 10 items', () => {
    expect(result.dueDiligenceChecklist).toHaveLength(10);
  });

  it('faqAnswers has 5 standard keys', () => {
    expect(result.faqAnswers).toHaveProperty('why_now');
    expect(result.faqAnswers).toHaveProperty('biggest_risk');
    expect(result.faqAnswers).toHaveProperty('how_will_you_win');
    expect(result.faqAnswers).toHaveProperty('what_does_success_look_like');
    expect(result.faqAnswers).toHaveProperty('exit_strategy');
  });

  it('executive summary contains brand name', () => {
    expect(result.executiveSummary).toContain('TechVenture');
  });

  it('executive summary contains tagline when present', () => {
    expect(result.executiveSummary).toContain('Build the future');
  });

  it('brief summary contains brand name', () => {
    expect(result.investorBriefSummary).toContain('TechVenture');
  });

  it('tech style uses deep tech investor profile', () => {
    expect(result.idealInvestorProfile.some((p) => p.toLowerCase().includes('tech'))).toBe(true);
  });

  it('tech style uses technical communication tone', () => {
    expect(result.communicationTone.toLowerCase()).toContain('technical');
  });

  it('corporate style uses formal tone and enterprise investors', () => {
    const corporateBrand = createTestBrand({ style: 'corporate' });
    const r = generateBrandInvestor(corporateBrand);
    expect(r.communicationTone.toLowerCase()).toContain('formal');
    expect(r.idealInvestorProfile.some((p) => p.toLowerCase().includes('enterprise'))).toBe(true);
  });

  it('organic style uses impact/ESG framing', () => {
    const organicBrand = createTestBrand({ style: 'organic', industry: 'sustainable agriculture' });
    const r = generateBrandInvestor(organicBrand);
    expect(r.investmentThesis.toLowerCase()).toContain('impact');
    expect(r.idealInvestorProfile.some((p) => p.toLowerCase().includes('impact'))).toBe(true);
  });

  it('no-tagline brand works without tagline', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const r = generateBrandInvestor(noTagBrand);
    expect(r.executiveSummary).not.toContain('undefined');
    expect(r.investorDeck[0].headline).not.toContain('undefined');
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const r = generateBrandInvestor(unknownBrand);
    expect(r.communicationTone).toBeTruthy();
    expect(r.competitiveMoat.length).toBeGreaterThanOrEqual(2);
  });

  it('bold style leads with vision and scale in tone and thesis', () => {
    const r = generateBrandInvestor(createTestBrand({ style: 'bold' }));
    expect(r.communicationTone.toLowerCase()).toContain('vision');
    expect(r.investmentThesis.toLowerCase()).toContain('category');
    expect(r.competitiveMoat.some((m) => m.toLowerCase().includes('network'))).toBe(true);
  });

  it('elegant style emphasises premium positioning in tone and thesis', () => {
    const r = generateBrandInvestor(createTestBrand({ style: 'elegant' }));
    expect(r.communicationTone.toLowerCase()).toContain('sophisticated');
    expect(r.investmentThesis.toLowerCase()).toContain('premium');
    expect(r.competitiveMoat.some((m) => m.toLowerCase().includes('premium'))).toBe(true);
  });

  it('playful style is energetic and founder-led in tone', () => {
    const r = generateBrandInvestor(createTestBrand({ style: 'playful' }));
    expect(r.communicationTone.toLowerCase()).toContain('energetic');
    expect(r.investmentThesis.toLowerCase()).toContain('community');
    expect(r.competitiveMoat.some((m) => m.toLowerCase().includes('community'))).toBe(true);
  });

  it('retro style leans into nostalgia and loyal community', () => {
    const r = generateBrandInvestor(createTestBrand({ style: 'retro' }));
    expect(r.communicationTone.toLowerCase()).toContain('authentic');
    expect(r.investmentThesis.toLowerCase()).toContain('differentiated');
    expect(r.competitiveMoat.some((m) => m.toLowerCase().includes('authentic'))).toBe(true);
  });

  it('minimal style is precise and data-driven', () => {
    const r = generateBrandInvestor(createTestBrand({ style: 'minimal' }));
    expect(r.communicationTone.toLowerCase()).toContain('precise');
    expect(r.investmentThesis.toLowerCase()).toContain('capital-efficient');
    expect(r.competitiveMoat.some((m) => m.toLowerCase().includes('efficiency'))).toBe(true);
  });
});
