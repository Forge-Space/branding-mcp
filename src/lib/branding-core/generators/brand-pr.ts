import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandPrOutput, PressRelease, MediaContact } from '../../types.js';

const STYLE_PR_APPROACH: Record<BrandStyle, string> = {
  minimal:
    'Understated and data-driven; let results speak. Avoid hyperbole and focus on proof points.',
  bold: 'Loud, confident announcements that command attention. Lead with impact and transformation.',
  elegant: 'Refined, selective outreach to premium outlets. Quality over quantity in placements.',
  playful: 'Quirky pitches with personality; lean into fun angles and community-driven stories.',
  corporate:
    'Measured, authoritative communications aligned with investor and regulatory standards.',
  tech: 'Technical credibility first; target developer and engineering media alongside business press.',
  organic: 'Authentic storytelling rooted in mission, sustainability, and community impact.',
  retro: 'Nostalgic narrative with heritage angles; lean into craftsmanship and timeless quality.',
};

const STYLE_SPOKESPERSON_TRAITS: Record<BrandStyle, string[]> = {
  minimal: ['calm', 'precise', 'data-informed', 'avoids filler language'],
  bold: ['energetic', 'visionary', 'quotable', 'uses strong declarative statements'],
  elegant: ['poised', 'articulate', 'unhurried', 'uses refined vocabulary'],
  playful: ['witty', 'warm', 'self-aware', 'comfortable with humour'],
  corporate: ['authoritative', 'measured', 'reassuring', 'compliance-aware'],
  tech: ['technical credibility', 'jargon-aware', 'evidence-based', 'thought-leader positioning'],
  organic: ['genuine', 'mission-driven', 'community-centred', 'transparent about process'],
  retro: ['storyteller', 'nostalgic', 'craftsmanship-focused', 'heritage-proud'],
};

const STYLE_MEDIA_ANGLES: Record<BrandStyle, string[]> = {
  minimal: [
    'Efficiency study: how simplicity drives measurable outcomes',
    'Data story: the numbers behind our approach',
    'Design philosophy: why less is more in our category',
  ],
  bold: [
    'Market disruption: how we are rewriting the rules',
    'Founder vision: the audacious bet that paid off',
    'Category creation: building the market we want to lead',
  ],
  elegant: [
    'Craft and heritage: the artisans behind the brand',
    'Exclusivity story: why scarcity creates meaning',
    'Lifestyle feature: the world our customers inhabit',
  ],
  playful: [
    'Community moment: the viral campaign that united fans',
    'Behind-the-scenes: the creative team having too much fun',
    'Product origin: the accidental idea that became a movement',
  ],
  corporate: [
    'Leadership profile: the executive shaping the industry',
    'Market analysis: our perspective on where the sector is heading',
    'Responsibility report: our commitments and progress',
  ],
  tech: [
    'Engineering deep-dive: the innovation under the hood',
    'Open-source contribution: giving back to the developer community',
    'Performance benchmark: why our stack outperforms the competition',
  ],
  organic: [
    'Origin story: from farm to shelf, our supply chain',
    'Sustainability milestone: the environmental win worth celebrating',
    'Community partnership: the local initiative we are proud to support',
  ],
  retro: [
    'Heritage feature: 50 years of craft and counting',
    'Revival story: why classic quality is making a comeback',
    'Collector community: the fans keeping tradition alive',
  ],
};

const STYLE_CRISIS_TONE: Record<BrandStyle, string> = {
  minimal:
    'Acknowledge facts clearly; avoid speculation; commit to transparency with a specific timeline.',
  bold: 'Own the mistake boldly; announce the fix with equal energy; show you are stronger for it.',
  elegant:
    'Issue a carefully worded statement through select channels; protect brand dignity throughout.',
  playful:
    'Be human and honest; use plain language; avoid corporate-speak that feels at odds with brand voice.',
  corporate:
    'Escalate to legal and compliance review; follow established crisis protocol; protect stakeholders.',
  tech: 'Provide a technical post-mortem; be transparent about root cause and remediation steps.',
  organic: 'Lead with values; centre the affected community; outline concrete restorative actions.',
  retro:
    'Acknowledge with humility; reference your heritage of quality; commit to making it right.',
};

