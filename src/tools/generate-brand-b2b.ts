import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandB2b } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandB2b(server: McpServer): void {
  server.tool(
    'generate_brand_b2b',
    'Generate B2B brand strategy: ICP, sales approach, ABM, buyer journey, and sales enablement.',
    { brand: z.string().describe('JSON string of BrandIdentity object') },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandB2b(brandData);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
