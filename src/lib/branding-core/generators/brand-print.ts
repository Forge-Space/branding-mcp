import type {
  BrandIdentity,
  BrandStyle,
  BrandPrintOutput,
  PrintTemplate,
  PrintColourSpec,
  PrintAccessibility,
} from '../../types.js';

const STYLE_GRID: Record<BrandStyle, string> = {
  minimal: '12-column grid, generous white space, 8px base unit',
  bold: 'dynamic asymmetric grid, large bleeds, high-impact columns',
  elegant: '6-column editorial grid, wide margins, refined spacing',
  playful: 'fluid irregular grid, overlapping elements, playful offsets',
  corporate: 'strict 12-column grid, consistent margins, professional layout',
  tech: 'modular grid, data-driven layouts, precise alignment',
  organic: 'flowing free-form layout, natural curves, relaxed margins',
  retro: 'vintage editorial grid, ruled lines, ornamental borders',
};

const STYLE_HIERARCHY: Record<BrandStyle, string> = {
  minimal: 'Bold size contrasts with ample space; type does the heavy lifting',
  bold: 'Oversized headlines dominate; colour blocks anchor layout',
  elegant: 'Refined size scale; ligatures and small caps add sophistication',
  playful: 'Varied weights and angles; type as illustration',
  corporate: 'Clear three-level hierarchy; consistent heading/body rhythm',
  tech: 'Monospace accents; data labels and callouts prominent',
  organic: 'Hand-lettered feel; flowing text wraps and nature imagery',
  retro: 'Vintage poster hierarchy; all-caps headlines, ornamental dividers',
};

const STYLE_PAPER: Record<BrandStyle, string[]> = {
  minimal: ['100gsm uncoated, natural white', '300gsm uncoated cover', 'Recycled offset 90gsm'],
  bold: ['250gsm silk coated', '400gsm gloss board', '170gsm silk text'],
  elegant: ['120gsm laid finish', '350gsm cotton board', '100gsm cream wove'],
  playful: ['170gsm uncoated coloured stock', '300gsm kraft board', '90gsm newsprint'],
  corporate: ['100gsm office white coated', '300gsm silk cover', '120gsm gloss text'],
  tech: ['100gsm satin', '270gsm matte board', '80gsm digital bond'],
  organic: ['100gsm recycled natural', '350gsm seed paper', '90gsm stone paper'],
  retro: ['120gsm antique cream', '350gsm vintage matte board', '100gsm newsprint'],
};

const STYLE_FINISHES: Record<BrandStyle, string[]> = {
  minimal: ['Soft-touch laminate', 'Emboss logo only', 'Spot UV on headlines'],
  bold: ['High-gloss laminate', 'Metallic foil stamp', 'Die-cut shapes'],
  elegant: ['Matte laminate', 'Blind deboss', 'Gold foil stamp', 'Edge gilding'],
  playful: ['Velvet laminate', 'Fluorescent spot UV', 'Sticker sheet inserts'],
  corporate: ['Silk laminate', 'Deboss logo', 'Pantone spot colour'],
  tech: ['Matte laminate', 'Cold foil holographic', 'Laser perforation'],
  organic: ['Uncoated natural', 'Soy-ink printing', 'Compostable wrapping'],
  retro: ['Uncoated textured', 'Letterpress impression', 'Engraving'],
};

const STYLE_COLOUR_USE: Record<BrandStyle, string> = {
  minimal: 'Predominantly white/neutral; one accent colour used sparingly',
  bold: 'Full-bleed primary colour; high contrast with white type',
  elegant: 'Muted palette; secondary colour for accents; black preferred',
  playful: 'Vibrant palette; multiple accent colours; gradient overlays',
  corporate: 'Primary brand colour for headings; neutral body; accent for CTAs',
  tech: 'Dark background option; primary colour for data highlights',
  organic: 'Earth tones; primary colour for natural elements only',
  retro: 'Two-colour duotone; sepia or monochrome primary palette',
};

const STYLE_IMAGERY: Record<BrandStyle, string> = {
  minimal: 'One high-quality image per spread; full bleed or isolated on white',
  bold: 'Large cropped imagery; overlapping type on image; bold silhouettes',
  elegant: 'Lifestyle editorial photography; generous white borders',
  playful: 'Illustrated characters; playful collage; doodle overlays',
  corporate: 'Professional headshots and office photography; neutral backgrounds',
  tech: 'Product renders; interface screenshots; isometric illustrations',
  organic: 'Nature macro photography; hand-drawn botanical illustrations',
  retro: 'Halftone photographs; vintage illustrations; screen-print aesthetic',
};

