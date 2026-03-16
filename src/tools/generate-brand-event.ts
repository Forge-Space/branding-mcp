import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandEvent } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandEvent(server: McpServer): void {
  server.tool(
    'generate_brand_event',
    'Generate comprehensive event planning guidelines for a brand, including venue recommendations, decor themes, catering, entertainment, and event formats.',
    {
      brand: z.string().describe('JSON string of a BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandEvent(brandData);
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
