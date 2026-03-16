import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandGlobalisation } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandGlobalisation(server: McpServer): void {
  server.tool(
    'generate_brand_globalisation',
    'Generate international expansion and globalisation guidelines for a brand, including locale adaptations, translation guidelines, cultural sensitivity notes, and compliance requirements.',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandGlobalisation(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
