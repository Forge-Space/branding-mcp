import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  generateColorPalette,
  generateTypographySystem,
  generateSpacingScale,
  generateShadowSystem,
  generateBorderSystem,
  generateMotionSystem,
  generateGradientSystem,
  generateSvgLogo,
  defaultLogoConfig,
  exportDesignTokens,
  exportCssVariables,
  exportTailwindPreset,
  exportFigmaTokens,
  exportReactTheme,
  exportSassVariables,
  exportStyleDictionary,
} from '../lib/branding-core/index.js';
import {
  brandStyleSchema,
  colorHarmonySchema,
  colorThemeSchema,
  exportFormatSchema,
  fontCategorySchema,
  hexColorSchema,
  typeScaleRatioSchema,
} from '../lib/branding-core/validators/token-schema.js';
import type { BrandIdentity, BrandStyle, ExportFormat, FontCategory } from '../lib/types.js';
import { logger } from '../lib/logger.js';

const STYLE_DEFAULTS: Record<BrandStyle, { heading: FontCategory; body: FontCategory }> = {
  minimal: { heading: 'sans-serif', body: 'sans-serif' },
  bold: { heading: 'display', body: 'sans-serif' },
  elegant: { heading: 'serif', body: 'serif' },
  playful: { heading: 'display', body: 'sans-serif' },
  corporate: { heading: 'sans-serif', body: 'sans-serif' },
  tech: { heading: 'sans-serif', body: 'monospace' },
  organic: { heading: 'serif', body: 'sans-serif' },
  retro: { heading: 'display', body: 'serif' },
};

const EXPORTERS: Record<ExportFormat, (brand: BrandIdentity) => string | object> = {
  json: exportDesignTokens,
  css: exportCssVariables,
  tailwind: exportTailwindPreset,
  figma: exportFigmaTokens,
  react: exportReactTheme,
  sass: exportSassVariables,
  'style-dictionary': exportStyleDictionary,
};

function buildIdentity(params: {
  brandName: string;
  industry: string;
  style: BrandStyle;
  tagline?: string;
  baseColor?: string;
  harmony?: string;
  theme?: string;
  headingCategory?: FontCategory;
  bodyCategory?: FontCategory;
  scaleRatio?: string;
}): BrandIdentity {
  const defaults = STYLE_DEFAULTS[params.style];
  const harmony = (params.harmony ?? 'complementary') as Parameters<typeof generateColorPalette>[1];
  const theme = params.theme as Parameters<typeof generateColorPalette>[2];
  const scaleRatio = (params.scaleRatio ?? 'major-third') as Parameters<
    typeof generateTypographySystem
  >[2];

  const colors = generateColorPalette(params.baseColor, harmony, theme);
  const typography = generateTypographySystem(
    params.headingCategory ?? defaults.heading,
    params.bodyCategory ?? defaults.body,
    scaleRatio
  );
  const spacing = generateSpacingScale();
  const shadows = generateShadowSystem(colors.primary.hex, theme);
  const borders = generateBorderSystem(params.style);
  const motion = generateMotionSystem(params.style);
  const gradients = generateGradientSystem(colors, params.style);
  const logoConfig = {
    ...defaultLogoConfig(params.brandName, colors.primary.hex),
    font: typography.headingFont,
    style: params.style,
  };
  const logo = generateSvgLogo(logoConfig);

  return {
    id: `brand_${randomUUID().slice(0, 8)}`,
    name: params.brandName,
    tagline: params.tagline,
    industry: params.industry,
    style: params.style,
    colors,
    typography,
    spacing,
    shadows,
    borders,
    motion,
    gradients,
    logo,
    createdAt: new Date().toISOString(),
  };
}

export function registerGenerateDesignSystem(server: McpServer): void {
  server.tool(
    'generate_design_system',
    'Generate a complete design system with brand identity and exported tokens in one call. ' +
      'Combines generate_brand_identity + export_design_tokens for a streamlined workflow.',
    {
      brandName: z.string().min(1).max(100).describe('Brand name'),
      industry: z.string().min(1).max(100).describe('Industry or sector'),
      style: brandStyleSchema.describe('Visual style direction'),
      tagline: z.string().max(200).optional().describe('Brand tagline'),
      baseColor: hexColorSchema.optional().describe('Base color preference'),
      harmony: colorHarmonySchema.optional().describe('Color harmony type'),
      theme: colorThemeSchema.optional().describe('Light/dark/both'),
      headingCategory: fontCategorySchema.optional().describe('Heading font category'),
      bodyCategory: fontCategorySchema.optional().describe('Body font category'),
      scaleRatio: typeScaleRatioSchema.optional().describe('Typography scale ratio'),
      exportFormats: z
        .array(exportFormatSchema)
        .min(1)
        .max(6)
        .describe('Token export formats to include'),
    },
    async (params) => {
      try {
        logger.info(
          { brandName: params.brandName, formats: params.exportFormats },
          'Generating design system'
        );

        const identity = buildIdentity(params);
        const exports: Record<string, string> = {};

        for (const format of params.exportFormats) {
          const exporter = EXPORTERS[format];
          const result = exporter(identity);
          exports[format] = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
        }

        const output = {
          identity,
          exports,
        };

        return {
          content: [{ type: 'text' as const, text: JSON.stringify(output, null, 2) }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: 'text' as const, text: `Error generating design system: ${message}` }],
          isError: true,
        };
      }
    }
  );
}
