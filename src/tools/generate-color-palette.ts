import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateColorPalette } from '../lib/branding-core/index.js';
import {
  colorHarmonySchema,
  colorThemeSchema,
  hexColorSchema,
} from '../lib/branding-core/validators/token-schema.js';
import { logger } from '../lib/logger.js';

export function registerGenerateColorPalette(server: McpServer): void {
  server.tool(
    'generate_color_palette',
    'Generate a harmonious color palette with WCAG contrast validation. Supports complementary, analogous, triadic, split-complementary, tetradic, and monochromatic harmonies.',
    {
      baseColor: hexColorSchema
        .optional()
        .describe('Base hex color to build palette from (e.g. #6B4CE6)'),
      harmony: colorHarmonySchema.optional().describe('Color harmony type'),
      theme: colorThemeSchema.optional().describe('Light, dark, or both neutral scales'),
    },
    async ({ baseColor, harmony, theme }) => {
      try {
        logger.info({ baseColor, harmony, theme }, 'Generating color palette');
        const palette = generateColorPalette(baseColor, harmony, theme);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(palette, null, 2),
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error generating palette: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
