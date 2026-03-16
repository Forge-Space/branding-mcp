import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandTrainingOutput, TrainingModule, LearningPath } from '../../types.js';

const STYLE_TRAINING_CULTURE: Record<BrandStyle, string> = {
  minimal:
    'Self-directed, documentation-first learning with clear written guides and async formats',
  bold: "Energetic, immersive workshops and hands-on challenges that match the brand's dynamic pace",
  elegant: 'Curated, high-quality learning experiences with expert-led masterclasses and mentoring',
  playful:
    'Gamified, interactive learning journeys with badges, challenges, and peer collaboration',
  corporate:
    'Structured, compliance-aligned programmes with clear competency frameworks and certification paths',
  tech: 'Technical deep-dives, pair programming, code reviews, and developer-led knowledge sharing',
  organic: 'Holistic, values-centred learning that connects skills to purpose and community impact',
  retro: 'Craft-focused apprenticeship model with story-driven case studies and expert mentorship',
};

const STYLE_DELIVERY_FORMAT: Record<BrandStyle, string[]> = {
  minimal: ['Written guides', 'Short async videos', 'Self-paced modules', 'Documentation wikis'],
  bold: ['Live workshops', 'Hackathons', 'Role-play simulations', 'Peer teaching sessions'],
  elegant: ['Masterclasses', '1-on-1 coaching', 'Curated reading lists', 'Industry expert panels'],
  playful: [
    'Gamified courses',
    'Team quizzes',
    'Interactive scenarios',
    'Collaborative challenges',
  ],
  corporate: [
    'Instructor-led training',
    'Compliance e-learning',
    'Certification programmes',
    'LMS-tracked modules',
  ],
  tech: ['Pair programming', 'Code labs', 'Tech talks', 'Conference attendance sponsorship'],
  organic: [
    'Circle learning groups',
    'Story sharing sessions',
    'Values workshops',
    'Community projects',
  ],
  retro: [
    'Apprenticeship shadowing',
    'Case study analysis',
    'Craft workshops',
    'Story-based simulations',
  ],
};

const STYLE_ASSESSMENT_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Practical output reviews and brief written reflections',
  bold: 'Performance challenges and observable behaviour change',
  elegant: 'Portfolio presentations and peer review panels',
  playful: 'Quiz scores, badge completion, and peer kudos',
  corporate: 'Formal assessments, certification exams, and manager sign-off',
  tech: 'Code reviews, technical challenges, and pull request quality metrics',
  organic: 'Reflective journaling, values alignment check-ins, and team feedback',
  retro: 'Craftwork portfolios, master review, and storytelling presentations',
};

const STYLE_LEARNING_CADENCE: Record<BrandStyle, string> = {
  minimal: 'Continuous, bite-sized — 20-30 min per week, self-scheduled',
  bold: 'Intensive bursts — quarterly full-day sessions plus weekly 1-hour sprints',
  elegant: 'Monthly masterclasses plus ongoing 1-on-1 coaching check-ins',
  playful: 'Daily micro-learning (5-10 min) plus monthly team challenges',
  corporate: 'Annual compliance cycles plus quarterly role-based modules',
  tech: 'Bi-weekly tech talks, monthly deep-dives, conference seasons',
  organic: 'Seasonal cohorts aligned to organisational rhythms and community cycles',
  retro: 'Weekly craft practice plus bi-monthly masterclass with visiting experts',
};

const STYLE_KNOWLEDGE_BASE: Record<BrandStyle, string[]> = {
  minimal: ['Brand guidelines wiki', 'Process documentation', 'FAQ repository', 'Decision logs'],
  bold: ['Brand playbook', 'Campaign gallery', 'Win stories archive', 'Energy manifesto'],
  elegant: [
    'Brand heritage library',
    'Excellence case studies',
    'Expert interview series',
    'Signature standards guide',
  ],
  playful: [
    'Interactive brand toolkit',
    'Meme and creative asset library',
    'Community knowledge hub',
    'Fun facts database',
  ],
  corporate: [
    'Policy and procedure manuals',
    'Regulatory compliance library',
    'Competency framework',
    'Audit trail records',
  ],
  tech: [
    'Technical documentation',
    'API reference library',
    'Architecture decision records',
    'Open-source contribution guides',
  ],
  organic: [
    'Provenance stories',
    'Sustainability research library',
    'Community impact reports',
    'Regenerative practice guides',
  ],
  retro: [
    'Brand heritage archive',
    'Craft technique library',
    'Customer story anthology',
    'Vintage design reference',
  ],
};

