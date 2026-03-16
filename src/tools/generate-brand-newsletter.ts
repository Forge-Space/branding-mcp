import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandNewsletter } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandNewsletter(server: McpServer): void {
  server.tool(
    'generate_brand_newsletter',
    'Generate comprehensive newsletter strategy, templates, and guidelines for a brand',
    {
      brand: z.string().describe('Brand identity JSON (from generate_brand_identity)'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandNewsletter(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
