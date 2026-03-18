import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateBrandFintech } from '../lib/branding-core/index.js';
import { registerBrandTool } from './brand-tool.js';

export function registerGenerateBrandFintech(server: McpServer): void {
  registerBrandTool(
    server,
    'generate_brand_fintech',
    'Generate fintech-specific brand strategy including products, compliance, regulatory framework, and security posture',
    generateBrandFintech
  );
}
