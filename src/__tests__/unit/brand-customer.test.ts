import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandCustomer } from '../../lib/branding-core/generators/brand-customer.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'Acme Corp',
    tagline: 'Building the future',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandCustomer', () => {
  it('returns all required top-level fields', () => {
    const brand = createTestBrand();
    const result = generateBrandCustomer(brand);
    expect(result.cxApproach).toBeTruthy();
    expect(result.loyaltyStrategy).toBeInstanceOf(Array);
    expect(result.supportTone).toBeTruthy();
    expect(result.feedbackChannels).toBeInstanceOf(Array);
    expect(result.personas).toBeInstanceOf(Array);
    expect(result.journeyStages).toBeInstanceOf(Array);
    expect(result.voiceOfCustomerPlan).toBeInstanceOf(Array);
    expect(result.customerBriefSummary).toBeTruthy();
  });

  it('returns at least 4 loyalty strategy items', () => {
    const result = generateBrandCustomer(createTestBrand());
    expect(result.loyaltyStrategy.length).toBeGreaterThanOrEqual(4);
  });

  it('returns at least 2 feedback channels', () => {
    const result = generateBrandCustomer(createTestBrand());
    expect(result.feedbackChannels.length).toBeGreaterThanOrEqual(2);
  });

  it('returns exactly 3 personas', () => {
    const result = generateBrandCustomer(createTestBrand());
    expect(result.personas).toHaveLength(3);
  });

  it('each persona has required fields', () => {
    const result = generateBrandCustomer(createTestBrand());
    for (const persona of result.personas) {
      expect(persona.name).toBeTruthy();
      expect(persona.demographics).toBeTruthy();
      expect(persona.goals.length).toBeGreaterThan(0);
      expect(persona.painPoints.length).toBeGreaterThan(0);
      expect(persona.motivations.length).toBeGreaterThan(0);
      expect(persona.preferredChannels.length).toBeGreaterThan(0);
      expect(persona.messageResonance).toBeTruthy();
    }
  });

  it('returns exactly 6 journey stages', () => {
    const result = generateBrandCustomer(createTestBrand());
    expect(result.journeyStages).toHaveLength(6);
  });

  it('each journey stage has required fields', () => {
    const result = generateBrandCustomer(createTestBrand());
    for (const stage of result.journeyStages) {
      expect(stage.stage).toBeTruthy();
      expect(stage.touchpoints.length).toBeGreaterThan(0);
      expect(stage.emotions).toBeTruthy();
      expect(stage.opportunities.length).toBeGreaterThan(0);
      expect(stage.kpis.length).toBeGreaterThan(0);
    }
  });

  it('journey stages cover awareness through advocacy', () => {
    const result = generateBrandCustomer(createTestBrand());
    const stageNames = result.journeyStages.map((s) => s.stage);
    expect(stageNames).toContain('Awareness');
    expect(stageNames).toContain('Purchase');
    expect(stageNames).toContain('Advocacy');
  });

  it('returns at least 7 VoC plan items', () => {
    const result = generateBrandCustomer(createTestBrand());
    expect(result.voiceOfCustomerPlan.length).toBeGreaterThanOrEqual(7);
  });

  it('brief summary contains brand name and tagline', () => {
    const brand = createTestBrand();
    const result = generateBrandCustomer(brand);
    expect(result.customerBriefSummary).toContain('Acme Corp');
    expect(result.customerBriefSummary).toContain('Building the future');
  });

  it('tech style uses API/data-driven CX approach', () => {
    const result = generateBrandCustomer(createTestBrand({ style: 'tech' }));
    expect(result.cxApproach.toLowerCase()).toMatch(/data|personalisation|anticipates/);
  });

  it('elegant style uses white-glove language', () => {
    const result = generateBrandCustomer(createTestBrand({ style: 'elegant' }));
    expect(result.cxApproach.toLowerCase()).toMatch(/white-glove|personalised|flawless/);
  });

  it('playful style mentions fun or gamified interactions', () => {
    const result = generateBrandCustomer(createTestBrand({ style: 'playful' }));
    expect(result.cxApproach.toLowerCase()).toMatch(/fun|gamified|enjoyable/);
  });

  it('retail industry affects persona pain points', () => {
    const result = generateBrandCustomer(createTestBrand({ industry: 'retail ecommerce' }));
    const primaryPersona = result.personas[0];
    expect(
      primaryPersona.painPoints.some(
        (p) => p.toLowerCase().includes('buyer') || p.toLowerCase().includes('choice')
      )
    ).toBe(true);
  });

  it('falls back gracefully for unknown style', () => {
    const result = generateBrandCustomer(createTestBrand({ style: 'unknown' as never }));
    expect(result.cxApproach).toBeTruthy();
    expect(result.loyaltyStrategy.length).toBeGreaterThan(0);
    expect(result.supportTone).toBeTruthy();
  });

  it('works without tagline', () => {
    const result = generateBrandCustomer(createTestBrand({ tagline: undefined }));
    expect(result.customerBriefSummary).not.toContain('undefined');
    expect(result.customerBriefSummary).toBeTruthy();
  });

  it('organic style mentions sustainable loyalty', () => {
    const result = generateBrandCustomer(createTestBrand({ style: 'organic' }));
    expect(
      result.loyaltyStrategy.some(
        (s) =>
          s.toLowerCase().includes('sustainab') ||
          s.toLowerCase().includes('environmental') ||
          s.toLowerCase().includes('cause')
      )
    ).toBe(true);
  });
});
