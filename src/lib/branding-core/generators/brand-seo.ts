import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandSeoOutput } from '../../types.js';

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

const STYLE_SEO_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Clean, content-first SEO with precise targeting and minimal technical complexity',
  bold: 'Aggressive content volume strategy with high-impact headlines and competitive keyword targeting',
  elegant: 'Authoritative long-form content, editorial backlinks, and premium brand signals',
  playful: 'Viral content hooks, community-driven link building, and social search integration',
  corporate:
    'Enterprise SEO with structured data, governance frameworks, and multi-site orchestration',
  tech: 'Developer-focused SEO with API documentation, technical content hubs, and GitHub presence signals',
  organic:
    'Educational content SEO, E-E-A-T authority building, and values-aligned backlink acquisition',
  retro:
    'Niche community SEO, vintage aesthetic long-tail keywords, and cultural reference anchoring',
};

const STYLE_CONTENT_TYPES: Record<BrandStyle, string[]> = {
  minimal: ['Clear explainer pages', 'Concise how-to guides', 'Comparison tables', 'FAQ pages'],
  bold: [
    'High-energy listicles',
    'Opinion pieces',
    'Data-driven reports',
    'Controversy-led content',
  ],
  elegant: ['Long-form editorial', 'Expert interviews', 'White papers', 'Case studies'],
  playful: [
    'Interactive quizzes',
    'Shareable infographics',
    'Trending topic reactive content',
    'UGC spotlights',
  ],
  corporate: [
    'Industry thought leadership',
    'Regulatory compliance guides',
    'Analyst-ready reports',
    'Client success stories',
  ],
  tech: [
    'Technical tutorials',
    'API documentation',
    'Open-source project pages',
    'Developer blog posts',
  ],
  organic: [
    'Educational guides',
    'Sustainability deep-dives',
    'Origin stories',
    'Community impact reports',
  ],
  retro: [
    'Nostalgia content',
    'Era-specific guides',
    'Collector deep-dives',
    'Cultural history pieces',
  ],
};

const STYLE_LINK_STRATEGY: Record<BrandStyle, string[]> = {
  minimal: [
    'Guest posts on niche blogs',
    'Resource page link building',
    'Unlinked brand mention reclamation',
  ],
  bold: ['Digital PR for data studies', 'Reactive newsjacking', 'Influencer collaboration links'],
  elegant: [
    'Premium editorial placements',
    'Award and accreditation listings',
    'Industry association memberships',
  ],
  playful: [
    'Viral campaign link bait',
    'Meme-culture partnerships',
    'Community forum participation',
  ],
  corporate: [
    'Analyst report citations',
    'Partner ecosystem cross-links',
    'Conference and event sponsorships',
  ],
  tech: ['GitHub README links', 'Developer tool directories', 'Open-source contribution mentions'],
  organic: [
    'Sustainable brand directories',
    'NGO and cause partnerships',
    'Certification body listings',
  ],
  retro: [
    'Collector community forums',
    'Niche vintage directories',
    'Museum and archive citations',
  ],
};

const STYLE_TECHNICAL_PRIORITIES: Record<BrandStyle, string[]> = {
  minimal: ['Core Web Vitals optimisation', 'Lean page structure', 'Fast-loading asset delivery'],
  bold: [
    'Rich snippets and FAQ schema',
    'Video SEO integration',
    'Dynamic rendering for interactive content',
  ],
  elegant: ['Structured data for articles', 'AMP for editorial pages', 'Canonical tag governance'],
  playful: [
    'Open Graph and Twitter Cards',
    'Social sharing optimisation',
    'Image SEO for visual content',
  ],
  corporate: [
    'Enterprise XML sitemaps',
    'Hreflang for international',
    'Log file analysis pipelines',
  ],
  tech: [
    'Developer documentation schema',
    'Code snippet indexing',
    'API reference structured data',
  ],
  organic: [
    'Local SEO for community presence',
    'Recipe and product schema',
    'Sustainability badge integration',
  ],
  retro: [
    'Image alt text for archival photos',
    'Historical date structured data',
    'Niche directory submissions',
  ],
};

const STYLE_LOCAL_SEO: Record<BrandStyle, string> = {
  minimal: 'Lean Google Business Profile with accurate NAP and concise descriptions',
  bold: 'High-energy GBP posts, photo uploads, and review solicitation campaigns',
  elegant: 'Curated GBP presence with premium photography and selective citation building',
  playful: 'Frequent GBP updates with event posts, playful Q&A responses, and local hashtags',
  corporate: 'Multi-location GBP management with centralised review response governance',
  tech: 'Developer-friendly local schema, event listings for meetups, and GitHub office pages',
  organic: 'Community-rooted citations, farmers market and co-op directory listings',
  retro: 'Vintage neighbourhood directories, local history pages, and heritage trail listings',
};

function buildKeywordStrategy(brand: BrandIdentity, safeStyle: BrandStyle): string[] {
  const industryKeywords = extractIndustryKeywords(brand.industry);
  const styleModifiers: Record<BrandStyle, string[]> = {
    minimal: ['simple', 'clean', 'straightforward'],
    bold: ['best', 'top', 'powerful', 'ultimate'],
    elegant: ['premium', 'luxury', 'exclusive', 'refined'],
    playful: ['fun', 'easy', 'quick', 'cool'],
    corporate: ['enterprise', 'professional', 'scalable', 'reliable'],
    tech: ['developer', 'API', 'open-source', 'integration'],
    organic: ['natural', 'sustainable', 'eco-friendly', 'ethical'],
    retro: ['vintage', 'classic', 'original', 'heritage'],
  };
  const modifiers = styleModifiers[safeStyle];
  return [
    `${brand.name} ${industryKeywords[0] ?? 'solutions'}`,
    `${modifiers[0]} ${industryKeywords[0] ?? 'products'}`,
    `${modifiers[1]} ${brand.industry}`,
    `${brand.industry} ${modifiers[2] ?? 'services'}`,
    `${brand.name} reviews`,
    `${brand.industry} guide ${new Date().getFullYear()}`,
    `how to choose ${brand.industry}`,
    `${brand.industry} comparison`,
  ];
}

