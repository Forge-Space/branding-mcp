import type { BrandIdentity } from '../../types.js';
import type { BrandIntent, ColorIntent, TypographyIntent } from './types.js';

const COLOR_KEYWORDS: Record<string, ColorIntent> = {
  warm: { harmony: 'analogous', hueShift: 15 },
  cool: { harmony: 'analogous', hueShift: -15 },
  subtle: { harmony: 'analogous', saturationShift: -15 },
  vibrant: { harmony: 'triadic', saturationShift: 15 },
  bold: { harmony: 'complementary', saturationShift: 10 },
  muted: { harmony: 'monochromatic', saturationShift: -20 },
  dark: { theme: 'dark', lightnessShift: -15 },
  light: { theme: 'light', lightnessShift: 15 },
  monochromatic: { harmony: 'monochromatic' },
  complementary: { harmony: 'complementary' },
  analogous: { harmony: 'analogous' },
  triadic: { harmony: 'triadic' },
  premium: { harmony: 'analogous', saturationShift: -10, lightnessShift: -10 },
  playful: { harmony: 'triadic', saturationShift: 15, lightnessShift: 5 },
  corporate: { harmony: 'complementary', saturationShift: -10 },
  organic: { harmony: 'analogous', hueShift: 30 },
  elegant: { harmony: 'monochromatic', saturationShift: -15, lightnessShift: -5 },
};

const TYPOGRAPHY_KEYWORDS: Record<string, TypographyIntent> = {
  serif: { headingCategory: 'serif' },
  'sans-serif': { headingCategory: 'sans-serif' },
  mono: { bodyCategory: 'monospace' },
  monospace: { bodyCategory: 'monospace' },
  display: { headingCategory: 'display' },
  handwritten: { headingCategory: 'handwriting' },
  compact: { scaleRatio: 'minor-second' },
  tight: { scaleRatio: 'major-second' },
  spacious: { scaleRatio: 'perfect-fourth' },
  dramatic: { scaleRatio: 'golden-ratio' },
  larger: { baseSize: 18 },
  smaller: { baseSize: 14 },
  editorial: { headingCategory: 'serif', scaleRatio: 'perfect-fourth' },
  technical: { bodyCategory: 'monospace', headingCategory: 'sans-serif' },
  modern: { headingCategory: 'sans-serif', bodyCategory: 'sans-serif' },
  classic: { headingCategory: 'serif', bodyCategory: 'serif' },
};

function mergeColorIntents(intents: ColorIntent[]): ColorIntent {
  const merged: ColorIntent = {};
  for (const intent of intents) {
    if (intent.harmony) merged.harmony = intent.harmony;
    if (intent.theme) merged.theme = intent.theme;
    if (intent.baseColor) merged.baseColor = intent.baseColor;
    merged.saturationShift = (merged.saturationShift ?? 0) + (intent.saturationShift ?? 0);
    merged.lightnessShift = (merged.lightnessShift ?? 0) + (intent.lightnessShift ?? 0);
    merged.hueShift = (merged.hueShift ?? 0) + (intent.hueShift ?? 0);
  }
  return merged;
}

export function interpretWithKeywords(
  feedback: string,
  element: 'colors' | 'typography' | 'spacing',
  _currentBrand?: BrandIdentity
): BrandIntent {
  const lower = feedback.toLowerCase();

  if (element === 'colors') {
    const matched: ColorIntent[] = [];
    for (const [keyword, intent] of Object.entries(COLOR_KEYWORDS)) {
      if (lower.includes(keyword)) {
        matched.push(intent);
      }
    }
    return {
      color: matched.length > 0 ? mergeColorIntents(matched) : { harmony: 'complementary' },
      reasoning: `Keyword match: ${matched.length > 0 ? 'matched color keywords' : 'default fallback'}`,
    };
  }

  if (element === 'typography') {
    const matched: TypographyIntent[] = [];
    for (const [keyword, intent] of Object.entries(TYPOGRAPHY_KEYWORDS)) {
      if (lower.includes(keyword)) {
        matched.push(intent);
      }
    }
    const merged: TypographyIntent = {};
    for (const intent of matched) {
      Object.assign(merged, intent);
    }
    return {
      typography:
        Object.keys(merged).length > 0 ? merged : { headingCategory: 'sans-serif' as const },
      reasoning: `Keyword match: ${matched.length > 0 ? 'matched typography keywords' : 'default fallback'}`,
    };
  }

  return { reasoning: 'No actionable keywords found for spacing refinement' };
}
