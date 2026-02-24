import {
  generateColorPalette,
  checkContrast,
  hslToHex,
  hexToHsl,
} from '../../lib/branding-core/generators/color-palette.js';

describe('hslToHex', () => {
  it('converts pure red', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000');
  });

  it('converts pure green', () => {
    expect(hslToHex(120, 100, 50)).toBe('#00ff00');
  });

  it('converts pure blue', () => {
    expect(hslToHex(240, 100, 50)).toBe('#0000ff');
  });

  it('converts white', () => {
    expect(hslToHex(0, 0, 100)).toBe('#ffffff');
  });

  it('converts black', () => {
    expect(hslToHex(0, 0, 0)).toBe('#000000');
  });

  it('handles negative hue via wrapping', () => {
    const result = hslToHex(-60, 100, 50);
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('hexToHsl', () => {
  it('converts red hex to HSL', () => {
    const hsl = hexToHsl('#ff0000');
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);
  });

  it('converts white hex to HSL', () => {
    const hsl = hexToHsl('#ffffff');
    expect(hsl.l).toBe(100);
  });

  it('handles invalid hex gracefully', () => {
    const hsl = hexToHsl('invalid');
    expect(hsl).toEqual({ h: 0, s: 0, l: 0 });
  });

  it('handles hex without hash', () => {
    const hsl = hexToHsl('ff0000');
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
  });
});

describe('checkContrast', () => {
  it('returns maximum contrast for black on white', () => {
    const result = checkContrast('#000000', '#ffffff');
    expect(result.ratio).toBeGreaterThan(20);
    expect(result.aa).toBe(true);
    expect(result.aaa).toBe(true);
  });

  it('returns minimum contrast for same color', () => {
    const result = checkContrast('#808080', '#808080');
    expect(result.ratio).toBe(1);
    expect(result.aa).toBe(false);
  });

  it('correctly identifies AA pass for dark blue on white', () => {
    const result = checkContrast('#003366', '#ffffff');
    expect(result.aa).toBe(true);
  });

  it('correctly identifies AA failure for light gray on white', () => {
    const result = checkContrast('#cccccc', '#ffffff');
    expect(result.aa).toBe(false);
  });
});

describe('generateColorPalette', () => {
  it('generates a complete palette with defaults', () => {
    const palette = generateColorPalette();
    expect(palette.primary).toBeDefined();
    expect(palette.secondary).toBeDefined();
    expect(palette.accent).toBeDefined();
    expect(palette.neutral.length).toBeGreaterThanOrEqual(4);
    expect(palette.semantic.success).toBeDefined();
    expect(palette.semantic.warning).toBeDefined();
    expect(palette.semantic.error).toBeDefined();
    expect(palette.semantic.info).toBeDefined();
    expect(palette.contrast).toBeDefined();
  });

  it('generates palette from a base color', () => {
    const palette = generateColorPalette('#6B4CE6');
    expect(palette.primary.hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('generates complementary palette', () => {
    const palette = generateColorPalette('#0000ff', 'complementary');
    expect(palette.primary).toBeDefined();
    expect(palette.secondary).toBeDefined();
  });

  it('generates analogous palette', () => {
    const palette = generateColorPalette('#0000ff', 'analogous');
    expect(palette.primary).toBeDefined();
  });

  it('generates triadic palette', () => {
    const palette = generateColorPalette('#0000ff', 'triadic');
    expect(palette.primary).toBeDefined();
  });

  it('generates monochromatic palette', () => {
    const palette = generateColorPalette('#6B4CE6', 'monochromatic');
    expect(palette.primary).toBeDefined();
  });

  it('generates dark theme neutrals', () => {
    const palette = generateColorPalette('#6B4CE6', 'complementary', 'dark');
    expect(palette.neutral.length).toBeGreaterThanOrEqual(4);
  });

  it('includes contrast data', () => {
    const palette = generateColorPalette();
    expect(palette.contrast['primary-on-white']).toBeDefined();
    expect(palette.contrast['primary-on-white'].ratio).toBeGreaterThan(0);
  });

  it('generates split-complementary palette', () => {
    const palette = generateColorPalette('#0000ff', 'split-complementary');
    expect(palette.primary).toBeDefined();
  });

  it('generates tetradic palette', () => {
    const palette = generateColorPalette('#0000ff', 'tetradic');
    expect(palette.primary).toBeDefined();
  });

  it('generates light theme neutrals', () => {
    const palette = generateColorPalette('#6B4CE6', 'complementary', 'light');
    expect(palette.neutral.length).toBeGreaterThanOrEqual(4);
  });

  it('produces valid hex colors for all swatches', () => {
    const palette = generateColorPalette('#FF6B35', 'triadic');
    const hexRegex = /^#[0-9a-f]{6}$/;
    expect(palette.primary.hex).toMatch(hexRegex);
    expect(palette.secondary.hex).toMatch(hexRegex);
    expect(palette.accent.hex).toMatch(hexRegex);
    for (const n of palette.neutral) {
      expect(n.hex).toMatch(hexRegex);
    }
  });
});
