import type {
  BrandIdentity,
  BrandStyle,
  BrandInnovationOutput,
  IdeationMethod,
  InnovationPillar,
} from '../../types.js';
import { generateMotionSystem } from './motion-system.js';

type InnovationFocus = 'product' | 'process' | 'experience' | 'business_model';

const STYLE_INNOVATION_CULTURE: Record<BrandStyle, string> = {
  minimal: 'Iterative refinement — continuous improvement over revolutionary leaps',
  bold: 'Disruptive experimentation — high-risk, high-reward breakthrough innovation',
  elegant: 'Curated innovation — purposeful advances that elevate craft and experience',
  playful: 'Creative exploration — playful experimentation and unexpected combinations',
  corporate: 'Structured innovation — stage-gate processes with clear ROI metrics',
  tech: 'Rapid iteration — agile sprints, open-source collaboration, developer-first',
  organic: 'Regenerative innovation — solutions that restore and give back to ecosystems',
  retro: 'Heritage-led reinvention — modernising proven formats for new contexts',
};

const STYLE_INNOVATION_FOCUS: Record<BrandStyle, InnovationFocus[]> = {
  minimal: ['experience', 'process'],
  bold: ['product', 'business_model'],
  elegant: ['experience', 'product'],
  playful: ['product', 'experience'],
  corporate: ['process', 'business_model'],
  tech: ['product', 'process'],
  organic: ['product', 'business_model'],
  retro: ['experience', 'product'],
};

const STYLE_INNOVATION_THEMES: Record<BrandStyle, string[]> = {
  minimal: [
    'Radical simplification of complex workflows',
    'Zero-friction customer interactions',
    'Invisible infrastructure that just works',
  ],
  bold: [
    'Category-defining product breakthroughs',
    'Blue-ocean market creation',
    'Technology that challenges the status quo',
  ],
  elegant: [
    'Materials and craftsmanship innovation',
    'Sensory experience enhancement',
    'Artisanal meets digital precision',
  ],
  playful: [
    'Gamification of everyday tasks',
    'Community co-creation and crowdsourcing',
    'Unexpected brand crossovers and collabs',
  ],
  corporate: [
    'Operational efficiency at scale',
    'Supply-chain transparency and traceability',
    'Risk-managed adjacent market expansion',
  ],
  tech: [
    'Open-source ecosystem building',
    'AI/ML-driven personalisation at scale',
    'Developer tooling and API-first design',
  ],
  organic: [
    'Circular economy and zero-waste design',
    'Regenerative supply-chain models',
    'Bio-inspired materials and processes',
  ],
  retro: [
    'Analogue quality in digital contexts',
    'Limited-edition revival collections',
    'Nostalgia-driven community experiences',
  ],
};

const STYLE_PROCESS_FRAMEWORKS: Record<BrandStyle, string[]> = {
  minimal: ['Design Sprint (5-day focused)', 'Jobs-to-be-Done interviews', 'Lean Canvas'],
  bold: ['10x Thinking workshops', 'Moonshot OKRs', 'Hackathons & Demo Days'],
  elegant: ['Slow Innovation retreats', 'Expert co-creation salons', 'Prototype-as-art reviews'],
  playful: ['Jam sessions & play sprints', 'Random stimuli ideation', 'Build-measure-learn loops'],
  corporate: ['Stage-Gate process', 'Portfolio management reviews', 'Innovation Board governance'],
  tech: ['Shape Up (6-week cycles)', 'RFC (Request for Comments)', 'Open Beta & dogfooding'],
  organic: [
    'Biomimicry workshops',
    'Stakeholder co-design circles',
    'Life-cycle assessment reviews',
  ],
  retro: [
    'Archive mining sessions',
    'Cross-generational focus groups',
    'Heritage reinterpretation sprints',
  ],
};

const STYLE_TECHNOLOGY_BETS: Record<BrandStyle, string[]> = {
  minimal: ['Automation & workflow tooling', 'No-code/low-code platforms', 'Edge computing'],
  bold: ['Generative AI', 'Web3 & tokenisation', 'Spatial computing (AR/VR)'],
  elegant: [
    'Haptics & multi-sensory interfaces',
    'Advanced materials science',
    'Precision manufacturing',
  ],
  playful: ['Social VR & metaverse', 'AI creative tools', 'Interactive storytelling platforms'],
  corporate: ['Enterprise AI & automation', 'Digital twins', 'Predictive analytics'],
  tech: ['LLMs & AI agents', 'Kubernetes & cloud-native', 'WebAssembly'],
  organic: ['Biotech & synthetic biology', 'Renewable energy systems', 'Precision fermentation'],
  retro: ['Letterpress & analogue revival', 'Retro-gaming engines', 'Vinyl & physical media tech'],
};

const STYLE_METRICS: Record<BrandStyle, string[]> = {
  minimal: ['Time-to-simplicity', 'Friction reduction score', 'Support ticket deflection rate'],
  bold: ['Revenue from new products (>3 years)', 'Category share of voice', 'Disruption index'],
  elegant: ['Customer delight NPS', 'Craft quality rating', 'Premium price achievement'],
  playful: [
    'User-generated content volume',
    'Virality coefficient',
    'Creative challenge participation',
  ],
  corporate: ['Innovation ROI', 'Stage-Gate success rate', 'Patent portfolio growth'],
  tech: ['Developer adoption rate', 'API call growth MoM', 'Open-source star velocity'],
  organic: ['Carbon reduction metrics', 'Circular economy diversion rate', 'Ecosystem health KPIs'],
  retro: ['Limited-edition sell-through', 'Community engagement rate', 'Heritage sentiment score'],
};

