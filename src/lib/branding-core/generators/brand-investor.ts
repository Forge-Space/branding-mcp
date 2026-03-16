import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandInvestorOutput, InvestorDeckSlide } from '../../types.js';

const STYLE_INVESTOR_TONE: Record<BrandStyle, string> = {
  minimal: 'Precise, data-driven, and understated — let metrics speak',
  bold: 'Confident and high-energy — lead with vision and scale',
  elegant: 'Sophisticated and refined — emphasise heritage and premium positioning',
  playful: 'Energetic and founder-led — emphasise culture and community traction',
  corporate: 'Formal and institutional — stress governance, risk management, and returns',
  tech: 'Technical depth first — lead with IP, architecture, and developer traction',
  organic: 'Mission-led and impact-first — tie financial returns to ESG outcomes',
  retro: 'Authentic and differentiated — lean into category nostalgia and loyal community',
};

const STYLE_INVESTMENT_THESIS: Record<BrandStyle, string> = {
  minimal:
    'A capital-efficient, high-margin business with a clear path to profitability built on exceptional unit economics.',
  bold: 'A category-defining company capturing a massive market with an unfair distribution advantage and compounding network effects.',
  elegant:
    'A premium brand commanding pricing power in a defensible niche with loyal, high-LTV customers.',
  playful:
    'A community-driven brand with viral loops and passionate advocates driving low-CAC organic growth.',
  corporate:
    'A resilient, enterprise-grade platform with long-term contracts, high switching costs, and predictable ARR.',
  tech: 'A technical moat built on proprietary data and infrastructure, enabling winner-take-most dynamics.',
  organic:
    'An impact-driven business aligning financial returns with measurable ESG outcomes and a mission-loyal customer base.',
  retro:
    'A differentiated brand reviving timeless value in an underserved segment with passionate community economics.',
};

const STYLE_COMPETITIVE_MOAT: Record<BrandStyle, string[]> = {
  minimal: ['Operational efficiency', 'Superior unit economics', 'Capital-efficient growth model'],
  bold: ['Brand recognition and category leadership', 'Network effects', 'Distribution at scale'],
  elegant: [
    'Premium pricing power',
    'High-LTV loyal customer base',
    'Brand heritage and exclusivity',
  ],
  playful: [
    'Community flywheel',
    'Viral and organic acquisition',
    'Founder authenticity and brand affinity',
  ],
  corporate: [
    'Enterprise contracts and high switching costs',
    'Regulatory compliance expertise',
    'Established trust with procurement teams',
  ],
  tech: [
    'Proprietary technology and IP',
    'Developer ecosystem and integrations',
    'Data advantages and compounding model accuracy',
  ],
  organic: [
    'Mission-alignment driving loyalty',
    'ESG certifications as defensible differentiators',
    'Impact storytelling attracting conscious capital',
  ],
  retro: [
    'Cultural authenticity and nostalgia',
    'Community-driven brand equity',
    'Underserved segment with low competition',
  ],
};

const STYLE_USE_OF_FUNDS: Record<BrandStyle, string[]> = {
  minimal: [
    'Product refinement and automation',
    'Lean go-to-market expansion',
    'Talent for key roles',
  ],
  bold: ['Performance marketing scale', 'International expansion', 'Strategic M&A pipeline'],
  elegant: [
    'Flagship experience investment',
    'Wholesale and retail expansion',
    'Brand marketing and editorial',
  ],
  playful: [
    'Community platform development',
    'Creator and ambassador programmes',
    'New product lines driven by community feedback',
  ],
  corporate: [
    'Enterprise sales team build-out',
    'Compliance and security infrastructure',
    'Customer success and implementation teams',
  ],
  tech: [
    'Engineering and R&D headcount',
    'Infrastructure and platform scalability',
    'Developer relations and ecosystem growth',
  ],
  organic: [
    'Supply chain transparency tools',
    'Certification and audit programmes',
    'Impact measurement and reporting infrastructure',
  ],
  retro: [
    'Production and craft quality investment',
    'Community events and heritage storytelling',
    'Selective retail placement',
  ],
};

