import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandCustomerOutput, CustomerPersona, CustomerJourneyStage } from '../../types.js';

const STYLE_CX_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Frictionless, self-serve experiences that respect customer time and intelligence.',
  bold: 'High-energy, memorable touchpoints that surprise and delight at every turn.',
  elegant: 'White-glove service with personalised attention and flawless execution.',
  playful: 'Fun, gamified interactions that make every step of the journey enjoyable.',
  corporate: 'Reliable, professional service underpinned by clear SLAs and escalation paths.',
  tech: 'Data-driven personalisation and automation that anticipates customer needs.',
  organic: 'Authentic, values-led service rooted in transparency and community trust.',
  retro: 'Nostalgic charm with personal touches that evoke a simpler, warmer era of service.',
};

const STYLE_LOYALTY_STRATEGY: Record<BrandStyle, string[]> = {
  minimal: [
    'Points-free cashback reward that auto-applies at checkout',
    'Exclusive member pricing with no tier complexity',
    'Early access to new products for returning customers',
    'Surprise upgrade on every fifth purchase',
  ],
  bold: [
    'Gamified loyalty badges shared on social media',
    'Limited-edition drops only for top-tier members',
    'VIP event invitations for high-frequency buyers',
    'Bold referral programme with dual-sided rewards',
  ],
  elegant: [
    'Private client concierge for personalised recommendations',
    'Complimentary gift-wrapping and handwritten notes',
    'Annual loyalty gift curated to client preferences',
    'Invitation-only preview events at flagship locations',
  ],
  playful: [
    'Spin-the-wheel reward mechanic on each purchase',
    'Loyalty streaks that unlock surprise bonuses',
    'Community challenges where members earn points together',
    'Birthday month double-points celebration',
  ],
  corporate: [
    'Volume-based tiered pricing with transparent thresholds',
    'Dedicated account manager for enterprise clients',
    'Annual business review with ROI reporting',
    'Priority SLA upgrades for long-tenured customers',
  ],
  tech: [
    'API-driven personalised offers based on usage patterns',
    'Credit system that rewards feature adoption',
    'Developer advocate programme with referral bounties',
    'Usage milestone badges shareable on LinkedIn',
  ],
  organic: [
    'Loyalty points donated to partner environmental causes',
    'Early harvest / limited batch access for loyal members',
    'Community co-creation invitations for top advocates',
    'Reward for sustainable behaviour (e.g., packaging returns)',
  ],
  retro: [
    'Punch-card loyalty card with a tangible physical reward',
    'Handwritten thank-you card with every repeat order',
    'Long-tenured customer plaque or certificate',
    'Seasonal loyalty gifts reflecting heritage craftsmanship',
  ],
};

const STYLE_SUPPORT_TONE: Record<BrandStyle, string> = {
  minimal: 'Clear, concise, and efficient. Answer the question; no filler.',
  bold: 'Energetic and empowering. Turn every support ticket into a win.',
  elegant: "Warm, measured, and reassuring. Mirror the client's level of formality.",
  playful: 'Light-hearted and friendly. Use humour carefully to defuse frustration.',
  corporate: 'Professional, structured, and solution-oriented. Cite process and policy clearly.',
  tech: 'Technical accuracy first; accessible explanations second. Link to docs liberally.',
  organic: 'Empathetic and honest. Acknowledge root causes; no corporate deflection.',
  retro: 'Courteous and personal. Use first names; sign off with warmth.',
};

const STYLE_FEEDBACK_CHANNELS: Record<BrandStyle, string[]> = {
  minimal: ['In-app NPS widget', 'One-question post-purchase email', 'Public status-page comments'],
  bold: ['Social listening dashboard', 'Community Q&A live sessions', 'Contest-based reviews'],
  elegant: [
    'Post-experience survey via personal email',
    '1-to-1 client check-in calls',
    'Private advisory council',
  ],
  playful: ['Fun emoji-reaction surveys', 'In-app feedback game', 'Community poll of the week'],
  corporate: [
    'Quarterly business review survey',
    'Formal RFI process',
    'CSAT after every support ticket',
  ],
  tech: [
    'In-product telemetry opt-in',
    'GitHub issue tracker for bugs',
    'Automated CSAT after API calls',
  ],
  organic: [
    'Community forum threads',
    'Open suggestion board visible to all',
    'Annual impact survey',
  ],
  retro: [
    'Printed feedback card in the box',
    'Phone check-in for long-term customers',
    'Community town hall',
  ],
};

