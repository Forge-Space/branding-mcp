import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandAudioOutput } from '../../types.js';

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

const STYLE_SONIC_PERSONALITY: Record<BrandStyle, string> = {
  minimal: 'Clean, understated, and precise — audio that communicates without distraction.',
  bold: 'Energetic, powerful, and attention-grabbing — sound that commands the room and drives action.',
  elegant: 'Sophisticated, refined, and timeless — audio that evokes luxury and craftsmanship.',
  playful: 'Fun, upbeat, and memorable — sound that brings joy and invites engagement.',
  corporate:
    'Professional, authoritative, and trustworthy — audio that inspires confidence and credibility.',
  tech: 'Futuristic, precise, and innovative — sound design that feels cutting-edge and intelligent.',
  organic:
    'Warm, natural, and authentic — audio rooted in acoustic instruments and earthy textures.',
  retro:
    'Nostalgic, characterful, and expressive — sound inspired by vintage eras and analogue warmth.',
};

const STYLE_MUSICAL_DIRECTION: Record<BrandStyle, string[]> = {
  minimal: [
    'Sparse piano or acoustic guitar motifs',
    'Long reverb tails with generous silence',
    'Monophonic melodic lines — no dense chords',
    'Tempo: 70–90 BPM (contemplative)',
    'Key: C major or A minor (open, familiar)',
  ],
  bold: [
    'Driving drums and distorted electric guitar',
    'Brass hits for punctuation',
    'High-energy percussion builds',
    'Tempo: 120–140 BPM (anthemic)',
    'Key: E major or G major (bright, powerful)',
  ],
  elegant: [
    'String quartet or chamber orchestra arrangements',
    'Jazz-influenced chord voicings with 7ths and 9ths',
    'Gentle piano with subtle orchestral swells',
    'Tempo: 60–80 BPM (refined)',
    'Key: Db major or Bb major (warm, sophisticated)',
  ],
  playful: [
    'Ukulele, glockenspiel, and pizzicato strings',
    'Syncopated rhythms and playful staccato accents',
    'Major pentatonic melodies — easily singable',
    'Tempo: 100–120 BPM (bouncy)',
    'Key: G major or D major (bright, joyful)',
  ],
  corporate: [
    'Clean electric piano and light orchestral backing',
    'Subtle percussion with corporate snap-track feel',
    'Inspirational crescendo structures',
    'Tempo: 90–110 BPM (purposeful)',
    'Key: C major or F major (stable, professional)',
  ],
  tech: [
    'Synthesiser arpeggios and electronic textures',
    'Glitchy micro-edits and precision sound design',
    'Sub-bass foundation with high-frequency sparkle',
    'Tempo: 110–130 BPM (precise)',
    'Key: F# minor or D minor (cool, forward-looking)',
  ],
  organic: [
    'Acoustic guitar, handpan, and folk instruments',
    'Field recordings woven into the texture (rain, birdsong)',
    'Warm vinyl crackle and tape saturation',
    'Tempo: 75–95 BPM (grounded)',
    'Key: D major or G major (earthy, open)',
  ],
  retro: [
    'Rhodes electric piano and vintage synthesisers',
    'Analogue drum machines (808 or LinnDrum patterns)',
    'Wah-wah guitar and Fender bass lines',
    'Tempo: 95–115 BPM (groovy)',
    'Key: E minor or A minor (nostalgic, warm)',
  ],
};

const STYLE_UI_SOUNDS: Record<BrandStyle, string[]> = {
  minimal: [
    'Notification: single soft sine-tone ping (200ms)',
    'Success: gentle two-note ascending chime',
    'Error: quiet low-pitched descending tone',
    'Click: barely-audible paper tap texture',
    'Loading complete: subtle breath-like swell',
  ],
  bold: [
    'Notification: bold percussive hit with reverb',
    'Success: triumphant three-note fanfare sting',
    'Error: sharp buzzer with impact',
    'Click: firm mechanical click',
    'Loading complete: energetic whoosh and pop',
  ],
  elegant: [
    'Notification: crystal wine-glass harmonic',
    'Success: ascending harp glissando fragment',
    'Error: muted low cello pluck',
    'Click: soft ivory-key press',
    'Loading complete: delicate orchestral sting',
  ],
  playful: [
    'Notification: cheerful cartoon pop',
    'Success: celebratory confetti burst with melodic ding',
    'Error: comical low "bloop" tone',
    'Click: rubber bounce sfx',
    'Loading complete: mini fanfare with sparkle',
  ],
  corporate: [
    'Notification: neutral two-tone chime',
    'Success: clean rising triad sting',
    'Error: muted single descending note',
    'Click: tactile keyboard press',
    'Loading complete: professional resolve chord',
  ],
  tech: [
    'Notification: digital blip with light reverb',
    'Success: synth arpeggio rising sequence',
    'Error: glitchy descending sweep',
    'Click: laser-precision tap',
    'Loading complete: electronic power-up sequence',
  ],
  organic: [
    'Notification: gentle wood-block tap',
    'Success: warm handpan note with sustain',
    'Error: soft muted thud',
    'Click: natural material (stone/wood) tap',
    'Loading complete: birdsong fragment',
  ],
  retro: [
    'Notification: 8-bit style beep (homage, not childish)',
    'Success: vintage game victory jingle (modern mix)',
    'Error: analogue synthesiser descending blip',
    'Click: typewriter key clack',
    'Loading complete: tape rewind and play sound',
  ],
};

