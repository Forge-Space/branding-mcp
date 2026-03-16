import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandAudio } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandAudio(server: McpServer): void {
  server.tool(
    'generate_brand_audio',
    'Generate sonic brand identity: musical direction, UI sounds, jingle brief, podcast strategy, and voiceover direction.',
    {
      brand: z.string().describe('JSON string of a BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandAudio(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
