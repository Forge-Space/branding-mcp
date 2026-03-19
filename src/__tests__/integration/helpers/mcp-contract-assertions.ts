import { expect } from '@jest/globals';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

interface McpCallableServer {
  callTool(name: string, payload: Record<string, unknown>): Promise<unknown>;
}

interface McpTextResponse {
  content: Array<{ type: string; text: string }>;
}

export function assertMcpTextResponse(toolName: string, result: unknown): void {
  expect(isPlainObject(result)).toBe(true);
  const response = result as Record<string, unknown>;

  expect(Array.isArray(response.content)).toBe(true);
  const content = response.content as unknown[];
  expect(content.length).toBeGreaterThan(0);

  const first = content[0];
  expect(isPlainObject(first)).toBe(true);
  const chunk = first as Record<string, unknown>;

  expect(chunk.type).toBe('text');
  expect(typeof chunk.text).toBe('string');
  expect((chunk.text as string).length).toBeGreaterThan(0);

  const serialized = JSON.stringify(response);
  expect(typeof serialized).toBe('string');

  if (response.isError === true) {
    throw new Error(`Tool ${toolName} returned MCP isError=true for minimal payload`);
  }
}

export async function createGeneratedBrandPayload(server: McpCallableServer): Promise<string> {
  const response = (await server.callTool('generate_brand_identity', {
    brandName: 'Acme Health',
    industry: 'healthcare',
    style: 'minimal',
  })) as McpTextResponse;

  const generatedBrandJson = response.content[0]?.text ?? '';
  expect(generatedBrandJson.length).toBeGreaterThan(0);
  return generatedBrandJson;
}

export function hydrateGeneratedBrandPlaceholder(
  payload: Record<string, unknown>,
  generatedBrandJson: string,
  placeholder: string
): Record<string, unknown> {
  const next = { ...payload };
  if (next.brand === placeholder) {
    next.brand = generatedBrandJson;
  }
  return next;
}
