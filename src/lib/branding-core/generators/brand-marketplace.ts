import type { BrandIdentity } from '../../types.js';
import type { BrandMarketplaceOutput } from '../../types.js';

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

const STYLE_MARKETPLACE_APPROACH: Record<string, string> = {
  minimal:
    'Clean, curated presence on selective high-quality marketplaces with a focus on brand integrity over volume.',
  bold: 'Aggressive multi-channel marketplace expansion with bold creative assets that stand out in crowded listings.',
  elegant:
    'Premium marketplace positioning with luxury-tier platforms and white-glove seller programmes.',
  playful:
    'Fun, personality-driven marketplace presence with creative product titles and vibrant imagery.',
  corporate:
    'Strategic B2B marketplace coverage across enterprise procurement channels with compliance-ready listings.',
  tech: 'Developer-first marketplace distribution including app stores, API marketplaces, and SaaS directories.',
  organic:
    'Values-aligned marketplace selection prioritising ethical, sustainable, and independent platforms.',
  retro:
    'Vintage-authentic marketplace presence on collector and heritage platforms with artisanal positioning.',
};

const STYLE_PRIMARY_MARKETPLACES: Record<string, string[]> = {
  minimal: ['Brand DTC website', 'Curated boutique marketplaces', 'Local artisan platforms'],
  bold: ['Amazon', 'eBay', 'Walmart Marketplace', 'TikTok Shop'],
  elegant: ['Farfetch', 'Net-a-Porter', 'Harrods Online', 'Saks Fifth Avenue'],
  playful: ['Etsy', 'TikTok Shop', 'Depop', 'Amazon Handmade'],
  corporate: ['AWS Marketplace', 'Alibaba B2B', 'ThomasNet', 'Ariba Network'],
  tech: [
    'AWS Marketplace',
    'Azure Marketplace',
    'Google Cloud Marketplace',
    'Salesforce AppExchange',
  ],
  organic: ['Etsy', 'Not On The High Street', 'Wolf & Badger', 'EarthHero'],
  retro: ['Etsy', 'eBay Collectibles', 'Ruby Lane', 'Chairish'],
};

const STYLE_LISTING_PRINCIPLES: Record<string, string[]> = {
  minimal: [
    'Short precise titles under 60 characters',
    'Minimal white-space imagery',
    'Single primary benefit statement',
    'Clean bullet points',
  ],
  bold: [
    'Keyword-rich titles with top benefits',
    'A+ content with bold lifestyle imagery',
    'Comparison charts vs competitors',
    'Video content in listings',
  ],
  elegant: [
    'Luxury descriptors in title and copy',
    'Editorial-quality imagery',
    'Provenance and craftsmanship story',
    'Concierge-level descriptions',
  ],
  playful: [
    'Fun punchy titles with emoji',
    'Bright colourful product photography',
    'Story-driven descriptions',
    'Social proof callouts',
  ],
  corporate: [
    'Compliance and specification focus',
    'Data-sheet style bullet points',
    'Bulk pricing tiers',
    'SLA and support details',
  ],
  tech: [
    'Feature-first technical titles',
    'Integration and compatibility details',
    'Developer documentation links',
    'Version and changelog notes',
  ],
  organic: [
    'Ingredient and provenance transparency',
    'Certifications in title',
    'Impact and ethics story',
    'Eco-credentials bullet points',
  ],
  retro: [
    'Era and provenance in title',
    'Detailed condition descriptions',
    'Authenticity guarantees',
    'Historical context and story',
  ],
};

const STYLE_ADVERTISING_APPROACH: Record<string, string[]> = {
  minimal: ['Low-spend brand-protection ads', 'Retargeting only', 'No discount promotions'],
  bold: [
    'Sponsored Products broad match',
    'Sponsored Brands video',
    'Coupons and deal-of-the-day',
    'Lightning deals',
  ],
  elegant: ['Curated sponsored placements', 'Editorial ad slots', 'No discount advertising'],
  playful: ['TikTok in-feed video ads', 'Sponsored Posts', 'Bundle deals', 'Giveaway campaigns'],
  corporate: [
    'Category ads on procurement platforms',
    'Thought-leadership content ads',
    'RFP response boosting',
  ],
  tech: [
    'Developer newsletter placements',
    'App store search ads',
    'Free tier promotion',
    'Trial conversion campaigns',
  ],
  organic: [
    'Purpose-driven sponsor slots',
    'Community newsletter ads',
    'Zero paid-search on ethical grounds',
  ],
  retro: [
    'Promoted listings on collector platforms',
    'Curated showcase features',
    'Editorial vintage picks',
  ],
};

const STYLE_REVIEW_STRATEGY: Record<string, string[]> = {
  minimal: [
    'Post-purchase email follow-up',
    'Quality guarantee messaging',
    'Respond to all reviews within 48h',
  ],
  bold: [
    'Automated review request sequences',
    'Vine programme enrolment',
    'Public response to negative reviews',
    'Star-rating goal: 4.5+',
  ],
  elegant: [
    'Personal thank-you inserts',
    'Concierge follow-up call for high-value orders',
    'Discreet review invitation',
  ],
  playful: [
    'Unboxing hashtag campaigns',
    'Fun review prompt inserts',
    'User-generated content reposting',
  ],
  corporate: [
    'Case study requests post-deployment',
    'G2 and Capterra review campaigns',
    'Reference customer programme',
  ],
  tech: [
    'G2 and Product Hunt reviews',
    'GitHub star campaigns',
    'Changelog appreciation emails',
    'Developer testimonials',
  ],
  organic: [
    'Handwritten thank-you cards',
    'Community shoutout requests',
    'Values-aligned review prompts',
  ],
  retro: [
    'Personalised collector community shoutouts',
    'Show-and-tell requests',
    'Authenticity confirmation reviews',
  ],
};

