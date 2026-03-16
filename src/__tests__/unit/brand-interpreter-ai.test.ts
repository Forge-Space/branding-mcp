/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest, describe, it, expect, beforeAll, beforeEach } from '@jest/globals';

jest.unstable_mockModule('../../lib/branding-core/ai/claude-interpreter.js', () => ({
  interpretWithClaude: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ color: { harmony: 'triadic' }, reasoning: 'AI result' })
    ),
  suggestBrandWithClaude: jest.fn().mockImplementation(() => Promise.resolve({})),
}));

jest.unstable_mockModule('../../lib/logger.js', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';

function createTestBrand() {
  return {
    id: 'test_brand',
    name: 'Test',
    industry: 'tech',
    style: 'tech' as const,
    colors: generateColorPalette('#6B4CE6'),
    typography: generateTypographySystem(),
    spacing: generateSpacingScale(),
    createdAt: '2026-01-01T00:00:00Z',
  };
}

let interpretFeedback: (typeof import('../../lib/branding-core/ai/brand-interpreter.js'))['interpretFeedback'];
let mockInterpretWithClaude: jest.Mock;
let mockWarn: jest.Mock;

beforeAll(async () => {
  const mod = await import('../../lib/branding-core/ai/brand-interpreter.js');
  interpretFeedback = mod.interpretFeedback;
  const claudeMod = await import('../../lib/branding-core/ai/claude-interpreter.js');
  mockInterpretWithClaude = (claudeMod as any).interpretWithClaude as jest.Mock;
  const loggerMod = await import('../../lib/logger.js');
  mockWarn = (loggerMod as any).logger.warn as jest.Mock;
});

describe('interpretFeedback — AI path (brand-interpreter)', () => {
  beforeEach(() => {
    mockInterpretWithClaude.mockClear();
    mockWarn.mockClear();
  });

  it('calls interpretWithClaude and returns AI result when api key is present', async () => {
    mockInterpretWithClaude.mockImplementation(() =>
      Promise.resolve({ color: { harmony: 'triadic' }, reasoning: 'AI result' })
    );
    const brand = createTestBrand();
    const intent = await interpretFeedback('warm', 'colors', brand, 'ai', {
      anthropicApiKey: 'test-key',
    });
    expect(intent.reasoning).toBe('AI result');
    expect(mockInterpretWithClaude).toHaveBeenCalledTimes(1);
  });

  it('falls back to keywords and logs warning when interpretWithClaude throws', async () => {
    mockInterpretWithClaude.mockImplementation(() => Promise.reject(new Error('API error')));
    const brand = createTestBrand();
    const intent = await interpretFeedback('warm', 'colors', brand, 'ai', {
      anthropicApiKey: 'test-key',
    });
    expect(intent.reasoning).toContain('Keyword');
    expect(mockWarn).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'API error' }),
      'AI interpretation failed, falling back to keywords'
    );
  });

  it('falls back to keywords and logs warning when interpretWithClaude throws non-Error', async () => {
    mockInterpretWithClaude.mockImplementation(() => Promise.reject('string error'));
    const brand = createTestBrand();
    const intent = await interpretFeedback('warm', 'colors', brand, 'ai', {
      anthropicApiKey: 'test-key',
    });
    expect(intent.reasoning).toContain('Keyword');
    expect(mockWarn).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'string error' }),
      'AI interpretation failed, falling back to keywords'
    );
  });

  it('uses auto strategy with api key to call claude', async () => {
    mockInterpretWithClaude.mockImplementation(() =>
      Promise.resolve({ color: { harmony: 'analogous' }, reasoning: 'Auto AI' })
    );
    const brand = createTestBrand();
    const intent = await interpretFeedback('darker', 'colors', brand, 'auto', {
      anthropicApiKey: 'sk-test',
    });
    expect(mockInterpretWithClaude).toHaveBeenCalledTimes(1);
    expect(intent.reasoning).toBe('Auto AI');
  });
});
