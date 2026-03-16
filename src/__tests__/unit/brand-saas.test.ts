import { describe, it, expect, beforeAll } from '@jest/globals';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandSaas } from '../../lib/branding-core/generators/brand-saas.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TestSaaS',
    tagline: 'Simpler software',
    industry: 'software technology',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandSaas', () => {
  let brand: BrandIdentity;

  beforeAll(() => {
    brand = createTestBrand();
  });

  it('returns all required fields', () => {
    const result = generateBrandSaas(brand);
    expect(result.positioning).toBeTruthy();
    expect(result.pricingModel).toBeDefined();
    expect(result.trialStrategy).toBeTruthy();
    expect(result.onboardingFlow).toBeDefined();
    expect(result.retentionTactics).toBeDefined();
    expect(result.keyIntegrations).toBeDefined();
    expect(result.supportModel).toBeTruthy();
    expect(result.churnWarningSignals).toBeDefined();
    expect(result.complianceCertifications).toBeDefined();
    expect(result.saasBriefSummary).toBeTruthy();
  });

  it('has at least 3 pricing model items', () => {
    const result = generateBrandSaas(brand);
    expect(result.pricingModel.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 3 onboarding flow items', () => {
    const result = generateBrandSaas(brand);
    expect(result.onboardingFlow.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 3 retention tactics', () => {
    const result = generateBrandSaas(brand);
    expect(result.retentionTactics.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 3 key integrations', () => {
    const result = generateBrandSaas(brand);
    expect(result.keyIntegrations.length).toBeGreaterThanOrEqual(3);
  });

  it('has at least 5 churn warning signals', () => {
    const result = generateBrandSaas(brand);
    expect(result.churnWarningSignals.length).toBeGreaterThanOrEqual(5);
  });

  it('has at least 4 compliance certifications', () => {
    const result = generateBrandSaas(brand);
    expect(result.complianceCertifications.length).toBeGreaterThanOrEqual(4);
  });

  it('brief summary contains brand name and tagline', () => {
    const result = generateBrandSaas(brand);
    expect(result.saasBriefSummary).toContain('TestSaaS');
    expect(result.saasBriefSummary).toContain('Simpler software');
  });

  it('tech style includes GitHub in integrations', () => {
    const result = generateBrandSaas(brand);
    expect(result.keyIntegrations.some((i) => i.toLowerCase().includes('github'))).toBe(true);
  });

  it('tech style adds API churn signals', () => {
    const result = generateBrandSaas(brand);
    const hasApiSignal = result.churnWarningSignals.some((s) => s.toLowerCase().includes('api'));
    expect(hasApiSignal).toBe(true);
  });

  it('tech style adds SLSA compliance cert', () => {
    const result = generateBrandSaas(brand);
    const hasSlsa = result.complianceCertifications.some((c) => c.toLowerCase().includes('slsa'));
    expect(hasSlsa).toBe(true);
  });

  it('corporate style has enterprise support model', () => {
    const corp = createTestBrand({ style: 'corporate' });
    const result = generateBrandSaas(corp);
    expect(result.supportModel.toLowerCase()).toContain('enterprise');
  });

  it('corporate style adds executive compliance certs', () => {
    const corp = createTestBrand({ style: 'corporate' });
    const result = generateBrandSaas(corp);
    const hasFedRamp = result.complianceCertifications.some((c) =>
      c.toLowerCase().includes('fedramp')
    );
    expect(hasFedRamp).toBe(true);
  });

  it('organic style mentions B Corp in compliance', () => {
    const org = createTestBrand({ style: 'organic', industry: 'sustainability' });
    const result = generateBrandSaas(org);
    const hasBCorp = result.complianceCertifications.some((c) =>
      c.toLowerCase().includes('b corp')
    );
    expect(hasBCorp).toBe(true);
  });

  it('minimal style has flat-rate pricing language', () => {
    const min = createTestBrand({ style: 'minimal' });
    const result = generateBrandSaas(min);
    expect(result.pricingModel.some((p) => p.toLowerCase().includes('flat'))).toBe(true);
  });

  it('unknown style falls back to minimal', () => {
    const unknown = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandSaas(unknown);
    expect(result.positioning).toBeTruthy();
    expect(result.pricingModel.length).toBeGreaterThanOrEqual(2);
  });

  it('brand without tagline still generates valid summary', () => {
    const noTag = createTestBrand({ tagline: undefined });
    const result = generateBrandSaas(noTag);
    expect(result.saasBriefSummary).toContain('TestSaaS');
    expect(result.saasBriefSummary).not.toContain('undefined');
  });
});
