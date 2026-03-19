import { BrandIdentity, BrandStyle, BrandFintechOutput } from '../../types.js';
import { resolveBrandStyle } from './brand-style.js';

const STYLE_POSITIONING: Record<BrandStyle, string> = {
  minimal: 'Clean, transparent financial tools that remove complexity from money management.',
  bold: 'Disruptive fintech brand that challenges traditional banking with bold innovation.',
  elegant: 'Premium wealth management platform combining exclusivity with cutting-edge technology.',
  playful: 'Friendly financial companion making money management fun, accessible, and rewarding.',
  corporate: 'Enterprise-grade financial infrastructure trusted by institutions worldwide.',
  tech: 'Developer-first financial API platform enabling the next generation of fintech.',
  organic: 'Ethical finance platform aligning money with personal values and sustainability.',
  retro: 'Modern banking built on timeless principles of trust, craft, and community.',
};

const STYLE_CORE_PRODUCTS: Record<BrandStyle, string[]> = {
  minimal: ['Zero-fee current account', 'Instant transfers', 'Spend analytics', 'Virtual cards'],
  bold: [
    'High-yield savings',
    'Commission-free investing',
    'Instant cashback',
    'Buy now pay later',
  ],
  elegant: ['Private banking suite', 'Wealth management', 'Concierge FX', 'Estate planning tools'],
  playful: [
    'Round-up savings jars',
    'Gamified budgeting',
    'Friend money pools',
    'Rewards programme',
  ],
  corporate: [
    'Treasury management',
    'Corporate cards',
    'Expense automation',
    'Multi-entity payroll',
  ],
  tech: ['Payments API', 'KYC/AML SDK', 'Open banking connector', 'Embedded finance suite'],
  organic: ['Impact investing', 'ESG-screened funds', 'Carbon-offset spending', 'Ethical ISA'],
  retro: [
    'Community savings circles',
    'Fixed-rate bonds',
    'Member dividends',
    'Financial literacy hub',
  ],
};

const STYLE_TRUST_SIGNALS: Record<BrandStyle, string[]> = {
  minimal: [
    'FCA authorised',
    'FSCS protected up to £85,000',
    'Open banking certified',
    'ISO 27001',
  ],
  bold: ['Regulated & insured', 'Bank-grade security', '2M+ customers', 'Featured in TechCrunch'],
  elegant: [
    'Tier 1 capital ratio',
    'Private banking licence',
    'Discretionary investment authority',
    'UHNW specialist',
  ],
  playful: [
    'FCA registered',
    'Friendly fraud protection',
    'Free account guarantee',
    'App Store 4.9★',
  ],
  corporate: [
    'FCA authorised',
    'PCI DSS Level 1',
    'SOC 2 Type II',
    'SWIFT member',
    'G-SIB compliant',
  ],
  tech: [
    'PCI DSS Level 1',
    'SOC 2 Type II',
    '99.99% uptime SLA',
    'Open banking certified',
    'ISO 27001',
  ],
  organic: ['B Corp certified', 'FCA registered', 'FSCS protected', 'Carbon neutral operations'],
  retro: ['FCA authorised', 'FSCS protected', 'Mutual ownership model', 'Voted Most Trusted 2024'],
};

const STYLE_REGULATORY_FRAMEWORK: Record<BrandStyle, string[]> = {
  minimal: ['FCA Consumer Duty', 'PSD2 / Open Banking', 'GDPR', 'AML/KYC'],
  bold: ['FCA Consumer Duty', 'PSD2', 'GDPR', 'FCA financial promotions'],
  elegant: ['FCA CASS rules', 'MiFID II', 'GDPR', 'AML / Wolfsberg'],
  playful: ['FCA Consumer Duty', 'FCA financial promotions', 'GDPR', 'COPPA (under-18 products)'],
  corporate: [
    'FCA authorisation',
    'PSD2 / Open Banking',
    'GDPR',
    'Basel III capital rules',
    'DORA',
  ],
  tech: ['PCI DSS Level 1', 'PSD2 / Open Banking', 'GDPR', 'AML/KYC', 'FCA sandbox eligible'],
  organic: ['FCA registration', 'Sustainable Finance Disclosure Regulation', 'GDPR', 'EU Taxonomy'],
  retro: ['FCA authorisation', 'FSCS scheme rules', 'GDPR', 'FCA principle-based compliance'],
};

