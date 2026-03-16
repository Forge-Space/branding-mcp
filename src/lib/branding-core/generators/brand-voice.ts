import type {
  BrandIdentity,
  BrandVoiceGuidelines,
  BrandVoiceTone,
  BrandVoiceAudience,
} from '../../types.js';

const TONE_VOCABULARY: Record<BrandVoiceTone, { preferred: string[]; avoided: string[] }> = {
  professional: {
    preferred: ['strategic', 'expertise', 'solutions', 'deliver', 'optimize', 'excellence'],
    avoided: ['awesome', 'super', 'crazy', 'killer', 'crush it', 'game-changer'],
  },
  friendly: {
    preferred: ['together', 'easy', 'help', 'welcome', 'support', 'community'],
    avoided: ['leverage', 'synergy', 'paradigm', 'utilize', 'facilitate'],
  },
  playful: {
    preferred: ['fun', 'exciting', 'discover', 'explore', 'magic', 'delight'],
    avoided: ['complex', 'enterprise', 'compliance', 'stakeholder', 'deliverable'],
  },
  authoritative: {
    preferred: ['proven', 'leading', 'trusted', 'established', 'definitive', 'expert'],
    avoided: ['maybe', 'try', 'sort of', 'kind of', 'basically', 'literally'],
  },
  empathetic: {
    preferred: ['understand', 'care', 'support', 'journey', 'feel', 'listen'],
    avoided: ['unfortunately', 'problem', 'issue', 'failure', 'impossible', 'can not'],
  },
  inspirational: {
    preferred: ['vision', 'transform', 'empower', 'achieve', 'future', 'possibility'],
    avoided: ['limit', 'restrict', 'constraint', 'barrier', 'obstacle', 'problem'],
  },
  minimalist: {
    preferred: ['clear', 'simple', 'focus', 'essential', 'clean', 'direct'],
    avoided: ['comprehensive', 'extensive', 'numerous', 'various', 'multiple', 'several'],
  },
  bold: {
    preferred: ['disrupt', 'revolutionize', 'breakthrough', 'fearless', 'unstoppable', 'define'],
    avoided: ['traditional', 'conventional', 'standard', 'typical', 'normal', 'ordinary'],
  },
};

const TONE_PERSONALITY: Record<BrandVoiceTone, string[]> = {
  professional: ['Precise', 'Credible', 'Reliable', 'Authoritative', 'Clear'],
  friendly: ['Warm', 'Approachable', 'Supportive', 'Human', 'Genuine'],
  playful: ['Energetic', 'Creative', 'Witty', 'Curious', 'Enthusiastic'],
  authoritative: ['Expert', 'Confident', 'Definitive', 'Trustworthy', 'Knowledgeable'],
  empathetic: ['Understanding', 'Compassionate', 'Supportive', 'Attentive', 'Inclusive'],
  inspirational: ['Visionary', 'Motivating', 'Uplifting', 'Ambitious', 'Forward-thinking'],
  minimalist: ['Focused', 'Elegant', 'Intentional', 'Refined', 'Essential'],
  bold: ['Daring', 'Disruptive', 'Passionate', 'Unconventional', 'Fierce'],
};

const SENTENCE_STYLE: Record<BrandVoiceTone, BrandVoiceGuidelines['sentenceStyle']> = {
  professional: { averageLength: 'medium', structure: 'varied' },
  friendly: { averageLength: 'short', structure: 'simple' },
  playful: { averageLength: 'short', structure: 'varied' },
  authoritative: { averageLength: 'medium', structure: 'complex' },
  empathetic: { averageLength: 'short', structure: 'simple' },
  inspirational: { averageLength: 'medium', structure: 'varied' },
  minimalist: { averageLength: 'short', structure: 'simple' },
  bold: { averageLength: 'short', structure: 'simple' },
};

function inferTone(brand: BrandIdentity): BrandVoiceTone {
  const styleToTone: Record<string, BrandVoiceTone> = {
    minimal: 'minimalist',
    bold: 'bold',
    elegant: 'professional',
    playful: 'playful',
    corporate: 'authoritative',
    tech: 'professional',
    organic: 'empathetic',
    retro: 'friendly',
  };
  return styleToTone[brand.style] ?? 'professional';
}

function inferAudience(brand: BrandIdentity): BrandVoiceAudience {
  const industry = brand.industry.toLowerCase();
  if (
    industry.includes('enterprise') ||
    industry.includes('b2b') ||
    industry.includes('consulting')
  ) {
    return 'enterprise';
  }
  if (industry.includes('startup') || industry.includes('venture')) {
    return 'startup';
  }
  if (industry.includes('creative') || industry.includes('design') || industry.includes('art')) {
    return 'creative';
  }
  if (
    industry.includes('retail') ||
    industry.includes('consumer') ||
    industry.includes('ecommerce')
  ) {
    return 'consumer';
  }
  if (industry.includes('tech') || industry.includes('software') || industry.includes('saas')) {
    return 'technical';
  }
  return 'general';
}