const STYLE_HEADLINE_FORMULA: Record<BrandStyle, string> = {
  minimal: '[Brand] Reports [Metric] Improvement Following [Initiative]',
  bold: '[Brand] Disrupts [Category] With [Innovation] — [Bold Claim]',
  elegant: '[Brand] Introduces [Product/Service] for the Discerning [Audience]',
  playful: '[Brand] Just Did the Thing Everyone Wished [Category] Would Do',
  corporate: '[Brand] Announces [Initiative] to Advance [Strategic Goal]',
  tech: '[Brand] Releases [Product/Feature] That Solves [Technical Problem] for [Developer Audience]',
  organic: '[Brand] Reaches [Milestone] on Its Journey to [Mission Outcome]',
  retro: '[Brand] Revives [Heritage Element] for a New Generation',
};

function buildPressReleases(brand: BrandIdentity): PressRelease[] {
  const style = brand.style ?? 'minimal';
  const headline = STYLE_HEADLINE_FORMULA[style] ?? STYLE_HEADLINE_FORMULA.minimal;
  const currentYear = new Date().getFullYear();

  return [
    {
      type: 'product_launch',
      headline: headline.replace('[Brand]', brand.name),
      subheadline: `${brand.name} brings a new perspective to ${brand.industry}`,
      dateline: `${brand.name.toUpperCase()}, ${currentYear}`,
      boilerplate: `About ${brand.name}: ${brand.tagline ?? `${brand.name} is a ${brand.industry} brand built to ${brand.style} standards.`}`,
      quoteGuidance: `CEO or founder quote emphasising ${STYLE_SPOKESPERSON_TRAITS[style]?.[0] ?? 'vision'} and the problem being solved.`,
      callToAction: `For more information visit [website] or contact [press@${brand.name.toLowerCase().replace(/\s+/g, '')}.com]`,
    },
    {
      type: 'milestone',
      headline: `${brand.name} Achieves [Key Milestone] in ${brand.industry}`,
      subheadline: `Continued growth underscores demand for ${brand.style} approach in the category`,
      dateline: `${brand.name.toUpperCase()}, ${currentYear}`,
      boilerplate: `About ${brand.name}: ${brand.tagline ?? `${brand.name} is a ${brand.industry} brand built to ${brand.style} standards.`}`,
      quoteGuidance:
        'Milestone quote from founder or CEO; include a specific number or proof point.',
      callToAction: `Media enquiries: press@${brand.name.toLowerCase().replace(/\s+/g, '')}.com`,
    },
    {
      type: 'partnership',
      headline: `${brand.name} Partners With [Partner Brand] to [Joint Outcome]`,
      subheadline: 'Strategic collaboration expands reach and deepens category leadership',
      dateline: `${brand.name.toUpperCase()}, ${currentYear}`,
      boilerplate: `About ${brand.name}: ${brand.tagline ?? `${brand.name} is a ${brand.industry} brand built to ${brand.style} standards.`}`,
      quoteGuidance: 'One quote from each brand; align on shared values and the customer benefit.',
      callToAction: `Combined press kit available at [URL]. Contact: press@${brand.name.toLowerCase().replace(/\s+/g, '')}.com`,
    },
  ];
}

