import type { BrandIdentity, BrandStyle, BrandCommunityOutput } from '../../types.js';

const STYLE_COMMUNITY_APPROACH: Record<BrandStyle, string> = {
  minimal: 'Quiet, curated community focused on quality over quantity',
  bold: 'High-energy, loud community that champions brand advocates',
  elegant: 'Exclusive membership community for discerning enthusiasts',
  playful: 'Fun, participatory community driven by creativity and games',
  corporate: 'Professional community centred on thought leadership and networking',
  tech: 'Developer-first community built on open collaboration and code',
  organic: 'Purpose-driven community united by shared values and impact',
  retro: 'Nostalgic fan community celebrating heritage and craftsmanship',
};

const STYLE_PLATFORMS: Record<BrandStyle, string[]> = {
  minimal: ['Email newsletter', 'Private Slack workspace', 'Curated blog'],
  bold: ['Instagram', 'TikTok', 'Discord server', 'YouTube'],
  elegant: ['Private members portal', 'LinkedIn group', 'Exclusive newsletter'],
  playful: ['Discord server', 'Reddit community', 'TikTok', 'Twitch'],
  corporate: ['LinkedIn group', 'Private Slack workspace', 'Webinar series'],
  tech: ['GitHub Discussions', 'Discord server', 'Dev.to', 'Stack Overflow'],
  organic: ['Facebook group', 'WhatsApp community', 'Local meetups', 'Newsletter'],
  retro: ['Forum (phpBB/Discourse)', 'Facebook group', 'Email list', 'Zine'],
};

const STYLE_ENGAGEMENT_TACTICS: Record<BrandStyle, string[]> = {
  minimal: ['Monthly curated digest', 'Invite-only AMA sessions', 'Member spotlight features'],
  bold: [
    'Weekly challenges with prizes',
    'UGC reposts and shoutouts',
    'Live Q&A with founders',
    'Brand ambassador programme',
  ],
  elegant: [
    'Private previews and early access',
    'Exclusive editorial content',
    'Invitation-only events',
    'Personalised thank-you notes',
  ],
  playful: [
    'Gamified leaderboards',
    'Meme and remix contests',
    'Weekly trivia nights',
    'Co-creation jams',
  ],
  corporate: [
    'Thought leadership webinars',
    'Peer roundtables',
    'Case study submissions',
    'Annual industry survey',
  ],
  tech: [
    'Hackathons and build challenges',
    'Open-source contribution recognition',
    'RFC and roadmap discussions',
    'Office hours with engineers',
  ],
  organic: [
    'Local chapter meetups',
    'Volunteer and impact days',
    'Stories from the field',
    'Member-led workshops',
  ],
  retro: [
    'Throwback Thursday posts',
    'Collector show-and-tell',
    'Vintage deep-dives',
    'Fan art showcases',
  ],
};

const STYLE_MODERATION: Record<BrandStyle, string> = {
  minimal: 'Light-touch moderation; trust members to self-regulate with clear community norms',
  bold: 'Active moderation to maintain energy while preventing toxicity',
  elegant: 'White-glove moderation ensuring every interaction reflects brand refinement',
  playful: 'Fun-first moderation that allows banter but removes harmful content quickly',
  corporate: 'Professional moderation aligned with brand compliance and legal standards',
  tech: 'Community-led moderation with elected moderators and transparent guidelines',
  organic: 'Values-based moderation; anyone violating sustainability or inclusion norms is removed',
  retro: 'Respectful moderation preserving the nostalgic, welcoming atmosphere',
};

const STYLE_RECOGNITION: Record<BrandStyle, string[]> = {
  minimal: ['Member of the month', 'Curator badge', 'Newsletter feature'],
  bold: ['Ambassador title', 'Free product drops', 'Co-created content credits'],
  elegant: ['Founding member status', 'Early access privileges', 'Personalised gifts'],
  playful: ['Custom emojis and roles', 'Points and level-up system', 'Swag packs'],
  corporate: ['Thought leader badge', 'Speaker invitations', 'Awards programme'],
  tech: ['Contributor tiers', 'GitHub star recognition', 'Conference tickets'],
  organic: ['Impact champion badge', 'Tree planted in your name', 'Community newsletter spotlight'],
  retro: ['Veteran badge', 'Hall of fame listing', 'Signed collector prints'],
};

