import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
  generateSvgLogo,
  defaultLogoConfig,
  exportDesignTokens,
  exportCssVariables,
  exportTailwindPreset,
  validateBrandConsistency,
} from '../../lib/branding-core/index.js';
import type { BrandIdentity } from '../../lib/types.js';

describe('brand generation integration', () => {
  let brand: BrandIdentity;

  beforeAll(() => {
    const colors = generateColorPalette('#6B4CE6', 'complementary');
    const typography = generateTypographySystem('sans-serif', 'serif', 'major-third');
    const spacing = generateSpacingScale();
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
      logo,
      createdAt: new Date().toISOString(),
    };
  });

  it('generates a complete brand identity', () => {
    expect(brand.colors.primary.hex).toMatch(/^#[0-9a-f]{6}$/);
    expect(brand.typography.headingFont).toBeTruthy();
    expect(brand.spacing.unit).toBe(4);
    expect(brand.logo?.svg).toContain('<svg');
  });

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

  it('validates brand consistency', () => {
    const result = validateBrandConsistency(brand);
    expect(result.score).toBeGreaterThan(0);
    expect(typeof result.valid).toBe('boolean');
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
});
