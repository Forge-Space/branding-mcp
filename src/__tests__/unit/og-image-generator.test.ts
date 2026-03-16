import { generateOgImage } from '../../lib/branding-core/generators/og-image-generator.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateGradientSystem } from '../../lib/branding-core/generators/gradient-system.js';
import {
  generateSvgLogo,
  defaultLogoConfig,
} from '../../lib/branding-core/generators/logo-generator.js';
import type { BrandIdentity } from '../../lib/types.js';

function createTestBrand(): BrandIdentity {
  const colors = generateColorPalette('#6B4CE6');
  const typography = generateTypographySystem('sans-serif', 'sans-serif');
  const spacing = generateSpacingScale();
  const gradients = generateGradientSystem(colors, 'minimal');
  const logo = generateSvgLogo({
    ...defaultLogoConfig('TestBrand', colors.primary.hex),
    style: 'minimal',
  });

  return {
    id: 'test_brand',
    name: 'TestBrand',
    tagline: 'Test tagline',
    industry: 'tech',
    style: 'minimal',
    colors,
    typography,
    spacing,
    gradients,
    logo,
    createdAt: new Date().toISOString(),
  };
}

describe('generateOgImage', () => {
  const brand = createTestBrand();

  it('default template produces 1200x630', () => {
    const result = generateOgImage(brand);
    expect(result.width).toBe(1200);
    expect(result.height).toBe(630);
    expect(result.template).toBe('default');
  });

  it('default template includes brand name', () => {
    const result = generateOgImage(brand);
    expect(result.svg).toContain('TestBrand');
  });

  it('article template produces 1200x630', () => {
    const result = generateOgImage(brand, 'article', 'My Article');
    expect(result.width).toBe(1200);
    expect(result.height).toBe(630);
    expect(result.template).toBe('article');
  });

  it('article template includes custom title', () => {
    const result = generateOgImage(brand, 'article', 'My Article', 'Subtitle');
    expect(result.svg).toContain('My Article');
    expect(result.svg).toContain('Subtitle');
  });

  it('social template produces 1200x1200 square', () => {
    const result = generateOgImage(brand, 'social');
    expect(result.width).toBe(1200);
    expect(result.height).toBe(1200);
    expect(result.template).toBe('social');
  });

  it('all templates produce valid SVG', () => {
    for (const template of ['default', 'article', 'social'] as const) {
      const result = generateOgImage(brand, template);
      expect(result.svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(result.svg).toContain('</svg>');
    }
  });

  it('uses brand font family', () => {
    const result = generateOgImage(brand);
    expect(result.svg).toContain(brand.typography.headingFont);
  });

  it('default parameters work', () => {
    const result = generateOgImage(brand);
    expect(result.svg).toBeTruthy();
    expect(result.width).toBe(1200);
    expect(result.height).toBe(630);
  });

  it('uses brand colors', () => {
    const result = generateOgImage(brand, 'social');
    expect(result.svg).toContain(brand.colors.primary.hex);
  });

  it('works without gradients', () => {
    const brandNoGradients = { ...brand, gradients: undefined };
    const result = generateOgImage(brandNoGradients);
    expect(result.svg).toBeTruthy();
    expect(result.svg).toContain(brand.colors.primary.hex);
  });

  it('works without logo', () => {
    const brandNoLogo = { ...brand, logo: undefined };
    const result = generateOgImage(brandNoLogo);
    expect(result.svg).toBeTruthy();
    expect(result.svg).toContain('TestBrand');
  });

  it('social template with custom title', () => {
    const result = generateOgImage(brand, 'social', 'Custom Title');
    expect(result.svg).toContain('Custom Title');
  });

  it('article template with logo produces logo section in SVG', () => {
    const result = generateOgImage(brand, 'article', 'Article Title', 'A subtitle');
    expect(result.template).toBe('article');
    expect(result.svg).toContain('Article Title');
    expect(result.svg).toContain('A subtitle');
  });

  it('default template without tagline uses empty string subtitle', () => {
    const brandNoTag = { ...brand, tagline: undefined };
    const result = generateOgImage(brandNoTag);
    expect(result.svg).not.toMatch(/undefined/);
    expect(result.svg).toBeTruthy();
  });

  it('article template with logo icon renders logo section', () => {
    const brandWithIcon: BrandIdentity = {
      ...brand,
      logo: {
        ...brand.logo!,
        variants: {
          ...brand.logo!.variants!,
          icon: '<svg xmlns="http://www.w3.org/2000/svg"><circle r="10"/></svg>',
        },
      },
    };
    const result = generateOgImage(brandWithIcon, 'article', 'Article', 'Sub');
    expect(result.svg).toContain('Article');
    expect(result.svg).toContain('<g transform=');
  });

  it('article template without logo icon omits logo section', () => {
    const brandNoIcon: BrandIdentity = {
      ...brand,
      logo: {
        ...brand.logo!,
        variants: {
          ...brand.logo!.variants!,
          icon: '',
        },
      },
    };
    const result = generateOgImage(brandNoIcon, 'article', 'Article');
    expect(result.svg).toContain('Article');
  });

  it('social template with logo icon renders logo section', () => {
    const brandWithIcon: BrandIdentity = {
      ...brand,
      logo: {
        ...brand.logo!,
        variants: {
          ...brand.logo!.variants!,
          icon: '<svg xmlns="http://www.w3.org/2000/svg"><circle r="10"/></svg>',
        },
      },
    };
    const result = generateOgImage(brandWithIcon, 'social', 'Social Title');
    expect(result.svg).toContain('Social Title');
    expect(result.svg).toContain('<g transform=');
  });

  it('social template without logo icon omits logo section', () => {
    const brandNoIcon: BrandIdentity = {
      ...brand,
      logo: {
        ...brand.logo!,
        variants: {
          ...brand.logo!.variants!,
          icon: '',
        },
      },
    };
    const result = generateOgImage(brandNoIcon, 'social');
    expect(result.svg).toBeTruthy();
  });
});
