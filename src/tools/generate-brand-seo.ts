import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandSeo } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandSeo(server: McpServer): void {
  server.tool(
    'generate_brand_seo',
    'Generate a comprehensive SEO strategy for a brand including keyword targeting, content types, link building, and technical priorities',
    {
      brand: z.string().describe('Brand identity JSON from generate_brand_identity'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandSeo(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
