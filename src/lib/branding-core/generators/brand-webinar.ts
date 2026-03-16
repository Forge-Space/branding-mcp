import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandWebinarOutput } from '../../types.js';

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

const STYLE_FORMAT: Record<BrandStyle, string[]> = {
  minimal: ['Single-topic deep dive', 'Q&A session', 'Demo walkthrough'],
  bold: ['High-energy keynote', 'Live challenge', 'Panel debate'],
  elegant: ['Exclusive masterclass', 'Expert roundtable', 'Curated workshop'],
  playful: ['Interactive quiz show', 'Live game session', 'Community challenge'],
  corporate: ['Executive briefing', 'Compliance training', 'Strategic update'],
  tech: ['Technical workshop', 'Live coding session', 'Architecture walkthrough'],
  organic: ['Community conversation', 'Impact storytelling', 'Peer learning circle'],
  retro: ['Vintage-style broadcast', 'Throwback showcase', 'Heritage masterclass'],
};

const STYLE_PROMOTION: Record<BrandStyle, string[]> = {
  minimal: ['Email sequence (3 touches)', 'LinkedIn event post', 'Website landing page'],
  bold: ['Countdown social posts', 'Teaser video', 'Paid social amplification'],
  elegant: ['Personal invitations', 'Curated email list', 'PR outreach'],
  playful: ['Social media challenge', 'Meme-driven teasers', 'Partner cross-promotion'],
  corporate: ['Internal comms cascade', 'Account-based outreach', 'LinkedIn Sponsored Content'],
  tech: ['Dev community posts', 'GitHub/HN/Reddit thread', 'Technical newsletter'],
  organic: ['Community newsletter', 'Partner ecosystem outreach', 'Grassroots social sharing'],
  retro: ['Nostalgia-themed mailer', 'Retro social graphics', 'Archive-style landing page'],
};

const STYLE_HOST_STYLE: Record<BrandStyle, string> = {
  minimal: 'Concise facilitator — keeps sessions tight and purposeful',
  bold: 'Energetic presenter — high-energy delivery with strong opinions',
  elegant: 'Refined host — polished, thoughtful, exudes expertise',
  playful: 'Entertaining MC — keeps energy high with humour and interaction',
  corporate: 'Professional moderator — structured, authoritative, balanced',
  tech: 'Subject-matter expert — deep technical credibility, demo-driven',
  organic: 'Community catalyst — warm, inclusive, encourages participation',
  retro: 'Nostalgic storyteller — draws on heritage, engaging anecdotes',
};

const STYLE_ENGAGEMENT: Record<BrandStyle, string[]> = {
  minimal: ['Live polls every 15 min', 'Single focused Q&A block', 'Post-session survey'],
  bold: ['Live reactions', 'Real-time challenges', 'Audience voting', 'Breakout sprints'],
  elegant: ['Curated Q&A', 'Exclusive pre-session brief', 'Small-group breakout rooms'],
  playful: ['Trivia mid-session', 'Emoji reactions', 'Live meme wall', 'Audience games'],
  corporate: ['Structured Q&A', 'Pre-submitted questions', 'Executive fireside format'],
  tech: [
    'Live code demos',
    'Architecture diagrams shared screen',
    'Technical Q&A',
    'Sandbox access',
  ],
  organic: ['Open mic Q&A', 'Community story-sharing', 'Co-creation brainstorm'],
  retro: ['Retro-themed trivia', 'Audience stories', 'Historical callbacks'],
};

const STYLE_FOLLOW_UP: Record<BrandStyle, string[]> = {
  minimal: ['Recording link within 24h', 'Key takeaways one-pager', 'Next session announcement'],
  bold: ['Highlight reel', 'Social recap post', 'Bold CTA email', 'Community discussion thread'],
  elegant: [
    'Curated post-session digest',
    'Personalised thank-you note',
    'Exclusive resource bundle',
  ],
  playful: ['Fun recap graphic', 'Challenge results post', 'Community shout-outs'],
  corporate: ['Executive summary PDF', 'Compliance certificate', 'Follow-up meeting booking'],
  tech: [
    'Code repository link',
    'Technical blog post recap',
    'Documentation update',
    'Slack/Discord thread',
  ],
  organic: ['Community impact summary', 'Resource sharing post', 'Next community gathering invite'],
  retro: ['Archive-style recap email', 'Vintage-designed recording page', 'Collector edition PDF'],
};

