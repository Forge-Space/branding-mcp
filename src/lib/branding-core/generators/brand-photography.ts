import type { BrandIdentity } from '../../types.js';
import type {
  BrandPhotographyOutput,
  PhotoStyleGuide,
  PhotoCompositionRule,
  PhotoColorTreatment,
} from '../../types.js';

// ---------------------------------------------------------------------------
// Style maps
// ---------------------------------------------------------------------------

const STYLE_AESTHETIC: Record<string, string> = {
  minimal: 'Clean, uncluttered compositions with generous negative space',
  bold: 'High-contrast, dramatic imagery with strong visual impact',
  elegant: 'Refined, sophisticated photography with timeless quality',
  playful: 'Vibrant, energetic imagery full of life and spontaneity',
  corporate: 'Professional, credible photography that builds trust',
  tech: 'Precise, forward-looking imagery showcasing innovation',
  organic: 'Natural, authentic photography celebrating texture and life',
  retro: 'Nostalgic, warm imagery with vintage character and charm',
};

const STYLE_LIGHTING: Record<string, string> = {
  minimal: 'Soft diffused light, even exposure, minimal shadows',
  bold: 'Dramatic directional light with deep shadows and highlights',
  elegant: 'Soft golden-hour light or controlled studio lighting with subtle shadows',
  playful: 'Bright, cheerful natural light; avoid harsh midday sun',
  corporate: 'Clean, neutral studio lighting or bright overcast natural light',
  tech: 'Controlled studio light, blue-tinted highlights, precise shadows',
  organic: 'Golden hour, dappled forest light, soft window light',
  retro: 'Warm tungsten tones, slight overexposure, film grain aesthetic',
};

const STYLE_COLOR_TREATMENT: Record<string, PhotoColorTreatment> = {
  minimal: {
    palette: 'Neutral whites, greys, and single accent color pulls',
    saturation: 'Desaturated with subtle tonal warmth',
    contrast: 'Moderate contrast, lifted shadows',
    grading: 'Matte finish with slightly faded blacks',
    filters: ['Subtle white-balance warm', 'Lifted shadows', 'Reduced vibrance'],
  },
  bold: {
    palette: 'Rich, saturated colors; complementary color pops',
    saturation: 'High saturation, punchy tones',
    contrast: 'High contrast with deep blacks',
    grading: 'Cinema-grade color grading, cinematic LUT',
    filters: ['Crushed blacks', 'Boosted vibrance', 'HSL color isolation'],
  },
  elegant: {
    palette: 'Champagne, ivory, soft golds, muted mauve',
    saturation: 'Slightly desaturated with warm skin tones',
    contrast: 'Soft, airy contrast with luminous highlights',
    grading: 'Film emulation, subtle grain, lifted shadows',
    filters: ['Fuji 400H emulation', 'Subtle fade', 'Warm highlights'],
  },
  playful: {
    palette: 'Bright primary and secondary colors, candy tones',
    saturation: 'High saturation and vibrance',
    contrast: 'Moderate-high contrast, no crushed blacks',
    grading: 'Bright, clean grade with vivid color pops',
    filters: ['Vivid saturation', 'Warm lift', 'Teal-orange split toning'],
  },
  corporate: {
    palette: 'Clean neutrals with brand color accents',
    saturation: 'Moderate saturation, natural tones',
    contrast: 'Moderate contrast, clean midtones',
    grading: 'Natural, unprocessed look; slight sharpening',
    filters: ['Neutral grade', 'Slight clarity boost', 'Clean whites'],
  },
  tech: {
    palette: 'Cool blues, teals, whites; metallic accents',
    saturation: 'Slightly desaturated with cool temperature',
    contrast: 'High contrast with precise shadows',
    grading: 'Cool, clinical grade; blue-green tint in shadows',
    filters: ['Cool white balance', 'Teal shadows', 'Precise highlights'],
  },
  organic: {
    palette: 'Earthy greens, warm browns, creamy whites, terracotta',
    saturation: 'Natural, slightly warm saturation',
    contrast: 'Low-medium contrast, preserved detail in shadows',
    grading: 'Organic film emulation, slight grain, warm tones',
    filters: ['Kodak Portra emulation', 'Green luminance boost', 'Warm shadows'],
  },
  retro: {
    palette: 'Faded oranges, warm yellows, dusty pinks, olive greens',
    saturation: 'Muted, faded saturation',
    contrast: 'Low-medium contrast, lifted blacks',
    grading: 'Vintage film grade, heavy grain, color crossprocessing',
    filters: ['Kodak Ektar vintage', 'Cross-process tones', 'Aggressive grain'],
  },
};

