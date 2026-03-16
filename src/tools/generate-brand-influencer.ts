import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandInfluencer } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandInfluencer(server: McpServer): void {
  server.tool(
    'generate_brand_influencer',
    'Generate influencer marketing strategy with tiers, content preferences, KPIs, and disclosure guidelines',
    { brand: z.string().describe('JSON string of BrandIdentity object') },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandInfluencer(brandData);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
