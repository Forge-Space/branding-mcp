import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { BrandIdentity } from '../lib/types.js';

type StrategyGenerator<T> = (brand: BrandIdentity) => T;

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
      const brandData = JSON.parse(brand) as BrandIdentity;
      const result = generator(brandData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
