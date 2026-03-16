import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandSustainability } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandSustainability(server: McpServer): void {
  server.tool(
    'generate_brand_sustainability',
    'Generate a brand sustainability and ESG strategy including environmental, social, governance commitments, SDG alignment, certifications, and reporting framework guidance',
    {
      brand: z.string().describe('JSON string of the BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandSustainability(brandData);
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
