import type { BrandIdentity, BrandStyle } from '../../types.js';

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

const STYLE_TONE: Record<BrandStyle, string> = {
  minimal: 'clear, precise, and focused',
  bold: 'confident, energetic, and direct',
  elegant: 'refined, sophisticated, and assured',
  playful: 'engaging, enthusiastic, and memorable',
  corporate: 'professional, credible, and structured',
  tech: 'innovative, data-driven, and forward-thinking',
  organic: 'authentic, purposeful, and human',
  retro: 'classic, dependable, and character-rich',
};

const STYLE_CTA: Record<BrandStyle, string> = {
  minimal: "Let's connect.",
  bold: 'Join us. Be part of something bigger.',
  elegant: 'We invite you to experience the difference.',
  playful: "Ready to get started? Let's do this!",
  corporate: 'Partner with us to drive measurable results.',
  tech: 'Request a demo and see the data for yourself.',
  organic: "Grow with us. Let's build something meaningful.",
  retro: "Work with a brand you can trust. Let's talk.",
};

const INDUSTRY_PROBLEM: Record<string, string> = {
  tech: 'Businesses are overwhelmed by complexity and lack the tools to move fast without breaking things.',
  finance:
    'Individuals and organizations struggle to navigate financial systems that were not built for them.',
  health: 'People face barriers to consistent, personalized care that fits their real lives.',
  education:
    'Learners are underserved by one-size-fits-all approaches that ignore individual needs.',
  food: 'Consumers want quality, transparency, and convenience — but rarely find all three together.',
  retail:
    'Shoppers are fatigued by choice overload and brands that fail to deliver on their promises.',
  creative:
    'Creative professionals are constrained by tools and systems that limit rather than unlock expression.',
  travel:
    'Travelers spend more time planning than experiencing — and still end up with generic outcomes.',
  real_estate:
    "Buyers and sellers navigate one of life's biggest decisions without adequate guidance.",
};

function extractIndustryKey(industry: string): string {
  const lower = industry.toLowerCase();
  if (lower.includes('tech') || lower.includes('software') || lower.includes('saas')) return 'tech';
  if (lower.includes('finance') || lower.includes('fintech') || lower.includes('bank'))
    return 'finance';
  if (lower.includes('health') || lower.includes('medical') || lower.includes('wellness'))
    return 'health';
  if (lower.includes('education') || lower.includes('edtech') || lower.includes('learning'))
    return 'education';
  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('beverage'))
    return 'food';
  if (lower.includes('retail') || lower.includes('ecommerce') || lower.includes('shop'))
    return 'retail';
  if (lower.includes('creative') || lower.includes('design') || lower.includes('agency'))
    return 'creative';
  if (lower.includes('travel') || lower.includes('hospitality') || lower.includes('tourism'))
    return 'travel';
  if (lower.includes('real estate') || lower.includes('property') || lower.includes('housing'))
    return 'real_estate';
  return 'tech';
}

function buildProblemStatement(brand: BrandIdentity): string {
  const key = extractIndustryKey(brand.industry);
  return INDUSTRY_PROBLEM[key] ?? INDUSTRY_PROBLEM['tech'];
}

function buildSolutionStatement(brand: BrandIdentity): string {
  const name = brand.name;
  const tagline = brand.tagline ?? "redefining what's possible";
  return `${name} is ${tagline.toLowerCase().startsWith('the') ? '' : 'the solution that '}${tagline.toLowerCase()}. We deliver a differentiated approach that solves this problem at its core, enabling our customers to achieve outcomes they previously thought out of reach.`;
}

function buildUVP(brand: BrandIdentity): string {
  const tone = STYLE_TONE[brand.style] ?? STYLE_TONE.minimal;
  return `${brand.name} is the only ${brand.industry} brand that combines ${tone} communication with a product experience that genuinely puts customers first. Our approach drives measurable outcomes while building lasting trust.`;
}

function buildAudienceProfile(brand: BrandIdentity): string {
  const lower = brand.industry.toLowerCase();
  if (lower.includes('enterprise') || lower.includes('b2b')) {
    return 'Decision-makers at mid-market and enterprise organizations seeking reliable, scalable solutions that deliver proven ROI.';
  }
  if (lower.includes('consumer') || lower.includes('b2c') || lower.includes('retail')) {
    return 'Discerning consumers aged 25–45 who value quality, authenticity, and brands that reflect their values.';
  }
  return `Professionals and organizations within the ${brand.industry} space who demand excellence and are ready to invest in a better solution.`;
}

function buildCompetitiveAdvantages(brand: BrandIdentity): string[] {
  const style = brand.style;
  const base = [
    `Distinctive ${style} brand identity that is immediately recognizable and consistently applied`,
    'Customer-centric design philosophy embedded in every touchpoint',
    'Agile execution model that delivers faster time-to-value than established incumbents',
  ];
  const styleExtra: Record<BrandStyle, string> = {
    minimal: 'Radical simplicity that eliminates friction and drives adoption',
    bold: 'Category-defining boldness that commands attention and drives word-of-mouth',
    elegant: 'Premium positioning that attracts high-value customers willing to pay for quality',
    playful: 'Emotional resonance that builds community and drives organic growth',
    corporate: 'Enterprise-grade trust signals that accelerate procurement decisions',
    tech: 'Technical depth and innovation pipeline that sustains competitive moat',
    organic: 'Authentic brand story that converts customers into advocates',
    retro: 'Heritage credibility and timeless quality that builds generational loyalty',
  };
  return [...base, styleExtra[style] ?? styleExtra.minimal];
}

