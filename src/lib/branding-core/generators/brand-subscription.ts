import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandSubscriptionOutput } from '../../types.js';
import { generateBrandVoice } from './brand-voice.js';

const VALID_STYLES = new Set<string>([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

const STYLE_MODEL_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Single-tier, transparent flat-rate subscription with a generous free trial',
  bold: 'Tiered plans with bold feature differentiation and aggressive annual discounts',
  elegant: 'Curated membership tiers with white-glove onboarding and concierge upgrades',
  playful: 'Gamified tiers with badges, surprise perks, and referral rewards',
  corporate: 'Volume-based enterprise licensing with custom SLAs and dedicated support',
  tech: 'Usage-based pricing with a developer free tier, API access, and per-seat upgrades',
  organic: 'Mission-aligned membership with community benefits and impact transparency',
  retro: 'Nostalgia-inspired collector tiers with exclusive vintage editions and early access',
};

const STYLE_TIERS: Record<BrandStyle, string[]> = {
  minimal: ['Free', 'Pro'],
  bold: ['Starter', 'Growth', 'Scale'],
  elegant: ['Member', 'Premium', 'Elite'],
  playful: ['Friend', 'Fan', 'Superfan'],
  corporate: ['Essentials', 'Business', 'Enterprise'],
  tech: ['Free', 'Developer', 'Team', 'Enterprise'],
  organic: ['Supporter', 'Community', 'Champion'],
  retro: ['Collector', 'Curator', 'Archivist'],
};

const STYLE_RETENTION_TACTICS: Record<BrandStyle, string[]> = {
  minimal: [
    'Annual billing discount (20% off monthly rate)',
    'Usage milestone emails celebrating progress',
    'Win-back campaign: simple one-click reactivation',
  ],
  bold: [
    'Power-user feature unlocks at engagement milestones',
    'Loyalty discount ladder: 10% > 20% > 30% at 3/6/12 months',
    'Exclusive beta access for long-tenure subscribers',
  ],
  elegant: [
    'Personalised anniversary gift at 1-year mark',
    'Concierge upgrade call at 90-day mark',
    'Early access to new collections for members 6+ months',
  ],
  playful: [
    'Gamified streak rewards (30/60/90-day badges)',
    'Surprise monthly micro-gift for active subscribers',
    'Refer-a-friend: both parties receive next month free',
  ],
  corporate: [
    'Quarterly executive business reviews for Enterprise tier',
    'Volume commit discounts at 50/100/500 seats',
    'Dedicated success manager at 3-month mark',
  ],
  tech: [
    'Usage-alert emails helping users stay within plan limits',
    'Developer changelog digest to showcase value monthly',
    'Free seat for open-source contributors',
  ],
  organic: [
    'Impact report showing subscriber-funded outcomes',
    'Community co-creation: members vote on next initiative',
    'Subscription pause option to reduce churn',
  ],
  retro: [
    'Limited-edition renewal bonus (exclusive print/item)',
    'Early access to limited drops for long-term subscribers',
    'Curator letters from founders on 6-month anniversary',
  ],
};

const STYLE_CHURN_PREVENTION: Record<BrandStyle, string[]> = {
  minimal: [
    'In-app cancellation friction: show usage stats before exit',
    'Pause subscription option (up to 3 months)',
    'Downgrade path to free tier instead of full cancel',
  ],
  bold: [
    'Cancel survey with immediate personalised counter-offer',
    'Downgrade path prevents 40% of churns',
    'Win-back sequence: day 0, day 7, day 30 emails',
  ],
  elegant: [
    'Cancellation concierge call for Premium/Elite tiers',
    'Loyalty hold: freeze billing for 30 days instead of cancel',
    'Personalised win-back with curated product recommendation',
  ],
  playful: [
    'Cancel-save flow with streak-loss warning and fun copy',
    'Surprise discount pop-up on final confirm step',
    'Re-engagement push notification after 7-day lapse',
  ],
  corporate: [
    'Contract renewal notifications 90/60/30 days before expiry',
    'Usage report showing ROI prior to renewal conversation',
    'Executive sponsor alignment meeting for at-risk accounts',
  ],
  tech: [
    'Automated usage digest 2 weeks before renewal',
    'Credit rollover option reduces cancellation intent',
    'Downgrade to free tier preserves data and reduces churn',
  ],
  organic: [
    'Impact summary email: what your membership funded this year',
    'Community loss messaging: your contributions matter',
    'Subscription pause up to 6 months for financial hardship',
  ],
  retro: [
    'Cancellation warning: you will lose access to archive',
    'Limited farewell offer: keep your collection tier at cost',
    'Win-back: exclusive limited item for reactivated subscribers',
  ],
};

const STYLE_BILLING_CADENCE: Record<BrandStyle, string> = {
  minimal: 'Monthly default; annual at 20% discount',
  bold: 'Monthly, annual (25% off), biennial (35% off)',
  elegant: 'Monthly or annual; custom billing for Elite tier',
  playful: 'Monthly by default; annual unlocks bonus perks',
  corporate: 'Annual contract standard; quarterly available for SMB',
  tech: 'Monthly, annual (2 months free), or usage-based metered',
  organic: 'Monthly by default; annual donation-style commitment option',
  retro: 'Monthly or seasonal (4× per year for collector boxes)',
};

const STYLE_FREE_TRIAL: Record<BrandStyle, string> = {
  minimal: '14-day free trial, no credit card required',
  bold: '7-day free trial with full access; credit card required',
  elegant: '30-day complimentary membership for invited guests',
  playful: 'Free forever tier with upgrade prompts at key moments',
  corporate: '30-day proof-of-concept with dedicated onboarding',
  tech: 'Free tier with usage limits; no time restriction',
  organic: '14-day trial; cancel any time, no questions asked',
  retro: 'First box at cost price (trial with tangible product)',
};

function buildPricingTiers(
  brand: BrandIdentity,
  safeStyle: BrandStyle
): Array<{ tier: string; price: string; features: string[]; cta: string }> {
  const tiers = STYLE_TIERS[safeStyle];
  const name = brand.name;

  return tiers.map((tier, i) => {
    const isFirst = i === 0;
    const isLast = i === tiers.length - 1;
    return {
      tier,
      price: isFirst ? 'Free' : isLast && tiers.length > 2 ? 'Custom' : `$${(i + 1) * 29}/mo`,
      features: [
        isFirst ? `Core ${name} features` : `Everything in ${tiers[i - 1]} tier`,
        isLast && tiers.length > 2 ? 'Custom integrations and SLA' : `${tier}-tier feature set`,
        i > 0 ? 'Priority support' : 'Community support',
        isLast ? 'Dedicated account manager' : 'Self-serve onboarding',
      ],
      cta: isFirst
        ? 'Get started free'
        : isLast && tiers.length > 2
          ? 'Contact sales'
          : `Start ${tier} trial`,
    };
  });
}

function buildOnboardingFlow(safeStyle: BrandStyle): string[] {
  const base = [
    'Welcome email with quick-start checklist',
    'In-product onboarding tour highlighting top 3 features',
    'Day-3 check-in email with tips and tutorials',
    'Day-7 milestone email celebrating first-week usage',
    'Day-14 value email: "Here is what you have achieved"',
  ];
  if (safeStyle === 'tech') {
    base.push(
      'Developer quickstart guide and API key setup',
      'Integration wizard for popular tools'
    );
  }
  if (safeStyle === 'corporate') {
    base.push(
      'Dedicated implementation call within 48 hours',
      'Admin training session for team leads'
    );
  }
  if (safeStyle === 'elegant') {
    base.push(
      'Personalised welcome call from a concierge',
      'Curated getting-started guide tailored to profile'
    );
  }
  return base;
}

function buildAccessibilityNotes(): string[] {
  return [
    'Pricing tables must use semantic HTML table markup (WCAG 1.3.1)',
    'Plan comparison checkmarks must have text equivalents, not just icons',
    'CTA buttons must have 4.5:1 contrast ratio against background (WCAG 1.4.3)',
    'Cancellation flow must be keyboard-navigable (WCAG 2.1.1)',
    'Error messages in billing forms must be descriptive (WCAG 3.3.1)',
    'Subscription confirmation emails must have a plain-text alternative',
    'Annual vs monthly toggle must be accessible to screen readers (WCAG 4.1.2)',
  ];
}

function buildBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const tiers = STYLE_TIERS[safeStyle];
  const tagline = brand.tagline ? ` \u2014 "${brand.tagline}"` : '';
  return (
    `${brand.name}${tagline} offers a ${safeStyle}-style subscription model ` +
    `with ${tiers.length} tiers (${tiers.join(', ')}). ` +
    `Billing: ${STYLE_BILLING_CADENCE[safeStyle]}. ` +
    `Trial: ${STYLE_FREE_TRIAL[safeStyle]}.`
  );
}

export function generateBrandSubscription(brand: BrandIdentity): BrandSubscriptionOutput {
  const rawStyle = brand.style as string;
  const safeStyle: BrandStyle = VALID_STYLES.has(rawStyle) ? (rawStyle as BrandStyle) : 'minimal';

  const voice = generateBrandVoice(brand);
  const pricingTiers = buildPricingTiers(brand, safeStyle);
  const onboardingFlow = buildOnboardingFlow(safeStyle);
  const accessibilityNotes = buildAccessibilityNotes();

  return {
    modelApproach: STYLE_MODEL_APPROACH[safeStyle],
    tiers: STYLE_TIERS[safeStyle],
    pricingTiers,
    billingCadence: STYLE_BILLING_CADENCE[safeStyle],
    freeTrialOffer: STYLE_FREE_TRIAL[safeStyle],
    retentionTactics: STYLE_RETENTION_TACTICS[safeStyle],
    churnPreventionFlow: STYLE_CHURN_PREVENTION[safeStyle],
    onboardingFlow,
    accessibilityNotes,
    copyTone: voice.tone,
    subscriptionBriefSummary: buildBriefSummary(brand, safeStyle),
  };
}
