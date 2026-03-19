import * as brandingCore from '../../lib/branding-core/index.js';
import { MCP_TOOL_MATRIX } from './helpers/mcp-tool-matrix.js';
import { registerInTestServer } from './helpers/mcp-test-server.js';

describe('MCP tool-to-export consistency', () => {
  it('keeps matrix tool mappings aligned with registered tools and branding-core exports', () => {
    const server = registerInTestServer();
    const registeredNames = new Set(server.getToolNames());

    const unregisteredMatrixTools = MCP_TOOL_MATRIX.filter((entry) => !registeredNames.has(entry.toolName)).map(
      (entry) => entry.toolName
    );
    expect(unregisteredMatrixTools).toEqual([]);

    const missingExportSymbols = MCP_TOOL_MATRIX.filter(
      (entry) => !(entry.expectedExportSymbol in brandingCore)
    ).map((entry) => `${entry.toolName}->${entry.expectedExportSymbol}`);

    if (missingExportSymbols.length > 0) {
      throw new Error(
        `Matrix export symbol mismatch:\n${missingExportSymbols.join('\n')}`
      );
    }
  });
});
