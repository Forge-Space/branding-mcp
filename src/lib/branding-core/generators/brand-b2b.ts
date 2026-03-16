import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandB2bOutput } from '../../types.js';

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

const STYLE_SALES_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Consultative selling with clear ROI focus and minimal sales friction',
  bold: 'High-energy outbound with strong value differentiation and urgency',
  elegant: 'Relationship-led enterprise sales with white-glove service positioning',
  playful: 'Solution-focused sales that makes complex decisions feel approachable',
  corporate: 'Process-driven enterprise sales with rigorous qualification and governance',
  tech: 'Product-led growth with self-serve trials and developer-champion strategy',
  organic: 'Trust-based advisory selling with values alignment as a differentiator',
  retro: 'Expertise-led consultative approach with proven methodology as the hook',
};

const STYLE_ICP_TRAITS: Record<BrandStyle, string[]> = {
  minimal: [
    'Mid-market companies 50-500 employees',
    'Efficiency-focused decision makers',
    'Lean teams seeking scalable solutions',
  ],
  bold: [
    'Growth-stage companies under transformation',
    'Ambitious C-suite sponsors',
    'Organisations disrupting their sector',
  ],
  elegant: [
    'Enterprise accounts 1000+ employees',
    'C-suite and VP-level economic buyers',
    'Regulated industries requiring premium trust signals',
  ],
  playful: [
    'SMB and startup innovators',
    'Product and marketing teams as champions',
    'Fast-moving companies with agile procurement',
  ],
  corporate: [
    'Large enterprises and government organisations',
    'Procurement and legal-led buying committees',
    'Risk-averse sectors: financial services, insurance, healthcare',
  ],
  tech: [
    'Developer-led organisations',
    'Engineering managers and CTOs as champions',
    'SaaS companies and digital-native businesses',
  ],
  organic: [
    'Purpose-driven businesses and B Corps',
    'HR and ESG-led buying groups',
    'Companies with public sustainability commitments',
  ],
  retro: [
    'Established businesses seeking modernisation',
    'Operators who value proven track records',
    'Niche industries with specialist requirements',
  ],
};

const STYLE_ABM_APPROACH: Record<BrandStyle, string> = {
  minimal: 'One-to-few ABM targeting clusters of similar accounts with personalised content',
  bold: 'One-to-one ABM for strategic accounts with bespoke landing pages and outreach',
  elegant:
    'One-to-one white-glove ABM with executive gifting, personalised research, and concierge outreach',
  playful: 'One-to-many ABM leveraging community signals and product-led growth loops',
  corporate: 'One-to-few ABM aligned to procurement cycles with compliance-focused messaging',
  tech: 'Product-led ABM with usage signals triggering sales outreach and developer nurture',
  organic: 'Values-aligned ABM focusing on sustainability metrics and shared mission signals',
  retro: 'Expertise-led ABM with deep-dive thought leadership targeting legacy operators',
};

const STYLE_SALES_MATERIALS: Record<BrandStyle, string[]> = {
  minimal: ['One-pager', 'ROI calculator', 'Case study PDF', 'Competitor battle card'],
  bold: ['Impact deck', 'Video testimonial reel', 'ROI guarantee document', 'Live demo script'],
  elegant: [
    'Executive briefing document',
    'Board-ready ROI model',
    'Reference customer roster',
    'Proposal template',
  ],
  playful: [
    'Interactive product tour',
    'Self-serve trial guide',
    'Slack community invite',
    'Onboarding checklist',
  ],
  corporate: [
    'RFP response template',
    'Security and compliance pack',
    'Implementation roadmap',
    'SLA documentation',
  ],
  tech: ['API documentation', 'Developer sandbox', 'Integration guide', 'Architecture diagram'],
  organic: [
    'Impact report',
    'Supplier code of conduct',
    'ESG alignment statement',
    'Mission alignment deck',
  ],
  retro: [
    'Case study booklet',
    'Methodology white paper',
    'Client reference list',
    'Proof-of-concept proposal',
  ],
};

const STYLE_BUYER_JOURNEY: Record<BrandStyle, string[]> = {
  minimal: ['Awareness via thought leadership', 'Trial or demo request', 'Proposal', 'Close'],
  bold: ['Outbound sequence', 'Demo', 'Proof of concept', 'Commercial negotiation', 'Close'],
  elegant: [
    'Executive introduction',
    'Discovery workshop',
    'Business case co-creation',
    'Pilot',
    'Board approval',
    'Contract',
  ],
  playful: ['Self-serve trial', 'Activation milestone', 'Expansion conversation', 'Close'],
  corporate: [
    'RFI response',
    'RFP submission',
    'Demo and due diligence',
    'Legal and procurement review',
    'Implementation plan',
    'Contract',
  ],
  tech: [
    'Developer trial',
    'Integration success',
    'Team adoption',
    'Expansion and enterprise upgrade',
  ],
  organic: [
    'Values alignment conversation',
    'Pilot with impact metrics',
    'Stakeholder alignment',
    'Partnership agreement',
  ],
  retro: [
    'Thought leadership engagement',
    'Consultancy scoping',
    'Proof of concept',
    'Phased rollout',
    'Contract renewal',
  ],
};

