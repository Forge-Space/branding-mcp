import type {
  BrandStyle,
  ColorTheme,
  ShadowLevel,
  ShadowLevelName,
  ShadowSystem,
} from '../../types.js';
import { hexToHsl, hslToHex } from './color-palette.js';

const LEVEL_CONFIGS: Record<
  ShadowLevelName,
  { y: number; blur: number; spread: number; opacity: number }
> = {
  none: { y: 0, blur: 0, spread: 0, opacity: 0 },
  sm: { y: 1, blur: 2, spread: 0, opacity: 0.05 },
  md: { y: 2, blur: 4, spread: -1, opacity: 0.08 },
  lg: { y: 4, blur: 8, spread: -2, opacity: 0.1 },
  xl: { y: 8, blur: 16, spread: -4, opacity: 0.12 },
  '2xl': { y: 16, blur: 32, spread: -8, opacity: 0.15 },
};

function makeShadowColor(primaryHex: string, opacity: number): string {
  const hsl = hexToHsl(primaryHex);
  const tinted = hslToHex(hsl.h, Math.min(hsl.s, 30), 20);
  const r = parseInt(tinted.slice(1, 3), 16);
  const g = parseInt(tinted.slice(3, 5), 16);
  const b = parseInt(tinted.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function buildLevel(
  cfg: (typeof LEVEL_CONFIGS)[ShadowLevelName],
  primaryHex: string,
  dark: boolean
): ShadowLevel {
  const sign = dark ? -1 : 1;
  const adjustedOpacity = dark ? cfg.opacity * 1.5 : cfg.opacity;
  const color = makeShadowColor(primaryHex, adjustedOpacity);
  const oY = cfg.y * sign;
  const cssValue =
    cfg.blur === 0
      ? 'none'
      : `${cfg.y === 0 ? 0 : `${oY}px`} ${oY === 0 ? '' : `${Math.abs(oY)}px `}${cfg.blur}px ${cfg.spread}px ${color}`.trim();
  return {
    offsetX: 0,
    offsetY: oY,
    blur: cfg.blur,
    spread: cfg.spread,
    color,
    opacity: adjustedOpacity,
    cssValue,
  };
}

export function generateShadowSystem(
  primaryHex = '#6B4CE6',
  theme: ColorTheme = 'light',
  _style?: BrandStyle
): ShadowSystem {
  const dark = theme === 'dark';
  const levels = {} as Record<ShadowLevelName, ShadowLevel>;
  for (const [name, cfg] of Object.entries(LEVEL_CONFIGS)) {
    levels[name as ShadowLevelName] = buildLevel(cfg, primaryHex, dark);
  }
  return { levels };
}
