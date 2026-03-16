import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandUx } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandUx(server: McpServer): void {
  server.tool(
    'generate_brand_ux',
    'Generate UX writing guidelines, microcopy, form patterns, and content strategy for a brand.',
    {
      brand: z
        .string()
        .describe('JSON string of a BrandIdentity object from generate_brand_identity'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandUx(brandData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
}
