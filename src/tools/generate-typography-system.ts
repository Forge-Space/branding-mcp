import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateTypographySystem } from '../lib/branding-core/index.js';
import {
  fontCategorySchema,
  typeScaleRatioSchema,
} from '../lib/branding-core/validators/token-schema.js';
import { logger } from '../lib/logger.js';

export function registerGenerateTypographySystem(server: McpServer): void {
  server.tool(
    'generate_typography_system',
    'Generate a typography system with font pairing, modular type scale, and line heights. Uses curated font pairings for visual harmony.',
    {
      headingCategory: fontCategorySchema.optional().describe('Font category for headings'),
      bodyCategory: fontCategorySchema.optional().describe('Font category for body text'),
      scaleRatio: typeScaleRatioSchema.optional().describe('Modular scale ratio'),
      baseSize: z.number().min(12).max(24).optional().describe('Base font size in pixels'),
    },
    async ({ headingCategory, bodyCategory, scaleRatio, baseSize }) => {
      try {
        logger.info({ headingCategory, bodyCategory, scaleRatio }, 'Generating typography system');
        const system = generateTypographySystem(
          headingCategory,
          bodyCategory,
          scaleRatio,
          baseSize
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(system, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error generating typography: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
