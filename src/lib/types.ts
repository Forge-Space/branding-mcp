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

export interface EmailTemplate {
  name: string;
  purpose: string;
  subjectLineFormulas: string[];
  preheaderText: string;
  structure: string[];
  designNotes: string;
}

export interface EmailCampaign {
  type: string;
  goal: string;
  frequency: string;
  keyMessages: string[];
  callToAction: string;
}

export interface BrandEmailOutput {
  templates: EmailTemplate[];
  campaigns: EmailCampaign[];
  subjectLineExamples: string[];
  preheaderExamples: string[];
  colorUsage: {
    background: string;
    text: string;
    accent: string;
    button: string;
  };
  typographyGuidelines: {
    headingFont: string;
    bodyFont: string;
    fontSize: string;
    lineHeight: string;
  };
  copyTone: string;
  bestPractices: string[];
  footerElements: string[];
  accessibilityNotes: string[];
}

// Campaign
export interface CampaignChannel {
  name: string;
  role: string;
  budget: string;
  tactics: string[];
}

export interface CampaignPhase {
  name: string;
  duration: string;
  goal: string;
  tactics: string[];
  kpis: string[];
  messaging: string;
}

export interface BrandCampaignOutput {
  campaignThemes: string[];
  primaryObjective: string;
  secondaryObjectives: string[];
  targetAudience: { primary: string; secondary: string; psychographics: string[] };
  channels: CampaignChannel[];
  phases: CampaignPhase[];
  messagingPillars: string[];
  creativeConcept: string;
  callToAction: string;
  successMetrics: Record<string, string>;
  budgetAllocation: Record<string, string>;
  campaignDuration: string;
  keyMessages: string[];
}

// Photography
export interface PhotoCompositionRule {
  rule: string;
  example: string;
}

export interface PhotoColorTreatment {
  palette: string;
  saturation: string;
  contrast: string;
  grading: string;
  filters: string[];
}

export interface PhotoStyleGuide {
  aesthetic: string;
  lighting: string;
  mood: string;
  subjects: string[];
  compositionRules: PhotoCompositionRule[];
  colorTreatment: PhotoColorTreatment;
  doAndAvoid: { do: string[]; avoid: string[] };
}

export interface BrandPhotographyOutput {
  styleGuide: PhotoStyleGuide;
  moodBoardKeywords: string[];
  useCaseGuidelines: Record<string, string>;
  technicalRequirements: Record<string, string>;
  shootBriefSummary: string;
}

// Print
export interface PrintTemplate {
  name: string;
  description: string;
  dimensions: string;
  bleed: string;
  safeZone: string;
  columns: number;
  margins: string;
  primaryUse: string;
}

export interface PrintColourSpec {
  mode: string;
  primaryColour: string;
  secondaryColour: string;
  accentColour: string;
  blackType: string;
  whiteSpace: string;
  pantoneBridge: string;
}

export interface PrintAccessibility {
  minimumFontSize: string;
  bodyTextMinContrast: string;
  headlineMinContrast: string;
  printOnColourMinSize: string;
  reverseTypeMinWeight: string;
  notes: string[];
}

export interface BrandPrintOutput {
  gridSystem: string;
  typographyHierarchy: string;
  paperStocks: string[];
  printFinishes: string[];
  colourApproach: string;
  imageryGuidelines: string;
  templates: PrintTemplate[];
  colourSpec: PrintColourSpec;
  accessibility: PrintAccessibility;
  productionNotes: string[];
  printBriefSummary: string;
}

// Packaging
export interface PackagingFormat {
  type: string;
  primaryUse: string;
  sizeGuidance: string;
  dieCutNotes: string;
}

export interface BrandPackagingOutput {
  formLanguage: string;
  materials: string[];
  colorApproach: string;
  colorPaletteSummary: string[];
  typographyApproach: string;
  brandingElements: string[];
  formats: PackagingFormat[];
  printSpecs: Record<string, string>;
  legalZones: Record<string, string>;
  dilineGuide: string;
  sustainability: string[];
  unboxingExperience: string;
  packagingBriefSummary: string;
}

