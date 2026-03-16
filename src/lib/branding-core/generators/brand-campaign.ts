import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandCampaignOutput, CampaignChannel, CampaignPhase } from '../../types.js';

const STYLE_CAMPAIGN_THEMES: Record<BrandStyle, string[]> = {
  minimal: ['Less is more', 'Pure simplicity', 'Essential beauty', 'Form follows function'],
  bold: ['Make your mark', 'Be unforgettable', 'Dare to stand out', 'Power unleashed'],
  elegant: [
    'Crafted to perfection',
    'Timeless excellence',
    'Where art meets purpose',
    'Refined luxury',
  ],
  playful: ['Joy is contagious', 'Life is a game', 'Smile, repeat', 'Adventure awaits'],
  corporate: [
    'Built for business',
    'Performance delivered',
    'Trust in every detail',
    'Results that matter',
  ],
  tech: [
    'Code the future',
    'Innovate without limits',
    'Technology that thinks',
    'Digital transformation',
  ],
  organic: ['Back to roots', 'Nature knows best', 'Grown with care', 'Earth-first values'],
  retro: ['Classics never die', 'Old soul, new vision', 'Heritage redefined', 'Timeless by design'],
};

const STYLE_OBJECTIVES: Record<BrandStyle, string[]> = {
  minimal: ['Increase brand awareness', 'Drive quality leads', 'Build premium perception'],
  bold: ['Maximize reach', 'Dominate share of voice', 'Accelerate growth'],
  elegant: [
    'Attract high-value customers',
    'Reinforce premium positioning',
    'Build brand prestige',
  ],
  playful: ['Grow community', 'Boost engagement', 'Drive viral sharing'],
  corporate: [
    'Generate qualified leads',
    'Strengthen enterprise relationships',
    'Build market credibility',
  ],
  tech: ['Drive product adoption', 'Build developer community', 'Establish thought leadership'],
  organic: [
    'Grow conscious consumer base',
    'Build trust through transparency',
    'Drive community advocacy',
  ],
  retro: ['Tap nostalgia markets', 'Build brand loyalty', 'Create cultural moments'],
};

const STYLE_CHANNELS: Record<BrandStyle, CampaignChannel[]> = {
  minimal: [
    {
      name: 'Display Advertising',
      role: 'Visual brand presence',
      budget: '30%',
      tactics: ['Clean banner ads', 'Out-of-home placements'],
    },
    {
      name: 'Content Marketing',
      role: 'Thought leadership',
      budget: '40%',
      tactics: ['Long-form articles', 'White papers'],
    },
    {
      name: 'Email',
      role: 'Direct conversion',
      budget: '30%',
      tactics: ['Curated newsletters', 'Drip sequences'],
    },
  ],
  bold: [
    {
      name: 'Social Media',
      role: 'Mass reach',
      budget: '35%',
      tactics: ['Instagram reels', 'TikTok challenges', 'Twitter storms'],
    },
    {
      name: 'Influencer',
      role: 'Amplification',
      budget: '30%',
      tactics: ['Macro influencers', 'Brand ambassadors'],
    },
    {
      name: 'Out-of-Home',
      role: 'Cultural presence',
      budget: '35%',
      tactics: ['Billboard takeovers', 'Transit ads'],
    },
  ],
  elegant: [
    {
      name: 'Print & Editorial',
      role: 'Prestige positioning',
      budget: '35%',
      tactics: ['Luxury magazines', 'Editorial partnerships'],
    },
    {
      name: 'Events & Experiential',
      role: 'Exclusive touchpoints',
      budget: '40%',
      tactics: ['Private events', 'Pop-up experiences'],
    },
    {
      name: 'Digital Display',
      role: 'Targeted reach',
      budget: '25%',
      tactics: ['Premium placements', 'Programmatic luxury'],
    },
  ],
  playful: [
    {
      name: 'Social Media',
      role: 'Community building',
      budget: '40%',
      tactics: ['User-generated content', 'Challenges', 'Memes'],
    },
    {
      name: 'Influencer',
      role: 'Authentic advocacy',
      budget: '35%',
      tactics: ['Micro-influencers', 'Community creators'],
    },
    {
      name: 'Experiential',
      role: 'Live moments',
      budget: '25%',
      tactics: ['Pop-up activations', 'Interactive stunts'],
    },
  ],
  corporate: [
    {
      name: 'LinkedIn',
      role: 'B2B reach',
      budget: '35%',
      tactics: ['Sponsored content', 'InMail campaigns'],
    },
    {
      name: 'Search',
      role: 'Intent capture',
      budget: '35%',
      tactics: ['PPC campaigns', 'SEO content'],
    },
    {
      name: 'Events',
      role: 'Relationship building',
      budget: '30%',
      tactics: ['Trade shows', 'Webinars', 'Conferences'],
    },
  ],
  tech: [
    {
      name: 'Developer Channels',
      role: 'Community building',
      budget: '30%',
      tactics: ['GitHub', 'Stack Overflow', 'Dev.to'],
    },
    {
      name: 'Search & Content',
      role: 'Organic growth',
      budget: '35%',
      tactics: ['Technical SEO', 'Documentation', 'Tutorials'],
    },
    {
      name: 'Social Media',
      role: 'Tech audience',
      budget: '35%',
      tactics: ['Twitter/X', 'LinkedIn', 'YouTube demos'],
    },
  ],
  organic: [
    {
      name: 'Social Media',
      role: 'Community advocacy',
      budget: '35%',
      tactics: ['Instagram storytelling', 'Pinterest boards'],
    },
    {
      name: 'Content Marketing',
      role: 'Education',
      budget: '35%',
      tactics: ['Blog', 'Sustainability reports', 'Impact stories'],
    },
    {
      name: 'Partnerships',
      role: 'Credibility',
      budget: '30%',
      tactics: ['NGO collaborations', 'Eco certifications'],
    },
  ],
  retro: [
    {
      name: 'Nostalgia Media',
      role: 'Emotional connection',
      budget: '35%',
      tactics: ['Vintage ads', 'Throwback campaigns'],
    },
    {
      name: 'Social Media',
      role: 'Cultural conversation',
      budget: '35%',
      tactics: ['Hashtag campaigns', 'Retro filters'],
    },
    {
      name: 'Experiential',
      role: 'Cultural moments',
      budget: '30%',
      tactics: ['Pop-up shops', 'Collector editions'],
    },
  ],
};