function buildMediaContacts(brand: BrandStyle): MediaContact[] {
  const outlets: Record<BrandStyle, MediaContact[]> = {
    minimal: [
      {
        tier: 'Tier 1',
        outlet: 'Business press (FT, WSJ, Bloomberg)',
        angle: 'Operational efficiency story',
        preferredFormat: 'Data-led feature or executive interview',
      },
      {
        tier: 'Tier 2',
        outlet: "Design media (Dezeen, It's Nice That, PRINT)",
        angle: 'Design philosophy and aesthetic rationale',
        preferredFormat: 'Visual case study',
      },
    ],
    bold: [
      {
        tier: 'Tier 1',
        outlet: 'Tech and startup media (TechCrunch, Wired, Fast Company)',
        angle: 'Disruption and market-shifting narrative',
        preferredFormat: 'Exclusive founder profile',
      },
      {
        tier: 'Tier 2',
        outlet: 'Social-first outlets (Vox, The Verge, Vice)',
        angle: 'Cultural impact and community story',
        preferredFormat: 'Short-form video or podcast',
      },
    ],
    elegant: [
      {
        tier: 'Tier 1',
        outlet: 'Luxury press (Vogue Business, Robb Report, Monocle)',
        angle: 'Heritage, craft, and exclusivity',
        preferredFormat: 'Editorial feature with high-end photography',
      },
      {
        tier: 'Tier 2',
        outlet: 'Lifestyle media (Condé Nast, Hearst titles)',
        angle: 'Aspirational lifestyle placement',
        preferredFormat: 'Product mention or brand feature',
      },
    ],
    playful: [
      {
        tier: 'Tier 1',
        outlet: 'Culture and entertainment media (BuzzFeed, PopSugar, Complex)',
        angle: 'Viral moment or community story',
        preferredFormat: 'Listicle, quiz, or social-native content',
      },
      {
        tier: 'Tier 2',
        outlet: 'Trade and niche media',
        angle: 'Category innovation with personality',
        preferredFormat: 'Brand interview or behind-the-scenes feature',
      },
    ],
    corporate: [
      {
        tier: 'Tier 1',
        outlet: 'Business press (Reuters, AP, Bloomberg)',
        angle: 'Executive leadership and strategic direction',
        preferredFormat: 'Press release with embargo and briefings',
      },
      {
        tier: 'Tier 2',
        outlet: 'Trade and industry publications',
        angle: 'Sector trends and regulatory compliance',
        preferredFormat: 'Op-ed or bylined article',
      },
    ],
    tech: [
      {
        tier: 'Tier 1',
        outlet: 'Developer and tech media (Hacker News, TechCrunch, The Register)',
        angle: 'Engineering innovation and open-source contribution',
        preferredFormat: 'Technical blog post or deep-dive feature',
      },
      {
        tier: 'Tier 2',
        outlet: 'Business tech media (ZDNet, VentureBeat, InfoWorld)',
        angle: 'Enterprise value and ROI story',
        preferredFormat: 'Case study or analyst briefing',
      },
    ],
    organic: [
      {
        tier: 'Tier 1',
        outlet:
          'Sustainability and conscious media (Eco-Business, Green Biz, Guardian Sustainability)',
        angle: 'Environmental milestone or supply chain transparency',
        preferredFormat: 'Long-form impact story',
      },
      {
        tier: 'Tier 2',
        outlet: 'Lifestyle and wellness press (MindBodyGreen, Well+Good)',
        angle: 'Health, nature, and community benefit',
        preferredFormat: 'Brand profile or product feature',
      },
    ],
    retro: [
      {
        tier: 'Tier 1',
        outlet: 'Heritage and culture media (Kinfolk, Cereal, Delayed Gratification)',
        angle: 'Craft revival and timeless quality story',
        preferredFormat: 'Long-form photographic feature',
      },
      {
        tier: 'Tier 2',
        outlet: 'Trade and collector press',
        angle: 'Specialist audience and connoisseur angle',
        preferredFormat: 'Exclusive collector interview or product review',
      },
    ],
  };
  return outlets[brand] ?? outlets.minimal;
}

