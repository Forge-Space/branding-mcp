import type { BrandIdentity, BrandValidationIssue, BrandValidationResult } from '../../types.js';
import { validateContrast } from './contrast-checker.js';

function validateColorCompleteness(brand: BrandIdentity): BrandValidationIssue[] {
  const issues: BrandValidationIssue[] = [];
  const { colors } = brand;

  if (!colors.primary.hex) {
    issues.push({
      severity: 'error',
      element: 'color.primary',
      message: 'Primary color is missing',
    });
  }
  if (!colors.secondary.hex) {
    issues.push({
      severity: 'error',
      element: 'color.secondary',
      message: 'Secondary color is missing',
    });
  }
  if (colors.neutral.length < 4) {
    issues.push({
      severity: 'warning',
      element: 'color.neutral',
      message: `Only ${colors.neutral.length} neutral shades defined (recommend 6-10)`,
    });
  }

  return issues;
}

function validateTypography(brand: BrandIdentity): BrandValidationIssue[] {
  const issues: BrandValidationIssue[] = [];
  const { typography } = brand;

  if (!typography.headingFont) {
    issues.push({
      severity: 'error',
      element: 'typography.headingFont',
      message: 'Heading font is missing',
    });
  }
  if (!typography.bodyFont) {
    issues.push({
      severity: 'error',
      element: 'typography.bodyFont',
      message: 'Body font is missing',
    });
  }
  if (typography.baseSize < 14 || typography.baseSize > 20) {
    issues.push({
      severity: 'warning',
      element: 'typography.baseSize',
      message: `Base size ${typography.baseSize}px is outside recommended range (14-20px)`,
    });
  }

  return issues;
}

export function validateBrandConsistency(brand: BrandIdentity): BrandValidationResult {
  const issues: BrandValidationIssue[] = [
    ...validateColorCompleteness(brand),
    ...validateContrast(brand),
    ...validateTypography(brand),
  ];

  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  const maxScore = 100;
  const score = Math.max(0, maxScore - errorCount * 20 - warningCount * 5);

  return {
    valid: errorCount === 0,
    score,
    issues,
  };
}
