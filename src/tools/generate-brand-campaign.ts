import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandCampaign } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandCampaign(server: McpServer): void {
  server.tool(
    'generate_brand_campaign',
    'Generate a full marketing campaign strategy including themes, channels, phases, messaging pillars, and success metrics',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const campaign = generateBrandCampaign(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(campaign, null, 2) }],
      };
    }
  );
}