function buildMediaKitContents(brand: BrandIdentity): string[] {
  return [
    `${brand.name} brand overview (one-pager)`,
    'High-resolution logo files (SVG, PNG on light and dark backgrounds)',
    `Brand colour palette (hex, RGB, CMYK, Pantone)`,
    `Founder/CEO biography and approved headshot`,
    `Product/service photography (minimum 5 editorial-quality images)`,
    `Key facts and figures sheet`,
    `Recent press releases (last 12 months)`,
    `${brand.name} brand story (300-word narrative)`,
    'Approved brand boilerplate (100 words)',
    'Press contact details and response-time commitment',
  ];
}

function buildSpokespeople(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const traits = STYLE_SPOKESPERSON_TRAITS[style] ?? STYLE_SPOKESPERSON_TRAITS.minimal;
  return [
    `CEO/Founder — primary spokesperson for vision, strategy, and milestone announcements`,
    `Head of Communications or PR Lead — day-to-day media queries and relationship management`,
    `Subject-matter expert (product, technology, or sustainability lead) — technical and specialist interviews`,
    `Key traits all spokespeople should embody: ${traits.join(', ')}`,
    `Bridging technique: always return to brand narrative with "What that means for our customers is…"`,
    `Avoid speculation; redirect to proven proof points and committed timelines`,
  ];
}

function buildCrisisProtocol(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  return [
    `Holding statement ready within 2 hours of incident identification`,
    `Tone guidance: ${STYLE_CRISIS_TONE[style] ?? STYLE_CRISIS_TONE.minimal}`,
    `Escalation path: PR Lead → Head of Communications → CEO → Legal`,
    `Designated single spokesperson — no off-script commentary from other team members`,
    `Dark-site landing page prepared in advance for major incidents`,
    `Statement distribution: owned channels first, then wire service, then proactive journalist outreach`,
    `Post-crisis review within 5 business days; publish learnings where appropriate`,
  ];
}

function buildPrBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const approach = STYLE_PR_APPROACH[style] ?? STYLE_PR_APPROACH.minimal;
  return (
    `${brand.name}${brand.tagline ? ` — "${brand.tagline}"` : ''} is a ${brand.industry} brand with a ${brand.style} identity. ` +
    `PR approach: ${approach} ` +
    `Target media tiers reflect the brand's positioning in ${brand.industry}. ` +
    `All communications should reinforce brand values while maintaining credibility and trust with key stakeholders.`
  );
}

export function generateBrandPr(brand: BrandIdentity): BrandPrOutput {
  const style = brand.style ?? 'minimal';

  return {
    prApproach: STYLE_PR_APPROACH[style] ?? STYLE_PR_APPROACH.minimal,
    mediaAngles: STYLE_MEDIA_ANGLES[style] ?? STYLE_MEDIA_ANGLES.minimal,
    headlineFormula: STYLE_HEADLINE_FORMULA[style] ?? STYLE_HEADLINE_FORMULA.minimal,
    pressReleases: buildPressReleases(brand),
    mediaContacts: buildMediaContacts(style),
    mediaKitContents: buildMediaKitContents(brand),
    spokespeople: buildSpokespeople(brand),
    crisisProtocol: buildCrisisProtocol(brand),
    embargoPractices: [
      'Embargo period: 48-72 hours for major announcements; 24 hours for product launches',
      'Embargo breach policy: immediate recall and rescheduled exclusives',
      'Embargo list: trusted Tier 1 contacts with proven track record only',
      'Confirmation required in writing before embargo materials are shared',
    ],
    measurementKpis: [
      'Share of voice vs. top 3 competitors (monthly)',
      'Tier 1 placements per quarter',
      'Message pull-through rate (% of coverage including key messages)',
      'Spokesperson sentiment score',
      'Earned media value (EMV) vs. paid equivalency',
      'Response time to media queries (target: < 4 hours)',
    ],
    prBriefSummary: buildPrBriefSummary(brand),
  };
}
