import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { BrandIdentity } from '../lib/types.js';

type StrategyGenerator<T> = (brand: BrandIdentity) => T;

function parseBrandIdentity(brand: string): BrandIdentity {
  try {
    return JSON.parse(brand) as BrandIdentity;
  } catch {
    throw new Error('Invalid brand payload: expected a valid JSON string for BrandIdentity.');
  }
}

export function registerBrandTool<T>(
  server: McpServer,
  name: string,
  description: string,
  generator: StrategyGenerator<T>
): void {
  server.tool(
    name,
    description,
    {
      brand: z.string().describe('JSON string of BrandIdentity object'),
    },
    async ({ brand }) => {
      const brandData = parseBrandIdentity(brand);
      const result = generator(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
