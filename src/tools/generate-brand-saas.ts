import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandSaas } from '../lib/branding-core/generators/brand-saas.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandSaas(server: McpServer): void {
  server.tool(
    'generate_brand_saas',
    'Generate SaaS-specific brand strategy including positioning, pricing, onboarding, retention, integrations, and compliance.',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandSaas(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
