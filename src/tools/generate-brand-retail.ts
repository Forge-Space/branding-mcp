import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandRetail } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandRetail(server: McpServer): void {
  server.tool(
    'generate_brand_retail',
    'Generate retail store experience guidelines including layout, materials, signage, display systems, customer journey, and staff guidance',
    {
      brand: z.string().describe('Brand identity JSON string (from generate_brand_identity)'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandRetail(brandData);
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
