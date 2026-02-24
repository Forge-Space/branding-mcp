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

  return { color: colorGroup, typography: typographyGroup, spacing: spacingGroup };
}
