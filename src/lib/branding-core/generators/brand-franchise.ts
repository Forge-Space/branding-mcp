import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandFranchiseOutput } from '../../types.js';

const STYLE_STANDARDS_TONE: Record<BrandStyle, string> = {
  minimal: 'Clear and precise standards with minimal interpretation required',
  bold: 'Energetic compliance guidelines that protect brand momentum',
  elegant: 'Refined standards that preserve premium brand positioning',
  playful: 'Friendly brand playbook keeping the fun consistent across locations',
  corporate: 'Formal compliance framework with rigorous audit procedures',
  tech: 'Version-controlled brand system with automated compliance checks',
  organic: 'Values-led standards rooted in authenticity and community connection',
  retro: 'Heritage-preservation guidelines that honour the original aesthetic',
};

const STYLE_ONBOARDING: Record<BrandStyle, string[]> = {
  minimal: [
    '3-day brand immersion programme covering core identity and standards',
    'Digital brand portal access with self-paced learning modules',
    'Quarterly brand certification renewal',
  ],
  bold: [
    '5-day intensive brand bootcamp with live demonstrations',
    'Hands-on visual merchandising training at flagship location',
    'Monthly performance webinars with brand team',
    'Annual franchisee summit with brand leadership',
  ],
  elegant: [
    '7-day white-glove onboarding at brand academy',
    'Personal brand mentor assigned for first 90 days',
    'Luxury customer experience immersion programme',
    'Seasonal brand refresher retreats',
  ],
  playful: [
    'Fun 4-day brand adventure programme with interactive workshops',
    'Brand game and quiz certification system',
    'Monthly creative challenge with winner recognition',
    'Annual brand festival for all franchisees',
  ],
  corporate: [
    'Structured 10-day brand compliance certification',
    'Written brand standards examination required before launch',
    'Bi-annual compliance audit with corrective action plan',
    'Mandatory quarterly webinar attendance',
  ],
  tech: [
    'Online brand platform with interactive modules and assessments',
    'API access to brand asset library with version tracking',
    'Automated compliance monitoring dashboard',
    'Monthly virtual office hours with brand engineering team',
  ],
  organic: [
    '5-day community-centred brand immersion at head farm/studio',
    'Supplier and sourcing orientation for brand-aligned procurement',
    'Seasonal brand ritual calendar and community guidelines',
    'Annual growers and makers summit',
  ],
  retro: [
    '4-day heritage brand deep-dive at original location',
    'Brand history and storytelling certification',
    'Vintage brand standards archive access',
    'Annual nostalgia brand celebration event',
  ],
};

const STYLE_COMPLIANCE_REQUIREMENTS: Record<BrandStyle, string[]> = {
  minimal: [
    'Annual brand audit with photographic evidence',
    'Logo usage approval for all external signage',
    'Approved supplier list adherence for branded materials',
  ],
  bold: [
    'Quarterly visual audit with mystery shopper programme',
    'Social media content approval within 24 hours',
    'Weekly brand KPI reporting dashboard submission',
    'Mandatory uniform standards with monthly inspection',
  ],
  elegant: [
    'Monthly white-glove brand experience audit',
    'All customer touchpoints require brand approval pre-launch',
    'Staff appearance and grooming standards quarterly review',
    'Third-party quality assessment bi-annually',
  ],
  playful: [
    'Monthly fun brand health check with selfie submission',
    'Social media posting calendar pre-approval',
    'In-store experience audit bi-annually',
    'Customer happiness score minimum 4.5/5',
  ],
  corporate: [
    'Formal bi-annual brand compliance audit with written report',
    'All marketing materials require legal and brand sign-off',
    'Financial reporting aligned to brand positioning data',
    'Mandatory brand training hours logged annually',
    'Third-party regulatory compliance verification',
  ],
  tech: [
    'Automated brand consistency scan via brand portal API',
    'Monthly digital asset version compliance report',
    'Security and data handling brand standards quarterly review',
    'Open-source contribution guidelines adherence',
  ],
  organic: [
    'Annual sustainability and brand ethics audit',
    'Certified supplier documentation renewed annually',
    'Community engagement metrics quarterly review',
    'Environmental impact reporting bi-annually',
  ],
  retro: [
    'Annual heritage brand preservation audit',
    'Vintage collateral authenticity review bi-annually',
    'Original recipe and process compliance monthly check',
    'Historical brand archive contribution annually',
  ],
};

const STYLE_APPROVED_SUPPLIER_FOCUS: Record<BrandStyle, string> = {
  minimal: 'Quality-certified suppliers with sustainable practices',
  bold: 'High-impact suppliers delivering bold visual and product quality',
  elegant: 'Premium, artisan and luxury-positioned approved suppliers',
  playful: 'Creative and fun-forward suppliers with flexible MOQs',
  corporate: 'Tier-1 enterprise suppliers with full compliance documentation',
  tech: 'Open-standards-compatible suppliers with API integration capability',
  organic: 'Certified organic, fair trade and locally sourced suppliers',
  retro: 'Heritage manufacturers using traditional and period-accurate methods',
};

