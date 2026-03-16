import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandChatbotOutput } from '../../types.js';

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

const STYLE_PERSONA: Record<BrandStyle, string> = {
  minimal: 'Clean, direct helper that gives precise answers without fluff',
  bold: 'Energetic, confident guide that inspires action and speaks plainly',
  elegant: 'Refined, attentive concierge that anticipates needs gracefully',
  playful: 'Fun, friendly companion with wit and warmth in every reply',
  corporate: 'Professional, reliable advisor that builds trust through clarity',
  tech: 'Knowledgeable developer advocate comfortable with technical depth',
  organic: 'Authentic, caring companion aligned with nature and well-being',
  retro: 'Nostalgic, characterful guide with a distinct personality and charm',
};

const STYLE_TONE: Record<BrandStyle, string[]> = {
  minimal: ['Concise', 'Neutral', 'Factual', 'Calm'],
  bold: ['Confident', 'Direct', 'Motivational', 'High-energy'],
  elegant: ['Warm', 'Articulate', 'Sophisticated', 'Attentive'],
  playful: ['Friendly', 'Upbeat', 'Humorous', 'Encouraging'],
  corporate: ['Professional', 'Trustworthy', 'Clear', 'Composed'],
  tech: ['Precise', 'Knowledgeable', 'Helpful', 'Developer-friendly'],
  organic: ['Warm', 'Authentic', 'Empathetic', 'Values-driven'],
  retro: ['Distinctive', 'Nostalgic', 'Characterful', 'Genuine'],
};

const STYLE_GREETING: Record<BrandStyle, string> = {
  minimal: 'Hi. How can I help?',
  bold: "Hey! Ready to help you crush it today. What's on your mind?",
  elegant: 'Good day. How may I assist you today?',
  playful: "Hi there! 🎉 I'm here to help — what can we tackle together?",
  corporate: 'Hello. Thank you for reaching out. How can I assist you today?',
  tech: "Hey! I'm here to help with any technical questions or dev queries.",
  organic: 'Hi! Great to connect with you. How can I support you today?',
  retro: 'Well, hello there! Great to see you. What can I do for you today?',
};

const STYLE_FALLBACK: Record<BrandStyle, string> = {
  minimal: "I don't have the answer to that. Can you rephrase or provide more context?",
  bold: "Hmm, that one stumped me. Let's try again — can you give me more detail?",
  elegant: "I'm afraid I don't have that information to hand. Could you elaborate further?",
  playful: "Oops, that one's outside my expertise! Try rephrasing and I'll give it another go 🙂",
  corporate:
    "I don't have enough information to assist with that query. Please clarify so I can help.",
  tech: "That's outside my current knowledge base. Could you share more context or a code snippet?",
  organic: "I want to help but I'm not sure about that one. Could you tell me a bit more?",
  retro: "Well, that one has me stumped! Give me a little more to go on and I'll do my best.",
};

const STYLE_ESCALATION: Record<BrandStyle, string> = {
  minimal: 'Transferring to support.',
  bold: "I'm passing you to our team right now — they'll get you sorted fast.",
  elegant: 'Allow me to connect you with a specialist who will be delighted to assist.',
  playful: 'Time to call in the experts! Handing you over now 🙌',
  corporate:
    'I will escalate your query to the appropriate team and ensure you receive a timely response.',
  tech: "This needs a human expert. I'll connect you with our engineering support team.",
  organic: 'I want you to get the best help possible — let me connect you with our team.',
  retro: 'Right, time to bring in the big guns! Passing you to the team now.',
};

