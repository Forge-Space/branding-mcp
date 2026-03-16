import type {
  BrandIdentity,
  BrandStyle,
  BrandGlobalisationOutput,
  LocaleAdaptation,
} from '../../types.js';

const STYLE_LOCALISATION_APPROACH: Record<BrandStyle, string> = {
  minimal:
    'Preserve the core essence with minimal adaptation — translate with precision, avoid localisation overreach.',
  bold: 'Amplify energy in each market; adapt visuals, colours, and copy to local cultural resonance.',
  elegant:
    'Maintain premium positioning globally; partner with local luxury experts to preserve brand equity.',
  playful:
    'Lean into local humour and cultural references; adapt mascots and tone for each market.',
  corporate:
    'Standardise globally, adapt locally; ensure compliance with local business norms and regulations.',
  tech: 'API-first localisation; ship locale bundles and RTL support from day one in the design system.',
  organic:
    'Celebrate local provenance; source local ingredients and tell regional sustainability stories.',
  retro:
    'Adapt vintage references to local cultural nostalgia; research era-specific aesthetics by market.',
};

const STYLE_BRAND_STANDARDS_FLEXIBILITY: Record<BrandStyle, string> = {
  minimal:
    'Strict global standards — logo, colour, and typography must be unchanged in all markets.',
  bold: 'Allow colour hue adjustments for cultural sensitivity; core mark is non-negotiable.',
  elegant:
    'Zero tolerance for visual deviation; local adaptations limited to copy and talent only.',
  playful: 'High flexibility — local teams can adapt illustrations, mascots, and colour accents.',
  corporate:
    'Tiered governance: Tier 1 locked (logo, primary palette), Tier 2 adaptable (imagery, tagline).',
  tech: 'Components are locked; content and locale strings are fully adaptable via i18n system.',
  organic: 'Encourage regional sub-brands tied to provenance; maintain parent brand architecture.',
  retro: 'Permit local vintage-inspired colour variants; core logotype remains unchanged.',
};

const STYLE_CULTURAL_SENSITIVITY_FOCUS: Record<BrandStyle, string[]> = {
  minimal: [
    'Avoid blank-space taboos in East Asian markets',
    'Use inclusive neutral imagery',
    'Simplify dense copy for low-literacy markets',
  ],
  bold: [
    'Audit colour symbolism per market before launch',
    'Localise sports/energy references',
    'Ensure imagery celebrates local heroes',
  ],
  elegant: [
    'Research gift-giving etiquette per market',
    'Avoid culturally insensitive luxury tropes',
    'Localise seasonal calendar (CNY, Diwali, Ramadan)',
  ],
  playful: [
    'Review character/mascot designs for cultural offence',
    'Localise humour with native copywriters',
    'Check colour associations for children per market',
  ],
  corporate: [
    'Respect local hierarchy and formality norms',
    'Translate compliance documents by qualified legal translators',
    'Adapt business card etiquette to market',
  ],
  tech: [
    'Support local date/time/number formats natively',
    'Check domain and app name availability in each market',
    'Ensure GDPR/PDPA/CCPA compliance by region',
  ],
  organic: [
    'Respect indigenous ingredient names and knowledge',
    'Audit environmental claims for local standards',
    'Partner with local NGOs for credibility',
  ],
  retro: [
    'Research nostalgic references that resonate vs offend locally',
    'Avoid colonial imagery in post-colonial markets',
    'Localise music/radio eras for audio branding',
  ],
};

const STYLE_PRIORITY_MARKETS: Record<BrandStyle, string[]> = {
  minimal: ['Northern Europe', 'Japan', 'Singapore', 'Canada'],
  bold: ['Brazil', 'United States', 'Nigeria', 'Indonesia'],
  elegant: ['France', 'UAE', 'Japan', 'China (Tier 1 cities)'],
  playful: ['United States', 'Brazil', 'South Korea', 'Philippines'],
  corporate: ['United States', 'Germany', 'Australia', 'Singapore'],
  tech: ['United States', 'Germany', 'South Korea', 'Israel'],
  organic: ['Germany', 'Netherlands', 'United Kingdom', 'Australia'],
  retro: ['United Kingdom', 'United States', 'France', 'Italy'],
};

