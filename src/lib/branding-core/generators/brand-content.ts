import type {
  BrandIdentity,
  BrandStyle,
  BrandContentOutput,
  ContentPillarItem,
  ContentCalendarWeekItem,
} from '../../types.js';

const STYLE_TONE: Record<BrandStyle, string> = {
  minimal: 'clear, concise, and purposeful — no fluff',
  bold: 'confident, energetic, and direct — lead with impact',
  elegant: 'refined, thoughtful, and sophisticated',
  playful: 'fun, conversational, and approachable',
  corporate: 'professional, authoritative, and trustworthy',
  tech: 'precise, insightful, and innovation-focused',
  organic: 'warm, authentic, and community-driven',
  retro: 'nostalgic, character-rich, and story-driven',
};

const STYLE_CONTENT_TYPES: Record<BrandStyle, string[]> = {
  minimal: ['long-form articles', 'case studies', 'white papers', 'documentation'],
  bold: ['op-eds', 'trend reports', 'video scripts', 'manifestos'],
  elegant: ['editorial features', 'brand stories', 'curated guides', 'thought leadership'],
  playful: ['listicles', 'how-to guides', 'quizzes', 'social stories', 'behind-the-scenes'],
  corporate: ['press releases', 'industry reports', 'executive commentary', 'investor updates'],
  tech: ['technical tutorials', 'API docs', 'developer blogs', 'product changelogs'],
  organic: [
    'origin stories',
    'community spotlights',
    'sustainability reports',
    'recipes/DIY guides',
  ],
  retro: ['heritage stories', 'collector guides', 'photo essays', 'anniversary content'],
};

const STYLE_HEADLINE_PATTERN: Record<BrandStyle, string> = {
  minimal: 'Direct, factual — "How [Brand] solves [Problem]"',
  bold: 'Power statement — "The Only [Category] That [Bold Claim]"',
  elegant: 'Aspirational — "The Art of [Topic]: A [Brand] Guide"',
  playful: 'Question or pun — "Ever wondered why [Fun Hook]?"',
  corporate: 'Value-led — "[Number] Ways [Brand] Delivers [Benefit]"',
  tech: 'How-to/deep dive — "How to [Technical Task] with [Brand]"',
  organic: 'Story-first — "Meet the [Person/Place] Behind [Product]"',
  retro: 'Nostalgic — "Why [Retro Reference] Still Matters Today"',
};

const STYLE_CADENCE: Record<BrandStyle, { blog: string; social: string; newsletter: string }> = {
  minimal: {
    blog: '2x/month (quality over quantity)',
    social: '3-4x/week',
    newsletter: 'Monthly digest',
  },
  bold: { blog: '4x/month', social: 'Daily', newsletter: 'Weekly spotlight' },
  elegant: { blog: '2x/month (curated)', social: '3x/week', newsletter: 'Bi-weekly editorial' },
  playful: { blog: '6x/month', social: 'Daily + stories', newsletter: 'Weekly fun roundup' },
  corporate: { blog: '4x/month', social: '5x/week', newsletter: 'Weekly industry brief' },
  tech: {
    blog: '4-6x/month (tutorials/changelogs)',
    social: 'Daily (Twitter/LinkedIn)',
    newsletter: 'Weekly product update',
  },
  organic: {
    blog: '4x/month',
    social: '4x/week + stories',
    newsletter: 'Bi-weekly community letter',
  },
  retro: { blog: '2-3x/month', social: '3x/week', newsletter: 'Monthly collector note' },
};

const STYLE_SEO_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Long-tail, high-intent keywords; pillar + cluster architecture',
  bold: 'Brand terms + category leadership keywords; opinion-driven content for links',
  elegant: 'Aspirational and lifestyle keywords; editorial linking strategy',
  playful: 'Question-based keywords; listicle and "best of" formats for discovery',
  corporate: 'Industry keywords + executive thought-leadership; PR-driven authority',
  tech: 'Developer-intent keywords; docs and tutorials for organic traffic; GitHub/Stack Overflow presence',
  organic: 'Values-led keywords (sustainable, ethical, local); community search terms',
  retro: 'Niche collector keywords; nostalgia + era-based search terms',
};

function buildContentCalendar(brand: BrandIdentity): ContentCalendarWeekItem[] {
  const style = brand.style ?? 'minimal';
  const types = STYLE_CONTENT_TYPES[style] ?? STYLE_CONTENT_TYPES.minimal;
  const industry = brand.industry ?? 'general';

  const themes = [
    `${brand.name} origin story`,
    `${industry} trends & insights`,
    `How ${brand.name} solves [key pain point]`,
    `Community spotlight / customer success`,
  ];

  return themes.map((theme, i) => ({
    week: i + 1,
    theme,
    formats: types.slice(0, 2 + (i % 2)),
  }));
}

