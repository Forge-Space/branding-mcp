import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandPartnership } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandPartnership(server: McpServer): void {
  server.tool(
    'generate_brand_partnership',
    'Generate a brand partnership strategy including ideal partner profiles, collaboration formats, outreach templates, and negotiation principles.',
    {
      brand: z.string().describe('The brand identity as a JSON string'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandPartnership(brandData);
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