const STYLE_PODCAST_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Clean, no-music interview format. Silence is editorial. High-quality mono or stereo.',
  bold: 'High-energy host with bold opinions. Music stingers between segments. Short, punchy episodes.',
  elegant:
    'Long-form conversations with thought leaders. Acoustic ambience. Measured pacing and erudition.',
  playful:
    'Fun co-hosted format with games or challenges. Upbeat transitions and audience participation segments.',
  corporate:
    'Educational series with structured segments. Professional guests, clear takeaways per episode.',
  tech: 'Deep-dive technical topics. Code walk-throughs as audio. Links to transcripts and repos in show notes.',
  organic:
    'Slow-podcast format. Nature soundscapes in intro/outro. Interviews recorded on-location where possible.',
  retro:
    'Old-school radio drama aesthetic. Vintage sound effects. Themed seasons with serialised storytelling.',
};

const STYLE_VOICEOVER_DIRECTION: Record<BrandStyle, string> = {
  minimal:
    'Calm, neutral, unhurried. No affectation. Let the words carry the meaning without vocal performance.',
  bold: 'Confident, direct, energetic. Assertive pacing. Pauses for impact. Voice that commands attention.',
  elegant:
    'Warm, measured, authoritative. Received or neutral accent. Perfect diction with emotional warmth.',
  playful:
    'Upbeat, friendly, slightly theatrical. Natural smile in the voice. Varying pitch for engagement.',
  corporate:
    'Professional, clear, reassuring. Trusted advisor tone. Gender-neutral where possible. No regional affectation.',
  tech: 'Precise, intelligent, approachable. Understated enthusiasm for the subject matter. Not robotic.',
  organic:
    'Natural, unhurried, genuine. Conversational rather than announcer-style. Slight warmth and earthiness.',
  retro:
    'Mid-century announcer energy but modernised. Slightly theatrical without being parody. Character-driven.',
};

function buildBrandJingle(brand: BrandIdentity): string {
  const name = brand.name;
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  const musical = STYLE_MUSICAL_DIRECTION[safeStyle][0].toLowerCase();
  return (
    `A 3–5 second audio logo for ${name}: ${musical}. ` +
    `The motif should be instantly recognisable, work equally well at 3s and 15s, ` +
    `and be memorable after a single hearing. ` +
    `Avoid generic "corporate stings" — the sound should feel uniquely ${name}.`
  );
}

function buildAccessibilityNotes(): string[] {
  return [
    'All audio content must have captions or full transcripts',
    'UI sounds must be optional — users can disable in settings',
    'Autoplay audio is prohibited; user-initiated only',
    'Minimum audio contrast: speech intelligibility at 60 dB SNR',
    'Provide visual alternatives for all audio alerts (badge, colour, haptic)',
    'WCAG 1.4.2: no audio plays automatically for more than 3 seconds without controls',
    'WCAG 1.4.7: background music must be at least 20 dB quieter than speech',
  ];
}

function buildAudioBriefSummary(brand: BrandIdentity): string {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';
  const personality = STYLE_SONIC_PERSONALITY[safeStyle];
  const music = STYLE_MUSICAL_DIRECTION[safeStyle][0];
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return (
    `${brand.name}${taglinePart} audio identity. ` +
    `Sonic personality: ${personality.split(' — ')[0].toLowerCase()}. ` +
    `Musical direction: ${music.toLowerCase()}. ` +
    `Voiceover: ${STYLE_VOICEOVER_DIRECTION[safeStyle].split('.')[0].toLowerCase()}.`
  );
}

export function generateBrandAudio(brand: BrandIdentity): BrandAudioOutput {
  const safeStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    sonicPersonality: STYLE_SONIC_PERSONALITY[safeStyle],
    musicalDirection: STYLE_MUSICAL_DIRECTION[safeStyle],
    uiSounds: STYLE_UI_SOUNDS[safeStyle],
    brandJingleBrief: buildBrandJingle(brand),
    podcastApproach: STYLE_PODCAST_APPROACH[safeStyle],
    voiceoverDirection: STYLE_VOICEOVER_DIRECTION[safeStyle],
    accessibilityNotes: buildAccessibilityNotes(),
    audioBriefSummary: buildAudioBriefSummary(brand),
  };
}
