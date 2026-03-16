import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandFranchise } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandFranchise(server: McpServer): void {
  server.tool(
    'generate_brand_franchise',
    'Generate franchise brand standards, onboarding, compliance, and licensing guidelines',
    {
      brand: z.string().describe('JSON string of a BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandFranchise(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
