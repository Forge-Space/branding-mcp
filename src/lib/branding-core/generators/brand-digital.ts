import type { BrandIdentity, BrandStyle } from '../../types.js';
import type {
  BrandDigitalOutput,
  DigitalComponentSpec,
  DigitalAccessibilitySpec,
} from '../../types.js';

const STYLE_UI_LANGUAGE: Record<BrandStyle, string> = {
  minimal: 'Clean, whitespace-driven UI with subtle interactions and restrained visual hierarchy',
  bold: 'High-contrast, expressive UI with strong typography and vibrant interactive states',
  elegant: 'Refined UI with generous spacing, premium feel, and smooth microinteractions',
  playful: 'Friendly UI with rounded corners, bright accents, and delightful animated feedback',
  corporate: 'Professional, structured UI with clear hierarchy and trust-building visual patterns',
  tech: 'Data-dense UI with monospace accents, dark mode preference, and developer-friendly patterns',
  organic: 'Natural UI with soft shapes, earthy tones, and flowing layout patterns',
  retro: 'Nostalgic UI with bold strokes, limited palettes, and classic typographic treatments',
};

const STYLE_BORDER_RADIUS: Record<BrandStyle, string> = {
  minimal: '4px (inputs), 6px (cards), 2px (buttons)',
  bold: '8px (inputs), 12px (cards), 8px (buttons)',
  elegant: '2px (inputs), 4px (cards), 2px (buttons)',
  playful: '16px (inputs), 20px (cards), 9999px (buttons — pill)',
  corporate: '4px (inputs), 6px (cards), 4px (buttons)',
  tech: '3px (inputs), 4px (cards), 3px (buttons)',
  organic: '12px (inputs), 16px (cards), 12px (buttons)',
  retro: '0px (inputs), 0px (cards), 0px (buttons — square)',
};

const STYLE_SHADOW: Record<BrandStyle, string> = {
  minimal: 'Minimal shadows: 0 1px 3px rgba(0,0,0,0.08) for cards',
  bold: 'Prominent shadows: 0 4px 16px rgba(0,0,0,0.18) for elevation',
  elegant: 'Soft shadows: 0 2px 8px rgba(0,0,0,0.06) for subtle depth',
  playful: 'Coloured shadows: 0 4px 12px <primary>33 for brand-tinted elevation',
  corporate: 'Standard shadows: 0 2px 6px rgba(0,0,0,0.10) for trustworthy depth',
  tech: 'Glow shadows: 0 0 12px <primary>40 for neon-style elevation in dark mode',
  organic: 'Natural shadows: 0 3px 10px rgba(0,0,0,0.08) with warm undertone',
  retro: 'Hard shadows: 4px 4px 0 <primary> for offset retro effect',
};

const STYLE_ANIMATION_STYLE: Record<BrandStyle, string> = {
  minimal: '150ms ease-out transitions; no decorative animation',
  bold: '200ms cubic-bezier(0.34,1.56,0.64,1) spring transitions; scale on hover',
  elegant: '300ms ease transitions; opacity fades; no bounce',
  playful: '250ms spring; bounce on click; confetti for success states',
  corporate: '150ms ease transitions; fade only; no transform',
  tech: '100ms linear for data updates; 200ms ease for panel slides',
  organic: '400ms ease-in-out; breathing scale; wave loaders',
  retro: '0ms (no transitions) or 100ms snap; pixel-style reveal',
};

const STYLE_DARK_MODE: Record<BrandStyle, string> = {
  minimal: 'Inverted neutrals with full dark mode support; same interaction patterns',
  bold: 'Vibrant dark mode with neon accents; maintain contrast ratios',
  elegant: 'Warm dark palette (#1C1A18 base); gold/cream accents preserved',
  playful: 'Soft dark (#1E1A2E base) with saturated accent colours',
  corporate: 'Classic dark (#1A1C1E base); reduce brightness by 15%; prioritise readability',
  tech: 'Primary mode is dark (#0D1117 base); light mode is secondary',
  organic: 'Forest dark (#1A2018 base) with earthy accent variants',
  retro: 'CRT dark (#0A0A0A base) with neon green or amber primary',
};

