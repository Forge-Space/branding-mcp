import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandInterior } from '../lib/branding-core/generators/brand-interior.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandInterior(server: McpServer): void {
  server.tool(
    'generate_brand_interior',
    'Generate interior design direction and spatial branding guidelines for a brand',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandInterior(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