function buildElevatorPitches(brand: BrandIdentity): ElevatorPitch[] {
  const name = brand.name;
  const industry = brand.industry;
  const tagline = brand.tagline ?? 'delivering excellence';
  const problem = buildProblemStatement(brand);
  const cta = STYLE_CTA[brand.style] ?? STYLE_CTA.minimal;

  const script15 = `${name} — ${tagline}. We're solving ${industry}'s biggest challenge so you can focus on what matters. ${cta}`;
  const script30 = `In ${industry}, ${problem.split('.')[0].toLowerCase()}. ${name} changes that. ${tagline}. Our customers see results within days, not months. ${cta}`;
  const script60 = `Here's what's broken in ${industry}: ${problem} That's why we built ${name}. ${tagline}. Our approach is ${STYLE_TONE[brand.style] ?? 'clear and focused'} — we cut through the noise and deliver outcomes that matter. Early customers are already seeing transformative results. ${cta} I'd love to show you what that looks like.`;

  return [
    { duration: '15s', script: script15, wordCount: script15.split(' ').length },
    { duration: '30s', script: script30, wordCount: script30.split(' ').length },
    { duration: '60s', script: script60, wordCount: script60.split(' ').length },
  ];
}

function buildPitchDeck(brand: BrandIdentity): PitchDeckSlide[] {
  const name = brand.name;
  const problem = buildProblemStatement(brand);
  const solution = buildSolutionStatement(brand);
  const uvp = buildUVP(brand);
  const audience = buildAudienceProfile(brand);
  const advantages = buildCompetitiveAdvantages(brand);

  return [
    {
      title: 'The Problem',
      content: [
        problem,
        'This problem costs businesses and consumers time, money, and trust — every single day.',
      ],
      speakerNotes:
        'Open with empathy. Make the audience feel the pain before presenting the solution.',
    },
    {
      title: `Introducing ${name}`,
      content: [brand.tagline ?? solution, uvp],
      speakerNotes:
        'Deliver your one-liner with confidence. Pause after the tagline to let it land.',
    },
    {
      title: 'Our Solution',
      content: [solution, 'Purpose-built for the people who feel this problem most acutely.'],
      speakerNotes: "Show, don't just tell. Use a visual demo or screenshot if available.",
    },
    {
      title: 'Target Audience',
      content: [
        audience,
        `We serve the segment of the ${brand.industry} market that has been underserved by legacy solutions.`,
      ],
      speakerNotes:
        'Be specific. Investors and partners want to know you understand your customer deeply.',
    },
    {
      title: 'Why We Win',
      content: advantages,
      speakerNotes: 'Focus on 2-3 advantages max. Depth beats breadth here.',
    },
    {
      title: 'Our Brand Promise',
      content: [
        `${name} commits to: ${advantages[0].toLowerCase()}`,
        'Every decision we make flows from this promise — product, marketing, culture.',
      ],
      speakerNotes: 'This is your emotional anchor. Speak from conviction.',
    },
    {
      title: 'The Ask',
      content: [
        STYLE_CTA[brand.style] ?? STYLE_CTA.minimal,
        "We're looking for partners who believe what we believe and want to build the future of this industry together.",
      ],
      speakerNotes: 'End with clarity. State exactly what you want from this audience.',
    },
  ];
}

function buildInvestorHighlights(brand: BrandIdentity): InvestorHighlight[] {
  return [
    {
      category: 'Market Opportunity',
      headline: `${brand.industry} is a large and growing market`,
      detail: `The ${brand.industry} industry is undergoing rapid transformation. ${brand.name} is positioned at the inflection point.`,
    },
    {
      category: 'Differentiation',
      headline: 'Defensible brand and product moat',
      detail: buildCompetitiveAdvantages(brand)[3] ?? buildCompetitiveAdvantages(brand)[0],
    },
    {
      category: 'Team & Vision',
      headline: 'Built to last, designed to scale',
      detail: `${brand.name} was founded with a clear mission and the operational discipline to execute against it.`,
    },
    {
      category: 'Traction',
      headline: 'Early signals validate the thesis',
      detail:
        'Customer feedback, retention metrics, and net promoter scores confirm product-market fit in target segments.',
    },
  ];
}

export function generateBrandPitch(brand: BrandIdentity): BrandPitchOutput {
  const name = brand.name;
  const tagline = brand.tagline ?? 'delivering excellence';

  return {
    elevatorPitches: buildElevatorPitches(brand),
    pitchDeck: buildPitchDeck(brand),
    oneLinePitch: `${name}: ${tagline}.`,
    problemStatement: buildProblemStatement(brand),
    solutionStatement: buildSolutionStatement(brand),
    uniqueValueProposition: buildUVP(brand),
    targetAudienceProfile: buildAudienceProfile(brand),
    competitiveAdvantages: buildCompetitiveAdvantages(brand),
    callToAction: STYLE_CTA[brand.style] ?? STYLE_CTA.minimal,
    investorHighlights: buildInvestorHighlights(brand),
  };
}
