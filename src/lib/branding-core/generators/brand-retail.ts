import type { BrandIdentity, BrandStyle, BrandRetailOutput } from '../../types.js';

const STYLE_STORE_CONCEPT: Record<BrandStyle, string> = {
  minimal: 'Clean, uncluttered space with generous whitespace and focused product presentation',
  bold: 'High-impact visual environment with strong color blocking and dynamic displays',
  elegant: 'Luxurious atmosphere with premium materials, soft lighting, and curated displays',
  playful: 'Interactive, fun environment with vibrant colors and engaging activity zones',
  corporate: 'Professional, organized environment with clear wayfinding and functional layout',
  tech: 'Innovation-forward space with digital integration, interactive demos, and clean lines',
  organic: 'Natural, warm environment using sustainable materials and earthy color palettes',
  retro: 'Nostalgic atmosphere with vintage fixtures, warm lighting, and heritage elements',
};

const STYLE_MATERIALS: Record<BrandStyle, string[]> = {
  minimal: [
    'White lacquer',
    'Brushed aluminum',
    'Clear acrylic',
    'Polished concrete',
    'Frosted glass',
  ],
  bold: [
    'Colored lacquer',
    'Powder-coated steel',
    'Vinyl graphics',
    'LED panels',
    'Mirrored surfaces',
  ],
  elegant: ['Marble', 'Brass fixtures', 'Velvet upholstery', 'Dark walnut wood', 'Silk curtains'],
  playful: [
    'Bright laminates',
    'Foam padding',
    'Colored rubber',
    'Transparent polycarbonate',
    'Printed fabric',
  ],
  corporate: [
    'Matte laminate',
    'Anodized aluminum',
    'Tempered glass',
    'Steel cable systems',
    'Acoustic panels',
  ],
  tech: [
    'Carbon fiber panels',
    'Backlit glass',
    'Stainless steel',
    'Anti-static flooring',
    'Digital screens',
  ],
  organic: ['Reclaimed wood', 'Natural stone', 'Jute fiber', 'Terracotta', 'Live plants'],
  retro: ['Oak veneer', 'Leather upholstery', 'Copper pipe', 'Subway tile', 'Edison bulb fixtures'],
};

const STYLE_LIGHTING: Record<BrandStyle, string> = {
  minimal: 'Cool white LED (4000-5000K) with even distribution and minimal shadows',
  bold: 'High-intensity directional lighting with colored accent LEDs for drama',
  elegant: 'Warm halogen or LED (2700-3000K) with layered ambient and accent lighting',
  playful: 'Bright, colorful lighting with programmable RGB accents and feature spotlights',
  corporate: 'Neutral white (3500K) task lighting with recessed downlights for consistency',
  tech: 'Cool blue-white LEDs with under-shelf backlighting and screen glare management',
  organic: 'Warm natural-toned lighting (2700K) mimicking daylight with dimmable control',
  retro: 'Edison bulbs and vintage filament lamps (2200K) for nostalgic warmth',
};

const STYLE_SIGNAGE: Record<BrandStyle, string[]> = {
  minimal: [
    'Letterform cutouts',
    'Frosted vinyl on glass',
    'Floating channel letters',
    'Subtle backlit panels',
  ],
  bold: [
    'Large-format printed banners',
    'LED illuminated signs',
    'Oversized wall murals',
    'Neon accent signs',
  ],
  elegant: [
    'Engraved brass plates',
    'Embossed leather panels',
    'Gilded lettering',
    'Understated nameplates',
  ],
  playful: [
    '3D foam letters',
    'Interactive digital displays',
    'Colorful hanging signage',
    'Photo opportunity walls',
  ],
  corporate: [
    'Dimensional letters',
    'Standard wayfinding pylons',
    'ADA-compliant directories',
    'Digital info kiosks',
  ],
  tech: [
    'Digital signage screens',
    'Holographic displays',
    'QR code integration',
    'Touch-interactive panels',
  ],
  organic: [
    'Burnt wood signs',
    'Chalkboard menus',
    'Hand-lettered displays',
    'Natural fiber banners',
  ],
  retro: [
    'Enamel pin badges on board',
    'Vintage poster frames',
    'Chalkboard typography',
    'Neon script signs',
  ],
};