function buildLocaleAdaptations(brand: BrandIdentity): LocaleAdaptation[] {
  const style = brand.style ?? 'minimal';

  const locales: LocaleAdaptation[] = [
    {
      locale: 'en-US',
      language: 'English (US)',
      rtl: false,
      keyAdaptations: [
        'Adjust spelling (colour → color, etc.)',
        'Use imperial units where relevant',
        'Reference US cultural occasions (Thanksgiving, 4th July)',
      ],
      colourConsiderations: 'No major changes — default brand palette applies.',
      typographyNotes: 'Default Latin script; ensure proper quotation marks (\u201c\u201d).',
    },
    {
      locale: 'ar-SA',
      language: 'Arabic (Saudi Arabia)',
      rtl: true,
      keyAdaptations: [
        'Full RTL layout including navigation and icons',
        'Mirror directional imagery (arrows, people facing right)',
        'Adapt copy for Ramadan / Eid seasonal campaigns',
        'Use Hijri calendar where appropriate',
      ],
      colourConsiderations: 'Green is highly auspicious; avoid alcohol-related imagery.',
      typographyNotes:
        'Use Noto Naskh Arabic or Tajawal; increase line-height by 20% for readability.',
    },
    {
      locale: 'zh-CN',
      language: 'Chinese (Simplified)',
      rtl: false,
      keyAdaptations: [
        'Register brand name phonetically (pinyin) for local recall',
        'Adapt for WeChat, Weibo, and RED (Xiaohongshu) ecosystems',
        'Localise for Singles Day (11.11) and Chinese New Year',
        'Ensure Great Firewall compatibility for digital assets',
      ],
      colourConsiderations:
        'Red and gold connote luck and prosperity; avoid pure white in funerary contexts.',
      typographyNotes: 'Use PingFang SC or Noto Sans SC; larger minimum font sizes (14px body).',
    },
    {
      locale: 'de-DE',
      language: 'German',
      rtl: false,
      keyAdaptations: [
        'Formal "Sie" vs informal "du" — choose per brand positioning',
        "Comply with Germany's strict advertising regulations (Heilmittelwerbegesetz for health)",
        'Adapt for DACH region (Austria, Switzerland variants)',
        'Localise for German engineering/quality value expectations',
      ],
      colourConsiderations: `${style === 'tech' || style === 'corporate' ? 'Blue tones reinforce trust and technical competence.' : 'Neutral palette works well; avoid garish combinations.'}`,
      typographyNotes:
        'German text expands ~30% vs English — design layouts with text overflow tolerance.',
    },
    {
      locale: 'pt-BR',
      language: 'Portuguese (Brazil)',
      rtl: false,
      keyAdaptations: [
        'Localise for Brazilian Portuguese (not European PT)',
        'Reference local football culture and Carnival where appropriate',
        'Adapt for WhatsApp-first digital ecosystem',
        'Pix payment integration for e-commerce',
      ],
      colourConsiderations:
        'Vibrant warm tones resonate; green and yellow carry national pride associations.',
      typographyNotes: 'Similar text expansion to Spanish; ensure adequate horizontal space.',
    },
  ];

  return locales;
}

function buildTranslationGuidelines(brand: BrandIdentity): string[] {
  return [
    `Use professional human translators with native-speaker copywriters for all consumer-facing content.`,
    `Maintain a centralised brand glossary — "${brand.name}" and key product terms are never translated, only transcribed.`,
    `tagline "${brand.tagline ?? brand.name + ' — Crafted for the world'}" must be approved by regional brand leads before use.`,
    'Machine translation (DeepL / GPT) is permitted for internal documentation only.',
    'Back-translation review required for all Tier 1 market campaigns.',
    'Maintain a market-specific style guide for each priority locale covering tone, salutation, and taboo words.',
    'Cultural review required from a native consultant before final sign-off on any campaign.',
  ];
}

