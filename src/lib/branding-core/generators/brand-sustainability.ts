import type { BrandIdentity, BrandStyle, BrandSustainabilityOutput } from '../../types.js';

const STYLE_ESG_APPROACH: Record<BrandStyle, string> = {
  minimal:
    'Embed sustainability quietly through material choices and operational efficiency without overt messaging',
  bold: 'Lead loudly with sustainability as a core differentiator and brand promise',
  elegant:
    'Integrate sustainability as a mark of quality and longevity, emphasising craftsmanship and durability',
  playful:
    'Make sustainability fun and accessible through gamification, community challenges, and vibrant storytelling',
  corporate:
    'Align ESG reporting with investor expectations, regulatory compliance, and stakeholder governance',
  tech: 'Quantify environmental impact with data dashboards, carbon APIs, and open-source sustainability tooling',
  organic:
    'Root every decision in regenerative principles, circular economy, and deep ecological stewardship',
  retro:
    'Champion repair culture, vintage sourcing, and nostalgia-driven anti-consumption narratives',
};

const STYLE_ENVIRONMENTAL: Record<BrandStyle, string[]> = {
  minimal: [
    'Source materials with verified low-impact supply chains',
    'Eliminate single-use packaging across all product lines',
    'Target carbon neutrality by measuring and offsetting Scope 1 and 2 emissions',
    'Publish annual environmental impact report',
    'Partner with certified B Corp suppliers',
  ],
  bold: [
    'Commit publicly to net-zero emissions with science-based targets (SBTi)',
    'Use 100% renewable energy in owned operations',
    'Launch a take-back and refurbishment programme',
    'Carbon-label every product and service',
    'Invest in carbon removal projects beyond offsets',
  ],
  elegant: [
    'Source exclusively from artisans using traditional, low-impact techniques',
    'Use natural, biodegradable, or infinitely recyclable materials',
    'Design for longevity — offer lifetime repair guarantees',
    'Offset full supply chain emissions including Scope 3',
    'Partner with conservation charities for forest and ocean preservation',
  ],
  playful: [
    'Gamify recycling with rewards and community leaderboards',
    'Plant a tree for every purchase through a verified reforestation partner',
    'Use bio-based and compostable packaging',
    'Share monthly sustainability progress in social-first content',
    'Run annual community clean-up events tied to brand campaigns',
  ],
  corporate: [
    'Report against GRI, SASB, or TCFD frameworks annually',
    'Set verified science-based emissions targets (SBTi)',
    'Conduct annual Scope 1, 2, and 3 GHG inventory audits',
    'Establish a Board-level ESG committee with independent oversight',
    'Disclose climate-related financial risks in annual report',
  ],
  tech: [
    'Measure and publish real-time carbon footprint via API',
    'Optimise data-centre energy use with renewable PPAs and efficiency tooling',
    'Open-source sustainability measurement methodologies',
    'Use green cloud providers with verified renewable energy commitments',
    'Achieve ISO 14001 environmental management certification',
  ],
  organic: [
    'Adopt regenerative agriculture and sourcing practices',
    'Eliminate all synthetic chemicals from supply chain',
    'Achieve certified organic, Fairtrade, or Rainforest Alliance status',
    'Use closed-loop water management in manufacturing',
    'Restore biodiversity through habitat partnerships',
  ],
  retro: [
    'Prioritise secondhand, vintage, and deadstock materials',
    'Offer free repair and upcycling workshops',
    'Use zero-waste production techniques',
    'Source locally to minimise transport emissions',
    'Educate community on the value of making things last',
  ],
};

const STYLE_SOCIAL: Record<BrandStyle, string[]> = {
  minimal: [
    'Pay living wages across the supply chain',
    'Maintain an inclusive hiring policy with measurable diversity targets',
    'Provide flexible working arrangements to improve employee wellbeing',
    'Donate 1% of revenue to community causes',
  ],
  bold: [
    'Champion underrepresented founders through grant and mentorship programmes',
    'Publish full pay-equity audit annually',
    'Commit 5% of profits to social impact initiatives',
    'Amplify marginalised voices in all brand storytelling',
  ],
  elegant: [
    'Support artisan communities through fair-trade partnerships',
    'Provide craft apprenticeships and skills preservation programmes',
    'Fund cultural heritage and arts organisations',
    'Ensure ethical luxury standards across every tier of the supply chain',
  ],
  playful: [
    'Make sustainability education entertaining for younger audiences',
    'Partner with youth organisations and schools',
    "Donate a percentage of every sale to children's environmental charities",
    'Create inclusive, accessible products and experiences for all abilities',
  ],
  corporate: [
    'Publish DEI targets and annual progress metrics',
    'Maintain Board diversity at or above industry benchmarks',
    'Uphold ILO labour standards throughout global supply chain',
    'Invest in community economic development programmes',
  ],
  tech: [
    'Bridge the digital divide through device donation and digital literacy programmes',
    'Promote responsible AI ethics and algorithmic transparency',
    'Build accessible products meeting WCAG 2.2 AA as a minimum',
    'Sponsor open-source communities and maintainers',
  ],
  organic: [
    'Ensure fair wages and safe conditions for all farmers and growers',
    'Invest in rural community development and food sovereignty',
    'Support women-led cooperatives in sourcing regions',
    'Practise radical transparency about supply chain conditions',
  ],
  retro: [
    'Create jobs through local repair and restoration workshops',
    'Support heritage craft skills and generational knowledge transfer',
    'Build community around the ethos of slow consumption',
    'Partner with social enterprises that provide work for marginalised groups',
  ],
};

