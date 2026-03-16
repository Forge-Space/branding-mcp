import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
  generateShadowSystem,
  generateBorderSystem,
  generateMotionSystem,
  generateGradientSystem,
  generateSvgLogo,
  defaultLogoConfig,
  generateFavicons,
  generateOgImage,
  exportDesignTokens,
  exportCssVariables,
  exportTailwindPreset,
  exportFigmaTokens,
  exportReactTheme,
  exportSassVariables,
  exportStyleDictionary,
  generateBrandVoice,
  validateBrandConsistency,
  validateContrast,
} from '../../lib/branding-core/index.js';
import type { BrandIdentity } from '../../lib/types.js';

describe('brand generation integration', () => {
  let brand: BrandIdentity;

  beforeAll(() => {
    const colors = generateColorPalette('#6B4CE6', 'complementary');
    const typography = generateTypographySystem('sans-serif', 'serif', 'major-third');
    const spacing = generateSpacingScale();
    const shadows = generateShadowSystem(colors.primary.hex);
    const borders = generateBorderSystem();
    const motion = generateMotionSystem();
    const gradients = generateGradientSystem(colors, 'tech');
    const logoConfig = defaultLogoConfig('TestBrand', colors.primary.hex);
    const logo = generateSvgLogo(logoConfig);

    brand = {
      id: 'brand_test',
      name: 'TestBrand',
      tagline: 'Test tagline',
      industry: 'tech',
      style: 'tech',
      colors,
      typography,
      spacing,
      shadows,
      borders,
      motion,
      gradients,
      logo,
      createdAt: new Date().toISOString(),
    };
  });

  // --- Core generation ---

  it('generates a complete brand identity', () => {
    expect(brand.colors.primary.hex).toMatch(/^#[0-9a-f]{6}$/);
    expect(brand.typography.headingFont).toBeTruthy();
    expect(brand.spacing.unit).toBe(4);
    expect(brand.logo?.svg).toContain('<svg');
  });

  it('logo SVG contains brand initial', () => {
    expect(brand.logo?.svg).toContain('>T</text>');
  });

  it('logo SVG contains brand name', () => {
    expect(brand.logo?.svg).toContain('>TestBrand</text>');
  });

  it('generates logo with background color', () => {
    const config = { ...defaultLogoConfig('BG', '#000'), backgroundColor: '#ffffff' };
    const logo = generateSvgLogo(config);
    expect(logo.svg).toContain('rect');
    expect(logo.svg).toContain('#ffffff');
  });

  it('generates shadow system with all levels', () => {
    expect(brand.shadows?.levels).toBeDefined();
    expect(brand.shadows?.levels.sm).toBeDefined();
    expect(brand.shadows?.levels.lg).toBeDefined();
  });

  it('generates border system with radii and widths', () => {
    expect(brand.borders?.radii).toBeDefined();
    expect(brand.borders?.widths).toBeDefined();
    expect(brand.borders?.radii['none']).toBeDefined();
  });

  it('generates motion system with durations and easings', () => {
    expect(brand.motion?.durations).toBeDefined();
    expect(brand.motion?.easings).toBeDefined();
    expect(brand.motion?.durations['fast']).toBeDefined();
  });

  it('generates gradient system with presets', () => {
    expect(brand.gradients?.presets).toBeDefined();
    expect(brand.gradients?.presets.hero).toBeDefined();
    expect(brand.gradients?.presets.card).toBeDefined();
  });

  // --- Exporters ---

  it('exports valid design tokens JSON', () => {
    const tokens = exportDesignTokens(brand);
    expect(tokens.color.primary).toBeDefined();
    expect(tokens.typography['font-heading']).toBeDefined();
    expect(Object.keys(tokens.spacing).length).toBeGreaterThan(0);
  });

  it('exports valid CSS variables', () => {
    const css = exportCssVariables(brand);
    expect(css).toContain(':root');
    expect(css).toContain('--color-primary');
  });

  it('exports valid Tailwind preset', () => {
    const preset = exportTailwindPreset(brand);
    expect(preset).toContain('export default');
    expect(preset).toContain('primary');
  });

  it('exports valid Figma tokens', () => {
    const figma = exportFigmaTokens(brand);
    expect(typeof figma).toBe('object');
    expect(figma.color?.primary).toBeDefined();
  });

  it('exports valid React theme', () => {
    const react = exportReactTheme(brand);
    expect(react).toContain('export const theme');
    expect(react).toContain('colors');
  });

  it('exports valid SASS variables', () => {
    const sass = exportSassVariables(brand);
    expect(sass).toContain('$color-primary');
    expect(sass).toContain('$font-heading');
  });

  it('exports valid Style Dictionary tokens', () => {
    const sd = exportStyleDictionary(brand);
    expect(sd.color).toBeDefined();
    expect(sd.color.primary).toBeDefined();
    expect(sd.color.primary.value).toBeTruthy();
    expect(sd.color.primary.type).toBe('color');
  });

  it('style dictionary includes typography tokens', () => {
    const sd = exportStyleDictionary(brand);
    expect(sd.typography).toBeDefined();
    expect((sd.typography as Record<string, unknown>).fontFamily).toBeDefined();
  });

  it('style dictionary includes spacing tokens', () => {
    const sd = exportStyleDictionary(brand);
    expect(sd.spacing).toBeDefined();
    const keys = Object.keys(sd.spacing);
    expect(keys.length).toBeGreaterThan(0);
  });

  // --- Brand voice ---

  it('generates brand voice guidelines', () => {
    const voice = generateBrandVoice(brand);
    expect(voice.tone).toBeTruthy();
    expect(voice.audience).toBeTruthy();
    expect(voice.personality).toBeTruthy();
    expect(Array.isArray(voice.taglineSuggestions)).toBe(true);
    expect(voice.taglineSuggestions.length).toBeGreaterThan(0);
  });

  it('brand voice has do and dont lists', () => {
    const voice = generateBrandVoice(brand);
    expect(voice.doAndDont).toBeDefined();
    expect(Array.isArray(voice.doAndDont.do)).toBe(true);
    expect(Array.isArray(voice.doAndDont.dont)).toBe(true);
  });

  it('brand voice has sample copy', () => {
    const voice = generateBrandVoice(brand);
    expect(voice.sampleCopy).toBeDefined();
    expect(voice.sampleCopy.headline).toBeTruthy();
  });

  it('brand voice tone override works', () => {
    const voice = generateBrandVoice(brand, 'playful');
    expect(voice.tone).toBe('playful');
  });

  it('brand voice audience override works', () => {
    const voice = generateBrandVoice(brand, undefined, 'b2b');
    expect(voice.audience).toBe('b2b');
  });

  // --- Asset generators ---

  it('generates favicons for all sizes', () => {
    const faviconSet = generateFavicons(brand.logo!.variants.icon, brand.colors.primary.hex);
    expect(faviconSet.sizes).toBeDefined();
    expect(faviconSet.sizes[16]).toBeTruthy();
    expect(faviconSet.sizes[32]).toBeTruthy();
    expect(faviconSet.sizes[180]).toBeTruthy();
    expect(faviconSet.sizes[512]).toBeTruthy();
  });

  it('favicon SVG output is valid', () => {
    const faviconSet = generateFavicons(brand.logo!.variants.icon, brand.colors.primary.hex);
    for (const svg of Object.values(faviconSet.sizes)) {
      expect(svg).toContain('<svg');
    }
  });

  it('generates OG image with default template', () => {
    const og = generateOgImage(brand);
    expect(og.svg).toContain('<svg');
    expect(og.template).toBe('default');
    expect(og.width).toBe(1200);
    expect(og.height).toBe(630);
  });

  it('generates OG image with article template', () => {
    const og = generateOgImage(brand, 'article', 'My Article Title', 'A subtitle');
    expect(og.template).toBe('article');
    expect(og.svg).toContain('My Article Title');
  });

  it('generates OG image with social template', () => {
    const og = generateOgImage(brand, 'social', 'Social Title');
    expect(og.template).toBe('social');
    expect(og.svg).toContain('Social Title');
  });

  // --- Validators ---

  it('validates brand consistency', () => {
    const result = validateBrandConsistency(brand);
    expect(result.score).toBeGreaterThan(0);
    expect(typeof result.valid).toBe('boolean');
  });

  it('validates color contrast returns issues array', () => {
    const issues = validateContrast(brand);
    expect(Array.isArray(issues)).toBe(true);
  });

  it('consistency check reports issues array', () => {
    const result = validateBrandConsistency(brand);
    expect(Array.isArray(result.issues)).toBe(true);
  });

  // --- Cross-system coherence ---

  it('all export formats return defined output', () => {
    expect(exportDesignTokens(brand)).toBeDefined();
    expect(exportCssVariables(brand)).toBeTruthy();
    expect(exportTailwindPreset(brand)).toBeTruthy();
    expect(exportFigmaTokens(brand)).toBeDefined();
    expect(exportReactTheme(brand)).toBeTruthy();
    expect(exportSassVariables(brand)).toBeTruthy();
    expect(exportStyleDictionary(brand)).toBeDefined();
  });

  it('brand with minimal data (no optional fields) still exports', () => {
    const minimalBrand: BrandIdentity = {
      id: 'minimal',
      name: 'Minimal',
      industry: 'other',
      style: 'minimal',
      colors: brand.colors,
      typography: brand.typography,
      spacing: brand.spacing,
      createdAt: new Date().toISOString(),
    };
    expect(exportCssVariables(minimalBrand)).toContain(':root');
    expect(exportStyleDictionary(minimalBrand)).toBeDefined();
    expect(generateBrandVoice(minimalBrand)).toBeDefined();
    expect(validateBrandConsistency(minimalBrand)).toBeDefined();
  });
});
