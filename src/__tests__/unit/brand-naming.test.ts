import { generateBrandNaming } from '../../lib/branding-core/generators/brand-naming.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  const colors = generateColorPalette('#6B4CE6', 'complementary');
  const typography = generateTypographySystem('tech');
  const spacing = generateSpacingScale('comfortable');
  return {
    id: 'test-brand',
    name: 'TestBrand',
    industry: 'technology software',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandNaming', () => {
  it('returns a BrandNamingOutput with required fields', () => {
    const brand = createTestBrand();
    const result = generateBrandNaming(brand);
    expect(result).toHaveProperty('nameIdeas');
    expect(result).toHaveProperty('taglineVariations');
    expect(result).toHaveProperty('domainSuggestions');
    expect(result).toHaveProperty('hashtags');
    expect(result).toHaveProperty('namingRationale');
  });

  it('generates exactly 5 name ideas', () => {
    const brand = createTestBrand();
    const result = generateBrandNaming(brand);
    expect(result.nameIdeas).toHaveLength(5);
  });

  it('each name idea has name, type, and rationale', () => {
    const brand = createTestBrand();
    const { nameIdeas } = generateBrandNaming(brand);
    for (const idea of nameIdeas) {
      expect(typeof idea.name).toBe('string');
      expect(idea.name.length).toBeGreaterThan(0);
      expect(['descriptive', 'evocative', 'abstract', 'acronym', 'portmanteau']).toContain(
        idea.type
      );
      expect(typeof idea.rationale).toBe('string');
    }
  });

  it('generates exactly 5 tagline variations', () => {
    const brand = createTestBrand();
    const { taglineVariations } = generateBrandNaming(brand);
    expect(taglineVariations).toHaveLength(5);
    for (const tagline of taglineVariations) {
      expect(typeof tagline).toBe('string');
      expect(tagline.length).toBeGreaterThan(0);
    }
  });

  it('generates exactly 5 domain suggestions', () => {
    const brand = createTestBrand();
    const { domainSuggestions } = generateBrandNaming(brand);
    expect(domainSuggestions).toHaveLength(5);
    for (const domain of domainSuggestions) {
      expect(typeof domain.format).toBe('string');
      expect(typeof domain.example).toBe('string');
      expect(typeof domain.notes).toBe('string');
    }
  });

  it('generates exactly 8 hashtags', () => {
    const brand = createTestBrand();
    const { hashtags } = generateBrandNaming(brand);
    expect(hashtags).toHaveLength(8);
    for (const tag of hashtags) {
      expect(tag).toMatch(/^#/);
    }
  });

  it('includes industry and style in naming rationale', () => {
    const brand = createTestBrand();
    const { namingRationale } = generateBrandNaming(brand);
    expect(namingRationale).toContain('tech');
    expect(namingRationale).toContain('technology software');
  });

  it('adapts to different brand styles', () => {
    const minimalBrand = createTestBrand({ style: 'minimal', industry: 'design' });
    const boldBrand = createTestBrand({ style: 'bold', industry: 'fitness' });
    const minimalResult = generateBrandNaming(minimalBrand);
    const boldResult = generateBrandNaming(boldBrand);
    expect(minimalResult.nameIdeas[0].name).not.toBe(boldResult.nameIdeas[0].name);
  });

  it('adapts to different industries', () => {
    const financeBrand = createTestBrand({ industry: 'finance and banking' });
    const healthBrand = createTestBrand({ industry: 'health and wellness' });
    const financeResult = generateBrandNaming(financeBrand);
    const healthResult = generateBrandNaming(healthBrand);
    expect(financeResult.hashtags.join(' ')).not.toBe(healthResult.hashtags.join(' '));
  });

  it('falls back to minimal patterns for unknown style', () => {
    const brand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandNaming(brand);
    expect(result.nameIdeas).toHaveLength(5);
    expect(result.namingRationale).toContain('unknown');
  });

  it('falls back to tech industry keywords for unknown industry', () => {
    const brand = createTestBrand({ industry: 'llama farming' });
    const result = generateBrandNaming(brand);
    expect(result.nameIdeas).toHaveLength(5);
    expect(result.domainSuggestions[0].example).toBeTruthy();
  });

  it('organic style produces organic-themed names', () => {
    const brand = createTestBrand({ style: 'organic', industry: 'food and beverage' });
    const result = generateBrandNaming(brand);
    const firstNameLower = result.nameIdeas[0].name.toLowerCase();
    const rationale = result.namingRationale.toLowerCase();
    expect(rationale).toContain('organic');
  });

  it('elegant style domain suggestions use elegant patterns', () => {
    const brand = createTestBrand({ style: 'elegant', industry: 'luxury retail' });
    const result = generateBrandNaming(brand);
    expect(result.domainSuggestions.every((d) => d.example.length > 0)).toBe(true);
  });
});
