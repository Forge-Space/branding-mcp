import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandEmployerOutput } from '../../types.js';

const STYLE_EVP_TONE: Record<BrandStyle, string> = {
  minimal: 'Clear, honest, and purposeful — we do meaningful work without noise or pretence.',
  bold: 'High-energy and ambitious — join us if you want to make a real dent in the universe.',
  elegant: 'Refined excellence — we attract craftspeople who care deeply about quality.',
  playful: 'Fun, curious, and creative — we hire people who bring their whole selves to work.',
  corporate:
    'Stability, growth, and impact — build a long career at a company that invests in you.',
  tech: 'Engineer-led and data-driven — shape the future of technology with autonomy and depth.',
  organic: 'Mission-driven and human — grow with a company that puts people and planet first.',
  retro: 'Authentic and timeless — we value craft, heritage, and building things that last.',
};

const STYLE_CULTURE_PILLARS: Record<BrandStyle, string[]> = {
  minimal: ['Clarity over complexity', 'Ownership without ego', 'Radical focus'],
  bold: ['Move fast, break barriers', 'Be audacious', 'Win as one team'],
  elegant: ['Pursuit of excellence', 'Meticulous craftsmanship', 'Graceful leadership'],
  playful: ['Experiment freely', 'Celebrate wins loudly', 'Stay curious always'],
  corporate: ['Integrity first', 'Disciplined execution', 'Sustained performance'],
  tech: ['Data over opinion', 'Ship and iterate', 'Open-source mindset'],
  organic: ['People before profit', 'Regenerative impact', 'Radical transparency'],
  retro: ['Respect for craft', 'Long-term thinking', 'Community over competition'],
};

const STYLE_BENEFITS_FRAMING: Record<BrandStyle, string[]> = {
  minimal: [
    'Competitive salary, no fluff',
    'Flexible remote-first policy',
    'Generous learning budget',
    '25 days PTO + public holidays',
    'No-meeting Fridays',
  ],
  bold: [
    'Top-of-market compensation + equity',
    'Unlimited PTO (we mean it)',
    'Annual team offsites globally',
    '$5,000 personal development allowance',
    'Gym membership + wellness stipend',
  ],
  elegant: [
    'Premium salary benchmarked quarterly',
    'Private medical + dental insurance',
    'Curated professional development programme',
    'Quarterly wellness retreats',
    'Fine dining team events',
  ],
  playful: [
    'Flexible hours — work when you flow',
    'Dog-friendly offices (seriously)',
    'Monthly team game nights',
    'Surprise birthday deliveries',
    'Generous parental leave',
  ],
  corporate: [
    'Competitive total compensation package',
    'Defined benefit pension / 401(k) match',
    'Structured 90-day onboarding',
    'Clear promotion pathways',
    'Employee assistance programme',
  ],
  tech: [
    'Equity from day one',
    'Home office setup budget ($3,000)',
    'Conference speaking sponsorship',
    'Open-source contribution time (10%)',
    'Annual tech gadget allowance',
  ],
  organic: [
    'Living wage commitment for all roles',
    'Volunteer days (5 per year)',
    'Subsidised organic meal programme',
    'Paid sabbaticals after 3 years',
    'Community impact bonus',
  ],
  retro: [
    'Profit-sharing scheme',
    'Craftsperson mentorship programme',
    'Curated library and reading budget',
    'Annual heritage retreats',
    'Apprenticeship pathways',
  ],
};

const STYLE_CANDIDATE_PERSONA_TRAITS: Record<BrandStyle, string[]> = {
  minimal: ['Outcome-oriented', 'Self-directed', 'Low ego, high ownership'],
  bold: ['Ambitious', 'Resilient', 'Driven by big challenges'],
  elegant: ['Detail-obsessed', 'Taste-driven', 'Professionally mature'],
  playful: ['Creative risk-taker', 'Collaborative', 'Energised by ideas'],
  corporate: ['Process-disciplined', 'Reliable', 'Long-term thinker'],
  tech: ['Deeply curious', 'Systems thinker', 'Open to feedback'],
  organic: ['Mission-aligned', 'Empathetic', 'Community-minded'],
  retro: ['Craft-focused', 'Patient', 'Principled over trendy'],
};

