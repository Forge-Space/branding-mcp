import type { BrandIdentity, BrandStyle } from '../../types.js';

export interface BrandNamingOutput {
  nameIdeas: NameIdea[];
  taglineVariations: string[];
  domainSuggestions: DomainSuggestion[];
  hashtags: string[];
  namingRationale: string;
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

const STYLE_NAME_PATTERNS: Record<
  BrandStyle,
  { prefixes: string[]; suffixes: string[]; modifiers: string[] }
> = {
  minimal: {
    prefixes: ['One', 'Pure', 'Clear', 'Simple', 'Clean'],
    suffixes: ['io', 'ly', 'al', 'est', ''],
    modifiers: ['simple', 'clean', 'pure', 'focused'],
  },
  bold: {
    prefixes: ['Peak', 'Apex', 'Ultra', 'Max', 'Prime'],
    suffixes: ['ify', 'surge', 'force', 'edge', 'X'],
    modifiers: ['bold', 'strong', 'powerful', 'intense'],
  },
  elegant: {
    prefixes: ['Lux', 'Vela', 'Aura', 'Noir', 'Belle'],
    suffixes: ['ux', 'ique', 'elle', 'ara', 'oir'],
    modifiers: ['refined', 'elegant', 'sophisticated', 'premium'],
  },
  playful: {
    prefixes: ['Zap', 'Hop', 'Fizz', 'Pop', 'Zip'],
    suffixes: ['ify', 'ster', 'o', 'oo', 'ish'],
    modifiers: ['fun', 'bright', 'bouncy', 'whimsical'],
  },
  corporate: {
    prefixes: ['Global', 'Core', 'Capital', 'Prime', 'Nexus'],
    suffixes: ['Corp', 'Group', 'Solutions', 'Partners', 'Associates'],
    modifiers: ['trusted', 'established', 'professional', 'reliable'],
  },
  tech: {
    prefixes: ['Syn', 'Hex', 'Algo', 'Dev', 'Bit'],
    suffixes: ['.ai', 'Stack', 'Labs', 'Hub', 'OS'],
    modifiers: ['smart', 'automated', 'intelligent', 'connected'],
  },
  organic: {
    prefixes: ['Root', 'Bloom', 'Grove', 'Terra', 'Sage'],
    suffixes: ['Craft', 'Grown', 'Wild', 'Earth', 'Seed'],
    modifiers: ['natural', 'sustainable', 'organic', 'earthy'],
  },
  retro: {
    prefixes: ['Ace', 'Rad', 'Neon', 'Volt', 'Dash'],
    suffixes: ['Works', 'Co', 'Studio', 'Shop', 'House'],
    modifiers: ['classic', 'vintage', 'retro', 'timeless'],
  },
};

const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  tech: ['data', 'cloud', 'digital', 'smart', 'auto', 'net', 'code'],
  finance: ['capital', 'wealth', 'trust', 'asset', 'fund', 'invest'],
  health: ['care', 'life', 'vital', 'well', 'health', 'pulse'],
  education: ['learn', 'skill', 'grow', 'mentor', 'knowledge', 'academy'],
  food: ['bite', 'taste', 'farm', 'harvest', 'fresh', 'plate'],
  retail: ['shop', 'market', 'store', 'find', 'pick', 'cart'],
  creative: ['studio', 'craft', 'make', 'design', 'art', 'create'],
  travel: ['go', 'roam', 'path', 'journey', 'venture', 'wander'],
  real_estate: ['place', 'home', 'space', 'build', 'dwell', 'abode'],
};

function extractIndustryKey(industry: string): string {
  const lower = industry.toLowerCase();
  for (const key of Object.keys(INDUSTRY_KEYWORDS)) {
    if (lower.includes(key)) return key;
  }
  return 'tech';
}

