import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandCrisis } from '../../lib/branding-core/generators/brand-crisis.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#2563EB', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Acme Corp',
    tagline: 'Built for trust',
    industry: 'technology',
    style: 'corporate',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandCrisis', () => {
  const brand = createTestBrand();
  const result = generateBrandCrisis(brand);

  it('returns all required top-level fields', () => {
    expect(result.crisisTone).toBeTruthy();
    expect(Array.isArray(result.firstResponseGuidelines)).toBe(true);
    expect(result.spokespersonGuidance).toBeTruthy();
    expect(Array.isArray(result.channelPriority)).toBe(true);
    expect(Array.isArray(result.responsePhases)).toBe(true);
    expect(Array.isArray(result.darkSiteContent)).toBe(true);
    expect(Array.isArray(result.stakeholderMatrix)).toBe(true);
    expect(Array.isArray(result.monitoringChecklist)).toBe(true);
    expect(Array.isArray(result.doNotSayList)).toBe(true);
    expect(result.crisisBriefSummary).toBeTruthy();
  });

  it('produces at least 3 first response guidelines', () => {
    expect(result.firstResponseGuidelines.length).toBeGreaterThanOrEqual(3);
  });

  it('produces at least 2 channel priorities', () => {
    expect(result.channelPriority.length).toBeGreaterThanOrEqual(2);
  });

  it('produces exactly 5 response phases', () => {
    expect(result.responsePhases.length).toBe(5);
  });

  it('each response phase has required fields', () => {
    for (const phase of result.responsePhases) {
      expect(phase.phase).toBeTruthy();
      expect(Array.isArray(phase.objectives)).toBe(true);
      expect(Array.isArray(phase.actions)).toBe(true);
      expect(phase.communicationsAction).toBeTruthy();
    }
  });

  it('produces at least 6 dark site content items', () => {
    expect(result.darkSiteContent.length).toBeGreaterThanOrEqual(6);
  });

  it('produces exactly 6 stakeholder groups', () => {
    expect(result.stakeholderMatrix.length).toBe(6);
  });

  it('each stakeholder has required fields', () => {
    for (const stakeholder of result.stakeholderMatrix) {
      expect(stakeholder.group).toBeTruthy();
      expect(stakeholder.priority).toBeTruthy();
      expect(stakeholder.channel).toBeTruthy();
      expect(stakeholder.messageFrame).toBeTruthy();
      expect(stakeholder.responseTime).toBeTruthy();
    }
  });

  it('produces at least 6 monitoring checklist items', () => {
    expect(result.monitoringChecklist.length).toBeGreaterThanOrEqual(6);
  });

  it('produces at least 5 do-not-say list items', () => {
    expect(result.doNotSayList.length).toBeGreaterThanOrEqual(5);
  });

  it('brief summary contains brand name', () => {
    expect(result.crisisBriefSummary).toContain('Acme Corp');
  });

  it('brief summary contains tagline when present', () => {
    expect(result.crisisBriefSummary).toContain('Built for trust');
  });

  it('corporate style uses formal tone', () => {
    const corporateBrand = createTestBrand({ style: 'corporate' });
    const res = generateBrandCrisis(corporateBrand);
    expect(res.crisisTone.toLowerCase()).toContain('formal');
  });

  it('tech style uses data-driven tone', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const res = generateBrandCrisis(techBrand);
    expect(res.crisisTone.toLowerCase()).toContain('data-driven');
    expect(res.channelPriority.some((c) => c.toLowerCase().includes('status'))).toBe(true);
  });

  it('bold style names CEO as spokesperson', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const res = generateBrandCrisis(boldBrand);
    expect(res.spokespersonGuidance.toLowerCase()).toContain('ceo');
  });

  it('unknown style falls back to minimal', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const res = generateBrandCrisis(unknownBrand);
    expect(res.crisisTone).toBeTruthy();
    expect(res.responsePhases.length).toBe(5);
  });

  it('no-tagline brand brief summary does not contain undefined', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const res = generateBrandCrisis(noTagBrand);
    expect(res.crisisBriefSummary).not.toContain('undefined');
  });

  it('minimal style uses clear factual tone and press release channel', () => {
    const res = generateBrandCrisis(createTestBrand({ style: 'minimal' }));
    expect(res.crisisTone.toLowerCase()).toContain('factual');
    expect(res.channelPriority.some((c) => c.toLowerCase().includes('press'))).toBe(true);
  });

  it('elegant style uses composed authoritative tone', () => {
    const res = generateBrandCrisis(createTestBrand({ style: 'elegant' }));
    expect(res.crisisTone.toLowerCase()).toContain('composed');
    expect(res.spokespersonGuidance.toLowerCase()).toContain('ceo');
  });

  it('playful style uses human empathetic tone and social channel', () => {
    const res = generateBrandCrisis(createTestBrand({ style: 'playful' }));
    expect(res.crisisTone.toLowerCase()).toContain('empathetic');
    expect(res.channelPriority.some((c) => c.toLowerCase().includes('social'))).toBe(true);
  });

  it('organic style centres stakeholder wellbeing in tone', () => {
    const res = generateBrandCrisis(createTestBrand({ style: 'organic' }));
    expect(res.crisisTone.toLowerCase()).toContain('authentic');
    expect(res.spokespersonGuidance.toLowerCase()).toContain('founder');
  });

  it('retro style uses honest grounded tone and founder spokesperson', () => {
    const res = generateBrandCrisis(createTestBrand({ style: 'retro' }));
    expect(res.crisisTone.toLowerCase()).toContain('honest');
    expect(res.spokespersonGuidance.toLowerCase()).toContain('founder');
  });
});
