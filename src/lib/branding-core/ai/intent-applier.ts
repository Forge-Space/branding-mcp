import type { BrandIdentity } from '../../types.js';
import type { BrandIntent } from './types.js';
import { generateColorPalette, hexToHsl, hslToHex } from '../generators/color-palette.js';
import { generateTypographySystem } from '../generators/typography-system.js';

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function applyColorShifts(
  baseHex: string,
  hueShift: number,
  saturationShift: number,
  lightnessShift: number
): string {
  const hsl = hexToHsl(baseHex);
  return hslToHex(
    (hsl.h + hueShift + 360) % 360,
    clamp(hsl.s + saturationShift, 0, 100),
    clamp(hsl.l + lightnessShift, 5, 95)
  );
}

export function applyIntent(brand: BrandIdentity, intent: BrandIntent): BrandIdentity {
  const updated = { ...brand };

  if (intent.color) {
    const { baseColor, harmony, theme, hueShift, saturationShift, lightnessShift } = intent.color;

    let effectiveBase = baseColor ?? brand.colors.primary.hex;

    if (hueShift || saturationShift || lightnessShift) {
      effectiveBase = applyColorShifts(
        effectiveBase,
        hueShift ?? 0,
        saturationShift ?? 0,
        lightnessShift ?? 0
      );
    }

    updated.colors = generateColorPalette(effectiveBase, harmony ?? 'complementary', theme);
  }

  if (intent.typography) {
    const { headingCategory, bodyCategory, scaleRatio, baseSize } = intent.typography;
    updated.typography = generateTypographySystem(
      (headingCategory ?? brand.typography.headingFont.includes('serif')) ? 'serif' : 'sans-serif',
      bodyCategory ?? 'sans-serif',
      scaleRatio,
      baseSize ?? brand.typography.baseSize
    );
  }

  if (intent.style) {
    updated.style = intent.style;
  }

  return updated;
}
