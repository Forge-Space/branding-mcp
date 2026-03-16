import type {
  BrandIdentity,
  BrandStyle,
  EmailTemplate,
  EmailCampaign,
  BrandEmailOutput,
} from '../../types.js';

const STYLE_COPY_TONE: Record<BrandStyle, string> = {
  minimal: 'Clear, concise, and direct. No fluff. Every word earns its place.',
  bold: 'Energetic, confident, and punchy. Short sentences. Big impact.',
  elegant: 'Refined, graceful, and aspirational. Evokes emotion through careful language.',
  playful: 'Fun, warm, and conversational. Use contractions, humor, and personality.',
  corporate: 'Professional, trustworthy, and informative. Formal yet approachable.',
  tech: 'Smart, precise, and solution-focused. Speak to outcomes and efficiency.',
  organic: 'Warm, authentic, and community-driven. Natural language, human connection.',
  retro: 'Nostalgic, character-rich, and distinctive. Classic references, timeless feel.',
};

const STYLE_SUBJECT_FORMULAS: Record<BrandStyle, string[]> = {
  minimal: [
    'Introducing [Feature/Offer]',
    'One thing you should know about [Topic]',
    '[Number] words: [Key message]',
  ],
  bold: [
    'This changes everything.',
    "Ready to [Achievement]? Here's how.",
    'We just dropped [Product/News] 🔥',
  ],
  elegant: [
    'A new chapter begins — [Brand Name]',
    'Curated for you: [Content/Offer]',
    'The art of [Topic]',
  ],
  playful: [
    'Psst… [Secret/Offer] inside! 🎉',
    'You asked, we delivered (sort of) 😄',
    'This email is 100% fun-free (just kidding)',
  ],
  corporate: [
    'Important update: [Topic]',
    'Your [Period] report is ready',
    'Action required: [Topic]',
  ],
  tech: [
    "[Feature] is live — here's what you can do",
    "We fixed [Problem]. Here's how.",
    'Performance update: [Metric] improved by [X]%',
  ],
  organic: [
    'From our community to yours 🌿',
    'A note from [Founder/Team]',
    "What's growing this [Season/Month]",
  ],
  retro: [
    'Flash back to [Year/Era]',
    'Old school cool: [Topic]',
    'Remember when [Nostalgic reference]? We do.',
  ],
};

const STYLE_CTA: Record<BrandStyle, string> = {
  minimal: 'Get started',
  bold: 'Take action now',
  elegant: 'Discover more',
  playful: "Let's go! 🚀",
  corporate: 'Learn more',
  tech: 'See how it works',
  organic: 'Join us',
  retro: 'Step back in time',
};

