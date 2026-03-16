import type { BrandIdentity, BrandStyle } from '../../types.js';
import type { BrandSocialOutput, SocialPlatformConfig, ContentPillar } from '../../types.js';
import { generateBrandVoice } from './brand-voice.js';

const STYLE_TO_PLATFORMS: Record<BrandStyle, SocialPlatformConfig[]> = {
  minimal: [
    {
      platform: 'LinkedIn',
      handle: '@brand',
      bioTemplate: 'We {verb} {value}. {tagline}',
      postFrequency: '3x per week',
      contentFocus: 'Thought leadership and case studies',
      hashtagStrategy: '3-5 niche hashtags per post',
      profileImageStyle: 'Clean wordmark or monogram on white',
      coverImageStyle: 'Solid brand color with minimal typography',
      optimalPostLength: '150-300 characters',
    },
    {
      platform: 'Twitter/X',
      handle: '@brand',
      bioTemplate: '{value} | {tagline}',
      postFrequency: 'Daily',
      contentFocus: 'Concise insights and quick tips',
      hashtagStrategy: '1-2 broad hashtags',
      profileImageStyle: 'Monogram or icon on brand color',
      coverImageStyle: 'Brand color gradient with minimal text',
      optimalPostLength: '100-140 characters',
    },
  ],
  bold: [
    {
      platform: 'Instagram',
      handle: '@brand',
      bioTemplate: '{tagline} ✦ {value} ✦ {cta}',
      postFrequency: 'Daily',
      contentFocus: 'High-impact visuals and bold statements',
      hashtagStrategy: '10-15 mixed popular and niche hashtags',
      profileImageStyle: 'Bold icon on vibrant brand color',
      coverImageStyle: 'High-contrast imagery with brand overlay',
      optimalPostLength: '125-150 characters + hashtags',
    },
    {
      platform: 'TikTok',
      handle: '@brand',
      bioTemplate: '{tagline} 🔥 {value}',
      postFrequency: '5x per week',
      contentFocus: 'Trending audio, fast cuts, bold visuals',
      hashtagStrategy: 'Mix trending + branded hashtags',
      profileImageStyle: 'Energetic brand icon or mascot',
      coverImageStyle: 'Dynamic video thumbnail style',
      optimalPostLength: '50-100 characters',
    },
    {
      platform: 'LinkedIn',
      handle: '@brand',
      bioTemplate: 'We are {value}. {tagline}',
      postFrequency: '5x per week',
      contentFocus: 'Industry disruption stories and bold opinions',
      hashtagStrategy: '5-8 industry hashtags',
      profileImageStyle: 'Bold wordmark on dark background',
      coverImageStyle: 'High-contrast brand imagery',
      optimalPostLength: '300-600 characters',
    },
  ],
  elegant: [
    {
      platform: 'Instagram',
      handle: '@brand',
      bioTemplate: '{tagline} · {value}',
      postFrequency: '4x per week',
      contentFocus: 'Curated aesthetics, behind-the-scenes craft',
      hashtagStrategy: '5-8 curated niche hashtags',
      profileImageStyle: 'Refined monogram or logo on neutral',
      coverImageStyle: 'Editorial-style photography with muted overlay',
      optimalPostLength: '200-300 characters',
    },
    {
      platform: 'Pinterest',
      handle: '@brand',
      bioTemplate: 'Curating {value} | {tagline}',
      postFrequency: '10-15 pins per week',
      contentFocus: 'Inspirational imagery and how-to content',
      hashtagStrategy: '15-20 descriptive hashtags',
      profileImageStyle: 'Clean, elegant logo on white',
      coverImageStyle: 'Styled flat-lay or lifestyle imagery',
      optimalPostLength: '200-500 characters for pin descriptions',
    },
  ],
  playful: [
    {
      platform: 'Instagram',
      handle: '@brand',
      bioTemplate: '{tagline} 🎉 {value} | {cta}',
      postFrequency: 'Daily + stories',
      contentFocus: 'Fun, user-generated content, games and polls',
      hashtagStrategy: 'Branded hashtag + 8-12 trending ones',
      profileImageStyle: 'Playful mascot or colorful icon',
      coverImageStyle: 'Bright, colorful imagery with stickers/overlays',
      optimalPostLength: '100-200 characters + emoji',
    },
    {
      platform: 'TikTok',
      handle: '@brand',
      bioTemplate: '{tagline} 🎪 {value}',
      postFrequency: 'Daily',
      contentFocus: 'Challenges, duets, funny takes',
      hashtagStrategy: 'Branded challenge + trending hashtags',
      profileImageStyle: 'Colorful animated-style icon or mascot',
      coverImageStyle: 'Bright, energetic thumbnail',
      optimalPostLength: '50-80 characters',
    },
    {
      platform: 'Twitter/X',
      handle: '@brand',
      bioTemplate: '{tagline} 🎊 | {value}',
      postFrequency: 'Multiple daily',
      contentFocus: 'Witty observations, memes, community banter',
      hashtagStrategy: 'Trending + 1 branded hashtag',
      profileImageStyle: 'Fun icon or mascot expression',
      coverImageStyle: 'Playful brand scene or collage',
      optimalPostLength: '80-140 characters',
    },
  ],
  corporate: [
    {
      platform: 'LinkedIn',
      handle: '@brand',
      bioTemplate: 'Delivering {value}. {tagline}',
      postFrequency: '3x per week',
      contentFocus: 'Industry insights, company news, executive thought leadership',
      hashtagStrategy: '3-5 professional industry hashtags',
      profileImageStyle: 'Professional logo on white or dark',
      coverImageStyle: 'Corporate imagery with brand bar or gradient',
      optimalPostLength: '200-400 characters',
    },
    {
      platform: 'Twitter/X',
      handle: '@brand',
      bioTemplate: '{tagline} | {value} | {location}',
      postFrequency: '2x per week',
      contentFocus: 'Press releases, milestones, partnerships',
      hashtagStrategy: '2-3 professional hashtags',
      profileImageStyle: 'Clean corporate logo',
      coverImageStyle: 'Brand color with corporate messaging',
      optimalPostLength: '120-180 characters',
    },
  ],
  tech: [
    {
      platform: 'Twitter/X',
      handle: '@brand',
      bioTemplate: '{tagline} | Built by {value} engineers',
      postFrequency: '2-3x daily',
      contentFocus: 'Product updates, developer tips, tech threads',
      hashtagStrategy: '2-4 tech-specific hashtags',
      profileImageStyle: 'Clean icon or monogram on dark background',
      coverImageStyle: 'Code snippet or product UI on dark',
      optimalPostLength: '140-280 characters for threads',
    },
    {
      platform: 'LinkedIn',
      handle: '@brand',
      bioTemplate: '{tagline} | {value} | Open source',
      postFrequency: '3x per week',
      contentFocus: 'Engineering culture, technical deep dives, product launches',
      hashtagStrategy: '4-6 dev/tech hashtags',
      profileImageStyle: 'Tech-forward logo on dark background',
      coverImageStyle: 'Terminal/code aesthetic or clean product shot',
      optimalPostLength: '300-500 characters',
    },
    {
      platform: 'GitHub',
      handle: '@brand',
      bioTemplate: 'Building {value} | {tagline}',
      postFrequency: 'Ongoing commits',
      contentFocus: 'Open source projects, developer tools, documentation',
      hashtagStrategy: 'Repository topics and labels',
      profileImageStyle: 'Developer-friendly monogram or icon',
      coverImageStyle: 'README hero with logo and badges',
      optimalPostLength: 'Repository description: 100-200 characters',
    },
  ],
  organic: [
    {
      platform: 'Instagram',
      handle: '@brand',
      bioTemplate: '{value} 🌿 {tagline}',
      postFrequency: '4-5x per week',
      contentFocus: 'Nature imagery, sustainability stories, community',
      hashtagStrategy: '8-12 eco/sustainability hashtags',
      profileImageStyle: 'Natural-toned logo or leaf/nature motif',
      coverImageStyle: 'Earthy photography with natural overlays',
      optimalPostLength: '150-250 characters + intentional hashtags',
    },
    {
      platform: 'Pinterest',
      handle: '@brand',
      bioTemplate: 'Naturally {value} | {tagline}',
      postFrequency: '10-20 pins per week',
      contentFocus: 'DIY content, recipes, sustainability tips, nature boards',
      hashtagStrategy: '12-20 nature and lifestyle hashtags',
      profileImageStyle: 'Organic logo or botanical illustration',
      coverImageStyle: 'Natural textures, greenery, earthy tones',
      optimalPostLength: '200-400 characters for descriptions',
    },
  ],
  retro: [
    {
      platform: 'Instagram',
      handle: '@brand',
      bioTemplate: '{tagline} ★ {value} ★ Est. {year}',
      postFrequency: '4x per week',
      contentFocus: 'Nostalgia content, vintage aesthetics, throwback posts',
      hashtagStrategy: '8-12 retro/vintage hashtags',
      profileImageStyle: 'Vintage badge or distressed logo',
      coverImageStyle: 'Film-grain or retro-filtered imagery',
      optimalPostLength: '150-250 characters with retro emoji',
    },
    {
      platform: 'Twitter/X',
      handle: '@brand',
      bioTemplate: 'Bringing back {value} | {tagline}',
      postFrequency: '3x per week',
      contentFocus: 'Nostalgia threads, vintage trivia, throwback moments',
      hashtagStrategy: '#ThrowbackThursday + 2-3 niche retro hashtags',
      profileImageStyle: 'Retro-style badge icon',
      coverImageStyle: 'Vintage poster style with brand colors',
      optimalPostLength: '120-200 characters',
    },
  ],
};

