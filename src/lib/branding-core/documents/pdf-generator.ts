import type { BrandIdentity } from '../../types.js';

export function generateBrandPdfContent(brand: BrandIdentity): string {
  return [
    `${brand.name} Brand Guidelines`,
    brand.tagline ?? '',
    '',
    'Colors',
    `  Primary: ${brand.colors.primary.hex}`,
    `  Secondary: ${brand.colors.secondary.hex}`,
    `  Accent: ${brand.colors.accent.hex}`,
    '',
    'Typography',
    `  Heading: ${brand.typography.headingFont}`,
    `  Body: ${brand.typography.bodyFont}`,
    `  Base size: ${brand.typography.baseSize}px`,
    '',
    'Spacing',
    `  Base unit: ${brand.spacing.unit}px`,
  ].join('\n');
}
