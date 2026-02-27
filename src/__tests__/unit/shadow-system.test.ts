import { generateShadowSystem } from '../../lib/branding-core/generators/shadow-system.js';

describe('generateShadowSystem', () => {
  it('generates all 6 elevation levels', () => {
    const system = generateShadowSystem();
    const names = Object.keys(system.levels);
    expect(names).toEqual(['none', 'sm', 'md', 'lg', 'xl', '2xl']);
  });

  it('none level has zero values', () => {
    const system = generateShadowSystem();
    const none = system.levels.none;
    expect(none.blur).toBe(0);
    expect(none.spread).toBe(0);
    expect(none.offsetY).toBe(0);
    expect(none.cssValue).toBe('none');
  });

  it('blur increases with elevation', () => {
    const system = generateShadowSystem();
    const levels = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
    for (let i = 1; i < levels.length; i++) {
      expect(system.levels[levels[i]].blur).toBeGreaterThan(system.levels[levels[i - 1]].blur);
    }
  });

  it('uses brand color for tinting', () => {
    const system = generateShadowSystem('#FF0000');
    const md = system.levels.md;
    expect(md.color).toMatch(/^rgba\(/);
    expect(md.cssValue).toContain('rgba(');
  });

  it('dark theme reverses shadow direction', () => {
    const light = generateShadowSystem('#6B4CE6', 'light');
    const dark = generateShadowSystem('#6B4CE6', 'dark');
    expect(light.levels.md.offsetY).toBeGreaterThan(0);
    expect(dark.levels.md.offsetY).toBeLessThan(0);
  });

  it('dark theme has higher opacity', () => {
    const light = generateShadowSystem('#6B4CE6', 'light');
    const dark = generateShadowSystem('#6B4CE6', 'dark');
    expect(dark.levels.lg.opacity).toBeGreaterThan(light.levels.lg.opacity);
  });

  it('generates valid CSS box-shadow strings', () => {
    const system = generateShadowSystem();
    for (const [name, level] of Object.entries(system.levels)) {
      if (name === 'none') {
        expect(level.cssValue).toBe('none');
      } else {
        expect(level.cssValue).toMatch(/\d+px.*rgba\(/);
      }
    }
  });

  it('works with default parameters', () => {
    const system = generateShadowSystem();
    expect(system.levels).toBeDefined();
    expect(Object.keys(system.levels)).toHaveLength(6);
  });
});
