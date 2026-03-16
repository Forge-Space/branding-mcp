import { generateBrandVoice } from '../../lib/branding-core/generators/brand-voice.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import type { BrandIdentity, BrandVoiceTone, BrandVoiceAudience } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test_brand',
    name: 'TestCo',
    industry: 'tech software',
    style: 'tech',
    colors: generateColorPalette('#6B4CE6'),
    typography: generateTypographySystem(),
    spacing: generateSpacingScale(),
    createdAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('generateBrandVoice', () => {
  it('returns a complete BrandVoiceGuidelines object', () => {
    const guidelines = generateBrandVoice(createTestBrand());
    expect(guidelines).toHaveProperty('tone');
    expect(guidelines).toHaveProperty('audience');
    expect(guidelines).toHaveProperty('vocabulary');
    expect(guidelines).toHaveProperty('sentenceStyle');
    expect(guidelines).toHaveProperty('personality');
    expect(guidelines).toHaveProperty('taglineSuggestions');
    expect(guidelines).toHaveProperty('sampleCopy');
    expect(guidelines).toHaveProperty('doAndDont');
  });

  it('infers tone from brand style', () => {
    const techBrand = createTestBrand({ style: 'tech' });
    const guidelines = generateBrandVoice(techBrand);
    expect(guidelines.tone).toBe('professional');

    const playfulBrand = createTestBrand({ style: 'playful' });
    const playfulGuidelines = generateBrandVoice(playfulBrand);
    expect(playfulGuidelines.tone).toBe('playful');

    const boldBrand = createTestBrand({ style: 'bold' });
    const boldGuidelines = generateBrandVoice(boldBrand);
    expect(boldGuidelines.tone).toBe('bold');
  });

  it('uses override tone when provided', () => {
    const guidelines = generateBrandVoice(createTestBrand(), 'friendly');
    expect(guidelines.tone).toBe('friendly');
  });

  it('uses override audience when provided', () => {
    const guidelines = generateBrandVoice(createTestBrand(), undefined, 'enterprise');
    expect(guidelines.audience).toBe('enterprise');
  });

  it('infers technical audience from tech industry', () => {
    const guidelines = generateBrandVoice(createTestBrand({ industry: 'tech software' }));
    expect(guidelines.audience).toBe('technical');
  });

  it('infers enterprise audience from enterprise industry', () => {
    const guidelines = generateBrandVoice(createTestBrand({ industry: 'enterprise consulting' }));
    expect(guidelines.audience).toBe('enterprise');
  });

  it('infers startup audience from startup industry', () => {
    const guidelines = generateBrandVoice(createTestBrand({ industry: 'startup fintech' }));
    expect(guidelines.audience).toBe('startup');
  });

  it('returns preferred and avoided vocabulary lists', () => {
    const guidelines = generateBrandVoice(createTestBrand());
    expect(Array.isArray(guidelines.vocabulary.preferred)).toBe(true);
    expect(Array.isArray(guidelines.vocabulary.avoided)).toBe(true);
    expect(guidelines.vocabulary.preferred.length).toBeGreaterThan(0);
    expect(guidelines.vocabulary.avoided.length).toBeGreaterThan(0);
  });

  it('returns tagline suggestions that include brand name or industry', () => {
    const brand = createTestBrand({ name: 'Acme', industry: 'software' });
    const guidelines = generateBrandVoice(brand);
    expect(guidelines.taglineSuggestions.length).toBeGreaterThanOrEqual(3);
    const allText = guidelines.taglineSuggestions.join(' ');
    expect(allText.toLowerCase()).toMatch(/acme|software/i);
  });

  it('returns sample copy with all required fields', () => {
    const guidelines = generateBrandVoice(createTestBrand());
    expect(guidelines.sampleCopy).toHaveProperty('headline');
    expect(guidelines.sampleCopy).toHaveProperty('subheadline');
    expect(guidelines.sampleCopy).toHaveProperty('cta');
    expect(guidelines.sampleCopy).toHaveProperty('aboutUs');
    expect(guidelines.sampleCopy.headline.length).toBeGreaterThan(0);
    expect(guidelines.sampleCopy.cta.length).toBeGreaterThan(0);
  });

  it('returns do and dont arrays', () => {
    const guidelines = generateBrandVoice(createTestBrand());
    expect(Array.isArray(guidelines.doAndDont.do)).toBe(true);
    expect(Array.isArray(guidelines.doAndDont.dont)).toBe(true);
    expect(guidelines.doAndDont.do.length).toBeGreaterThan(0);
    expect(guidelines.doAndDont.dont.length).toBeGreaterThan(0);
  });

  it('returns personality traits array', () => {
    const guidelines = generateBrandVoice(createTestBrand());
    expect(Array.isArray(guidelines.personality)).toBe(true);
    expect(guidelines.personality.length).toBeGreaterThan(0);
  });

  it('returns valid sentenceStyle', () => {
    const guidelines = generateBrandVoice(createTestBrand());
    expect(['short', 'medium', 'long']).toContain(guidelines.sentenceStyle.averageLength);
    expect(['simple', 'varied', 'complex']).toContain(guidelines.sentenceStyle.structure);
  });

  it('handles all brand styles without throwing', () => {
    const styles: BrandIdentity['style'][] = [
      'minimal',
      'bold',
      'elegant',
      'playful',
      'corporate',
      'tech',
      'organic',
      'retro',
    ];
    for (const style of styles) {
      expect(() => generateBrandVoice(createTestBrand({ style }))).not.toThrow();
    }
  });

  it('handles all explicit tones without throwing', () => {
    const tones: BrandVoiceTone[] = [
      'professional',
      'friendly',
      'playful',
      'authoritative',
      'empathetic',
      'inspirational',
      'minimalist',
      'bold',
    ];
    for (const tone of tones) {
      expect(() => generateBrandVoice(createTestBrand(), tone)).not.toThrow();
    }
  });

  it('handles all explicit audiences without throwing', () => {
    const audiences: BrandVoiceAudience[] = [
      'b2b',
      'b2c',
      'enterprise',
      'startup',
      'consumer',
      'technical',
      'creative',
      'general',
    ];
    for (const audience of audiences) {
      expect(() => generateBrandVoice(createTestBrand(), undefined, audience)).not.toThrow();
    }
  });

  it('infers creative audience from creative/design industry', () => {
    const guidelines = generateBrandVoice(createTestBrand({ industry: 'creative design studio' }));
    expect(guidelines.audience).toBe('creative');
  });

  it('infers consumer audience from retail/ecommerce industry', () => {
    const guidelines = generateBrandVoice(createTestBrand({ industry: 'retail ecommerce' }));
    expect(guidelines.audience).toBe('consumer');
  });

  it('infers general audience from unknown industry', () => {
    const guidelines = generateBrandVoice(createTestBrand({ industry: 'bakery' }));
    expect(guidelines.audience).toBe('general');
  });

  it('falls back to professional tone for unknown style', () => {
    const guidelines = generateBrandVoice(createTestBrand({ style: 'unknown' as never }));
    expect(guidelines.tone).toBe('professional');
  });
});