const STYLE_DISPLAY: Record<BrandStyle, string[]> = {
  minimal: [
    'Floating shelves',
    'Pedestal displays',
    'Single-item hero showcases',
    'Grid wall systems',
  ],
  bold: [
    'Stacked bulk displays',
    'Color-blocked gondolas',
    'Statement plinths',
    'Elevated feature tables',
  ],
  elegant: [
    'Glass vitrines',
    'Velvet-lined drawers',
    'Illuminated pedestals',
    'Mirrored jewelry cases',
  ],
  playful: [
    'Interactive bins',
    'Low-height accessible shelving',
    'Activity table stations',
    'Build-your-own displays',
  ],
  corporate: [
    'Standardized shelf systems',
    'Modular grid displays',
    'Literature racks',
    'Demo station units',
  ],
  tech: [
    'Demo device stands',
    'Charging-enabled tables',
    'Comparison display walls',
    'Hands-on experience pods',
  ],
  organic: [
    'Crate and basket merchandising',
    'Farmers market trestle tables',
    'Hanging herb displays',
    'Wicker baskets',
  ],
  retro: [
    'Antique cabinets',
    'Pegboard displays',
    'Tiered cake stand risers',
    'Vintage suitcase props',
  ],
};

const STYLE_CUSTOMER_JOURNEY: Record<BrandStyle, string[]> = {
  minimal: [
    'Clean entry threshold with brand mark only',
    'Self-directed browse with clear product zoning',
    'Consultation area for complex decisions',
    'Seamless checkout with minimal friction',
  ],
  bold: [
    'High-energy entrance with brand immersion wall',
    'Curated hero product launch zone',
    'Interactive try-before-you-buy area',
    'Share-worthy Instagram moment station',
    'Express checkout with brand bag experience',
  ],
  elegant: [
    'Discreet entrance with doorperson greeting',
    'Personal shopping associate introduction',
    'Private viewing suite for premium items',
    'Complimentary beverage and seating lounge',
    'Gift wrapping and personalization service',
  ],
  playful: [
    'Welcoming entry with sensory experience',
    'Interactive discovery zone for children',
    'Build-your-own customization station',
    'Photo opportunity and social sharing point',
    'Reward zone with loyalty perks',
  ],
  corporate: [
    'Professional reception with check-in',
    'Product demonstration area',
    'One-to-one consultation rooms',
    'Streamlined order and fulfillment desk',
  ],
  tech: [
    'Digital welcome screen with personalization',
    'Hands-on demo experience pods',
    'AI-powered product recommendation kiosk',
    'Seamless app-integrated checkout',
    'Technical support and repair bar',
  ],
  organic: [
    'Natural material threshold with scent welcome',
    'Storytelling wall of provenance',
    'Sampling and tasting stations',
    'Community noticeboards and event info',
    'Mindful checkout with sustainability messaging',
  ],
  retro: [
    'Nostalgic entrance with heritage brand story',
    'Vintage display window experience',
    'Hands-on product discovery',
    'Old-fashioned counter service',
    'Loyalty card and loyalty reward scheme',
  ],
};

function buildFloorPlan(brand: BrandIdentity): Record<string, string> {
  const style = brand.style ?? 'minimal';
  const plans: Record<BrandStyle, Record<string, string>> = {
    minimal: {
      entry_zone: '10% — Brand decompression space, minimal signage, single hero product',
      browse_zone: '60% — Open floor plan with flexible fixture system',
      consultation_zone: '20% — Low-profile seating and advisory area',
      checkout_zone: '10% — Integrated point-of-sale with minimal queue',
    },
    bold: {
      entry_zone: '15% — High-impact brand immersion and campaign wall',
      feature_zone: '20% — New arrivals and hero campaign products',
      browse_zone: '45% — Core product range with bold color blocking',
      social_zone: '10% — Instagrammable moment and brand experience',
      checkout_zone: '10% — Branded checkout counter',
    },
    elegant: {
      reception_zone: '10% — Greeting and waiting lounge',
      feature_zone: '25% — Curated hero product presentations',
      browse_zone: '35% — Premium product range',
      private_zone: '20% — Private viewing suites',
      service_zone: '10% — Gift wrap, personalization, checkout',
    },
    playful: {
      entry_zone: '10% — Sensory welcome experience',
      discovery_zone: '30% — Interactive and try-me products',
      build_zone: '25% — Customization and activity stations',
      browse_zone: '25% — Core product range',
      checkout_zone: '10% — Fun checkout experience',
    },
    corporate: {
      reception_zone: '15% — Professional welcome and directory',
      demo_zone: '30% — Product demonstrations and education',
      browse_zone: '35% — Core product range',
      consultation_zone: '10% — Meeting rooms and one-to-ones',
      checkout_zone: '10% — Order desk and fulfillment',
    },
    tech: {
      entry_zone: '10% — Digital welcome and personalization',
      experience_zone: '35% — Hands-on demo pods',
      browse_zone: '30% — Full product range',
      kiosk_zone: '15% — AI recommendations and self-service',
      support_zone: '10% — Technical support bar and checkout',
    },
    organic: {
      entry_zone: '10% — Natural threshold and brand story',
      market_zone: '40% — Open market-style product display',
      sampling_zone: '20% — Tasting and discovery stations',
      community_zone: '20% — Events, classes, and noticeboards',
      checkout_zone: '10% — Sustainable checkout counter',
    },
    retro: {
      entry_zone: '15% — Heritage brand story and vintage display',
      feature_zone: '20% — Curated vintage-inspired hero display',
      browse_zone: '45% — Core product range with retro fixtures',
      counter_zone: '10% — Old-fashioned counter service',
      checkout_zone: '10% — Classic checkout and loyalty rewards',
    },
  };
  return plans[style] ?? plans.minimal;
}