const STYLE_INVESTOR_PROFILE: Record<BrandStyle, string[]> = {
  minimal: [
    'Seed and Series A VCs with B2B SaaS focus',
    'Revenue-based financing providers',
    'Angel investors with operator backgrounds',
  ],
  bold: [
    'Consumer growth funds',
    'Tiger Global-style momentum investors',
    'Strategic corporate VCs in adjacent markets',
  ],
  elegant: [
    'Luxury and lifestyle funds',
    'Family offices with portfolio brand experience',
    'Impact investors with premium brand focus',
  ],
  playful: [
    'Consumer and social commerce funds',
    'Creator economy VCs',
    'Community-led growth focused angels',
  ],
  corporate: [
    'Enterprise SaaS VCs',
    'Growth equity firms',
    'Strategic investors from regulated industries',
  ],
  tech: [
    'Deep tech and developer-tools VCs',
    'AI/ML focused funds',
    'Infrastructure and platform investors',
  ],
  organic: [
    'Impact funds and ESG-mandated LPs',
    'Regenerative agriculture and wellness investors',
    'B Corp and mission-aligned strategics',
  ],
  retro: [
    'Consumer heritage brand funds',
    'Direct-to-consumer specialists',
    'Nostalgia and lifestyle angels',
  ],
};

function buildInvestorDeck(brand: BrandIdentity, style: BrandStyle): InvestorDeckSlide[] {
  const thesis = STYLE_INVESTMENT_THESIS[style] ?? STYLE_INVESTMENT_THESIS.minimal;
  const moat = STYLE_COMPETITIVE_MOAT[style] ?? STYLE_COMPETITIVE_MOAT.minimal;
  return [
    {
      slide: 'Cover',
      headline: `${brand.name}${brand.tagline ? ` — ${brand.tagline}` : ''}`,
      bullets: ['Confidential investor presentation', 'Series funding round'],
      speakerNotes: 'Open with the one-sentence company description and the ask.',
    },
    {
      slide: 'The Problem',
      headline: `The ${brand.industry} market has a gap worth solving`,
      bullets: [
        'Quantify the pain point with a credible market stat',
        'Describe who suffers and how frequently',
        'Explain why existing solutions fall short',
      ],
      speakerNotes: 'Make the audience feel the problem viscerally before showing your solution.',
    },
    {
      slide: 'Our Solution',
      headline: brand.tagline ?? `${brand.name} solves this`,
      bullets: [
        `${brand.name} delivers the outcome customers have been waiting for`,
        'Simple, fast, and built for the target audience',
        'Key differentiator versus status quo',
      ],
      speakerNotes:
        'Lead with customer outcomes, not features. Show a product screenshot if possible.',
    },
    {
      slide: 'Market Opportunity',
      headline: 'A large and growing market',
      bullets: [
        'TAM: Total addressable market with source',
        'SAM: Serviceable addressable market — our realistic reach',
        'SOM: Target share in 3-5 years',
      ],
      speakerNotes: 'Be conservative and cite your sources. Bottom-up modelling is more credible.',
    },
    {
      slide: 'Investment Thesis',
      headline: 'Why now, why us',
      bullets: [thesis, moat[0] ?? 'First-mover advantage', 'Founder-market fit'],
      speakerNotes: "Connect timing, team, and technology into a coherent 'why now' narrative.",
    },
    {
      slide: 'Traction',
      headline: 'Proof points and momentum',
      bullets: [
        'Revenue or user growth (MoM/YoY)',
        'Key customer logos or case studies',
        'Net Promoter Score or retention metrics',
      ],
      speakerNotes: 'Lead with the single most impressive metric. Use a chart where possible.',
    },
    {
      slide: 'Business Model',
      headline: 'How we make money',
      bullets: [
        'Primary revenue model (subscription, transaction, licensing)',
        'Unit economics: CAC, LTV, payback period',
        'Gross margin profile and scalability',
      ],
      speakerNotes:
        'Show that you understand your economics deeply. Benchmarks vs. industry are compelling.',
    },
    {
      slide: 'Competitive Landscape',
      headline: 'Our defensible position',
      bullets: moat,
      speakerNotes: 'Use a 2x2 matrix or competitor table. Acknowledge competitors honestly.',
    },
    {
      slide: 'Go-To-Market',
      headline: 'How we acquire and retain customers',
      bullets: [
        'Primary acquisition channel and CAC',
        'Expansion and upsell strategy',
        'Key partnerships and distribution levers',
      ],
      speakerNotes: 'Show that you have already validated the primary channel at small scale.',
    },
    {
      slide: 'Team',
      headline: 'The right team for this problem',
      bullets: [
        'Founders: relevant domain expertise and prior wins',
        'Key hires in place and planned',
        'Board or advisors adding strategic value',
      ],
      speakerNotes:
        'Investors invest in people. Be specific about what makes this team uniquely qualified.',
    },
    {
      slide: 'Financials',
      headline: '3-year outlook',
      bullets: [
        'Current ARR/GMV and growth rate',
        'Path to break-even or profitability',
        '18-month milestones unlocked by this round',
      ],
      speakerNotes: 'Show a base case and upside case. Explain your key assumptions transparently.',
    },
    {
      slide: 'The Ask',
      headline: 'Funding round details',
      bullets: [
        STYLE_USE_OF_FUNDS[style]?.[0] ?? 'Product and engineering',
        STYLE_USE_OF_FUNDS[style]?.[1] ?? 'Go-to-market',
        'Milestone: [specific goal achieved with this capital]',
      ],
      speakerNotes:
        'Be specific about the amount, use of funds, and the milestone this capital unlocks.',
    },
  ];
}

