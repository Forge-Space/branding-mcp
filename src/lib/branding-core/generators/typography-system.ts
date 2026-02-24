import type { FontCategory, TypeScaleRatio, TypeStep, TypographySystem } from '../../types.js';

const SCALE_RATIOS: Record<TypeScaleRatio, number> = {
  'minor-second': 1.067,
  'major-second': 1.125,
  'minor-third': 1.2,
  'major-third': 1.25,
  'perfect-fourth': 1.333,
  'augmented-fourth': 1.414,
  'perfect-fifth': 1.5,
  'golden-ratio': 1.618,
};

const FONT_PAIRINGS: Record<FontCategory, Record<FontCategory, [string, string][]>> = {
  'sans-serif': {
    serif: [
      ['Inter', 'Merriweather'],
      ['Helvetica Neue', 'Georgia'],
      ['Open Sans', 'Lora'],
    ],
    'sans-serif': [
      ['Montserrat', 'Open Sans'],
      ['Poppins', 'Inter'],
      ['Raleway', 'Nunito'],
    ],
    monospace: [['Inter', 'JetBrains Mono']],
    display: [['Inter', 'Playfair Display']],
    handwriting: [['Inter', 'Caveat']],
  },
  serif: {
    'sans-serif': [
      ['Playfair Display', 'Source Sans 3'],
      ['Merriweather', 'Open Sans'],
      ['Lora', 'Inter'],
    ],
    serif: [
      ['Playfair Display', 'Merriweather'],
      ['Lora', 'Georgia'],
    ],
    monospace: [['Merriweather', 'Fira Code']],
    display: [['Merriweather', 'Playfair Display']],
    handwriting: [['Merriweather', 'Caveat']],
  },
  monospace: {
    'sans-serif': [['JetBrains Mono', 'Inter']],
    serif: [['Fira Code', 'Merriweather']],
    monospace: [['JetBrains Mono', 'Fira Code']],
    display: [['JetBrains Mono', 'Playfair Display']],
    handwriting: [['JetBrains Mono', 'Caveat']],
  },
  display: {
    'sans-serif': [
      ['Playfair Display', 'Inter'],
      ['Bebas Neue', 'Open Sans'],
    ],
    serif: [['Playfair Display', 'Merriweather']],
    monospace: [['Playfair Display', 'JetBrains Mono']],
    display: [['Bebas Neue', 'Playfair Display']],
    handwriting: [['Playfair Display', 'Caveat']],
  },
  handwriting: {
    'sans-serif': [['Caveat', 'Inter']],
    serif: [['Caveat', 'Merriweather']],
    monospace: [['Caveat', 'JetBrains Mono']],
    display: [['Caveat', 'Playfair Display']],
    handwriting: [['Caveat', 'Dancing Script']],
  },
};

const STEP_NAMES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];

function pickPairing(headingCat: FontCategory, bodyCat: FontCategory): [string, string] {
  const options = FONT_PAIRINGS[headingCat]?.[bodyCat];
  if (!options?.length) return ['Inter', 'Inter'];
  return options[Math.floor(Math.random() * options.length)];
}

function lineHeightForSize(size: number): string {
  if (size <= 16) return '1.6';
  if (size <= 24) return '1.5';
  if (size <= 36) return '1.3';
  return '1.2';
}

function letterSpacingForSize(size: number): string {
  if (size <= 14) return '0.02em';
  if (size <= 20) return '0em';
  return '-0.01em';
}

function weightForStep(index: number, totalSteps: number): number {
  const mid = Math.floor(totalSteps / 2);
  if (index <= mid) return 400;
  if (index <= mid + 2) return 600;
  return 700;
}

export function generateTypographySystem(
  headingCategory: FontCategory = 'sans-serif',
  bodyCategory: FontCategory = 'serif',
  scaleRatio: TypeScaleRatio = 'major-third',
  baseSize = 16
): TypographySystem {
  const ratio = SCALE_RATIOS[scaleRatio];
  const [headingFont, bodyFont] = pickPairing(headingCategory, bodyCategory);

  const baseIndex = 2;
  const steps: TypeStep[] = STEP_NAMES.map((name, i) => {
    const exponent = i - baseIndex;
    const size = Math.round(baseSize * Math.pow(ratio, exponent) * 100) / 100;
    return {
      name,
      size: `${size}px`,
      lineHeight: lineHeightForSize(size),
      letterSpacing: letterSpacingForSize(size),
      weight: weightForStep(i, STEP_NAMES.length),
    };
  });

  return {
    headingFont,
    bodyFont,
    monoFont: 'JetBrains Mono',
    baseSize,
    scaleRatio: ratio,
    steps,
  };
}