const STYLE_GROWTH_LEVERS: Record<BrandStyle, string[]> = {
  minimal: ['Referral from existing members', 'SEO content hub', 'Email invite campaigns'],
  bold: ['Viral challenges', 'Influencer partnerships', 'Paid social acquisition'],
  elegant: ['Word-of-mouth only', 'Partner brand cross-promotion', 'Press coverage'],
  playful: ['Viral content', 'Platform algorithm optimisation', 'Creator collaborations'],
  corporate: ['LinkedIn organic content', 'Conference networking', 'Webinar lead generation'],
  tech: ['Open-source SEO', 'Developer evangelism', 'Product-led community growth'],
  organic: ['Grassroots word-of-mouth', 'NGO and charity partnerships', 'Local media'],
  retro: ['Vintage fair presence', 'Collector forum cross-posts', 'Nostalgia content SEO'],
};

function buildCommunityGuidelines(brand: BrandIdentity): string[] {
  const base = [
    'Be respectful and inclusive to all members',
    'Constructive feedback is welcome; personal attacks are not',
    'No spam, self-promotion, or unsolicited commercial messages',
    'Keep conversations relevant to the community theme',
    'Protect the privacy and confidentiality of other members',
    `Use the brand name ${brand.name} correctly — avoid misrepresentation`,
  ];
  const style = brand.style ?? 'minimal';
  if (style === 'tech') {
    base.push('Share code with appropriate licences and attribution');
    base.push('Disclose AI-generated content when contributing');
  }
  if (style === 'corporate') {
    base.push('Do not share confidential business or client information');
    base.push("Adhere to your organisation's social media policy when posting");
  }
  if (style === 'organic') {
    base.push('All claims about sustainability must be evidence-based');
    base.push('Respect local communities and indigenous knowledge');
  }
  return base;
}

function buildOnboardingFlow(brand: BrandIdentity): string[] {
  return [
    `Welcome email with brand story and community purpose`,
    'Self-introduction post template shared with new members',
    'Pinned "Start Here" resource with platform navigation guide',
    `Assigned community buddy for first 30 days`,
    'Milestone check-in at day 7, 30, and 90',
    `Invitation to first ${brand.style === 'tech' ? 'office hours' : brand.style === 'corporate' ? 'webinar' : 'community event'}`,
    'Feedback survey at 30 days to improve onboarding',
  ];
}

function buildSuccessMetrics(): Record<string, string> {
  return {
    monthly_active_members: 'Number of members posting or reacting at least once per month',
    net_promoter_score: 'Community NPS survey run quarterly',
    content_contribution_rate: 'Percentage of members who create original posts monthly',
    churn_rate: 'Members who leave or go silent over a 90-day period',
    event_attendance_rate: 'Percentage of members attending live events or webinars',
    time_to_first_post: 'Average days from joining to first contribution',
  };
}

function buildBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const approach = STYLE_COMMUNITY_APPROACH[style] ?? STYLE_COMMUNITY_APPROACH.minimal;
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return (
    `${brand.name}${taglinePart} community strategy: ${approach}. ` +
    `Primary platforms: ${(STYLE_PLATFORMS[style] ?? STYLE_PLATFORMS.minimal).slice(0, 2).join(' and ')}. ` +
    `Focus on authentic engagement, member recognition, and sustainable growth through community-led advocacy.`
  );
}

export function generateBrandCommunity(brand: BrandIdentity): BrandCommunityOutput {
  const style = (brand.style ?? 'minimal') as BrandStyle;

  return {
    communityApproach: STYLE_COMMUNITY_APPROACH[style] ?? STYLE_COMMUNITY_APPROACH.minimal,
    platforms: STYLE_PLATFORMS[style] ?? STYLE_PLATFORMS.minimal,
    engagementTactics: STYLE_ENGAGEMENT_TACTICS[style] ?? STYLE_ENGAGEMENT_TACTICS.minimal,
    moderationApproach: STYLE_MODERATION[style] ?? STYLE_MODERATION.minimal,
    memberRecognition: STYLE_RECOGNITION[style] ?? STYLE_RECOGNITION.minimal,
    growthLevers: STYLE_GROWTH_LEVERS[style] ?? STYLE_GROWTH_LEVERS.minimal,
    communityGuidelines: buildCommunityGuidelines(brand),
    onboardingFlow: buildOnboardingFlow(brand),
    successMetrics: buildSuccessMetrics(),
    communityBriefSummary: buildBriefSummary(brand),
  };
}
