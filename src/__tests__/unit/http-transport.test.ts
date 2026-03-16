import { loadConfig } from '../../lib/config.js';

describe('loadConfig - transport options', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('defaults to stdio transport', () => {
    delete process.env.MCP_TRANSPORT;
    const config = loadConfig();
    expect(config.transport).toBe('stdio');
  });

  it('uses http transport when MCP_TRANSPORT=http', () => {
    process.env.MCP_TRANSPORT = 'http';
    const config = loadConfig();
    expect(config.transport).toBe('http');
  });

  it('falls back to stdio for unknown transport values', () => {
    process.env.MCP_TRANSPORT = 'websocket';
    const config = loadConfig();
    expect(config.transport).toBe('stdio');
  });

  it('defaults to port 3000', () => {
    delete process.env.PORT;
    const config = loadConfig();
    expect(config.port).toBe(3000);
  });

  it('uses PORT env variable', () => {
    process.env.PORT = '8080';
    const config = loadConfig();
    expect(config.port).toBe(8080);
  });

  it('includes existing config fields alongside transport', () => {
    process.env.MCP_TRANSPORT = 'http';
    process.env.LOG_LEVEL = 'debug';
    process.env.NODE_ENV = 'production';
    process.env.ANTHROPIC_API_KEY = 'test-key';
    const config = loadConfig();
    expect(config.logLevel).toBe('debug');
    expect(config.nodeEnv).toBe('production');
    expect(config.anthropicApiKey).toBe('test-key');
    expect(config.transport).toBe('http');
  });
});
