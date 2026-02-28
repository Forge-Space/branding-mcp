import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateFavicons, generateOgImage } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';
import { logger } from '../lib/logger.js';

const ogTemplateSchema = z.enum(['default', 'article', 'social']);

export function registerGenerateBrandAssets(server: McpServer): void {
  server.tool(
    'generate_brand_assets',
    'Generate brand assets (favicons, OG images) from an existing brand identity JSON.',
    {
      brand: z
        .string()
        .min(1)
        .describe('JSON string of BrandIdentity from generate_brand_identity'),
      ogTemplate: ogTemplateSchema
        .optional()
        .describe('OG image template: default, article, or social'),
      ogTitle: z.string().max(200).optional().describe('Custom OG image title'),
      ogSubtitle: z.string().max(200).optional().describe('Custom OG image subtitle'),
    },
    async ({ brand: brandJson, ogTemplate, ogTitle, ogSubtitle }) => {
      try {
        const brand: BrandIdentity = JSON.parse(brandJson);
        logger.info({ brandName: brand.name }, 'Generating brand assets');

        const iconSvg = brand.logo?.variants?.icon ?? brand.logo?.svg ?? '';
        const favicons = iconSvg ? generateFavicons(iconSvg, brand.colors.primary.hex) : null;

        const ogImage = generateOgImage(brand, ogTemplate ?? 'default', ogTitle, ogSubtitle);

        const result = { favicons, ogImage };

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error generating assets: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
