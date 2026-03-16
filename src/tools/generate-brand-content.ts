import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandContent } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandContent(server: McpServer): void {
  server.tool(
    'generate_brand_content',
    'Generate a comprehensive content strategy including editorial tone, content pillars, SEO approach, distribution cadence, and a 4-week content calendar based on brand identity.',
    {
      brand: z
        .string()
        .describe('JSON string of BrandIdentity object (from generate_brand_identity tool)'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandContent(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
