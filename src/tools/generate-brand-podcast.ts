import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandPodcast } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandPodcast(server: McpServer): void {
  server.tool(
    'generate_brand_podcast',
    'Generate a podcast strategy for a brand including show concept, formats, host persona, guest criteria, distribution, and production checklist',
    { brand: z.string().describe('JSON string of BrandIdentity object') },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandPodcast(brandData);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
