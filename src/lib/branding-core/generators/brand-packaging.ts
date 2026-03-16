import type {
  BrandIdentity,
  BrandStyle,
  BrandPackagingOutput,
  PackagingFormat,
} from '../../types.js';

const STYLE_FORM_LANGUAGE: Record<BrandStyle, string> = {
  minimal: 'Clean geometric forms, ample white space, restrained proportions',
  bold: 'Strong angular shapes, high-contrast forms, dominant visual weight',
  elegant: 'Refined curves, slender proportions, subtle embossing and foil details',
  playful: 'Rounded organic shapes, irregular silhouettes, whimsical die-cuts',
  corporate: 'Structured rectangular forms, consistent grid, professional proportions',
  tech: 'Modular grid-based layouts, sharp edges, technical precision',
  organic: 'Natural irregular forms, earth-inspired silhouettes, tactile textures',
  retro: 'Vintage-inspired proportions, decorative borders, nostalgic silhouettes',
};

const STYLE_MATERIALS: Record<BrandStyle, string[]> = {
  minimal: ['Uncoated matte white stock', 'Recycled kraft paper', 'Minimal foil accents'],
  bold: ['High-gloss laminate', 'Spot UV coating', 'Thick card stock'],
  elegant: ['Textured cotton paper', 'Gold/silver foil stamping', 'Satin laminate'],
  playful: ['Bright coated stock', 'Biodegradable plastics', 'Custom printed tissue'],
  corporate: ['Professional matte laminate', 'Consistent branded card stock', 'Security features'],
  tech: ['Clean white substrate', 'Metallic accents', 'Anti-smudge coating'],
  organic: ['FSC-certified paper', 'Soy-based inks', 'Compostable packaging'],
  retro: ['Kraft paper', 'Matte uncoated stock', 'Aged-look paper textures'],
};

const STYLE_PRINT_FINISHES: Record<BrandStyle, string[]> = {
  minimal: ['Matte laminate', 'Blind emboss logo'],
  bold: ['Gloss UV', 'Full-bleed print', 'Spot colour'],
  elegant: ['Soft-touch laminate', 'Gold foil', 'Embossing'],
  playful: ['Gloss laminate', 'Multi-colour print', 'Varnish accents'],
  corporate: ['Matte laminate', 'Pantone colour matching'],
  tech: ['Matte laminate', 'Metallic ink accents'],
  organic: ['Uncoated natural finish', 'Vegetable-ink print'],
  retro: ['Uncoated matte', 'Duotone print', 'Letterpress texture'],
};

const STYLE_COLOR_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Single accent colour on white or light neutral background',
  bold: 'Full primary colour coverage with high-contrast typography',
  elegant: 'Neutral base (cream or charcoal) with metallic accent',
  playful: 'Multi-colour palette with energetic combinations',
  corporate: 'Primary brand colour with neutral secondary; restrained palette',
  tech: 'Dark or white base with single primary tech accent colour',
  organic: 'Earth tones, natural greens, warm neutrals on uncoated stock',
  retro: 'Limited vintage palette: 2-3 muted tones plus black',
};

const STYLE_TYPOGRAPHY_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Sparse type setting, generous tracking, small-scale placement',
  bold: 'Large headline type, condensed variants, high-impact hierarchy',
  elegant: 'Serif display font at small scale, refined letter-spacing',
  playful: 'Rounded display type, varied sizes, informal hierarchy',
  corporate: 'Clear professional typeface, consistent sizing, structured hierarchy',
  tech: 'Monospaced or geometric sans-serif, precise grid alignment',
  organic: 'Hand-lettered feel or organic serif, warm and approachable',
  retro: 'Vintage display type, decorative letterforms, period-accurate layout',
};