function extractIndustryKeywords(industry: string): string[] {
  const lower = industry.toLowerCase();
  if (lower.includes('tech') || lower.includes('software') || lower.includes('saas')) {
    return ['software', 'platform', 'tools', 'automation'];
  }
  if (lower.includes('fashion') || lower.includes('apparel') || lower.includes('clothing')) {
    return ['fashion', 'style', 'apparel', 'collection'];
  }
  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('cafe')) {
    return ['food', 'menu', 'dining', 'cuisine'];
  }
  if (lower.includes('health') || lower.includes('wellness') || lower.includes('fitness')) {
    return ['health', 'wellness', 'fitness', 'wellbeing'];
  }
  if (lower.includes('finance') || lower.includes('banking') || lower.includes('investment')) {
    return ['finance', 'investment', 'banking', 'financial'];
  }
  if (lower.includes('education') || lower.includes('learning') || lower.includes('training')) {
    return ['education', 'learning', 'courses', 'training'];
  }
  return [industry.split(' ')[0]?.toLowerCase() ?? 'products', 'services', 'solutions', 'brand'];
}

function buildOnPageChecklist(brand: BrandIdentity): string[] {
  return [
    `Title tags: include primary keyword + ${brand.name} within 60 characters`,
    'Meta descriptions: compelling 155-character summaries with clear CTAs',
    'H1 tags: one per page, containing primary keyword naturally',
    'H2/H3 hierarchy: logical heading structure for featured snippet eligibility',
    'Internal linking: contextual anchor text, minimum 3 internal links per page',
    'Image optimisation: descriptive alt text, next-gen formats (WebP/AVIF), lazy loading',
    'URL structure: short, keyword-rich, hyphens not underscores',
    'Schema markup: appropriate type per page (Article, Product, FAQ, BreadcrumbList)',
    'Canonical tags: self-referencing canonicals on all pages, cross-domain where applicable',
    'Page speed: Core Web Vitals targets — LCP <2.5s, FID <100ms, CLS <0.1',
  ];
}

function buildContentCalendar(safeStyle: BrandStyle): string[] {
  const cadence: Record<BrandStyle, string[]> = {
    minimal: [
      'Month 1: Cornerstone pillar page creation',
      'Month 2: Supporting cluster content (5 posts)',
      'Month 3: Link building outreach and content refresh',
    ],
    bold: [
      'Week 1: 3 high-volume keyword posts',
      'Week 2: 1 data study or original research',
      'Week 3: 3 reactive trend posts',
      'Week 4: 1 video transcript article',
    ],
    elegant: [
      'Month 1: 2 long-form editorial features (3000+ words)',
      'Month 2: 1 expert interview + 1 case study',
      'Month 3: 1 white paper + supporting content',
    ],
    playful: [
      'Week 1: 1 interactive quiz or tool',
      'Week 2: 2 listicles with shareable assets',
      'Week 3: 1 trending topic reactive piece',
      'Week 4: 1 UGC or community spotlight',
    ],
    corporate: [
      'Month 1: Industry report publication',
      'Month 2: 4 thought leadership articles',
      'Month 3: Client case study + compliance guide',
    ],
    tech: [
      'Week 1: 1 technical tutorial or how-to',
      'Week 2: 1 API/integration guide',
      'Week 3: 1 comparison or benchmark post',
      'Week 4: 1 developer news or changelog post',
    ],
    organic: [
      'Month 1: Educational cornerstone guide',
      'Month 2: 3 sustainability deep-dives',
      'Month 3: Impact report + community story',
    ],
    retro: [
      'Month 1: Historical era deep-dive content',
      'Month 2: Collector guide series (3 posts)',
      'Month 3: Culture and nostalgia editorial',
    ],
  };
  return cadence[safeStyle];
}

function buildSeoBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const approach = STYLE_SEO_APPROACH[safeStyle];
  const contentTypes = STYLE_CONTENT_TYPES[safeStyle];
  return (
    `${brand.name}${brand.tagline ? ` — "${brand.tagline}"` : ''} SEO strategy: ` +
    `${approach.split(',')[0]}. ` +
    `Primary content formats: ${contentTypes.slice(0, 2).join(' and ')}. ` +
    `Industry: ${brand.industry}.`
  );
}

export function generateBrandSeo(brand: BrandIdentity): BrandSeoOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    seoApproach: STYLE_SEO_APPROACH[safeStyle],
    targetKeywords: buildKeywordStrategy(brand, safeStyle),
    contentTypes: STYLE_CONTENT_TYPES[safeStyle],
    linkBuildingStrategy: STYLE_LINK_STRATEGY[safeStyle],
    technicalPriorities: STYLE_TECHNICAL_PRIORITIES[safeStyle],
    localSeoGuidance: STYLE_LOCAL_SEO[safeStyle],
    onPageChecklist: buildOnPageChecklist(brand),
    contentCalendar: buildContentCalendar(safeStyle),
    seoBriefSummary: buildSeoBriefSummary(brand, safeStyle),
  };
}
