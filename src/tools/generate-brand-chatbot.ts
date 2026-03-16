import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generateBrandChatbot } from '../lib/branding-core/index.js';
import type { BrandIdentity } from '../lib/types.js';

export function registerGenerateBrandChatbot(server: McpServer): void {
  server.tool(
    'generate_brand_chatbot',
    'Generate brand-aligned chatbot persona, tone, conversation guidelines, and escalation rules',
    { brand: z.string().describe('Brand identity JSON') },
    async ({ brand }) => {
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generateBrandChatbot(brandData);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );
}
