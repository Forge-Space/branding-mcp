import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandEmployer } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandEmployer(server: McpServer): void {
  server.tool(
    'generate_brand_employer',
    'Generate employer branding: EVP statement, culture pillars, benefits framing, candidate personas, interview and onboarding approach, and job-ad guidelines.',
    {
      brand: z
        .string()
        .describe('JSON string of a BrandIdentity object (from generate_brand_identity)'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandEmployer(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
