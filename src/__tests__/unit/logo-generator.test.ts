import {
  generateSvgLogo,
  defaultLogoConfig,
} from '../../lib/branding-core/generators/logo-generator.js';
import type { BrandStyle, LogoConfig, LogoVariant } from '../../lib/types.js';

const ALL_VARIANTS: LogoVariant[] = ['wordmark', 'monogram', 'abstract', 'icon'];

const ALL_STYLES: BrandStyle[] = [
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
];

describe('generateSvgLogo', () => {
  const config: LogoConfig = {
    ...defaultLogoConfig('TestBrand', '#6B4CE6'),
    font: 'Playfair Display',
    style: 'elegant',
  };

  it('returns all 4 variants', () => {
    const result = generateSvgLogo(config);
    expect(Object.keys(result.variants)).toEqual(ALL_VARIANTS);
  });

  it('svg field matches wordmark variant (backward compat)', () => {
    const result = generateSvgLogo(config);
    expect(result.svg).toBe(result.variants.wordmark);
  });

  it('wordmark contains brand name text', () => {
    const result = generateSvgLogo(config);
    expect(result.variants.wordmark).toContain('TestBrand');
  });

  it('monogram contains first letter', () => {
    const result = generateSvgLogo(config);
    expect(result.variants.monogram).toContain('>T<');
  });

  it('abstract has multiple shape elements', () => {
    const result = generateSvgLogo(config);
    const shapeCount = (
      result.variants.abstract.match(/<(circle|rect|polygon|path|line|ellipse)/g) ?? []
    ).length;
    expect(shapeCount).toBeGreaterThanOrEqual(2);
  });

  it('icon has 64x64 dimensions', () => {
    const result = generateSvgLogo(config);
    expect(result.variants.icon).toContain('width="64"');
    expect(result.variants.icon).toContain('height="64"');
  });

  it('all variants are valid SVG', () => {
    const result = generateSvgLogo(config);
    for (const svg of Object.values(result.variants)) {
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).toContain('viewBox=');
      expect(svg).toContain('</svg>');
    }
  });

  it('uses brand font instead of hardcoded Inter', () => {
    const result = generateSvgLogo(config);
    expect(result.variants.wordmark).toContain('Playfair Display');
    expect(result.variants.monogram).toContain('Playfair Display');
    expect(result.variants.icon).toContain('Playfair Display');
  });

  it('wordmark dimensions are 400x120', () => {
    const result = generateSvgLogo(config);
    expect(result.variants.wordmark).toContain('width="400"');
    expect(result.variants.wordmark).toContain('height="120"');
  });

  it('monogram dimensions are 120x120', () => {
    const result = generateSvgLogo(config);
    expect(result.variants.monogram).toContain('width="120"');
    expect(result.variants.monogram).toContain('height="120"');
  });

  it('abstract dimensions are 120x120', () => {
    const result = generateSvgLogo(config);
    expect(result.variants.abstract).toContain('width="120"');
    expect(result.variants.abstract).toContain('height="120"');
  });

  it('style-aware monogram shapes vary per BrandStyle', () => {
    const shapes = new Set<string>();
    for (const style of ALL_STYLES) {
      const result = generateSvgLogo({ ...config, style });
      shapes.add(result.variants.monogram);
    }
    expect(shapes.size).toBeGreaterThan(1);
  });

  it('style-aware abstract shapes vary per BrandStyle', () => {
    const shapes = new Set<string>();
    for (const style of ALL_STYLES) {
      const result = generateSvgLogo({ ...config, style });
      shapes.add(result.variants.abstract);
    }
    expect(shapes.size).toBeGreaterThan(1);
  });

  it('works with default config (no style)', () => {
    const defaultCfg = defaultLogoConfig('MyBrand', '#FF5500');
    const result = generateSvgLogo(defaultCfg);
    expect(result.svg).toBeTruthy();
    expect(Object.keys(result.variants)).toHaveLength(4);
  });

  it('uses brand color in SVG elements', () => {
    const result = generateSvgLogo(config);
    expect(result.variants.wordmark).toContain('#6B4CE6');
    expect(result.variants.icon).toContain('#6B4CE6');
  });

  it('no longer contains png field', () => {
    const result = generateSvgLogo(config);
    expect(result).not.toHaveProperty('png');
  });

  it('handles single-character brand name', () => {
    const shortConfig = { ...config, text: 'X' };
    const result = generateSvgLogo(shortConfig);
    expect(result.variants.wordmark).toContain('>X<');
    expect(result.variants.monogram).toContain('>X<');
  });

  it('default logo config returns expected structure', () => {
    const cfg = defaultLogoConfig('Acme', '#000000');
    expect(cfg.text).toBe('Acme');
    expect(cfg.font).toBe('Inter');
    expect(cfg.color).toBe('#000000');
    expect(cfg.width).toBe(400);
    expect(cfg.height).toBe(120);
  });
});
