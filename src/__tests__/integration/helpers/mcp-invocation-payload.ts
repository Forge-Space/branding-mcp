import { GENERATED_BRAND_PLACEHOLDER, type McpToolMatrixEntry } from './mcp-tool-matrix.js';
import { registerInTestServer } from './mcp-test-server.js';

type ToolResponse = { content: Array<{ type: string; text: string }> };

export async function createInvocationContext(): Promise<{
  server: ReturnType<typeof registerInTestServer>;
  hydrateEntryPayload: (entry: McpToolMatrixEntry) => Record<string, unknown>;
}> {
  const server = registerInTestServer();
  const generatedBrandJson = await generateBrandIdentity(server);

  return {
    server,
    hydrateEntryPayload: (entry) => hydratePayload(entry.minimalPayload, generatedBrandJson),
  };
}

async function generateBrandIdentity(
  server: ReturnType<typeof registerInTestServer>
): Promise<string> {
  const response = (await server.callTool('generate_brand_identity', {
    brandName: 'Acme Health',
    industry: 'healthcare',
    style: 'minimal',
  })) as ToolResponse;

  return response.content[0]?.text ?? '';
}

function hydratePayload(
  payload: Record<string, unknown>,
  generatedBrandJson: string
): Record<string, unknown> {
  if (payload.brand !== GENERATED_BRAND_PLACEHOLDER) {
    return payload;
  }

  return { ...payload, brand: generatedBrandJson };
}
