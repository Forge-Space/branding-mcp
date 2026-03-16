import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandSubscription } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandSubscription(server: McpServer): void {
  server.tool(
    'generate_brand_subscription',
    'Generate a subscription model strategy including pricing tiers, billing cadence, retention tactics, churn prevention, and onboarding flow.',
    {
      brand: z.string().describe('JSON string of a BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandSubscription(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
