import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandInvestor } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';
import { logger } from '../lib/logger.js';

export function registerGenerateBrandInvestor(server: McpServer): void {
  server.tool(
    'generate_brand_investor',
    'Generate investor relations materials including pitch deck structure, investment thesis, competitive moat, use of funds, due diligence checklist, and FAQ answers aligned to your brand style.',
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      try {
        const brandData = JSON.parse(brand) as BrandIdentity;
        const result = generateBrandInvestor(brandData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        logger.error({ error }, 'Failed to generate brand investor materials');
        throw error;
      }
    }
  );
}
