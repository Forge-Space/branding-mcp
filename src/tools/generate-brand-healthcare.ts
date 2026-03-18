import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandHealthcare } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandHealthcare(server: McpServer): void {
  server.tool(
    'generate_brand_healthcare',
    'Generate healthcare-specific brand strategy covering care segments, patient safety, service delivery, and compliance posture.',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      let brandData: BrandIdentity;

      try {
        brandData = JSON.parse(brand) as BrandIdentity;
      } catch {
        throw new Error('Invalid brand payload: expected a valid JSON string for BrandIdentity.');
      }

      const result = generateBrandHealthcare(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
