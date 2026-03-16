import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
} from '../../lib/branding-core/index.js';
import type { BrandIdentity } from '../../lib/types.js';
import { generateBrandEmployer } from '../../lib/branding-core/generators/brand-employer.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#6B4CE6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'TestCo',
    tagline: 'Building better tomorrow',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandEmployer', () => {
  let brand: BrandIdentity;

  beforeAll(() => {
    brand = createTestBrand();
  });

  it('returns all required fields', () => {
    const result = generateBrandEmployer(brand);
    expect(result.evpStatement).toBeTruthy();
    expect(Array.isArray(result.culturePillars)).toBe(true);
    expect(Array.isArray(result.benefitsFraming)).toBe(true);
    expect(Array.isArray(result.candidatePersonaTraits)).toBe(true);
    expect(result.interviewApproach).toBeTruthy();
    expect(result.onboardingApproach).toBeTruthy();
    expect(Array.isArray(result.jobAdGuidelines)).toBe(true);
    expect(result.employerBriefSummary).toBeTruthy();
  });

  it('returns at least 3 culture pillars', () => {
    const result = generateBrandEmployer(brand);
    expect(result.culturePillars.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 5 benefits', () => {
    const result = generateBrandEmployer(brand);
    expect(result.benefitsFraming.length).toBeGreaterThanOrEqual(5);
  });

  it('returns at least 3 candidate persona traits', () => {
    const result = generateBrandEmployer(brand);
    expect(result.candidatePersonaTraits.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 5 job-ad guidelines', () => {
    const result = generateBrandEmployer(brand);
    expect(result.jobAdGuidelines.length).toBeGreaterThanOrEqual(5);
  });

  it('includes brand name in brief summary', () => {
    const result = generateBrandEmployer(brand);
    expect(result.employerBriefSummary).toContain('TestCo');
  });

  it('includes tagline in brief summary when present', () => {
    const result = generateBrandEmployer(brand);
    expect(result.employerBriefSummary).toContain('Building better tomorrow');
  });

  it('bold style gives energetic EVP and equity benefits', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const result = generateBrandEmployer(boldBrand);
    expect(result.evpStatement.toLowerCase()).toMatch(/ambitious|energy|dent/);
    expect(result.benefitsFraming.some((b) => b.toLowerCase().includes('equity'))).toBe(true);
  });

  it('tech style gives engineer-focused EVP and open-source benefit', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const result = generateBrandEmployer(techBrand);
    expect(result.evpStatement.toLowerCase()).toMatch(/engineer|data|technology/);
    expect(result.benefitsFraming.some((b) => b.toLowerCase().includes('open-source'))).toBe(true);
  });

  it('corporate style gives structured interview and 90-day onboarding', () => {
    const corpBrand = createTestBrand({ style: 'corporate' });
    const result = generateBrandEmployer(corpBrand);
    expect(result.interviewApproach.toLowerCase()).toMatch(/competency|panel|structured/);
    expect(result.onboardingApproach.toLowerCase()).toMatch(/90-day|structured/);
  });

  it('organic style gives mission-aligned persona traits', () => {
    const organicBrand = createTestBrand({ style: 'organic' });
    const result = generateBrandEmployer(organicBrand);
    expect(result.candidatePersonaTraits.some((t) => t.toLowerCase().includes('mission'))).toBe(
      true
    );
  });

  it('elegant style gives portfolio-based interview approach', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const result = generateBrandEmployer(elegantBrand);
    expect(result.interviewApproach.toLowerCase()).toMatch(/portfolio|craft/);
  });

  it('playful style gives fun onboarding', () => {
    const playfulBrand = createTestBrand({ style: 'playful' });
    const result = generateBrandEmployer(playfulBrand);
    expect(result.onboardingApproach.toLowerCase()).toMatch(/fun|playful|scavenger|creative/);
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandEmployer(unknownBrand);
    expect(result.evpStatement).toBeTruthy();
    expect(result.culturePillars.length).toBeGreaterThanOrEqual(3);
  });

  it('works without tagline', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const result = generateBrandEmployer(noTagBrand);
    expect(result.employerBriefSummary).not.toMatch(/undefined/);
    expect(result.employerBriefSummary).toContain('TestCo');
  });

  it('tech style adds tech stack job-ad guideline', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const result = generateBrandEmployer(techBrand);
    expect(result.jobAdGuidelines.some((g) => g.toLowerCase().includes('tech stack'))).toBe(true);
  });
});
