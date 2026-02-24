import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';

describe('generateSpacingScale', () => {
  it('generates scale with default 4px unit', () => {
    const scale = generateSpacingScale();
    expect(scale.unit).toBe(4);
    expect(scale.values['0']).toBe('0px');
    expect(scale.values['1']).toBe('4px');
    expect(scale.values['2']).toBe('8px');
    expect(scale.values['4']).toBe('16px');
  });

  it('generates scale with custom unit', () => {
    const scale = generateSpacingScale(8);
    expect(scale.unit).toBe(8);
    expect(scale.values['1']).toBe('8px');
    expect(scale.values['2']).toBe('16px');
  });

  it('includes all standard steps', () => {
    const scale = generateSpacingScale();
    const expectedKeys = [
      '0',
      '0.5',
      '1',
      '1.5',
      '2',
      '2.5',
      '3',
      '4',
      '5',
      '6',
      '8',
      '10',
      '12',
      '16',
      '20',
      '24',
    ];
    for (const key of expectedKeys) {
      expect(scale.values[key]).toBeDefined();
    }
  });

  it('zero spacing is always 0px', () => {
    const scale = generateSpacingScale(8);
    expect(scale.values['0']).toBe('0px');
  });

  it('values increase monotonically', () => {
    const scale = generateSpacingScale();
    const keys = Object.keys(scale.values)
      .map(Number)
      .sort((a, b) => a - b);
    const values = keys.map((k) => parseInt(scale.values[String(k)]));
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });
});
