import type {
  BrandIdentity,
  BrandStyle,
  BrandCompetitiveOutput,
  CompetitorProfile,
  PositioningAxis,
  WinLossTheme,
} from '../../types.js';

// ------- per-style maps -------

const STYLE_POSITIONING_APPROACH: Record<BrandStyle, string> = {
  minimal:
    'Clarity-led positioning — win on simplicity, focus, and precision where others over-engineer.',
  bold: 'Impact-led positioning — dominate attention, energy, and momentum in every category interaction.',
  elegant:
    'Premium positioning — command a price premium through craft, heritage, and sensory superiority.',
  playful:
    'Personality-led positioning — win hearts with humor, delight, and human warmth competitors lack.',
  corporate:
    'Trust-led positioning — differentiate through reliability, governance, and enterprise-grade assurance.',
  tech: 'Innovation-led positioning — own the future narrative with developer credibility and technical depth.',
  organic:
    'Values-led positioning — attract conscious consumers through authenticity, provenance, and purpose.',
  retro:
    'Nostalgia-led positioning — create an emotional moat through cultural memory and analog authenticity.',
};

const STYLE_COMPETITIVE_ADVANTAGE: Record<BrandStyle, string[]> = {
  minimal: [
    'Radical simplicity that removes friction competitors add',
    'Faster time-to-value with no-bloat product philosophy',
    'Premium pricing justified by clarity, not feature count',
  ],
  bold: [
    'Category-defining visual and verbal energy',
    'First-mover boldness in under-served market segments',
    'Magnetic employer brand that attracts top creative talent',
  ],
  elegant: [
    'Artisanal quality and materials sourcing that commands a premium',
    'Long-term brand equity through heritage narrative',
    'Luxury customer service rituals that become switching barriers',
  ],
  playful: [
    'Higher organic virality and word-of-mouth than serious competitors',
    'Community-driven product development with co-creation loops',
    'Lower customer acquisition cost through entertainment-led content',
  ],
  corporate: [
    'Enterprise compliance and security certifications competitors lack',
    'C-suite relationships and partnership networks built over decades',
    'SLA-backed reliability that risk-averse buyers require',
  ],
  tech: [
    'Developer-first go-to-market with open-source community leverage',
    'API-first architecture enabling ecosystem integrations at scale',
    'Proprietary data or model advantages that compound over time',
  ],
  organic: [
    'Verified supply-chain transparency that competitors cannot replicate quickly',
    'Loyal advocacy from values-aligned community segments',
    'ESG credentials enabling access to impact investment and government grants',
  ],
  retro: [
    'Emotional differentiation in a sea of generic digital-first brands',
    'Premium collector and enthusiast markets willing to pay scarcity premiums',
    'Cross-generational appeal bridging nostalgia buyers and irony-aware younger audiences',
  ],
};

const STYLE_BATTLECARD_TONE: Record<BrandStyle, string> = {
  minimal: 'Factual and direct — let the data speak.',
  bold: 'Confident and assertive — we own this space.',
  elegant: 'Refined and assured — our heritage speaks for itself.',
  playful: 'Light and witty — we win with charm, not aggression.',
  corporate: 'Professional and evidence-based — trust the process.',
  tech: 'Technical and credentialed — proof over promise.',
  organic: 'Honest and values-forward — transparency is our advantage.',
  retro: 'Nostalgic and proud — some things are worth preserving.',
};

const STYLE_MOAT_TYPE: Record<BrandStyle, string> = {
  minimal:
    'Product simplicity moat — competitors cannot out-simple us without losing features customers pay for.',
  bold: 'Brand energy moat — competitors cannot match cultural resonance without authentic identity shift.',
  elegant:
    'Heritage and craft moat — heritage cannot be manufactured; it must be earned over time.',
  playful:
    'Community and UGC moat — organic content flywheel compounds faster than paid media competitors.',
  corporate:
    'Enterprise trust moat — compliance certifications and C-suite relationships take years to build.',
  tech: 'Developer ecosystem moat — SDK adoption and integrations create deeply embedded switching costs.',
  organic:
    'Supply-chain transparency moat — third-party certifications and provenance take years to earn.',
  retro:
    'Cultural authenticity moat — genuine heritage cannot be copied without appearing inauthentic.',
};

// ------- builders -------

