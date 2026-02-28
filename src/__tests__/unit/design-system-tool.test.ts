import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerGenerateDesignSystem } from '../../tools/generate-design-system.js';

function createMockServer(): McpServer & { registeredTools: Map<string, unknown> } {
  const tools = new Map<string, unknown>();
  return {
    registeredTools: tools,
    tool(name: string, _desc: string, _schema: unknown, handler: unknown) {
      tools.set(name, handler);
    },
  } as McpServer & { registeredTools: Map<string, unknown> };
}

describe('generate_design_system tool', () => {
  let server: ReturnType<typeof createMockServer>;
  let handler: (
    params: Record<string, unknown>
  ) => Promise<{ content: Array<{ text: string }>; isError?: boolean }>;

  beforeAll(() => {
    server = createMockServer();
    registerGenerateDesignSystem(server);
    handler = server.registeredTools.get('generate_design_system') as typeof handler;
  });

  it('registers the tool', () => {
    expect(server.registeredTools.has('generate_design_system')).toBe(true);
  });

  it('generates identity with all subsystems', async () => {
    const result = await handler({
      brandName: 'TestBrand',
      industry: 'tech',
      style: 'minimal',
      exportFormats: ['json'],
    });

    const output = JSON.parse(result.content[0].text);
    const identity = output.identity;

    expect(identity.name).toBe('TestBrand');
    expect(identity.colors).toBeDefined();
    expect(identity.typography).toBeDefined();
    expect(identity.spacing).toBeDefined();
    expect(identity.shadows).toBeDefined();
    expect(identity.borders).toBeDefined();
    expect(identity.motion).toBeDefined();
    expect(identity.gradients).toBeDefined();
    expect(identity.logo).toBeDefined();
  });

  it('includes requested export formats', async () => {
    const result = await handler({
      brandName: 'TestBrand',
      industry: 'tech',
      style: 'bold',
      exportFormats: ['css', 'tailwind'],
    });

    const output = JSON.parse(result.content[0].text);
    expect(output.exports.css).toBeDefined();
    expect(output.exports.tailwind).toBeDefined();
    expect(output.exports.json).toBeUndefined();
  });

  it('exports valid CSS variables', async () => {
    const result = await handler({
      brandName: 'CSSTest',
      industry: 'design',
      style: 'elegant',
      exportFormats: ['css'],
    });

    const output = JSON.parse(result.content[0].text);
    expect(output.exports.css).toContain('--');
    expect(output.exports.css).toContain(':root');
  });

  it('exports valid Tailwind preset', async () => {
    const result = await handler({
      brandName: 'TailwindTest',
      industry: 'tech',
      style: 'tech',
      exportFormats: ['tailwind'],
    });

    const output = JSON.parse(result.content[0].text);
    expect(output.exports.tailwind).toContain('theme');
    expect(output.exports.tailwind).toContain('extend');
  });

  it('supports all 6 export formats at once', async () => {
    const result = await handler({
      brandName: 'AllFormats',
      industry: 'retail',
      style: 'playful',
      exportFormats: ['json', 'css', 'tailwind', 'figma', 'react', 'sass'],
    });

    const output = JSON.parse(result.content[0].text);
    expect(Object.keys(output.exports)).toHaveLength(6);
  });

  it('applies optional parameters', async () => {
    const result = await handler({
      brandName: 'CustomBrand',
      industry: 'health',
      style: 'organic',
      tagline: 'Live naturally',
      baseColor: '#2D8B4E',
      harmony: 'analogous',
      theme: 'light',
      headingCategory: 'serif',
      bodyCategory: 'sans-serif',
      scaleRatio: 'golden-ratio',
      exportFormats: ['json'],
    });

    const output = JSON.parse(result.content[0].text);
    expect(output.identity.tagline).toBe('Live naturally');
    expect(output.identity.style).toBe('organic');
  });

  it('returns error for invalid input gracefully', async () => {
    const result = await handler({
      brandName: 'Test',
      industry: 'tech',
      style: 'minimal',
      exportFormats: ['json'],
    });

    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toBeDefined();
  });

  it('generates unique brand IDs', async () => {
    const params = {
      brandName: 'UniqueTest',
      industry: 'tech',
      style: 'minimal' as const,
      exportFormats: ['json'],
    };

    const r1 = await handler(params);
    const r2 = await handler(params);
    const id1 = JSON.parse(r1.content[0].text).identity.id;
    const id2 = JSON.parse(r2.content[0].text).identity.id;
    expect(id1).not.toBe(id2);
  });

  it('all brand styles produce valid output', async () => {
    const styles = [
      'minimal',
      'bold',
      'elegant',
      'playful',
      'corporate',
      'tech',
      'organic',
      'retro',
    ];

    for (const style of styles) {
      const result = await handler({
        brandName: `${style}Brand`,
        industry: 'test',
        style,
        exportFormats: ['json'],
      });

      expect(result.isError).toBeUndefined();
      const output = JSON.parse(result.content[0].text);
      expect(output.identity.style).toBe(style);
    }
  });
});
