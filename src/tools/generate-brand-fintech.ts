import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandFintech } from '../lib/branding-core/index.js';
import { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandFintech(server: McpServer): void {
  server.tool(
    'generate_brand_fintech',
    'Generate fintech-specific brand strategy including products, compliance, regulatory framework, and security posture',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandFintech(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