function buildCompetitorProfiles(brand: BrandIdentity): CompetitorProfile[] {
  const style = brand.style ?? 'minimal';
  const industry = brand.industry.toLowerCase();

  const archetypes: Array<{
    type: string;
    description: string;
    weakness: string;
    counterMessage: string;
  }> = [
    {
      type: 'Market Leader',
      description: 'Incumbent with high awareness, large budget, and broad feature set.',
      weakness: 'Slow to innovate, bloated UX, and poor personalisation at scale.',
      counterMessage: `${brand.name} moves faster, thinks deeper, and treats every customer as an individual.`,
    },
    {
      type: 'Low-Cost Challenger',
      description: 'Price-aggressive competitor targeting budget-conscious segments.',
      weakness: 'Compromised quality, weak support, and thin brand story.',
      counterMessage: `${brand.name} offers the total cost of ownership advantage — less rework, more value.`,
    },
    {
      type: 'Niche Specialist',
      description: `Deeply focused on a ${industry} sub-segment with strong community loyalty.`,
      weakness: 'Limited scale, narrow use-case coverage, and weak ecosystem.',
      counterMessage: `${brand.name} combines specialist depth with platform breadth — best of both worlds.`,
    },
    {
      type: 'New Entrant / Disruptor',
      description: 'VC-backed startup with aggressive growth targets and modern UX.',
      weakness: 'Unproven reliability, limited enterprise features, and nascent community.',
      counterMessage: `${brand.name} combines ${brand.style ?? 'innovative'} energy with the stability customers can count on.`,
    },
  ];

  return archetypes.map((a) => ({
    competitorType: a.type,
    description: a.description,
    theirStrengths: [
      `High brand recognition in ${industry}`,
      'Established distribution channels',
      'Large existing customer base',
    ],
    theirWeaknesses: [
      a.weakness,
      'Limited differentiation narrative',
      'Slower product iteration cycle',
    ],
    ourCounterMessage: a.counterMessage,
    winProbability:
      a.type === 'Low-Cost Challenger'
        ? 'High — value story wins'
        : a.type === 'New Entrant / Disruptor'
          ? 'Medium — speed and credibility race'
          : 'Medium — differentiation is key',
  }));
}

function buildPositioningMatrix(brand: BrandIdentity): PositioningAxis[] {
  return [
    {
      axis: 'Price vs. Value',
      ourPosition:
        'Premium value — higher price justified by superior outcomes and lower total cost of ownership.',
      competitorPosition: 'Commodity pricing or feature-bloat premium without clear ROI narrative.',
    },
    {
      axis: 'Simplicity vs. Complexity',
      ourPosition: `${brand.name} removes complexity; the experience is ${brand.style ?? 'clean'} by design.`,
      competitorPosition: 'Legacy complexity or feature-flag overload slowing user adoption.',
    },
    {
      axis: 'Brand Trust vs. Brand Awareness',
      ourPosition: 'Deep trust with a defined audience over broad but shallow awareness.',
      competitorPosition:
        'High awareness but declining trust due to past issues or generic messaging.',
    },
    {
      axis: 'Innovation Speed vs. Stability',
      ourPosition: 'Consistent innovation cadence with backward-compatible stability commitments.',
      competitorPosition:
        'Either too slow (market leader) or too unstable (disruptor) — rarely both.',
    },
  ];
}

