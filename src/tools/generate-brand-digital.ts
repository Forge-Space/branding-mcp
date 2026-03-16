import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandDigital } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandDigital(server: McpServer): void {
  server.tool(
    'generate_brand_digital',
    'Generate digital/UX brand guidelines including UI language, component specs, accessibility requirements, and design token snippets',
    {
      brand: z.string().describe('BrandIdentity JSON object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandDigital(brandData);
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
