import type {
  BrandIdentity,
  BrandStyle,
  BrandCrisisOutput,
  CrisisResponsePhase,
  CrisisStakeholder,
} from '../../types.js';

const STYLE_CRISIS_TONE: Record<BrandStyle, string> = {
  minimal: 'Clear, factual, and measured — no dramatisation',
  bold: 'Confident and direct — own the narrative proactively',
  elegant: 'Composed and authoritative — project calm leadership',
  playful: 'Human and empathetic — balance warmth with accountability',
  corporate: 'Formal and structured — follow protocol precisely',
  tech: 'Transparent and data-driven — lead with facts and timelines',
  organic: 'Authentic and community-first — centre stakeholder wellbeing',
  retro: 'Honest and grounded — appeal to shared history and trust',
};

const STYLE_FIRST_RESPONSE: Record<BrandStyle, string[]> = {
  minimal: [
    'Acknowledge the issue within 1 hour of awareness',
    'State what is known and what is being investigated',
    'Avoid speculation; commit to follow-up timeline',
  ],
  bold: [
    'Issue a confident holding statement within 30 minutes',
    'Name the senior spokesperson immediately',
    'Commit to full transparency and regular updates',
  ],
  elegant: [
    'Release a measured initial statement via official channels',
    'Convey leadership engagement without over-promising',
    'Use precise language; avoid emotional amplifiers',
  ],
  playful: [
    'Acknowledge impact on community in human, warm language',
    'Avoid corporate jargon; be genuinely sorry if at fault',
    'Commit to making things right, not just fixing the process',
  ],
  corporate: [
    'Issue formal holding statement per approved template',
    'Activate crisis management committee within the first hour',
    'Log all communications and decisions for audit trail',
  ],
  tech: [
    'Publish an incident report stub within 30 minutes',
    'Share status-page link immediately; update every 30 minutes',
    'Lead with technical facts and root-cause investigation status',
  ],
  organic: [
    'Prioritise personal outreach to directly affected stakeholders',
    'Be transparent about supply chain or ingredient concerns',
    'Involve community voices in the response plan where possible',
  ],
  retro: [
    'Reference brand history and values in the opening statement',
    'Use the founder or long-tenured leader as spokesperson',
    'Emphasise continuity and commitment to original mission',
  ],
};

const STYLE_SPOKESPERSON: Record<BrandStyle, string> = {
  minimal: 'Communications Director — concise, on-message',
  bold: 'CEO — high-visibility, confident delivery',
  elegant: 'CEO or Chair — composed, authoritative tone',
  playful: 'Brand Director or Community Lead — approachable and genuine',
  corporate: 'Corporate Affairs Director — protocol-adherent',
  tech: 'CTO or VP Engineering — technical credibility',
  organic: 'Founder or Head of Impact — mission-aligned',
  retro: 'Founder or longest-serving leader — trust and continuity',
};

const STYLE_CHANNEL_PRIORITY: Record<BrandStyle, string[]> = {
  minimal: ['Press release', 'Brand website', 'Email to affected parties'],
  bold: ['CEO video statement', 'Press release', 'Social media', 'Media interviews'],
  elegant: ['Official press release', 'Private briefing for key stakeholders', 'Brand website'],
  playful: ['Social media', 'Email community update', 'Brand blog', 'Live Q&A'],
  corporate: [
    'Formal press release',
    'Regulatory filings if required',
    'Investor relations notification',
    'Internal all-hands',
  ],
  tech: ['Status page', 'Technical blog post', 'Developer newsletter', 'Social media (Twitter/X)'],
  organic: ['Direct email to community', 'Social media', 'Retailer briefing', 'Press statement'],
  retro: ['Press release', 'Personal letter from founder', 'Brand website', 'Email subscribers'],
};

function buildResponsePhases(brand: BrandIdentity, safeStyle: BrandStyle): CrisisResponsePhase[] {
  const toneHint = STYLE_CRISIS_TONE[safeStyle] ?? STYLE_CRISIS_TONE.minimal;
  return [
    {
      phase: '0–1 hour: First Alert',
      objectives: ['Confirm facts internally', 'Notify crisis team', 'Draft holding statement'],
      actions: [
        'Activate crisis management protocol',
        'Brief executive sponsor',
        `Issue holding statement (${toneHint.split(' ')[0].toLowerCase()} tone)`,
        'Monitor media and social channels',
      ],
      communicationsAction: 'Holding statement only — do not over-commit',
    },
    {
      phase: '1–4 hours: Containment',
      objectives: ['Establish facts', 'Align internal messaging', 'Engage affected stakeholders'],
      actions: [
        'Convene crisis committee',
        'Prepare updated statement with known facts',
        `Activate ${STYLE_SPOKESPERSON[safeStyle] ?? STYLE_SPOKESPERSON.minimal} as spokesperson`,
        'Set up media monitoring cadence (every 15 min)',
      ],
      communicationsAction: 'Detailed factual update; empathy-led language',
    },
    {
      phase: '4–24 hours: Active Management',
      objectives: ['Demonstrate action', 'Manage media narrative', 'Support affected parties'],
      actions: [
        `Publish full statement via: ${(STYLE_CHANNEL_PRIORITY[safeStyle] ?? STYLE_CHANNEL_PRIORITY.minimal).slice(0, 2).join(', ')}`,
        'Offer media interviews to key outlets',
        'Update internal teams every 2 hours',
        'Document all actions for post-crisis review',
      ],
      communicationsAction: 'Proactive narrative management; facts + remediation commitments',
    },
    {
      phase: '24–72 hours: Resolution Path',
      objectives: [
        'Communicate remediation steps',
        'Begin trust rebuilding',
        'Prepare post-crisis review',
      ],
      actions: [
        'Publish remediation timeline',
        'Engage affected stakeholders directly',
        'Brief employees with full picture',
        'Monitor sentiment recovery metrics',
      ],
      communicationsAction: 'Progress updates; acknowledge lessons learned',
    },
    {
      phase: 'Post-Crisis (72 hours+): Recovery',
      objectives: ['Rebuild brand trust', 'Complete internal review', 'Update crisis playbook'],
      actions: [
        'Publish post-incident report (where appropriate)',
        'Conduct internal debrief and playbook update',
        'Re-engage community with positive brand storytelling',
        `Resume ${brand.name} normal communications cadence`,
      ],
      communicationsAction: 'Transition from crisis to recovery narrative',
    },
  ];
}

