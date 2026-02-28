import type { BrandIdentity } from '../../types.js';

interface FigmaToken {
  value: string | number;
  type: string;
  description?: string;
}

export function exportFigmaTokens(
  brand: BrandIdentity
): Record<string, Record<string, FigmaToken>> {
  const { colors, typography, spacing } = brand;

  const colorGroup: Record<string, FigmaToken> = {
    primary: { value: colors.primary.hex, type: 'color', description: 'Primary brand color' },
    secondary: { value: colors.secondary.hex, type: 'color' },
    accent: { value: colors.accent.hex, type: 'color' },
    success: { value: colors.semantic.success.hex, type: 'color' },
    warning: { value: colors.semantic.warning.hex, type: 'color' },
    error: { value: colors.semantic.error.hex, type: 'color' },
    info: { value: colors.semantic.info.hex, type: 'color' },
  };
  for (const n of colors.neutral) {
    colorGroup[n.name] = { value: n.hex, type: 'color' };
  }

  const typographyGroup: Record<string, FigmaToken> = {};
  for (const step of typography.steps) {
    typographyGroup[`${step.name}-size`] = { value: step.size, type: 'fontSizes' };
    typographyGroup[`${step.name}-weight`] = { value: step.weight, type: 'fontWeights' };
    typographyGroup[`${step.name}-lineHeight`] = { value: step.lineHeight, type: 'lineHeights' };
  }
  typographyGroup['font-heading'] = { value: typography.headingFont, type: 'fontFamilies' };
  typographyGroup['font-body'] = { value: typography.bodyFont, type: 'fontFamilies' };
  typographyGroup['font-mono'] = { value: typography.monoFont, type: 'fontFamilies' };

  const spacingGroup: Record<string, FigmaToken> = {};
  for (const [key, value] of Object.entries(spacing.values)) {
    spacingGroup[key] = { value, type: 'spacing' };
  }

  const result: Record<string, Record<string, FigmaToken>> = {
    color: colorGroup,
    typography: typographyGroup,
    spacing: spacingGroup,
  };

  if (brand.shadows) {
    const shadowGroup: Record<string, FigmaToken> = {};
    for (const [name, level] of Object.entries(brand.shadows.levels)) {
      shadowGroup[name] = { value: level.cssValue, type: 'boxShadow' };
    }
    result.shadow = shadowGroup;
  }

  if (brand.borders) {
    const borderGroup: Record<string, FigmaToken> = {};
    for (const [name, value] of Object.entries(brand.borders.radii)) {
      borderGroup[`radius-${name}`] = { value, type: 'borderRadius' };
    }
    for (const [name, value] of Object.entries(brand.borders.widths)) {
      borderGroup[`width-${name}`] = { value, type: 'borderWidth' };
    }
    result.border = borderGroup;
  }

  if (brand.motion) {
    const motionGroup: Record<string, FigmaToken> = {};
    for (const [name, value] of Object.entries(brand.motion.durations)) {
      motionGroup[`duration-${name}`] = { value, type: 'duration' };
    }
    for (const [name, value] of Object.entries(brand.motion.easings)) {
      motionGroup[`easing-${name}`] = { value, type: 'other' };
    }
    result.motion = motionGroup;
  }

  if (brand.gradients) {
    const gradientGroup: Record<string, FigmaToken> = {};
    for (const [name, gradient] of Object.entries(brand.gradients.presets)) {
      gradientGroup[name] = { value: gradient.cssValue, type: 'gradient' };
    }
    result.gradient = gradientGroup;
  }

  return result;
}