const STYLE_CONTENT_PILLARS: Record<BrandStyle, ContentPillar[]> = {
  minimal: [
    {
      name: 'Expertise',
      description: 'Industry insights and professional knowledge',
      contentTypes: ['Articles', 'Infographics', 'Case studies'],
    },
    {
      name: 'Clarity',
      description: 'Simplifying complex topics for your audience',
      contentTypes: ['How-to guides', 'Explainers', 'FAQs'],
    },
    {
      name: 'Community',
      description: 'Engaging with industry peers and customers',
      contentTypes: ['Q&As', 'Testimonials', 'Polls'],
    },
  ],
  bold: [
    {
      name: 'Statement',
      description: 'Bold opinions and industry disruption',
      contentTypes: ['Hot takes', 'Manifestos', 'Controversial threads'],
    },
    {
      name: 'Showcase',
      description: 'High-impact work and results',
      contentTypes: ['Portfolio drops', 'Before/after', 'Results reveals'],
    },
    {
      name: 'Community',
      description: 'Building a tribe around the brand',
      contentTypes: ['Challenges', 'UGC reposts', 'Collabs'],
    },
    {
      name: 'Inspiration',
      description: 'Motivating and energizing the audience',
      contentTypes: ['Quotes', 'Success stories', 'Hype posts'],
    },
  ],
  elegant: [
    {
      name: 'Craft',
      description: 'Behind-the-scenes artistry and quality details',
      contentTypes: ['Process videos', 'Detail shots', 'Making-of stories'],
    },
    {
      name: 'Lifestyle',
      description: 'The elevated world the brand inhabits',
      contentTypes: ['Lifestyle imagery', 'Editorial', 'Mood boards'],
    },
    {
      name: 'Expertise',
      description: 'Refined knowledge and curated recommendations',
      contentTypes: ['Guides', 'Curated roundups', 'Expert tips'],
    },
  ],
  playful: [
    {
      name: 'Entertainment',
      description: 'Fun, humor, and joyful moments',
      contentTypes: ['Memes', 'Challenges', 'Funny takes'],
    },
    {
      name: 'Community',
      description: 'Involving the audience in brand play',
      contentTypes: ['Polls', 'Games', 'UGC', 'Duets'],
    },
    {
      name: 'Product Joy',
      description: 'Showcasing products in fun, relatable ways',
      contentTypes: ['Unboxing', 'Demos', 'Reviews'],
    },
    {
      name: 'Celebrations',
      description: 'Milestones, holidays, and community wins',
      contentTypes: ['Announcements', 'Countdowns', 'Party posts'],
    },
  ],
  corporate: [
    {
      name: 'Thought Leadership',
      description: 'Executive insights and industry expertise',
      contentTypes: ['Executive quotes', 'White papers', 'Keynote clips'],
    },
    {
      name: 'Company News',
      description: 'Milestones, partnerships, and announcements',
      contentTypes: ['Press releases', 'Milestone posts', 'Partnership announcements'],
    },
    {
      name: 'Industry Insights',
      description: 'Data, trends, and market analysis',
      contentTypes: ['Reports', 'Statistics', 'Market commentary'],
    },
  ],
  tech: [
    {
      name: 'Product Updates',
      description: 'Features, releases, and product news',
      contentTypes: ['Release notes', 'Demo videos', 'Changelogs'],
    },
    {
      name: 'Developer Content',
      description: 'Technical tips, tutorials, and open source',
      contentTypes: ['Code snippets', 'Tutorials', 'GitHub links'],
    },
    {
      name: 'Engineering Culture',
      description: 'Team, process, and technical craft',
      contentTypes: ['Team spotlights', 'Engineering blog links', 'Architecture posts'],
    },
    {
      name: 'Community',
      description: 'Engaging with the developer community',
      contentTypes: ['Office hours', 'Discord invites', 'Hackathon announcements'],
    },
  ],
  organic: [
    {
      name: 'Sustainability',
      description: 'Environmental impact and green practices',
      contentTypes: ['Impact reports', 'Behind-the-scenes', 'Eco tips'],
    },
    {
      name: 'Community',
      description: 'Building a community around shared values',
      contentTypes: ['Stories', 'UGC', 'Local spotlights'],
    },
    {
      name: 'Education',
      description: 'Teaching about natural, sustainable living',
      contentTypes: ['DIY guides', 'Ingredient spotlights', 'Educational reels'],
    },
    {
      name: 'Product Stories',
      description: 'Showing the natural origins and process',
      contentTypes: ['Farm-to-shelf', 'Ingredient sourcing', 'Maker stories'],
    },
  ],
  retro: [
    {
      name: 'Nostalgia',
      description: 'Throwbacks and vintage moments',
      contentTypes: ['#TBT posts', 'Vintage trivia', 'Throwback series'],
    },
    {
      name: 'Heritage',
      description: 'Brand history and timeless craft',
      contentTypes: ['Origin stories', 'Archive imagery', 'Founding moments'],
    },
    {
      name: 'Community',
      description: 'Fellow fans of the era and aesthetic',
      contentTypes: ['Fan spotlights', 'Collector posts', 'Vintage finds'],
    },
    {
      name: 'Modern Classics',
      description: 'New products with vintage soul',
      contentTypes: ['Product showcases', 'Retro-inspired drops', 'Limited editions'],
    },
  ],
};

