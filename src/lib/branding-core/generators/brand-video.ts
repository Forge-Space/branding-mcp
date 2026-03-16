import type { BrandIdentity, BrandVideoOutput, VideoProductionNote } from '../../types.js';

const VALID_STYLES = new Set([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

const STYLE_AESTHETIC: Record<string, string> = {
  minimal: 'Clean, negative-space-driven visuals with precise motion and minimal colour palette',
  bold: 'High-energy, saturated visuals with kinetic typography and dynamic transitions',
  elegant: 'Cinematic quality with slow, deliberate movement, film grain, and rich colour grading',
  playful: 'Bright, expressive animation with character-driven storytelling and upbeat pacing',
  corporate: 'Professional, structured composition with authoritative motion and clear hierarchy',
  tech: 'Data visualisation, code aesthetics, glitch effects, and futuristic UI reveals',
  organic: 'Natural textures, earth tones, handheld feel, and authentic documentary-style footage',
  retro: 'VHS artefacts, film burns, vintage colour grades, and nostalgic motion graphics',
};

const STYLE_PACING: Record<string, string> = {
  minimal: 'Slow, deliberate cuts with extended hold times; let visuals breathe',
  bold: 'Rapid editing rhythm, flash cuts, and high-impact beat-synced transitions',
  elegant: 'Long takes, smooth camera movements, graceful dissolves',
  playful: 'Bouncy, energetic cuts timed to upbeat music with surprise transitions',
  corporate: 'Steady pacing, measured cuts, professional wipes and fades',
  tech: 'Precise, data-driven timing; animations triggered by narrative beats',
  organic: 'Slow, breathing pace; match-cuts between nature and product',
  retro: 'Variable speed with film-era dissolves and iris transitions',
};

const STYLE_FORMATS: Record<string, string[]> = {
  minimal: [
    'Brand story (60-90s)',
    'Product demo (30-60s)',
    'Testimonial series (15-30s each)',
    'Social reel (9-15s)',
    'Homepage hero loop (10-20s, silent)',
  ],
  bold: [
    'Launch manifesto (60-120s)',
    'Campaign hero film (30-60s)',
    'Social story (15s)',
    'Influencer partnership (30-60s)',
    'Event highlight reel (90-120s)',
  ],
  elegant: [
    'Brand film (2-3min)',
    'Product reveal (45-60s)',
    'Lifestyle campaign (30-60s)',
    'Behind-the-scenes (60-90s)',
    'Seasonal campaign (30-45s)',
  ],
  playful: [
    'Character animation (30-60s)',
    'Explainer (60-90s)',
    'Social challenge (15s)',
    'Tutorial series (60-120s)',
    'User-generated remix (15-30s)',
  ],
  corporate: [
    'Executive message (60-120s)',
    'Investor overview (2-3min)',
    'Product walkthrough (90-180s)',
    'Case study (2-3min)',
    'Event keynote opener (30-60s)',
  ],
  tech: [
    'Product demo (60-90s)',
    'API walkthrough (2-3min)',
    'Feature announcement (30-60s)',
    'Developer tutorial (3-5min)',
    'Infrastructure explainer (90-120s)',
  ],
  organic: [
    'Brand origin story (90-120s)',
    'Provenance documentary (2-3min)',
    'Sustainability report film (60-90s)',
    'Seasonal harvest reel (30-60s)',
    'Community spotlight (60-90s)',
  ],
  retro: [
    'Nostalgia brand film (60-90s)',
    'Archive-style announcement (30-60s)',
    'Vintage product showcase (45-60s)',
    'Throwback campaign (30-45s)',
    'Social archive reel (15-30s)',
  ],
};

const STYLE_COLOR_GRADE: Record<string, string> = {
  minimal: 'Desaturated palette with single accent colour; high contrast blacks and whites',
  bold: 'Vibrant, punchy colours; high saturation; neon accents on dark backgrounds',
  elegant: 'Rich, filmic colour grade; warm shadows; lifted blacks; muted highlights',
  playful: 'Bright primaries, high saturation, soft pastels for secondary elements',
  corporate: 'Clean, neutral grade; slight warm bias for approachability; brand colour accents',
  tech: 'Cool-tinted, high contrast; neon brand colours; dark mode aesthetic',
  organic: 'Warm earth tones; lifted shadows; natural greens; analogue film simulation',
  retro: 'Faded, low-saturation vintage grade; warm yellows; vignette; film grain overlay',
};

const STYLE_TYPOGRAPHY_MOTION: Record<string, string> = {
  minimal: 'Precise letter-spacing reveals; fade-up with slight blur; long hold times',
  bold: 'Kinetic typography; explosive reveals; screen-filling headlines',
  elegant: 'Graceful serif reveals with stagger; thin-weight display; slow fade',
  playful: 'Bouncy spring animations; character-by-character reveals; bubble effects',
  corporate: 'Clean slide-ins and fades; sans-serif; aligned to grid',
  tech: 'Code-typing effect; terminal cursor blink; matrix-style cascade',
  organic: 'Handwritten reveal; natural leaf wipes; organic mask transitions',
  retro: 'Typewriter effect; VHS title card; retro credit roll',
};

const STYLE_MUSIC_DIRECTION: Record<string, string[]> = {
  minimal: [
    'Ambient, minimal electronic or piano',
    'Low BPM (60-80); lots of space and silence',
    'Single melodic motif that evolves gently',
  ],
  bold: [
    'High-energy hip-hop, EDM, or rock',
    'Fast BPM (120-140); driving beat',
    'Impactful drops timed to visual hits',
  ],
  elegant: [
    'Orchestral, jazz, or classical arrangements',
    'Medium BPM (70-90); melodic and emotive',
    'Live instrumentation; natural warmth',
  ],
  playful: [
    'Upbeat pop, quirky indie, or cartoon-style scoring',
    'Medium-fast BPM (100-120); fun and surprising',
    'Playful sound design integrated with music',
  ],
  corporate: [
    'Corporate motivational, uplifting orchestral, or smooth jazz',
    'Medium BPM (85-100); confident and professional',
    'Understated; supports narrative without distraction',
  ],
  tech: [
    'Electronic, synth-forward, or lo-fi beats',
    'Medium BPM (90-110); precise and rhythmic',
    'Futuristic sound design elements',
  ],
  organic: [
    'Acoustic folk, world music, or nature-integrated sound design',
    'Slow-medium BPM (70-95); warm and genuine',
    'Live instruments; field recordings of nature',
  ],
  retro: [
    'Vintage synth, 8-bit, or lo-fi jazz',
    'Variable BPM; era-authentic instrumentation',
    'Vinyl crackle and tape saturation effects',
  ],
};

const STYLE_CALL_TO_ACTION: Record<string, string> = {
  minimal: 'Subtle end card with URL; no voiceover CTA; trust the visual',
  bold: 'Full-screen animated CTA with urgent copy; countdown or limited offer',
  elegant: 'Elegant text overlay fade-in; brand URL; no hard sell',
  playful: 'Animated character points to CTA; fun copy; bright button graphic',
  corporate: 'Professional end card; logo lockup; website and contact details',
  tech: 'Link-in-bio or QR code; developer portal URL; CLI install command',
  organic: 'Soft-sell; visit website for more; QR to provenance page',
  retro: 'Vintage-style end card; retro font URL; "Tune in next time" energy',
};

function buildProductionNotes(brand: BrandIdentity): VideoProductionNote[] {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  return [
    {
      category: 'Pre-production',
      notes: [
        `Script tone: align with ${safeStyle} brand voice`,
        'Storyboard must be approved against brand style guide before shoot',
        `Locations should reflect brand aesthetic: ${STYLE_AESTHETIC[safeStyle].split(';')[0]}`,
        'Talent casting brief to match target audience persona',
        'Music brief to creative agency before shoot',
      ],
    },
    {
      category: 'Production',
      notes: [
        `Camera style: ${safeStyle === 'organic' ? 'handheld, naturalistic' : safeStyle === 'elegant' ? 'tripod, fluid head, cinema lenses' : safeStyle === 'tech' ? 'slider, drone, macro for product' : 'tripod and steadicam mix'}`,
        'Brand colours must appear in at least 30% of frames',
        'Logo placement: lower-third or end card only; no watermark during content',
        'b-roll ratio: minimum 3:1 vs talking-head footage',
        'Capture 16:9 primary; 9:16 vertical cut for social',
      ],
    },
    {
      category: 'Post-production',
      notes: [
        `Colour grade: ${STYLE_COLOR_GRADE[safeStyle]}`,
        `Typography motion style: ${STYLE_TYPOGRAPHY_MOTION[safeStyle]}`,
        `Pacing: ${STYLE_PACING[safeStyle]}`,
        'Subtitles/captions required for all dialogue (accessibility)',
        'Deliver: H.264 MP4 master + compressed social cuts + SRT subtitle file',
      ],
    },
    {
      category: 'Distribution',
      notes: [
        'Platform specs: 4K master, 1080p web, 720p social',
        'YouTube: thumbnail design follows brand colour system',
        'LinkedIn: square (1:1) crop for best in-feed performance',
        'Meta/Instagram: 4:5 crop for feed; 9:16 for Stories/Reels',
        'Website embed: autoplay muted loop for hero; click-to-play for case studies',
      ],
    },
  ];
}

function buildVideoBriefSummary(brand: BrandIdentity): string {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  const taglinePart = brand.tagline ? ` \u2014 "${brand.tagline}"` : '';
  return (
    `${brand.name}${taglinePart} video identity: ${STYLE_AESTHETIC[safeStyle].split(';')[0].toLowerCase()}. ` +
    `Recommended formats include ${STYLE_FORMATS[safeStyle][0]} and ${STYLE_FORMATS[safeStyle][1]}. ` +
    `Music direction: ${STYLE_MUSIC_DIRECTION[safeStyle][0].toLowerCase()}. ` +
    `CTA approach: ${STYLE_CALL_TO_ACTION[safeStyle].split(';')[0].toLowerCase()}.`
  );
}

export function generateBrandVideo(brand: BrandIdentity): BrandVideoOutput {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    videoAesthetic: STYLE_AESTHETIC[safeStyle],
    pacing: STYLE_PACING[safeStyle],
    recommendedFormats: STYLE_FORMATS[safeStyle],
    colorGrade: STYLE_COLOR_GRADE[safeStyle],
    typographyMotion: STYLE_TYPOGRAPHY_MOTION[safeStyle],
    musicDirection: STYLE_MUSIC_DIRECTION[safeStyle],
    callToActionApproach: STYLE_CALL_TO_ACTION[safeStyle],
    productionNotes: buildProductionNotes(brand),
    videoBriefSummary: buildVideoBriefSummary(brand),
  };
}
