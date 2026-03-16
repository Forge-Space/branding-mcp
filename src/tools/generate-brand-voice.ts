import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateBrandVoice } from '../lib/branding-core/generators/brand-voice.js';
import type { BrandIdentity, BrandVoiceTone, BrandVoiceAudience } from '../lib/types.js';
import { logger } from '../lib/logger.js';

const brandVoiceToneSchema = z.enum([
  'professional',
  'friendly',
  'playful',
  'authoritative',
  'empathetic',
  'inspirational',
  'minimalist',
  'bold',
]);

const brandVoiceAudienceSchema = z.enum([
  'b2b',
  'b2c',
  'enterprise',
  'startup',
  'consumer',
  'technical',
  'creative',
  'general',
]);

export function registerGenerateBrandVoice(server: McpServer): void {
  server.tool(
    'generate_brand_voice',
    "Generate brand voice and tone guidelines including vocabulary, copy samples, tagline suggestions, and do/don't rules based on a brand identity.",
    {
      brand: z.string().describe('Full BrandIdentity JSON (from generate_brand_identity output)'),
      tone: brandVoiceToneSchema
        .optional()
        .describe('Override the inferred tone. If omitted, tone is derived from brand style.'),
      audience: brandVoiceAudienceSchema
        .optional()
        .describe(
          'Override the inferred target audience. If omitted, audience is derived from industry.'
        ),
    },
    async ({ brand, tone, audience }) => {
      try {
        logger.info({ tone, audience }, 'Generating brand voice guidelines');
        const brandData: BrandIdentity = JSON.parse(brand);
        const guidelines = generateBrandVoice(
          brandData,
          tone as BrandVoiceTone | undefined,
          audience as BrandVoiceAudience | undefined
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(guidelines, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error generating brand voice: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