function buildExecutiveSummary(brand: BrandIdentity, style: BrandStyle): string {
  const thesis = STYLE_INVESTMENT_THESIS[style] ?? STYLE_INVESTMENT_THESIS.minimal;
  const tagline = brand.tagline ? ` — "${brand.tagline}"` : '';
  return `${brand.name}${tagline} operates in the ${brand.industry} space. ${thesis} We are raising to accelerate the next phase of growth and are seeking aligned investors who understand our market and share our vision.`;
}

function buildDueDiligenceChecklist(): string[] {
  return [
    'Incorporation documents and cap table',
    'Audited or reviewed financial statements',
    'Customer contracts and churn data',
    'Intellectual property registrations and assignments',
    'Employee agreements and equity grants',
    'Data privacy and security policies',
    'Outstanding litigation or regulatory matters',
    'Board minutes and resolutions',
    'Insurance certificates',
    'Reference list: customers, partners, prior investors',
  ];
}

function buildFaqAnswers(brand: BrandIdentity, style: BrandStyle): Record<string, string> {
  const thesis = STYLE_INVESTMENT_THESIS[style] ?? STYLE_INVESTMENT_THESIS.minimal;
  return {
    why_now: `The ${brand.industry} market is at an inflection point. ${thesis}`,
    biggest_risk:
      'Execution risk is our primary challenge — we mitigate it with a focused roadmap and capital-efficient growth.',
    how_will_you_win: `Through ${(STYLE_COMPETITIVE_MOAT[style] ?? STYLE_COMPETITIVE_MOAT.minimal)[0]?.toLowerCase() ?? 'our competitive moat'} and deep customer relationships.`,
    what_does_success_look_like: `In 3 years, ${brand.name} is the recognised leader in our category with strong unit economics and a clear path to liquidity.`,
    exit_strategy:
      'We are building a durable, independent company. Strategic acquisition or IPO are both natural outcomes at scale.',
  };
}

export function generateBrandInvestor(brand: BrandIdentity): BrandInvestorOutput {
  const style: BrandStyle = (
    STYLE_INVESTOR_TONE[brand.style] ? brand.style : 'minimal'
  ) as BrandStyle;
  const tone = STYLE_INVESTOR_TONE[style] ?? STYLE_INVESTOR_TONE.minimal;
  const thesis = STYLE_INVESTMENT_THESIS[style] ?? STYLE_INVESTMENT_THESIS.minimal;
  const moat = STYLE_COMPETITIVE_MOAT[style] ?? STYLE_COMPETITIVE_MOAT.minimal;
  const useOfFunds = STYLE_USE_OF_FUNDS[style] ?? STYLE_USE_OF_FUNDS.minimal;
  const idealInvestors = STYLE_INVESTOR_PROFILE[style] ?? STYLE_INVESTOR_PROFILE.minimal;

  return {
    communicationTone: tone,
    investmentThesis: thesis,
    competitiveMoat: moat,
    useOfFunds,
    idealInvestorProfile: idealInvestors,
    executiveSummary: buildExecutiveSummary(brand, style),
    investorDeck: buildInvestorDeck(brand, style),
    dueDiligenceChecklist: buildDueDiligenceChecklist(),
    faqAnswers: buildFaqAnswers(brand, style),
    investorBriefSummary: `${brand.name} investor brief: ${tone.split(' — ')[0]}. ${thesis.slice(0, 80)}...`,
  };
}