function buildContentPillars(brand: BrandIdentity): ContentPillarItem[] {
  const style = brand.style ?? 'minimal';
  const industry = brand.industry ?? 'general';
  const types = STYLE_CONTENT_TYPES[style] ?? STYLE_CONTENT_TYPES.minimal;

  return [
    {
      name: 'Brand Story',
      purpose: 'Build emotional connection and brand awareness',
      topics: [
        `${brand.name} founding story`,
        'team culture',
        'mission & values',
        `why ${industry}`,
      ],
      formats: types.slice(0, 2),
    },
    {
      name: 'Education & Expertise',
      purpose: 'Establish authority and provide genuine value',
      topics: [
        `${industry} best practices`,
        'how-to guides',
        'expert interviews',
        'industry trends',
      ],
      formats: types.slice(1, 3),
    },
    {
      name: 'Product / Service Spotlight',
      purpose: 'Drive consideration and conversion',
      topics: ['feature deep-dives', 'use cases', 'before & after', 'comparison guides'],
      formats: [types[0] ?? 'articles', 'video', 'infographics'],
    },
    {
      name: 'Community & Social Proof',
      purpose: 'Build trust and encourage advocacy',
      topics: ['customer stories', 'testimonials', 'user-generated content', 'partnerships'],
      formats: ['case studies', 'social posts', 'newsletter features'],
    },
  ];
}

function buildEditorialGuidelines(brand: BrandIdentity): Record<string, string> {
  const style = brand.style ?? 'minimal';

  return {
    tone: STYLE_TONE[style] ?? STYLE_TONE.minimal,
    perspective:
      style === 'corporate'
        ? 'Third person for formal content; first person plural for brand voice'
        : 'First person (we/our) for brand; second person (you/your) for audience',
    sentences:
      style === 'minimal' || style === 'tech'
        ? 'Short to medium; favour active voice; avoid jargon'
        : style === 'elegant'
          ? 'Varied length; longer sentences for rhythm; literary quality'
          : 'Conversational; varied length; direct',
    paragraphs:
      style === 'minimal'
        ? '1-3 sentences; white space is intentional'
        : '3-5 sentences; clear topic focus',
    headings:
      style === 'tech'
        ? 'Descriptive and keyword-rich; H2 every 300 words'
        : 'Engaging and scannable; H2/H3 hierarchy',
    callToAction:
      style === 'playful'
        ? 'Friendly invitations — "Let\'s go!" "Join the fun!"'
        : style === 'bold'
          ? 'Direct commands — "Get started" "See how"'
          : 'Clear value propositions — "Discover [benefit]" "Start your journey"',
    avoiding: [
      'Excessive jargon or acronyms without explanation',
      'Passive voice unless deliberate',
      'Clickbait headlines that underdeliver',
      style === 'corporate'
        ? 'Slang and informal contractions'
        : 'Overly formal or stuffy language',
    ].join('; '),
  };
}

function buildDistributionStrategy(brand: BrandIdentity): Record<string, string> {
  const style = brand.style ?? 'minimal';
  const cadence = STYLE_CADENCE[style] ?? STYLE_CADENCE.minimal;

  return {
    blog_cadence: cadence.blog,
    social_cadence: cadence.social,
    newsletter_cadence: cadence.newsletter,
    primary_channels:
      style === 'tech'
        ? 'Developer blog, GitHub, LinkedIn, Twitter/X'
        : style === 'corporate'
          ? 'LinkedIn, company blog, press distribution'
          : style === 'organic'
            ? 'Instagram, blog, email newsletter, farmers market / community boards'
            : 'Blog, social media, email newsletter',
    content_repurposing:
      'Long-form blog → social snippets → newsletter feature → short video clips',
    amplification:
      style === 'bold' || style === 'tech'
        ? 'Paid promotion for top-performing content; influencer seeding'
        : 'Organic sharing; partner cross-promotion; email amplification',
  };
}

function buildBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const tone = STYLE_TONE[style] ?? STYLE_TONE.minimal;
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return `${brand.name}${taglinePart} content strategy: ${tone}. Publish across ${(STYLE_CONTENT_TYPES[style] ?? STYLE_CONTENT_TYPES.minimal).slice(0, 2).join(' and ')}, with focus on ${(STYLE_CADENCE[style] ?? STYLE_CADENCE.minimal).blog} cadence. SEO approach: ${(STYLE_SEO_APPROACH[style] ?? STYLE_SEO_APPROACH.minimal).split(';')[0]}.`;
}

export function generateBrandContent(brand: BrandIdentity): BrandContentOutput {
  const style = brand.style ?? 'minimal';

  return {
    editorialTone: STYLE_TONE[style] ?? STYLE_TONE.minimal,
    contentTypes: STYLE_CONTENT_TYPES[style] ?? STYLE_CONTENT_TYPES.minimal,
    headlinePattern: STYLE_HEADLINE_PATTERN[style] ?? STYLE_HEADLINE_PATTERN.minimal,
    seoApproach: STYLE_SEO_APPROACH[style] ?? STYLE_SEO_APPROACH.minimal,
    contentPillars: buildContentPillars(brand),
    editorialGuidelines: buildEditorialGuidelines(brand),
    distributionStrategy: buildDistributionStrategy(brand),
    contentCalendar: buildContentCalendar(brand),
    contentBriefSummary: buildBriefSummary(brand),
  };
}
