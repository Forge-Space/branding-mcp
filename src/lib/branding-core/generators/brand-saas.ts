import type { BrandIdentity, BrandStyle, BrandSaasOutput } from '../../types.js';

const VALID_STYLES = new Set<BrandStyle>([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

const STYLE_POSITIONING: Record<BrandStyle, string> = {
  minimal: 'Simple, focused software that removes complexity and gets out of the way.',
  bold: 'Powerful, high-energy platform that drives measurable results fast.',
  elegant: 'Premium, beautifully crafted software for discerning professionals.',
  playful: 'Delightfully fun tool that makes work feel less like work.',
  corporate: 'Enterprise-grade solution built for scale, compliance, and governance.',
  tech: 'Developer-first platform with powerful APIs, extensibility, and open-source DNA.',
  organic: 'Purposeful software that respects your data, values, and the planet.',
  retro: 'Thoughtfully nostalgic tool with timeless UX and proven reliability.',
};

const STYLE_PRICING_MODEL: Record<BrandStyle, string[]> = {
  minimal: ['Flat-rate simplicity', 'One plan, all features', 'No per-seat surprises'],
  bold: ['Usage-based pricing', 'Scales with your growth', 'No artificial limits'],
  elegant: [
    'Bespoke pricing on request',
    'White-glove onboarding included',
    'Annual contracts preferred',
  ],
  playful: ['Freemium with generous free tier', 'Pay as you play', 'Team plans with fun perks'],
  corporate: [
    'Volume licensing',
    'ELA (Enterprise License Agreement) option',
    'Dedicated CSM from 500 seats',
  ],
  tech: [
    'Free tier for individuals',
    'Developer Pro tier',
    'Team and Enterprise tiers',
    'OSS sponsors discount',
  ],
  organic: ['Fair pricing, no hidden fees', 'Non-profit discount 50%', 'B Corp pricing programme'],
  retro: [
    'Perpetual licence option',
    'Subscription with annual discount',
    'Lifetime deal for early adopters',
  ],
};

const STYLE_ONBOARDING: Record<BrandStyle, string[]> = {
  minimal: ['Zero-config setup', 'Import in 60 seconds', 'Interactive quick-start guide'],
  bold: [
    'Guided activation wizard',
    'Video walkthroughs for each feature',
    'Live chat onboarding support',
  ],
  elegant: [
    'Dedicated onboarding consultant',
    'White-label welcome portal',
    'Customised training sessions',
  ],
  playful: [
    'Gamified onboarding checklist',
    'Confetti rewards on milestones',
    'Buddy system pairing',
  ],
  corporate: [
    'Implementation project manager',
    'Change management playbook',
    'Admin console training',
    'SSO and directory sync setup',
  ],
  tech: [
    'API quickstart docs',
    'SDK scaffolding CLI',
    'GitHub integration in 5 min',
    'Developer sandbox environment',
  ],
  organic: [
    'Self-paced learning library',
    'Community-led onboarding webinars',
    'Eco impact dashboard tour',
  ],
  retro: ['Printable getting-started guide', 'Video tutorial library', 'Vintage help-desk chat'],
};

const STYLE_RETENTION_TACTICS: Record<BrandStyle, string[]> = {
  minimal: [
    'Weekly digest of key metrics',
    'Frictionless renewal flow',
    'Pause instead of cancel option',
  ],
  bold: ['Power user of the month spotlight', 'Feature unlock milestones', 'ROI calculator in-app'],
  elegant: [
    'Quarterly executive business reviews',
    'Exclusive product roadmap previews',
    'Concierge renewal process',
  ],
  playful: [
    'Streak rewards and badges',
    'Seasonal challenges',
    'Referral programme with gift cards',
  ],
  corporate: [
    'Dedicated customer success manager',
    'Quarterly health-check reports',
    'Executive sponsor programme',
    'Annual user conference invitation',
  ],
  tech: [
    'Developer changelog digest',
    'Beta tester programme',
    'Open-source contribution credits',
    'API usage dashboards',
  ],
  organic: [
    'Impact report showing environmental savings',
    'Community forum engagement score',
    'Values-aligned renewal messaging',
  ],
  retro: ['Loyalty anniversary perks', 'Print newsletter for power users', 'Vintage reward badges'],
};

const STYLE_INTEGRATIONS: Record<BrandStyle, string[]> = {
  minimal: ['Zapier', 'Webhooks', 'CSV import/export'],
  bold: ['Salesforce', 'HubSpot', 'Slack', 'Microsoft Teams', 'Zapier'],
  elegant: ['Salesforce', 'Microsoft 365', 'SAP', 'Custom API', 'White-label SSO'],
  playful: ['Slack', 'Notion', 'Figma', 'Zapier', 'Discord'],
  corporate: ['SAP', 'Workday', 'Salesforce', 'ServiceNow', 'LDAP/SCIM', 'Okta'],
  tech: ['GitHub', 'GitLab', 'Jira', 'CI/CD pipelines', 'Terraform', 'REST & GraphQL APIs', 'SDKs'],
  organic: ['Google Workspace', 'Mailchimp', 'Stripe', 'Carbon footprint APIs'],
  retro: ['Email import', 'CSV/Excel', 'Zapier', 'Browser extension'],
};

const STYLE_SUPPORT_MODEL: Record<BrandStyle, string> = {
  minimal: 'Self-serve knowledge base with community forum and email support.',
  bold: 'Live chat during business hours, dedicated Slack channel for paying customers.',
  elegant: 'Named account manager, priority phone support, and SLA-backed response times.',
  playful: 'In-app chat support with friendly tone, community Discord, and live office hours.',
  corporate: '24/7 enterprise support with P1 hotline, dedicated CSM, and SLA guarantees.',
  tech: 'GitHub Issues for OSS, developer forum, Slack community, and Pro email support.',
  organic: 'Community-first support via forum, async email, and volunteer-run live sessions.',
  retro: 'Email support with 24-hour response pledge and a curated FAQ library.',
};

function buildTrialStrategy(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const trialMap: Record<BrandStyle, string> = {
    minimal: '14-day free trial, no credit card required.',
    bold: '7-day trial with full access and a personalised kick-off call.',
    elegant: '30-day pilot programme with a dedicated success consultant.',
    playful: 'Free tier forever; upgrade when you need more.',
    corporate: 'Proof-of-concept engagement for 30 days with enterprise-tier access.',
    tech: 'Free tier with API access; unlimited dev sandboxes for 30 days.',
    organic: '30-day trial with full transparency on data usage and exit portability.',
    retro: '21-day free trial; lifetime licence option for committed users.',
  };
  return trialMap[safeStyle];
}

function buildChurnSignals(safeStyle: BrandStyle): string[] {
  const base = [
    'Login frequency drops below once per week',
    'Feature adoption rate under 30% of core workflows',
    'Support ticket volume spike with negative sentiment',
    'Invoice payment delay or failed renewal',
    'Key champion changes role or leaves company',
  ];
  if (safeStyle === 'tech') {
    base.push('API call volume drops > 50% week-over-week');
    base.push('GitHub integration disconnected');
  }
  if (safeStyle === 'corporate' || safeStyle === 'elegant') {
    base.push('Executive sponsor disengagement from QBRs');
    base.push('Procurement team requests data export');
  }
  return base;
}

function buildComplianceCertifications(safeStyle: BrandStyle): string[] {
  const base = [
    'SOC 2 Type II',
    'GDPR compliant',
    'CCPA compliant',
    'Data Processing Agreement (DPA) available',
  ];
  if (safeStyle === 'corporate' || safeStyle === 'elegant') {
    base.push('ISO 27001 certified', 'HIPAA BAA available', 'FedRAMP ready');
  }
  if (safeStyle === 'tech') {
    base.push('SLSA Level 2 supply chain security', 'Bug bounty programme (HackerOne)');
  }
  if (safeStyle === 'organic') {
    base.push('Privacy-first architecture (no third-party ad tracking)', 'B Corp certified');
  }
  return base;
}

function buildSaasBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const pricing = (STYLE_PRICING_MODEL[safeStyle] ?? STYLE_PRICING_MODEL.minimal)[0];
  const integration = (STYLE_INTEGRATIONS[safeStyle] ?? STYLE_INTEGRATIONS.minimal)
    .slice(0, 2)
    .join(' and ');
  const taglinePart = brand.tagline ? ` \u2014 "${brand.tagline}"` : '';
  return `${brand.name}${taglinePart} is a ${brand.industry} SaaS platform. Positioning: ${STYLE_POSITIONING[safeStyle]} Pricing approach: ${pricing}. Key integrations: ${integration}. Support: ${STYLE_SUPPORT_MODEL[safeStyle]}`;
}

export function generateBrandSaas(brand: BrandIdentity): BrandSaasOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    positioning: STYLE_POSITIONING[safeStyle],
    pricingModel: STYLE_PRICING_MODEL[safeStyle] ?? STYLE_PRICING_MODEL.minimal,
    trialStrategy: buildTrialStrategy(brand, safeStyle),
    onboardingFlow: STYLE_ONBOARDING[safeStyle] ?? STYLE_ONBOARDING.minimal,
    retentionTactics: STYLE_RETENTION_TACTICS[safeStyle] ?? STYLE_RETENTION_TACTICS.minimal,
    keyIntegrations: STYLE_INTEGRATIONS[safeStyle] ?? STYLE_INTEGRATIONS.minimal,
    supportModel: STYLE_SUPPORT_MODEL[safeStyle],
    churnWarningSignals: buildChurnSignals(safeStyle),
    complianceCertifications: buildComplianceCertifications(safeStyle),
    saasBriefSummary: buildSaasBriefSummary(brand, safeStyle),
  };
}
