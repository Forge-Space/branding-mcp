import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateBrandNaming } from '../lib/branding-core/generators/brand-naming.js';
import type { BrandIdentity } from '../lib/types.js';
import { logger } from '../lib/logger.js';

export function registerGenerateBrandNaming(server: McpServer): void {
  server.tool(
    'generate_brand_naming',
    'Generate brand name ideas, tagline variations, domain suggestions, and hashtags based on a brand identity. Returns five name concepts (descriptive, evocative, abstract, acronym, portmanteau), five tagline options, five domain formats, eight hashtags, and a naming rationale.',
    {
      brand: z.string().describe('Full BrandIdentity JSON (from generate_brand_identity output)'),
    },
    async ({ brand }) => {
      try {
        logger.info('Generating brand naming suggestions');
        const brandData: BrandIdentity = JSON.parse(brand);
        const naming = generateBrandNaming(brandData);

        return {
          content: [{ type: 'text', text: JSON.stringify(naming, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error generating brand naming: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
