import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandPr } from '../lib/branding-core/generators/brand-pr.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandPr(server: McpServer): void {
  server.tool(
    'generate_brand_pr',
    'Generate a comprehensive PR and communications strategy including press release templates, media contacts, spokesperson guidelines, crisis protocol, and measurement KPIs.',
    {
      brand: z.string().describe('BrandIdentity JSON object (output of generate_brand_identity)'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandPr(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