function buildInternationalBrandArchitecture(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const base = [
    `Global brand: "${brand.name}" — non-negotiable core mark, colour, and typography.`,
    'Regional endorsed brands permitted where local name recognition requires it (e.g., joint-venture markets).',
    'Sub-brand naming must follow the [Global Name] + [Descriptor] convention.',
    'All regional variants must pass the global brand consistency validator before market launch.',
    'Annual global brand audit to identify drift and enforce standards.',
  ];
  const extras: string[] = [];
  if (style === 'tech') {
    extras.push(
      'Developer-facing sub-brands (e.g., [Name] API, [Name] SDK) follow a separate technical brand system.'
    );
    extras.push('Open-source projects use a distinct community brand tier.');
  }
  if (style === 'organic') {
    extras.push(
      'Regional sourcing stories told as endorsed sub-brands (e.g., "[Name] x Oaxaca Harvest").'
    );
  }
  if (style === 'elegant') {
    extras.push('No sub-brands — single monolithic luxury brand maintained across all markets.');
  }
  return [...base, ...extras];
}

function buildComplianceRequirements(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const base = [
    'GDPR (EU) — privacy notices, cookie consent, data residency.',
    'CCPA (California) — consumer data rights and opt-out mechanisms.',
    'PDPA (Thailand / Singapore) — data protection for APAC markets.',
    'ASA / FTC advertising standards — no misleading claims in any market.',
    'Local trademark registration in all Tier 1 and Tier 2 markets.',
    'Import/export compliance for physical brand assets (packaging, print).',
  ];
  const extras: string[] = [];
  if (style === 'tech') {
    extras.push('PIPL (China) — Personal Information Protection Law compliance for China market.');
    extras.push('App store guidelines (Apple / Google Play) per regional market.');
  }
  if (style === 'organic') {
    extras.push('EU Organic Regulation (EC 834/2007) labelling requirements.');
    extras.push('US NOP (USDA Organic) certification for North American market.');
  }
  if (style === 'corporate') {
    extras.push('SOX compliance for investor communications in public company context.');
    extras.push('Local financial advertising regulations (FCA UK, SEC US, MAS SG).');
  }
  return [...base, ...extras];
}

function buildGlobalisationBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const approach =
    STYLE_LOCALISATION_APPROACH[style as BrandStyle] ?? STYLE_LOCALISATION_APPROACH.minimal;
  const taglineStr = brand.tagline ? ` — "${brand.tagline}"` : '';
  return `${brand.name}${taglineStr} is pursuing global expansion with a ${style} brand approach. ${approach.split('.')[0]}. Priority markets include ${(STYLE_PRIORITY_MARKETS[style as BrandStyle] ?? STYLE_PRIORITY_MARKETS.minimal).slice(0, 3).join(', ')}. The localisation strategy preserves core brand equity while enabling authentic cultural connections in each market.`;
}

export function generateBrandGlobalisation(brand: BrandIdentity): BrandGlobalisationOutput {
  const style = (brand.style ?? 'minimal') as BrandStyle;
  const safeStyle: BrandStyle = STYLE_LOCALISATION_APPROACH[style] ? style : 'minimal';

  return {
    localisationApproach: STYLE_LOCALISATION_APPROACH[safeStyle],
    brandStandardsFlexibility: STYLE_BRAND_STANDARDS_FLEXIBILITY[safeStyle],
    culturalSensitivityFocus: STYLE_CULTURAL_SENSITIVITY_FOCUS[safeStyle],
    priorityMarkets: STYLE_PRIORITY_MARKETS[safeStyle],
    localeAdaptations: buildLocaleAdaptations(brand),
    translationGuidelines: buildTranslationGuidelines(brand),
    internationalBrandArchitecture: buildInternationalBrandArchitecture(brand),
    complianceRequirements: buildComplianceRequirements(brand),
    globalisationBriefSummary: buildGlobalisationBriefSummary(brand),
  };
}
