import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateBrandSocial } from '../lib/branding-core/generators/brand-social.js';
import type { BrandIdentity } from '../lib/types.js';
import { logger } from '../lib/logger.js';

export function registerGenerateBrandSocial(server: McpServer): void {
  server.tool(
    'generate_brand_social',
    'Generate a complete social media strategy for a brand — platform configs, content pillars, bio variations, branded hashtags, posting schedule, content calendar, and voice guidelines adapted to the brand style and industry.',
    {
      brand: z.string().describe('Full BrandIdentity JSON (from generate_brand_identity output)'),
    },
    async ({ brand }) => {
      try {
        logger.info('Generating brand social media strategy');
        const brandData: BrandIdentity = JSON.parse(brand);
        const social = generateBrandSocial(brandData);

        return {
          content: [{ type: 'text', text: JSON.stringify(social, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error generating brand social strategy: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
