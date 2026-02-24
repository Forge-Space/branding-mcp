import type {
  ColorHarmony,
  ColorPalette,
  ColorSwatch,
  ColorTheme,
  ContrastResult,
  HslColor,
} from '../../types.js';

const HARMONY_ANGLES: Record<ColorHarmony, number[]> = {
  complementary: [180],
  analogous: [-30, 30],
  triadic: [120, 240],
  'split-complementary': [150, 210],
  tetradic: [90, 180, 270],
  monochromatic: [0, 0],
};

function hslToHex(h: number, s: number, l: number): string {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = s / 100;
  const lNorm = l / 100;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number): string => {
    const k = (n + hNorm / 30) % 12;
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): HslColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function relativeLuminance(hex: string): number {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 0;
  const channels = [result[1], result[2], result[3]].map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function checkContrast(fg: string, bg: string): ContrastResult {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

function generateNeutrals(baseHue: number, theme: ColorTheme): ColorSwatch[] {
  const steps = [95, 90, 80, 60, 40, 20, 10, 5];
  if (theme === 'dark') steps.reverse();
  return steps.map((l, i) => ({
    name: `neutral-${(i + 1) * 100}`,
    hex: hslToHex(baseHue, 5, l),
    hsl: { h: baseHue, s: 5, l },
    usage: `Neutral shade ${i + 1}`,
  }));
}

function makeSwatch(name: string, h: number, s: number, l: number, usage: string): ColorSwatch {
  return {
    name,
    hex: hslToHex(h, s, l),
    hsl: { h: ((h % 360) + 360) % 360, s, l },
    usage,
  };
}

export function generateColorPalette(
  baseColor?: string,
  harmony: ColorHarmony = 'complementary',
  theme: ColorTheme = 'both'
): ColorPalette {
  const base = baseColor ? hexToHsl(baseColor) : { h: 250, s: 65, l: 50 };
  const angles = HARMONY_ANGLES[harmony];

  const primary = makeSwatch('primary', base.h, base.s, base.l, 'Primary brand color');
  const secondary = makeSwatch(
    'secondary',
    base.h + (angles[0] ?? 180),
    base.s - 10,
    base.l + 5,
    'Secondary brand color'
  );
  const accent = makeSwatch(
    'accent',
    base.h + (angles[1] ?? angles[0] ?? 120),
    Math.min(base.s + 15, 100),
    base.l,
    'Accent and highlight color'
  );

  const neutrals = generateNeutrals(base.h, theme);

  const semantic = {
    success: makeSwatch('success', 142, 70, 45, 'Success states'),
    warning: makeSwatch('warning', 38, 92, 50, 'Warning states'),
    error: makeSwatch('error', 0, 84, 60, 'Error states'),
    info: makeSwatch('info', 210, 79, 56, 'Informational states'),
  };

  const white = '#ffffff';
  const dark = '#1a1a1a';
  const contrast: Record<string, ContrastResult> = {
    'primary-on-white': checkContrast(primary.hex, white),
    'primary-on-dark': checkContrast(primary.hex, dark),
    'secondary-on-white': checkContrast(secondary.hex, white),
    'accent-on-white': checkContrast(accent.hex, white),
  };

  return { primary, secondary, accent, neutral: neutrals, semantic, contrast };
}

export { hslToHex, hexToHsl };
