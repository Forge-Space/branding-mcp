import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandInteriorOutput } from '../../types.js';

const STYLE_CONCEPT: Record<BrandStyle, string> = {
  minimal: 'Clean, uncluttered spaces with intentional negative space and precision craftsmanship',
  bold: 'High-impact visual statements with dramatic scale, strong geometry, and vibrant colour fields',
  elegant: 'Refined luxury with curated materials, bespoke furnishings, and understated opulence',
  playful:
    'Dynamic, energetic environments with unexpected colour, interactive elements, and joyful surprises',
  corporate:
    'Professional, efficient environments that convey authority, trust, and operational excellence',
  tech: 'Innovative digital-physical integration with smart systems, clean lines, and future-forward materials',
  organic:
    'Nature-inspired sanctuaries using biophilic design, natural materials, and living elements',
  retro:
    'Nostalgic environments that honour heritage through vintage materials, warm tones, and curated artifacts',
};

const STYLE_MATERIALS: Record<BrandStyle, string[]> = {
  minimal: ['White oak', 'Honed concrete', 'Matte white plaster', 'Brushed steel'],
  bold: ['Polished concrete', 'Lacquered surfaces', 'Industrial steel', 'Statement stone'],
  elegant: ['Marble', 'Velvet', 'Solid walnut', 'Brushed brass', 'Silk drapes'],
  playful: ['Coloured resin', 'Powder-coated steel', 'Plywood', 'Cork', 'Soft foam'],
  corporate: ['Tempered glass', 'Anodised aluminium', 'Commercial carpet', 'Laminate panels'],
  tech: ['Polished aluminium', 'Tempered glass', 'LED-embedded panels', 'Carbon fibre accents'],
  organic: ['Reclaimed timber', 'Rammed earth', 'Linen', 'Stone', 'Living green walls'],
  retro: ['Terrazzo', 'Exposed brick', 'Aged leather', 'Brass fixtures', 'Vintage tile'],
};

const STYLE_LIGHTING: Record<BrandStyle, string> = {
  minimal: 'Diffuse daylight supplemented by recessed LED at 3000K; no visible light fittings',
  bold: 'Dramatic accent lighting, colour-washed walls, oversized pendants as statement pieces',
  elegant: 'Warm 2700K ambient with bespoke chandeliers, task lighting in antique brass',
  playful:
    'Colourful LED systems, pendant clusters, neon accents, and interactive reactive lighting',
  corporate: 'Consistent 4000K LED panels, task lighting at workstations, glare-controlled',
  tech: 'Tunable white LED (2700–6500K), hidden cove lighting, smart scene control',
  organic: 'Maximise natural light with south-facing glazing; warm 2700K supplemental',
  retro: 'Edison bulbs, pendant shades, table lamps, indirect cove lighting in amber tones',
};

const STYLE_COLOUR_PALETTE: Record<BrandStyle, string> = {
  minimal: 'Whites, off-whites, and warm greys with singular brand colour accent',
  bold: 'Full brand palette deployed at large scale; white as breathing space',
  elegant: 'Cream, ivory, and deep neutrals punctuated by brand colour in soft furnishings',
  playful: 'Bright brand palette throughout; mix of complementary hues with white relief',
  corporate: 'Neutral greys and whites; brand colour on feature wall and branded elements only',
  tech: 'Dark mode palette — charcoals and blacks with brand colour in glowing accents',
  organic: 'Earthy neutrals — sand, stone, sage — with brand colour in textiles and plants',
  retro: 'Warm cream and terracotta base with brand colour in vintage-inspired details',
};

const STYLE_FURNITURE: Record<BrandStyle, string> = {
  minimal: 'Architectural furniture with clean profiles; Form Follows Function',
  bold: 'Statement hero pieces, oversized seating, modular systems in brand colours',
  elegant: 'Bespoke or designer vintage, upholstered in premium fabrics, hand-finished',
  playful: 'Mix-and-match seating, bean bags, collaborative furniture, moveable pieces',
  corporate: 'Ergonomic task chairs, height-adjustable desks, formal meeting suites',
  tech: 'Standing desks, collaborative pods, lounge seating with integrated power',
  organic: 'Natural wood forms, rattan and cane, low-profile seating close to nature',
  retro: 'Vintage-inspired mid-century, reupholstered classics, patinated metal legs',
};

