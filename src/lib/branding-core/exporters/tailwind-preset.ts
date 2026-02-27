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

  const extend: Record<string, unknown> = {
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
  };

  if (brand.shadows) {
    const shadowObj: Record<string, string> = {};
    for (const [name, level] of Object.entries(brand.shadows.levels)) {
      shadowObj[name] = level.cssValue;
    }
    extend.boxShadow = shadowObj;
  }

  if (brand.borders) {
    extend.borderRadius = brand.borders.radii;
    extend.borderWidth = brand.borders.widths;
  }

  if (brand.motion) {
    extend.transitionDuration = brand.motion.durations;
    extend.transitionTimingFunction = brand.motion.easings;
  }

  const preset = { theme: { extend } };

  return `/** @type {import('tailwindcss').Config} */\nexport default ${JSON.stringify(preset, null, 2)};\n`;
}
