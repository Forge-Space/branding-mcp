import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandCommunity } from '../lib/branding-core/index.js';

export function registerGenerateBrandCommunity(server: McpServer): void {
  server.tool(
    'generate_brand_community',
    'Generate community strategy including platforms, engagement tactics, moderation, member recognition, and growth levers',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand);
      const result = generateBrandCommunity(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