function buildPersonas(brand: BrandIdentity): CustomerPersona[] {
  const industry = brand.industry.toLowerCase();

  const isTech =
    industry.includes('tech') || industry.includes('software') || industry.includes('saas');
  const isRetail =
    industry.includes('retail') || industry.includes('ecommerce') || industry.includes('fashion');
  const isHealth =
    industry.includes('health') || industry.includes('wellness') || industry.includes('fitness');

  const primaryPain = isTech
    ? 'Integration complexity and time-to-value uncertainty'
    : isRetail
      ? "Choice overload and fear of buyer's remorse"
      : isHealth
        ? 'Overwhelming information and lack of personalised guidance'
        : 'Finding a reliable solution they can trust';

  const primaryGoal = isTech
    ? 'Ship faster with fewer blockers'
    : isRetail
      ? 'Feel confident in purchase decisions'
      : isHealth
        ? 'Achieve measurable wellbeing outcomes'
        : 'Solve their core problem with minimal friction';

  return [
    {
      name: 'The Early Adopter',
      demographics: '25–35, digitally native, urban professional',
      goals: [primaryGoal, 'Be first to try new things', 'Share discoveries with their network'],
      painPoints: [primaryPain, 'Slow onboarding', 'Lack of customisation'],
      motivations: ['Status', 'Curiosity', 'Efficiency'],
      preferredChannels: ['Social media', 'Email', 'In-app notifications'],
      messageResonance: `Emphasise innovation and being at the cutting edge of ${brand.industry}.`,
    },
    {
      name: 'The Pragmatic Buyer',
      demographics: '35–50, decision-maker, value-driven',
      goals: ['Reliable ROI', 'Proven track record', 'Easy team adoption'],
      painPoints: ['Switching costs', 'Vendor lock-in risk', 'Hidden pricing'],
      motivations: ['Value for money', 'Risk reduction', 'Team productivity'],
      preferredChannels: ['Email', 'Case studies', 'Peer reviews'],
      messageResonance: 'Lead with proof points, testimonials, and transparent pricing.',
    },
    {
      name: 'The Loyal Advocate',
      demographics: 'Existing customer, 2+ years, high NPS',
      goals: [
        'Stay up to date with new features',
        'Connect with other users',
        'Get exclusive benefits',
      ],
      painPoints: ['Feeling taken for granted', 'Support response times', 'Lack of recognition'],
      motivations: ['Community', 'Exclusivity', 'Partnership'],
      preferredChannels: ['Community platform', 'Direct email', 'VIP events'],
      messageResonance: `Reward loyalty visibly; invite them into the ${brand.name} story.`,
    },
  ];
}