const STYLE_GOVERNANCE: Record<BrandStyle, string[]> = {
  minimal: [
    'Maintain transparent ownership and governance structure',
    'Adopt a clear code of ethics for employees and suppliers',
    'Conduct annual third-party sustainability audit',
  ],
  bold: [
    'Become a certified B Corporation',
    'Embed sustainability KPIs in executive compensation',
    'Publish stakeholder impact report alongside financial accounts',
  ],
  elegant: [
    'Align with UN Global Compact principles',
    'Establish an independent Ethics Advisory Board',
    'Publish full supply chain transparency map',
  ],
  playful: [
    'Invite community votes on sustainability investments',
    'Share governance decisions openly on social channels',
    'Create a youth advisory panel for long-term sustainability planning',
  ],
  corporate: [
    'Comply with EU Corporate Sustainability Reporting Directive (CSRD)',
    'Publish Taskforce on Climate-related Financial Disclosures (TCFD) report',
    'Establish anti-corruption, whistleblower, and supplier code of conduct',
  ],
  tech: [
    'Adopt open governance for sustainability data and methodology',
    'Use blockchain or verifiable credentials for supply chain traceability',
    'Align AI usage with responsible AI frameworks (e.g., NIST AI RMF)',
  ],
  organic: [
    'Operate as a cooperative, social enterprise, or purpose-led legal structure',
    'Share profits equitably with supply chain partners',
    'Publish radical supply chain transparency including pricing',
  ],
  retro: [
    'Operate with a community-owned or worker-owned model where possible',
    'Reject planned obsolescence in product design policy',
    'Embed longevity and repairability into product governance standards',
  ],
};

const STYLE_CERTIFICATIONS: Record<BrandStyle, string[]> = {
  minimal: ['ISO 14001', 'Carbon Neutral certification', 'Living Wage accreditation'],
  bold: ['B Corp', 'SBTi verified', '1% for the Planet member'],
  elegant: ['Fairtrade', 'Rainforest Alliance', 'Positive Luxury Butterfly Mark'],
  playful: ['B Corp', '1% for the Planet', 'Social Enterprise accreditation'],
  corporate: ['GRI Standards', 'SASB aligned', 'TCFD disclosure', 'UN Global Compact signatory'],
  tech: ['ISO 14001', 'Green Web Foundation', 'Responsible AI certification'],
  organic: ['Certified Organic (USDA/EU)', 'Fairtrade', 'Regenerative Organic Certified'],
  retro: ['Social Enterprise UK', 'Fair Wear Foundation', 'Climate Pledge Friendly'],
};

const STYLE_REPORTING: Record<BrandStyle, string> = {
  minimal: 'Annual sustainability summary embedded in company report',
  bold: 'Bold annual impact report with third-party verification and public dashboard',
  elegant: 'Narrative impact report aligned with UN SDGs, distributed to stakeholders',
  playful: 'Interactive digital impact report shared on social with community milestones',
  corporate: 'Formal ESG report aligned with GRI/SASB/TCFD, reviewed by Board ESG committee',
  tech: 'Real-time public sustainability dashboard with open data APIs',
  organic: 'Radical transparency report covering full supply chain with traceability',
  retro: 'Community newsletter-style impact report celebrating repair and reuse milestones',
};

function buildSdgAlignment(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const baseGoals = [
    'SDG 12: Responsible Consumption and Production',
    'SDG 13: Climate Action',
    'SDG 17: Partnerships for the Goals',
  ];

  const styleGoals: Partial<Record<BrandStyle, string[]>> = {
    bold: ['SDG 7: Affordable and Clean Energy', 'SDG 9: Industry, Innovation and Infrastructure'],
    organic: ['SDG 2: Zero Hunger', 'SDG 15: Life on Land', 'SDG 6: Clean Water and Sanitation'],
    corporate: [
      'SDG 8: Decent Work and Economic Growth',
      'SDG 16: Peace, Justice and Strong Institutions',
    ],
    tech: ['SDG 9: Industry, Innovation and Infrastructure', 'SDG 10: Reduced Inequalities'],
    playful: ['SDG 4: Quality Education', 'SDG 10: Reduced Inequalities'],
    elegant: [
      'SDG 11: Sustainable Cities and Communities',
      'SDG 8: Decent Work and Economic Growth',
    ],
    retro: [
      'SDG 11: Sustainable Cities and Communities',
      'SDG 12: Responsible Consumption (repair focus)',
    ],
    minimal: [],
  };

  return [...baseGoals, ...(styleGoals[style] ?? [])];
}

function buildBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const taglinePart = brand.tagline ? ` ("${brand.tagline}")` : '';
  const approach = STYLE_ESG_APPROACH[style] ?? STYLE_ESG_APPROACH.minimal;
  return (
    `${brand.name}${taglinePart} — ${style} brand operating in ${brand.industry}. ` +
    `Sustainability approach: ${approach.slice(0, 120)}...`
  );
}

export function generateBrandSustainability(brand: BrandIdentity): BrandSustainabilityOutput {
  const style: BrandStyle = brand.style ?? 'minimal';

  return {
    esgApproach: STYLE_ESG_APPROACH[style] ?? STYLE_ESG_APPROACH.minimal,
    environmentalCommitments: STYLE_ENVIRONMENTAL[style] ?? STYLE_ENVIRONMENTAL.minimal,
    socialCommitments: STYLE_SOCIAL[style] ?? STYLE_SOCIAL.minimal,
    governancePrinciples: STYLE_GOVERNANCE[style] ?? STYLE_GOVERNANCE.minimal,
    certifications: STYLE_CERTIFICATIONS[style] ?? STYLE_CERTIFICATIONS.minimal,
    sdgAlignment: buildSdgAlignment(brand),
    reportingFramework: STYLE_REPORTING[style] ?? STYLE_REPORTING.minimal,
    sustainabilityBriefSummary: buildBriefSummary(brand),
  };
}
