import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const COLOR_THEORY = {
  harmonies: {
    complementary: 'Colors opposite on the color wheel. High contrast, vibrant.',
    analogous: 'Colors adjacent on the wheel. Harmonious, low contrast.',
    triadic: 'Three colors equally spaced (120 degrees). Balanced and colorful.',
    'split-complementary': 'Base + two colors adjacent to its complement. Softer contrast.',
    tetradic: 'Four colors forming a rectangle. Rich palette, needs balance.',
    monochromatic: 'Single hue with varied lightness/saturation. Cohesive and elegant.',
  },
  psychology: {
    red: 'Energy, passion, urgency. Use for CTAs and alerts.',
    blue: 'Trust, stability, professionalism. Common in tech and finance.',
    green: 'Growth, health, nature. Used in wellness and sustainability.',
    purple: 'Creativity, luxury, wisdom. Premium and creative brands.',
    orange: 'Enthusiasm, confidence, warmth. Energetic and approachable.',
    yellow: 'Optimism, clarity, warmth. Attention-grabbing accents.',
    black: 'Sophistication, power, elegance. Luxury and editorial.',
    white: 'Simplicity, cleanliness, space. Minimalist design.',
  },
  accessibility: {
    wcagAA: 'Minimum 4.5:1 contrast ratio for normal text',
    wcagAALarge: 'Minimum 3:1 for large text (18px+ or 14px+ bold)',
    wcagAAA: 'Enhanced 7:1 contrast ratio for normal text',
  },
};

const TYPOGRAPHY_RULES = {
  scales: {
    'minor-second': { ratio: 1.067, use: 'Very tight, dense interfaces' },
    'major-second': { ratio: 1.125, use: 'Compact, functional UIs' },
    'minor-third': { ratio: 1.2, use: 'General purpose, most common' },
    'major-third': { ratio: 1.25, use: 'Marketing, editorial content' },
    'perfect-fourth': { ratio: 1.333, use: 'Bold hierarchies, headlines' },
    'golden-ratio': { ratio: 1.618, use: 'Dramatic, artistic layouts' },
  },
  pairingPrinciples: [
    'Contrast serif/sans-serif for heading/body distinction',
    'Limit to 2-3 fonts maximum per project',
    'Ensure x-height similarity for optical consistency',
    'Match historical period and cultural context',
  ],
};

export function registerBrandKnowledge(server: McpServer): void {
  server.resource('brand-knowledge', 'brand://knowledge', async () => ({
    contents: [
      {
        uri: 'brand://knowledge',
        text: JSON.stringify(
          { colorTheory: COLOR_THEORY, typographyRules: TYPOGRAPHY_RULES },
          null,
          2
        ),
        mimeType: 'application/json',
      },
    ],
  }));
}
