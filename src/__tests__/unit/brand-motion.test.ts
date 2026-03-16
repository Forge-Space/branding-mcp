import { generateBrandMotion } from '../../lib/branding-core/generators/brand-motion.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#3B82F6', 'analogous');
  const typography = generateTypographySystem('sans-serif', 'serif');
  const spacing = generateSpacingScale(4);
  return {
    id: 'test-id',
    name: 'TestBrand',
    industry: 'tech',
    style: 'minimal',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandMotion', () => {
  it('returns all required fields', () => {
    const result = generateBrandMotion(createTestBrand());
    expect(result).toHaveProperty('motionSystem');
    expect(result).toHaveProperty('principles');
    expect(result).toHaveProperty('animationScale');
    expect(result).toHaveProperty('preferredEasing');
    expect(result).toHaveProperty('guidelines');
    expect(result).toHaveProperty('cssCustomProperties');
  });

  it('returns 2 principles', () => {
    const result = generateBrandMotion(createTestBrand());
    expect(result.principles).toHaveLength(2);
    expect(result.principles[0]).toHaveProperty('name');
    expect(result.principles[0]).toHaveProperty('description');
    expect(result.principles[0]).toHaveProperty('cssExample');
  });

  it('guidelines has 4 keys', () => {
    const result = generateBrandMotion(createTestBrand());
    const { microInteractions, pageTransitions, loadingStates, feedback } = result.guidelines;
    expect(microInteractions).toBeTruthy();
    expect(pageTransitions).toBeTruthy();
    expect(loadingStates).toBeTruthy();
    expect(feedback).toBeTruthy();
  });

  it('minimal style yields minimal animation scale', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'minimal' }));
    expect(result.animationScale).toBe('minimal');
  });

  it('playful style yields dramatic animation scale', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'playful' }));
    expect(result.animationScale).toBe('dramatic');
  });

  it('bold style yields expressive animation scale', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'bold' }));
    expect(result.animationScale).toBe('expressive');
  });

  it('elegant style yields moderate animation scale', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'elegant' }));
    expect(result.animationScale).toBe('moderate');
  });

  it('corporate style yields minimal animation scale', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'corporate' }));
    expect(result.animationScale).toBe('minimal');
  });

  it('tech style yields moderate animation scale', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'tech' }));
    expect(result.animationScale).toBe('moderate');
  });

  it('cssCustomProperties contains :root and --motion- variables', () => {
    const result = generateBrandMotion(createTestBrand());
    expect(result.cssCustomProperties).toContain(':root {');
    expect(result.cssCustomProperties).toContain('--motion-duration-');
    expect(result.cssCustomProperties).toContain('--motion-easing-');
    expect(result.cssCustomProperties).toContain('--motion-transition-');
  });

  it('motionSystem has durations, easings, transitions', () => {
    const result = generateBrandMotion(createTestBrand());
    expect(result.motionSystem).toHaveProperty('durations');
    expect(result.motionSystem).toHaveProperty('easings');
    expect(result.motionSystem).toHaveProperty('transitions');
    expect(result.motionSystem.durations.normal).toMatch(/\d+ms/);
  });

  it('preferredEasing is a valid cubic-bezier string', () => {
    const result = generateBrandMotion(createTestBrand());
    expect(result.preferredEasing).toContain('cubic-bezier');
  });

  it('falls back to minimal for unknown style', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'unknown' as never }));
    expect(result.animationScale).toBe('minimal');
    expect(result.principles).toHaveLength(2);
  });

  it('organic style produces natural motion principles', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'organic' }));
    expect(result.animationScale).toBe('moderate');
    expect(result.principles[0].name).toBe('Natural Flow');
  });

  it('retro style produces deliberate steps principles', () => {
    const result = generateBrandMotion(createTestBrand({ style: 'retro' }));
    expect(result.animationScale).toBe('expressive');
    expect(result.principles[0].name).toBe('Deliberate Steps');
  });

  it('brand without style field defaults to minimal motion', () => {
    const brand = createTestBrand({});
    const brandWithoutStyle = { ...brand } as Record<string, unknown>;
    delete brandWithoutStyle['style'];
    const result = generateBrandMotion(brandWithoutStyle as never);
    expect(result.animationScale).toBe('minimal');
    expect(result.principles.length).toBeGreaterThan(0);
    expect(result.guidelines).toBeTruthy();
    expect(result.guidelines.microInteractions).toBeTruthy();
  });
});