const STYLE_SIGNAGE: Record<BrandStyle, string> = {
  minimal: 'Laser-cut aluminium letters on white; no decorative surround',
  bold: 'Large-format vinyl, illuminated channel letters, floor-to-ceiling graphics',
  elegant: 'Engraved brass plaques, frosted glass, individual gilt letters',
  playful: 'Neon signs, painted murals, floor decals, chalkboard panels',
  corporate: 'Backlit acrylic panels, directory boards, ADA-compliant wayfinding',
  tech: 'Digital display walls, e-ink wayfinding, LED blade signs',
  organic: 'Burned wood panels, hand-painted stone, living moss logo installations',
  retro: 'Painted timber boards, vintage enamel signs, pressed-metal lettering',
};

const STYLE_ZONES: Record<BrandStyle, string[]> = {
  minimal: ['Reception (15%)', 'Core workspace (60%)', 'Meeting rooms (20%)', 'Utility (5%)'],
  bold: [
    'Brand activation zone (20%)',
    'Open workspace (40%)',
    'Collaboration (25%)',
    'Service (15%)',
  ],
  elegant: [
    'Arrival lounge (20%)',
    'Private suites (45%)',
    'Consultation salon (25%)',
    'Staff (10%)',
  ],
  playful: [
    'Play entrance (15%)',
    'Activity zones (40%)',
    'Relaxation nooks (25%)',
    'Back-of-house (20%)',
  ],
  corporate: [
    'Reception (10%)',
    'Open plan (50%)',
    'Meeting rooms (25%)',
    'Executive (10%)',
    'Support (5%)',
  ],
  tech: ['Showcase lobby (20%)', 'Dev floor (45%)', 'Innovation lab (20%)', 'Social hub (15%)'],
  organic: [
    'Welcome garden (15%)',
    'Open studio (50%)',
    'Quiet focus (20%)',
    'Community kitchen (15%)',
  ],
  retro: [
    'Heritage foyer (20%)',
    'Main hall (45%)',
    'Private booths (20%)',
    'Service counter (15%)',
  ],
};

const STYLE_BIOPHILIC: Record<BrandStyle, string> = {
  minimal: 'Single architectural plant specimen; no clutter',
  bold: 'Statement indoor trees, vertical planters as colour backdrops',
  elegant: 'Curated orchids and sculptural arrangements; florals changed weekly',
  playful: 'Hanging plant mobiles, terrariums, herb walls, moss art',
  corporate: 'Low-maintenance planters in reception and breakout; green wall in canteen',
  tech: 'Living moss server art, hydroponic herb garden, bonsai collections',
  organic: 'Full living walls, specimen trees, indoor water features, edible gardens',
  retro: 'Vintage terracotta pots, trailing ferns, dried botanical arrangements',
};

function buildSpaceZones(
  brand: BrandIdentity
): Array<{ zone: string; percentage: string; purpose: string }> {
  const style = brand.style ?? 'minimal';
  const zones = STYLE_ZONES[style] ?? STYLE_ZONES.minimal;
  const purposes: Record<string, string> = {
    Reception: 'First impression, brand storytelling, visitor welcome',
    'Core workspace': 'Focused individual and team productivity',
    'Meeting rooms': 'Collaborative decision-making and client presentations',
    Utility: 'Storage, services, and operational support',
    'Brand activation zone': 'Immersive brand experiences and community events',
    'Open workspace': 'Flexible collaborative and focused work',
    Collaboration: 'Cross-functional team interaction and ideation',
    Service: 'Client service delivery and support functions',
    'Arrival lounge': 'Premium welcome experience and brand immersion',
    'Private suites': 'Exclusive service delivery and consultation',
    'Consultation salon': 'High-touch personal service interactions',
    Staff: 'Back-of-house team facilities',
    'Play entrance': 'Energetic brand introduction and engagement hook',
    'Activity zones': 'Interactive experiences and programming',
    'Relaxation nooks': 'Rest, recharge, and informal connection',
    'Back-of-house': 'Operations, storage, and logistics',
    'Open plan': 'Standard agile work environment',
    Executive: 'Leadership spaces, board rooms, executive lounge',
    Support: 'IT, HR, and administrative functions',
    'Showcase lobby': 'Product and technology demonstrations',
    'Dev floor': 'Engineering and technical team workspace',
    'Innovation lab': 'R&D, prototyping, and experimentation',
    'Social hub': 'All-hands, events, and community gathering',
    'Welcome garden': 'Nature-forward arrival and decompression space',
    'Open studio': 'Creative and collaborative main floor',
    'Quiet focus': 'Deep work and contemplation zones',
    'Community kitchen': 'Shared cooking, eating, and informal gatherings',
    'Heritage foyer': 'Brand history display and warm welcome',
    'Main hall': 'Primary service delivery space',
    'Private booths': 'Intimate dining or consultation spaces',
    'Service counter': 'Order taking, payment, and service delivery',
  };
  return zones.map((z) => {
    const parts = z.split(' (');
    const zoneName = parts[0];
    const pct = parts[1]?.replace(')', '') ?? '20%';
    return {
      zone: zoneName,
      percentage: pct,
      purpose: purposes[zoneName] ?? 'Multi-purpose space for brand activities',
    };
  });
}

