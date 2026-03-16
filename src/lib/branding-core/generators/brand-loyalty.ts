import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandLoyaltyOutput } from '../../types.js';

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

const STYLE_PROGRAM_APPROACH: Record<BrandStyle, string> = {
  minimal:
    'A streamlined, transparent rewards system with simple earn-and-redeem mechanics and no complexity.',
  bold: 'A high-energy, gamified loyalty experience with exclusive drops, challenges, and status symbols.',
  elegant:
    'A prestige membership programme with white-glove benefits, curated experiences, and invitation-only tiers.',
  playful:
    'A fun, collectible-based system with surprise rewards, badges, and social sharing moments.',
  corporate:
    'A structured B2B loyalty framework with volume-based incentives, dedicated account benefits, and contract rewards.',
  tech: 'A developer-friendly points API with programmable rewards, webhook integrations, and data transparency.',
  organic:
    'A values-driven loyalty circle rewarding eco-friendly behaviours, referrals, and community impact.',
  retro:
    'A classic stamp-card inspired programme with nostalgic milestones, collector rewards, and vintage aesthetics.',
};

const STYLE_TIERS: Record<BrandStyle, string[]> = {
  minimal: ['Member', 'Plus', 'Premium'],
  bold: ['Starter', 'Insider', 'Elite', 'Icon'],
  elegant: ['Member', 'Associate', 'Fellow', 'Patron'],
  playful: ['Explorer', 'Adventurer', 'Champion', 'Legend'],
  corporate: ['Silver', 'Gold', 'Platinum', 'Diamond'],
  tech: ['Contributor', 'Builder', 'Architect', 'Core'],
  organic: ['Seedling', 'Sprout', 'Grove', 'Forest'],
  retro: ['Bronze', 'Silver', 'Gold', 'Hall of Fame'],
};

const STYLE_EARN_MECHANISMS: Record<BrandStyle, string[]> = {
  minimal: ['1 point per £1 spent', 'Bonus points on featured products', 'Birthday double points'],
  bold: [
    '2x points on new launches',
    'Streak bonuses for consecutive purchases',
    'Social share rewards',
    'Challenge completions',
  ],
  elegant: [
    'Points per £ spent (tiered multipliers)',
    'Event attendance credits',
    'Referral rewards',
    'Anniversary bonuses',
  ],
  playful: [
    'Points per purchase',
    'Collectible unlocks',
    'Mini-game completions',
    'Friend referrals',
    'Review rewards',
  ],
  corporate: [
    'Volume-based point accrual',
    'Contract renewal bonuses',
    'Training completion credits',
    'Referral commissions',
  ],
  tech: [
    'API usage milestones',
    'Open-source contributions',
    'Beta testing participation',
    'Documentation contributions',
    'Purchase credits',
  ],
  organic: [
    'Eco-purchase multipliers',
    'Refill/return programme points',
    'Community volunteering credits',
    'Referral rewards',
    'Impact milestones',
  ],
  retro: ['Stamp per purchase', 'Milestone stamps', 'Event attendance stamps', 'Social stamps'],
};

const STYLE_REDEEM_OPTIONS: Record<BrandStyle, string[]> = {
  minimal: ['Discount vouchers', 'Free product', 'Exclusive access'],
  bold: [
    'Limited-edition drops',
    'Early access to launches',
    'Event tickets',
    'Exclusive merchandise',
  ],
  elegant: [
    'Complimentary upgrades',
    'Curated experiences',
    'Personal shopping sessions',
    'Charitable donations',
  ],
  playful: [
    'Product discounts',
    'Mystery box rewards',
    'Avatar upgrades',
    'Exclusive digital badges',
  ],
  corporate: [
    'Volume discounts',
    'Dedicated support hours',
    'Training credits',
    'Co-marketing opportunities',
  ],
  tech: [
    'API credit top-ups',
    'Priority support',
    'Beta access',
    'Swag and merchandise',
    'Conference tickets',
  ],
  organic: [
    'Product credits',
    'Charity donations',
    'Tree planting',
    'Community event access',
    'Upcycled merch',
  ],
  retro: [
    'Free product on full card',
    'Vintage-style collectibles',
    'Anniversary gifts',
    'Hall of fame recognition',
  ],
};

