import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandLoyalty } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandLoyalty(server: McpServer): void {
  server.tool(
    'generate_brand_loyalty',
    'Generate a complete loyalty programme strategy including tiers, earn/redeem mechanics, engagement tactics, and KPIs tailored to the brand style.',
    {
      brand: z.string().describe('Brand identity JSON string'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandLoyalty(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
