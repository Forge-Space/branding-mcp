import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { interpretFeedback, applyIntent } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';
import type { InterpreterStrategy } from '../lib/branding-core/index.js';
import { loadConfig } from '../lib/config.js';
import { logger } from '../lib/logger.js';

export function registerRefineBrandElement(server: McpServer): void {
  server.tool(
    'refine_brand_element',
    'Refine a specific element of an existing brand identity using natural language feedback. Uses AI interpretation when available, keyword matching as fallback.',
    {
      brand: z.string().describe('Full BrandIdentity JSON'),
      element: z.enum(['colors', 'typography', 'spacing']).describe('Element to refine'),
      feedback: z
        .string()
        .describe(
          'Natural language feedback (e.g. "make it feel more premium and understated", "use serif headings with dramatic scale")'
        ),
      strategy: z
        .enum(['keyword', 'ai', 'auto'])
        .optional()
        .describe(
          'Interpretation strategy: keyword (fast), ai (Claude API), auto (ai if key available)'
        ),
    },
    async ({ brand, element, feedback, strategy }) => {
      try {
        logger.info({ element, feedback, strategy }, 'Refining brand element');
        const brandData: BrandIdentity = JSON.parse(brand);
        const config = loadConfig();

        const intent = await interpretFeedback(
          feedback,
          element,
          brandData,
          (strategy as InterpreterStrategy) ?? 'auto',
          { anthropicApiKey: config.anthropicApiKey }
        );

        const refined = applyIntent(brandData, intent);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                { ...refined, _interpretation: { strategy: strategy ?? 'auto', ...intent } },
                null,
                2
              ),
            },
          ],
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
