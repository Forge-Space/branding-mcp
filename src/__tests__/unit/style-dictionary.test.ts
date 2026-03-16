import { exportStyleDictionary } from '../../lib/branding-core/exporters/style-dictionary.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateShadowSystem } from '../../lib/branding-core/generators/shadow-system.js';
import { generateBorderSystem } from '../../lib/branding-core/generators/border-system.js';
import { generateMotionSystem } from '../../lib/branding-core/generators/motion-system.js';
import { generateGradientSystem } from '../../lib/branding-core/generators/gradient-system.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(): BrandIdentity {
  return {
    id: 'test_brand',
    name: 'Test Brand',
    industry: 'tech',
    style: 'tech',
    colors: generateColorPalette('#6B4CE6'),
    typography: generateTypographySystem(),
    spacing: generateSpacingScale(),
    createdAt: '2026-01-01T00:00:00Z',
  };
}

function createFullTestBrand(): BrandIdentity {
  return {
    ...createTestBrand(),
    shadows: generateShadowSystem('#6B4CE6'),
    borders: generateBorderSystem('tech'),
    motion: generateMotionSystem('tech'),
    gradients: generateGradientSystem(generateColorPalette('#6B4CE6')),
  };
}

describe('exportStyleDictionary', () => {
  it('exports base color tokens', () => {
    const output = exportStyleDictionary(createTestBrand());
    expect(output.color.primary).toHaveProperty('value');
    expect(output.color.secondary).toHaveProperty('value');
    expect(output.color.accent).toHaveProperty('value');
  });

  it('exports semantic colors nested under color.semantic', () => {
    const output = exportStyleDictionary(createTestBrand());
    const semantic = output.color.semantic as Record<string, { value: string }>;
    expect(semantic.success).toHaveProperty('value');
    expect(semantic.warning).toHaveProperty('value');
    expect(semantic.error).toHaveProperty('value');
    expect(semantic.info).toHaveProperty('value');
  });

  it('exports typography fontFamily tokens', () => {
    const output = exportStyleDictionary(createTestBrand());
    const fontFamily = output.typography.fontFamily as Record<
      string,
      { value: string; type: string }
    >;
    expect(fontFamily.heading).toHaveProperty('value');
    expect(fontFamily.body).toHaveProperty('value');
    expect(fontFamily.mono).toHaveProperty('value');
    expect(fontFamily.heading.type).toBe('fontFamily');
  });

  it('exports typography step tokens with correct properties', () => {
    const output = exportStyleDictionary(createTestBrand());
    const firstStepKey = Object.keys(output.typography).find((k) => k !== 'fontFamily');
    expect(firstStepKey).toBeDefined();
    const step = output.typography[firstStepKey!] as Record<
      string,
      { value: string | number; type: string }
    >;
    expect(step.fontSize).toHaveProperty('value');
    expect(step.lineHeight).toHaveProperty('value');
    expect(step.fontWeight).toHaveProperty('value');
    expect(step.letterSpacing).toHaveProperty('value');
  });

  it('exports spacing tokens with dimension type', () => {
    const output = exportStyleDictionary(createTestBrand());
    const firstKey = Object.keys(output.spacing)[0];
    expect(output.spacing[firstKey]).toHaveProperty('value');
    expect(output.spacing[firstKey].type).toBe('dimension');
  });

  it('includes color usage as comment', () => {
    const output = exportStyleDictionary(createTestBrand());
    const primary = output.color.primary as { value: string; type: string; comment: string };
    expect(primary.comment).toBeTruthy();
  });

  it('exports shadow tokens when brand has shadows', () => {
    const output = exportStyleDictionary(createFullTestBrand());
    expect(output.shadow).toBeDefined();
    expect(Object.keys(output.shadow!).length).toBeGreaterThan(0);
    const firstShadow = Object.values(output.shadow!)[0];
    expect(firstShadow.type).toBe('shadow');
  });

  it('does not include shadow when brand has no shadows', () => {
    const output = exportStyleDictionary(createTestBrand());
    expect(output.shadow).toBeUndefined();
  });

  it('exports border radii and widths when brand has borders', () => {
    const output = exportStyleDictionary(createFullTestBrand());
    expect(output.border).toBeDefined();
    const keys = Object.keys(output.border!);
    expect(keys.some((k) => k.startsWith('radius-'))).toBe(true);
    expect(keys.some((k) => k.startsWith('width-'))).toBe(true);
  });

  it('exports motion tokens when brand has motion', () => {
    const output = exportStyleDictionary(createFullTestBrand());
    expect(output.motion).toBeDefined();
    const keys = Object.keys(output.motion!);
    expect(keys.some((k) => k.startsWith('duration-'))).toBe(true);
    expect(keys.some((k) => k.startsWith('easing-'))).toBe(true);
  });

  it('exports gradient tokens when brand has gradients', () => {
    const output = exportStyleDictionary(createFullTestBrand());
    expect(output.gradient).toBeDefined();
    expect(Object.keys(output.gradient!).length).toBeGreaterThan(0);
    const firstGradient = Object.values(output.gradient!)[0];
    expect(firstGradient.type).toBe('gradient');
  });
});