function buildBioVariations(brand: BrandIdentity): string[] {
  const name = brand.name;
  const tagline = brand.tagline ?? `${name} — quality you can trust`;
  const industryWord = brand.industry.split(' ')[0] ?? 'solutions';

  return [
    `${tagline}`,
    `Crafting ${industryWord} that {value} | ${tagline}`,
    `${name}: ${tagline}`,
    `We make ${industryWord} better. ${tagline}`,
    `The ${industryWord} brand built for people who care.`,
  ];
}

function buildHashtagSet(brand: BrandIdentity): string[] {
  const industry = brand.industry.toLowerCase();
  const name = brand.name.toLowerCase().replace(/\s+/g, '');
  const words = brand.industry.split(/\s+/).map((w) => w.toLowerCase());
  const tags = new Set<string>();

  tags.add(`#${name}`);
  tags.add(`#${name}brand`);
  words.forEach((w) => {
    if (w.length > 3) tags.add(`#${w}`);
  });

  if (industry.includes('tech') || industry.includes('software')) {
    tags.add('#tech').add('#innovation').add('#startup');
  } else if (industry.includes('fashion') || industry.includes('style')) {
    tags.add('#fashion').add('#style').add('#ootd');
  } else if (industry.includes('food') || industry.includes('restaurant')) {
    tags.add('#foodie').add('#food').add('#eat');
  } else if (industry.includes('health') || industry.includes('wellness')) {
    tags.add('#wellness').add('#health').add('#mindfulness');
  } else if (industry.includes('finance') || industry.includes('fintech')) {
    tags.add('#finance').add('#fintech').add('#money');
  } else if (industry.includes('education') || industry.includes('learning')) {
    tags.add('#education').add('#learning').add('#edtech');
  } else {
    tags.add('#brand').add('#business').add('#innovation');
  }

  return Array.from(tags).slice(0, 10);
}

