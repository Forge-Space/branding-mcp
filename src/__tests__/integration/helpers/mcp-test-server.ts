import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerBrandingMcpSurface } from '../../../index.js';

export type McpToolHandler = (args: Record<string, unknown>) => Promise<unknown> | unknown;

interface RegisteredTool {
  name: string;
  description: string;
  handler: McpToolHandler;
}

export class McpTestServer {
  private readonly tools = new Map<string, RegisteredTool>();
  private readonly resources = new Set<string>();
  private readonly duplicateToolNames = new Set<string>();

  tool(name: string, description: string, _schema: unknown, handler: McpToolHandler): void {
    if (this.tools.has(name)) {
      this.duplicateToolNames.add(name);
    }

    this.tools.set(name, { name, description, handler });
  }

  resource(name: string): void {
    this.resources.add(name);
  }

  getToolNames(): string[] {
    return [...this.tools.keys()];
  }

  getResourceNames(): string[] {
    return [...this.resources.keys()];
  }

  getDuplicateToolNames(): string[] {
    return [...this.duplicateToolNames.keys()].sort();
  }

  async callTool(name: string, payload: Record<string, unknown>): Promise<unknown> {
    const registration = this.tools.get(name);

    if (!registration) {
      throw new Error(`Tool not registered: ${name}`);
    }

    return registration.handler(payload);
  }
}

export function registerInTestServer(): McpTestServer {
  const server = new McpTestServer();
  registerBrandingMcpSurface(server as unknown as McpServer);
  return server;
}
