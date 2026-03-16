import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandEcommerceOutput } from '../../types.js';

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

const STYLE_STORE_CONCEPT: Record<BrandStyle, string> = {
  minimal:
    'Clean grid layout with generous whitespace, single-column product focus, and distraction-free checkout',
  bold: 'Full-bleed hero imagery, high-contrast CTAs, bold typography, and energy-driven product showcases',
  elegant:
    'Luxury editorial grid, curated collections, soft overlays, and premium unboxing narratives',
  playful:
    'Illustrated banners, animated product cards, gamified rewards, and surprise-and-delight moments',
  corporate:
    'Structured catalogue with filterable specs, bulk ordering, quote request flows, and account portals',
  tech: 'Developer-first store with technical specs front-and-centre, API purchasing, and CLI install prompts',
  organic:
    'Story-driven product pages with provenance maps, ingredient transparency, and eco-certification badges',
  retro: 'Vintage storefront aesthetic, editorial product photography, and nostalgia-driven copy',
};

const STYLE_PRODUCT_PAGE_LAYOUT: Record<BrandStyle, string[]> = {
  minimal: [
    'Single large product image with thumbnail strip',
    'Title, price, and one-line description above the fold',
    'Add-to-cart with sticky bar on scroll',
    'Collapsible specification and care sections',
    'Minimal related products (3 max)',
  ],
  bold: [
    'Full-width hero video or lifestyle image',
    'High-contrast price and CTA block',
    'Social proof ticker (recent purchases)',
    'Tabbed specs, reviews, and Q&A',
    'Bold upsell block with urgency copy',
  ],
  elegant: [
    'Editorial double-image layout with product story',
    'Refined typography hierarchy (name, line, price)',
    'Material and craftsmanship callout cards',
    'White-glove delivery promise badge',
    'Curated "Complete the Look" section',
  ],
  playful: [
    'Animated product image carousel with hover effects',
    'Emoji-driven feature highlights',
    'Colour and variant selector with instant preview',
    'Fun size guide with illustrated diagrams',
    '"You might also love" discovery strip',
  ],
  corporate: [
    'Tabbed product overview with datasheet download',
    'Compatibility matrix and integration notes',
    'Volume pricing table',
    'Request a quote / contact sales CTA',
    'Related products and accessories grid',
  ],
  tech: [
    'Technical spec comparison table',
    'Code snippet for SDK installation',
    'Changelog and version history section',
    'GitHub stars and npm downloads badge',
    'Community forum link and support tier selector',
  ],
  organic: [
    'Origin story map and farm provenance section',
    'Ingredient and allergen transparency table',
    'Certifications and eco-label badges',
    'How it is made / traceability timeline',
    '"Frequently bought with" ethical pairings',
  ],
  retro: [
    'Vintage-styled product card with hand-drawn accents',
    'Story copy in editorial long-read format',
    'Limited-edition badge and serial numbering',
    'Archive gallery showing product history',
    'Collector tips and provenance notes',
  ],
};

const STYLE_CHECKOUT_PRINCIPLES: Record<BrandStyle, string[]> = {
  minimal: [
    'Single-page checkout with progress indicator',
    'Guest checkout as primary option',
    'Minimal form fields (name, email, address, payment)',
    'Auto-fill and address lookup enabled',
    'Order summary always visible',
  ],
  bold: [
    'Express checkout buttons (Apple Pay, Google Pay) at top',
    'Bold progress bar with estimated delivery date',
    'Social proof ("500 people bought this today") near CTA',
    'Post-purchase upsell modal with time limit',
    'Celebratory confirmation page with share prompt',
  ],
  elegant: [
    'Multi-step checkout with refined micro-animations',
    'Address saved to account for returning customers',
    'Gift wrapping and personalised message option',
    'White-glove delivery slots at checkout',
    'Understated confirmation with handwritten thank-you note preview',
  ],
  playful: [
    'Fun progress bar with animated milestones',
    'Reward points preview during checkout',
    'Gamified delivery speed selector',
    'Confetti confirmation page',
    'Social share for orders ("I just bought something awesome!")',
  ],
  corporate: [
    'PO number and cost-centre field support',
    'Multi-approver workflow for enterprise orders',
    'Invoice and NET-30 payment option',
    'Saved payment methods for account holders',
    'Order confirmation with ERP reference number',
  ],
  tech: [
    'API-first checkout with SDK access post-purchase',
    'License key generated immediately on confirmation',
    'Seat count selector for team plans',
    'SSO login option at checkout',
    'Developer portal access link in confirmation email',
  ],
  organic: [
    'Carbon offset calculation shown during checkout',
    'Packaging preference (minimal / compostable)',
    'Subscription save-and-subscribe option',
    'Delivery route transparency (local warehouse)',
    'Charity donation round-up at checkout',
  ],
  retro: [
    'Hand-illustrated order summary card design',
    'Optional gift certificate field',
    'Legacy payment methods (cheque on request)',
    'Collector number assigned at checkout',
    'Personalised "Thank you" card preview',
  ],
};