const STYLE_BOUNDARIES: Record<BrandStyle, string[]> = {
  minimal: [
    'Stay on-topic to product and service queries',
    'No personal opinions',
    'No speculation on pricing not in knowledge base',
    'No medical, legal, or financial advice',
  ],
  bold: [
    "Don't overpromise on delivery timelines",
    'Stay positive but honest about limitations',
    'No competitor bashing',
    'No personal opinions on sensitive topics',
  ],
  elegant: [
    'Maintain a refined and courteous tone always',
    'No slang or colloquial language',
    'No discussion of pricing without verification',
    'Escalate all complaints with care and urgency',
  ],
  playful: [
    'Keep humour brand-appropriate and inclusive',
    'No controversial jokes or sensitive topics',
    'No false promises disguised as playfulness',
    'Escalate complex issues promptly',
  ],
  corporate: [
    'Adhere to compliance guidelines at all times',
    'No unauthorised disclosure of business-sensitive information',
    'No speculation on strategy or performance',
    'Escalate regulatory queries to compliance team',
  ],
  tech: [
    'No hallucination of API endpoints or documentation',
    'Always recommend official docs for accuracy',
    'No discussion of unreleased features',
    'Escalate security-related queries immediately',
  ],
  organic: [
    'No unsubstantiated health or environmental claims',
    'Cite certifications accurately',
    'No personal dietary or medical advice',
    'Respect cultural sensitivities in all responses',
  ],
  retro: [
    'Stay authentic and on-brand in all responses',
    'No anachronistic references that break the tone',
    'No misleading nostalgic claims',
    'Escalate complaints with genuine care',
  ],
};

const STYLE_HANDOFF: Record<BrandStyle, string> = {
  minimal: 'When query complexity exceeds chatbot scope',
  bold: 'When the user needs a real person to close a deal or resolve urgently',
  elegant: 'When a personalised, high-touch experience is required',
  playful: 'When the user expresses frustration or needs specialist help',
  corporate: 'When regulatory, legal, or complex account issues arise',
  tech: 'When debugging requires access to internal systems or account data',
  organic: 'When health, dietary, or certification queries need expert input',
  retro: 'When the user needs detailed account-level or bespoke support',
};

function buildIntentCategories(brand: BrandIdentity): string[] {
  const base = [
    'Product information',
    'Pricing and plans',
    'Order and delivery status',
    'Returns and refunds',
    'Account management',
    'Technical support',
    'General FAQ',
  ];
  const industry = brand.industry.toLowerCase();
  if (industry.includes('tech') || industry.includes('software') || industry.includes('saas')) {
    base.push('API and integration queries', 'Bug reports and feature requests');
  } else if (industry.includes('health') || industry.includes('wellness')) {
    base.push('Product safety and ingredients', 'Usage guidance');
  } else if (industry.includes('retail') || industry.includes('fashion')) {
    base.push('Size and fit guidance', 'Gift and personalisation options');
  }
  return base;
}

function buildAccessibilityGuidelines(): string[] {
  return [
    'Use plain language: reading age 9-12 for broad audiences',
    'Provide text alternatives for any emoji or visual-only cues',
    'Ensure keyboard navigability in the chat widget',
    'Respect reduce-motion preferences in typing indicators',
    'Support screen reader-compatible chat UI markup',
    'Offer human escalation for users who cannot interact via text',
    'Comply with WCAG 2.1 AA for embedded chat interfaces',
  ];
}

function buildBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const tagline = brand.tagline ? ` — "${brand.tagline}"` : '';
  const tone = STYLE_TONE[safeStyle].slice(0, 2).join(' and ').toLowerCase();
  return `${brand.name}${tagline} chatbot persona is ${STYLE_PERSONA[safeStyle].toLowerCase()}. The tone is ${tone}, grounded in the ${safeStyle} brand style. Escalation to human agents follows the principle: "${STYLE_HANDOFF[safeStyle].toLowerCase()}."`;
}

export function generateBrandChatbot(brand: BrandIdentity): BrandChatbotOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    chatbotPersona: STYLE_PERSONA[safeStyle],
    toneAttributes: STYLE_TONE[safeStyle],
    greetingMessage: STYLE_GREETING[safeStyle],
    fallbackMessage: STYLE_FALLBACK[safeStyle],
    escalationMessage: STYLE_ESCALATION[safeStyle],
    conversationBoundaries: STYLE_BOUNDARIES[safeStyle],
    humanHandoffTrigger: STYLE_HANDOFF[safeStyle],
    intentCategories: buildIntentCategories(brand),
    accessibilityGuidelines: buildAccessibilityGuidelines(),
    chatbotBriefSummary: buildBriefSummary(brand, safeStyle),
  };
}