const STYLE_MESSAGING_PILLARS: Record<BrandStyle, string[]> = {
  minimal: ['Clarity of purpose', 'Quality over quantity', 'Effortless experience'],
  bold: ['Fearless innovation', 'Unapologetic confidence', 'Maximum impact'],
  elegant: ['Artisanal craftsmanship', 'Enduring sophistication', 'Exclusive access'],
  playful: ['Pure joy', 'Inclusive fun', 'Spontaneous delight'],
  corporate: ['Proven reliability', 'Data-driven results', 'Partnership excellence'],
  tech: ['Technical mastery', 'Scalable innovation', 'Developer-first thinking'],
  organic: ['Radical transparency', 'Regenerative impact', 'Community stewardship'],
  retro: ['Heritage authenticity', 'Nostalgic comfort', 'Classic reimagined'],
};

function buildCampaignPhases(brand: BrandIdentity): CampaignPhase[] {
  const style = brand.style ?? 'minimal';
  const theme = (STYLE_CAMPAIGN_THEMES[style] ?? STYLE_CAMPAIGN_THEMES.minimal)[0];
  const name = brand.name;

  return [
    {
      name: 'Awareness',
      duration: '4 weeks',
      goal: `Introduce ${name} to the target audience`,
      tactics: [
        'Launch teaser content across priority channels',
        'Activate influencer and media partnerships',
        'Deploy paid media for broad reach',
      ],
      kpis: ['Impressions', 'Reach', 'Brand recall lift'],
      messaging: `Introducing ${name}: ${theme}`,
    },
    {
      name: 'Consideration',
      duration: '6 weeks',
      goal: 'Drive audience to explore and evaluate the brand',
      tactics: [
        'Publish in-depth content showcasing value',
        'Retarget awareness audiences with proof points',
        'Enable trial or demo opportunities',
      ],
      kpis: ['Click-through rate', 'Time on site', 'Demo requests'],
      messaging: `Discover what makes ${name} different`,
    },
    {
      name: 'Conversion',
      duration: '4 weeks',
      goal: 'Convert engaged prospects into customers',
      tactics: [
        'Deploy targeted offers and incentives',
        'Activate email nurture sequences',
        'Use social proof and testimonials',
      ],
      kpis: ['Conversion rate', 'Cost per acquisition', 'Revenue'],
      messaging: `Join thousands who choose ${name}`,
    },
    {
      name: 'Retention',
      duration: 'Ongoing',
      goal: 'Turn customers into advocates',
      tactics: [
        'Launch loyalty and referral programs',
        'Create exclusive community for customers',
        'Share behind-the-scenes and brand stories',
      ],
      kpis: ['Retention rate', 'NPS score', 'Referral rate'],
      messaging: `You are part of the ${name} story`,
    },
  ];
}

