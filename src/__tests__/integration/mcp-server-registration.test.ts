import { MCP_REGISTERED_TOOL_NAMES } from './helpers/mcp-tool-matrix.js';
import { registerInTestServer } from './helpers/mcp-test-server.js';

describe('MCP server registration inventory', () => {
  it('registers the exact MCP tool set with no duplicates', () => {
    const server = registerInTestServer();
    const duplicates = server.getDuplicateToolNames();
    expect(duplicates).toEqual([]);

    const actual = server.getToolNames().sort();
    const expected = [...MCP_REGISTERED_TOOL_NAMES].sort();

    const actualSet = new Set(actual);
    const expectedSet = new Set(expected);

    const missing = expected.filter((name) => !actualSet.has(name));
    const extra = actual.filter((name) => !expectedSet.has(name));

    if (missing.length > 0 || extra.length > 0) {
      const details = [`Missing: ${missing.join(', ') || '(none)'}`, `Extra: ${extra.join(', ') || '(none)'}`]
        .join('\n');
      throw new Error(`MCP registration set mismatch\n${details}`);
    }

    expect(actual).toEqual(expected);
  });
});
