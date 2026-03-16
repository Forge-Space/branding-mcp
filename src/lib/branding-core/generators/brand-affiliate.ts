import type { BrandIdentity } from '../../types.js';
import type { BrandAffiliateOutput, AffiliateCommissionTier } from '../../types.js';

const VALID_STYLES = new Set([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

const STYLE_PROGRAM_APPROACH: Record<string, string> = {
  minimal:
    'Quality-over-quantity affiliate programme focused on trusted content creators and niche experts who genuinely use and believe in the product.',
  bold: 'High-energy affiliate programme targeting influential voices who can amplify the brand message and drive significant volume through authentic enthusiasm.',
  elegant:
    'Curated affiliate partnership model with select tastemakers, luxury lifestyle publishers, and premium review platforms that align with brand prestige.',
  playful:
    'Fun, community-driven affiliate programme encouraging micro-creators, fan advocates, and niche hobbyists to share their genuine love of the brand.',
  corporate:
    'Structured affiliate programme with clear tiers, compliance requirements, and enterprise-grade tracking aligned to formal procurement cycles.',
  tech: 'Developer-first affiliate programme targeting technical bloggers, open-source contributors, and SaaS review platforms with transparent API-level tracking.',
  organic:
    'Values-aligned affiliate model prioritising sustainability advocates, eco-lifestyle publishers, and ethical consumption communities.',
  retro:
    'Nostalgic community-focused affiliate programme embracing vintage enthusiasts, collectors, and niche retro culture publications.',
};

const STYLE_CONTENT_GUIDELINES: Record<string, string[]> = {
  minimal: [
    'Clean product imagery with ample whitespace',
    'Honest, concise review format',
    'No excessive promotional language',
    'Link placement in context, not banners',
  ],
  bold: [
    'High-impact visuals and bold CTAs',
    'Energy-driven unboxing and demo content',
    'First-person experience narratives',
    'Comparison posts highlighting differentiation',
  ],
  elegant: [
    'Editorial-style photography only',
    'Aspirational lifestyle context required',
    'Avoid discount-led messaging',
    'Premium placement above the fold',
  ],
  playful: [
    'Creative memes and user-generated content encouraged',
    'Challenge and hashtag campaigns',
    'Interactive polls and giveaways',
    'Casual, conversational tone throughout',
  ],
  corporate: [
    'Professional tone and brand-compliant messaging',
    'Approved asset library usage only',
    'Case study and ROI-focused content',
    'LinkedIn and trade publication priority',
  ],
  tech: [
    'Technical deep-dives and integration guides',
    'GitHub repos and code snippets encouraged',
    'Benchmark and comparison data',
    'Developer community forum engagement',
  ],
  organic: [
    'Authentic values storytelling',
    'Sustainability impact data encouraged',
    'No greenwashing language',
    'Community and impact-first framing',
  ],
  retro: [
    'Period-accurate styling and nostalgic framing',
    'Collector community engagement',
    'Archive and history-led content',
    'Vintage aesthetic visual guidelines',
  ],
};

const STYLE_RECRUITMENT_CHANNELS: Record<string, string[]> = {
  minimal: [
    'Direct outreach to respected niche bloggers',
    'Application form on brand website',
    'Partner referral from existing affiliates',
  ],
  bold: [
    'Social media influencer networks',
    'Affiliate marketplace listings (ShareASale, CJ)',
    'Brand ambassador conversion pipeline',
  ],
  elegant: [
    'Invitation-only editorial partnerships',
    'Luxury media network outreach',
    'Fashion and lifestyle PR agency introductions',
  ],
  playful: [
    'Community forum and Discord seeding',
    'Micro-creator open application',
    'Referral bonus for existing affiliate recruits',
  ],
  corporate: [
    'Trade association and B2B directory listings',
    'Partner reseller portal',
    'Enterprise procurement network outreach',
  ],
  tech: [
    'Product Hunt, Hacker News, and developer communities',
    'Tech review platform partnerships',
    'Open-source sponsorship programme cross-promotion',
  ],
  organic: [
    'Sustainability certification community outreach',
    'Eco-influencer network directories',
    'Values-alignment screening before onboarding',
  ],
  retro: [
    'Vintage marketplace and collector forum outreach',
    'Niche magazine and fanzine partnerships',
    'Convention and event sponsorship pipeline',
  ],
};

const STYLE_COOKIE_WINDOW: Record<string, string> = {
  minimal: '30 days',
  bold: '30 days',
  elegant: '60 days',
  playful: '14 days',
  corporate: '90 days',
  tech: '30 days',
  organic: '45 days',
  retro: '60 days',
};

function buildCommissionTiers(brand: BrandIdentity, safeStyle: string): AffiliateCommissionTier[] {
  const industry = brand.industry.toLowerCase();
  const isSaas =
    industry.includes('tech') || industry.includes('software') || industry.includes('saas');
  const isLuxury = safeStyle === 'elegant';
  const isOrg = safeStyle === 'organic';

  const baseRate = isSaas ? 20 : isLuxury ? 10 : isOrg ? 12 : 8;

  return [
    {
      tier: 'Starter',
      commissionRate: `${baseRate}%`,
      minimumSales: 0,
      cookieDuration: STYLE_COOKIE_WINDOW[safeStyle] ?? '30 days',
      paymentThreshold: '$50',
      benefits: [
        'Access to approved creative assets',
        'Real-time tracking dashboard',
        'Monthly newsletter with tips',
      ],
    },
    {
      tier: 'Growth',
      commissionRate: `${baseRate + 4}%`,
      minimumSales: 10,
      cookieDuration: STYLE_COOKIE_WINDOW[safeStyle] ?? '30 days',
      paymentThreshold: '$50',
      benefits: [
        'Priority affiliate support',
        'Early access to new products',
        'Co-branded landing page option',
        'Quarterly performance review',
      ],
    },
    {
      tier: 'Elite',
      commissionRate: `${baseRate + 8}%`,
      minimumSales: 50,
      cookieDuration: safeStyle === 'corporate' ? '120 days' : '60 days',
      paymentThreshold: '$25',
      benefits: [
        'Dedicated affiliate manager',
        'Custom promo code with split tracking',
        'Exclusive bonus campaigns',
        'Featured placement in affiliate directory',
        'Annual partner summit invitation',
      ],
    },
  ];
}

function buildComplianceRequirements(safeStyle: string): string[] {
  const base = [
    'FTC/ASA disclosure required on all affiliate content ("#ad", "#sponsored", or "affiliate link")',
    'No deceptive claims or fabricated testimonials',
    'Approved brand assets only — no unauthorised logo alterations',
    'Affiliate link cloaking permitted; redirect chains over three hops prohibited',
    'No bidding on brand trademark keywords in paid search without written approval',
    'Coupon and cashback sites must apply separately and meet additional vetting',
    'Cookie stuffing and forced clicks result in immediate termination',
  ];

  if (safeStyle === 'tech') {
    base.push(
      'Open-source project mentions must not imply official endorsement without prior consent'
    );
    base.push('API usage in affiliate tools requires separate developer agreement');
  }

  if (safeStyle === 'corporate') {
    base.push(
      'All content must pass legal review before publication for financial services categories'
    );
    base.push('GDPR-compliant data handling required for EU audience targeting');
  }

  if (safeStyle === 'organic') {
    base.push('Environmental claims must be substantiated with third-party evidence');
    base.push('No promotion alongside brands that conflict with sustainability values');
  }

  return base;
}

function buildPaymentStructure(safeStyle: string): Record<string, string> {
  return {
    payment_schedule:
      safeStyle === 'corporate'
        ? 'Net-60 on invoice'
        : 'Monthly on the 15th for prior month earnings',
    payment_methods: 'PayPal, bank transfer (SWIFT/SEPA), Payoneer',
    minimum_threshold: safeStyle === 'elegant' ? '$100' : '$50',
    currency: 'USD (multi-currency on request)',
    refund_policy: '30-day reversal window; commissions held until refund window closes',
    tax_documentation: 'W-9 (US) or W-8BEN (international) required before first payout',
    fraud_review: 'Automated fraud scoring; manual review triggered above 5% return rate',
  };
}

function buildAffiliateBriefSummary(brand: BrandIdentity, safeStyle: string): string {
  const approach = STYLE_PROGRAM_APPROACH[safeStyle] ?? STYLE_PROGRAM_APPROACH.minimal;
  const tiers = buildCommissionTiers(brand, safeStyle);
  const tagline = brand.tagline ? ` — "${brand.tagline}"` : '';
  return `${brand.name}${tagline} runs a ${safeStyle}-style affiliate programme. ${approach.substring(0, 80)}... Commission tiers range from ${tiers[0].commissionRate} (Starter) to ${tiers[2].commissionRate} (Elite) with a ${tiers[0].cookieDuration} cookie window.`;
}

export function generateBrandAffiliate(brand: BrandIdentity): BrandAffiliateOutput {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  const commissionTiers = buildCommissionTiers(brand, safeStyle);
  const contentGuidelines = STYLE_CONTENT_GUIDELINES[safeStyle] ?? STYLE_CONTENT_GUIDELINES.minimal;
  const recruitmentChannels =
    STYLE_RECRUITMENT_CHANNELS[safeStyle] ?? STYLE_RECRUITMENT_CHANNELS.minimal;
  const complianceRequirements = buildComplianceRequirements(safeStyle);
  const paymentStructure = buildPaymentStructure(safeStyle);

  const trackingTools = [
    'Real-time click, conversion, and revenue dashboard',
    'UTM parameter support for campaign attribution',
    'Sub-ID tracking for granular source analysis',
    'API access for custom integration (Growth+ tiers)',
    'Monthly automated performance reports via email',
  ];

  const onboardingSteps = [
    'Submit application with website/channel URL and audience overview',
    'Automated eligibility check (traffic, content alignment, compliance history)',
    'Manual review within 2–3 business days',
    'Agreement signing via DocuSign',
    'Welcome email with login credentials, asset library link, and tracking guide',
    'Optional onboarding call with affiliate manager (Growth+ tiers)',
    'First link generated and tested before first promotion',
  ];

  return {
    programApproach: STYLE_PROGRAM_APPROACH[safeStyle] ?? STYLE_PROGRAM_APPROACH.minimal,
    commissionTiers,
    contentGuidelines,
    recruitmentChannels,
    complianceRequirements,
    paymentStructure,
    trackingTools,
    onboardingSteps,
    affiliateBriefSummary: buildAffiliateBriefSummary(brand, safeStyle),
  };
}
