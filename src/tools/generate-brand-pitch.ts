import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandPitch } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandPitch(server: McpServer): void {
  server.tool(
    'generate_brand_pitch',
    'Generate a compelling brand pitch including elevator pitches, pitch deck outline, UVP, and investor highlights',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandPitch(brandData);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
}