function buildCreativeConcept(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const themes = STYLE_CAMPAIGN_THEMES[style] ?? STYLE_CAMPAIGN_THEMES.minimal;
  const theme = themes[0];
  const pillars = STYLE_MESSAGING_PILLARS[style] ?? STYLE_MESSAGING_PILLARS.minimal;
  return (
    `Campaign concept for ${brand.name}: "${theme}". ` +
    `Built on three pillars: ${pillars.join(', ')}. ` +
    `The visual language draws from ${brand.style} aesthetics — ` +
    `anchored in ${brand.colors.primary.name} and ${brand.typography.headingFont}. ` +
    `Every touchpoint reinforces a single truth: ${brand.tagline ?? `${brand.name} stands for something real`}.`
  );
}

function buildSuccessMetrics(style: BrandStyle): Record<string, string> {
  const base: Record<string, string> = {
    brand_awareness: 'Lift in unaided brand recall by 15%+',
    engagement_rate: 'Average 3%+ across social channels',
    conversion_rate: 'Achieve 2-5% conversion on campaign traffic',
    roi: 'Minimum 3x ROAS on paid channels',
    share_of_voice: 'Increase SOV by 10% in target category',
    nps_impact: 'Net Promoter Score improvement of 5+ points',
  };

  if (style === 'tech') {
    base['developer_signups'] = '500+ new developer accounts per month';
    base['github_stars'] = '20% increase in repository stars';
  } else if (style === 'corporate') {
    base['qualified_leads'] = '200+ MQLs per campaign month';
    base['pipeline_value'] = '$500K+ new pipeline generated';
  } else if (style === 'playful') {
    base['ugc_volume'] = '1000+ user-generated pieces in campaign period';
    base['viral_coefficient'] = 'K-factor > 1.2 for challenge content';
  }

  return base;
}

function buildBudgetAllocation(style: BrandStyle): Record<string, string> {
  const allocations: Record<BrandStyle, Record<string, string>> = {
    minimal: {
      paid_media: '30%',
      content_production: '30%',
      agency_fees: '20%',
      experiential: '10%',
      contingency: '10%',
    },
    bold: {
      paid_media: '40%',
      influencer: '25%',
      production: '20%',
      ooh: '10%',
      contingency: '5%',
    },
    elegant: {
      experiential: '35%',
      print_editorial: '25%',
      digital: '20%',
      production: '15%',
      contingency: '5%',
    },
    playful: {
      social_media: '35%',
      influencer: '30%',
      experiential: '20%',
      production: '10%',
      contingency: '5%',
    },
    corporate: {
      digital_ads: '35%',
      events: '25%',
      content: '20%',
      sales_enablement: '15%',
      contingency: '5%',
    },
    tech: {
      developer_relations: '30%',
      content_seo: '25%',
      paid_digital: '25%',
      events: '15%',
      contingency: '5%',
    },
    organic: {
      content: '35%',
      partnerships: '25%',
      community: '20%',
      paid: '15%',
      contingency: '5%',
    },
    retro: {
      production: '30%',
      media_buy: '30%',
      experiential: '25%',
      social: '10%',
      contingency: '5%',
    },
  };
  return allocations[style] ?? allocations.minimal;
}

export function generateBrandCampaign(brand: BrandIdentity): BrandCampaignOutput {
  const style = (brand.style ?? 'minimal') as BrandStyle;
  const safeStyle = STYLE_CAMPAIGN_THEMES[style] ? style : 'minimal';

  const themes = STYLE_CAMPAIGN_THEMES[safeStyle];
  const objectives = STYLE_OBJECTIVES[safeStyle];
  const channels = STYLE_CHANNELS[safeStyle];
  const messagingPillars = STYLE_MESSAGING_PILLARS[safeStyle];

  return {
    campaignThemes: themes,
    primaryObjective: objectives[0],
    secondaryObjectives: objectives.slice(1),
    targetAudience: {
      primary: `${brand.industry} decision-makers and enthusiasts`,
      secondary: `Adjacent audiences interested in ${safeStyle} brand values`,
      psychographics: messagingPillars,
    },
    channels,
    phases: buildCampaignPhases(brand),
    messagingPillars,
    creativeConcept: buildCreativeConcept(brand),
    callToAction: `Experience ${brand.name}`,
    successMetrics: buildSuccessMetrics(safeStyle),
    budgetAllocation: buildBudgetAllocation(safeStyle),
    campaignDuration: '14 weeks (4 awareness + 6 consideration + 4 conversion)',
    keyMessages: [
      brand.tagline ?? `${brand.name}: built for those who demand more`,
      `${messagingPillars[0]} — that is the ${brand.name} promise`,
      `Join the ${brand.name} movement`,
    ],
  };
}
