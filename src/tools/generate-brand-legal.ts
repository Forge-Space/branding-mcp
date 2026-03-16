import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandLegal } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandLegal(server: McpServer): void {
  server.tool(
    'generate_brand_legal',
    'Generate brand legal guidelines including trademark usage, copyright notices, privacy compliance, disclaimers, and licensing terms.',
    {
      brand: z
        .string()
        .describe('JSON string of the BrandIdentity object (from generate_brand_identity)'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandLegal(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
