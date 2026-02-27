import { exportDesignTokens } from '../../lib/branding-core/exporters/design-tokens.js';
import { exportCssVariables } from '../../lib/branding-core/exporters/css-variables.js';
import { exportTailwindPreset } from '../../lib/branding-core/exporters/tailwind-preset.js';
import { exportSassVariables } from '../../lib/branding-core/exporters/sass-variables.js';
import { exportReactTheme } from '../../lib/branding-core/exporters/react-theme.js';
import { exportFigmaTokens } from '../../lib/branding-core/exporters/figma-tokens.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateShadowSystem } from '../../lib/branding-core/generators/shadow-system.js';
import { generateBorderSystem } from '../../lib/branding-core/generators/border-system.js';
import { generateMotionSystem } from '../../lib/branding-core/generators/motion-system.js';
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

  it('includes shadow tokens when present', () => {
    const tokens = exportDesignTokens(createFullTestBrand());
    expect(tokens.shadow).toBeDefined();
    expect(tokens.shadow!['sm'].$type).toBe('shadow');
  });

  it('includes border tokens when present', () => {
    const tokens = exportDesignTokens(createFullTestBrand());
    expect(tokens.border).toBeDefined();
    expect(tokens.border!['radius-md'].$type).toBe('dimension');
    expect(tokens.border!['width-thin'].$type).toBe('dimension');
  });

  it('includes motion tokens when present', () => {
    const tokens = exportDesignTokens(createFullTestBrand());
    expect(tokens.motion).toBeDefined();
    expect(tokens.motion!['duration-fast'].$type).toBe('duration');
    expect(tokens.motion!['easing-ease-out'].$type).toBe('cubicBezier');
  });

  it('omits new tokens when not in brand', () => {
    const tokens = exportDesignTokens(createTestBrand());
    expect(tokens.shadow).toBeUndefined();
    expect(tokens.border).toBeUndefined();
    expect(tokens.motion).toBeUndefined();
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

  it('includes shadow, border, and motion variables', () => {
    const css = exportCssVariables(createFullTestBrand());
    expect(css).toContain('--shadow-sm:');
    expect(css).toContain('--radius-md:');
    expect(css).toContain('--border-thin:');
    expect(css).toContain('--duration-fast:');
    expect(css).toContain('--ease-ease-out:');
    expect(css).toContain('--transition-fade:');
  });
});

describe('exportTailwindPreset', () => {
  it('generates valid Tailwind config', () => {
    const preset = exportTailwindPreset(createTestBrand());
    expect(preset).toContain('export default');
    expect(preset).toContain('"primary"');
    expect(preset).toContain('"fontFamily"');
  });

  it('includes shadow, border, and motion in Tailwind config', () => {
    const preset = exportTailwindPreset(createFullTestBrand());
    expect(preset).toContain('"boxShadow"');
    expect(preset).toContain('"borderRadius"');
    expect(preset).toContain('"borderWidth"');
    expect(preset).toContain('"transitionDuration"');
    expect(preset).toContain('"transitionTimingFunction"');
  });
});

describe('exportSassVariables', () => {
  it('generates valid Sass variables', () => {
    const sass = exportSassVariables(createTestBrand());
    expect(sass).toContain('$color-primary:');
    expect(sass).toContain('$font-heading:');
    expect(sass).toContain('$spacing-');
  });

  it('includes shadow, border, and motion variables', () => {
    const sass = exportSassVariables(createFullTestBrand());
    expect(sass).toContain('$shadow-md:');
    expect(sass).toContain('$radius-lg:');
    expect(sass).toContain('$border-thick:');
    expect(sass).toContain('$duration-normal:');
    expect(sass).toContain('$ease-spring:');
  });
});

describe('exportReactTheme', () => {
  it('generates valid React theme', () => {
    const theme = exportReactTheme(createTestBrand());
    expect(theme).toContain('export const theme');
    expect(theme).toContain('export type Theme');
    expect(theme).toContain('"primary"');
  });

  it('includes shadow, border, and motion in React theme', () => {
    const theme = exportReactTheme(createFullTestBrand());
    expect(theme).toContain('"shadows"');
    expect(theme).toContain('"radii"');
    expect(theme).toContain('"borderWidths"');
    expect(theme).toContain('"motion"');
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

  it('includes shadow, border, and motion groups', () => {
    const tokens = exportFigmaTokens(createFullTestBrand());
    expect(tokens.shadow).toBeDefined();
    expect(tokens.shadow!.md.type).toBe('boxShadow');
    expect(tokens.border).toBeDefined();
    expect(tokens.border!['radius-lg'].type).toBe('borderRadius');
    expect(tokens.border!['width-medium'].type).toBe('borderWidth');
    expect(tokens.motion).toBeDefined();
    expect(tokens.motion!['duration-fast'].type).toBe('duration');
  });
});