const STYLE_MERCHANDISING: Record<BrandStyle, string[]> = {
  minimal: [
    'Curated collections of 8-12 items',
    'No more than 2 featured products on homepage',
    'Seasonal hero swap every 4 weeks',
  ],
  bold: [
    'Flash sale banners with countdown timers',
    'Best-seller badges on top 10 products',
    'Trending now carousel updated daily',
  ],
  elegant: [
    'Seasonal editorial lookbooks',
    'Limited-edition drops with waitlist',
    'Styled scene photography for homepage hero',
  ],
  playful: [
    'Daily deal wheel or mystery box',
    'Build-your-own bundle configurator',
    'Seasonal themed collections with custom art',
  ],
  corporate: [
    'Product family groupings by use case',
    'Downloadable product catalogues (PDF)',
    'Volume discount tier visibility on listing page',
  ],
  tech: [
    'Featured integrations marketplace',
    'Community-built templates or extensions',
    'Changelog-driven "What is new" section',
  ],
  organic: [
    'Harvest-season limited batches',
    'Provenance region collections',
    '"Better Together" ingredient pairing bundles',
  ],
  retro: [
    'Archive series drops',
    'Numbered limited editions',
    'Seasonal throwback campaigns with original archive imagery',
  ],
};

const STYLE_TRUST_SIGNALS: Record<BrandStyle, string[]> = {
  minimal: ['Clean SSL badge', 'Simple 30-day returns policy', 'Privacy policy link in footer'],
  bold: ['Trustpilot or Google Reviews widget', 'UGC photo feed', 'Live purchase notifications'],
  elegant: [
    'Press mentions carousel',
    'Authenticity certificate for premium items',
    'White-glove return policy',
  ],
  playful: [
    'Customer photo reviews with ratings',
    'Emoji review summary',
    'Fun "happiness guarantee" badge',
  ],
  corporate: [
    'ISO certification badges',
    'Compliance documentation download',
    'SLA uptime guarantee',
  ],
  tech: ['SOC 2 Type II badge', 'Open-source audit link', 'Status page link'],
  organic: [
    'Certified Organic / Fair Trade badges',
    'Third-party lab test results',
    'B Corp certification',
  ],
  retro: [
    'Authenticity and provenance certificate',
    'Heritage brand story',
    'Expert curation badge',
  ],
};

function buildSeoGuidelines(brand: BrandIdentity): string[] {
  return [
    `Use "${brand.name}" as the primary keyword anchor across product titles and meta descriptions`,
    'Optimise product images with descriptive alt text including product name and key attributes',
    'Implement product schema markup (schema.org/Product) with price, availability, and review data',
    'Create canonical URLs for product variants (colour, size) to avoid duplicate content',
    'Build category landing pages with H1 headers targeting primary category keywords',
    'Enable breadcrumb schema for navigation hierarchy',
    'Submit product sitemap to Google Search Console and Bing Webmaster Tools',
    'Use structured data for special offers, sales prices, and promotional events',
  ];
}

function buildAccessibilityGuidelines(): string[] {
  return [
    'All product images require descriptive alt text (WCAG 1.1.1)',
    'Ensure colour is never the only means of conveying variant information (WCAG 1.4.1)',
    'Minimum contrast ratio 4.5:1 for product text, 3:1 for large text and price (WCAG 1.4.3)',
    'Keyboard-navigable product carousels and image zoom features (WCAG 2.1.1)',
    'Checkout form fields must have visible labels (not placeholder-only) (WCAG 3.3.2)',
    'Error messages in checkout must be descriptive and suggestions provided (WCAG 3.3.3)',
    'Loading states and skeleton screens must be announced to screen readers',
    'Minimum 44x44px touch target for all add-to-cart and CTA buttons (WCAG 2.5.5)',
  ];
}

function buildBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const concept = STYLE_STORE_CONCEPT[safeStyle];
  const topLayout = (STYLE_PRODUCT_PAGE_LAYOUT[safeStyle]?.[0] ?? '').toLowerCase();
  const topCheckout = (STYLE_CHECKOUT_PRINCIPLES[safeStyle]?.[0] ?? '').toLowerCase();
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return (
    `${brand.name}${taglinePart} ecommerce direction: ${concept}. ` +
    `Product pages lead with ${topLayout}. ` +
    `Checkout prioritises ${topCheckout}.`
  );
}

export function generateBrandEcommerce(brand: BrandIdentity): BrandEcommerceOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    storeConcept: STYLE_STORE_CONCEPT[safeStyle],
    productPageLayout: STYLE_PRODUCT_PAGE_LAYOUT[safeStyle] ?? STYLE_PRODUCT_PAGE_LAYOUT.minimal,
    checkoutPrinciples: STYLE_CHECKOUT_PRINCIPLES[safeStyle] ?? STYLE_CHECKOUT_PRINCIPLES.minimal,
    merchandisingStrategy: STYLE_MERCHANDISING[safeStyle] ?? STYLE_MERCHANDISING.minimal,
    trustSignals: STYLE_TRUST_SIGNALS[safeStyle] ?? STYLE_TRUST_SIGNALS.minimal,
    seoGuidelines: buildSeoGuidelines(brand),
    accessibilityGuidelines: buildAccessibilityGuidelines(),
    ecommerceBriefSummary: buildBriefSummary(brand, safeStyle),
  };
}
