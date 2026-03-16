import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandPartnershipOutput, PartnershipTier, CollaborationFormat } from '../../types.js';

const STYLE_PARTNERSHIP_APPROACH: Record<BrandStyle, string> = {
  minimal:
    'Selective, values-aligned partnerships that enhance simplicity and quality. Prefer deep, long-term collaborations over volume.',
  bold: 'High-impact co-branding with market leaders. Seek partnerships that amplify reach and create buzz through shared energy.',
  elegant:
    'Curated luxury partnerships with heritage brands. Focus on exclusivity, craftsmanship, and elevated shared experiences.',
  playful:
    'Creative collaborations with culturally relevant brands and artists. Prioritise fun, surprise, and community engagement.',
  corporate:
    'Strategic B2B alliances that drive measurable business value. Focus on credibility, compliance, and enterprise-grade partners.',
  tech: 'Developer ecosystem and API partnerships. Prioritise integrations, open-source sponsorships, and platform co-creation.',
  organic:
    'Mission-driven partnerships with sustainability and wellness brands. Align on ethics, sourcing, and regenerative practices.',
  retro:
    'Nostalgia-forward collaborations with heritage brands and pop-culture properties. Celebrate craft, authenticity, and storytelling.',
};

const STYLE_IDEAL_PARTNER_PROFILES: Record<BrandStyle, string[]> = {
  minimal: [
    'Design-forward product brands',
    'Craft and artisan makers',
    'Architecture and interior studios',
    'Premium stationery labels',
  ],
  bold: [
    'Sports and energy brands',
    'Streetwear and sneaker labels',
    'Music and entertainment platforms',
    'High-growth DTC consumer brands',
  ],
  elegant: [
    'Luxury hospitality and hotel groups',
    'Fine jewellery and watchmakers',
    'High-end fashion houses',
    'Premium automotive brands',
  ],
  playful: [
    'Animation studios and IP holders',
    'Gaming companies and esports leagues',
    'Lifestyle and wellness apps',
    'Independent artists and illustrators',
  ],
  corporate: [
    'Enterprise SaaS and cloud providers',
    'Professional services firms',
    'Industry associations and trade bodies',
    'Management consulting firms',
  ],
  tech: [
    'Developer tools and platforms',
    'Open-source foundations',
    'AI and data infrastructure companies',
    'Hardware and IoT device makers',
  ],
  organic: [
    'Certified B-Corp brands',
    'Regenerative agriculture companies',
    'Environmental non-profits',
    'Zero-waste lifestyle brands',
  ],
  retro: [
    'Heritage fashion and workwear labels',
    'Vinyl record labels and music archives',
    'Vintage automotive brands',
    'Independent print media and zines',
  ],
};

const STYLE_COLLABORATION_THEMES: Record<BrandStyle, string[]> = {
  minimal: ['Capsule product collection', 'Co-authored white paper', 'Joint design residency'],
  bold: ['Limited-edition drop', 'Stadium activation', 'Viral content series'],
  elegant: ['Private event series', 'Bespoke product collaboration', 'Members-only access program'],
  playful: [
    'Limited-edition toy or collectible',
    'Interactive campaign challenge',
    'Character crossover',
  ],
  corporate: ['Thought leadership summit', 'Joint case study', 'Enterprise bundle offering'],
  tech: ['API integration launch', 'Developer hackathon', 'Open-source co-contribution'],
  organic: [
    'Sustainability pledge programme',
    'Community planting initiative',
    'Circular product swap',
  ],
  retro: ['Archive-inspired limited release', 'Documentary mini-series', 'Pop-up vintage market'],
};

const STYLE_PARTNER_VALUE_EXCHANGE: Record<BrandStyle, string> = {
  minimal:
    'Design credibility, access to discerning audiences, and co-curated editorial opportunities.',
  bold: 'Audience amplification, cultural cache, and high-energy co-marketing activation budgets.',
  elegant: 'Prestige association, access to affluent clientele, and exclusive event experiences.',
  playful: 'Creative ideation, community virality, and shared fan engagement across platforms.',
  corporate: 'Enterprise leads, joint RFP opportunities, and credibility in regulated verticals.',
  tech: 'Developer community access, technical co-innovation, and platform distribution reach.',
  organic: 'Mission alignment, ethical supply chain credibility, and values-driven PR coverage.',
  retro: 'Cultural storytelling, heritage authenticity, and cross-generational audience access.',
};