const STYLE_SUSTAINABILITY: Record<BrandStyle, string[]> = {
  minimal: ['100% recyclable materials', 'Reduced ink coverage lowers VOC emissions'],
  bold: ['Recyclable stock where feasible', 'Water-based coatings over solvent-based'],
  elegant: ['Responsibly sourced paper (FSC)', 'Minimise foil usage to what is essential'],
  playful: ['Biodegradable or recycled plastics', 'Plant-based inks'],
  corporate: ['ISO 14001-aligned print supplier', 'Waste reduction targets in production'],
  tech: ['Minimal packaging weight', 'Electronics packaging takeback scheme'],
  organic: ['100% compostable or recyclable', 'Soy or algae-based inks only'],
  retro: ['Recycled/upcycled materials', 'Long-lasting design reduces reprints'],
};

const STYLE_UNBOXING: Record<BrandStyle, string> = {
  minimal: 'Understated reveal — clean interior, single tissue layer, quiet brand moment',
  bold: 'High-impact opening — vibrant inner colour, bold messaging inside lid',
  elegant: 'Luxurious unveiling — tissue-wrapped contents, ribbon pull, scented note card',
  playful: 'Surprise and delight — confetti tissue, illustrated inner panels, hidden messages',
  corporate: 'Professional presentation — foam insert, branded documentation, clean layout',
  tech: 'Precision reveal — magnetic closure, moulded insert, minimal copy inside',
  organic: 'Natural sensory experience — kraft tissue, dried botanical insert, handwritten card',
  retro: 'Nostalgic discovery — crinkle paper fill, vintage-styled insert card, wax seal',
};

function buildFormats(brand: BrandIdentity): PackagingFormat[] {
  const base: PackagingFormat[] = [
    {
      type: 'Primary product box',
      primaryUse: 'Core product packaging',
      sizeGuidance: 'Scale to product dimensions +10mm bleed on each side',
      dieCutNotes: 'Auto-lock base; tuck-top lid',
    },
    {
      type: 'Retail sleeve / band',
      primaryUse: 'Overwrap or bundle labelling',
      sizeGuidance: 'Wrap snugly with 5mm overlap zone',
      dieCutNotes: 'Straight die-cut; scored fold lines',
    },
    {
      type: 'Shipping mailer',
      primaryUse: 'E-commerce fulfilment',
      sizeGuidance: 'Add 20mm padding on all sides over product dims',
      dieCutNotes: 'Self-seal strip; tear-open perforation',
    },
    {
      type: 'Hang tag / label',
      primaryUse: 'Product identification and pricing',
      sizeGuidance: '55×85mm standard; adjust for premium feel',
      dieCutNotes: 'Rounded corners; 4mm punch hole top-centre',
    },
  ];

  if (brand.style === 'elegant' || brand.style === 'bold') {
    base.push({
      type: 'Gift box with magnetic closure',
      primaryUse: 'Premium gifting and unboxing experience',
      sizeGuidance: 'Interior foam insert cut to product shape',
      dieCutNotes: 'Rigid board construction; magnet inside spine',
    });
  }

  return base;
}

function buildPrintSpecs(brand: BrandIdentity): Record<string, string> {
  const finishes = STYLE_PRINT_FINISHES[brand.style] ?? STYLE_PRINT_FINISHES.minimal;
  return {
    colour_mode: 'CMYK + 1 Pantone spot colour (primary brand colour)',
    resolution: '300 DPI minimum at final print size',
    bleed: '3mm bleed on all sides; 5mm safety margin inside trim',
    primary_finish: finishes[0] ?? 'Matte laminate',
    secondary_finish: finishes[1] ?? 'None',
    barcode_zone: 'White knockout 30×20mm minimum; bottom-right preferred',
    file_format: 'Press-ready PDF/X-4; include ICC profile',
  };
}

