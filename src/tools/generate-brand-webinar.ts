import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandWebinar } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandWebinar(server: McpServer): void {
  server.tool(
    'generate_brand_webinar',
    'Generate a webinar and virtual event brand strategy including formats, promotion, engagement, and follow-up',
    { brand: z.string().describe('BrandIdentity JSON object') },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandWebinar(brandData);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