function buildAccessibilityNotes(): string[] {
  return [
    'Minimum 1500mm clear circulation paths throughout',
    'Accessible entrance at grade level or with powered ramp',
    'Accessible toilet on every occupied floor',
    'Tactile ground surface indicators at hazard zones',
    'Audio induction loops in all public-facing areas',
    'Colour contrast ratios of 3:1 minimum for wayfinding',
    'Avoid patterns that can cause disorientation for neurodiverse visitors',
    'Quiet room or sensory retreat available',
  ];
}

function buildSustainabilityFeatures(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const base = [
    'LED lighting throughout with occupancy sensors',
    'Low-VOC paints, adhesives, and sealants',
    'Sustainable material certification (FSC, PEFC, or equivalent)',
    'Energy-efficient HVAC with smart zone control',
    'Water-efficient fixtures (min. 30% reduction vs baseline)',
  ];
  if (style === 'organic') {
    return [
      ...base,
      'BREEAM Excellent or LEED Gold target',
      'On-site renewable energy generation (PV or micro-wind)',
      'Rainwater harvesting for irrigation and toilet flushing',
      'Circular economy fit-out: lease-based furniture, disassembly plan',
    ];
  }
  if (style === 'tech') {
    return [
      ...base,
      'Building Management System (BMS) with AI optimisation',
      'Smart metering and real-time energy dashboard for occupants',
      'EV charging provision for 20% of car parking',
    ];
  }
  return [...base, 'Reuse and upcycle strategy for existing fit-out elements'];
}

function buildBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const concept = STYLE_CONCEPT[style] ?? STYLE_CONCEPT.minimal;
  const taglineNote = brand.tagline ? ` — inspired by "${brand.tagline}"` : '';
  return (
    `${brand.name}${taglineNote} interior direction: ${concept}. ` +
    `Materials include ${(STYLE_MATERIALS[style] ?? STYLE_MATERIALS.minimal).slice(0, 2).join(' and ')}. ` +
    `Lighting approach: ${(STYLE_LIGHTING[style] ?? STYLE_LIGHTING.minimal).split(';')[0].toLowerCase()}. ` +
    `Primary colour palette: ${(STYLE_COLOUR_PALETTE[style] ?? STYLE_COLOUR_PALETTE.minimal).toLowerCase()}.`
  );
}

export function generateBrandInterior(brand: BrandIdentity): BrandInteriorOutput {
  const style = brand.style ?? 'minimal';
  return {
    spaceConcept: STYLE_CONCEPT[style] ?? STYLE_CONCEPT.minimal,
    materials: STYLE_MATERIALS[style] ?? STYLE_MATERIALS.minimal,
    lightingApproach: STYLE_LIGHTING[style] ?? STYLE_LIGHTING.minimal,
    colourPaletteApplication: STYLE_COLOUR_PALETTE[style] ?? STYLE_COLOUR_PALETTE.minimal,
    furnitureDirection: STYLE_FURNITURE[style] ?? STYLE_FURNITURE.minimal,
    signageAndWayfinding: STYLE_SIGNAGE[style] ?? STYLE_SIGNAGE.minimal,
    biophilicElements: STYLE_BIOPHILIC[style] ?? STYLE_BIOPHILIC.minimal,
    spaceZones: buildSpaceZones(brand),
    accessibilityNotes: buildAccessibilityNotes(),
    sustainabilityFeatures: buildSustainabilityFeatures(brand),
    interiorBriefSummary: buildBriefSummary(brand),
  };
}
