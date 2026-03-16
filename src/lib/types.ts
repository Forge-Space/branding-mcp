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

export type ExportFormat =
  | 'json'
  | 'css'
  | 'tailwind'
  | 'figma'
  | 'react'
  | 'sass'
  | 'style-dictionary';

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
  style?: BrandStyle;
}

export type LogoVariant = 'wordmark' | 'monogram' | 'abstract' | 'icon';

export interface LogoOutput {
  svg: string;
  variants: Record<LogoVariant, string>;
}

export type GradientType = 'linear' | 'radial' | 'conic';
export type GradientPresetName = 'hero' | 'button' | 'card' | 'text' | 'background';

export interface GradientStop {
  color: string;
  position: number;
}

export interface Gradient {
  type: GradientType;
  angle?: number;
  stops: GradientStop[];
  cssValue: string;
}

export interface GradientSystem {
  presets: Record<GradientPresetName, Gradient>;
}

export type FaviconSize = 16 | 32 | 180 | 512;

export interface FaviconSet {
  sizes: Record<FaviconSize, string>;
}

export type OgTemplate = 'default' | 'article' | 'social';

export interface OgImageOutput {
  template: OgTemplate;
  svg: string;
  width: number;
  height: number;
}

export type ShadowLevelName = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ShadowLevel {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  cssValue: string;
}

export interface ShadowSystem {
  levels: Record<ShadowLevelName, ShadowLevel>;
}

export type BorderRadiusName = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'circle';

export interface BorderSystem {
  radii: Record<BorderRadiusName, string>;
  widths: { thin: string; medium: string; thick: string };
}

export type DurationName = 'instant' | 'fast' | 'normal' | 'slow' | 'slower';
export type EasingName = 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring' | 'bounce';

export interface MotionSystem {
  durations: Record<DurationName, string>;
  easings: Record<EasingName, string>;
  transitions: Record<string, string>;
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
  shadows?: ShadowSystem;
  borders?: BorderSystem;
  motion?: MotionSystem;
  gradients?: GradientSystem;
  logo?: LogoOutput;
  createdAt: string;
}

export interface DesignTokens {
  $schema?: string;
  color: Record<string, Record<string, { $value: string; $type: string }>>;
  typography: Record<string, Record<string, { $value: string | number; $type: string }>>;
  spacing: Record<string, { $value: string; $type: string }>;
  shadow?: Record<string, { $value: string; $type: string }>;
  border?: Record<string, { $value: string; $type: string }>;
  motion?: Record<string, { $value: string; $type: string }>;
  gradient?: Record<string, { $value: string; $type: string }>;
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

export type BrandVoiceTone =
  | 'professional'
  | 'friendly'
  | 'playful'
  | 'authoritative'
  | 'empathetic'
  | 'inspirational'
  | 'minimalist'
  | 'bold';

export type BrandVoiceAudience =
  | 'b2b'
  | 'b2c'
  | 'enterprise'
  | 'startup'
  | 'consumer'
  | 'technical'
  | 'creative'
  | 'general';

export interface BrandVoiceGuidelines {
  tone: BrandVoiceTone;
  audience: BrandVoiceAudience;
  vocabulary: {
    preferred: string[];
    avoided: string[];
  };
  sentenceStyle: {
    averageLength: 'short' | 'medium' | 'long';
    structure: 'simple' | 'varied' | 'complex';
  };
  personality: string[];
  taglineSuggestions: string[];
  sampleCopy: {
    headline: string;
    subheadline: string;
    cta: string;
    aboutUs: string;
  };
  doAndDont: {
    do: string[];
    dont: string[];
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

export interface NameIdea {
  name: string;
  type: 'descriptive' | 'evocative' | 'abstract' | 'acronym' | 'portmanteau';
  rationale: string;
}

export interface DomainSuggestion {
  format: string;
  example: string;
  notes: string;
}

export interface BrandNamingOutput {
  nameIdeas: NameIdea[];
  taglineVariations: string[];
  domainSuggestions: DomainSuggestion[];
  hashtags: string[];
  namingRationale: string;
}

export interface BrandMotionPrinciple {
  name: string;
  description: string;
  cssExample: string;
}

export interface BrandMotionOutput {
  motionSystem: MotionSystem;
  principles: BrandMotionPrinciple[];
  animationScale: 'none' | 'minimal' | 'moderate' | 'expressive' | 'dramatic';
  preferredEasing: string;
  guidelines: {
    microInteractions: string;
    pageTransitions: string;
    loadingStates: string;
    feedback: string;
  };
  cssCustomProperties: string;
}

export interface SocialPlatformConfig {
  platform: string;
  handle: string;
  bioTemplate: string;
  postFrequency: string;
  contentFocus: string;
  hashtagStrategy: string;
  profileImageStyle: string;
  coverImageStyle: string;
  optimalPostLength: string;
}

export interface ContentPillar {
  name: string;
  description: string;
  contentTypes: string[];
}

export interface BrandSocialOutput {
  platforms: SocialPlatformConfig[];
  contentPillars: ContentPillar[];
  brandedHashtag: string;
  hashtags: string[];
  bioVariations: string[];
  postingStrategy: string;
  contentCalendar: Record<string, string[]>;
  voiceGuidelines: {
    tone: string;
    doAndDont: { do: string[]; dont: string[] };
    sampleCopy: Record<string, string>;
  };
}

export interface ElevatorPitch {
  duration: '15s' | '30s' | '60s';
  script: string;
  wordCount: number;
}

export interface PitchDeckSlide {
  title: string;
  content: string[];
  speakerNotes: string;
}

export interface InvestorHighlight {
  category: string;
  headline: string;
  detail: string;
}

export interface BrandPitchOutput {
  elevatorPitches: ElevatorPitch[];
  pitchDeck: PitchDeckSlide[];
  oneLinePitch: string;
  problemStatement: string;
  solutionStatement: string;
  uniqueValueProposition: string;
  targetAudienceProfile: string;
  competitiveAdvantages: string[];
  callToAction: string;
  investorHighlights: InvestorHighlight[];
}
