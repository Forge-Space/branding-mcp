export interface AppConfig {
  logLevel: string;
  nodeEnv: string;
  anthropicApiKey?: string;
}

export function loadConfig(): AppConfig {
  return {
    logLevel: process.env.LOG_LEVEL ?? 'info',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  };
}
