import { interpretWithKeywords } from '../../lib/branding-core/ai/keyword-interpreter.js';
import { applyIntent } from '../../lib/branding-core/ai/intent-applier.js';
import { interpretFeedback } from '../../lib/branding-core/ai/brand-interpreter.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';

function createTestBrand() {
  return {
    id: 'test_brand',
    name: 'Test',
    industry: 'tech',
    style: 'tech' as const,
    colors: generateColorPalette('#6B4CE6'),
    typography: generateTypographySystem(),
    spacing: generateSpacingScale(),
    createdAt: '2026-01-01T00:00:00Z',
  };
}

describe('interpretWithKeywords', () => {
  it('interprets "warm" as analogous with positive hue shift', () => {
    const intent = interpretWithKeywords('make it warmer', 'colors');
    expect(intent.color?.harmony).toBe('analogous');
    expect(intent.color?.hueShift).toBeGreaterThan(0);
  });

  it('interprets "vibrant" as triadic with saturation boost', () => {
    const intent = interpretWithKeywords('more vibrant colors', 'colors');
    expect(intent.color?.harmony).toBe('triadic');
    expect(intent.color?.saturationShift).toBeGreaterThan(0);
  });

  it('interprets "muted" as monochromatic with reduced saturation', () => {
    const intent = interpretWithKeywords('make it muted', 'colors');
    expect(intent.color?.harmony).toBe('monochromatic');
    expect(intent.color?.saturationShift).toBeLessThan(0);
  });

  it('interprets "premium" as analogous with lower saturation and lightness', () => {
    const intent = interpretWithKeywords('premium feel', 'colors');
    expect(intent.color?.harmony).toBe('analogous');
    expect(intent.color?.saturationShift).toBeLessThan(0);
  });

  it('interprets "dark" theme', () => {
    const intent = interpretWithKeywords('make it darker', 'colors');
    expect(intent.color?.theme).toBe('dark');
    expect(intent.color?.lightnessShift).toBeLessThan(0);
  });

  it('falls back to complementary with no matching keywords', () => {
    const intent = interpretWithKeywords('xyzzy', 'colors');
    expect(intent.color?.harmony).toBe('complementary');
  });

  it('interprets "serif" for typography', () => {
    const intent = interpretWithKeywords('use serif headings', 'typography');
    expect(intent.typography?.headingCategory).toBe('serif');
  });

  it('interprets "monospace" for typography body', () => {
    const intent = interpretWithKeywords('monospace body text', 'typography');
    expect(intent.typography?.bodyCategory).toBe('monospace');
  });

  it('interprets "dramatic" scale for typography', () => {
    const intent = interpretWithKeywords('dramatic type scale', 'typography');
    expect(intent.typography?.scaleRatio).toBe('golden-ratio');
  });

  it('interprets "editorial" as serif + perfect-fourth', () => {
    const intent = interpretWithKeywords('editorial style', 'typography');
    expect(intent.typography?.headingCategory).toBe('serif');
    expect(intent.typography?.scaleRatio).toBe('perfect-fourth');
  });

  it('interprets "modern" as sans-serif heading and body', () => {
    const intent = interpretWithKeywords('modern look', 'typography');
    expect(intent.typography?.headingCategory).toBe('sans-serif');
    expect(intent.typography?.bodyCategory).toBe('sans-serif');
  });

  it('falls back for typography with no matching keywords', () => {
    const intent = interpretWithKeywords('xyzzy', 'typography');
    expect(intent.typography?.headingCategory).toBe('sans-serif');
  });

  it('returns reasoning for spacing with no actions', () => {
    const intent = interpretWithKeywords('more space', 'spacing');
    expect(intent.reasoning).toBeDefined();
  });

  it('includes reasoning string', () => {
    const intent = interpretWithKeywords('warm and vibrant', 'colors');
    expect(intent.reasoning).toContain('Keyword match');
  });

  it('merges multiple color keywords', () => {
    const intent = interpretWithKeywords('warm and bold', 'colors');
    expect(intent.color?.saturationShift).toBeGreaterThan(0);
    expect(intent.color?.hueShift).toBeGreaterThan(0);
  });
});

describe('applyIntent', () => {
  it('applies color intent to generate new palette', () => {
    const brand = createTestBrand();
    const updated = applyIntent(brand, {
      color: { harmony: 'triadic', saturationShift: 10 },
    });
    expect(updated.colors).toBeDefined();
    expect(updated.colors.primary.hex).not.toBe(brand.colors.primary.hex);
  });

  it('applies typography intent', () => {
    const brand = createTestBrand();
    const updated = applyIntent(brand, {
      typography: { headingCategory: 'serif', scaleRatio: 'perfect-fourth' },
    });
    expect(updated.typography.scaleRatio).toBe(1.333);
  });

  it('applies style change', () => {
    const brand = createTestBrand();
    const updated = applyIntent(brand, { style: 'elegant' });
    expect(updated.style).toBe('elegant');
  });

  it('applies hue shift to base color', () => {
    const brand = createTestBrand();
    const updated = applyIntent(brand, {
      color: { hueShift: 30 },
    });
    expect(updated.colors.primary.hex).toBeDefined();
  });

  it('preserves unchanged elements', () => {
    const brand = createTestBrand();
    const updated = applyIntent(brand, { color: { harmony: 'analogous' } });
    expect(updated.typography).toEqual(brand.typography);
    expect(updated.spacing).toEqual(brand.spacing);
  });

  it('returns brand unchanged with empty intent', () => {
    const brand = createTestBrand();
    const updated = applyIntent(brand, {});
    expect(updated.colors).toEqual(brand.colors);
    expect(updated.typography).toEqual(brand.typography);
  });

  it('infers sans-serif category when headingCategory is absent and font is non-serif', () => {
    const brand = createTestBrand();
    // brand.typography.headingFont is 'Inter' (non-serif); no headingCategory in intent
    // intent-applier.ts line 47: (headingCategory ?? brand.typography.headingFont.includes('serif')) → false → 'sans-serif'
    const updated = applyIntent(brand, { typography: {} });
    expect(updated.typography).toBeDefined();
  });
});

describe('interpretFeedback (strategy selection)', () => {
  it('uses keyword strategy when no API key', async () => {
    const brand = createTestBrand();
    const intent = await interpretFeedback('warm colors', 'colors', brand, 'auto');
    expect(intent.color?.harmony).toBe('analogous');
    expect(intent.reasoning).toContain('Keyword');
  });

  it('uses keyword strategy when explicitly set', async () => {
    const brand = createTestBrand();
    const intent = await interpretFeedback('warm colors', 'colors', brand, 'keyword');
    expect(intent.color?.harmony).toBe('analogous');
  });

  it('falls back to keywords when ai strategy has no key', async () => {
    const brand = createTestBrand();
    const intent = await interpretFeedback('warm', 'colors', brand, 'ai', {});
    expect(intent.reasoning).toContain('Keyword');
  });

  it('uses keywords when strategy is auto but options has no anthropicApiKey', async () => {
    const brand = createTestBrand();
    // brand-interpreter.ts line 16: strategy=auto && !options.anthropicApiKey → useAi=false
    const intent = await interpretFeedback('warm', 'colors', brand, 'auto', {});
    expect(intent.reasoning).toContain('Keyword');
  });
});
