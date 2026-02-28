import type {
  BrandStyle,
  ColorPalette,
  Gradient,
  GradientPresetName,
  GradientStop,
  GradientSystem,
  GradientType,
  HslColor,
} from '../../types.js';
import { hexToHsl, hslToHex } from './color-palette.js';

interface StyleGradientConfig {
  type: GradientType;
  angle: number;
  stops: number;
  lightnessVariance: number;
}

const STYLE_GRADIENT_CONFIG: Record<BrandStyle, StyleGradientConfig> = {
  minimal: { type: 'linear', angle: 180, stops: 2, lightnessVariance: 5 },
  bold: { type: 'linear', angle: 45, stops: 3, lightnessVariance: 25 },
  elegant: { type: 'linear', angle: 135, stops: 2, lightnessVariance: 10 },
  playful: { type: 'conic', angle: 0, stops: 3, lightnessVariance: 20 },
  corporate: { type: 'linear', angle: 180, stops: 2, lightnessVariance: 8 },
  tech: { type: 'linear', angle: 315, stops: 2, lightnessVariance: 15 },
  organic: { type: 'radial', angle: 0, stops: 3, lightnessVariance: 12 },
  retro: { type: 'linear', angle: 90, stops: 3, lightnessVariance: 18 },
};

function shiftLightness(hsl: HslColor, amount: number): string {
  const l = Math.max(0, Math.min(100, hsl.l + amount));
  return hslToHex(hsl.h, hsl.s, l);
}

function buildStops(
  baseHex: string,
  endHex: string,
  count: number,
  variance: number
): GradientStop[] {
  const baseHsl = hexToHsl(baseHex);
  const endHsl = hexToHsl(endHex);
  if (count === 2) {
    return [
      { color: baseHex, position: 0 },
      { color: endHex, position: 100 },
    ];
  }
  const midHex = shiftLightness(
    { h: (baseHsl.h + endHsl.h) / 2, s: baseHsl.s, l: baseHsl.l },
    variance / 2
  );
  return [
    { color: baseHex, position: 0 },
    { color: midHex, position: 50 },
    { color: endHex, position: 100 },
  ];
}

function toCssValue(type: GradientType, angle: number, stops: GradientStop[]): string {
  const stopStr = stops.map((s) => `${s.color} ${s.position}%`).join(', ');
  if (type === 'radial') return `radial-gradient(circle, ${stopStr})`;
  if (type === 'conic') return `conic-gradient(from ${angle}deg, ${stopStr})`;
  return `linear-gradient(${angle}deg, ${stopStr})`;
}

function createGradient(type: GradientType, angle: number, stops: GradientStop[]): Gradient {
  return {
    type,
    angle: type !== 'radial' ? angle : undefined,
    stops,
    cssValue: toCssValue(type, angle, stops),
  };
}

function buildPreset(
  name: GradientPresetName,
  colors: ColorPalette,
  config: StyleGradientConfig
): Gradient {
  const { type, angle, stops: count, lightnessVariance } = config;
  const primary = colors.primary.hex;
  const secondary = colors.secondary.hex;
  const accent = colors.accent.hex;
  const neutralLight = colors.neutral[0]?.hex ?? '#f5f5f5';
  const neutralDark = colors.neutral[colors.neutral.length - 1]?.hex ?? '#1a1a1a';

  const presetMap: Record<GradientPresetName, () => GradientStop[]> = {
    hero: () => buildStops(primary, secondary, count, lightnessVariance),
    button: () => buildStops(accent, primary, count, lightnessVariance),
    card: () =>
      buildStops(
        neutralLight,
        shiftLightness(hexToHsl(neutralLight), -lightnessVariance),
        2,
        lightnessVariance
      ),
    text: () => buildStops(primary, accent, count, lightnessVariance),
    background: () => buildStops(neutralLight, neutralDark, 2, lightnessVariance),
  };

  const stops = presetMap[name]();
  return createGradient(type, angle, stops);
}

export function generateGradientSystem(
  colors: ColorPalette,
  style: BrandStyle = 'minimal'
): GradientSystem {
  const config = STYLE_GRADIENT_CONFIG[style];
  const presetNames: GradientPresetName[] = ['hero', 'button', 'card', 'text', 'background'];

  const presets = {} as Record<GradientPresetName, Gradient>;
  for (const name of presetNames) {
    presets[name] = buildPreset(name, colors, config);
  }

  return { presets };
}
