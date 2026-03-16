import Anthropic from '@anthropic-ai/sdk';
import type { BrandIdentity } from '../../types.js';
import type { BrandIntent, InterpreterOptions } from './types.js';
import { buildRefinementPrompt, buildGenerationPrompt } from './prompts.js';
import { logger } from '../../logger.js';

async function callClaude(prompt: string, options: Required<InterpreterOptions>): Promise<string> {
  const client = new Anthropic({ apiKey: options.anthropicApiKey });
  const message = await client.messages.create({
    model: options.model,
    max_tokens: options.maxTokens,
    messages: [{ role: 'user', content: prompt }],
  });
  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text')
    throw new Error('No text content in Anthropic response');
  return textBlock.text;
}

function parseIntentJson(raw: string): BrandIntent {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON object found in AI response');
  return JSON.parse(jsonMatch[0]) as BrandIntent;
}

export async function interpretWithClaude(
  feedback: string,
  element: 'colors' | 'typography' | 'spacing',
  currentBrand: BrandIdentity,
  options: InterpreterOptions
): Promise<BrandIntent> {
  const opts: Required<InterpreterOptions> = {
    anthropicApiKey: options.anthropicApiKey ?? '',
    model: options.model ?? 'claude-sonnet-4-20250514',
    maxTokens: options.maxTokens ?? 512,
  };

  const prompt = buildRefinementPrompt(feedback, element, currentBrand);
  logger.info({ element, model: opts.model }, 'Interpreting feedback with Claude');

  const raw = await callClaude(prompt, opts);
  return parseIntentJson(raw);
}

export async function suggestBrandWithClaude(
  brandName: string,
  industry: string,
  description: string,
  options: InterpreterOptions
): Promise<BrandIntent> {
  const opts: Required<InterpreterOptions> = {
    anthropicApiKey: options.anthropicApiKey ?? '',
    model: options.model ?? 'claude-sonnet-4-20250514',
    maxTokens: options.maxTokens ?? 512,
  };

  const prompt = buildGenerationPrompt(brandName, industry, description);
  logger.info({ brandName, model: opts.model }, 'Generating brand suggestions with Claude');

  const raw = await callClaude(prompt, opts);
  return parseIntentJson(raw);
}
