import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandEvent } from '../../lib/branding-core/generators/brand-event.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'Acme Corp',
    tagline: 'Making things better',
    industry: 'technology',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandEvent', () => {
  const brand = createTestBrand();
  const result = generateBrandEvent(brand);

  it('returns all required fields', () => {
    expect(result.eventConcept).toBeTruthy();
    expect(result.recommendedVenues).toBeDefined();
    expect(result.decorTheme).toBeDefined();
    expect(result.cateringApproach).toBeTruthy();
    expect(result.entertainmentIdeas).toBeDefined();
    expect(result.agendaStructure).toBeTruthy();
    expect(result.invitationStyle).toBeTruthy();
    expect(result.eventFormats).toBeDefined();
    expect(result.brandingChecklist).toBeDefined();
    expect(result.successMetrics).toBeDefined();
    expect(result.budgetGuidance).toBeDefined();
    expect(result.eventBriefSummary).toBeTruthy();
  });

  it('returns at least 3 venue recommendations', () => {
    expect(result.recommendedVenues.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 decor theme items', () => {
    expect(result.decorTheme.length).toBeGreaterThanOrEqual(3);
  });

  it('returns at least 3 entertainment ideas', () => {
    expect(result.entertainmentIdeas.length).toBeGreaterThanOrEqual(3);
  });

  it('returns exactly 5 event formats', () => {
    expect(result.eventFormats).toHaveLength(5);
  });

  it('event formats have required fields', () => {
    const format = result.eventFormats[0];
    expect(format.type).toBeTruthy();
    expect(format.description).toBeTruthy();
    expect(format.capacity).toBeTruthy();
    expect(format.duration).toBeTruthy();
    expect(format.setupNotes).toBeTruthy();
  });

  it('returns at least 6 branding checklist items', () => {
    expect(result.brandingChecklist.length).toBeGreaterThanOrEqual(6);
  });

  it('branding checklist includes brand name and primary colour', () => {
    const checklistStr = result.brandingChecklist.join(' ');
    expect(checklistStr).toContain('Acme Corp');
    expect(checklistStr).toContain(brand.colors.primary.hex);
  });

  it('returns 6 success metrics', () => {
    expect(Object.keys(result.successMetrics)).toHaveLength(6);
  });

  it('returns budget guidance with venue and catering keys', () => {
    expect(result.budgetGuidance.venue).toBeTruthy();
    expect(result.budgetGuidance.catering).toBeTruthy();
    expect(result.budgetGuidance.av_tech).toBeTruthy();
    expect(result.budgetGuidance.decor).toBeTruthy();
    expect(result.budgetGuidance.marketing).toBeTruthy();
  });

  it('event brief summary contains brand name', () => {
    expect(result.eventBriefSummary).toContain('Acme Corp');
  });

  it('bold style returns high-energy event concept', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const boldResult = generateBrandEvent(boldBrand);
    expect(boldResult.eventConcept.toLowerCase()).toMatch(/high-energy|energetic|bold|immersive/);
  });

  it('elegant style returns refined venue options', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const elegantResult = generateBrandEvent(elegantBrand);
    expect(
      elegantResult.recommendedVenues.some(
        (v) =>
          v.toLowerCase().includes('estate') ||
          v.toLowerCase().includes('ballroom') ||
          v.toLowerCase().includes('fine dining')
      )
    ).toBe(true);
  });

  it('tech style returns tech-specific entertainment', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const techResult = generateBrandEvent(techBrand);
    expect(
      techResult.entertainmentIdeas.some(
        (e) =>
          e.toLowerCase().includes('demo') ||
          e.toLowerCase().includes('hackathon') ||
          e.toLowerCase().includes('innovation')
      )
    ).toBe(true);
  });

  it('falls back to minimal style for unknown style', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const unknownResult = generateBrandEvent(unknownBrand);
    expect(unknownResult.eventConcept).toBeTruthy();
    expect(unknownResult.recommendedVenues.length).toBeGreaterThanOrEqual(3);
  });

  it('tagline appears in summary when present', () => {
    expect(result.eventBriefSummary).toContain('Making things better');
  });
});
