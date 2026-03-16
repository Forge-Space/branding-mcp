import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateBrandMotion } from '../lib/branding-core/generators/brand-motion.js';
import type { BrandIdentity } from '../lib/types.js';
import { logger } from '../lib/logger.js';

export function registerGenerateBrandMotion(server: McpServer): void {
  server.tool(
    'generate_brand_motion',
    'Generate a complete motion design system for a brand — including timing tokens, easing curves, transition presets, animation scale (minimal/moderate/dramatic), design principles, and CSS custom properties. Motion is derived from the brand style and personality.',
    {
      brand: z.string().describe('Full BrandIdentity JSON (from generate_brand_identity output)'),
    },
    async ({ brand }) => {
      try {
        logger.info('Generating brand motion system');
        const brandData: BrandIdentity = JSON.parse(brand);
        const motion = generateBrandMotion(brandData);

        return {
          content: [{ type: 'text', text: JSON.stringify(motion, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error generating brand motion: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
