import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  exportDesignTokens,
  exportCssVariables,
  exportTailwindPreset,
  exportFigmaTokens,
  exportReactTheme,
  exportSassVariables,
} from '../lib/branding-core/index.js';
import { exportFormatSchema } from '../lib/branding-core/validators/token-schema.js';
import type { BrandIdentity, ExportFormat } from '../lib/types.js';
import { logger } from '../lib/logger.js';

const EXPORTERS: Record<ExportFormat, (brand: BrandIdentity) => string | object> = {
  json: exportDesignTokens,
  css: exportCssVariables,
  tailwind: exportTailwindPreset,
  figma: exportFigmaTokens,
  react: exportReactTheme,
  sass: exportSassVariables,
};

export function registerExportDesignTokens(server: McpServer): void {
  server.tool(
    'export_design_tokens',
    'Export a brand identity as design tokens in various formats: W3C JSON, CSS custom properties, Tailwind preset, Figma tokens, React theme, or Sass variables.',
    {
      brand: z.string().describe('Full BrandIdentity JSON (from generate_brand_identity output)'),
      format: exportFormatSchema.describe('Export format'),
    },
    async ({ brand, format }) => {
      try {
        logger.info({ format }, 'Exporting design tokens');
        const brandData: BrandIdentity = JSON.parse(brand);
        const exporter = EXPORTERS[format];
        const result = exporter(brandData);
        const output = typeof result === 'string' ? result : JSON.stringify(result, null, 2);

        return {
          content: [{ type: 'text', text: output }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text', text: `Error exporting tokens: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
