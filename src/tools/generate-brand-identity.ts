import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
  generateSvgLogo,
  defaultLogoConfig,
} from '../lib/branding-core/index.js';
import {
  brandStyleSchema,
  colorHarmonySchema,
  colorThemeSchema,
  fontCategorySchema,
  hexColorSchema,
  typeScaleRatioSchema,
} from '../lib/branding-core/validators/token-schema.js';
import type { BrandIdentity, BrandStyle, FontCategory } from '../lib/types.js';
import { logger } from '../lib/logger.js';

const STYLE_DEFAULTS: Record<BrandStyle, { heading: FontCategory; body: FontCategory }> = {
  minimal: { heading: 'sans-serif', body: 'sans-serif' },
  bold: { heading: 'display', body: 'sans-serif' },
  elegant: { heading: 'serif', body: 'serif' },
  playful: { heading: 'display', body: 'sans-serif' },
  corporate: { heading: 'sans-serif', body: 'sans-serif' },
  tech: { heading: 'sans-serif', body: 'monospace' },
  organic: { heading: 'serif', body: 'sans-serif' },
  retro: { heading: 'display', body: 'serif' },
};

export function registerGenerateBrandIdentity(server: McpServer): void {
  server.tool(
    'generate_brand_identity',
    'Generate a complete brand identity including colors, typography, spacing, and logo. Provide a brand name and style preferences to get a cohesive identity system.',
    {
      brandName: z.string().min(1).max(100).describe('Brand name'),
      industry: z.string().min(1).max(100).describe('Industry or sector (e.g. "tech", "health")'),
      style: brandStyleSchema.describe('Visual style direction'),
      tagline: z.string().max(200).optional().describe('Brand tagline'),
      baseColor: hexColorSchema.optional().describe('Base color preference'),
      harmony: colorHarmonySchema.optional().describe('Color harmony type'),
      theme: colorThemeSchema.optional().describe('Light/dark/both'),
      headingCategory: fontCategorySchema.optional().describe('Heading font category'),
      bodyCategory: fontCategorySchema.optional().describe('Body font category'),
      scaleRatio: typeScaleRatioSchema.optional().describe('Typography scale ratio'),
    },
    async ({
      brandName,
      industry,
      style,
      tagline,
      baseColor,
      harmony,
      theme,
      headingCategory,
      bodyCategory,
      scaleRatio,
    }) => {
      try {
        logger.info({ brandName, industry, style }, 'Generating brand identity');

        const defaults = STYLE_DEFAULTS[style];
        const colors = generateColorPalette(baseColor, harmony ?? 'complementary', theme);
        const typography = generateTypographySystem(
          headingCategory ?? defaults.heading,
          bodyCategory ?? defaults.body,
          scaleRatio ?? 'major-third'
        );
        const spacing = generateSpacingScale();
        const logoConfig = defaultLogoConfig(brandName, colors.primary.hex);
        const logo = generateSvgLogo(logoConfig);

        const identity: BrandIdentity = {
          id: `brand_${Date.now().toString(36)}`,
          name: brandName,
          tagline,
          industry,
          style,
          colors,
          typography,
          spacing,
          logo,
          createdAt: new Date().toISOString(),
        };

        return {
          content: [{ type: 'text', text: JSON.stringify(identity, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error generating brand: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