function buildDarkSiteContent(brand: BrandIdentity): string[] {
  return [
    `Crisis landing page at ${brand.name.toLowerCase().replace(/\s+/g, '')}-update.com (or sub-domain)`,
    'Plain-language summary of the situation',
    'What we know and what we are doing',
    'FAQ updated in real time',
    'Contact form or helpline for affected parties',
    'Timeline of key events and communications',
    'Named spokesperson with photo',
    'Links to official statements and documents',
  ];
}

function buildStakeholderMatrix(brand: BrandIdentity): CrisisStakeholder[] {
  return [
    {
      group: 'Customers / End Users',
      priority: 'Critical',
      channel: 'Email, website, social media',
      messageFrame: `${brand.name} is taking immediate steps to protect you`,
      responseTime: '< 2 hours',
    },
    {
      group: 'Employees',
      priority: 'Critical',
      channel: 'Internal comms, all-hands, manager cascade',
      messageFrame: 'What happened, what we know, what to say to customers',
      responseTime: '< 1 hour',
    },
    {
      group: 'Media / Press',
      priority: 'High',
      channel: 'Press release, spokesperson availability',
      messageFrame: 'Facts-first, proactive, no speculation',
      responseTime: '< 2 hours',
    },
    {
      group: 'Investors / Board',
      priority: 'High',
      channel: 'Direct email, call from CEO/CFO',
      messageFrame: 'Situation summary, financial exposure, mitigation plan',
      responseTime: '< 3 hours',
    },
    {
      group: 'Regulators / Legal',
      priority: 'High',
      channel: 'Formal letter, legal counsel communication',
      messageFrame: 'Compliance-first; proactive disclosure where required',
      responseTime: 'Per legal obligation',
    },
    {
      group: 'Partners / Suppliers',
      priority: 'Medium',
      channel: 'Account manager, direct email',
      messageFrame: 'Impact assessment and operational continuity plan',
      responseTime: '< 6 hours',
    },
  ];
}

function buildMonitoringChecklist(): string[] {
  return [
    'Set up Google Alerts for brand name + crisis keywords',
    'Monitor Twitter/X, LinkedIn, Instagram, TikTok in real time',
    'Track share of voice vs competitors during the event',
    'Monitor review sites (Google, Trustpilot, G2) for new submissions',
    'Set sentiment baseline before and track hourly during crisis',
    'Use social listening tool (Brandwatch, Mention, or Sprout Social)',
    'Monitor news wire services (Reuters, AP, PR Newswire)',
    'Track employee and internal sentiment via pulse survey',
    'Document all media inquiries and response status',
  ];
}

function buildCrisisBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const tone = STYLE_CRISIS_TONE[safeStyle] ?? STYLE_CRISIS_TONE.minimal;
  const taglinePart = brand.tagline ? ` ("${brand.tagline}")` : '';
  return (
    `${brand.name}${taglinePart} crisis communications framework. ` +
    `Response tone: ${tone}. ` +
    `Spokesperson: ${STYLE_SPOKESPERSON[safeStyle] ?? STYLE_SPOKESPERSON.minimal}. ` +
    `Five-phase response from first alert through post-crisis recovery, ` +
    `with dark-site readiness, stakeholder matrix, and monitoring checklist.`
  );
}

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

export function generateBrandCrisis(brand: BrandIdentity): BrandCrisisOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    crisisTone: STYLE_CRISIS_TONE[safeStyle],
    firstResponseGuidelines: STYLE_FIRST_RESPONSE[safeStyle],
    spokespersonGuidance: STYLE_SPOKESPERSON[safeStyle],
    channelPriority: STYLE_CHANNEL_PRIORITY[safeStyle],
    responsePhases: buildResponsePhases(brand, safeStyle),
    darkSiteContent: buildDarkSiteContent(brand),
    stakeholderMatrix: buildStakeholderMatrix(brand),
    monitoringChecklist: buildMonitoringChecklist(),
    doNotSayList: [
      '"No comment"',
      '"We cannot discuss ongoing legal matters" (without context)',
      '"This has never happened before"',
      '"Our products are completely safe"',
      '"It is not our fault"',
      '"The media is exaggerating"',
      'Speculative statements about root cause before investigation',
      'Blame-shifting to third parties without evidence',
    ],
    crisisBriefSummary: buildCrisisBriefSummary(brand, safeStyle),
  };
}
