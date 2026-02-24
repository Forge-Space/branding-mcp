import { exportDesignTokens } from '../../lib/branding-core/exporters/design-tokens.js';
import { exportCssVariables } from '../../lib/branding-core/exporters/css-variables.js';
import { exportTailwindPreset } from '../../lib/branding-core/exporters/tailwind-preset.js';
import { exportSassVariables } from '../../lib/branding-core/exporters/sass-variables.js';
import { exportReactTheme } from '../../lib/branding-core/exporters/react-theme.js';
import { exportFigmaTokens } from '../../lib/branding-core/exporters/figma-tokens.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
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

describe('exportDesignTokens', () => {
  it('exports W3C format tokens', () => {
    const tokens = exportDesignTokens(createTestBrand());
    expect(tokens.$schema).toContain('design-tokens');
    expect(tokens.color).toBeDefined();
    expect(tokens.typography).toBeDefined();
    expect(tokens.spacing).toBeDefined();
  });

  it('includes primary color token', () => {
    const tokens = exportDesignTokens(createTestBrand());
    expect(tokens.color.primary).toBeDefined();
    expect(tokens.color.primary.value.$type).toBe('color');
  });

  it('includes typography font tokens', () => {
    const tokens = exportDesignTokens(createTestBrand());
    expect(tokens.typography['font-heading']).toBeDefined();
    expect(tokens.typography['font-body']).toBeDefined();
  });

  it('includes spacing tokens', () => {
    const tokens = exportDesignTokens(createTestBrand());
    expect(Object.keys(tokens.spacing).length).toBeGreaterThan(0);
  });
});

describe('exportCssVariables', () => {
  it('generates valid CSS custom properties', () => {
    const css = exportCssVariables(createTestBrand());
    expect(css).toContain(':root {');
    expect(css).toContain('--color-primary:');
    expect(css).toContain('--font-heading:');
    expect(css).toContain('--spacing-');
    expect(css).toContain('}');
  });
});

describe('exportTailwindPreset', () => {
  it('generates valid Tailwind config', () => {
    const preset = exportTailwindPreset(createTestBrand());
    expect(preset).toContain('export default');
    expect(preset).toContain('"primary"');
    expect(preset).toContain('"fontFamily"');
  });
});

describe('exportSassVariables', () => {
  it('generates valid Sass variables', () => {
    const sass = exportSassVariables(createTestBrand());
    expect(sass).toContain('$color-primary:');
    expect(sass).toContain('$font-heading:');
    expect(sass).toContain('$spacing-');
  });
});

describe('exportReactTheme', () => {
  it('generates valid React theme', () => {
    const theme = exportReactTheme(createTestBrand());
    expect(theme).toContain('export const theme');
    expect(theme).toContain('export type Theme');
    expect(theme).toContain('"primary"');
  });
});

describe('exportFigmaTokens', () => {
  it('generates Figma token structure', () => {
    const tokens = exportFigmaTokens(createTestBrand());
    expect(tokens.color).toBeDefined();
    expect(tokens.typography).toBeDefined();
    expect(tokens.spacing).toBeDefined();
    expect(tokens.color.primary.type).toBe('color');
  });
});
