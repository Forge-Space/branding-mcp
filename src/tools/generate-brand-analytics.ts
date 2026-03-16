import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandAnalytics } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandAnalytics(server: McpServer): void {
  server.tool(
    'generate_brand_analytics',
    'Generate a brand analytics strategy with KPIs, dashboards, measurement framework, and reporting cadence',
    {
      brand: z.string().describe('JSON string of the BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandAnalytics(brandData);
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
