import type { BrandIdentity } from '../../types.js';

interface StyleDictionaryValue {
  value: string | number;
  type?: string;
  comment?: string;
}

type StyleDictionaryGroup = Record<
  string,
  StyleDictionaryValue | Record<string, StyleDictionaryValue>
>;

interface StyleDictionaryOutput {
  color: Record<string, StyleDictionaryGroup | StyleDictionaryValue>;
  typography: Record<string, StyleDictionaryGroup | StyleDictionaryValue>;
  spacing: Record<string, StyleDictionaryValue>;
  shadow?: Record<string, StyleDictionaryValue>;
  border?: Record<string, StyleDictionaryValue>;
  motion?: Record<string, StyleDictionaryValue>;
  gradient?: Record<string, StyleDictionaryValue>;
}

export function exportStyleDictionary(brand: BrandIdentity): StyleDictionaryOutput {
  const { colors, typography, spacing } = brand;

  const color: StyleDictionaryOutput['color'] = {
    primary: { value: colors.primary.hex, type: 'color', comment: colors.primary.usage },
    secondary: { value: colors.secondary.hex, type: 'color', comment: colors.secondary.usage },
    accent: { value: colors.accent.hex, type: 'color', comment: colors.accent.usage },
    semantic: {
      success: {
        value: colors.semantic.success.hex,
        type: 'color',
        comment: colors.semantic.success.usage,
      },
      warning: {
        value: colors.semantic.warning.hex,
        type: 'color',
        comment: colors.semantic.warning.usage,
      },
      error: {
        value: colors.semantic.error.hex,
        type: 'color',
        comment: colors.semantic.error.usage,
      },
      info: { value: colors.semantic.info.hex, type: 'color', comment: colors.semantic.info.usage },
    },
  };

  for (const neutral of colors.neutral) {
    color[neutral.name] = { value: neutral.hex, type: 'color', comment: neutral.usage };
  }

  const typo: StyleDictionaryOutput['typography'] = {
    fontFamily: {
      heading: { value: typography.headingFont, type: 'fontFamily' },
      body: { value: typography.bodyFont, type: 'fontFamily' },
      mono: { value: typography.monoFont, type: 'fontFamily' },
    },
  };

  for (const step of typography.steps) {
    typo[step.name] = {
      fontSize: { value: step.size, type: 'dimension' },
      lineHeight: { value: step.lineHeight, type: 'number' },
      letterSpacing: { value: step.letterSpacing, type: 'dimension' },
      fontWeight: { value: step.weight, type: 'fontWeight' },
    };
  }

  const spacingTokens: StyleDictionaryOutput['spacing'] = {};
  for (const [key, value] of Object.entries(spacing.values)) {
    spacingTokens[key] = { value, type: 'dimension' };
  }

  const result: StyleDictionaryOutput = {
    color,
    typography: typo,
    spacing: spacingTokens,
  };

  if (brand.shadows) {
    result.shadow = {};
    for (const [name, level] of Object.entries(brand.shadows.levels)) {
      result.shadow[name] = { value: level.cssValue, type: 'shadow' };
    }
  }

  if (brand.borders) {
    result.border = {};
    for (const [name, value] of Object.entries(brand.borders.radii)) {
      result.border[`radius-${name}`] = { value, type: 'borderRadius' };
    }
    for (const [name, value] of Object.entries(brand.borders.widths)) {
      result.border[`width-${name}`] = { value, type: 'borderWidth' };
    }
  }

  if (brand.motion) {
    result.motion = {};
    for (const [name, value] of Object.entries(brand.motion.durations)) {
      result.motion[`duration-${name}`] = { value, type: 'duration' };
    }
    for (const [name, value] of Object.entries(brand.motion.easings)) {
      result.motion[`easing-${name}`] = { value, type: 'cubicBezier' };
    }
  }

  if (brand.gradients) {
    result.gradient = {};
    for (const [name, gradient] of Object.entries(brand.gradients.presets)) {
      result.gradient[name] = { value: gradient.cssValue, type: 'gradient' };
    }
  }

  return result;
}
