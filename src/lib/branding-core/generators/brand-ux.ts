import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandUxOutput } from '../../types.js';

// UX writing tone per style
const STYLE_WRITING_VOICE: Record<BrandStyle, string> = {
  minimal: 'Clear, concise, and functional. Every word earns its place.',
  bold: 'Direct, confident, and action-oriented. No fluff.',
  elegant: 'Refined, warm, and precise. Elevated but never cold.',
  playful: 'Friendly, light-hearted, and encouraging. Use contractions and personality.',
  corporate: 'Professional, trustworthy, and structured. Formal but approachable.',
  tech: 'Precise, helpful, and technically literate. Respect user intelligence.',
  organic: 'Natural, empathetic, and human. Conversational and grounded.',
  retro: 'Distinctive, nostalgic, and characterful. Personality-first writing.',
};

// CTA copy per style
const STYLE_CTA: Record<BrandStyle, string[]> = {
  minimal: ['Continue', 'Save', 'Done', 'Submit', 'Next'],
  bold: ['Do it', 'Get started', "Let's go", 'Activate', 'Launch'],
  elegant: ['Proceed', 'Confirm', 'Reserve', 'Request', 'Continue'],
  playful: ['Yes please!', "Let's go!", 'Count me in', 'Woohoo!', 'Start exploring'],
  corporate: ['Submit', 'Confirm', 'Proceed', 'Continue', 'Apply'],
  tech: ['Run', 'Deploy', 'Execute', 'Continue', 'Confirm'],
  organic: ['Yes, please', 'Count me in', 'Continue', 'Let me in', 'Sounds good'],
  retro: ['Go for it', 'Dig in', 'Jump in', 'Rock on', 'Get going'],
};

// Error message tone per style
const STYLE_ERROR_TONE: Record<BrandStyle, string> = {
  minimal: 'State the issue plainly. Tell them exactly what to do to fix it.',
  bold: "Be direct. Don't soften it — just tell them the fix.",
  elegant: 'Acknowledge the issue gracefully. Guide them back with composure.',
  playful: 'Keep it light. Use humour carefully — never joke about data loss.',
  corporate: 'Be formal and factual. Offer a clear resolution path.',
  tech: 'Give technical detail where useful. Show error codes in expandable sections.',
  organic: "Empathise first. Reassure them it's okay, then guide the fix.",
  retro: 'Own the quirk. Use the brand voice even in errors.',
};

// Empty state copy style per style
const STYLE_EMPTY_STATE: Record<BrandStyle, string> = {
  minimal: 'Simple statement + single action. No illustrations required.',
  bold: 'Bold call to action. Make starting feel exciting.',
  elegant: 'Serene and inviting. Suggest the potential of the empty space.',
  playful: 'Fun illustration + playful copy. Make emptiness feel like an invitation.',
  corporate: 'Professional prompt with clear next step and support link.',
  tech: 'Provide example commands or quick-start snippet.',
  organic: 'Warm, encouraging copy. Feels like a kind nudge from a friend.',
  retro: 'Character-filled copy that references the brand personality.',
};

// Onboarding pattern per style
const STYLE_ONBOARDING: Record<BrandStyle, string> = {
  minimal: 'Progress indicator + one action per screen. Skip always available.',
  bold: 'High-energy 3-step setup. Front-load the wow moment.',
  elegant: 'Contextual tooltips appear on first use. No separate onboarding flow.',
  playful: 'Illustrated multi-step wizard with celebration moments and progress mascot.',
  corporate: 'Role-based onboarding checklist with admin controls and team setup.',
  tech: 'Interactive demo environment or sandbox. Docs-first onboarding with API keys prominent.',
  organic: 'Conversational setup wizard. Ask questions naturally, not through forms.',
  retro: 'Character-guided tour with personality. Feels like a friend showing you around.',
};