const STYLE_SUBJECTS: Record<string, string[]> = {
  minimal: [
    'Single hero product on clean background',
    'Architectural details with geometric composition',
    'Person in negative space with purposeful empty areas',
    'Still life with 1–3 intentional objects',
    'Texture close-ups with consistent tonal range',
  ],
  bold: [
    'Dynamic action shots with motion blur',
    'Strong portraits with direct eye contact',
    'Dramatic landscapes or cityscapes',
    'Bold graphic typography integration',
    'High-energy team or event photography',
  ],
  elegant: [
    'Luxury product detail and texture close-ups',
    'Refined lifestyle scenes with curated props',
    'Portrait photography with soft bokeh',
    'Table settings, interiors with deliberate styling',
    'Fine art compositions with intentional framing',
  ],
  playful: [
    'Candid moments of joy and laughter',
    'Colorful flat lays with fun props',
    'Energetic group shots and celebrations',
    'Children, pets, and playful activities',
    'Behind-the-scenes creative process shots',
  ],
  corporate: [
    'Professional headshots with consistent backgrounds',
    'Team collaboration in modern office environments',
    'Product demonstrations and use-case scenarios',
    'Client success stories and testimonial portraits',
    'Event photography: conferences, panel discussions',
  ],
  tech: [
    'Product beauty shots with precise lighting',
    'Interface and screen close-ups',
    'Engineers and researchers in workspace',
    'Data visualization and abstract tech imagery',
    'Clean hands-on-device lifestyle shots',
  ],
  organic: [
    'Farm-to-table ingredients and preparation',
    'Nature immersion and outdoor lifestyle',
    'Artisan process and craft close-ups',
    'Community and people in natural settings',
    'Seasonal harvests and botanical details',
  ],
  retro: [
    'Nostalgic lifestyle scenes from past eras',
    'Vintage product styling and collections',
    'Street and documentary-style photography',
    'Classic portraits with retro styling',
    'Aged textures: film, paper, worn surfaces',
  ],
};

const STYLE_COMPOSITION: Record<string, PhotoCompositionRule[]> = {
  minimal: [
    {
      rule: 'Rule of thirds with dominant negative space',
      example: 'Subject occupying one-third of frame',
    },
    { rule: 'Symmetrical framing for product shots', example: 'Centered product on pure white' },
    {
      rule: 'Leading lines directing to hero element',
      example: 'Architectural lines to focal product',
    },
  ],
  bold: [
    { rule: 'Dynamic diagonal compositions', example: 'Subject cutting diagonally through frame' },
    {
      rule: 'Extreme close-up cropping for impact',
      example: 'Face cropped at forehead, showing only eyes',
    },
    { rule: 'Low-angle shots to convey power', example: 'Upward angle emphasizing scale' },
  ],
  elegant: [
    { rule: 'Balanced, harmonious compositions', example: 'Golden ratio placement of subject' },
    {
      rule: 'Depth layers with soft foreground elements',
      example: 'Floral foreground, sharp subject behind',
    },
    {
      rule: 'Negative space preserving luxury feel',
      example: 'Product with generous breathing room',
    },
  ],
  playful: [
    { rule: 'Off-center, asymmetric layouts', example: 'Subject at edge with colorful context' },
    {
      rule: 'Overhead flat-lay with creative arrangement',
      example: 'Colorful items arranged in patterns',
    },
    { rule: 'Frame within a frame for depth', example: 'Subject viewed through window or arch' },
  ],
  corporate: [
    {
      rule: 'Clean, balanced compositions at eye level',
      example: 'Professional headshot, neutral background',
    },
    {
      rule: 'Environmental context showing workspace',
      example: 'Team member at desk in branded office',
    },
    {
      rule: 'Rule of thirds for natural portraits',
      example: 'Person at left third, context at right',
    },
  ],
  tech: [
    { rule: 'Precise geometric compositions', example: 'Device centered with exact symmetry' },
    {
      rule: 'Shallow depth of field on interfaces',
      example: 'Screen in focus, background blurred',
    },
    { rule: 'Overhead angles for product displays', example: 'Flat lay of device and accessories' },
  ],
  organic: [
    { rule: 'Natural, imperfect framing', example: 'Slight tilt suggesting hand-held feel' },
    { rule: 'Texture filling the frame', example: 'Soil, bark, grain close-up' },
    { rule: 'Human hands interacting with nature', example: 'Hands holding produce or craft item' },
  ],
  retro: [
    { rule: 'Square crop for vintage album aesthetic', example: '1:1 ratio with film-era framing' },
    { rule: 'Slightly off-center imperfect framing', example: 'Subject not perfectly centered' },
    {
      rule: 'Wide establishing shots for nostalgia',
      example: 'Full scene with period-appropriate details',
    },
  ],
};

