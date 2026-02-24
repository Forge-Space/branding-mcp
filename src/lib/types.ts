export type ColorHarmony =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'monochromatic';

export type ColorTheme = 'light' | 'dark' | 'both';

export type FontCategory = 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting';

export type TypeScaleRatio =
  | 'minor-second'
  | 'major-second'
  | 'minor-third'
  | 'major-third'
  | 'perfect-fourth'
  | 'augmented-fourth'
  | 'perfect-fifth'
  | 'golden-ratio';

export type ExportFormat = 'json' | 'css' | 'tailwind' | 'figma' | 'react' | 'sass';

export type BrandDocFormat = 'pdf' | 'html';

export type BrandStyle =
  | 'minimal'
  | 'bold'
  | 'elegant'
  | 'playful'
  | 'corporate'
  | 'tech'
  | 'organic'
  | 'retro';

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  hsl: HslColor;
  oklch?: { l: number; c: number; h: number };
  usage: string;
}

export interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

export interface ColorPalette {
  primary: ColorSwatch;
  secondary: ColorSwatch;
  accent: ColorSwatch;
  neutral: ColorSwatch[];
  semantic: {
    success: ColorSwatch;
    warning: ColorSwatch;
    error: ColorSwatch;
    info: ColorSwatch;
  };
  contrast: Record<string, ContrastResult>;
}

export interface TypeStep {
  name: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
  weight: number;
}

export interface TypographySystem {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  baseSize: number;
  scaleRatio: number;
  steps: TypeStep[];
}

export interface SpacingScale {
  unit: number;
  values: Record<string, string>;
}

export interface LogoConfig {
  text: string;
  font: string;
  fontSize: number;
  color: string;
  backgroundColor: string;
  width: number;
  height: number;
}

export interface LogoOutput {
  svg: string;
  png?: Buffer;
}

export interface BrandIdentity {
  id: string;
  name: string;
  tagline?: string;
  industry: string;
  style: BrandStyle;
  colors: ColorPalette;
  typography: TypographySystem;
  spacing: SpacingScale;
  logo?: LogoOutput;
  createdAt: string;
}

export interface DesignTokens {
  $schema?: string;
  color: Record<string, Record<string, { $value: string; $type: string }>>;
  typography: Record<string, Record<string, { $value: string | number; $type: string }>>;
  spacing: Record<string, { $value: string; $type: string }>;
}

export interface BrandGenerationInput {
  brandName: string;
  industry: string;
  style: BrandStyle;
  tagline?: string;
  colorPrefs?: {
    baseColor?: string;
    harmony?: ColorHarmony;
    theme?: ColorTheme;
  };
  typographyPrefs?: {
    mood?: string;
    headingCategory?: FontCategory;
    bodyCategory?: FontCategory;
    scaleRatio?: TypeScaleRatio;
  };
}

export interface BrandValidationResult {
  valid: boolean;
  score: number;
  issues: BrandValidationIssue[];
}

export interface BrandValidationIssue {
  severity: 'error' | 'warning' | 'info';
  element: string;
  message: string;
  suggestion?: string;
}