function buildTemplates(brand: BrandIdentity): PrintTemplate[] {
  const style = brand.style ?? 'minimal';

  const marginMap: Record<BrandStyle, string> = {
    minimal: '20mm all sides',
    bold: '12mm all sides with full-bleed option',
    elegant: '25mm outer, 20mm inner',
    playful: '15mm all sides',
    corporate: '20mm all sides',
    tech: '15mm all sides',
    organic: '18mm all sides',
    retro: '12mm all sides with border rule',
  };

  const margins = marginMap[style] ?? marginMap.minimal;

  return [
    {
      name: 'A4 Single Page',
      description: 'Standard informational page, letterhead, or data sheet',
      dimensions: '210 × 297mm',
      bleed: '3mm all sides',
      safeZone: '5mm from trim',
      columns: style === 'minimal' || style === 'elegant' ? 6 : 12,
      margins,
      primaryUse: 'Letterheads, data sheets, fact sheets',
    },
    {
      name: 'A5 Brochure',
      description: 'Compact product brochure or event programme',
      dimensions: '148 × 210mm',
      bleed: '3mm all sides',
      safeZone: '4mm from trim',
      columns: 4,
      margins: '15mm all sides',
      primaryUse: 'Product brochures, event programmes, leaflets',
    },
    {
      name: 'DL Flyer',
      description: 'Slim promotional flyer or direct-mail piece',
      dimensions: '99 × 210mm',
      bleed: '3mm all sides',
      safeZone: '4mm from trim',
      columns: 3,
      margins: '10mm all sides',
      primaryUse: 'Promotional flyers, direct mail, menu cards',
    },
    {
      name: 'Business Card',
      description: 'Standard horizontal business card',
      dimensions: '85 × 55mm',
      bleed: '2mm all sides',
      safeZone: '3mm from trim',
      columns: 2,
      margins: '5mm all sides',
      primaryUse: 'Business cards, loyalty cards, mini cards',
    },
    {
      name: 'A0 Poster',
      description: 'Large-format display poster or exhibition banner',
      dimensions: '841 × 1189mm',
      bleed: '5mm all sides',
      safeZone: '10mm from trim',
      columns: style === 'bold' || style === 'playful' ? 6 : 12,
      margins: '30mm all sides',
      primaryUse: 'Trade show posters, exhibition panels, retail signage',
    },
  ];
}

function buildColourSpec(brand: BrandIdentity): PrintColourSpec {
  const primary = brand.colors.primary.hex;
  const secondary = brand.colors.secondary.hex;
  const accent = brand.colors.accent.hex;

  return {
    mode: 'CMYK for all print; Pantone where available',
    primaryColour: `${primary} (sRGB) — convert to CMYK via ICC profile`,
    secondaryColour: `${secondary} (sRGB) — convert to CMYK via ICC profile`,
    accentColour: `${accent} (sRGB) — use as spot colour where budget allows`,
    blackType: 'Rich black for headlines: C15 M10 Y10 K100; true black (K100) for body text',
    whiteSpace: 'Never fill white with CMYK values; use paper white',
    pantoneBridge:
      'Request Pantone bridge values from printer; approve colour proof before full run',
  };
}

function buildAccessibility(brand: BrandIdentity): PrintAccessibility {
  const style = brand.style ?? 'minimal';

  const noteMap: Record<BrandStyle, string[]> = {
    minimal: 'Clean contrast ratios naturally maintained; white space aids readability'.split(';'),
    bold: 'Large type offsets lower contrast on colour backgrounds; test proofs carefully'.split(
      ';'
    ),
    elegant: 'Thin typefaces may need minimum 9pt; test fine strokes on textured stock'.split(';'),
    playful: 'Verify coloured-type-on-colour meets 4.5:1; avoid light yellow on white'.split(';'),
    corporate: 'Standard corporate templates meet WCAG AA for print automatically'.split(';'),
    tech: 'Small caption sizes common; enforce 7pt minimum; check dark-mode print'.split(';'),
    organic: 'Earth tones may produce low contrast; measure every colour combination'.split(';'),
    retro: 'Aged/textured effect reduces legibility; keep body copy on white panels'.split(';'),
  };

  return {
    minimumFontSize: style === 'tech' ? '7pt body, 6pt captions' : '8pt body, 7pt captions',
    bodyTextMinContrast: '4.5:1',
    headlineMinContrast: '3:1',
    printOnColourMinSize: '10pt',
    reverseTypeMinWeight: 'Regular (400) minimum on coloured backgrounds',
    notes: noteMap[style] ?? noteMap.minimal,
  };
}

function buildPrintBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const grid = STYLE_GRID[style] ?? STYLE_GRID.minimal;
  return (
    `${brand.name} print identity follows a ${style} aesthetic. ` +
    `Use ${grid.split(',')[0]} for layout consistency. ` +
    `Preferred paper: ${(STYLE_PAPER[style] ?? STYLE_PAPER.minimal)[0]}. ` +
    `Key finish: ${(STYLE_FINISHES[style] ?? STYLE_FINISHES.minimal)[0]}. ` +
    `Colour approach: ${STYLE_COLOUR_USE[style] ?? STYLE_COLOUR_USE.minimal}.`
  );
}

export function generateBrandPrint(brand: BrandIdentity): BrandPrintOutput {
  const style = brand.style ?? 'minimal';

  return {
    gridSystem: STYLE_GRID[style] ?? STYLE_GRID.minimal,
    typographyHierarchy: STYLE_HIERARCHY[style] ?? STYLE_HIERARCHY.minimal,
    paperStocks: STYLE_PAPER[style] ?? STYLE_PAPER.minimal,
    printFinishes: STYLE_FINISHES[style] ?? STYLE_FINISHES.minimal,
    colourApproach: STYLE_COLOUR_USE[style] ?? STYLE_COLOUR_USE.minimal,
    imageryGuidelines: STYLE_IMAGERY[style] ?? STYLE_IMAGERY.minimal,
    templates: buildTemplates(brand),
    colourSpec: buildColourSpec(brand),
    accessibility: buildAccessibility(brand),
    productionNotes: [
      'Always supply files as press-quality PDF/X-4 or PDF/X-1a',
      'Embed all fonts; no live text in placed images',
      'Link images at 300 dpi minimum (600 dpi for line art)',
      'Spell-check and proofread in final PDF before sending to print',
      'Request a hard-copy proof or digital PDF proof before full production run',
      'Use colour-managed workflow; attach ICC profiles to all supplied files',
    ],
    printBriefSummary: buildPrintBriefSummary(brand),
  };
}