function buildContentCalendar(style: BrandStyle): Record<string, string[]> {
  const calendars: Record<BrandStyle, Record<string, string[]>> = {
    minimal: {
      Monday: ['Industry insight or tip', 'Clean product shot'],
      Wednesday: ['Case study or testimonial'],
      Friday: ['Thought leadership article or thread'],
    },
    bold: {
      Monday: ['Bold statement or manifesto post'],
      Tuesday: ['Behind-the-scenes or process content'],
      Wednesday: ['Community engagement or challenge'],
      Thursday: ['Product showcase or reveal'],
      Friday: ['Week recap or inspiration drop'],
    },
    elegant: {
      Monday: ['Curated lifestyle imagery'],
      Wednesday: ['Behind-the-craft story'],
      Friday: ['Expert tip or curated roundup'],
      Sunday: ['Mood board or editorial set'],
    },
    playful: {
      Monday: ['Fun meme or challenge post'],
      Tuesday: ['UGC repost or community spotlight'],
      Wednesday: ['Poll or interactive story'],
      Thursday: ['Product demo in fun format'],
      Friday: ['Weekend vibes or celebration post'],
      Saturday: ['Behind-the-scenes silliness'],
    },
    corporate: {
      Monday: ['Executive thought leadership post'],
      Wednesday: ['Industry data or market insight'],
      Friday: ['Company news or partnership announcement'],
    },
    tech: {
      Monday: ['Product update or release note'],
      Tuesday: ['Developer tip or code snippet'],
      Thursday: ['Community office hours or AMA promo'],
      Friday: ['Engineering culture or team spotlight'],
    },
    organic: {
      Monday: ['Sustainability tip or eco fact'],
      Wednesday: ['Product story or ingredient spotlight'],
      Friday: ['Community member or local partner spotlight'],
      Sunday: ['Nature moment or weekend wellness content'],
    },
    retro: {
      Monday: ['Vintage trivia or history post'],
      Thursday: ['#ThrowbackThursday post'],
      Friday: ['New arrival with retro story'],
      Sunday: ['Archive imagery or heritage moment'],
    },
  };
  return calendars[style] ?? calendars.minimal;
}

export function generateBrandSocial(brand: BrandIdentity): BrandSocialOutput {
  const style = brand.style ?? 'minimal';
  const voice = generateBrandVoice(brand);
  const platforms = STYLE_TO_PLATFORMS[style] ?? STYLE_TO_PLATFORMS.minimal;
  const pillars = STYLE_CONTENT_PILLARS[style] ?? STYLE_CONTENT_PILLARS.minimal;
  const brandedHashtag = `#${brand.name.toLowerCase().replace(/\s+/g, '')}`;
  const hashtags = buildHashtagSet(brand);
  const bioVariations = buildBioVariations(brand);
  const contentCalendar = buildContentCalendar(style);

  const postingStrategy = `Maintain a consistent voice aligned with your ${voice.tone} tone. Use the ${brand.colors.primary.hex} brand color in all visual assets. Post at peak engagement windows for each platform and respond to comments within 2-4 hours.`;

  return {
    platforms,
    contentPillars: pillars,
    brandedHashtag,
    hashtags,
    bioVariations,
    postingStrategy,
    contentCalendar,
    voiceGuidelines: {
      tone: voice.tone,
      doAndDont: voice.doAndDont,
      sampleCopy: voice.sampleCopy,
    },
  };
}
