import type { BrandIdentity } from '../../types.js';

export function buildRefinementPrompt(
  feedback: string,
  element: 'colors' | 'typography' | 'spacing',
  currentBrand: BrandIdentity
): string {
  const brandContext = [
    `Brand: ${currentBrand.name}`,
    `Industry: ${currentBrand.industry}`,
    `Style: ${currentBrand.style}`,
    `Current primary color: ${currentBrand.colors.primary.hex}`,
    `Current heading font: ${currentBrand.typography.headingFont}`,
    `Current body font: ${currentBrand.typography.bodyFont}`,
  ].join('\n');

  const colorSchema = `{
  "color": {
    "baseColor": "#hex (optional, keep current if not changing)",
    "harmony": "complementary|analogous|triadic|split-complementary|tetradic|monochromatic",
    "theme": "light|dark|both",
    "saturationShift": number (-30 to 30),
    "lightnessShift": number (-30 to 30),
    "hueShift": number (-180 to 180)
  },
  "reasoning": "1-2 sentences explaining the design decision"
}`;

  const typographySchema = `{
  "typography": {
    "headingCategory": "serif|sans-serif|monospace|display|handwriting",
    "bodyCategory": "serif|sans-serif|monospace|display|handwriting",
    "scaleRatio": "minor-second|major-second|minor-third|major-third|perfect-fourth|augmented-fourth|perfect-fifth|golden-ratio",
    "baseSize": number (12-24)
  },
  "reasoning": "1-2 sentences explaining the design decision"
}`;

  const schema = element === 'colors' ? colorSchema : typographySchema;

  return [
    'You are a brand identity expert. Interpret the user feedback and output a JSON object with specific design parameters.',
    '',
    'Current brand context:',
    brandContext,
    '',
    `User wants to refine: ${element}`,
    `User feedback: "${feedback}"`,
    '',
    'Respond with ONLY valid JSON matching this schema:',
    schema,
    '',
    'Design principles:',
    '- Warm colors: shift hue toward red/orange (positive hueShift), use analogous harmony',
    '- Cool colors: shift hue toward blue/green (negative hueShift)',
    '- Premium feel: lower saturation, slightly darker, analogous or monochromatic',
    '- Playful: higher saturation, lighter, triadic harmony',
    '- Corporate: moderate saturation, complementary, clean sans-serif',
    '- Editorial: serif headings, perfect-fourth or larger scale ratio',
    '- Technical: monospace body, sans-serif headings, compact scale',
    '- WCAG: ensure contrast ratios remain accessible (>= 4.5:1 on white)',
  ].join('\n');
}

export function buildGenerationPrompt(
  brandName: string,
  industry: string,
  description: string
): string {
  return [
    'You are a brand identity expert. Based on the brand description, suggest specific design parameters.',
    '',
    `Brand name: ${brandName}`,
    `Industry: ${industry}`,
    `Description: "${description}"`,
    '',
    'Respond with ONLY valid JSON:',
    '{',
    '  "style": "minimal|bold|elegant|playful|corporate|tech|organic|retro",',
    '  "color": {',
    '    "baseColor": "#hex",',
    '    "harmony": "complementary|analogous|triadic|split-complementary|tetradic|monochromatic",',
    '    "theme": "light|dark|both"',
    '  },',
    '  "typography": {',
    '    "headingCategory": "serif|sans-serif|monospace|display|handwriting",',
    '    "bodyCategory": "serif|sans-serif|monospace|display|handwriting",',
    '    "scaleRatio": "minor-second|major-second|minor-third|major-third|perfect-fourth|augmented-fourth|perfect-fifth|golden-ratio"',
    '  },',
    '  "reasoning": "2-3 sentences explaining why these choices fit the brand"',
    '}',
  ].join('\n');
}