function buildIdeationMethods(brand: BrandIdentity): IdeationMethod[] {
  const style = brand.style ?? 'minimal';
  const frameworks = STYLE_PROCESS_FRAMEWORKS[style] ?? STYLE_PROCESS_FRAMEWORKS.minimal;

  return [
    {
      method: frameworks[0] ?? 'Design Sprint',
      description: 'Structured 5-day sprint to validate big ideas with real prototypes',
      bestFor: 'New product concepts and experience redesigns',
      timeInvestment: '1 week',
    },
    {
      method: frameworks[1] ?? 'Customer Interviews',
      description: 'Deep qualitative research to uncover unmet needs and pain points',
      bestFor: 'Problem definition and opportunity sizing',
      timeInvestment: '2–4 weeks',
    },
    {
      method: frameworks[2] ?? 'Lean Canvas',
      description: 'Rapid business model hypothesis documentation and validation',
      bestFor: 'New venture and pivot planning',
      timeInvestment: '1–2 days',
    },
    {
      method: 'Competitive Benchmarking',
      description: 'Systematic analysis of adjacent markets for transferable patterns',
      bestFor: 'Identifying white-space opportunities',
      timeInvestment: '1–2 weeks',
    },
  ];
}

function buildInnovationPillars(brand: BrandIdentity): InnovationPillar[] {
  const style = brand.style ?? 'minimal';
  const themes = STYLE_INNOVATION_THEMES[style] ?? STYLE_INNOVATION_THEMES.minimal;

  return [
    {
      pillar: 'Customer-Led Discovery',
      description: 'Systematic listening to surface unmet needs before building',
      initiatives: [
        'Quarterly customer advisory board',
        'Continuous usability testing programme',
        `${brand.name} community insight panels`,
      ],
      successCriteria: 'Pipeline of validated problem statements updated monthly',
    },
    {
      pillar: themes[0] ?? 'Product Innovation',
      description: 'Core innovation focus aligned to brand style and competitive positioning',
      initiatives: [
        'Annual innovation summit with cross-functional teams',
        'Dedicated R&D time allocation (20% rule)',
        'External partnership and academic collaboration programme',
      ],
      successCriteria: '3+ prototypes validated per quarter',
    },
    {
      pillar: 'Rapid Experimentation',
      description: 'Low-cost, fast-cycle testing of hypotheses before full investment',
      initiatives: [
        'Monthly experiment review cadence',
        'Innovation budget ring-fence (10% of project budgets)',
        'Fail-fast retrospective culture',
      ],
      successCriteria: 'Experiment cycle time under 4 weeks',
    },
  ];
}

function buildBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const culture = STYLE_INNOVATION_CULTURE[style] ?? STYLE_INNOVATION_CULTURE.minimal;
  const themes = STYLE_INNOVATION_THEMES[style] ?? STYLE_INNOVATION_THEMES.minimal;
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';

  return (
    `${brand.name}${taglinePart} innovation playbook: ${culture}. ` +
    `Core themes: ${themes[0]}. ` +
    `Technology bets focused on ${(STYLE_TECHNOLOGY_BETS[style] ?? STYLE_TECHNOLOGY_BETS.minimal)[0]}.`
  );
}

export function generateBrandInnovation(brand: BrandIdentity): BrandInnovationOutput {
  const style = brand.style ?? 'minimal';

  const innovationCulture = STYLE_INNOVATION_CULTURE[style] ?? STYLE_INNOVATION_CULTURE.minimal;
  const focusAreas = STYLE_INNOVATION_FOCUS[style] ?? STYLE_INNOVATION_FOCUS.minimal;
  const innovationThemes = STYLE_INNOVATION_THEMES[style] ?? STYLE_INNOVATION_THEMES.minimal;
  const processFrameworks = STYLE_PROCESS_FRAMEWORKS[style] ?? STYLE_PROCESS_FRAMEWORKS.minimal;
  const technologyBets = STYLE_TECHNOLOGY_BETS[style] ?? STYLE_TECHNOLOGY_BETS.minimal;
  const successMetrics = STYLE_METRICS[style] ?? STYLE_METRICS.minimal;

  const ideationMethods = buildIdeationMethods(brand);
  const innovationPillars = buildInnovationPillars(brand);
  const innovationBriefSummary = buildBriefSummary(brand);

  // Use motion system to confirm brand animations are coherent with innovation velocity
  const validStyles: BrandStyle[] = [
    'minimal',
    'bold',
    'elegant',
    'playful',
    'corporate',
    'tech',
    'organic',
    'retro',
  ];
  const safeStyle: BrandStyle = validStyles.includes(style as BrandStyle)
    ? (style as BrandStyle)
    : 'minimal';
  const motion = generateMotionSystem(safeStyle);
  const innovationCadence =
    motion.durations['normal'] && motion.durations['fast']
      ? 'Rapid iteration with deliberate reflection cycles'
      : 'Steady-paced innovation with structured review gates';

  return {
    innovationCulture,
    focusAreas,
    innovationThemes,
    processFrameworks,
    technologyBets,
    ideationMethods,
    innovationPillars,
    successMetrics,
    innovationCadence,
    openInnovationApproach: `Partner with universities, start-ups, and customers through ${brand.name} Labs and co-innovation programmes.`,
    ipStrategy: `Protect core brand innovations via trademark and design rights; share non-core learnings openly to build ecosystem goodwill.`,
    innovationBriefSummary,
  };
}
