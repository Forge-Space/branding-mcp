import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { validateBrandConsistency } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';
import { logger } from '../lib/logger.js';

export function registerValidateBrandConsistency(server: McpServer): void {
  server.tool(
    'validate_brand_consistency',
    'Validate a brand identity for completeness, WCAG contrast compliance, and typography best practices. Returns a score (0-100) and actionable issues.',
    {
      brand: z.string().describe('Full BrandIdentity JSON to validate'),
    },
    async ({ brand }) => {
      try {
        logger.info('Validating brand consistency');
        const brandData: BrandIdentity = JSON.parse(brand);
        const result = validateBrandConsistency(brandData);

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error validating brand: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
