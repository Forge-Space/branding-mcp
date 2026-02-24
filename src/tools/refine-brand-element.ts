import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateColorPalette, generateTypographySystem } from '../lib/branding-core/index.js';
import type { BrandIdentity, ColorHarmony } from '../lib/types.js';
import { logger } from '../lib/logger.js';

export function registerRefineBrandElement(server: McpServer): void {
  server.tool(
    'refine_brand_element',
    'Refine a specific element of an existing brand identity. Adjust colors, typography, or other elements while maintaining overall consistency.',
    {
      brand: z.string().describe('Full BrandIdentity JSON'),
      element: z.enum(['colors', 'typography', 'spacing']).describe('Element to refine'),
      feedback: z
        .string()
        .describe('What to change (e.g. "make colors warmer", "use serif headings")'),
    },
    async ({ brand, element, feedback }) => {
      try {
        logger.info({ element, feedback }, 'Refining brand element');
        const brandData: BrandIdentity = JSON.parse(brand);
        const lower = feedback.toLowerCase();

        if (element === 'colors') {
          let harmony: ColorHarmony = 'complementary';
          if (lower.includes('analogous') || lower.includes('warm') || lower.includes('subtle')) {
            harmony = 'analogous';
          } else if (lower.includes('triadic') || lower.includes('vibrant')) {
            harmony = 'triadic';
          } else if (lower.includes('mono')) {
            harmony = 'monochromatic';
          }
          brandData.colors = generateColorPalette(brandData.colors.primary.hex, harmony);
        } else if (element === 'typography') {
          const headingCat = lower.includes('serif') ? ('serif' as const) : ('sans-serif' as const);
          const bodyCat = lower.includes('mono') ? ('monospace' as const) : ('sans-serif' as const);
          brandData.typography = generateTypographySystem(headingCat, bodyCat);
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(brandData, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error refining element: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
