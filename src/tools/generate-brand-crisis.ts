import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandCrisis } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandCrisis(server: McpServer): void {
  server.tool(
    'generate_brand_crisis',
    'Generate a brand crisis communications framework with response phases, stakeholder matrix, and monitoring guidelines',
    {
      brand: z.string().describe('JSON string of the BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandCrisis(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