const STYLE_PRICING_APPROACH: Record<string, string> = {
  minimal: 'Value-anchored pricing without discounts; maintain perceived brand premium.',
  bold: 'Competitive pricing with strategic promotions; use volume discounts and bundles.',
  elegant: 'Premium pricing with no markdown strategy; brand equity over velocity.',
  playful: 'Accessible price points with frequent seasonal promotions and bundles.',
  corporate: 'Tiered B2B pricing with contract-based discounts and volume brackets.',
  tech: 'Freemium entry with clear upgrade tiers; usage-based pricing transparency.',
  organic: 'Fair-trade premium pricing that reflects true cost and ethical sourcing.',
  retro: 'Collector-fair pricing with provenance-based premium; no deep discounts.',
};

function buildFulfilmentOptions(brand: BrandIdentity, safeStyle: string): string[] {
  const base = [
    'Direct fulfilment from owned warehouse for quality control',
    'Third-party logistics (3PL) for high-volume channels',
    'Maintain brand packaging standards across all fulfilment routes',
    'Branded inserts and unboxing experience in all parcels',
    'Same-day or next-day SLA on flagship marketplace',
  ];
  if (safeStyle === 'tech') {
    base.push('Digital delivery via secure download links', 'API-based licence provisioning');
  }
  if (safeStyle === 'elegant') {
    base.push('White-glove gift wrapping service', 'Named account manager for boutique orders');
  }
  if (safeStyle === 'organic') {
    base.push('Carbon-neutral shipping provider', 'Minimal packaging with compostable materials');
  }
  return base;
}

function buildComplianceChecklist(brand: BrandIdentity, safeStyle: string): string[] {
  const base = [
    `Register ${brand.name} trademark before marketplace expansion`,
    'Enrol in Brand Registry on applicable platforms',
    'Monitor for counterfeit or unauthorised sellers',
    'Ensure product descriptions meet platform content policies',
    'Maintain accurate inventory to avoid stockout penalties',
    'Follow marketplace data and privacy terms for customer data',
  ];
  if (safeStyle === 'corporate') {
    base.push(
      'SOC 2 and ISO 27001 documentation for enterprise listings',
      'GDPR-compliant data processing agreements'
    );
  }
  if (safeStyle === 'organic') {
    base.push(
      'Upload organic certification documents to platform profile',
      'Comply with FTC Green Guides for environmental claims'
    );
  }
  if (safeStyle === 'tech') {
    base.push(
      'App store guideline compliance review before each release',
      'API usage policy review quarterly'
    );
  }
  return base;
}

function buildSuccessMetrics(safeStyle: string): Record<string, string> {
  const base: Record<string, string> = {
    conversion_rate: 'Listing views to purchases; target >5%',
    buy_box_percentage: 'Percentage of time brand wins buy box; target >90%',
    average_review_rating: 'Aggregate star rating across listings; target 4.5+',
    return_rate: 'Percentage of orders returned; target <3%',
    organic_rank: 'Average keyword ranking position for top 5 search terms',
    revenue_per_listing: 'Revenue divided by active SKU count',
  };
  if (safeStyle === 'tech') {
    base['trial_to_paid_rate'] = 'Percentage converting from free trial; target >20%';
    base['marketplace_review_nps'] = 'Net Promoter Score from marketplace reviews';
  }
  if (safeStyle === 'corporate') {
    base['rfp_win_rate'] = 'Enterprise RFP conversion rate from marketplace leads';
    base['contract_value'] = 'Average annual contract value from marketplace acquisition';
  }
  return base;
}

function buildBriefSummary(brand: BrandIdentity, safeStyle: string): string {
  const approach = STYLE_MARKETPLACE_APPROACH[safeStyle];
  const platforms = STYLE_PRIMARY_MARKETPLACES[safeStyle];
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return `${brand.name}${taglinePart} marketplace strategy: ${approach} Primary channels include ${platforms[0]}, ${platforms[1]}, and ${platforms[2] ?? 'additional curated platforms'}.`;
}

export function generateBrandMarketplace(brand: BrandIdentity): BrandMarketplaceOutput {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    marketplaceApproach: STYLE_MARKETPLACE_APPROACH[safeStyle],
    primaryMarketplaces: STYLE_PRIMARY_MARKETPLACES[safeStyle],
    listingPrinciples: STYLE_LISTING_PRINCIPLES[safeStyle],
    advertisingApproach: STYLE_ADVERTISING_APPROACH[safeStyle],
    reviewStrategy: STYLE_REVIEW_STRATEGY[safeStyle],
    pricingApproach: STYLE_PRICING_APPROACH[safeStyle],
    fulfilmentOptions: buildFulfilmentOptions(brand, safeStyle),
    complianceChecklist: buildComplianceChecklist(brand, safeStyle),
    successMetrics: buildSuccessMetrics(safeStyle),
    marketplaceBriefSummary: buildBriefSummary(brand, safeStyle),
  };
}