const STYLE_MOOD: Record<string, string> = {
  minimal: 'Calm, focused, intentional — every element has a purpose',
  bold: 'Energized, ambitious, unstoppable — visuals that demand attention',
  elegant: 'Sophisticated, aspirational, timeless — imagery that ages beautifully',
  playful: 'Joyful, spontaneous, warm — photography that makes people smile',
  corporate: 'Trustworthy, professional, approachable — imagery that inspires confidence',
  tech: 'Precise, innovative, forward-thinking — visuals that convey expertise',
  organic: 'Authentic, grounded, connected — photography that feels genuinely human',
  retro: 'Nostalgic, warm, character-filled — imagery with stories embedded in it',
};

const STYLE_DO_AVOID: Record<string, { do: string[]; avoid: string[] }> = {
  minimal: {
    do: [
      'Use clean, uncluttered backgrounds',
      'Embrace white space deliberately',
      'Choose one focal point',
    ],
    avoid: [
      'Busy backgrounds or props',
      'Multiple competing subjects',
      'Heavy post-processing effects',
    ],
  },
  bold: {
    do: ['Use strong, directional lighting', 'Capture decisive moments', 'Embrace high contrast'],
    avoid: ['Flat, even lighting', 'Passive or static compositions', 'Muted or desaturated tones'],
  },
  elegant: {
    do: [
      'Style scenes with care and intention',
      'Use premium props and surfaces',
      'Prioritize soft, flattering light',
    ],
    avoid: [
      'Stock photography clichés',
      'Harsh flash or artificial-looking light',
      'Cluttered or cheap-looking props',
    ],
  },
  playful: {
    do: [
      'Capture genuine candid moments',
      'Use bright, saturated backgrounds',
      'Include diverse, joyful people',
    ],
    avoid: [
      'Posed, stiff compositions',
      'Muted or dark color palettes',
      'Overly corporate or serious contexts',
    ],
  },
  corporate: {
    do: [
      'Use consistent backgrounds across headshots',
      'Show real team members',
      'Reflect actual company culture',
    ],
    avoid: [
      'Generic stock photography',
      'Overly casual or unprofessional contexts',
      'Inconsistent lighting across portraits',
    ],
  },
  tech: {
    do: [
      'Show products in clean, precise setups',
      'Use cool, precise lighting',
      'Feature real people using products',
    ],
    avoid: [
      'Warm or organic color temperatures',
      'Cluttered backgrounds',
      'CGI renders passed as photography',
    ],
  },
  organic: {
    do: [
      'Use natural, available light',
      'Celebrate imperfections and texture',
      'Include authentic human moments',
    ],
    avoid: [
      'Heavy filters or artificial look',
      'Overly perfect or styled scenes',
      'Plastic or synthetic materials in frame',
    ],
  },
  retro: {
    do: [
      'Seek authentic vintage locations',
      'Use film photography when possible',
      'Embrace grain and imperfection',
    ],
    avoid: [
      'Modern digital-looking clarity',
      'Contemporary props or settings',
      'Oversaturated Instagram filters',
    ],
  },
};