function buildOnboardingModules(brand: BrandIdentity): TrainingModule[] {
  const style = brand.style ?? 'minimal';
  return [
    {
      title: 'Brand Foundations',
      duration: '2 hours',
      format: 'Interactive presentation + discussion',
      objectives: [
        `Understand ${brand.name}'s mission, vision, and values`,
        'Articulate the brand promise and positioning',
        'Identify the target audience and key personas',
        'Describe the brand personality and voice',
      ],
      assessmentMethod: 'Brand knowledge quiz + reflection exercise',
    },
    {
      title: 'Visual Identity Mastery',
      duration: '1.5 hours',
      format: STYLE_DELIVERY_FORMAT[style]?.[0] ?? STYLE_DELIVERY_FORMAT.minimal[0],
      objectives: [
        'Apply the correct colour palette in all materials',
        'Use approved typography styles and hierarchy',
        'Follow logo usage and spacing guidelines',
        'Identify compliant vs non-compliant brand applications',
      ],
      assessmentMethod: 'Practical brand asset review',
    },
    {
      title: 'Brand Voice and Tone',
      duration: '1 hour',
      format: 'Workshop with real-world examples',
      objectives: [
        "Write in the brand's defined tone of voice",
        'Adapt tone appropriately across different channels',
        'Avoid off-brand language and common mistakes',
        'Apply messaging frameworks in customer-facing content',
      ],
      assessmentMethod: 'Before/after copy rewriting exercise',
    },
    {
      title: 'Customer Experience Standards',
      duration: '2 hours',
      format: 'Role-play and scenario training',
      objectives: [
        'Describe the ideal customer journey',
        'Handle common customer situations on-brand',
        'Escalate issues following brand protocols',
        'Represent brand values in every interaction',
      ],
      assessmentMethod: 'Scenario role-play assessment',
    },
    {
      title: 'Tools and Systems',
      duration: '1.5 hours',
      format: 'Hands-on system walkthrough',
      objectives: [
        'Navigate brand asset management system',
        'Submit and approve brand content correctly',
        'Access and use brand templates effectively',
        'Report brand compliance issues',
      ],
      assessmentMethod: 'Practical systems task completion',
    },
  ];
}

function buildLearningPaths(brand: BrandIdentity): LearningPath[] {
  const style = brand.style ?? 'minimal';
  return [
    {
      role: 'Brand & Marketing',
      durationWeeks: 8,
      phases: [
        'Week 1-2: Brand foundations and visual identity',
        'Week 3-4: Voice, tone, and messaging frameworks',
        'Week 5-6: Campaign planning and content strategy',
        'Week 7-8: Analytics, optimisation, and brand governance',
      ],
      keyResources: STYLE_KNOWLEDGE_BASE[style] ?? STYLE_KNOWLEDGE_BASE.minimal,
    },
    {
      role: 'Customer-Facing Teams',
      durationWeeks: 4,
      phases: [
        'Week 1: Brand promise and customer experience standards',
        'Week 2: Voice, tone, and escalation protocols',
        'Week 3: Scenario-based practice and peer coaching',
        'Week 4: Assessment and certification',
      ],
      keyResources: [
        'Customer interaction guides',
        'Escalation playbook',
        'Brand voice cheat sheet',
        'FAQ toolkit',
      ],
    },
    {
      role: 'Leadership & Management',
      durationWeeks: 6,
      phases: [
        'Week 1-2: Brand strategy and competitive positioning',
        'Week 3-4: Brand governance and compliance frameworks',
        'Week 5-6: Coaching teams on brand standards and culture',
      ],
      keyResources: [
        'Brand strategy deck',
        'Governance framework',
        'Compliance audit guide',
        'Leadership brand charter',
      ],
    },
    {
      role: 'Creative & Design',
      durationWeeks: 10,
      phases: [
        'Week 1-2: Visual identity system deep-dive',
        'Week 3-4: Design system and component library',
        'Week 5-6: Brand guidelines application and edge cases',
        'Week 7-8: Cross-channel adaptation principles',
        'Week 9-10: Portfolio review and advanced brand thinking',
      ],
      keyResources: [
        'Design system documentation',
        'Asset library',
        'Brand guidelines PDF',
        'Typography and colour specs',
      ],
    },
  ];
}

function buildBrandChampionProgramme(brand: BrandIdentity): string[] {
  return [
    `Identify Brand Champions in each department to model ${brand.name}'s standards`,
    'Champions complete advanced brand certification (20+ hours)',
    'Monthly Brand Champion roundtable to share insights and resolve grey areas',
    'Champions lead peer coaching and new joiner onboarding support',
    'Quarterly brand audit participation to surface compliance issues early',
    'Annual Brand Champion summit with leadership to align on brand evolution',
    'Champions recognised with visible credential and contribution to brand governance',
  ];
}

function buildTrainingBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const tagline = brand.tagline ? ` — "${brand.tagline}"` : '';
  const culture = (STYLE_TRAINING_CULTURE[style] ?? STYLE_TRAINING_CULTURE.minimal).split(',')[0];
  return `${brand.name}${tagline} learning & development strategy adopts a ${culture.toLowerCase()} approach. The programme covers brand foundations, visual identity, voice, and customer experience through a structured onboarding track (8 hours) and role-based learning paths (4-10 weeks). Delivery is ${(STYLE_DELIVERY_FORMAT[style]?.[0] ?? 'self-paced modules').toLowerCase()}-led, with assessment via ${(STYLE_ASSESSMENT_APPROACH[style] ?? STYLE_ASSESSMENT_APPROACH.minimal).toLowerCase()}.`;
}

export function generateBrandTraining(brand: BrandIdentity): BrandTrainingOutput {
  const style = brand.style ?? 'minimal';

  return {
    trainingCulture: STYLE_TRAINING_CULTURE[style] ?? STYLE_TRAINING_CULTURE.minimal,
    deliveryFormats: STYLE_DELIVERY_FORMAT[style] ?? STYLE_DELIVERY_FORMAT.minimal,
    assessmentApproach: STYLE_ASSESSMENT_APPROACH[style] ?? STYLE_ASSESSMENT_APPROACH.minimal,
    learningCadence: STYLE_LEARNING_CADENCE[style] ?? STYLE_LEARNING_CADENCE.minimal,
    knowledgeBaseStructure: STYLE_KNOWLEDGE_BASE[style] ?? STYLE_KNOWLEDGE_BASE.minimal,
    onboardingModules: buildOnboardingModules(brand),
    learningPaths: buildLearningPaths(brand),
    brandChampionProgramme: buildBrandChampionProgramme(brand),
    trainingBriefSummary: buildTrainingBriefSummary(brand),
  };
}
