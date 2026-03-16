import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandAccessibility } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandAccessibility(server: McpServer): void {
  server.tool(
    'generate_brand_accessibility',
    'Generate comprehensive accessibility guidelines for a brand, including WCAG compliance targets, colour contrast strategies, focus indicators, motion guidance, and testing protocols',
    {
      brand: z.string().describe('JSON string of a BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandAccessibility(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