export interface RetailWindowDisplay {
  concept: string;
  changeFrequency: string;
  keyElements: string[];
  lightingApproach: string;
}

export interface BrandRetailOutput {
  storeConcept: string;
  materials: string[];
  lighting: string;
  signageTypes: string[];
  displaySystems: string[];
  customerJourney: string[];
  floorPlanGuidance: Record<string, string>;
  staffGuidelines: string[];
  windowDisplay: RetailWindowDisplay;
  digitalIntegration: string[];
  sustainabilityFeatures: string[];
  retailBriefSummary: string;
}

// Event
export interface EventFormat {
  type: string;
  description: string;
  capacity: string;
  duration: string;
  setupNotes: string;
}

export interface BrandEventOutput {
  eventConcept: string;
  recommendedVenues: string[];
  decorTheme: string[];
  cateringApproach: string;
  entertainmentIdeas: string[];
  agendaStructure: string;
  invitationStyle: string;
  eventFormats: EventFormat[];
  brandingChecklist: string[];
  successMetrics: Record<string, string>;
  budgetGuidance: Record<string, string>;
  eventBriefSummary: string;
}

export interface InteriorSpaceZone {
  zone: string;
  percentage: string;
  purpose: string;
}

export interface BrandInteriorOutput {
  spaceConcept: string;
  materials: string[];
  lightingApproach: string;
  colourPaletteApplication: string;
  furnitureDirection: string;
  signageAndWayfinding: string;
  biophilicElements: string;
  spaceZones: InteriorSpaceZone[];
  accessibilityNotes: string[];
  sustainabilityFeatures: string[];
  interiorBriefSummary: string;
}

// Digital / UX
export interface DigitalComponentSpec {
  component: string;
  variants: string[];
  cssProperties: Record<string, string>;
  accessibilityNotes: string;
}

export interface DigitalAccessibilitySpec {
  wcagTarget: string;
  minimumContrastBody: string;
  minimumContrastLargeText: string;
  minimumContrastUI: string;
  focusIndicator: string;
  minimumTouchTarget: string;
  reducedMotionSupport: string;
  screenReaderNotes: string[];
  keyboardNavigationNotes: string[];
}

export interface BrandDigitalOutput {
  uiLanguage: string;
  gridSystem: string;
  borderRadiusSystem: string;
  shadowSystem: string;
  animationStyle: string;
  darkModeApproach: string;
  iconStyle: string;
  formPatterns: string;
  componentPatterns: string[];
  componentSpecs: DigitalComponentSpec[];
  accessibilitySpec: DigitalAccessibilitySpec;
  designTokenSnippet: string;
  digitalBriefSummary: string;
}

// generate_brand_content types
export interface ContentPillarItem {
  name: string;
  purpose: string;
  topics: string[];
  formats: string[];
}

export interface ContentCalendarWeekItem {
  week: number;
  theme: string;
  formats: string[];
}

export interface BrandContentOutput {
  editorialTone: string;
  contentTypes: string[];
  headlinePattern: string;
  seoApproach: string;
  contentPillars: ContentPillarItem[];
  editorialGuidelines: Record<string, string>;
  distributionStrategy: Record<string, string>;
  contentCalendar: ContentCalendarWeekItem[];
  contentBriefSummary: string;
}

// generate_brand_ux types
export interface BrandUxOutput {
  writingVoice: string;
  ctaStyle: string[];
  errorMessageTone: string;
  emptyStateApproach: string;
  onboardingPattern: string;
  loadingCopy: string[];
  tooltipStyle: string;
  notificationPattern: string;
  microcopyExamples: Record<string, string[]>;
  formGuidelines: Record<string, string>;
  contentHierarchy: string[];
  accessibilityGuidelines: string[];
  contentStrategy: Record<string, string[]>;
  uxBriefSummary: string;
}

// generate_brand_partnership types
export interface PartnershipTier {
  tier: string;
  description: string;
  commitment: string;
  investmentLevel: string;
  benefits: string[];
  requirements: string[];
}

export interface CollaborationFormat {
  format: string;
  description: string;
  timeline: string;
  channels: string[];
  kpis: string[];
}

