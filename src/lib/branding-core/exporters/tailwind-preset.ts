import type { BrandIdentity } from '../../types.js';

export function exportTailwindPreset(brand: BrandIdentity): string {
  const { colors, typography, spacing } = brand;

  const neutralObj: Record<string, string> = {};
  for (const n of colors.neutral) {
    neutralObj[n.name.replace('neutral-', '')] = n.hex;
  }

  const spacingObj: Record<string, string> = {};
  for (const [key, value] of Object.entries(spacing.values)) {
    spacingObj[key] = value;
  }

  const preset = {
    theme: {
      extend: {
        colors: {
          primary: colors.primary.hex,
          secondary: colors.secondary.hex,
          accent: colors.accent.hex,
          neutral: neutralObj,
          success: colors.semantic.success.hex,
          warning: colors.semantic.warning.hex,
          error: colors.semantic.error.hex,
          info: colors.semantic.info.hex,
        },
        fontFamily: {
          heading: [typography.headingFont, 'sans-serif'],
          body: [typography.bodyFont, 'sans-serif'],
          mono: [typography.monoFont, 'monospace'],
        },
        fontSize: Object.fromEntries(
          typography.steps.map((s) => [s.name, [s.size, { lineHeight: s.lineHeight }]])
        ),
        spacing: spacingObj,
      },
    },
  };

  return `/** @type {import('tailwindcss').Config} */\nexport default ${JSON.stringify(preset, null, 2)};\n`;
}