const STYLE_TERRITORY_POLICY: Record<BrandStyle, string> = {
  minimal: 'Defined exclusive territory with clear boundary mapping',
  bold: 'Aggressive growth territories with first-mover advantage windows',
  elegant: 'Carefully curated exclusive territories preserving scarcity',
  playful: 'Flexible territory model with community zone protections',
  corporate: 'Strictly defined exclusive territories with legal enforcement',
  tech: 'Digital and physical territory with geofenced exclusivity zones',
  organic: 'Community-centred territories aligned to local market ecosystems',
  retro: 'Heritage zone territories protecting original market presence',
};

function buildLicensingTerms(brand: BrandIdentity): Record<string, string> {
  return {
    initial_franchise_fee: 'As defined in Franchise Disclosure Document (FDD)',
    royalty_rate: `Ongoing royalty on gross revenue per FDD schedule`,
    marketing_fund_contribution: `Contribution to ${brand.name} national brand fund`,
    term_length: 'Initial term per FDD with renewal options',
    renewal_conditions: 'Compliance record, financial health, and brand standards adherence',
    territory_rights: STYLE_TERRITORY_POLICY[brand.style] ?? STYLE_TERRITORY_POLICY.minimal,
    technology_fee: 'Monthly platform and brand portal access fee',
    training_fee: 'Initial onboarding programme included; refresher courses charged at cost',
    exit_provisions: 'Transfer, resale, and termination clauses per FDD',
    non_compete: '2-year post-termination non-compete within territory',
  };
}

function buildOperationsManualOutline(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const base = [
    `Chapter 1: ${brand.name} Brand Story and Values`,
    'Chapter 2: Visual Identity Standards and Logo Usage',
    'Chapter 3: Interior Design and Signage Specifications',
    'Chapter 4: Product and Service Standards',
    'Chapter 5: Customer Experience Protocols',
    'Chapter 6: Staff Uniform and Appearance Standards',
    'Chapter 7: Marketing and Advertising Guidelines',
    'Chapter 8: Approved Supplier and Procurement Policy',
    'Chapter 9: Technology Systems and POS Requirements',
    'Chapter 10: Health, Safety, and Compliance',
    'Chapter 11: Financial Reporting and Royalty Procedures',
    'Chapter 12: Audit and Quality Assurance Process',
  ];
  if (style === 'tech') {
    base.push(
      'Chapter 13: API Integration and Digital Compliance',
      'Chapter 14: Data Privacy and Security Standards'
    );
  }
  if (style === 'organic') {
    base.push(
      'Chapter 13: Sustainability and Ethical Sourcing Standards',
      'Chapter 14: Community Engagement Playbook'
    );
  }
  if (style === 'corporate') {
    base.push(
      'Chapter 13: Legal and Regulatory Compliance Framework',
      'Chapter 14: Crisis Management Protocol'
    );
  }
  return base;
}

function buildFranchiseBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return (
    `${brand.name}${taglinePart} franchise brand standards are built on ${(STYLE_STANDARDS_TONE[style] ?? STYLE_STANDARDS_TONE.minimal).toLowerCase()}. ` +
    `Franchisees access a comprehensive onboarding programme, ongoing compliance support, and the approved supplier network to deliver a consistent ${brand.industry} brand experience across every location.`
  );
}

export function generateBrandFranchise(brand: BrandIdentity): BrandFranchiseOutput {
  const style = brand.style ?? 'minimal';
  return {
    standardsTone: STYLE_STANDARDS_TONE[style] ?? STYLE_STANDARDS_TONE.minimal,
    onboardingProgramme: STYLE_ONBOARDING[style] ?? STYLE_ONBOARDING.minimal,
    complianceRequirements:
      STYLE_COMPLIANCE_REQUIREMENTS[style] ?? STYLE_COMPLIANCE_REQUIREMENTS.minimal,
    approvedSupplierFocus:
      STYLE_APPROVED_SUPPLIER_FOCUS[style] ?? STYLE_APPROVED_SUPPLIER_FOCUS.minimal,
    licensingTerms: buildLicensingTerms(brand),
    operationsManualOutline: buildOperationsManualOutline(brand),
    brandProtectionPolicies: [
      `${brand.name} name and logo are registered trademarks — unauthorised use prohibited`,
      'All marketing collateral must use approved brand assets from the brand portal',
      'Social media accounts must follow handle naming convention and require brand approval',
      'Third-party endorsements and co-branding require written approval from brand team',
      'Brand guidelines document supersedes any locally adapted materials',
      'Mystery shopper programme enforces brand experience standards quarterly',
      'Brand violations trigger a 30-day corrective action plan with escalation pathway',
    ],
    franchiseeSupport: [
      'Dedicated franchisee success manager assigned at launch',
      'Brand portal with asset library, training, and compliance tools',
      '24/7 operations helpline for urgent brand and compliance queries',
      'Peer franchisee network and mentorship programme',
      'Quarterly group training webinars',
      'Annual franchisee conference and brand update event',
    ],
    franchiseBriefSummary: buildFranchiseBriefSummary(brand),
  };
}
