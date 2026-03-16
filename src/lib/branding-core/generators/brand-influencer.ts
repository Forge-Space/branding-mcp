import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandInfluencerOutput, InfluencerTier } from '../../types.js';

const VALID_STYLES = new Set<string>([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

const STYLE_INFLUENCER_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Curated micro-influencer partnerships with authentic, uncluttered storytelling',
  bold: 'High-impact macro-influencer campaigns with explosive reach and bold visuals',
  elegant: 'Prestige collaborations with luxury lifestyle creators and aspirational voices',
  playful: 'Fun, energetic partnerships with entertainment creators and viral content makers',
  corporate: 'Thought leadership collaborations with industry analysts and business media',
  tech: 'Developer advocates, tech YouTubers, and open-source community contributors',
  organic: 'Purpose-driven creators focused on sustainability, wellness, and conscious living',
  retro: 'Nostalgic content creators and vintage culture enthusiasts with niche followings',
};

const STYLE_CONTENT_PREFERENCES: Record<BrandStyle, string[]> = {
  minimal: [
    'Minimalist flat-lay product photography',
    'Clean aesthetic unboxing videos',
    'Honest, no-fuss product reviews',
    'Day-in-the-life integrations',
    'Before/after comparison content',
  ],
  bold: [
    'High-energy challenge videos',
    'Reaction and transformation reels',
    'Live unboxing and haul content',
    'Bold OOH takeover documentation',
    'Trend-setting statement pieces',
  ],
  elegant: [
    'Editorial-style luxury flatlay photography',
    'Refined product styling and gifting moments',
    'Exclusive behind-the-scenes access content',
    'Travel and lifestyle integration shots',
    'Long-form written reviews on prestige platforms',
  ],
  playful: [
    'Comedy skits and brand parodies',
    'Challenge and trend participation',
    'Interactive polls and Q&A stories',
    'Meme-friendly short-form video',
    'Animated and illustrated brand stories',
  ],
  corporate: [
    'LinkedIn thought leadership articles',
    'Podcast guest appearances',
    'Webinar and panel discussion co-hosting',
    'Industry report co-authorship',
    'Professional case study narratives',
  ],
  tech: [
    'In-depth technical product reviews',
    'Tutorial and how-to video series',
    'GitHub repository contributions',
    'Live coding sessions and API walkthroughs',
    'Developer podcast appearances',
  ],
  organic: [
    'Farm-to-table and origin storytelling',
    'Sustainable lifestyle integration',
    'Environmental impact documentation',
    'Community and purpose-driven narratives',
    'Educational content on conscious consumption',
  ],
  retro: [
    'Vintage aesthetic product showcases',
    'Throwback and nostalgia-led storytelling',
    'Collector and enthusiast deep dives',
    'Retro lifestyle and culture content',
    'Anniversary and heritage brand moments',
  ],
};

const STYLE_OUTREACH_TONE: Record<BrandStyle, string> = {
  minimal: "Clear, concise, and respectful of the creator's time and creative vision",
  bold: 'Energetic and direct — lead with the big opportunity and bold campaign concept',
  elegant: 'Refined and exclusive — position the partnership as a privilege, not a transaction',
  playful: 'Casual, friendly, and fun — match their energy and show brand personality',
  corporate: 'Professional and data-led — highlight business value and strategic alignment',
  tech: 'Peer-to-peer and technical — demonstrate genuine understanding of their domain',
  organic: 'Values-led and mission-driven — lead with shared purpose over commercial terms',
  retro: 'Enthusiastic and culturally aware — show deep appreciation for their niche passion',
};

const STYLE_AVOID: Record<BrandStyle, string[]> = {
  minimal: [
    'Over-produced content',
    'Excessive brand logo placement',
    'Scripted unnatural dialogue',
  ],
  bold: ['Muted aesthetics', 'Slow-paced storytelling', 'Unclear calls to action'],
  elegant: [
    'Mass-market or low-brow creators',
    'Discount or voucher-led promotions',
    'Garish visuals',
  ],
  playful: [
    'Overly serious or stiff content',
    'Corporate jargon in captions',
    'Static imagery only',
  ],
  corporate: [
    'Consumer entertainment creators',
    'Controversial personal brand accounts',
    'Vanity metrics focus',
  ],
  tech: [
    'Non-technical shallow reviews',
    'Paid-first sponsored posts without genuine use',
    'Hype without substance',
  ],
  organic: [
    'Fast-fashion or unsustainable product tie-ins',
    'Greenwashing language',
    'Purely commercial framing',
  ],
  retro: [
    'Trendy influencers without authentic niche knowledge',
    'Modern minimalist aesthetics',
    'Generic lifestyle content',
  ],
};

function buildInfluencerTiers(brand: BrandIdentity): InfluencerTier[] {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  return [
    {
      tier: 'Mega Influencer',
      followerRange: '1M+',
      engagementExpectation: '1-3%',
      budgetGuidance: 'Premium investment — suited to brand awareness campaigns',
      idealUseCase: 'Product launches, brand repositioning, major campaign amplification',
      selectionCriteria: [
        'Brand value alignment must be unimpeachable',
        `Audience demographic match for ${brand.industry || 'target market'}`,
        'Previous brand partnership quality and disclosure compliance',
        'Organic brand affinity preferred over cold outreach',
      ],
    },
    {
      tier: 'Macro Influencer',
      followerRange: '100K–1M',
      engagementExpectation: '2-5%',
      budgetGuidance: 'Mid-tier investment — strong ROI for reach with some engagement',
      idealUseCase: 'Seasonal campaigns, product reviews, long-form storytelling',
      selectionCriteria: [
        'Consistent posting cadence and audience growth trajectory',
        'Content quality aligned with brand aesthetic',
        `${STYLE_INFLUENCER_APPROACH[safeStyle].split(' ').slice(0, 4).join(' ')} sensibility`,
        'Clear media kit with audited audience demographics',
      ],
    },
    {
      tier: 'Micro Influencer',
      followerRange: '10K–100K',
      engagementExpectation: '5-10%',
      budgetGuidance: 'Efficient investment — high engagement and authentic community trust',
      idealUseCase: 'Community building, niche market penetration, authentic testimonials',
      selectionCriteria: [
        'Niche expertise directly relevant to brand category',
        'High comment-to-like ratio indicating genuine community',
        'Previous brand content quality and creative execution',
        'Responsive and professional communication',
      ],
    },
    {
      tier: 'Nano Influencer',
      followerRange: '1K–10K',
      engagementExpectation: '10-20%',
      budgetGuidance: 'Low cost or gifting-based — maximum authenticity and peer trust',
      idealUseCase: 'Brand seeding, product sampling, word-of-mouth activation',
      selectionCriteria: [
        'Genuine passion for brand category or values',
        'Highly engaged and responsive audience',
        'Local or hyper-niche community leadership',
        'No brand conflict or competing products in recent posts',
      ],
    },
  ];
}

function buildCampaignBriefTemplate(brand: BrandIdentity): string {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  return (
    `INFLUENCER CAMPAIGN BRIEF — ${brand.name.toUpperCase()}\n` +
    `\nBrand: ${brand.name}${brand.tagline ? ` | "${brand.tagline}"` : ''}\n` +
    `Industry: ${brand.industry || 'General'}\n` +
    `\nOVERVIEW\n` +
    `We are seeking [INFLUENCER NAME] to partner with ${brand.name} on [CAMPAIGN NAME].\n` +
    `\nOBJECTIVES\n` +
    `- Drive awareness of [PRODUCT/SERVICE] among [TARGET AUDIENCE]\n` +
    `- Generate [X pieces] of authentic branded content\n` +
    `- Achieve [X impressions / X engagements / X conversions]\n` +
    `\nCONTENT DIRECTION\n` +
    `Tone: ${STYLE_OUTREACH_TONE[safeStyle]}\n` +
    `Preferred formats: ${(STYLE_CONTENT_PREFERENCES[safeStyle] ?? STYLE_CONTENT_PREFERENCES.minimal).slice(0, 2).join(', ')}\n` +
    `\nDELIVERABLES\n` +
    `- [X] feed posts / reels / stories\n` +
    `- Usage rights: [DURATION] for owned and paid channels\n` +
    `\nCOMPENSATION\n` +
    `- [Fee / Gifting / Affiliate / Hybrid] — TBD based on audience and deliverables\n` +
    `\nKEY DATES\n` +
    `- Brief acceptance: [DATE]\n` +
    `- Content draft review: [DATE]\n` +
    `- Go-live date: [DATE]`
  );
}

function buildKpis(brand: BrandIdentity): Record<string, string> {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  const base: Record<string, string> = {
    impressions: 'Total estimated reach across all influencer posts',
    engagement_rate: 'Likes, comments, shares, and saves / total reach',
    click_through_rate: 'Clicks to brand URL / total impressions',
    cost_per_engagement: 'Total spend / total engagements',
    sentiment_score: 'Positive comment ratio on branded content',
    earned_media_value: 'Equivalent advertising value of organic influencer content',
  };
  if (safeStyle === 'tech') {
    base.developer_sign_ups = 'New sign-ups attributed to influencer referral links';
    base.github_stars = 'Stars or forks driven by influencer-linked repositories';
  }
  if (safeStyle === 'organic') {
    base.values_alignment_score =
      'Audience survey: perceived sustainability credibility post-campaign';
  }
  if (safeStyle === 'corporate') {
    base.qualified_leads = 'Leads generated via influencer-specific landing pages';
    base.pipeline_value = 'Estimated revenue potential from influencer-sourced leads';
  }
  return base;
}

function buildBriefSummary(brand: BrandIdentity): string {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  const approach = STYLE_INFLUENCER_APPROACH[safeStyle];
  const pref = (STYLE_CONTENT_PREFERENCES[safeStyle] ?? STYLE_CONTENT_PREFERENCES.minimal)[0];
  return (
    `${brand.name}${brand.tagline ? ` ("${brand.tagline}")` : ''} pursues an influencer strategy built on ${approach.toLowerCase()}. ` +
    `Content focus leads with ${pref.toLowerCase()}, delivered across micro and macro tiers for maximum authenticity and reach. ` +
    `Outreach tone: ${(STYLE_OUTREACH_TONE[safeStyle] ?? STYLE_OUTREACH_TONE.minimal).split(' — ')[0].toLowerCase()}.`
  );
}

export function generateBrandInfluencer(brand: BrandIdentity): BrandInfluencerOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    influencerApproach: STYLE_INFLUENCER_APPROACH[safeStyle],
    contentPreferences: STYLE_CONTENT_PREFERENCES[safeStyle] ?? STYLE_CONTENT_PREFERENCES.minimal,
    outreachTone: STYLE_OUTREACH_TONE[safeStyle] ?? STYLE_OUTREACH_TONE.minimal,
    influencerTiers: buildInfluencerTiers(brand),
    avoidList: STYLE_AVOID[safeStyle] ?? STYLE_AVOID.minimal,
    campaignBriefTemplate: buildCampaignBriefTemplate(brand),
    kpis: buildKpis(brand),
    disclosureGuidelines: [
      'All sponsored content must include clear #ad or #sponsored disclosure per ASA/FTC guidelines',
      'Gifted product must be disclosed even if no fee was paid',
      'Discount code partnerships require affiliate disclosure',
      'Influencer must not claim clinical efficacy without approved substantiation',
      'No brand impersonation or fake review creation permitted',
      'Platform-native disclosure tools (paid partnership labels) must be used where available',
      'Usage rights grant must be explicitly agreed in writing before content goes live',
    ],
    influencerBriefSummary: buildBriefSummary(brand),
  };
}
