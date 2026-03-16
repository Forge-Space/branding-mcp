import type { BrandIdentity, BrandStyle, BrandPodcastOutput } from '../../types.js';

const VALID_STYLES = new Set<BrandStyle>([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

const STYLE_SHOW_CONCEPT: Record<BrandStyle, string> = {
  minimal:
    "A focused, signal-over-noise show with concise episodes that respect the listener's time",
  bold: 'A high-energy show with strong opinions, memorable moments, and an unapologetic point of view',
  elegant:
    'A refined, curated conversation series that attracts discerning listeners seeking depth',
  playful: 'A fun, energetic show packed with personality, humour, and listener interaction',
  corporate:
    'A professional thought-leadership series that builds credibility and drives enterprise trust',
  tech: 'A technically rich show for builders and innovators—detailed, precise, and community-driven',
  organic: 'A values-led show exploring sustainability, purpose, and authentic living',
  retro: 'A nostalgic, story-driven show celebrating heritage, craft, and timeless ideas',
};

const STYLE_FORMAT: Record<BrandStyle, string[]> = {
  minimal: [
    'Solo deep-dive (15–20 min)',
    'Focused Q&A (20–25 min)',
    'Weekly curated round-up (10–15 min)',
  ],
  bold: [
    'Debate format (30–45 min)',
    'Unfiltered hot-takes (20–30 min)',
    'Live audience Q&A (45–60 min)',
  ],
  elegant: [
    'Long-form interview (45–60 min)',
    'Narrative documentary (30–40 min)',
    'Curated panel (40–50 min)',
  ],
  playful: [
    'Comedy chat (25–35 min)',
    'Listener story submissions (20–30 min)',
    'Games and challenges (30–40 min)',
  ],
  corporate: [
    'Executive interview (30–40 min)',
    'Industry trend briefing (20–30 min)',
    'Case study deep-dive (35–45 min)',
  ],
  tech: [
    'Technical tutorial (25–35 min)',
    'Code review / live build (40–60 min)',
    'Open-source spotlight (20–30 min)',
  ],
  organic: [
    'Farm-to-table story (30–40 min)',
    'Founder impact interview (35–50 min)',
    'Community voices (25–35 min)',
  ],
  retro: [
    'Archive dive (30–45 min)',
    'Oral history interview (40–55 min)',
    'Listener nostalgia segment (20–30 min)',
  ],
};

const STYLE_CADENCE: Record<BrandStyle, string> = {
  minimal: 'Weekly — one tight episode, published Monday',
  bold: 'Twice weekly — Tuesday for main episode, Thursday for bonus clip',
  elegant: 'Bi-weekly — alternating Wednesdays for long-form quality',
  playful: 'Weekly — Friday release to kick off the weekend',
  corporate: 'Bi-weekly — alternating Tuesdays aligned with business news cycle',
  tech: 'Weekly — Wednesday release timed with developer news cycles',
  organic: 'Weekly — Sunday release to complement a mindful start to the week',
  retro: 'Bi-weekly — Saturday morning release for leisurely listening',
};

const STYLE_HOST_PERSONA: Record<BrandStyle, string> = {
  minimal: 'Thoughtful curator — asks sharp questions, stays out of the way',
  bold: 'Energetic provocateur — takes positions, challenges guests, creates moments',
  elegant: 'Gracious interviewer — creates space for nuance and reflection',
  playful: 'Enthusiastic companion — laughs easily, brings the fun',
  corporate: 'Credible authority — well-prepared, data-literate, professionally warm',
  tech: 'Curious builder — digs into implementation, respects technical depth',
  organic: 'Empathetic storyteller — listens deeply, centres human impact',
  retro: 'Nostalgic historian — delights in detail, honours the past',
};

const STYLE_GUEST_CRITERIA: Record<BrandStyle, string[]> = {
  minimal: [
    'Practitioner with specific, actionable insight',
    'Avoids over-promotion',
    'Communicates concisely',
  ],
  bold: [
    'Strong opinion and willingness to debate',
    'Audience draw or cultural relevance',
    'Authentic and unscripted',
  ],
  elegant: [
    'Accomplished in their field',
    'Articulate and reflective',
    'Comfortable with long-form conversation',
  ],
  playful: ['Personality-forward', 'Able to improvise and laugh', 'Relatable to core audience'],
  corporate: [
    'C-suite or recognised industry leader',
    'Data-backed perspectives',
    'Willing to share proprietary insight',
  ],
  tech: [
    'Active practitioner or open-source contributor',
    'Technical depth without jargon overload',
    'Community respected',
  ],
  organic: ['Mission-aligned values', 'Authentic impact story', 'Not primarily sales-motivated'],
  retro: [
    'Deep domain knowledge or lived experience',
    'Archival or historical access',
    'Passionate storyteller',
  ],
};

const STYLE_DISTRIBUTION: Record<BrandStyle, string[]> = {
  minimal: ['Apple Podcasts', 'Spotify', 'RSS'],
  bold: ['Spotify', 'YouTube', 'Apple Podcasts', 'TikTok clips'],
  elegant: ['Apple Podcasts', 'Spotify', 'Dedicated website player'],
  playful: ['Spotify', 'YouTube', 'TikTok clips', 'Instagram Reels'],
  corporate: ['Apple Podcasts', 'Spotify', 'LinkedIn Audio', 'Company intranet'],
  tech: ['Spotify', 'Apple Podcasts', 'YouTube', 'Dev.to embeds', 'RSS'],
  organic: ['Apple Podcasts', 'Spotify', 'Community newsletter embed'],
  retro: ['Apple Podcasts', 'Spotify', 'Dedicated archive website'],
};

const STYLE_MONETISATION: Record<BrandStyle, string[]> = {
  minimal: [
    'Branded sponsorship (single mid-roll)',
    'Premium ad-free tier',
    'Listener support (Patreon)',
  ],
  bold: ['Dynamic ad insertion', 'Merchandise', 'Live event tickets', 'Premium bonus content'],
  elegant: ['Single luxury brand sponsorship', 'Private member feed', 'Paid premium series'],
  playful: ['Listener support community', 'Merchandise', 'Live shows'],
  corporate: ['B2B sponsored segments', 'Paid executive access episodes', 'Lead-gen integrations'],
  tech: ['Developer tool sponsorships', 'Paid workshop extensions', 'Affiliate developer products'],
  organic: ['Mission-aligned brand sponsorships', 'Community membership', 'Digital course upsell'],
  retro: ['Heritage brand sponsorships', 'Archival content membership', 'Listener donations'],
};

function buildProductionChecklist(brand: BrandIdentity): string[] {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  const base = [
    'Condenser or dynamic XLR microphone (budget: £100–400)',
    'Acoustic treatment: foam panels or reflection filter',
    'Audio interface (e.g. Focusrite Scarlett Solo)',
    'DAW: Adobe Audition, GarageBand, or Descript',
    'Consistent intro/outro music licensed for podcast use',
    `Episode template: intro (60s) → main content → CTA → outro (30s)`,
    'Show notes with timestamped highlights and guest links',
    'Transcripts for SEO and accessibility',
  ];
  if (safeStyle === 'tech') {
    base.push('Screen-share recording for tutorial segments (OBS or Loom)');
    base.push('Chapter markers in mp3 ID3 tags for developer-friendly navigation');
  }
  if (safeStyle === 'bold') {
    base.push('Video recording setup for YouTube and clip repurposing');
    base.push('Live recording capability for audience episodes');
  }
  if (safeStyle === 'elegant') {
    base.push('Professional sound mastering before publish');
    base.push('Custom composer for original theme music');
  }
  return base;
}

function buildGrowthStrategy(safeStyle: BrandStyle): string[] {
  const base = [
    'Submit to Apple Podcasts, Spotify, Google Podcasts, and Amazon Music on day 1',
    'Launch with 3 episodes to reduce new-listener drop-off',
    'Swap guest appearances on complementary shows (cross-pollination)',
    'Repurpose audiograms and quote cards for social media',
    'Email newsletter episode round-up each publish day',
    'Request reviews from early listeners in episodes 1–5',
  ];
  if (safeStyle === 'tech')
    base.push('Share episodes in relevant Discord servers, subreddits, and Hacker News');
  if (safeStyle === 'corporate')
    base.push('Submit to industry press and analyst briefing distribution lists');
  if (safeStyle === 'organic')
    base.push('Partner with aligned NGOs and impact organisations for co-promotion');
  return base;
}

function buildAccessibilityNotes(): string[] {
  return [
    'Full episode transcripts published alongside every episode (WCAG 1.2.1)',
    'Auto-generated captions on all YouTube versions — reviewed for accuracy',
    'Show notes include all links spoken in the episode in accessible anchor text',
    'Avoid relying solely on audio cues for meaning — reinforce in show notes',
    'Ensure website podcast player is keyboard-navigable and screen-reader compatible',
    'Audio levels normalised to -16 LUFS for consistent listening across devices',
    'Background music mixed below dialogue (minimum 20 dB below voice)',
  ];
}

function buildPodcastBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  const concept = STYLE_SHOW_CONCEPT[safeStyle];
  const cadence = STYLE_CADENCE[safeStyle];
  return `${brand.name}${taglinePart} podcast: ${concept}. ${cadence}.`;
}

export function generateBrandPodcast(brand: BrandIdentity): BrandPodcastOutput {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    showConcept: STYLE_SHOW_CONCEPT[safeStyle],
    recommendedFormats: STYLE_FORMAT[safeStyle],
    publishingCadence: STYLE_CADENCE[safeStyle],
    hostPersona: STYLE_HOST_PERSONA[safeStyle],
    guestSelectionCriteria: STYLE_GUEST_CRITERIA[safeStyle],
    distributionChannels: STYLE_DISTRIBUTION[safeStyle],
    monetisationStrategy: STYLE_MONETISATION[safeStyle],
    productionChecklist: buildProductionChecklist(brand),
    growthStrategy: buildGrowthStrategy(safeStyle),
    accessibilityNotes: buildAccessibilityNotes(),
    podcastBriefSummary: buildPodcastBriefSummary(brand, safeStyle),
  };
}
