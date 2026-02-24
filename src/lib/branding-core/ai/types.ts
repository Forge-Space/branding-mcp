import type {
  BrandStyle,
  ColorHarmony,
  ColorTheme,
  FontCategory,
  TypeScaleRatio,
} from '../../types.js';

export interface ColorIntent {
  baseColor?: string;
  harmony?: ColorHarmony;
  theme?: ColorTheme;
  saturationShift?: number;
  lightnessShift?: number;
  hueShift?: number;
}

export interface TypographyIntent {
  headingCategory?: FontCategory;
  bodyCategory?: FontCategory;
  scaleRatio?: TypeScaleRatio;
  baseSize?: number;
}

export interface BrandIntent {
  color?: ColorIntent;
  typography?: TypographyIntent;
  style?: BrandStyle;
  reasoning?: string;
}

export interface InterpreterOptions {
  anthropicApiKey?: string;
  model?: string;
  maxTokens?: number;
}