function generateTaglines(brand: BrandIdentity, tone: BrandVoiceTone): string[] {
  const name = brand.name;
  const industry = brand.industry;

  const templates: Record<BrandVoiceTone, string[]> = {
    professional: [
      `${name}. Excellence in ${industry}.`,
      `Delivering ${industry} solutions that matter.`,
      `Where ${industry} expertise meets results.`,
    ],
    friendly: [
      `${name}. Here to help.`,
      `Making ${industry} easy for everyone.`,
      `Your ${industry} partner, always.`,
    ],
    playful: [
      `${name}. Let's have fun with ${industry}!`,
      `${industry} made joyful.`,
      `Discover the joy of ${industry} with ${name}.`,
    ],
    authoritative: [
      `${name}. The ${industry} authority.`,
      `Leading ${industry} innovation since day one.`,
      `The trusted name in ${industry}.`,
    ],
    empathetic: [
      `${name}. We understand ${industry}.`,
      `${industry} designed around you.`,
      `Your journey. Our ${industry} expertise.`,
    ],
    inspirational: [
      `${name}. Transform your ${industry}.`,
      `Empowering ${industry} leaders everywhere.`,
      `The future of ${industry} starts here.`,
    ],
    minimalist: [
      `${name}. ${industry}. Simplified.`,
      `Less complexity. More ${industry}.`,
      `${industry} distilled.`,
    ],
    bold: [
      `${name}. Redefining ${industry}.`,
      `${industry} will never be the same.`,
      `Break the rules of ${industry}.`,
    ],
  };

  return templates[tone];
}

function generateSampleCopy(
  brand: BrandIdentity,
  tone: BrandVoiceTone,
  audience: BrandVoiceAudience
): BrandVoiceGuidelines['sampleCopy'] {
  const { name, industry } = brand;

  const audiencePhrases: Record<BrandVoiceAudience, string> = {
    b2b: 'businesses',
    b2c: 'customers',
    enterprise: 'enterprise teams',
    startup: 'startups',
    consumer: 'people',
    technical: 'developers',
    creative: 'creators',
    general: 'everyone',
  };
  const target = audiencePhrases[audience];

  const copies: Record<BrandVoiceTone, BrandVoiceGuidelines['sampleCopy']> = {
    professional: {
      headline: `Elevate Your ${industry} Strategy`,
      subheadline: `${name} delivers professional-grade ${industry} solutions tailored for ${target} who demand excellence.`,
      cta: `Start Your Journey`,
      aboutUs: `${name} is a leading ${industry} company dedicated to helping ${target} achieve measurable results through proven expertise and innovative thinking.`,
    },
    friendly: {
      headline: `${industry} Made Simple`,
      subheadline: `We're here to help ${target} navigate ${industry} with ease. No jargon, just real support.`,
      cta: `Let's Get Started`,
      aboutUs: `Hey there! We're ${name}, a friendly team passionate about making ${industry} accessible to ${target}. We're in your corner every step of the way.`,
    },
    playful: {
      headline: `Let's Do ${industry} Differently!`,
      subheadline: `${name} brings fun and creativity to ${industry} for ${target} who love to explore.`,
      cta: `Join the Adventure`,
      aboutUs: `We're ${name} — a bunch of passionate ${industry} enthusiasts who believe ${target} deserve a joyful, exciting experience. Buckle up!`,
    },
    authoritative: {
      headline: `The Industry Standard in ${industry}`,
      subheadline: `Trusted by ${target} worldwide, ${name} sets the benchmark for ${industry} excellence.`,
      cta: `Explore Our Expertise`,
      aboutUs: `${name} is the recognized authority in ${industry}, providing ${target} with definitive solutions backed by decades of expertise and research.`,
    },
    empathetic: {
      headline: `We Get ${industry}. We Get You.`,
      subheadline: `${name} listens first. We design ${industry} solutions that truly work for ${target}.`,
      cta: `Let's Talk`,
      aboutUs: `${name} was built with empathy at its core. We understand the challenges ${target} face in ${industry} and create solutions that genuinely address your needs.`,
    },
    inspirational: {
      headline: `Transform Your ${industry} Future`,
      subheadline: `${name} empowers ${target} to achieve what others call impossible in ${industry}.`,
      cta: `Start Transforming`,
      aboutUs: `${name} exists to inspire and empower ${target}. We believe the future of ${industry} belongs to those bold enough to reimagine it.`,
    },
    minimalist: {
      headline: `${industry}. Simplified.`,
      subheadline: `${name} gives ${target} exactly what they need. Nothing more.`,
      cta: `See How`,
      aboutUs: `${name}. We do ${industry} well. That's it.`,
    },
    bold: {
      headline: `Redefine ${industry}`,
      subheadline: `${name} is for ${target} who refuse to settle. We don't follow ${industry} trends — we set them.`,
      cta: `Make Your Move`,
      aboutUs: `${name} is not your average ${industry} company. We challenge conventions, break boundaries, and help ${target} achieve the extraordinary.`,
    },
  };

  return copies[tone];
}

