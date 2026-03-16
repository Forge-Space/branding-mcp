import { generateGradientSystem } from '../../lib/branding-core/generators/gradient-system.js';
import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import type { BrandStyle, GradientPresetName } from '../../lib/types.js';

const PRESET_NAMES: GradientPresetName[] = ['hero', 'button', 'card', 'text', 'background'];

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

describe('generateGradientSystem', () => {
  const colors = generateColorPalette('#6B4CE6');

  it('generates all 5 gradient presets', () => {
    const system = generateGradientSystem(colors);
    expect(Object.keys(system.presets)).toEqual(PRESET_NAMES);
  });

  it('generates valid CSS gradient syntax', () => {
    const system = generateGradientSystem(colors);
    for (const preset of Object.values(system.presets)) {
      expect(preset.cssValue).toMatch(/^(linear-gradient|radial-gradient|conic-gradient)\(/);
    }
  });

  it('stops have sorted positions 0-100', () => {
    const system = generateGradientSystem(colors);
    for (const preset of Object.values(system.presets)) {
      for (let i = 0; i < preset.stops.length; i++) {
        expect(preset.stops[i].position).toBeGreaterThanOrEqual(0);
        expect(preset.stops[i].position).toBeLessThanOrEqual(100);
        if (i > 0) {
          expect(preset.stops[i].position).toBeGreaterThanOrEqual(preset.stops[i - 1].position);
        }
      }
    }
  });

  it('stops contain valid hex colors', () => {
    const system = generateGradientSystem(colors);
    for (const preset of Object.values(system.presets)) {
      for (const stop of preset.stops) {
        expect(stop.color).toMatch(/^#[0-9a-f]{6}$/i);
      }
    }
  });

  it('bold style produces 3-stop gradients for hero preset', () => {
    const system = generateGradientSystem(colors, 'bold');
    expect(system.presets.hero.stops.length).toBeGreaterThanOrEqual(3);
  });

  it('minimal style produces 2-stop gradients for hero preset', () => {
    const system = generateGradientSystem(colors, 'minimal');
    expect(system.presets.hero.stops).toHaveLength(2);
  });

  it('playful style uses conic gradient type', () => {
    const system = generateGradientSystem(colors, 'playful');
    expect(system.presets.hero.type).toBe('conic');
    expect(system.presets.hero.cssValue).toContain('conic-gradient');
  });

  it('organic style uses radial gradient type', () => {
    const system = generateGradientSystem(colors, 'organic');
    expect(system.presets.hero.type).toBe('radial');
    expect(system.presets.hero.cssValue).toContain('radial-gradient');
  });

  it('works with default parameters', () => {
    const system = generateGradientSystem(colors);
    expect(system.presets).toBeDefined();
    expect(Object.keys(system.presets)).toHaveLength(5);
  });

  it('each BrandStyle produces valid gradients', () => {
    for (const style of ALL_STYLES) {
      const system = generateGradientSystem(colors, style);
      expect(Object.keys(system.presets)).toHaveLength(5);
      for (const preset of Object.values(system.presets)) {
        expect(preset.stops.length).toBeGreaterThanOrEqual(2);
        expect(preset.cssValue).toBeTruthy();
      }
    }
  });

  it('card preset uses neutral colors', () => {
    const system = generateGradientSystem(colors);
    const cardStops = system.presets.card.stops;
    expect(cardStops).toHaveLength(2);
  });

  it('background preset uses neutral extremes', () => {
    const system = generateGradientSystem(colors);
    const bgStops = system.presets.background.stops;
    expect(bgStops).toHaveLength(2);
  });

  it('radial gradients omit angle property', () => {
    const system = generateGradientSystem(colors, 'organic');
    expect(system.presets.hero.angle).toBeUndefined();
  });

  it('linear gradients include angle property', () => {
    const system = generateGradientSystem(colors, 'minimal');
    expect(system.presets.hero.angle).toBeDefined();
    expect(typeof system.presets.hero.angle).toBe('number');
  });

  it('produces distinct gradients for different styles', () => {
    const minimal = generateGradientSystem(colors, 'minimal');
    const bold = generateGradientSystem(colors, 'bold');
    expect(minimal.presets.hero.cssValue).not.toBe(bold.presets.hero.cssValue);
  });

  it('falls back to default neutral colors when neutral array is empty', () => {
    const emptyNeutralColors = { ...colors, neutral: [] };
    const system = generateGradientSystem(emptyNeutralColors, 'minimal');
    expect(system.presets.card.cssValue).toBeTruthy();
    expect(system.presets.background.cssValue).toBeTruthy();
    expect(system.presets.card.cssValue).toContain('#f5f5f5');
    expect(system.presets.background.cssValue).toContain('#1a1a1a');
  });
});
