import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandEmail } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandEmail(server: McpServer): void {
  server.tool(
    'generate_brand_email',
    'Generate email marketing templates, campaigns, and guidelines for a brand',
    {
      brand: z
        .string()
        .describe('JSON string of BrandIdentity object from generate_brand_identity'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandEmail(brandData);
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
