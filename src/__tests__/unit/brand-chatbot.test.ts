import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandChatbot } from '../../lib/branding-core/generators/brand-chatbot.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#4F46E5', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'Acme Corp',
    tagline: 'Built for scale',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandChatbot', () => {
  it('returns all required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandChatbot(brand);
    expect(result.chatbotPersona).toBeTruthy();
    expect(Array.isArray(result.toneAttributes)).toBe(true);
    expect(result.greetingMessage).toBeTruthy();
    expect(result.fallbackMessage).toBeTruthy();
    expect(result.escalationMessage).toBeTruthy();
    expect(Array.isArray(result.conversationBoundaries)).toBe(true);
    expect(result.humanHandoffTrigger).toBeTruthy();
    expect(Array.isArray(result.intentCategories)).toBe(true);
    expect(Array.isArray(result.accessibilityGuidelines)).toBe(true);
    expect(result.chatbotBriefSummary).toBeTruthy();
  });

  it('toneAttributes has at least 4 items', () => {
    const brand = createTestBrand();
    const result = generateBrandChatbot(brand);
    expect(result.toneAttributes.length).toBeGreaterThanOrEqual(4);
  });

  it('intentCategories has at least 7 items', () => {
    const brand = createTestBrand();
    const result = generateBrandChatbot(brand);
    expect(result.intentCategories.length).toBeGreaterThanOrEqual(7);
  });

  it('accessibilityGuidelines has at least 7 items', () => {
    const brand = createTestBrand();
    const result = generateBrandChatbot(brand);
    expect(result.accessibilityGuidelines.length).toBeGreaterThanOrEqual(7);
  });

  it('conversationBoundaries has at least 4 items', () => {
    const brand = createTestBrand();
    const result = generateBrandChatbot(brand);
    expect(result.conversationBoundaries.length).toBeGreaterThanOrEqual(4);
  });

  it('chatbotBriefSummary contains brand name', () => {
    const brand = createTestBrand();
    const result = generateBrandChatbot(brand);
    expect(result.chatbotBriefSummary).toContain('Acme Corp');
  });

  it('chatbotBriefSummary contains tagline when present', () => {
    const brand = createTestBrand({ tagline: 'Built for scale' });
    const result = generateBrandChatbot(brand);
    expect(result.chatbotBriefSummary).toContain('Built for scale');
  });

  it('chatbotBriefSummary works without tagline', () => {
    const brand = createTestBrand({ tagline: undefined });
    const result = generateBrandChatbot(brand);
    expect(result.chatbotBriefSummary).toContain('Acme Corp');
    expect(result.chatbotBriefSummary).not.toMatch(/undefined/);
  });

  it('tech style gets developer-friendly persona', () => {
    const brand = createTestBrand({ style: 'tech' });
    const result = generateBrandChatbot(brand);
    expect(result.chatbotPersona.toLowerCase()).toContain('developer');
  });

  it('tech industry adds API and bug report intent categories', () => {
    const brand = createTestBrand({ industry: 'technology saas' });
    const result = generateBrandChatbot(brand);
    const joined = result.intentCategories.join(' ');
    expect(joined.toLowerCase()).toContain('api');
  });

  it('playful style gets playful greeting', () => {
    const brand = createTestBrand({ style: 'playful' });
    const result = generateBrandChatbot(brand);
    expect(result.greetingMessage).toContain('Hi there!');
  });

  it('elegant style gets refined greeting', () => {
    const brand = createTestBrand({ style: 'elegant' });
    const result = generateBrandChatbot(brand);
    expect(result.greetingMessage).toContain('Good day');
  });

  it('corporate style gets professional tone', () => {
    const brand = createTestBrand({ style: 'corporate' });
    const result = generateBrandChatbot(brand);
    expect(result.toneAttributes).toContain('Professional');
  });

  it('bold style has energetic escalation', () => {
    const brand = createTestBrand({ style: 'bold' });
    const result = generateBrandChatbot(brand);
    expect(result.escalationMessage.length).toBeGreaterThan(10);
  });

  it('organic style gets authentic persona', () => {
    const brand = createTestBrand({ style: 'organic' });
    const result = generateBrandChatbot(brand);
    expect(result.chatbotPersona.toLowerCase()).toContain('authentic');
  });

  it('falls back to minimal for unknown style', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandChatbot(brand);
    expect(result.chatbotPersona).toBeTruthy();
    expect(result.toneAttributes.length).toBeGreaterThanOrEqual(4);
  });

  it('health industry adds usage guidance intent category', () => {
    const brand = createTestBrand({ industry: 'health wellness' });
    const result = generateBrandChatbot(brand);
    const joined = result.intentCategories.join(' ').toLowerCase();
    expect(joined).toContain('usage');
  });
});