// Loading state copy per style
const STYLE_LOADING: Record<BrandStyle, string[]> = {
  minimal: ['Loading…', 'Please wait', 'Saving…', 'Processing…'],
  bold: ['On it!', 'Firing it up…', 'Working hard…', 'Almost there!'],
  elegant: ['One moment…', 'Preparing your experience…', 'Almost ready…'],
  playful: ['Hang tight!', 'Almost there! 🎉', 'Doing the magic…', 'Loading good stuff…'],
  corporate: ['Processing request…', 'Retrieving data…', 'Saving changes…', 'Loading…'],
  tech: ['Compiling…', 'Fetching…', 'Executing…', 'Building…'],
  organic: ['Just a moment…', 'Getting things ready…', 'Almost there…'],
  retro: ['Warming up the tubes…', 'Spinning up…', 'Stand by…'],
};

// Tooltip/help text style per style
const STYLE_TOOLTIP: Record<BrandStyle, string> = {
  minimal: 'Only show tooltips for non-obvious actions. Keep under 12 words.',
  bold: 'Short, punchy explanations. Reinforce the benefit, not just the feature.',
  elegant: 'Subtle help text below fields. Tooltips reserved for complex features only.',
  playful: "Friendly explanations with a conversational tone. Use 'you' and 'your'.",
  corporate: 'Formal, precise help text. Link to full documentation where relevant.',
  tech: 'Technical detail welcome. Show types, formats, and examples in tooltips.',
  organic: 'Warm, reassuring text. Feel like a friendly explanation, not a manual.',
  retro: 'Brand-voiced explanations. Keep the character consistent with the personality.',
};

// Notification copy patterns per style
const STYLE_NOTIFICATIONS: Record<BrandStyle, string> = {
  minimal: 'Title + one-line summary. Action link if required.',
  bold: 'Lead with the benefit or outcome. Make it feel like a win.',
  elegant: 'Understated and dignified. No exclamation marks.',
  playful: 'Lead with the positive. Use emoji sparingly for delight.',
  corporate: 'Subject + detail + action. Professional and structured.',
  tech: 'Event type + relevant ID/path. Link to logs or details.',
  organic: 'Warm, conversational summary. Feels like a message from a person.',
  retro: 'Character-voiced notifications. Brand personality comes through.',
};

function buildMicrocopyExamples(brand: BrandIdentity): Record<string, string[]> {
  const style = brand.style ?? 'minimal';
  const ctaSet = STYLE_CTA[style] ?? STYLE_CTA.minimal;
  const loadingSet = STYLE_LOADING[style] ?? STYLE_LOADING.minimal;

  return {
    primaryCTA: ctaSet.slice(0, 3),
    secondaryCTA: ['Cancel', 'Go back', 'Skip for now'],
    destructiveCTA: ['Delete', 'Remove', 'Discard changes'],
    loadingStates: loadingSet,
    successMessages: [
      `${brand.name ? brand.name + ' —' : ''} Changes saved successfully.`,
      'All done! Your settings have been updated.',
      'Success! Everything is ready.',
    ],
    errorMessages: [
      'Something went wrong. Please try again.',
      "We couldn't complete that action. Check your connection and retry.",
      'Invalid input — please check the highlighted fields.',
    ],
    emptyStates: [
      'Nothing here yet.',
      'No results found. Try adjusting your search.',
      'This is empty for now. Start by adding something.',
    ],
  };
}

function buildFormGuidelines(brand: BrandIdentity): Record<string, string> {
  const style = brand.style ?? 'minimal';
  return {
    labelPosition:
      style === 'minimal' || style === 'tech' ? 'Above the input field' : 'Floating label',
    placeholderPolicy:
      'Use placeholder text for format hints only (e.g., YYYY-MM-DD). Never use as a label substitute.',
    requiredIndicator:
      style === 'corporate'
        ? 'Asterisk (*) with legend at top of form'
        : 'Mark optional fields as (optional)',
    inlineValidation:
      'Show validation on blur, not on input. Show errors below the relevant field.',
    submitButton:
      style === 'playful'
        ? 'Use action-oriented, exciting copy e.g. "Create my account!"'
        : 'Use simple, clear copy e.g. "Save changes"',
    multiPageForms:
      'Show step indicator at top. Allow back navigation. Save progress on each step.',
    errorSummary: 'Display an error summary above the form when more than 3 fields have errors.',
  };
}

