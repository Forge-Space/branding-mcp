import type { BrandIdentity, BrandStyle, EventFormat, BrandEventOutput } from '../../types.js';

const STYLE_EVENT_CONCEPT: Record<BrandStyle, string> = {
  minimal: 'Clean, purpose-driven gatherings with curated content and intentional white space',
  bold: 'High-energy, immersive experiences with strong visual impact and interactive moments',
  elegant: 'Refined, intimate affairs with meticulous attention to detail and premium atmosphere',
  playful: 'Fun, participatory events with surprise elements, games, and shared experiences',
  corporate: 'Professional, structured events with clear agendas and measurable outcomes',
  tech: 'Innovation-focused events with live demos, hackathons, and thought leadership',
  organic: 'Community-centred gatherings with natural settings and authentic human connection',
  retro: 'Nostalgic experiences with vintage aesthetic and timeless entertainment formats',
};

const STYLE_VENUE: Record<BrandStyle, string[]> = {
  minimal: ['White-box gallery spaces', 'Loft-style open floors', 'Modern conference centres'],
  bold: ['Warehouse event spaces', 'Stadium or arena venues', 'Urban rooftops with city views'],
  elegant: ['Private estate gardens', 'Heritage ballrooms', 'Fine dining private rooms'],
  playful: ['Outdoor parks and gardens', 'Creative co-working spaces', 'Pop-up art venues'],
  corporate: ['Convention centres', 'Hotel business suites', 'Purpose-built boardrooms'],
  tech: ['Tech campuses', 'Innovation hubs', 'Co-working spaces with AV infrastructure'],
  organic: ['Botanical gardens', 'Farm-to-table venues', 'Community centres with outdoor access'],
  retro: ['Vintage theatres', 'Classic ballrooms', 'Mid-century modern event spaces'],
};

const STYLE_DECOR: Record<BrandStyle, string[]> = {
  minimal: [
    'Monochrome flower arrangements',
    'Geometric centrepieces',
    'Typography-driven signage',
  ],
  bold: ['Bold colour installations', 'Large-format brand graphics', 'LED light walls'],
  elegant: ['Floral luxury arrangements', 'Crystal and candlelight', 'Custom linens and draping'],
  playful: ['Colourful balloon displays', 'Photo booth setups', 'Interactive art installations'],
  corporate: [
    'Professional banner stands',
    'Branded table dressings',
    'Subtle brand colour accents',
  ],
  tech: ['Digital screens and displays', 'Interactive tech demos', 'Futuristic lighting rigs'],
  organic: [
    'Wild-flower arrangements',
    'Potted plants and greenery',
    'Natural wood and stone elements',
  ],
  retro: ['Vintage furniture pieces', 'Neon signs', 'Period-appropriate props'],
};

const STYLE_CATERING: Record<BrandStyle, string> = {
  minimal: 'Curated small plates with seasonal ingredients and clean presentation',
  bold: 'Bold international flavours with dramatic plating and interactive food stations',
  elegant: 'Multi-course fine dining with sommelier-selected wine pairings',
  playful: 'Fun sharing platters, dessert bars, and interactive cooking stations',
  corporate: 'Professional buffet service with dietary options clearly labelled',
  tech: 'Fuel-focused healthy options with all-day snack stations and quality coffee',
  organic: 'Farm-to-table locally sourced menu with plant-forward options',
  retro: 'Classic comfort food with vintage cocktails and nostalgic desserts',
};

const STYLE_ENTERTAINMENT: Record<BrandStyle, string[]> = {
  minimal: [
    'Curated acoustic music',
    'Thought leader keynote talks',
    'Mindful networking sessions',
  ],
  bold: ['Live DJ sets', 'Experiential brand activations', 'Crowd-participation moments'],
  elegant: ['String quartet or jazz ensemble', 'Fine art exhibition', 'Guest speaker series'],
  playful: ['Comedy acts', 'Interactive games and competitions', 'Live illustration sessions'],
  corporate: ['Panel discussions', 'Workshop breakouts', 'Award ceremonies'],
  tech: ['Live product demos', 'Hackathon challenges', 'Innovation showcase booths'],
  organic: ['Acoustic folk music', 'Wellness workshops', 'Community skill-sharing sessions'],
  retro: ['Swing or jazz band', 'Vintage film screenings', 'Classic games like croquet'],
};

const STYLE_AGENDA_STRUCTURE: Record<BrandStyle, string> = {
  minimal: 'Sparse programme with generous breathing room between sessions',
  bold: 'Packed agenda with high-energy transitions and no dead time',
  elegant: 'Leisurely paced with extended dining and conversation periods',
  playful: 'Flexible agenda with built-in surprise segments and audience votes',
  corporate: 'Timed agenda with clear objectives and measurable session outcomes',
  tech: 'Sprint-style sessions with rapid-fire presentations and live Q&A',
  organic: 'Flow-based schedule with optional breakout moments in nature',
  retro: 'Classic programme format with formal introductions and closing remarks',
};

