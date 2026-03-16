import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandCustomer } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandCustomer(server: McpServer): void {
  server.tool(
    'generate_brand_customer',
    'Generate a comprehensive customer experience strategy including personas, journey stages, loyalty programmes, support tone, and VoC plan',
    {
      brand: z.string().describe('Brand identity JSON string from generate_brand_identity'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandCustomer(brandData);
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