function buildContentHierarchy(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const base = [
    'H1: Page title — one per page, 2–6 words',
    'H2: Section headings — scannable, benefit-led',
    'H3: Sub-section headings — optional, use sparingly',
    'Body: 16px minimum, 1.5–1.6 line height, 60–80 character line length',
    'Caption: 12–14px, supplementary context only',
  ];
  if (style === 'corporate') {
    base.push('Legal copy: 11px minimum, clearly separated from body content');
  }
  if (style === 'tech') {
    base.push('Code: Monospace, 14px, syntax highlighted, copyable');
  }
  return base;
}

function buildAccessibilityGuidelines(brand: BrandIdentity): string[] {
  return [
    'All interactive elements need visible focus states (3:1 contrast minimum)',
    `Primary colour (#${brand.colors?.primary?.hex ?? '000000'}) must meet 4.5:1 contrast ratio on white backgrounds`,
    'Error messages must not rely on colour alone — use icons or text labels',
    'All form inputs need associated labels (not just placeholder text)',
    'Loading states must announce to screen readers (use aria-live="polite")',
    'Avoid auto-playing motion; respect prefers-reduced-motion',
    'Touch targets minimum 44×44px (iOS HIG) or 48×48dp (Material)',
    'Keyboard navigation: all actions reachable without a mouse',
    'Images need descriptive alt text; decorative images use alt=""',
    'Modals must trap focus and restore it on close',
  ];
}

function buildContentStrategy(brand: BrandIdentity): Record<string, string[]> {
  const style = brand.style ?? 'minimal';
  return {
    writingPrinciples: [
      'Lead with the user benefit, not the feature name',
      'Use plain language — aim for grade 8 reading level',
      'Active voice over passive voice',
      style === 'playful' || style === 'organic'
        ? 'Contractions are welcome — they sound human'
        : 'Use contractions sparingly in formal contexts',
      'Avoid jargon unless your audience expects it',
    ],
    terminology: [
      'Use consistent terms throughout the product — never "sign in" in one place and "log in" in another',
      'Document your product glossary and share it with the whole team',
      'Use second person ("you", "your") to feel direct and personal',
    ],
    toneAdjustments: [
      'Errors and failures: calmer, more empathetic tone',
      'Onboarding and success: warmer, more celebratory tone',
      'Settings and admin: more neutral and precise tone',
    ],
  };
}

export function generateBrandUx(brand: BrandIdentity): BrandUxOutput {
  const style = brand.style ?? 'minimal';

  return {
    writingVoice: STYLE_WRITING_VOICE[style] ?? STYLE_WRITING_VOICE.minimal,
    ctaStyle: STYLE_CTA[style] ?? STYLE_CTA.minimal,
    errorMessageTone: STYLE_ERROR_TONE[style] ?? STYLE_ERROR_TONE.minimal,
    emptyStateApproach: STYLE_EMPTY_STATE[style] ?? STYLE_EMPTY_STATE.minimal,
    onboardingPattern: STYLE_ONBOARDING[style] ?? STYLE_ONBOARDING.minimal,
    loadingCopy: STYLE_LOADING[style] ?? STYLE_LOADING.minimal,
    tooltipStyle: STYLE_TOOLTIP[style] ?? STYLE_TOOLTIP.minimal,
    notificationPattern: STYLE_NOTIFICATIONS[style] ?? STYLE_NOTIFICATIONS.minimal,
    microcopyExamples: buildMicrocopyExamples(brand),
    formGuidelines: buildFormGuidelines(brand),
    contentHierarchy: buildContentHierarchy(brand),
    accessibilityGuidelines: buildAccessibilityGuidelines(brand),
    contentStrategy: buildContentStrategy(brand),
    uxBriefSummary: `UX writing guidelines for ${brand.name}${brand.tagline ? ` — "${brand.tagline}"` : ''}. Voice: ${STYLE_WRITING_VOICE[style]?.split('.')[0] ?? 'Clear and helpful'}. Optimised for a ${style} brand aesthetic with WCAG 2.1 AA accessibility standards.`,
  };
}