const STYLE_COMPONENT_PATTERNS: Record<BrandStyle, string[]> = {
  minimal: [
    'Inline forms (no card wrappers)',
    'Text-only CTAs',
    'Tab navigation',
    'Borderless tables',
  ],
  bold: [
    'Full-bleed hero sections',
    'Sticky floating CTAs',
    'Card grids with hover lift',
    'Bold progress bars',
  ],
  elegant: [
    'Floating labels on inputs',
    'Stacked navigation',
    'Modal drawers (slide-in)',
    'Timeline components',
  ],
  playful: ['Wizard/stepper flows', 'Emoji reactions', 'Confetti on success', 'Animated counters'],
  corporate: [
    'Sidebar navigation',
    'Data tables with sorting',
    'Multi-step forms',
    'Dashboard cards',
  ],
  tech: [
    'Command palette (⌘K)',
    'Code block with syntax highlighting',
    'Status badges',
    'Terminal output',
  ],
  organic: [
    'Masonry grid',
    'Scroll-triggered reveals',
    'Ingredient-style lists',
    'Map-based layouts',
  ],
  retro: ['Pixel borders', 'Scanline overlays', 'Blinking cursor inputs', 'Retro progress meters'],
};

const STYLE_ICON_STYLE: Record<BrandStyle, string> = {
  minimal: 'Outline icons (1.5px stroke), 24×24px base, no fill',
  bold: 'Duotone icons with primary colour fill, 24×24px base',
  elegant: 'Thin-line icons (1px stroke), 20×20px base, monochrome',
  playful: 'Rounded filled icons, 24×24px base, colourful',
  corporate: 'Solid icons, 20×20px base, neutral grey',
  tech: 'Monochrome outline icons (1px stroke), 16×16px base, precise',
  organic: 'Hand-drawn style icons, 24×24px base, irregular stroke weight',
  retro: 'Pixel-art icons, 16×16px base, limited colour palette',
};

const STYLE_GRID: Record<BrandStyle, string> = {
  minimal: '12-column, 24px gutter, max-width 1200px, generous whitespace',
  bold: '12-column, 32px gutter, max-width 1440px, edge-to-edge sections',
  elegant: '12-column, 20px gutter, max-width 1100px, asymmetric layouts',
  playful: '6-column, 16px gutter, max-width 1200px, card-based layouts',
  corporate: '12-column, 24px gutter, max-width 1280px, structured rows',
  tech: '12-column, 16px gutter, max-width 1600px, dense information display',
  organic: '4 or free-flow column, 20px gutter, max-width 1200px, masonry-friendly',
  retro: '8-column, 16px gutter, max-width 960px, rigid fixed-width feel',
};

const STYLE_FORM_PATTERNS: Record<BrandStyle, string> = {
  minimal: 'Underline-only inputs, inline validation, single column',
  bold: 'Filled inputs with strong focus ring, real-time validation, stacked labels',
  elegant: 'Floating labels, ghost inputs, server-side validation preferred',
  playful: 'Pill inputs, emoji helper text, instant positive feedback',
  corporate: 'Box inputs with clear labels, progressive disclosure, inline hints',
  tech: 'Monospace inputs, JSON-aware, keyboard-first navigation',
  organic: 'Soft-bordered inputs, nature metaphors in helper text, relaxed validation',
  retro: 'Square inputs with dashed border, retro error messages, block labels',
};

