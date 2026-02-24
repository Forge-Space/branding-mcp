import type { SpacingScale } from '../../types.js';

const SPACING_NAMES = [
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

export function generateSpacingScale(baseUnit = 4): SpacingScale {
  const values: Record<string, string> = {};
  for (const name of SPACING_NAMES) {
    const multiplier = parseFloat(name);
    values[name] = `${multiplier * baseUnit}px`;
  }
  return { unit: baseUnit, values };
}