function buildJourneyStages(brand: BrandIdentity): CustomerJourneyStage[] {
  const style = brand.style ?? 'minimal';
  const loyaltyItems = STYLE_LOYALTY_STRATEGY[style] ?? STYLE_LOYALTY_STRATEGY.minimal;

  return [
    {
      stage: 'Awareness',
      touchpoints: ['Social media ad', 'Word of mouth', 'Search engine result', 'Press mention'],
      emotions: 'Curious, slightly sceptical',
      opportunities: [
        `Lead with ${brand.name}'s unique value in the first 3 seconds`,
        'Use social proof prominently',
        'Ensure SEO meta descriptions reflect brand voice',
      ],
      kpis: ['Impressions', 'Share of voice', 'Branded search volume'],
    },
    {
      stage: 'Consideration',
      touchpoints: ['Website', 'Comparison sites', 'Free trial / demo', 'Review platforms'],
      emotions: 'Evaluating, hopeful, cautious',
      opportunities: [
        'Reduce time-to-value in onboarding flow',
        'Surface customer testimonials relevant to prospect vertical',
        'Provide a clear pricing page with no hidden costs',
      ],
      kpis: ['Trial sign-up rate', 'Demo-to-close ratio', 'Time on site'],
    },
    {
      stage: 'Purchase',
      touchpoints: [
        'Checkout flow',
        'Sales conversation',
        'Contract / subscription',
        'Payment gateway',
      ],
      emotions: 'Excited, momentarily anxious',
      opportunities: [
        'Minimise checkout friction to three steps or fewer',
        'Send immediate confirmation with next-steps guide',
        'Offer live chat support at point of payment',
      ],
      kpis: ['Conversion rate', 'Cart abandonment rate', 'Average order value'],
    },
    {
      stage: 'Onboarding',
      touchpoints: ['Welcome email series', 'In-product tour', 'Knowledge base', 'Success call'],
      emotions: 'Eager, potentially overwhelmed',
      opportunities: [
        'Deliver first value milestone within 24 hours',
        'Personalise onboarding path by use case',
        'Celebrate quick wins with in-app notifications',
      ],
      kpis: ['Activation rate', 'Time-to-first-value', 'Onboarding completion rate'],
    },
    {
      stage: 'Retention',
      touchpoints: ['Regular product updates', 'Support team', 'Community', 'Loyalty programme'],
      emotions: 'Settled, looking for growth',
      opportunities: [
        loyaltyItems[0] ?? 'Implement a loyalty reward',
        'Run quarterly check-ins to surface expansion opportunities',
        'Proactively flag underused features that match customer goals',
      ],
      kpis: ['Net Revenue Retention', 'Churn rate', 'Monthly active usage'],
    },
    {
      stage: 'Advocacy',
      touchpoints: [
        'Referral programme',
        'Case study invitation',
        'Community leadership',
        'Review request',
      ],
      emotions: 'Proud, evangelistic',
      opportunities: [
        'Make it easy to share brand love with one-click referral links',
        'Co-create content with top advocates',
        'Feature customer stories prominently in marketing',
      ],
      kpis: ['Net Promoter Score', 'Referral conversion rate', 'User-generated content volume'],
    },
  ];
}

function buildVoiceOfCustomerPlan(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const channels = STYLE_FEEDBACK_CHANNELS[style] ?? STYLE_FEEDBACK_CHANNELS.minimal;

  return [
    `Collect structured feedback via: ${channels.slice(0, 2).join(', ')}`,
    'Run quarterly NPS survey across all active customers',
    'Conduct monthly 30-minute customer interviews (6–8 per quarter)',
    'Monitor public review platforms (G2, Trustpilot, Google) weekly',
    'Establish a closed beta programme for pre-release feedback',
    'Share VoC insights with product and marketing teams monthly',
    'Close the loop: inform customers when their feedback drives a change',
  ];
}

function buildBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const approach = STYLE_CX_APPROACH[style] ?? STYLE_CX_APPROACH.minimal;
  const tag = brand.tagline ? ` — "${brand.tagline}"` : '';
  return (
    `${brand.name}${tag} (${brand.industry}) customer experience strategy. ` +
    `CX philosophy: ${approach.split('.')[0]}. ` +
    `Three primary personas identified. Six-stage journey mapped from awareness to advocacy.`
  );
}

export function generateBrandCustomer(brand: BrandIdentity): BrandCustomerOutput {
  const style = brand.style ?? 'minimal';

  return {
    cxApproach: STYLE_CX_APPROACH[style] ?? STYLE_CX_APPROACH.minimal,
    loyaltyStrategy: STYLE_LOYALTY_STRATEGY[style] ?? STYLE_LOYALTY_STRATEGY.minimal,
    supportTone: STYLE_SUPPORT_TONE[style] ?? STYLE_SUPPORT_TONE.minimal,
    feedbackChannels: STYLE_FEEDBACK_CHANNELS[style] ?? STYLE_FEEDBACK_CHANNELS.minimal,
    personas: buildPersonas(brand),
    journeyStages: buildJourneyStages(brand),
    voiceOfCustomerPlan: buildVoiceOfCustomerPlan(brand),
    customerBriefSummary: buildBriefSummary(brand),
  };
}
