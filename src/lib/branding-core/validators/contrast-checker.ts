import type { BrandIdentity, BrandValidationIssue } from '../../types.js';
import { checkContrast } from '../generators/color-palette.js';

export function validateContrast(brand: BrandIdentity): BrandValidationIssue[] {
  const issues: BrandValidationIssue[] = [];
  const white = '#ffffff';
  const dark = '#1a1a1a';

  const colorChecks = [
    { name: 'primary', hex: brand.colors.primary.hex },
    { name: 'secondary', hex: brand.colors.secondary.hex },
    { name: 'accent', hex: brand.colors.accent.hex },
  ];

  for (const { name, hex } of colorChecks) {
    const onWhite = checkContrast(hex, white);
    const onDark = checkContrast(hex, dark);

    if (!onWhite.aa && !onDark.aa) {
      issues.push({
        severity: 'error',
        element: `color.${name}`,
        message: `${name} color (${hex}) fails WCAG AA on both white and dark backgrounds`,
        suggestion: 'Adjust lightness to achieve at least 4.5:1 contrast ratio',
      });
    } else if (!onWhite.aa) {
      issues.push({
        severity: 'warning',
        element: `color.${name}`,
        message: `${name} color (${hex}) fails WCAG AA on white (ratio: ${onWhite.ratio})`,
        suggestion: 'Darken the color for better contrast on light backgrounds',
      });
    }
  }

  return issues;
}