const STYLE_SCREENING_CRITERIA: Record<BrandStyle, string[]> = {
  minimal: [
    'Shared commitment to quality over quantity',
    'Complementary aesthetic without overlap',
    'Long-term brand vision alignment',
  ],
  bold: [
    'Comparable or larger audience size',
    'Demonstrated willingness to take creative risk',
    'Strong social and cultural presence',
  ],
  elegant: [
    'Heritage or prestige positioning',
    'Strict quality and exclusivity standards',
    'Alignment on luxury customer expectations',
  ],
  playful: [
    'Cultural resonance with target community',
    'Creative openness and collaborative spirit',
    'Brand safety within entertainment standards',
  ],
  corporate: [
    'Financial stability and enterprise credibility',
    'Regulatory and compliance alignment',
    'Defined contractual success metrics',
  ],
  tech: [
    'API reliability and developer-friendliness',
    'Open-source commitment or ecosystem fit',
    'Security and data privacy standards',
  ],
  organic: [
    'Verified sustainability certifications',
    'Transparent supply chain disclosure',
    'Shared regenerative business mission',
  ],
  retro: [
    'Authentic heritage or archive provenance',
    'Storytelling-first brand narrative',
    'Respect for craft and original aesthetics',
  ],
};

function buildPartnershipTiers(brand: BrandIdentity): PartnershipTier[] {
  const { style } = brand;

  return [
    {
      tier: 'Strategic',
      description:
        'Long-term, deeply integrated co-branding and joint go-to-market initiatives with high brand alignment.',
      commitment: '12\u201324 months',
      investmentLevel: 'High',
      benefits: [
        'Exclusive co-branded product or service',
        'Shared marketing budget and media buys',
        'Joint executive sponsorship',
        'Co-authored thought leadership',
        'Revenue-sharing arrangement',
      ],
      requirements: [
        'Formal partnership agreement',
        'Dedicated team on both sides',
        'Quarterly business reviews',
        'Brand guidelines compliance audit',
      ],
    },
    {
      tier: 'Preferred',
      description:
        'Recurring collaboration with aligned brands for campaigns, events, or seasonal activations.',
      commitment: '6\u201312 months',
      investmentLevel: 'Medium',
      benefits: [
        'Co-branded campaign assets',
        'Cross-promotional social content',
        'Event co-sponsorship',
        'Shared PR and press outreach',
      ],
      requirements: [
        'Letter of intent or MOU',
        'Shared campaign brief and KPIs',
        'Regular check-in cadence',
      ],
    },
    {
      tier: 'Affiliate',
      description: `Entry-level partnership for ${style === 'tech' ? 'API integrations and developer tools' : 'referral programmes and limited promotions'}.`,
      commitment: '3\u20136 months (renewable)',
      investmentLevel: 'Low',
      benefits: [
        'Referral or revenue commission',
        'Directory or marketplace listing',
        'Social mention or spotlight feature',
      ],
      requirements: [
        'Online application and approval',
        'Brand safety review',
        'Tracking link or integration setup',
      ],
    },
  ];
}

function buildCollaborationFormats(brand: BrandIdentity): CollaborationFormat[] {
  const { style } = brand;
  const themes = STYLE_COLLABORATION_THEMES[style] ?? STYLE_COLLABORATION_THEMES.minimal;

  return [
    {
      format: 'Co-Branded Product Drop',
      description: themes[0] ?? 'A limited-edition product created jointly with a partner brand.',
      timeline: '3\u20136 months',
      channels: ['Direct-to-consumer', 'Partner channels', 'Social media'],
      kpis: ['Units sold', 'New customer acquisition', 'Brand awareness lift'],
    },
    {
      format: 'Content Partnership',
      description: themes[1] ?? 'A joint content series or publication co-created with a partner.',
      timeline: '1\u20133 months',
      channels: ['Blog and editorial', 'Podcast', 'Video series', 'Social media'],
      kpis: ['Views and reach', 'Engagement rate', 'Subscriber growth', 'Lead generation'],
    },
    {
      format: 'Event Collaboration',
      description:
        themes[2] ?? 'A joint event or activation bringing both brand audiences together.',
      timeline: '2\u20134 months',
      channels: ['Live event', 'Virtual event', 'Pop-up activation'],
      kpis: ['Attendance', 'Social impressions', 'Press coverage', 'Post-event survey NPS'],
    },
    {
      format: 'Cause Partnership',
      description:
        'A social impact or community initiative co-led with a mission-aligned organisation.',
      timeline: 'Ongoing (annual cycle)',
      channels: ['PR and media', 'Social media', 'Employee engagement'],
      kpis: ['Funds raised', 'Community reach', 'Employee participation rate', 'ESG reporting'],
    },
  ];
}

