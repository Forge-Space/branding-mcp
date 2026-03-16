import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandAccessibilityOutput } from '../../types.js';

const STYLE_WCAG_TARGET: Record<BrandStyle, string> = {
  minimal: 'WCAG 2.1 AA — clean, uncluttered interfaces naturally support accessibility',
  bold: 'WCAG 2.1 AA — high contrast ratios reinforce the bold visual identity',
  elegant: 'WCAG 2.1 AA — refined typography and spacing aid readability',
  playful: 'WCAG 2.1 AA — accessible colour choices that preserve playful energy',
  corporate: 'WCAG 2.2 AA — enterprise standards require full compliance',
  tech: 'WCAG 2.2 AA — developer tooling and APIs must meet the highest bar',
  organic: 'WCAG 2.1 AA — natural palette with sufficient contrast for all users',
  retro: 'WCAG 2.1 AA — vintage aesthetics adapted for modern accessibility needs',
};

const STYLE_COLOUR_STRATEGY: Record<BrandStyle, string> = {
  minimal: 'Rely on high luminance contrast; avoid colour-only information cues',
  bold: 'Strong contrast ratios (7:1+ for body) amplify brand energy while aiding legibility',
  elegant: 'Subtle tones must be tested; pair low-saturation text with off-white backgrounds',
  playful:
    'Bright palette requires rigorous AA checks; use dark-on-light or light-on-dark patterns',
  corporate: 'Conservative, tested palette; all interactive states must meet 4.5:1 minimum',
  tech: 'Dark-mode-first; maintain 4.5:1 in both light and dark themes',
  organic: 'Earth tones often risk low contrast; test all text/background combinations',
  retro: 'Vintage colour palettes may need modern contrast adjustments',
};

const STYLE_FOCUS_STYLE: Record<BrandStyle, string> = {
  minimal: '2px solid offset focus ring using primary brand colour',
  bold: '3px solid focus ring with contrasting outline, matching brand energy',
  elegant: 'Subtle 1px solid focus ring with brand accent, supplemented by background shift',
  playful:
    'Rounded, thick (3px) focus ring in brand primary; animate with care (respect prefers-reduced-motion)',
  corporate: '2px solid focus ring; never remove outlines; add background highlight',
  tech: 'Terminal-style focus with 1px dotted outer ring and primary colour inner border',
  organic: '2px dashed focus ring in earthy brand primary; feel natural',
  retro: 'Double-bordered focus style evoking vintage UI patterns',
};

const STYLE_MOTION_GUIDANCE: Record<BrandStyle, string> = {
  minimal: 'Minimal transitions (150ms max); always honour prefers-reduced-motion: reduce',
  bold: 'Dynamic animations must have a static fallback for prefers-reduced-motion',
  elegant: 'Smooth, slow transitions (300–500ms); provide reduce-motion alternative',
  playful:
    'Energetic animations are core to identity; provide a fully static mode via prefers-reduced-motion',
  corporate: 'Subtle transitions only; motion never distracts from content',
  tech: 'Code-driven microinteractions; toggle off entirely for prefers-reduced-motion',
  organic: 'Nature-inspired easing (ease-in-out); respect prefers-reduced-motion: reduce',
  retro: 'Vintage transition effects; always provide a no-animation fallback',
};

const STYLE_TYPOGRAPHY_GUIDANCE: Record<BrandStyle, string> = {
  minimal: 'Minimum 16px body; 1.5 line-height; generous letter spacing for readability',
  bold: 'Large type is accessible by nature; maintain 1.4 line-height minimum',
  elegant: 'Thin weights (< 300) must be large (20px+); always test against background',
  playful: 'Decorative fonts for headings only; body always in accessible sans-serif',
  corporate: '16px minimum body, 1.6 line-height, maximum 80 characters per line',
  tech: 'Monospace for code; ensure 16px+ and 1.5 line-height for prose',
  organic: 'Humanist sans-serif preferred; 16px+ body, avoid ultra-thin weights',
  retro: 'Retro display fonts for headings only; body in readable modern serif or sans-serif',
};

interface AccessibilityChecklistSection {
  section: string;
  items: string[];
}

function buildPerceiableChecklist(brand: BrandIdentity): string[] {
  return [
    `Minimum body text contrast: 4.5:1 against all backgrounds`,
    `Large text (18px bold / 24px regular) contrast: 3:1 minimum`,
    `UI components and focus indicators: 3:1 contrast`,
    `Brand primary (${brand.colors.primary.hex}) — verify against white and near-white backgrounds`,
    `Brand secondary (${brand.colors.secondary.hex}) — verify against brand primary and dark backgrounds`,
    'Images of text avoided; SVG text uses sufficient contrast',
    'Non-text content (icons, charts) has text alternative',
    'Audio/video content has captions and transcripts',
    'Colour is never the sole means of conveying information',
    'Brand logo available in high-contrast monochrome variant',
  ];
}

function buildOperableChecklist(): string[] {
  return [
    'All interactive elements reachable by keyboard (Tab/Shift+Tab/Enter/Space/Arrow keys)',
    'Logical tab order matches visual reading order',
    'No keyboard traps — user can always navigate away',
    'Skip-navigation links provided (visible on focus)',
    'Focus indicator visible for all interactive elements',
    'Pointer targets minimum 24×24 CSS px (WCAG 2.2 AA), prefer 44×44 px',
    'No timing limits on interactions, or user can extend/disable them',
    'No content flashes more than 3 times per second',
    'Touch gestures have single-pointer alternatives',
    'Drag-and-drop operations have alternative keyboard mechanisms',
  ];
}

