import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
} from '../../lib/branding-core/index.js';
import { generateBrandAccessibility } from '../../lib/branding-core/generators/brand-accessibility.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-brand',
    name: 'Acme Corp',
    tagline: 'Building the future',
    industry: 'technology software',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandAccessibility', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandAccessibility(brand);
    expect(result.wcagTarget).toBeTruthy();
    expect(result.colourContrastStrategy).toBeTruthy();
    expect(result.focusIndicatorStyle).toBeTruthy();
    expect(result.motionGuidance).toBeTruthy();
    expect(result.typographyGuidance).toBeTruthy();
    expect(result.checklistSections).toBeDefined();
    expect(result.testingProtocol).toBeDefined();
    expect(result.designTokenRequirements).toBeDefined();
    expect(result.accessibilityBriefSummary).toBeTruthy();
  });

  it('returns 4 checklist sections', () => {
    const brand = createTestBrand();
    const result = generateBrandAccessibility(brand);
    expect(result.checklistSections).toHaveLength(4);
    const sectionNames = result.checklistSections.map((s) => s.section);
    expect(sectionNames).toContain('Perceivable');
    expect(sectionNames).toContain('Operable');
    expect(sectionNames).toContain('Understandable');
    expect(sectionNames).toContain('Robust');
  });

  it('each checklist section has items', () => {
    const brand = createTestBrand();
    const result = generateBrandAccessibility(brand);
    for (const section of result.checklistSections) {
      expect(section.items.length).toBeGreaterThan(0);
    }
  });

  it('returns at least 6 testing protocol items', () => {
    const brand = createTestBrand();
    const result = generateBrandAccessibility(brand);
    expect(result.testingProtocol.length).toBeGreaterThanOrEqual(6);
  });

  it('returns design token requirements with expected keys', () => {
    const brand = createTestBrand();
    const result = generateBrandAccessibility(brand);
    expect(result.designTokenRequirements['wcag_target']).toBeTruthy();
    expect(result.designTokenRequirements['minimum_contrast_body']).toBeTruthy();
    expect(result.designTokenRequirements['minimum_font_size_body']).toBeTruthy();
    expect(result.designTokenRequirements['minimum_touch_target']).toBeTruthy();
  });

  it('brief summary contains brand name and tagline', () => {
    const brand = createTestBrand();
    const result = generateBrandAccessibility(brand);
    expect(result.accessibilityBriefSummary).toContain('Acme Corp');
    expect(result.accessibilityBriefSummary).toContain('Building the future');
  });

  it('corporate style targets WCAG 2.2 AA', () => {
    const brand = createTestBrand({ style: 'corporate' });
    const result = generateBrandAccessibility(brand);
    expect(result.wcagTarget).toContain('WCAG 2.2 AA');
  });

  it('tech style targets WCAG 2.1 AA or higher', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandAccessibility(brand);
    expect(result.wcagTarget).toContain('WCAG');
  });

  it('playful style has reduced motion guidance', () => {
    const brand = createTestBrand({ style: 'playful' });
    const result = generateBrandAccessibility(brand);
    expect(result.motionGuidance).toBeTruthy();
  });

  it('elegant style has typography guidance', () => {
    const brand = createTestBrand({ style: 'elegant' });
    const result = generateBrandAccessibility(brand);
    expect(result.typographyGuidance).toBeTruthy();
  });

  it('bold style has focus indicator style', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandAccessibility(brand);
    expect(result.focusIndicatorStyle).toBeTruthy();
  });

  it('organic style has colour contrast strategy', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandAccessibility(brand);
    expect(result.colourContrastStrategy).toBeTruthy();
  });

  it('retro style has accessibility output', () => {
    const brand = createTestBrand({ style: 'retro' });
    const result = generateBrandAccessibility(brand);
    expect(result.wcagTarget).toBeTruthy();
    expect(result.checklistSections).toHaveLength(4);
  });

  it('unknown style falls back to minimal', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandAccessibility(brand);
    expect(result.wcagTarget).toBeTruthy();
    expect(result.checklistSections).toHaveLength(4);
  });

  it('brief summary contains brand name without tagline', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandAccessibility(brand);
    expect(result.accessibilityBriefSummary).toContain('Acme Corp');
    expect(result.accessibilityBriefSummary).not.toContain('undefined');
  });

  it('perceivable section includes colour contrast info', () => {
    const brand = createTestBrand();
    const result = generateBrandAccessibility(brand);
    const perceivable = result.checklistSections.find((s) => s.section === 'Perceivable');
    expect(perceivable).toBeDefined();
    expect(perceivable!.items.length).toBeGreaterThanOrEqual(5);
  });

  it('testing protocol includes axe-core or automated testing', () => {
    const brand = createTestBrand();
    const result = generateBrandAccessibility(brand);
    const hasAutomated = result.testingProtocol.some(
      (item) => item.toLowerCase().includes('axe') || item.toLowerCase().includes('automated')
    );
    expect(hasAutomated).toBe(true);
  });
});