function buildNameIdeas(industry: string, style: BrandStyle): NameIdea[] {
  const patterns = STYLE_NAME_PATTERNS[style] ?? STYLE_NAME_PATTERNS.minimal;
  const industryKey = extractIndustryKey(industry);
  const industryWords = INDUSTRY_KEYWORDS[industryKey] ?? INDUSTRY_KEYWORDS.tech;

  return [
    {
      name: `${patterns.prefixes[0]}${industryWords[0].charAt(0).toUpperCase() + industryWords[0].slice(1)}`,
      type: 'portmanteau',
      rationale: `Blends a ${style} style prefix with an industry-specific root for instant recognition.`,
    },
    {
      name: `${industryWords[1].charAt(0).toUpperCase() + industryWords[1].slice(1)}${patterns.suffixes[0]}`,
      type: 'descriptive',
      rationale: `Anchors the name in the ${industry} domain with a ${style}-style ending.`,
    },
    {
      name: `${patterns.prefixes[2]}${patterns.suffixes[2]}`,
      type: 'abstract',
      rationale: `A brandable, vowel-rich name that feels ${patterns.modifiers[0]} and memorable.`,
    },
    {
      name: `${industryWords[0].charAt(0).toUpperCase() + industryWords[0].slice(1)} ${patterns.suffixes[3] || 'Co'}`,
      type: 'evocative',
      rationale: `Evokes the ${industry} space with a ${patterns.modifiers[1]} modifier that differentiates.`,
    },
    {
      name: patterns.prefixes[4] ?? patterns.prefixes[0],
      type: 'abstract',
      rationale: `Short, punchy, easy to spell — ideal for a ${style} brand targeting digital channels.`,
    },
  ];
}

function buildTaglineVariations(brand: BrandIdentity): string[] {
  const { industry, style } = brand;
  const patterns = STYLE_NAME_PATTERNS[style] ?? STYLE_NAME_PATTERNS.minimal;
  const mod = patterns.modifiers;

  return [
    `${mod[0].charAt(0).toUpperCase() + mod[0].slice(1)} ${industry}. Redefined.`,
    `Where ${industry} meets ${mod[1]} design.`,
    `The ${mod[2]} way to ${industry}.`,
    `Built for the ${mod[3]} era.`,
    `${industry.charAt(0).toUpperCase() + industry.slice(1)}, made ${mod[0]}.`,
  ];
}

function buildDomainSuggestions(brand: BrandIdentity): DomainSuggestion[] {
  const { industry, style } = brand;
  const industryKey = extractIndustryKey(industry);

  return [
    {
      format: '[brandname].com',
      example: `get${industryKey}.com`,
      notes: 'Primary .com remains the most trusted TLD for any audience.',
    },
    {
      format: '[brandname].io',
      example: `${industryKey}hub.io`,
      notes: 'Strong for tech and SaaS brands; developer-community positive.',
    },
    {
      format: 'get[brandname].com',
      example: `get${industryKey}now.com`,
      notes: 'Action-oriented prefix when exact .com is taken.',
    },
    {
      format: '[brandname].co',
      example: `${style}${industryKey}.co`,
      notes: 'Modern startup feel; shorter than .com alternatives.',
    },
    {
      format: 'try[brandname].com',
      example: `try${industryKey}.com`,
      notes: 'Conversion-friendly for product-led growth.',
    },
  ];
}

function buildHashtags(brand: BrandIdentity): string[] {
  const { industry, style } = brand;
  const industryKey = extractIndustryKey(industry);
  const patterns = STYLE_NAME_PATTERNS[style] ?? STYLE_NAME_PATTERNS.minimal;
  const mod = patterns.modifiers;

  return [
    `#${industryKey}design`,
    `#${mod[0]}${industryKey}`,
    `#${style}brand`,
    `#${industryKey}innovation`,
    `#${mod[2]}${industryKey.charAt(0).toUpperCase() + industryKey.slice(1)}`,
    `#modernbranding`,
    `#${industryKey}community`,
    `#brandidentity`,
  ];
}

export function generateBrandNaming(brand: BrandIdentity): BrandNamingOutput {
  const { industry, style } = brand;
  const patterns = STYLE_NAME_PATTERNS[style] ?? STYLE_NAME_PATTERNS.minimal;

  return {
    nameIdeas: buildNameIdeas(industry, style),
    taglineVariations: buildTaglineVariations(brand),
    domainSuggestions: buildDomainSuggestions(brand),
    hashtags: buildHashtags(brand),
    namingRationale: `Names generated for a ${style} brand in the ${industry} space. Patterns emphasise ${patterns.modifiers.join(', ')} qualities that align with the chosen visual style. Prioritise short (≤12 chars), pronounceable names with available .com or .io domains.`,
  };
}
