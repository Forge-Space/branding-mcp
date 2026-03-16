#!/usr/bin/env node

export type {
  BrandIdentity,
  ColorPalette,
  TypographySystem,
  SpacingScale,
  ShadowSystem,
  BorderSystem,
  MotionSystem,
  GradientSystem,
  LogoOutput,
  BrandStyle,
  ColorHarmony,
  ExportFormat,
  BrandVoiceGuidelines,
  BrandVoiceTone,
  BrandVoiceAudience,
  BrandNamingOutput,
  NameIdea,
  DomainSuggestion,
  BrandMotionOutput,
  BrandMotionPrinciple,
  BrandSocialOutput,
  SocialPlatformConfig,
  ContentPillar,
  BrandPitchOutput,
  ElevatorPitch,
  PitchDeckSlide,
  InvestorHighlight,
  BrandEmailOutput,
  EmailTemplate,
  EmailCampaign,
  BrandPhotographyOutput,
  PhotoStyleGuide,
  PhotoCompositionRule,
  PhotoColorTreatment,
  BrandCampaignOutput,
  CampaignChannel,
  CampaignPhase,
  BrandPackagingOutput,
  PackagingFormat,
  BrandPrintOutput,
  PrintTemplate,
  PrintColourSpec,
  PrintAccessibility,
  BrandRetailOutput,
  RetailWindowDisplay,
  BrandEventOutput,
  EventFormat,
  BrandInteriorOutput,
  InteriorSpaceZone,
  BrandDigitalOutput,
  DigitalComponentSpec,
  DigitalAccessibilitySpec,
  BrandUxOutput,
} from './lib/types.js';

import { parseArgs } from 'node:util';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { loadConfig } from './lib/config.js';
import { logger } from './lib/logger.js';
import { startHttpServer } from './lib/http-server.js';

import { registerGenerateBrandIdentity } from './tools/generate-brand-identity.js';
import { registerGenerateColorPalette } from './tools/generate-color-palette.js';
import { registerGenerateTypographySystem } from './tools/generate-typography-system.js';
import { registerExportDesignTokens } from './tools/export-design-tokens.js';
import { registerCreateBrandGuidelines } from './tools/create-brand-guidelines.js';
import { registerValidateBrandConsistency } from './tools/validate-brand-consistency.js';
import { registerRefineBrandElement } from './tools/refine-brand-element.js';
import { registerGenerateBrandAssets } from './tools/generate-brand-assets.js';
import { registerGenerateDesignSystem } from './tools/generate-design-system.js';
import { registerGenerateBrandVoice } from './tools/generate-brand-voice.js';
import { registerGenerateBrandNaming } from './tools/generate-brand-naming.js';
import { registerGenerateBrandMotion } from './tools/generate-brand-motion.js';
import { registerGenerateBrandSocial } from './tools/generate-brand-social.js';
import { registerGenerateBrandPitch } from './tools/generate-brand-pitch.js';
import { registerGenerateBrandEmail } from './tools/generate-brand-email.js';
import { registerGenerateBrandPhotography } from './tools/generate-brand-photography.js';
import { registerGenerateBrandCampaign } from './tools/generate-brand-campaign.js';
import { registerGenerateBrandPackaging } from './tools/generate-brand-packaging.js';
import { registerGenerateBrandPrint } from './tools/generate-brand-print.js';
import { registerGenerateBrandRetail } from './tools/generate-brand-retail.js';
import { registerGenerateBrandEvent } from './tools/generate-brand-event.js';
import { registerGenerateBrandInterior } from './tools/generate-brand-interior.js';
import { registerGenerateBrandDigital } from './tools/generate-brand-digital.js';
import { registerGenerateBrandUx } from './tools/generate-brand-ux.js';

import { registerBrandTemplates } from './resources/brand-templates.js';
import { registerBrandKnowledge } from './resources/brand-knowledge.js';

async function main(): Promise<void> {
  const { values: cliArgs } = parseArgs({
    args: process.argv.slice(2),
    options: { transport: { type: 'string' } },
    strict: false,
  });

  if (cliArgs.transport) {
    process.env.MCP_TRANSPORT = cliArgs.transport as string;
  }

  const config = loadConfig();
  logger.info({ env: config.nodeEnv }, 'Starting branding-mcp server');

  const server = new McpServer({
    name: '@forgespace/branding-mcp',
    version: '0.22.0',
  });

  registerGenerateBrandIdentity(server);
  registerGenerateColorPalette(server);
  registerGenerateTypographySystem(server);
  registerExportDesignTokens(server);
  registerCreateBrandGuidelines(server);
  registerValidateBrandConsistency(server);
  registerRefineBrandElement(server);
  registerGenerateBrandAssets(server);
  registerGenerateDesignSystem(server);
  registerGenerateBrandVoice(server);
  registerGenerateBrandNaming(server);
  registerGenerateBrandMotion(server);
  registerGenerateBrandSocial(server);
  registerGenerateBrandPitch(server);
  registerGenerateBrandEmail(server);
  registerGenerateBrandPhotography(server);
  registerGenerateBrandCampaign(server);
  registerGenerateBrandPackaging(server);
  registerGenerateBrandPrint(server);
  registerGenerateBrandRetail(server);
  registerGenerateBrandEvent(server);
  registerGenerateBrandInterior(server);
  registerGenerateBrandDigital(server);
  registerGenerateBrandUx(server);

  registerBrandTemplates(server);
  registerBrandKnowledge(server);

  if (config.transport === 'http') {
    await startHttpServer(server, config.port);
  } else {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    logger.info('Branding MCP server connected via stdio');
  }
}

main().catch((error) => {
  logger.fatal(error, 'Failed to start branding-mcp server');
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down');
  process.exit(0);
});
