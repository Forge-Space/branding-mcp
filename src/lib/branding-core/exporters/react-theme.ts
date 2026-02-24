import type { BrandIdentity } from '../../types.js';

export function exportReactTheme(brand: BrandIdentity): string {
  const { colors, typography, spacing } = brand;

  const neutralObj: Record<string, string> = {};
  for (const n of colors.neutral) {
    neutralObj[n.name] = n.hex;
  }

  const theme = {
    colors: {
      primary: colors.primary.hex,
      secondary: colors.secondary.hex,
      accent: colors.accent.hex,
      ...neutralObj,
      success: colors.semantic.success.hex,
      warning: colors.semantic.warning.hex,
      error: colors.semantic.error.hex,
      info: colors.semantic.info.hex,
    },
    fonts: {
      heading: `'${typography.headingFont}', sans-serif`,
      body: `'${typography.bodyFont}', sans-serif`,
      mono: `'${typography.monoFont}', monospace`,
    },
    fontSizes: Object.fromEntries(typography.steps.map((s) => [s.name, s.size])),
    lineHeights: Object.fromEntries(typography.steps.map((s) => [s.name, s.lineHeight])),
    space: spacing.values,
  };

  return [
    "import type { CSSProperties } from 'react';",
    '',
    `export const theme = ${JSON.stringify(theme, null, 2)} as const;`,
    '',
    'export type Theme = typeof theme;',
    '',
  ].join('\n');
}