const STYLE_SECURITY_POSTURE: Record<BrandStyle, string[]> = {
  minimal: [
    'End-to-end encryption',
    'Biometric authentication',
    'Instant card freeze',
    'Real-time alerts',
  ],
  bold: ['256-bit encryption', 'Facial recognition', '3D Secure 2.0', 'Zero-liability fraud cover'],
  elegant: [
    'HSM key storage',
    'Multi-factor authentication',
    'Dedicated fraud team',
    'Discretionary portfolio segregation',
  ],
  playful: [
    'Face/fingerprint login',
    'Instant freeze button',
    'Spending notifications',
    'Friendly fraud promise',
  ],
  corporate: [
    'Zero-trust architecture',
    'SIEM & SOC monitoring',
    'Penetration tested quarterly',
    'Disaster recovery RTO <4h',
  ],
  tech: [
    'mTLS APIs',
    'Webhook signing keys',
    'Rate limiting & DDoS protection',
    'Bug bounty programme',
  ],
  organic: [
    'Privacy-by-design',
    'Minimal data collection',
    'Right to erasure',
    'No data selling pledge',
  ],
  retro: [
    'Chip-and-PIN verified',
    'Human fraud review team',
    'Community-verified transactions',
    'Full audit trail',
  ],
};

const STYLE_MESSAGING_PILLARS: Record<BrandStyle, string[]> = {
  minimal: ['Clarity over complexity', 'Your money, your control', 'No hidden fees'],
  bold: ['Break the old rules', 'Banking at the speed of life', 'More for your money'],
  elegant: ['Where wealth meets wisdom', 'Precision in every transaction', 'Exclusive by design'],
  playful: ['Money should be fun', 'Save more, stress less', 'Your wallet, your adventure'],
  corporate: ['Infrastructure you can trust', 'Built for scale', 'Compliance-first, always'],
  tech: ['Finance as code', 'Build with confidence', 'API-first, developer-loved'],
  organic: ['Banking with purpose', 'Your money doing good', 'Profit and planet aligned'],
  retro: [
    'Trusted since day one',
    'Old values, new technology',
    'Community-owned, community-grown',
  ],
};

function buildComplianceChecklist(safeStyle: BrandStyle): string[] {
  const base = [
    'FCA authorisation or registration obtained',
    'Consumer Duty implementation plan documented',
    'Financial promotions approved by authorised person',
    'AML/KYC onboarding procedures in place',
    'GDPR-compliant data processing agreements signed',
    'PCI DSS certification maintained (if card processing)',
    'Annual regulatory capital calculations filed',
    'Complaints handling procedure published',
  ];
  if (safeStyle === 'corporate' || safeStyle === 'elegant') {
    base.push('MiFID II suitability assessments', 'CASS client asset segregation audit');
  }
  if (safeStyle === 'tech') {
    base.push(
      'PSD2 strong customer authentication implemented',
      'Open banking API conformance tested',
      'Bug bounty programme in operation'
    );
  }
  if (safeStyle === 'organic') {
    base.push('SFDR disclosure published', 'EU Taxonomy alignment report');
  }
  return base;
}

function buildUserJourney(safeStyle: BrandStyle): string[] {
  const base = [
    'Discovery: SEO/social/referral acquisition',
    'Onboarding: KYC/AML identity verification (< 3 min)',
    'Activation: First transaction or product setup',
    'Engagement: Regular use of core product',
    'Expansion: Cross-sell to adjacent products',
    'Advocacy: Referral programme and reviews',
  ];
  if (safeStyle === 'tech') {
    base.splice(1, 0, 'Developer sign-up: API keys and sandbox access');
  }
  if (safeStyle === 'corporate') {
    base.splice(1, 0, 'Enterprise procurement: RFP response and PoC');
  }
  return base;
}

function buildBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  const products = STYLE_CORE_PRODUCTS[safeStyle];
  const pillar = STYLE_MESSAGING_PILLARS[safeStyle][0];
  return (
    `${brand.name}${taglinePart} is a ${safeStyle}-style fintech brand in ${brand.industry}. ` +
    `Core positioning: ${STYLE_POSITIONING[safeStyle].split('.')[0]}. ` +
    `Lead products: ${products[0]}, ${products[1]}. ` +
    `Primary messaging pillar: "${pillar}".`
  );
}

export function generateBrandFintech(brand: BrandIdentity): BrandFintechOutput {
  const safeStyle = resolveBrandStyle(brand.style);

  return {
    positioning: STYLE_POSITIONING[safeStyle],
    coreProducts: STYLE_CORE_PRODUCTS[safeStyle],
    trustSignals: STYLE_TRUST_SIGNALS[safeStyle],
    regulatoryFramework: STYLE_REGULATORY_FRAMEWORK[safeStyle],
    securityPosture: STYLE_SECURITY_POSTURE[safeStyle],
    messagingPillars: STYLE_MESSAGING_PILLARS[safeStyle],
    complianceChecklist: buildComplianceChecklist(safeStyle),
    userJourney: buildUserJourney(safeStyle),
    fintechBriefSummary: buildBriefSummary(brand, safeStyle),
  };
}