// ---------------------------------------------------------------------------
// Builder helpers
// ---------------------------------------------------------------------------

function buildPhotoStyleGuide(brand: BrandIdentity): PhotoStyleGuide {
  const style = brand.style ?? 'minimal';
  return {
    aesthetic: STYLE_AESTHETIC[style] ?? STYLE_AESTHETIC.minimal,
    lighting: STYLE_LIGHTING[style] ?? STYLE_LIGHTING.minimal,
    mood: STYLE_MOOD[style] ?? STYLE_MOOD.minimal,
    subjects: STYLE_SUBJECTS[style] ?? STYLE_SUBJECTS.minimal,
    compositionRules: STYLE_COMPOSITION[style] ?? STYLE_COMPOSITION.minimal,
    colorTreatment: STYLE_COLOR_TREATMENT[style] ?? STYLE_COLOR_TREATMENT.minimal,
    doAndAvoid: STYLE_DO_AVOID[style] ?? STYLE_DO_AVOID.minimal,
  };
}

function buildMoodBoardKeywords(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const baseKeywords: Record<string, string[]> = {
    minimal: ['negative space', 'clean lines', 'monochrome', 'understated', 'serene'],
    bold: ['power', 'drama', 'energy', 'contrast', 'impact'],
    elegant: ['luxury', 'refinement', 'timeless', 'soft', 'aspirational'],
    playful: ['joy', 'vibrant', 'spontaneous', 'colorful', 'fun'],
    corporate: ['professional', 'trustworthy', 'credible', 'modern', 'approachable'],
    tech: ['precision', 'innovation', 'clean', 'forward', 'digital'],
    organic: ['natural', 'earthy', 'authentic', 'texture', 'sustainable'],
    retro: ['nostalgic', 'vintage', 'warm', 'character', 'film'],
  };
  return baseKeywords[style] ?? baseKeywords.minimal;
}

function buildUseCaseGuidelines(brand: BrandIdentity): Record<string, string> {
  const style = brand.style ?? 'minimal';
  return {
    website_hero: `Use ${STYLE_LIGHTING[style]?.split(',')[0] ?? 'natural'} for hero banners with strong ${style} composition`,
    social_media: `${style === 'playful' || style === 'bold' ? 'High-energy' : 'Curated'} square or portrait crops optimized for mobile`,
    email_header: 'Wider 3:1 ratio crops; avoid text-heavy areas in top-center',
    print_materials: 'High-resolution 300dpi minimum; CMYK-safe color palette',
    presentations: 'Dark-overlay backgrounds for text legibility; consistent color treatment',
    product_catalog: 'Consistent white or brand-neutral backgrounds; multiple angle shots',
  };
}

function buildTechnicalRequirements(): Record<string, string> {
  return {
    resolution: '300 DPI minimum for print; 72 DPI web (2x for retina)',
    formats: 'RAW for shoot; export JPEG 90% for web, TIFF for print',
    aspect_ratios: '16:9 landscape, 4:5 portrait, 1:1 square; provide all three',
    color_space: 'sRGB for digital; Adobe RGB or CMYK for print production',
    minimum_width: '2400px for website heroes; 1080px for social',
    delivery: 'Unedited RAWs + edited selects + final exports in branded folder structure',
  };
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function generateBrandPhotography(brand: BrandIdentity): BrandPhotographyOutput {
  return {
    styleGuide: buildPhotoStyleGuide(brand),
    moodBoardKeywords: buildMoodBoardKeywords(brand),
    useCaseGuidelines: buildUseCaseGuidelines(brand),
    technicalRequirements: buildTechnicalRequirements(),
    shootBriefSummary: `${brand.name ?? 'Brand'} photography should feel ${STYLE_MOOD[brand.style ?? 'minimal']}. ${STYLE_AESTHETIC[brand.style ?? 'minimal']}. ${STYLE_LIGHTING[brand.style ?? 'minimal']}.`,
  };
}