function buildWinLossThemes(style: BrandStyle): WinLossTheme[] {
  const winThemes: Record<BrandStyle, string[]> = {
    minimal: [
      'Clean UX reduces onboarding time',
      'No-bloat philosophy reduces TCO',
      'Clear pricing model',
    ],
    bold: [
      'Brand energy attracts talent and customers simultaneously',
      'Category leadership narrative',
      'Campaign memorability',
    ],
    elegant: [
      'Craftsmanship signals premium intent',
      'Heritage validates price premium',
      'White-glove service rituals',
    ],
    playful: [
      'Community enthusiasm drives referrals',
      'Content virality reduces CAC',
      'Emotional connection increases LTV',
    ],
    corporate: [
      'Compliance certifications reduce procurement friction',
      'Proven SLAs reduce risk perception',
      'C-suite references shorten sales cycles',
    ],
    tech: [
      'Developer adoption drives bottom-up expansion',
      'Open-source credibility',
      'API extensibility enables custom workflows',
    ],
    organic: [
      'Certification removes purchase guilt',
      'Transparency narrative builds deep loyalty',
      'Impact metrics attract CSR budgets',
    ],
    retro: [
      'Emotional differentiation in commoditised category',
      'Collector premium pricing',
      'Cultural authenticity drives PR value',
    ],
  };
  const lossThemes: Record<BrandStyle, string[]> = {
    minimal: [
      'Lost on feature count vs. bloated competitors',
      'Price sensitivity in budget segments',
      'Integration gaps with legacy systems',
    ],
    bold: [
      'Lost to conservative buyers preferring understated brands',
      'Risk perception in regulated industries',
      'Over-indexing on aesthetics vs. ROI narrative',
    ],
    elegant: [
      'Lost on price to budget-conscious buyers',
      'Exclusivity perceived as inaccessible',
      'Long sales cycle in transactional categories',
    ],
    playful: [
      'Lost in enterprise due to perceived lack of seriousness',
      'Risk of brand fatigue from humor over-reliance',
      'Harder to justify premium in B2B contexts',
    ],
    corporate: [
      'Lost to agile competitors on speed-to-implement',
      'Perceived inflexibility in SMB segment',
      'Younger buyers prefer personality-led brands',
    ],
    tech: [
      'Lost to no-code solutions targeting non-technical buyers',
      'Developer-first approach alienates business stakeholders',
      'Open-source competitors undercutting on price',
    ],
    organic: [
      'Lost on price to conventional alternatives',
      'Greenwashing fatigue reduces differentiation',
      'Supply-chain constraints limit scale',
    ],
    retro: [
      'Lost to modern UX expectations of younger demographics',
      'Nostalgia perceived as irrelevant in fast-moving categories',
      'Limited scalability of artisanal positioning',
    ],
  };
  return [
    {
      theme: 'Win',
      reasons: winThemes[style] ?? winThemes.minimal,
      implication: 'Double down on these differentiators in all sales and marketing materials.',
    },
    {
      theme: 'Loss',
      reasons: lossThemes[style] ?? lossThemes.minimal,
      implication:
        'Build objection-handling playbooks and targeted proof points to address these gaps.',
    },
  ];
}

function buildCompetitiveBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const approach = STYLE_POSITIONING_APPROACH[style] ?? STYLE_POSITIONING_APPROACH.minimal;
  const moat = STYLE_MOAT_TYPE[style] ?? STYLE_MOAT_TYPE.minimal;
  const taglinePart = brand.tagline ? ` ("${brand.tagline}")` : '';
  return `${brand.name}${taglinePart} competes in ${brand.industry} with a ${style} brand positioning. Strategy: ${approach} Core competitive moat: ${moat}`;
}

// ------- main export -------

export function generateBrandCompetitive(brand: BrandIdentity): BrandCompetitiveOutput {
  const style = brand.style ?? 'minimal';

  return {
    positioningApproach: STYLE_POSITIONING_APPROACH[style] ?? STYLE_POSITIONING_APPROACH.minimal,
    competitiveAdvantages:
      STYLE_COMPETITIVE_ADVANTAGE[style] ?? STYLE_COMPETITIVE_ADVANTAGE.minimal,
    competitiveMoat: STYLE_MOAT_TYPE[style] ?? STYLE_MOAT_TYPE.minimal,
    battlecardTone: STYLE_BATTLECARD_TONE[style] ?? STYLE_BATTLECARD_TONE.minimal,
    competitorProfiles: buildCompetitorProfiles(brand),
    positioningMatrix: buildPositioningMatrix(brand),
    winLossThemes: buildWinLossThemes(style),
    objectionHandling: [
      `"Your price is too high" — ${brand.name} delivers measurable ROI; the cost of NOT switching is higher.`,
      `"We're happy with our current provider" — We hear that often; our customers said the same before they switched.`,
      `"You're not well known" — Our customers choose results over brand recognition; here are three proof points.`,
      `"We need to evaluate more options" — We welcome that; here is a structured comparison framework.`,
      `"We don't have budget right now" — Let's map the business case together to secure next cycle's budget.`,
    ],
    competitiveBriefSummary: buildCompetitiveBriefSummary(brand),
  };
}
