import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandNewsletterOutput } from '../../types.js';

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

const STYLE_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Clean, curated digest — less is more, every edition earns its send',
  bold: 'High-energy flagship publication with strong opinions and striking visuals',
  elegant: 'Premium editorial letter — polished prose, exclusive insights, high production',
  playful: 'Fun, personality-packed bulletin with surprises and interactive elements',
  corporate:
    'Professional intelligence briefing — authority, reliability, decision-relevant content',
  tech: 'Developer-first technical dispatch — code, tools, deep dives, and community updates',
  organic: 'Values-driven community letter — impact stories, provenance, and seasonal connection',
  retro: 'Vintage-flavoured gazette — nostalgic design, timeless wisdom, archival depth',
};

const STYLE_FORMAT: Record<BrandStyle, string[]> = {
  minimal: ['Single-topic deep dive', 'Curated link round-up', 'One insight + one action'],
  bold: [
    'Feature story + quick hits',
    'Opinion column + reader debate',
    'Visual-first with short copy',
  ],
  elegant: ['Long-form essay', "Editor's letter + curated picks", 'Exclusive interview transcript'],
  playful: [
    'Quiz + fun facts',
    'Story-driven narrative with illustrations',
    'Interactive polls + results',
  ],
  corporate: [
    'Executive briefing format',
    'Market intelligence digest',
    'Trend analysis + implications',
  ],
  tech: [
    'Tutorial + code snippet',
    'Tool roundup + benchmarks',
    'Open-source spotlight + changelog',
  ],
  organic: ['Seasonal story', 'Impact report snippet', 'Producer profile + recipe/tip'],
  retro: [
    'Feature column + classifieds',
    'Photo essay + captions',
    'Historical throwback + modern parallel',
  ],
};

const STYLE_CADENCE: Record<BrandStyle, string> = {
  minimal: 'Bi-weekly — quality over quantity',
  bold: 'Weekly — maintain momentum and anticipation',
  elegant: 'Monthly — premium feel, subscribers look forward to each edition',
  playful: 'Weekly — frequent enough to sustain delight and habit',
  corporate: 'Weekly or bi-weekly — aligned with business news cycles',
  tech: 'Weekly — fast-moving ecosystem demands regular updates',
  organic: 'Monthly or seasonal — aligned with nature and harvest cycles',
  retro: 'Bi-weekly — measured pace evokes the magazine era',
};

const STYLE_SUBJECT_LINE_FORMULA: Record<BrandStyle, string> = {
  minimal: 'Direct + specific: "The one thing worth reading this week"',
  bold: 'Provocative + numbered: "5 truths the industry won\'t tell you"',
  elegant: 'Intriguing + exclusive: "An editor\'s note on [topic] — for subscribers only"',
  playful: 'Emoji + curiosity: "🎉 We tried 47 [thing] so you don\'t have to"',
  corporate: 'Data-led + authoritative: "[Stat] — what it means for your business"',
  tech: 'Technical + actionable: "How to [achieve X] with [framework/tool]"',
  organic: 'Story-first + seasonal: "This month from [region/producer]: [story hook]"',
  retro: 'Nostalgic + timeless: "From the archive: the [era] guide to [topic]"',
};

const STYLE_PERSONALISATION: Record<BrandStyle, string[]> = {
  minimal: ['First-name greeting', 'Curated section relevant to reader interest'],
  bold: ['Dynamic hero image by segment', 'Personalised CTA based on last click'],
  elegant: ['Handwritten-style signature', 'Exclusive member tier section'],
  playful: ['Personalised quiz results', 'Name in subject line + fun fact'],
  corporate: ['Industry-specific insights block', 'Role-based recommended content'],
  tech: ['Stack-based code snippets', 'Contributor shout-out by username'],
  organic: ['Nearest producer/farm recommendation', 'Seasonal tip by location'],
  retro: ['Reader spotlight feature', "Archival reference to reader's year of joining"],
};