export interface BrandPartnershipOutput {
  partnershipApproach: string;
  idealPartnerProfiles: string[];
  collaborationThemes: string[];
  partnerValueExchange: string;
  screeningCriteria: string[];
  partnershipTiers: PartnershipTier[];
  collaborationFormats: CollaborationFormat[];
  outreachTemplate: string;
  negotiationPrinciples: string[];
  redFlags: string[];
  partnershipBriefSummary: string;
}

export interface PressRelease {
  type: string;
  headline: string;
  subheadline: string;
  dateline: string;
  boilerplate: string;
  quoteGuidance: string;
  callToAction: string;
}

export interface MediaContact {
  tier: string;
  outlet: string;
  angle: string;
  preferredFormat: string;
}

export interface BrandPrOutput {
  prApproach: string;
  mediaAngles: string[];
  headlineFormula: string;
  pressReleases: PressRelease[];
  mediaContacts: MediaContact[];
  mediaKitContents: string[];
  spokespeople: string[];
  crisisProtocol: string[];
  embargoPractices: string[];
  measurementKpis: string[];
  prBriefSummary: string;
}

export interface BrandLegalOutput {
  trademarkTone: string;
  trademarkGuidelines: string[];
  brandUsageRules: string[];
  copyrightNotices: string[];
  toneOfVoiceLegal: string;
  privacyCompliance: string[];
  disclaimers: string[];
  licensingTerms: Record<string, string>;
  accessibilityCompliance: string[];
  legalBriefSummary: string;
}

export interface AccessibilityChecklistSection {
  section: string;
  items: string[];
}

export interface BrandAccessibilityOutput {
  wcagTarget: string;
  colourContrastStrategy: string;
  focusIndicatorStyle: string;
  motionGuidance: string;
  typographyGuidance: string;
  checklistSections: AccessibilityChecklistSection[];
  testingProtocol: string[];
  designTokenRequirements: Record<string, string>;
  accessibilityBriefSummary: string;
}

export interface BrandSustainabilityOutput {
  esgApproach: string;
  environmentalCommitments: string[];
  socialCommitments: string[];
  governancePrinciples: string[];
  certifications: string[];
  sdgAlignment: string[];
  reportingFramework: string;
  sustainabilityBriefSummary: string;
}

export interface BrandEmployerOutput {
  evpStatement: string;
  culturePillars: string[];
  benefitsFraming: string[];
  candidatePersonaTraits: string[];
  interviewApproach: string;
  onboardingApproach: string;
  jobAdGuidelines: string[];
  employerBriefSummary: string;
}

export interface InvestorDeckSlide {
  slide: string;
  headline: string;
  bullets: string[];
  speakerNotes: string;
}

export interface BrandInvestorOutput {
  communicationTone: string;
  investmentThesis: string;
  competitiveMoat: string[];
  useOfFunds: string[];
  idealInvestorProfile: string[];
  executiveSummary: string;
  investorDeck: InvestorDeckSlide[];
  dueDiligenceChecklist: string[];
  faqAnswers: Record<string, string>;
  investorBriefSummary: string;
}

export interface BrandFranchiseOutput {
  standardsTone: string;
  onboardingProgramme: string[];
  complianceRequirements: string[];
  approvedSupplierFocus: string;
  licensingTerms: Record<string, string>;
  operationsManualOutline: string[];
  brandProtectionPolicies: string[];
  franchiseeSupport: string[];
  franchiseBriefSummary: string;
}

export interface BrandCommunityOutput {
  communityApproach: string;
  platforms: string[];
  engagementTactics: string[];
  moderationApproach: string;
  memberRecognition: string[];
  growthLevers: string[];
  communityGuidelines: string[];
  onboardingFlow: string[];
  successMetrics: Record<string, string>;
  communityBriefSummary: string;
}

export interface CustomerPersona {
  name: string;
  demographics: string;
  goals: string[];
  painPoints: string[];
  motivations: string[];
  preferredChannels: string[];
  messageResonance: string;
}

export interface CustomerJourneyStage {
  stage: string;
  touchpoints: string[];
  emotions: string;
  opportunities: string[];
  kpis: string[];
}

