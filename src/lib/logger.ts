import pino from 'pino';
import { loadConfig } from './config.js';

const config = loadConfig();

export const logger = pino({
  level: config.logLevel,
  transport:
    config.nodeEnv === 'development'
      ? { target: 'pino/file', options: { destination: 2 } }
      : undefined,
});