function buildOutreachTemplate(brand: BrandIdentity): string {
  const name = brand.name;
  const tagline = brand.tagline ? ` \u2014 ${brand.tagline}` : '';
  return (
    `Subject: Partnership Opportunity \u2014 ${name} x [Partner Brand]\n\n` +
    `Hi [Contact Name],\n\n` +
    `I\u2019m reaching out from ${name}${tagline}. We admire what you\u2019ve built at [Partner Brand] ` +
    `and believe there\u2019s a compelling opportunity for us to collaborate.\n\n` +
    `Our brands share [shared value/audience/mission]. We\u2019d love to explore a [partnership type] ` +
    `that could [mutual benefit].\n\n` +
    `Would you be open to a 30-minute call in the next two weeks?\n\n` +
    `Best regards,\n[Your Name]\n${name} Team`
  );
}

function buildPartnershipBriefSummary(brand: BrandIdentity): string {
  const { style, name, tagline, industry } = brand;
  const approach = STYLE_PARTNERSHIP_APPROACH[style] ?? STYLE_PARTNERSHIP_APPROACH.minimal;
  const tag = tagline ? ` (\u201c${tagline}\u201d)` : '';
  return (
    `${name}${tag} is a ${industry} brand with a ${style} identity. ` +
    `Partnership strategy: ${approach} ` +
    `Ideal partners span the ${style} ecosystem with value exchange centred on ${STYLE_PARTNER_VALUE_EXCHANGE[style] ?? STYLE_PARTNER_VALUE_EXCHANGE.minimal}`
  );
}

export function generateBrandPartnership(brand: BrandIdentity): BrandPartnershipOutput {
  const { style } = brand;

  return {
    partnershipApproach: STYLE_PARTNERSHIP_APPROACH[style] ?? STYLE_PARTNERSHIP_APPROACH.minimal,
    idealPartnerProfiles:
      STYLE_IDEAL_PARTNER_PROFILES[style] ?? STYLE_IDEAL_PARTNER_PROFILES.minimal,
    collaborationThemes: STYLE_COLLABORATION_THEMES[style] ?? STYLE_COLLABORATION_THEMES.minimal,
    partnerValueExchange:
      STYLE_PARTNER_VALUE_EXCHANGE[style] ?? STYLE_PARTNER_VALUE_EXCHANGE.minimal,
    screeningCriteria: STYLE_SCREENING_CRITERIA[style] ?? STYLE_SCREENING_CRITERIA.minimal,
    partnershipTiers: buildPartnershipTiers(brand),
    collaborationFormats: buildCollaborationFormats(brand),
    outreachTemplate: buildOutreachTemplate(brand),
    negotiationPrinciples: [
      'Establish mutual benefit before discussing terms',
      'Define success metrics and KPIs upfront',
      'Agree on brand usage rights and approval workflows',
      'Set clear exit clauses and wind-down procedures',
      'Protect IP ownership with explicit contractual language',
      'Require brand safety compliance from both parties',
    ],
    redFlags: [
      'Misaligned audience demographics or brand values',
      'Partners with active brand safety controversies',
      'Unclear IP ownership or conflicting trademark use',
      'Unrealistic expectations without defined deliverables',
      'Lack of dedicated point of contact on partner side',
    ],
    partnershipBriefSummary: buildPartnershipBriefSummary(brand),
  };
}