function buildLegalZones(): Record<string, string> {
  return {
    ingredients_nutrition: 'Back panel minimum 8pt type; tabular format preferred',
    legal_disclaimer: 'Side panel or back; 7pt minimum; no contrast issues',
    barcode_sku: 'Back or base panel; EAN-13 or UPC-A; white knockout',
    recycling_symbols: 'Base or back; scale per material type',
    certifications: 'Front or back; placed near logo cluster or footer',
    country_of_origin: 'Back panel; near manufacturer details',
  };
}

function buildDilineGuide(style: BrandStyle): string {
  const guides: Record<BrandStyle, string> = {
    minimal:
      'Use minimal die-line complexity — standard tuck boxes and straight-cut labels. Avoid unnecessary cut-outs.',
    bold: 'Bold die-lines welcome — consider partial windows or custom-cut flaps to reinforce brand energy.',
    elegant:
      'Precision die-cutting for clean edges; consider embossed deboss on lid panel for tactile luxury.',
    playful: 'Explore playful die-cuts: star bursts, rounded flag tags, interactive fold-outs.',
    corporate:
      'Standard industry die-lines for predictable production; consistency across SKUs is key.',
    tech: 'Grid-aligned die-cuts; precision moulded inserts for electronics; cable management slots.',
    organic:
      'Irregular natural-feeling edge cuts acceptable; avoid hard 90° corners where possible.',
    retro:
      'Period-authentic die-lines — scalloped edges, vintage tag shapes, classic box proportions.',
  };
  return guides[style] ?? guides.minimal;
}

export function generateBrandPackaging(brand: BrandIdentity): BrandPackagingOutput {
  const style = brand.style ?? 'minimal';
  const formLanguage = STYLE_FORM_LANGUAGE[style] ?? STYLE_FORM_LANGUAGE.minimal;
  const materials = STYLE_MATERIALS[style] ?? STYLE_MATERIALS.minimal;
  const colorApproach = STYLE_COLOR_APPROACH[style] ?? STYLE_COLOR_APPROACH.minimal;
  const typographyApproach = STYLE_TYPOGRAPHY_APPROACH[style] ?? STYLE_TYPOGRAPHY_APPROACH.minimal;
  const sustainability = STYLE_SUSTAINABILITY[style] ?? STYLE_SUSTAINABILITY.minimal;
  const unboxingExperience = STYLE_UNBOXING[style] ?? STYLE_UNBOXING.minimal;

  const formats = buildFormats(brand);
  const printSpecs = buildPrintSpecs(brand);
  const legalZones = buildLegalZones();
  const dilineGuide = buildDilineGuide(style);

  const colorPaletteSummary = [
    `Primary: ${brand.colors.primary.hex}`,
    `Secondary: ${brand.colors.secondary.hex}`,
    `Accent: ${brand.colors.accent.hex}`,
    ...(brand.colors.neutral.length > 0
      ? [`Neutral base: ${brand.colors.neutral[0]?.hex ?? '#f5f5f5'}`]
      : []),
  ];

  const brandingElements = [
    `Logo placement: front panel, upper-centre or left-aligned — minimum clear space = 2× logo height`,
    `Primary typeface: ${brand.typography.headingFont} for display; ${brand.typography.bodyFont} for body copy`,
    `Tagline: ${brand.tagline ?? 'Use brand tagline below logo if space permits'}`,
    `Industry context: ${brand.industry}`,
  ];

  const brief =
    `${brand.name} packaging follows a ${style} aesthetic — ${formLanguage.toLowerCase()}. ` +
    `Recommended materials include ${materials[0]?.toLowerCase() ?? 'standard card stock'}. ` +
    `Colour approach: ${colorApproach.toLowerCase()}. ` +
    `Sustainability focus: ${sustainability[0]?.toLowerCase() ?? 'use recyclable materials'}.`;

  return {
    formLanguage,
    materials,
    colorApproach,
    colorPaletteSummary,
    typographyApproach,
    brandingElements,
    formats,
    printSpecs,
    legalZones,
    dilineGuide,
    sustainability,
    unboxingExperience,
    packagingBriefSummary: brief,
  };
}
