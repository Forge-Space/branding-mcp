import { generateFavicons } from '../../lib/branding-core/generators/favicon-generator.js';
import {
  generateSvgLogo,
  defaultLogoConfig,
} from '../../lib/branding-core/generators/logo-generator.js';
import type { FaviconSize } from '../../lib/types.js';

const SIZES: FaviconSize[] = [16, 32, 180, 512];

describe('generateFavicons', () => {
  const logo = generateSvgLogo(defaultLogoConfig('Test', '#6B4CE6'));
  const iconSvg = logo.variants.icon;

  it('generates all 4 sizes', () => {
    const favicons = generateFavicons(iconSvg, '#6B4CE6');
    expect(
      Object.keys(favicons.sizes)
        .map(Number)
        .sort((a, b) => a - b)
    ).toEqual(SIZES);
  });

  it('all outputs are valid SVG strings', () => {
    const favicons = generateFavicons(iconSvg, '#6B4CE6');
    for (const size of SIZES) {
      const svg = favicons.sizes[size];
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).toContain('</svg>');
    }
  });

  it('each size has correct width/height attributes', () => {
    const favicons = generateFavicons(iconSvg, '#6B4CE6');
    for (const size of SIZES) {
      expect(favicons.sizes[size]).toContain(`width="${size}"`);
      expect(favicons.sizes[size]).toContain(`height="${size}"`);
    }
  });

  it('preserves viewBox from icon SVG', () => {
    const favicons = generateFavicons(iconSvg, '#6B4CE6');
    for (const size of SIZES) {
      expect(favicons.sizes[size]).toContain('viewBox="0 0 64 64"');
    }
  });

  it('16px has optimized stroke-width', () => {
    const svgWithStroke = iconSvg.replace('<circle', '<circle stroke-width="1"');
    const favicons = generateFavicons(svgWithStroke, '#6B4CE6');
    expect(favicons.sizes[16]).toContain('stroke-width="2"');
  });

  it('32px has optimized stroke-width', () => {
    const svgWithStroke = iconSvg.replace('<circle', '<circle stroke-width="1"');
    const favicons = generateFavicons(svgWithStroke, '#6B4CE6');
    expect(favicons.sizes[32]).toContain('stroke-width="2"');
  });

  it('512px preserves original stroke-width', () => {
    const svgWithStroke = iconSvg.replace('<circle', '<circle stroke-width="1"');
    const favicons = generateFavicons(svgWithStroke, '#6B4CE6');
    expect(favicons.sizes[512]).toContain('stroke-width="1"');
  });

  it('works with different brand colors', () => {
    const favicons = generateFavicons(iconSvg, '#FF5500');
    expect(Object.keys(favicons.sizes)).toHaveLength(4);
  });

  it('uses brand color in SVG', () => {
    const favicons = generateFavicons(iconSvg, '#6B4CE6');
    expect(favicons.sizes[512]).toContain('#6B4CE6');
  });

  it('180px size for apple-touch-icon', () => {
    const favicons = generateFavicons(iconSvg, '#6B4CE6');
    expect(favicons.sizes[180]).toContain('width="180"');
    expect(favicons.sizes[180]).toContain('height="180"');
  });

  it('injects style color when SVG has no fill= and no <circle element', () => {
    const plainSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64"/></svg>';
    const favicons = generateFavicons(plainSvg, '#FF0000');
    expect(favicons.sizes[512]).toContain('style="color:#FF0000"');
  });
});
