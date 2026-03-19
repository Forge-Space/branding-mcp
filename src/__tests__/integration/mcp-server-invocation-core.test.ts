import { CORE_MCP_TOOL_MATRIX, GENERATED_BRAND_PLACEHOLDER } from './helpers/mcp-tool-matrix.js';
import { registerInTestServer } from './helpers/mcp-test-server.js';
import { assertMcpTextResponse } from './helpers/mcp-contract-assertions.js';

describe('MCP core tool invocation contract', () => {
  const server = registerInTestServer();
  let generatedBrandJson = '';

  beforeAll(async () => {
    const response = (await server.callTool('generate_brand_identity', {
      brandName: 'Acme Health',
      industry: 'healthcare',
      style: 'minimal',
    })) as { content: Array<{ type: string; text: string }> };

    generatedBrandJson = response.content[0]?.text ?? '';
  });

  function hydratePayload(payload: Record<string, unknown>): Record<string, unknown> {
    const next = { ...payload };
    if (next.brand === GENERATED_BRAND_PLACEHOLDER) {
      next.brand = generatedBrandJson;
    }
    return next;
  }

  it.each(CORE_MCP_TOOL_MATRIX)('returns MCP text response for %s', async (entry) => {
    const result = await server.callTool(entry.toolName, hydratePayload(entry.minimalPayload));
    assertMcpTextResponse(entry.toolName, result);
  });
});
