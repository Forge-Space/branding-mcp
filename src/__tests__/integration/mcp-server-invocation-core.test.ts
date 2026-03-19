import { CORE_MCP_TOOL_MATRIX } from './helpers/mcp-tool-matrix.js';
import { assertMcpTextResponse } from './helpers/mcp-contract-assertions.js';
import { createInvocationContext } from './helpers/mcp-invocation-payload.js';

describe('MCP core tool invocation contract', () => {
  let context: Awaited<ReturnType<typeof createInvocationContext>>;

  beforeAll(async () => {
    context = await createInvocationContext();
  });

  it.each(CORE_MCP_TOOL_MATRIX)('returns MCP text response for %s', async (entry) => {
    const result = await context.server.callTool(
      entry.toolName,
      context.hydrateEntryPayload(entry)
    );
    assertMcpTextResponse(entry.toolName, result);
  });
});
