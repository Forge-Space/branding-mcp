import type { BrandIdentity } from '../../types.js';

export function exportCssVariables(brand: BrandIdentity): string {
  const { colors, typography, spacing } = brand;
  const lines: string[] = [':root {'];

  lines.push(`  --color-primary: ${colors.primary.hex};`);
  lines.push(`  --color-secondary: ${colors.secondary.hex};`);
  lines.push(`  --color-accent: ${colors.accent.hex};`);
  for (const n of colors.neutral) {
    lines.push(`  --color-${n.name}: ${n.hex};`);
  }
  lines.push(`  --color-success: ${colors.semantic.success.hex};`);
  lines.push(`  --color-warning: ${colors.semantic.warning.hex};`);
  lines.push(`  --color-error: ${colors.semantic.error.hex};`);
  lines.push(`  --color-info: ${colors.semantic.info.hex};`);
  lines.push('');

  lines.push(`  --font-heading: '${typography.headingFont}', sans-serif;`);
  lines.push(`  --font-body: '${typography.bodyFont}', sans-serif;`);
  lines.push(`  --font-mono: '${typography.monoFont}', monospace;`);
  for (const step of typography.steps) {
    lines.push(`  --text-${step.name}: ${step.size};`);
    lines.push(`  --leading-${step.name}: ${step.lineHeight};`);
  }
  lines.push('');

  for (const [key, value] of Object.entries(spacing.values)) {
    lines.push(`  --spacing-${key}: ${value};`);
  }

  lines.push('}');
  return lines.join('\n');
}
