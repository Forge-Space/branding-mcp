import { generateBorderSystem } from '../../lib/branding-core/generators/border-system.js';
import type { BrandStyle } from '../../lib/types.js';

describe('generateBorderSystem', () => {
  it('generates all radius levels', () => {
    const system = generateBorderSystem();
    const names = Object.keys(system.radii);
    expect(names).toEqual(['none', 'sm', 'md', 'lg', 'xl', 'full', 'circle']);
  });

  it('none radius is always 0px', () => {
    const system = generateBorderSystem('playful');
    expect(system.radii.none).toBe('0px');
  });

  it('full and circle are always 9999px', () => {
    const styles: BrandStyle[] = ['minimal', 'bold', 'elegant', 'playful'];
    for (const style of styles) {
      const system = generateBorderSystem(style);
      expect(system.radii.full).toBe('9999px');
      expect(system.radii.circle).toBe('9999px');
    }
  });

  it('playful has larger radii than corporate', () => {
    const playful = generateBorderSystem('playful');
    const corporate = generateBorderSystem('corporate');
    expect(parseInt(playful.radii.md)).toBeGreaterThan(parseInt(corporate.radii.md));
  });

  it('generates three border widths', () => {
    const system = generateBorderSystem();
    expect(system.widths.thin).toBeDefined();
    expect(system.widths.medium).toBeDefined();
    expect(system.widths.thick).toBeDefined();
  });

  it('border widths increase thin < medium < thick', () => {
    const system = generateBorderSystem('bold');
    const thin = parseInt(system.widths.thin);
    const medium = parseInt(system.widths.medium);
    const thick = parseInt(system.widths.thick);
    expect(thin).toBeLessThanOrEqual(medium);
    expect(medium).toBeLessThanOrEqual(thick);
  });

  it('bold style has thicker borders', () => {
    const bold = generateBorderSystem('bold');
    const minimal = generateBorderSystem('minimal');
    expect(parseInt(bold.widths.thick)).toBeGreaterThanOrEqual(parseInt(minimal.widths.thick));
  });

  it('radii values are formatted as px strings', () => {
    const system = generateBorderSystem();
    for (const value of Object.values(system.radii)) {
      expect(value).toMatch(/^\d+px$/);
    }
  });

  it('works for all brand styles', () => {
    const styles: BrandStyle[] = [
      'minimal',
      'bold',
      'elegant',
      'playful',
      'corporate',
      'tech',
      'organic',
      'retro',
    ];
    for (const style of styles) {
      const system = generateBorderSystem(style);
      expect(Object.keys(system.radii)).toHaveLength(7);
      expect(Object.keys(system.widths)).toHaveLength(3);
    }
  });
});