function buildComponentSpecs(brand: BrandIdentity): DigitalComponentSpec[] {
  const style = brand.style ?? 'minimal';
  return [
    {
      component: 'Primary Button',
      variants: ['default', 'hover', 'active', 'disabled', 'loading'],
      cssProperties: {
        'background-color': brand.colors.primary.hex,
        color: '#ffffff',
        'border-radius':
          (STYLE_BORDER_RADIUS[style] ?? STYLE_BORDER_RADIUS.minimal)
            .split(',')[0]
            ?.match(/\d+px/)?.[0] ?? '4px',
        padding: '10px 20px',
        'font-weight': '600',
        transition:
          (STYLE_ANIMATION_STYLE[style] ?? STYLE_ANIMATION_STYLE.minimal).split(';')[0] ??
          '150ms ease-out',
      },
      accessibilityNotes:
        'Minimum 44×44px touch target; visible focus ring; aria-label when icon-only',
    },
    {
      component: 'Text Input',
      variants: ['default', 'focus', 'error', 'disabled', 'read-only'],
      cssProperties: {
        'border-radius':
          (STYLE_BORDER_RADIUS[style] ?? STYLE_BORDER_RADIUS.minimal)
            .split(',')[0]
            ?.match(/\d+px/)?.[0] ?? '4px',
        border: '1px solid #d1d5db',
        padding: '8px 12px',
        'font-size': '16px',
        'min-height': '44px',
      },
      accessibilityNotes:
        'Required label (visible or aria-label); error announced via aria-describedby',
    },
    {
      component: 'Card',
      variants: ['default', 'hover', 'selected', 'loading'],
      cssProperties: {
        'border-radius':
          (STYLE_BORDER_RADIUS[style] ?? STYLE_BORDER_RADIUS.minimal)
            .split(',')[1]
            ?.match(/\d+px/)?.[0] ?? '6px',
        'box-shadow':
          (STYLE_SHADOW[style] ?? STYLE_SHADOW.minimal).split(':')[1]?.trim().split(' for ')[0] ??
          '0 1px 3px rgba(0,0,0,0.08)',
        padding: '20px',
        background: '#ffffff',
      },
      accessibilityNotes:
        'Interactive cards must be keyboard-focusable; avoid nested interactive elements',
    },
    {
      component: 'Navigation',
      variants: ['default', 'active', 'mobile-collapsed', 'mobile-expanded'],
      cssProperties: {
        background: style === 'tech' ? '#0D1117' : '#ffffff',
        'border-bottom': '1px solid #e5e7eb',
        height: '64px',
        padding: '0 24px',
      },
      accessibilityNotes: 'ARIA landmark role="navigation"; skip-to-content link at top of page',
    },
    {
      component: 'Modal / Dialog',
      variants: ['default', 'fullscreen-mobile', 'loading'],
      cssProperties: {
        'border-radius':
          (STYLE_BORDER_RADIUS[style] ?? STYLE_BORDER_RADIUS.minimal)
            .split(',')[1]
            ?.match(/\d+px/)?.[0] ?? '6px',
        'max-width': '480px',
        padding: '24px',
        'box-shadow': '0 20px 60px rgba(0,0,0,0.25)',
      },
      accessibilityNotes: 'Focus trap; Escape to dismiss; role="dialog"; aria-labelledby heading',
    },
  ];
}

function buildAccessibilitySpec(brand: BrandIdentity): DigitalAccessibilitySpec {
  const style = brand.style ?? 'minimal';
  return {
    wcagTarget: style === 'corporate' || style === 'tech' ? 'WCAG 2.2 AA' : 'WCAG 2.1 AA',
    minimumContrastBody: '4.5:1',
    minimumContrastLargeText: '3:1',
    minimumContrastUI: '3:1',
    focusIndicator: `2px solid ${brand.colors.primary.hex} with 2px offset`,
    minimumTouchTarget: '44×44px',
    reducedMotionSupport:
      '@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }',
    screenReaderNotes: [
      'All images require descriptive alt text or role="presentation" if decorative',
      'Form errors announced via aria-live="assertive"',
      'Loading states use aria-busy="true" on the relevant container',
      'Icon-only buttons require aria-label',
      'Dynamic content updates use aria-live regions',
    ],
    keyboardNavigationNotes: [
      'All interactive elements reachable via Tab key',
      'Custom widgets implement ARIA keyboard patterns (roving tabindex)',
      'Skip navigation link visible on focus',
      'Escape closes overlays and returns focus to trigger',
    ],
  };
}