const STYLE_INTERVIEW_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Skills-based assessment with a short take-home project and two structured interviews.',
  bold: 'Fast-paced process — initial screen, live challenge, and exec conversation within 10 days.',
  elegant:
    'Portfolio review, craft conversation, and values alignment session with senior leaders.',
  playful: 'Casual coffee chat, creative brief exercise, and a team lunch to assess culture fit.',
  corporate: 'Structured competency-based interviews with panel review and reference checks.',
  tech: 'System design interview, code pairing session, and architecture discussion.',
  organic: 'Values conversation, lived-experience sharing, and community impact scenario.',
  retro: 'Work sample review, master-apprentice conversation, and heritage walk-through.',
};

const STYLE_ONBOARDING_APPROACH: Record<BrandStyle, string> = {
  minimal:
    '30-day structured onboarding with clear milestones, a buddy, and a solo project by week four.',
  bold: 'Immersive first week bootcamp, executive 1:1s, and your first win shipped within 30 days.',
  elegant:
    'White-glove onboarding: curated reading, shadowing senior members, mentorship from week one.',
  playful:
    'Fun-filled first week: team show-and-tell, office scavenger hunt, and creative brief on day 5.',
  corporate:
    '90-day structured programme with role-specific training, manager check-ins, and HR milestones.',
  tech: 'Engineering onboarding: codebase tour, first PR merged in week one, on-call shadow by month two.',
  organic:
    'Purpose-led orientation: impact story, community introduction, and values immersion workshops.',
  retro: 'Apprenticeship model: paired with a master craftsperson for 60 days, learning by doing.',
};

function buildJobAdGuidelines(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const base = [
    'Lead with mission and impact, not just responsibilities',
    'Use inclusive language — avoid gendered or exclusionary terms',
    'List requirements honestly; separate must-haves from nice-to-haves',
    'State salary range upfront to build trust',
    'Describe the team culture authentically',
  ];
  const extras: Partial<Record<BrandStyle, string[]>> = {
    tech: [
      'Include tech stack and engineering principles',
      'Link to open-source work or engineering blog',
    ],
    corporate: ['Provide clear career path information', 'Highlight stability and total rewards'],
    organic: [
      'Describe social/environmental impact',
      'Mention volunteering and community commitments',
    ],
    bold: [
      'Use energetic, direct language that excites high performers',
      'Emphasise equity and growth trajectory',
    ],
  };
  return [...base, ...(extras[style] ?? [])];
}

function buildEmployerBriefSummary(brand: BrandIdentity): string {
  const tagline = brand.tagline ? ` — ${brand.tagline}` : '';
  const style = brand.style ?? 'minimal';
  const evp = STYLE_EVP_TONE[style] ?? STYLE_EVP_TONE.minimal;
  const interview = STYLE_INTERVIEW_APPROACH[style] ?? STYLE_INTERVIEW_APPROACH.minimal;
  const onboarding = STYLE_ONBOARDING_APPROACH[style] ?? STYLE_ONBOARDING_APPROACH.minimal;
  return `${brand.name}${tagline} employer brand summary: ${evp.split(' — ')[0].toLowerCase()} culture centred on ${(STYLE_CULTURE_PILLARS[style] ?? STYLE_CULTURE_PILLARS.minimal)[0].toLowerCase()}. Talent acquisition follows a ${interview.split(' ')[0].toLowerCase()} process with ${onboarding.split(':')[0].toLowerCase()} onboarding.`;
}

export function generateBrandEmployer(brand: BrandIdentity): BrandEmployerOutput {
  const style = (brand.style ?? 'minimal') as BrandStyle;

  return {
    evpStatement: STYLE_EVP_TONE[style] ?? STYLE_EVP_TONE.minimal,
    culturePillars: STYLE_CULTURE_PILLARS[style] ?? STYLE_CULTURE_PILLARS.minimal,
    benefitsFraming: STYLE_BENEFITS_FRAMING[style] ?? STYLE_BENEFITS_FRAMING.minimal,
    candidatePersonaTraits:
      STYLE_CANDIDATE_PERSONA_TRAITS[style] ?? STYLE_CANDIDATE_PERSONA_TRAITS.minimal,
    interviewApproach: STYLE_INTERVIEW_APPROACH[style] ?? STYLE_INTERVIEW_APPROACH.minimal,
    onboardingApproach: STYLE_ONBOARDING_APPROACH[style] ?? STYLE_ONBOARDING_APPROACH.minimal,
    jobAdGuidelines: buildJobAdGuidelines(brand),
    employerBriefSummary: buildEmployerBriefSummary(brand),
  };
}