export interface BrandCustomerOutput {
  cxApproach: string;
  loyaltyStrategy: string[];
  supportTone: string;
  feedbackChannels: string[];
  personas: CustomerPersona[];
  journeyStages: CustomerJourneyStage[];
  voiceOfCustomerPlan: string[];
  customerBriefSummary: string;
}

export interface TrainingModule {
  title: string;
  duration: string;
  format: string;
  objectives: string[];
  assessmentMethod: string;
}

export interface LearningPath {
  role: string;
  durationWeeks: number;
  phases: string[];
  keyResources: string[];
}

export interface BrandTrainingOutput {
  trainingCulture: string;
  deliveryFormats: string[];
  assessmentApproach: string;
  learningCadence: string;
  knowledgeBaseStructure: string[];
  onboardingModules: TrainingModule[];
  learningPaths: LearningPath[];
  brandChampionProgramme: string[];
  trainingBriefSummary: string;
}

export interface AnalyticsDashboard {
  name: string;
  audience: string;
  updateFrequency: string;
  metrics: string[];
  visualisationType: string;
}

export interface BrandAnalyticsOutput {
  analyticsApproach: string;
  primaryKpis: string[];
  reportingCadence: string;
  recommendedTools: string[];
  attributionModel: string;
  dashboards: AnalyticsDashboard[];
  measurementFramework: string[];
  analyticsBriefSummary: string;
}

export interface CompetitorProfile {
  competitorType: string;
  description: string;
  theirStrengths: string[];
  theirWeaknesses: string[];
  ourCounterMessage: string;
  winProbability: string;
}

export interface PositioningAxis {
  axis: string;
  ourPosition: string;
  competitorPosition: string;
}

export interface WinLossTheme {
  theme: string;
  reasons: string[];
  implication: string;
}

export interface BrandCompetitiveOutput {
  positioningApproach: string;
  competitiveAdvantages: string[];
  competitiveMoat: string;
  battlecardTone: string;
  competitorProfiles: CompetitorProfile[];
  positioningMatrix: PositioningAxis[];
  winLossThemes: WinLossTheme[];
  objectionHandling: string[];
  competitiveBriefSummary: string;
}

export interface IdeationMethod {
  method: string;
  description: string;
  bestFor: string;
  timeInvestment: string;
}

export interface InnovationPillar {
  pillar: string;
  description: string;
  initiatives: string[];
  successCriteria: string;
}

export interface BrandInnovationOutput {
  innovationCulture: string;
  focusAreas: string[];
  innovationThemes: string[];
  processFrameworks: string[];
  technologyBets: string[];
  ideationMethods: IdeationMethod[];
  innovationPillars: InnovationPillar[];
  successMetrics: string[];
  innovationCadence: string;
  openInnovationApproach: string;
  ipStrategy: string;
  innovationBriefSummary: string;
}

export interface LocaleAdaptation {
  locale: string;
  language: string;
  rtl: boolean;
  keyAdaptations: string[];
  colourConsiderations: string;
  typographyNotes: string;
}

export interface BrandGlobalisationOutput {
  localisationApproach: string;
  brandStandardsFlexibility: string;
  culturalSensitivityFocus: string[];
  priorityMarkets: string[];
  localeAdaptations: LocaleAdaptation[];
  translationGuidelines: string[];
  internationalBrandArchitecture: string[];
  complianceRequirements: string[];
  globalisationBriefSummary: string;
}

export interface CrisisResponsePhase {
  phase: string;
  objectives: string[];
  actions: string[];
  communicationsAction: string;
}

export interface CrisisStakeholder {
  group: string;
  priority: string;
  channel: string;
  messageFrame: string;
  responseTime: string;
}

export interface BrandCrisisOutput {
  crisisTone: string;
  firstResponseGuidelines: string[];
  spokespersonGuidance: string;
  channelPriority: string[];
  responsePhases: CrisisResponsePhase[];
  darkSiteContent: string[];
  stakeholderMatrix: CrisisStakeholder[];
  monitoringChecklist: string[];
  doNotSayList: string[];
  crisisBriefSummary: string;
}