function generateDoAndDont(tone: BrandVoiceTone): BrandVoiceGuidelines['doAndDont'] {
  const rules: Record<BrandVoiceTone, BrandVoiceGuidelines['doAndDont']> = {
    professional: {
      do: [
        'Use precise, industry-specific language',
        'Back claims with data and evidence',
        'Maintain formal but approachable tone',
        'Focus on outcomes and value delivered',
      ],
      dont: [
        'Use slang or overly casual language',
        'Make unsubstantiated claims',
        'Be condescending or overly formal',
        'Bury the key message in jargon',
      ],
    },
    friendly: {
      do: [
        'Use conversational, warm language',
        'Address the reader directly with "you"',
        'Acknowledge challenges with empathy',
        'Keep sentences short and clear',
      ],
      dont: [
        'Use corporate buzzwords',
        'Sound scripted or robotic',
        'Ignore the human element',
        'Be overly promotional',
      ],
    },
    playful: {
      do: [
        'Use wordplay and light humor',
        'Embrace exclamation and energy',
        'Tell stories and use vivid imagery',
        'Invite participation and interaction',
      ],
      dont: [
        'Be sarcastic or mean-spirited',
        'Use humor that alienates people',
        'Let playfulness undermine credibility',
        'Overdo the exclamation marks',
      ],
    },
    authoritative: {
      do: [
        'Lead with expertise and credentials',
        'Use definitive statements confidently',
        'Reference data, research, and results',
        'Establish thought leadership',
      ],
      dont: [
        'Hedge or use uncertain language',
        'Over-explain obvious concepts',
        'Sound arrogant or dismissive',
        'Use passive voice excessively',
      ],
    },
    empathetic: {
      do: [
        "Acknowledge the reader's feelings",
        'Use inclusive, supportive language',
        'Frame problems as shared challenges',
        'Offer reassurance and solutions',
      ],
      dont: [
        'Dismiss or minimize concerns',
        'Use clinical or detached language',
        'Focus only on features, not feelings',
        'Promise more than you can deliver',
      ],
    },
    inspirational: {
      do: [
        'Paint a compelling vision of the future',
        'Use strong action verbs',
        'Connect to purpose and meaning',
        'Celebrate achievements and progress',
      ],
      dont: [
        'Be vague or abstract without direction',
        'Use clichés without substance',
        'Overpromise without grounding',
        'Ignore the practical path forward',
      ],
    },
    minimalist: {
      do: [
        'Choose every word deliberately',
        'Eliminate redundancy ruthlessly',
        'Let white space do the work',
        'Say one thing at a time',
      ],
      dont: [
        'Pad copy with filler words',
        'Use three words when one will do',
        'Add unnecessary qualifiers',
        'Over-explain the obvious',
      ],
    },
    bold: {
      do: [
        'Make confident, direct statements',
        'Challenge conventional thinking',
        'Use strong, active language',
        'Stand for something specific',
      ],
      dont: [
        'Be aggressive or offensive',
        'Alienate potential customers',
        'Sacrifice clarity for impact',
        'Make claims you cannot back up',
      ],
    },
  };

  return rules[tone];
}

export function generateBrandVoice(
  brand: BrandIdentity,
  overrideTone?: BrandVoiceTone,
  overrideAudience?: BrandVoiceAudience
): BrandVoiceGuidelines {
  const tone = overrideTone ?? inferTone(brand);
  const audience = overrideAudience ?? inferAudience(brand);
  const vocab = TONE_VOCABULARY[tone];

  return {
    tone,
    audience,
    vocabulary: {
      preferred: vocab.preferred,
      avoided: vocab.avoided,
    },
    sentenceStyle: SENTENCE_STYLE[tone],
    personality: TONE_PERSONALITY[tone],
    taglineSuggestions: generateTaglines(brand, tone),
    sampleCopy: generateSampleCopy(brand, tone, audience),
    doAndDont: generateDoAndDont(tone),
  };
}
