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
    version: '0.8.0',
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
