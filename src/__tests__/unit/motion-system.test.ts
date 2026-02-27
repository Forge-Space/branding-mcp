import { generateMotionSystem } from '../../lib/branding-core/generators/motion-system.js';
import type { BrandStyle } from '../../lib/types.js';

describe('generateMotionSystem', () => {
  it('generates all duration levels', () => {
    const system = generateMotionSystem();
    const names = Object.keys(system.durations);
    expect(names).toEqual(['instant', 'fast', 'normal', 'slow', 'slower']);
  });

  it('instant duration is always 0ms', () => {
    const styles: BrandStyle[] = ['minimal', 'elegant', 'playful'];
    for (const style of styles) {
      const system = generateMotionSystem(style);
      expect(system.durations.instant).toBe('0ms');
    }
  });

  it('durations increase monotonically', () => {
    const system = generateMotionSystem();
    const order = ['instant', 'fast', 'normal', 'slow', 'slower'] as const;
    for (let i = 1; i < order.length; i++) {
      const prev = parseInt(system.durations[order[i - 1]]);
      const curr = parseInt(system.durations[order[i]]);
      expect(curr).toBeGreaterThanOrEqual(prev);
    }
  });

  it('elegant has longer durations than tech', () => {
    const elegant = generateMotionSystem('elegant');
    const tech = generateMotionSystem('tech');
    expect(parseInt(elegant.durations.normal)).toBeGreaterThan(parseInt(tech.durations.normal));
  });

  it('generates all easing presets', () => {
    const system = generateMotionSystem();
    expect(system.easings['ease-in']).toBeDefined();
    expect(system.easings['ease-out']).toBeDefined();
    expect(system.easings['ease-in-out']).toBeDefined();
    expect(system.easings.spring).toBeDefined();
    expect(system.easings.bounce).toBeDefined();
  });

  it('easings are valid cubic-bezier strings', () => {
    const system = generateMotionSystem();
    for (const value of Object.values(system.easings)) {
      expect(value).toMatch(/^cubic-bezier\([\d., -]+\)$/);
    }
  });

  it('generates transition presets', () => {
    const system = generateMotionSystem();
    expect(system.transitions.fade).toBeDefined();
    expect(system.transitions.slide).toBeDefined();
    expect(system.transitions.scale).toBeDefined();
    expect(system.transitions.color).toBeDefined();
    expect(system.transitions.all).toBeDefined();
  });

  it('transition presets include duration and easing', () => {
    const system = generateMotionSystem();
    expect(system.transitions.fade).toContain('ms');
    expect(system.transitions.fade).toContain('cubic-bezier');
  });

  it('duration values are formatted as ms strings', () => {
    const system = generateMotionSystem();
    for (const value of Object.values(system.durations)) {
      expect(value).toMatch(/^\d+ms$/);
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
      const system = generateMotionSystem(style);
      expect(Object.keys(system.durations)).toHaveLength(5);
      expect(Object.keys(system.easings)).toHaveLength(5);
      expect(Object.keys(system.transitions)).toHaveLength(5);
    }
  });
});
