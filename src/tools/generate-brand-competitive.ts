import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandCompetitive } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandCompetitive(server: McpServer): void {
  server.tool(
    'generate_brand_competitive',
    'Generate competitive intelligence and positioning strategy for a brand including competitor profiles, positioning matrix, win/loss themes, and objection handling playbooks',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandCompetitive(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