const STYLE_CAMPAIGNS: Record<BrandStyle, EmailCampaign[]> = {
  minimal: [
    {
      type: 'Onboarding',
      goal: 'Help new users get value quickly',
      frequency: '3-email sequence over 7 days',
      keyMessages: ['Welcome to [Brand]', 'Your first step', "You're set up"],
      callToAction: 'Start now',
    },
    {
      type: 'Product Update',
      goal: 'Inform users of new features or improvements',
      frequency: 'As-needed, max 2x/month',
      keyMessages: ['What changed', 'Why it matters', 'What to do next'],
      callToAction: 'See the update',
    },
  ],
  bold: [
    {
      type: 'Launch Campaign',
      goal: 'Drive excitement and conversions for a new product',
      frequency: 'Countdown: 7 days before, day-of, 3 days after',
      keyMessages: ['The wait is over', 'Introducing [Product]', 'Last chance to get [Offer]'],
      callToAction: 'Get it now',
    },
    {
      type: 'Re-engagement',
      goal: 'Win back inactive subscribers',
      frequency: 'Single email + 1 follow-up',
      keyMessages: ['We miss you', "Here's what you've missed", 'Come back offer'],
      callToAction: 'Claim your offer',
    },
  ],
  elegant: [
    {
      type: 'Curated Content',
      goal: 'Build brand authority and reader loyalty',
      frequency: 'Weekly or bi-weekly',
      keyMessages: ['Handpicked for you', 'This week in [Industry]', "Editor's note"],
      callToAction: 'Read the full story',
    },
    {
      type: 'Seasonal Campaign',
      goal: 'Drive seasonal purchases or engagement',
      frequency: 'Holiday and seasonal moments',
      keyMessages: ['A gift for you', 'Limited-time elegance', "This season's collection"],
      callToAction: 'Shop the collection',
    },
  ],
  playful: [
    {
      type: 'Nurture Series',
      goal: 'Build relationship and move subscribers toward purchase',
      frequency: 'Weekly, 4-email series',
      keyMessages: [
        'Get to know us',
        "Here's something fun",
        'A little gift for you',
        'Ready to [action]?',
      ],
      callToAction: "Let's do this",
    },
    {
      type: 'Birthday / Anniversary',
      goal: 'Celebrate the subscriber and drive loyalty',
      frequency: 'Triggered by date',
      keyMessages: ['Happy [occasion]!', 'A special gift just for you', "Because you're awesome"],
      callToAction: 'Claim your gift',
    },
  ],
  corporate: [
    {
      type: 'Newsletter',
      goal: 'Keep stakeholders informed of company news',
      frequency: 'Monthly',
      keyMessages: ['Company update', 'Industry insights', 'Upcoming events'],
      callToAction: 'Read the full report',
    },
    {
      type: 'Transactional',
      goal: 'Confirm actions and provide essential information',
      frequency: 'Triggered by action',
      keyMessages: ['Your request was received', 'Action required', 'Confirmation details'],
      callToAction: 'View details',
    },
  ],
  tech: [
    {
      type: 'Product Release Notes',
      goal: 'Keep users informed of platform changes',
      frequency: 'Per release cycle',
      keyMessages: ["What's new", 'Bug fixes', 'What to try first'],
      callToAction: 'See the changelog',
    },
    {
      type: 'Technical Tutorial',
      goal: 'Help users get more value from the product',
      frequency: 'Bi-weekly',
      keyMessages: ["Today's tip", 'Step-by-step guide', 'Advanced technique unlocked'],
      callToAction: 'Try it now',
    },
  ],
  organic: [
    {
      type: 'Community Update',
      goal: 'Keep community members engaged and connected',
      frequency: 'Weekly',
      keyMessages: ["What's happening", 'Community spotlight', 'How you can help'],
      callToAction: 'Join the conversation',
    },
    {
      type: 'Seasonal / Impact Report',
      goal: 'Share brand values and environmental / social impact',
      frequency: 'Quarterly',
      keyMessages: [
        'Our impact this season',
        "What we've grown",
        'Thank you for being part of this',
      ],
      callToAction: 'Read our story',
    },
  ],
  retro: [
    {
      type: 'Throwback Series',
      goal: 'Build nostalgia and community through shared memories',
      frequency: 'Monthly',
      keyMessages: ['Remember when...', 'A classic revisited', 'Then vs. now'],
      callToAction: 'Take a trip down memory lane',
    },
    {
      type: 'Exclusive Members',
      goal: 'Reward loyal subscribers with exclusive offers or content',
      frequency: 'Monthly',
      keyMessages: ['For our most loyal fans', 'A special edition just for you', 'Collectors only'],
      callToAction: 'Claim your exclusive',
    },
  ],
};

function buildTemplates(brand: BrandIdentity): EmailTemplate[] {
  const cta = STYLE_CTA[brand.style] ?? 'Learn more';
  const subjectFormulas = STYLE_SUBJECT_FORMULAS[brand.style] ?? STYLE_SUBJECT_FORMULAS.minimal;

  return [
    {
      name: 'Welcome Email',
      purpose: 'Greet new subscribers and set expectations',
      subjectLineFormulas: [
        `Welcome to ${brand.name}`,
        `You're in! Here's what's next`,
        ...subjectFormulas.slice(0, 1),
      ],
      preheaderText: `Thanks for joining ${brand.name}. Here's everything you need to get started.`,
      structure: [
        'Header: Logo + brand hero image',
        'Headline: Welcome message personalized with name',
        'Body: What the brand does and what to expect',
        'Key benefit: 1-3 bullet points',
        `CTA button: "${cta}"`,
        'Footer: Unsubscribe | Privacy Policy | Social links',
      ],
      designNotes: `Use primary brand color for CTA button. Keep layout single-column. Max width 600px.`,
    },
    {
      name: 'Product / Offer Announcement',
      purpose: 'Announce a new product, feature, or promotion',
      subjectLineFormulas: subjectFormulas,
      preheaderText: `Something exciting just launched. Don't miss it.`,
      structure: [
        'Header: Logo',
        'Hero: Product image or lifestyle photo',
        'Headline: Bold announcement',
        'Body: Key details — what it is, why it matters',
        `CTA button: "${cta}"`,
        'Optional: Secondary offer or related content',
        'Footer: Unsubscribe | Privacy Policy',
      ],
      designNotes: `Hero image should use brand color palette. Limit to 1-2 CTAs.`,
    },
    {
      name: 'Newsletter',
      purpose: 'Share valuable content, updates, and curated insights',
      subjectLineFormulas: [
        `${brand.name} | [Month] Edition`,
        `This week in ${brand.industry ?? 'our world'}`,
        ...subjectFormulas.slice(0, 1),
      ],
      preheaderText: `Your curated update from ${brand.name}.`,
      structure: [
        'Header: Logo + newsletter name/date',
        'Section 1: Top story or featured article',
        'Section 2: Secondary content pieces (2-3 items)',
        'Section 3: Quick tips or community highlights',
        'Footer: Unsubscribe | View in browser | Social links',
      ],
      designNotes: `Use consistent section headers. Alternate background colors for sections. Keep images small and relevant.`,
    },
    {
      name: 'Re-engagement / Win-back',
      purpose: 'Re-activate subscribers who have gone inactive',
      subjectLineFormulas: [
        `We miss you, [Name]`,
        `It's been a while — here's a gift`,
        `Are you still there? 👋`,
      ],
      preheaderText: `We saved something special for you.`,
      structure: [
        'Header: Logo',
        'Headline: Acknowledge the absence warmly',
        "Body: Reminder of brand value + what's new",
        'Offer: Special discount or exclusive content',
        `CTA button: "${cta}"`,
        'Secondary CTA: Update preferences or unsubscribe',
        'Footer: Standard footer',
      ],
      designNotes: `Tone should be warm, not guilt-tripping. One strong offer. Clear secondary option to unsubscribe or adjust frequency.`,
    },
  ];
}