const STYLE_PARTNERSHIP_CHANNELS: Record<BrandStyle, string[]> = {
  minimal: ['Resellers', 'Referral partners', 'Technology integrations'],
  bold: ['Strategic alliances', 'Co-sell partners', 'Resellers'],
  elegant: ['Consulting firms', 'Systems integrators', 'Executive referral network'],
  playful: ['App marketplace partners', 'Community ambassadors', 'Integration ecosystem'],
  corporate: [
    'Government frameworks',
    'Approved supplier lists',
    'Systems integrators',
    'Managed service providers',
  ],
  tech: ['Cloud marketplace (AWS/Azure/GCP)', 'Developer ecosystem', 'SaaS integration partners'],
  organic: ['Ethical business networks', 'Certification body partners', 'NGO collaborations'],
  retro: ['Industry associations', 'Specialist consultants', 'Trade press partnerships'],
};

function buildSalesEnablementKit(brand: BrandIdentity, safeStyle: BrandStyle): string[] {
  const base = STYLE_SALES_MATERIALS[safeStyle];
  const extras: string[] = [];
  if (brand.industry?.toLowerCase().includes('tech')) {
    extras.push('Security questionnaire answers', 'SOC 2 / ISO 27001 summary');
  }
  if (brand.industry?.toLowerCase().includes('health')) {
    extras.push('HIPAA compliance statement', 'Clinical evidence summary');
  }
  if (safeStyle === 'corporate' || safeStyle === 'elegant') {
    extras.push('Executive briefing leave-behind', 'Stakeholder mapping template');
  }
  return [...base, ...extras];
}

function buildQualificationFramework(safeStyle: BrandStyle): Record<string, string> {
  const base: Record<string, string> = {
    methodology: safeStyle === 'corporate' ? 'MEDDIC' : safeStyle === 'tech' ? 'SPICED' : 'BANT',
    budget: 'Confirmed budget or budget cycle identified',
    authority: 'Economic buyer identified and engaged',
    need: 'Business problem validated with measurable impact',
    timeline: 'Decision timeline agreed within 90 days',
    champion: 'Internal champion with political capital identified',
  };
  if (safeStyle === 'tech') {
    base.technical_fit = 'API and integration requirements validated';
    base.expansion_potential = 'Usage-based growth path identified';
  }
  if (safeStyle === 'corporate') {
    base.procurement_process = 'RFP/RFQ requirements documented';
    base.compliance_requirements = 'Security and legal requirements gathered';
  }
  return base;
}

function buildSuccessMetrics(safeStyle: BrandStyle): Record<string, string> {
  const base: Record<string, string> = {
    pipeline_coverage: '3x quarterly target',
    win_rate: safeStyle === 'corporate' ? '>25%' : '>35%',
    average_deal_size: 'Track vs industry benchmark',
    sales_cycle_length: 'Trending down quarter-on-quarter',
    logo_retention: '>90% annual logo retention',
    net_revenue_retention: '>110% NRR',
  };
  if (safeStyle === 'tech') {
    base.trial_to_paid_conversion = '>20%';
    base.product_qualified_leads = 'PQL to SQL conversion >30%';
  }
  if (safeStyle === 'elegant' || safeStyle === 'corporate') {
    base.executive_sponsor_coverage = '1 C-suite contact per strategic account';
    base.qbr_completion_rate = '>80% of enterprise accounts';
  }
  return base;
}

function buildBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const icp = STYLE_ICP_TRAITS[safeStyle][0];
  const approach = STYLE_SALES_APPROACH[safeStyle].split('.')[0];
  const abm = STYLE_ABM_APPROACH[safeStyle].split(' ').slice(0, 6).join(' ');
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return `${brand.name}${taglinePart} targets ${icp}. Sales approach: ${approach}. ABM strategy: ${abm}. Channels: ${STYLE_PARTNERSHIP_CHANNELS[safeStyle].slice(0, 2).join(', ')}.`;
}

export function generateBrandB2b(brand: BrandIdentity): BrandB2bOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    salesApproach: STYLE_SALES_APPROACH[safeStyle],
    idealCustomerProfile: STYLE_ICP_TRAITS[safeStyle],
    abmStrategy: STYLE_ABM_APPROACH[safeStyle],
    buyerJourney: STYLE_BUYER_JOURNEY[safeStyle],
    salesEnablementKit: buildSalesEnablementKit(brand, safeStyle),
    qualificationFramework: buildQualificationFramework(safeStyle),
    partnerChannels: STYLE_PARTNERSHIP_CHANNELS[safeStyle],
    successMetrics: buildSuccessMetrics(safeStyle),
    b2bBriefSummary: buildBriefSummary(brand, safeStyle),
  };
}