const STYLE_INVITATIONS: Record<BrandStyle, string> = {
  minimal: 'Clean typographic digital invite with a single strong visual',
  bold: 'Full-bleed bold graphic printed card with embossed brand mark',
  elegant: 'Letterpress printed invitation on heavy cotton paper with wax seal',
  playful: 'Animated digital invite with interactive RSVP and emoji-filled copy',
  corporate: 'Professional branded PDF with event agenda and speaker bios attached',
  tech: 'Digital-first invite with integrated calendar sync and event app link',
  organic: 'Recycled paper printed invite with hand-drawn illustration and plant seed inserts',
  retro: 'Vintage-style card with period fonts and classic postal-design elements',
};

const STYLE_BUDGET: Record<BrandStyle, Record<string, string>> = {
  minimal: { venue: '25%', catering: '30%', av_tech: '20%', decor: '10%', marketing: '15%' },
  bold: { venue: '20%', catering: '25%', av_tech: '25%', decor: '20%', marketing: '10%' },
  elegant: { venue: '30%', catering: '35%', av_tech: '10%', decor: '15%', marketing: '10%' },
  playful: { venue: '20%', catering: '25%', av_tech: '15%', decor: '25%', marketing: '15%' },
  corporate: { venue: '25%', catering: '30%', av_tech: '20%', decor: '10%', marketing: '15%' },
  tech: { venue: '20%', catering: '20%', av_tech: '35%', decor: '10%', marketing: '15%' },
  organic: { venue: '25%', catering: '35%', av_tech: '10%', decor: '15%', marketing: '15%' },
  retro: { venue: '25%', catering: '30%', av_tech: '15%', decor: '20%', marketing: '10%' },
};

function buildEventFormats(brand: BrandIdentity): EventFormat[] {
  const style = brand.style ?? 'minimal';
  return [
    {
      type: 'Brand Launch',
      description: `Unveil ${brand.name} to your audience with a memorable first impression`,
      capacity: '50-200 guests',
      duration: '3-4 hours',
      setupNotes: `Focus on the ${style} aesthetic throughout all touchpoints`,
    },
    {
      type: 'Customer Appreciation',
      description: 'Celebrate loyal customers and deepen brand relationships',
      capacity: '30-100 guests',
      duration: '2-3 hours',
      setupNotes: 'Personalise elements for key accounts where possible',
    },
    {
      type: 'Industry Networking',
      description: 'Establish thought leadership and grow professional connections',
      capacity: '100-500 guests',
      duration: '4-6 hours',
      setupNotes: 'Structured networking activities prevent awkward silences',
    },
    {
      type: 'Internal Team Event',
      description: 'Strengthen team culture and reinforce brand values internally',
      capacity: '10-200 employees',
      duration: '4-8 hours',
      setupNotes: 'Align activities with core brand personality traits',
    },
    {
      type: 'Pop-Up Activation',
      description: 'Create a temporary branded experience in high-traffic locations',
      capacity: 'Open / unlimited',
      duration: '1-5 days',
      setupNotes: 'Maximise instagrammability and shareable moments',
    },
  ];
}

function buildBrandingChecklist(brand: BrandIdentity): string[] {
  return [
    `Entrance signage featuring ${brand.name} logo at eye level`,
    `Colour scheme aligned to primary: ${brand.colors.primary.hex}`,
    'Branded napkins, cups, or tote bags as takeaways',
    'Photo backdrop or step-and-repeat banner for social sharing',
    'Custom event hashtag displayed prominently',
    'Digital slide deck with brand typography and colours',
    'Welcome speech covering brand story and values',
    'Branded lanyards or name badges for staff',
  ];
}

function buildSuccessMetrics(): Record<string, string> {
  return {
    attendance_rate: 'Target 80%+ of RSVPs attending',
    nps_score: 'Post-event NPS of 8+ out of 10',
    social_mentions: 'Track branded hashtag reach and impressions',
    media_coverage: 'Secure at least 2 media mentions or write-ups',
    lead_generation: 'Capture contact details for 30%+ of attendees',
    brand_sentiment: 'Positive sentiment in post-event survey responses',
  };
}

export function generateBrandEvent(brand: BrandIdentity): BrandEventOutput {
  const style: BrandStyle = (brand.style ?? 'minimal') as BrandStyle;
  const safeLookup = <T>(map: Record<BrandStyle, T>, fallback: BrandStyle = 'minimal'): T =>
    map[style] ?? map[fallback];

  return {
    eventConcept: safeLookup(STYLE_EVENT_CONCEPT),
    recommendedVenues: safeLookup(STYLE_VENUE),
    decorTheme: safeLookup(STYLE_DECOR),
    cateringApproach: safeLookup(STYLE_CATERING),
    entertainmentIdeas: safeLookup(STYLE_ENTERTAINMENT),
    agendaStructure: safeLookup(STYLE_AGENDA_STRUCTURE),
    invitationStyle: safeLookup(STYLE_INVITATIONS),
    eventFormats: buildEventFormats(brand),
    brandingChecklist: buildBrandingChecklist(brand),
    successMetrics: buildSuccessMetrics(),
    budgetGuidance: STYLE_BUDGET[style] ?? STYLE_BUDGET.minimal,
    eventBriefSummary: `${brand.name} events should embody the ${style} brand aesthetic. ${safeLookup(STYLE_EVENT_CONCEPT)} Key branding colour: ${brand.colors.primary.hex}.${brand.tagline ? ` Tagline: "${brand.tagline}".` : ''}`,
  };
}