function buildStaffGuidelines(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const base = [
    `Dress code aligned with ${brand.name} brand aesthetic`,
    'Greet customers within 30 seconds of entry',
    'Know the full product range and brand story',
    'Follow brand voice: maintain consistent tone in all interactions',
  ];
  const styleExtras: Partial<Record<BrandStyle, string[]>> = {
    elegant: [
      'Formal attire with brand color accent piece',
      'Personal shopping service offered proactively',
      'Offer complimentary refreshment within 2 minutes',
    ],
    playful: [
      'Casual brand-colored uniform or apron',
      'Engage children and families with enthusiasm',
      'Demonstrate products hands-on whenever possible',
    ],
    tech: [
      'Technical product knowledge certification required',
      'Carry brand-issued tablet for demos and support',
      'Offer tutorial sessions for complex products',
    ],
    organic: [
      'Knowledgeable about provenance and sustainability',
      'Natural, relaxed style — no formal uniform required beyond brand apron',
      'Encourage sampling and discovery',
    ],
    corporate: [
      'Business professional attire at all times',
      'Lead with problem identification before solution presentation',
      'Book follow-up appointments before customer leaves',
    ],
  };
  return [...base, ...(styleExtras[style] ?? [])];
}

export function generateBrandRetail(brand: BrandIdentity): BrandRetailOutput {
  const style = brand.style ?? 'minimal';

  return {
    storeConcept: STYLE_STORE_CONCEPT[style] ?? STYLE_STORE_CONCEPT.minimal,
    materials: STYLE_MATERIALS[style] ?? STYLE_MATERIALS.minimal,
    lighting: STYLE_LIGHTING[style] ?? STYLE_LIGHTING.minimal,
    signageTypes: STYLE_SIGNAGE[style] ?? STYLE_SIGNAGE.minimal,
    displaySystems: STYLE_DISPLAY[style] ?? STYLE_DISPLAY.minimal,
    customerJourney: STYLE_CUSTOMER_JOURNEY[style] ?? STYLE_CUSTOMER_JOURNEY.minimal,
    floorPlanGuidance: buildFloorPlan(brand),
    staffGuidelines: buildStaffGuidelines(brand),
    windowDisplay: {
      concept: `${brand.name} window themed around brand identity and seasonal campaign`,
      changeFrequency: style === 'bold' || style === 'playful' ? 'Monthly' : 'Quarterly',
      keyElements: [
        brand.colors.primary.hex,
        brand.typography.headingFont,
        brand.tagline ?? brand.name,
      ],
      lightingApproach: (STYLE_LIGHTING[style] ?? STYLE_LIGHTING.minimal).split(' ')[0],
    },
    digitalIntegration: [
      'QR codes linking to product pages and reviews',
      style === 'tech'
        ? 'AR product visualization available in-store'
        : 'Digital product catalog available on request',
      'In-store Wi-Fi with branded splash page',
      'Click-and-collect designated pickup area',
      style === 'tech' || style === 'bold'
        ? 'Digital loyalty points earned in-store'
        : 'Stamp card loyalty scheme',
    ],
    sustainabilityFeatures: [
      'LED lighting throughout',
      'Recyclable shopping bags',
      style === 'organic'
        ? 'Compostable packaging and refill stations'
        : 'Opt-in plastic-free packaging',
      'Energy-efficient HVAC and smart controls',
      style === 'organic' || style === 'minimal'
        ? 'In-store recycling and take-back scheme'
        : 'Partner recycling scheme',
    ],
    retailBriefSummary: `${brand.name} retail environment uses a ${style} approach: ${STYLE_STORE_CONCEPT[style]}. Key materials include ${(STYLE_MATERIALS[style] ?? STYLE_MATERIALS.minimal).slice(0, 2).join(' and ')}. The customer journey is guided through ${(STYLE_CUSTOMER_JOURNEY[style] ?? STYLE_CUSTOMER_JOURNEY.minimal).length} defined touchpoints.`,
  };
}
