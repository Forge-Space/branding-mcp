import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandEcommerce } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandEcommerce(server: McpServer): void {
  server.tool(
    'generate_brand_ecommerce',
    'Generate ecommerce strategy and UX guidelines for a brand including store concept, product page layout, checkout principles, merchandising, trust signals, SEO, and accessibility',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandEcommerce(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
