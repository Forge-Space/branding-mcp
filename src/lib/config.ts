export type TransportMode = 'stdio' | 'http';

export interface AppConfig {
  logLevel: string;
  nodeEnv: string;
  anthropicApiKey?: string;
  transport: TransportMode;
  port: number;
}

export function loadConfig(): AppConfig {
  const rawTransport = process.env.MCP_TRANSPORT ?? 'stdio';
  const transport: TransportMode = rawTransport === 'http' ? 'http' : 'stdio';
  const port = parseInt(process.env.PORT ?? '3000', 10);

  return {
    logLevel: process.env.LOG_LEVEL ?? 'info',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    transport,
    port,
  };
}