function buildDesignTokenSnippet(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  return [
    ':root {',
    `  /* Brand Colours */`,
    `  --color-primary: ${brand.colors.primary.hex};`,
    `  --color-secondary: ${brand.colors.secondary.hex};`,
    `  --color-accent: ${brand.colors.accent.hex};`,
    `  /* Border Radius */`,
    `  --radius-input: ${(STYLE_BORDER_RADIUS[style] ?? STYLE_BORDER_RADIUS.minimal).split(',')[0]?.match(/\d+/)?.[0] ?? '4'}px;`,
    `  --radius-card: ${(STYLE_BORDER_RADIUS[style] ?? STYLE_BORDER_RADIUS.minimal).split(',')[1]?.match(/\d+/)?.[0] ?? '6'}px;`,
    `  --radius-button: ${(STYLE_BORDER_RADIUS[style] ?? STYLE_BORDER_RADIUS.minimal).split(',')[2]?.match(/\d+/)?.[0] ?? '4'}px;`,
    `  /* Typography */`,
    `  --font-heading: '${brand.typography.headingFont}', sans-serif;`,
    `  --font-body: '${brand.typography.bodyFont}', sans-serif;`,
    `  --font-mono: '${brand.typography.monoFont ?? 'Fira Code'}', monospace;`,
    `  /* Spacing */`,
    `  --spacing-base: ${brand.spacing.unit}px;`,
    `  --spacing-xs: calc(var(--spacing-base) * 0.5);`,
    `  --spacing-sm: calc(var(--spacing-base) * 1);`,
    `  --spacing-md: calc(var(--spacing-base) * 2);`,
    `  --spacing-lg: calc(var(--spacing-base) * 4);`,
    `  --spacing-xl: calc(var(--spacing-base) * 8);`,
    '}',
  ].join('\n');
}

export function generateBrandDigital(brand: BrandIdentity): BrandDigitalOutput {
  const style = brand.style ?? 'minimal';

  return {
    uiLanguage: STYLE_UI_LANGUAGE[style] ?? STYLE_UI_LANGUAGE.minimal,
    gridSystem: STYLE_GRID[style] ?? STYLE_GRID.minimal,
    borderRadiusSystem: STYLE_BORDER_RADIUS[style] ?? STYLE_BORDER_RADIUS.minimal,
    shadowSystem: STYLE_SHADOW[style] ?? STYLE_SHADOW.minimal,
    animationStyle: STYLE_ANIMATION_STYLE[style] ?? STYLE_ANIMATION_STYLE.minimal,
    darkModeApproach: STYLE_DARK_MODE[style] ?? STYLE_DARK_MODE.minimal,
    iconStyle: STYLE_ICON_STYLE[style] ?? STYLE_ICON_STYLE.minimal,
    formPatterns: STYLE_FORM_PATTERNS[style] ?? STYLE_FORM_PATTERNS.minimal,
    componentPatterns: STYLE_COMPONENT_PATTERNS[style] ?? STYLE_COMPONENT_PATTERNS.minimal,
    componentSpecs: buildComponentSpecs(brand),
    accessibilitySpec: buildAccessibilitySpec(brand),
    designTokenSnippet: buildDesignTokenSnippet(brand),
    digitalBriefSummary: `Digital brand guidelines for ${brand.name}${brand.tagline ? ` — "${brand.tagline}"` : ''}. UI language: ${(STYLE_UI_LANGUAGE[style] ?? STYLE_UI_LANGUAGE.minimal).split(',')[0]}. Grid: ${(STYLE_GRID[style] ?? STYLE_GRID.minimal).split(',')[0]}. Target: ${buildAccessibilitySpec(brand).wcagTarget}.`,
  };
}