const STYLE_PLATFORM: Record<BrandStyle, string> = {
  minimal: 'Zoom or Google Meet — simple, no-frills',
  bold: 'StreamYard or Restream — multi-stream, branded overlays',
  elegant: 'Hopin or On24 — premium virtual event experience',
  playful: 'Airmeet or Hopin — interactive, networking-first',
  corporate: 'On24 or Teams Live Events — enterprise-grade security and analytics',
  tech: 'Twitch/YouTube Live or StreamYard — developer-friendly, chat-driven',
  organic: 'Zoom or Crowdcast — community-friendly, accessible pricing',
  retro: 'Zoom with custom vintage virtual backgrounds — nostalgic aesthetic',
};

function buildProductionChecklist(brand: BrandIdentity): string[] {
  const safeStyle = (VALID_STYLES.has(brand.style) ? brand.style : 'minimal') as BrandStyle;
  const base = [
    `Branded slide deck using ${brand.colors.primary.hex} primary colour`,
    'Virtual background with logo and tagline',
    'Intro/outro music aligned to brand audio identity',
    'Lower-third graphics for host and speaker names',
    'Screen share test 30 min before go-live',
    'Recording and backup recording enabled',
    'Caption/transcript service activated',
    'Post-session landing page for on-demand access',
  ];
  if (safeStyle === 'tech') {
    base.push('Code sandbox or demo environment pre-loaded');
    base.push('Screen resolution set to 1080p minimum');
  }
  if (safeStyle === 'bold') {
    base.push('Countdown timer graphic');
    base.push('Live audience reaction overlay');
  }
  if (safeStyle === 'elegant') {
    base.push('Professional lighting check for host camera');
    base.push('Personalised attendee welcome screen');
  }
  return base;
}

function buildAccessibilityNotes(): string[] {
  return [
    'Enable live captions (WCAG 1.2.4) for all sessions',
    'Provide transcript within 48 hours of recording',
    'Ensure visual slides meet 4.5:1 contrast ratio (WCAG 1.4.3)',
    'Announce slide changes verbally for screen reader users',
    'Include keyboard-accessible registration form',
    'Offer BSL/ASL interpreter option on request',
    'Provide content warnings for strobing or rapid movement',
  ];
}

function buildSuccessMetrics(safeStyle: BrandStyle): Record<string, string> {
  const base: Record<string, string> = {
    registration_rate: 'Registrations ÷ page views (target > 25%)',
    attendance_rate: 'Live attendees ÷ registrations (target > 40%)',
    engagement_score: 'Poll/chat interactions ÷ live attendees (target > 30%)',
    on_demand_views: 'Recording plays within 30 days',
    nps_score: 'Post-session NPS (target > 40)',
    follow_up_ctr: 'Click-through on post-session email (target > 15%)',
  };
  if (safeStyle === 'corporate') {
    base['qualified_leads'] = 'MQLs generated from attendee list';
    base['pipeline_influenced'] = 'Deals touched by webinar attendance';
  }
  if (safeStyle === 'tech') {
    base['developer_sign_ups'] = 'New developer accounts from webinar CTA';
    base['github_stars'] = 'Repo stars during/after live session';
  }
  return base;
}

function buildWebinarBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const formats = STYLE_FORMAT[safeStyle];
  const platform = STYLE_PLATFORM[safeStyle];
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return (
    `${brand.name}${taglinePart} webinar strategy. ` +
    `Recommended formats: ${formats.slice(0, 2).join(' and ')}. ` +
    `Platform: ${platform.split(' \u2014 ')[0]}. ` +
    `Host style: ${STYLE_HOST_STYLE[safeStyle].split(' \u2014 ')[0]}.`
  );
}

export function generateBrandWebinar(brand: BrandIdentity): BrandWebinarOutput {
  const safeStyle = (VALID_STYLES.has(brand.style) ? brand.style : 'minimal') as BrandStyle;

  return {
    recommendedFormats: STYLE_FORMAT[safeStyle],
    promotionStrategy: STYLE_PROMOTION[safeStyle],
    hostStyle: STYLE_HOST_STYLE[safeStyle],
    engagementTactics: STYLE_ENGAGEMENT[safeStyle],
    followUpSequence: STYLE_FOLLOW_UP[safeStyle],
    recommendedPlatform: STYLE_PLATFORM[safeStyle],
    productionChecklist: buildProductionChecklist(brand),
    accessibilityNotes: buildAccessibilityNotes(),
    successMetrics: buildSuccessMetrics(safeStyle),
    webinarBriefSummary: buildWebinarBriefSummary(brand, safeStyle),
  };
}