const STYLE_ENGAGEMENT_TACTICS: Record<BrandStyle, string[]> = {
  minimal: ['Monthly points summary', 'Clear progress bar', 'Simple tier tracker'],
  bold: [
    'Leaderboards',
    'Limited-time challenges',
    'Exclusive member drops',
    'FOMO countdown timers',
  ],
  elegant: [
    'Personal concierge updates',
    'Invitation-only events',
    'Curated gift at tier milestone',
  ],
  playful: [
    'Weekly surprise reveals',
    'Seasonal collectible series',
    'Social sharing streaks',
    'Friend challenges',
  ],
  corporate: [
    'Quarterly business reviews',
    'Dedicated success manager',
    'Priority renewal reminders',
  ],
  tech: [
    'API dashboard with points analytics',
    'Webhook-triggered celebrations',
    'Open changelog for points rules',
  ],
  organic: [
    'Impact dashboard (trees planted, CO2 saved)',
    'Community spotlights',
    'Circular economy milestones',
  ],
  retro: [
    'Physical loyalty card option',
    'Anniversary postcards',
    'Collector milestone certificates',
  ],
};

const STYLE_EXPIRY_POLICY: Record<BrandStyle, string> = {
  minimal: 'Points expire after 12 months of inactivity.',
  bold: 'Points valid for 24 months; Icon tier points never expire.',
  elegant: 'Points never expire while membership is active.',
  playful: 'Points expire after 18 months; collectibles never expire.',
  corporate: 'Points expire at contract year-end; roll-over available at Platinum+.',
  tech: 'Points expire after 24 months of API inactivity.',
  organic: 'Points expire after 18 months; impact credits never expire.',
  retro: 'Stamps expire after 2 years; Hall of Fame status is permanent.',
};

function buildTierBenefits(
  brand: BrandIdentity,
  safeStyle: BrandStyle
): Array<{ tier: string; benefits: string[] }> {
  const tiers = STYLE_TIERS[safeStyle];
  const baseBenefits: Record<string, string[]> = {
    [tiers[0]]: ['Access to loyalty dashboard', 'Birthday reward', 'Early sale access'],
    [tiers[1]]: [
      'All Member benefits',
      '2x points weekends',
      'Free shipping threshold reduced by 20%',
    ],
    [tiers[2]]: [
      `All ${tiers[1]} benefits`,
      'Dedicated support line',
      'Quarterly bonus points',
      'Exclusive product access',
    ],
  };
  if (tiers[3]) {
    baseBenefits[tiers[3]] = [
      `All ${tiers[2]} benefits`,
      'Personal account manager',
      'Invitation-only events',
      `${brand.name} ambassador status`,
    ];
  }
  return tiers.map((tier) => ({
    tier,
    benefits: baseBenefits[tier] ?? [`All benefits of the ${tier} tier`],
  }));
}

function buildAnalyticsKpis(): Record<string, string> {
  return {
    active_member_rate: '% members earning/redeeming in last 90 days',
    redemption_rate: '% points redeemed vs issued',
    tier_progression_rate: '% members advancing tiers per quarter',
    churn_rate_loyalty_vs_non: 'Retention lift of loyalty members over non-members',
    incremental_revenue_per_member: 'Revenue attributable to loyalty participation',
    nps_loyalty_cohort: 'NPS score for active loyalty members',
  };
}

function buildBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const approach = STYLE_PROGRAM_APPROACH[safeStyle];
  const tiers = STYLE_TIERS[safeStyle];
  return `${brand.name}${brand.tagline ? ` — "${brand.tagline}"` : ''} Loyalty Programme: ${approach} The programme features ${tiers.length} tiers (${tiers.join(', ')}), rewarding customers with points for every interaction and offering curated redemption options aligned to the brand's ${safeStyle} style.`;
}

export function generateBrandLoyalty(brand: BrandIdentity): BrandLoyaltyOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style)
    ? (brand.style as BrandStyle)
    : 'minimal';

  return {
    programApproach: STYLE_PROGRAM_APPROACH[safeStyle],
    tiers: STYLE_TIERS[safeStyle],
    tierBenefits: buildTierBenefits(brand, safeStyle),
    earnMechanisms: STYLE_EARN_MECHANISMS[safeStyle],
    redeemOptions: STYLE_REDEEM_OPTIONS[safeStyle],
    engagementTactics: STYLE_ENGAGEMENT_TACTICS[safeStyle],
    expiryPolicy: STYLE_EXPIRY_POLICY[safeStyle],
    analyticsKpis: buildAnalyticsKpis(),
    loyaltyBriefSummary: buildBriefSummary(brand, safeStyle),
  };
}