function buildSections(brand: BrandIdentity, safeStyle: BrandStyle): string[] {
  const base = [
    'Hero header with brand logo and edition number',
    "Editor's note / personal message (3-5 sentences)",
    'Feature content block (primary story or insight)',
    'Secondary content block (2-3 shorter items)',
    'Call-to-action section with single primary CTA',
    'Footer with unsubscribe, social links, and legal text',
  ];
  if (safeStyle === 'tech') {
    base.splice(3, 0, 'Code snippet or tool spotlight block');
    base.splice(5, 0, 'Community contributions / open-source picks');
  } else if (safeStyle === 'corporate') {
    base.splice(3, 0, 'Market data or statistic callout block');
    base.splice(5, 0, 'Upcoming events or webinar promotion');
  } else if (safeStyle === 'playful') {
    base.splice(3, 0, 'Fun fact or trivia section');
    base.splice(6, 0, 'Meme, gif, or illustrated moment');
  } else if (safeStyle === 'elegant') {
    base.splice(3, 0, 'Exclusive subscriber-only section');
    base.splice(5, 0, 'Recommended reading / curated picks');
  }
  return base;
}

function buildDeliverabilityChecklist(brand: BrandIdentity): string[] {
  return [
    `Sender name is recognisable as ${brand.name} — not a generic address`,
    'From address uses a custom domain (not @gmail.com / @yahoo.com)',
    'SPF, DKIM, and DMARC DNS records verified and passing',
    'Unsubscribe link present in every edition (CAN-SPAM / GDPR)',
    'Text-to-image ratio maintained above 60:40 to avoid spam filters',
    'No spam trigger words in subject line or preview text',
    'List hygiene: hard bounces removed within 24 hours',
    'Soft bounces monitored and suppressed after 3 attempts',
    'Re-engagement campaign triggered at 90 days of inactivity',
    'Plain-text version included alongside HTML version',
  ];
}

function buildAccessibilityGuidelines(): string[] {
  return [
    'Minimum 16px body font size — 14px for supplementary text only',
    'Line height 1.5x or greater for body copy',
    'Colour contrast ratio 4.5:1 for body text, 3:1 for large text (WCAG AA)',
    "Alt text on all images — descriptive, not 'image001.jpg'",
    'Avoid relying on colour alone to convey information',
    'Logical heading hierarchy: H1 for subject, H2 for sections',
    'CTA buttons minimum 44x44px touch target, clear label text',
  ];
}

function buildSuccessMetrics(safeStyle: BrandStyle): Record<string, string> {
  const base: Record<string, string> = {
    open_rate: 'Target 35-45% (industry avg 21%)',
    click_to_open_rate: 'Target 15-25%',
    unsubscribe_rate: 'Keep below 0.2% per send',
    spam_complaint_rate: 'Keep below 0.08%',
    list_growth_rate: 'Target 5-10% monthly net growth',
    revenue_per_subscriber: 'Track for monetised newsletters',
  };
  if (safeStyle === 'tech') {
    base['github_clicks'] = 'Track developer-specific CTA engagement';
    base['code_copy_events'] = 'If hosted/interactive newsletter';
  }
  if (safeStyle === 'corporate') {
    base['qualified_lead_attribution'] = 'UTM-tagged newsletter conversion to pipeline';
    base['content_download_rate'] = 'Gated asset downloads from newsletter clicks';
  }
  return base;
}

function buildNewsletterBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  const approach = STYLE_APPROACH[safeStyle];
  const cadence = STYLE_CADENCE[safeStyle];
  return `${brand.name}${taglinePart} newsletter strategy: ${approach}. ${cadence}. Subject line formula: ${STYLE_SUBJECT_LINE_FORMULA[safeStyle].split(':')[0]}.`;
}

export function generateBrandNewsletter(brand: BrandIdentity): BrandNewsletterOutput {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    newsletterApproach: STYLE_APPROACH[safeStyle],
    recommendedFormats: STYLE_FORMAT[safeStyle],
    publishingCadence: STYLE_CADENCE[safeStyle],
    subjectLineFormula: STYLE_SUBJECT_LINE_FORMULA[safeStyle],
    personalisationStrategy: STYLE_PERSONALISATION[safeStyle],
    newsletterSections: buildSections(brand, safeStyle),
    deliverabilityChecklist: buildDeliverabilityChecklist(brand),
    accessibilityGuidelines: buildAccessibilityGuidelines(),
    successMetrics: buildSuccessMetrics(safeStyle),
    newsletterBriefSummary: buildNewsletterBriefSummary(brand, safeStyle),
  };
}
