import type { BrandIdentity } from '../../types.js';
import type { BrandIntent, InterpreterOptions } from './types.js';
import { interpretWithKeywords } from './keyword-interpreter.js';
import { interpretWithClaude } from './claude-interpreter.js';
import { logger } from '../../logger.js';

export type InterpreterStrategy = 'keyword' | 'ai' | 'auto';

export async function interpretFeedback(
  feedback: string,
  element: 'colors' | 'typography' | 'spacing',
  currentBrand: BrandIdentity,
  strategy: InterpreterStrategy = 'auto',
  options?: InterpreterOptions
): Promise<BrandIntent> {
  const useAi = strategy === 'ai' || (strategy === 'auto' && !!options?.anthropicApiKey);

  if (useAi && options?.anthropicApiKey) {
    try {
      return await interpretWithClaude(feedback, element, currentBrand, options);
    } catch (error) {
      logger.warn(
        { error: error instanceof Error ? error.message : String(error) },
        'AI interpretation failed, falling back to keywords'
      );
    }
  }

  return interpretWithKeywords(feedback, element, currentBrand);
}
