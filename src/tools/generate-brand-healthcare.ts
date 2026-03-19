import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { generateBrandHealthcare } from '../lib/branding-core/index.js';
import { registerBrandTool } from './brand-tool.js';

export function registerGenerateBrandHealthcare(server: McpServer): void {
  registerBrandTool(
    server,
    'generate_brand_healthcare',
    'Generate healthcare-specific brand strategy covering care segments, patient safety, service delivery, and compliance posture.',
    generateBrandHealthcare
  );
}
