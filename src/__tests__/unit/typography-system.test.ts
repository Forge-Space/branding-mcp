import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';

describe('generateTypographySystem', () => {
  it('generates a system with default parameters', () => {
    const system = generateTypographySystem();
    expect(system.headingFont).toBeTruthy();
    expect(system.bodyFont).toBeTruthy();
    expect(system.monoFont).toBe('JetBrains Mono');
    expect(system.baseSize).toBe(16);
    expect(system.steps.length).toBeGreaterThan(0);
  });

  it('applies correct scale ratio', () => {
    const system = generateTypographySystem('sans-serif', 'serif', 'major-third', 16);
    expect(system.scaleRatio).toBe(1.25);
  });

  it('uses perfect fourth scale', () => {
    const system = generateTypographySystem('sans-serif', 'serif', 'perfect-fourth');
    expect(system.scaleRatio).toBe(1.333);
  });

  it('generates correct number of type steps', () => {
    const system = generateTypographySystem();
    expect(system.steps.length).toBe(9);
  });

  it('base step is at index 2 with baseSize', () => {
    const system = generateTypographySystem('sans-serif', 'serif', 'major-third', 16);
    const baseStep = system.steps[2];
    expect(baseStep.name).toBe('base');
    expect(parseFloat(baseStep.size)).toBeCloseTo(16, 0);
  });

  it('sizes increase progressively', () => {
    const system = generateTypographySystem();
    const sizes = system.steps.map((s) => parseFloat(s.size));
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1]);
    }
  });

  it('respects custom base size', () => {
    const system = generateTypographySystem('sans-serif', 'serif', 'major-third', 18);
    expect(system.baseSize).toBe(18);
    const baseStep = system.steps[2];
    expect(parseFloat(baseStep.size)).toBeCloseTo(18, 0);
  });

  it('generates line heights for all steps', () => {
    const system = generateTypographySystem();
    for (const step of system.steps) {
      expect(parseFloat(step.lineHeight)).toBeGreaterThan(1);
      expect(parseFloat(step.lineHeight)).toBeLessThanOrEqual(1.6);
    }
  });

  it('generates valid font weights', () => {
    const system = generateTypographySystem();
    for (const step of system.steps) {
      expect([400, 600, 700]).toContain(step.weight);
    }
  });

  it('pairs serif heading with sans-serif body', () => {
    const system = generateTypographySystem('serif', 'sans-serif');
    expect(system.headingFont).toBeTruthy();
    expect(system.bodyFont).toBeTruthy();
    expect(system.headingFont).not.toBe(system.bodyFont);
  });
});
