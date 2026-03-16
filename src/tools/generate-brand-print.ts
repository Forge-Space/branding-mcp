import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandPrint } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandPrint(server: McpServer): void {
  server.tool(
    'generate_brand_print',
    'Generate print design guidelines including grid system, paper stocks, finishes, templates, colour specs, accessibility notes, and production checklist.',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandPrint(brandData);
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
