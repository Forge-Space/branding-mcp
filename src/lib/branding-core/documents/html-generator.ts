import type { BrandIdentity } from '../../types.js';

export function generateBrandHtml(brand: BrandIdentity): string {
  const { colors, typography, spacing } = brand;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${brand.name} Brand Book</title>
</head>
<body>
  <h1>${brand.name}</h1>
  ${brand.tagline ? `<p>${brand.tagline}</p>` : ''}
  <section>
    <h2>Colors</h2>
    <p>Primary: ${colors.primary.hex}</p>
    <p>Secondary: ${colors.secondary.hex}</p>
    <p>Accent: ${colors.accent.hex}</p>
  </section>
  <section>
    <h2>Typography</h2>
    <p>Heading: ${typography.headingFont}</p>
    <p>Body: ${typography.bodyFont}</p>
    <p>Scale: ${typography.scaleRatio}</p>
  </section>
  <section>
    <h2>Spacing</h2>
    <p>Base unit: ${spacing.unit}px</p>
  </section>
</body>
</html>`;
}