function buildUnderstandableChecklist(brand: BrandIdentity): string[] {
  return [
    `Page language declared (e.g., lang=\"en\") in all ${brand.name} web properties`,
    'Unusual words, abbreviations, and jargon explained on first use',
    'Reading level appropriate to target audience (aim for Grade 8 or below for general consumers)',
    'Form inputs have clear, persistent labels — never placeholder-only labels',
    'Required fields, formats, and constraints communicated before submission',
    'Errors identified in text, not just colour; suggestions provided where possible',
    'Consistent navigation order and labelling across pages',
    'Interactive components behave predictably on focus/input',
    'Confirmation step or undo for irreversible actions',
    'Help/support link consistently available',
  ];
}

function buildRobustChecklist(): string[] {
  return [
    'Valid, well-formed HTML; no duplicate IDs',
    'ARIA roles, states, and properties used correctly and only when necessary',
    'Custom components expose name, role, and value to assistive technology',
    'Status messages (toasts, live regions) communicated via ARIA live regions',
    'Third-party widgets audited for accessibility before integration',
    'Accessibility tree tested with browser DevTools and NVDA/VoiceOver',
    'Automated scan (axe-core / Lighthouse) run in CI pipeline',
    'Manual keyboard and screen-reader testing before each major release',
  ];
}

function buildTestingProtocol(brand: BrandIdentity): string[] {
  return [
    `Automated: Integrate axe-core into ${brand.name} CI pipeline (zero violations gate)`,
    'Automated: Lighthouse accessibility score ≥ 90 on all key pages',
    'Manual: Keyboard-only walkthrough of all critical user flows',
    'Manual: Screen reader testing — NVDA/Firefox (Windows) and VoiceOver/Safari (Mac/iOS)',
    'Manual: Colour-blindness simulation — Deuteranopia, Protanopia, Tritanopia',
    'Manual: 200% browser zoom — no content loss or horizontal scroll',
    'User: Include users with disabilities in usability research at least once per quarter',
    'Audit: External WCAG 2.2 AA audit annually; remediate all critical findings within 30 days',
  ];
}

function buildChecklistSections(brand: BrandIdentity): AccessibilityChecklistSection[] {
  return [
    { section: 'Perceivable', items: buildPerceiableChecklist(brand) },
    { section: 'Operable', items: buildOperableChecklist() },
    { section: 'Understandable', items: buildUnderstandableChecklist(brand) },
    { section: 'Robust', items: buildRobustChecklist() },
  ];
}

function buildDesignTokenRequirements(brand: BrandIdentity): Record<string, string> {
  const style = brand.style ?? 'minimal';
  const wcagTarget = STYLE_WCAG_TARGET[style] ?? STYLE_WCAG_TARGET.minimal;
  return {
    minimum_contrast_body: '4.5:1',
    minimum_contrast_large_text: '3:1',
    minimum_contrast_ui_components: '3:1',
    minimum_contrast_focus_indicator: '3:1',
    minimum_font_size_body: '16px',
    minimum_font_size_large_text: '18px (bold) / 24px (regular)',
    minimum_line_height: '1.5',
    minimum_touch_target: '44×44 px (recommended) / 24×24 px (WCAG 2.2 minimum)',
    minimum_focus_indicator_area: '2px offset ring',
    wcag_target: wcagTarget.split(' — ')[0],
  };
}

function buildBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const wcag = (STYLE_WCAG_TARGET[style] ?? STYLE_WCAG_TARGET.minimal).split(' — ')[0];
  const taglinePart = brand.tagline ? ` ("${brand.tagline}")` : '';
  return (
    `${brand.name}${taglinePart} targets ${wcag} across all brand touchpoints. ` +
    `The ${style} visual style informs colour strategy: ${STYLE_COLOUR_STRATEGY[style] ?? STYLE_COLOUR_STRATEGY.minimal}. ` +
    `Typography guidance ensures readability, motion respects user preferences, and ` +
    `a four-phase POUR testing protocol (Perceivable, Operable, Understandable, Robust) ` +
    `underpins every release.`
  );
}

export function generateBrandAccessibility(brand: BrandIdentity): BrandAccessibilityOutput {
  const style = (brand.style ?? 'minimal') as BrandStyle;

  return {
    wcagTarget: STYLE_WCAG_TARGET[style] ?? STYLE_WCAG_TARGET.minimal,
    colourContrastStrategy: STYLE_COLOUR_STRATEGY[style] ?? STYLE_COLOUR_STRATEGY.minimal,
    focusIndicatorStyle: STYLE_FOCUS_STYLE[style] ?? STYLE_FOCUS_STYLE.minimal,
    motionGuidance: STYLE_MOTION_GUIDANCE[style] ?? STYLE_MOTION_GUIDANCE.minimal,
    typographyGuidance: STYLE_TYPOGRAPHY_GUIDANCE[style] ?? STYLE_TYPOGRAPHY_GUIDANCE.minimal,
    checklistSections: buildChecklistSections(brand),
    testingProtocol: buildTestingProtocol(brand),
    designTokenRequirements: buildDesignTokenRequirements(brand),
    accessibilityBriefSummary: buildBriefSummary(brand),
  };
}
