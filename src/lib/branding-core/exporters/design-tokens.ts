import type { BrandIdentity, DesignTokens } from '../../types.js';

export function exportDesignTokens(brand: BrandIdentity): DesignTokens {
  const { colors, typography, spacing } = brand;

  const colorTokens: DesignTokens['color'] = {
    primary: { value: { $value: colors.primary.hex, $type: 'color' } },
    secondary: { value: { $value: colors.secondary.hex, $type: 'color' } },
    accent: { value: { $value: colors.accent.hex, $type: 'color' } },
    success: { value: { $value: colors.semantic.success.hex, $type: 'color' } },
    warning: { value: { $value: colors.semantic.warning.hex, $type: 'color' } },
    error: { value: { $value: colors.semantic.error.hex, $type: 'color' } },
    info: { value: { $value: colors.semantic.info.hex, $type: 'color' } },
  };

  for (const neutral of colors.neutral) {
    colorTokens[neutral.name] = { value: { $value: neutral.hex, $type: 'color' } };
  }

  const typographyTokens: DesignTokens['typography'] = {};
  for (const step of typography.steps) {
    typographyTokens[step.name] = {
      fontSize: { $value: step.size, $type: 'dimension' },
      lineHeight: { $value: step.lineHeight, $type: 'number' },
      letterSpacing: { $value: step.letterSpacing, $type: 'dimension' },
      fontWeight: { $value: step.weight, $type: 'number' },
    };
  }
  typographyTokens['font-heading'] = {
    value: { $value: typography.headingFont, $type: 'fontFamily' },
  };
  typographyTokens['font-body'] = {
    value: { $value: typography.bodyFont, $type: 'fontFamily' },
  };
  typographyTokens['font-mono'] = {
    value: { $value: typography.monoFont, $type: 'fontFamily' },
  };

  const spacingTokens: DesignTokens['spacing'] = {};
  for (const [key, value] of Object.entries(spacing.values)) {
    spacingTokens[key] = { $value: value, $type: 'dimension' };
  }

  return {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    color: colorTokens,
    typography: typographyTokens,
    spacing: spacingTokens,
  };
}
