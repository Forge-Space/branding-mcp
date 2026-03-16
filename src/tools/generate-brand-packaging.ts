import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandPackaging } from '../lib/branding-core/generators/brand-packaging.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandPackaging(server: McpServer): void {
  server.tool(
    'generate_brand_packaging',
    'Generate packaging design guidelines including form language, materials, print specs, and sustainability notes',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandPackaging(brandData);
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