function buildSubjectLineExamples(brand: BrandIdentity): string[] {
  const formulas = STYLE_SUBJECT_FORMULAS[brand.style] ?? STYLE_SUBJECT_FORMULAS.minimal;
  return [
    ...formulas,
    `${brand.name}: [Your personal update]`,
    `Don't miss this from ${brand.name}`,
    `[First name], this is for you`,
  ];
}

function buildColorUsage(brand: BrandIdentity): BrandEmailOutput['colorUsage'] {
  return {
    background: brand.colors.neutral[0]?.hex ?? '#ffffff',
    text: brand.colors.neutral[brand.colors.neutral.length - 1]?.hex ?? '#1a1a1a',
    accent: brand.colors.primary.hex,
    button: brand.colors.primary.hex,
  };
}

function buildTypographyGuidelines(brand: BrandIdentity): BrandEmailOutput['typographyGuidelines'] {
  return {
    headingFont: `${brand.typography.headingFont}, sans-serif`,
    bodyFont: `${brand.typography.bodyFont}, sans-serif`,
    fontSize: '16px base, 24-32px headings',
    lineHeight: '1.6 for body text, 1.2 for headings',
  };
}

export function generateBrandEmail(brand: BrandIdentity): BrandEmailOutput {
  const style = brand.style ?? 'minimal';
  const campaigns = STYLE_CAMPAIGNS[style] ?? STYLE_CAMPAIGNS.minimal;
  const copyTone = STYLE_COPY_TONE[style] ?? STYLE_COPY_TONE.minimal;

  return {
    templates: buildTemplates(brand),
    campaigns,
    subjectLineExamples: buildSubjectLineExamples(brand),
    preheaderExamples: [
      `Everything you need to know from ${brand.name}.`,
      `Curated just for you — don't miss it.`,
      `New from ${brand.name}: [Topic]. Open to find out more.`,
      `Your exclusive update is inside.`,
    ],
    colorUsage: buildColorUsage(brand),
    typographyGuidelines: buildTypographyGuidelines(brand),
    copyTone,
    bestPractices: [
      'Keep subject lines under 50 characters for mobile',
      'Use a single, clear CTA per email',
      'Personalize with first name in subject or opening line',
      'Test at 600px max width for consistent rendering',
      'Include plain-text version for accessibility and deliverability',
      'Maintain 60:40 image-to-text ratio for inbox placement',
      'Send at optimal times: Tuesday–Thursday, 10am–2pm recipient timezone',
      'A/B test subject lines before full send',
    ],
    footerElements: [
      `© ${new Date().getFullYear()} ${brand.name}. All rights reserved.`,
      'Unsubscribe | Manage Preferences',
      'Privacy Policy | Terms of Service',
      `[Company Address]`,
      'View this email in your browser',
    ],
    accessibilityNotes: [
      'Use alt text on all images',
      'Ensure color contrast meets WCAG AA (4.5:1 for body text)',
      `Brand primary ${brand.colors.primary.hex} — check contrast on white backgrounds`,
      'Use semantic HTML headings (h1, h2, h3)',
      'Make CTA buttons at least 44px tall for touch targets',
      'Avoid using color alone to convey meaning',
    ],
  };
}
