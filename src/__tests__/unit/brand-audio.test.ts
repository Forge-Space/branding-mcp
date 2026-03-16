import { generateColorPalette } from '../../lib/branding-core/generators/color-palette.js';
import { generateTypographySystem } from '../../lib/branding-core/generators/typography-system.js';
import { generateSpacingScale } from '../../lib/branding-core/generators/spacing-scale.js';
import { generateBrandAudio } from '../../lib/branding-core/generators/brand-audio.js';
import type { BrandIdentity } from '../../lib/types.js';

const colors = generateColorPalette('#3B82F6', 'analogous');
const typography = generateTypographySystem('sans-serif', 'serif');
const spacing = generateSpacingScale(4);

function createTestBrand(overrides: Partial<BrandIdentity> = {}): BrandIdentity {
  return {
    id: 'test-brand',
    name: 'SoundWave',
    tagline: 'Feel the frequency.',
    industry: 'music technology',
    style: 'tech',
    colors,
    typography,
    spacing,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('generateBrandAudio', () => {
  const brand = createTestBrand();

  it('returns all required fields', () => {
    const result = generateBrandAudio(brand);
    expect(result.sonicPersonality).toBeTruthy();
    expect(result.musicalDirection).toBeInstanceOf(Array);
    expect(result.uiSounds).toBeInstanceOf(Array);
    expect(result.brandJingleBrief).toBeTruthy();
    expect(result.podcastApproach).toBeTruthy();
    expect(result.voiceoverDirection).toBeTruthy();
    expect(result.accessibilityNotes).toBeInstanceOf(Array);
    expect(result.audioBriefSummary).toBeTruthy();
  });

  it('returns at least 5 musical direction items', () => {
    const result = generateBrandAudio(brand);
    expect(result.musicalDirection.length).toBeGreaterThanOrEqual(5);
  });

  it('returns exactly 5 UI sound descriptions', () => {
    const result = generateBrandAudio(brand);
    expect(result.uiSounds.length).toBe(5);
  });

  it('returns at least 7 accessibility notes', () => {
    const result = generateBrandAudio(brand);
    expect(result.accessibilityNotes.length).toBeGreaterThanOrEqual(7);
  });

  it('brand jingle brief contains the brand name', () => {
    const result = generateBrandAudio(brand);
    expect(result.brandJingleBrief).toContain('SoundWave');
  });

  it('audio brief summary contains brand name', () => {
    const result = generateBrandAudio(brand);
    expect(result.audioBriefSummary).toContain('SoundWave');
  });

  it('audio brief summary contains tagline when present', () => {
    const result = generateBrandAudio(brand);
    expect(result.audioBriefSummary).toContain('Feel the frequency.');
  });

  it('audio brief summary omits tagline when absent', () => {
    const noTagBrand = createTestBrand({ tagline: undefined });
    const result = generateBrandAudio(noTagBrand);
    expect(result.audioBriefSummary).not.toMatch(/undefined/);
    expect(result.audioBriefSummary).toBeTruthy();
  });

  it('tech style has electronic/synthesiser musical direction', () => {
    const result = generateBrandAudio(brand);
    const joined = result.musicalDirection.join(' ').toLowerCase();
    expect(joined).toMatch(/synth|electronic|digital/);
  });

  it('bold style has energetic musical direction', () => {
    const boldBrand = createTestBrand({ style: 'bold' });
    const result = generateBrandAudio(boldBrand);
    const joined = result.musicalDirection.join(' ').toLowerCase();
    expect(joined).toMatch(/drum|brass|energe/);
  });

  it('elegant style has orchestral musical direction', () => {
    const elegantBrand = createTestBrand({ style: 'elegant' });
    const result = generateBrandAudio(elegantBrand);
    const joined = result.musicalDirection.join(' ').toLowerCase();
    expect(joined).toMatch(/string|orchestra|piano/);
  });

  it('playful style has upbeat musical direction', () => {
    const playfulBrand = createTestBrand({ style: 'playful' });
    const result = generateBrandAudio(playfulBrand);
    const joined = result.musicalDirection.join(' ').toLowerCase();
    expect(joined).toMatch(/ukulele|glockenspiel|major/);
  });

  it('organic style references acoustic instruments', () => {
    const organicBrand = createTestBrand({ style: 'organic' });
    const result = generateBrandAudio(organicBrand);
    const joined = result.musicalDirection.join(' ').toLowerCase();
    expect(joined).toMatch(/acoustic|folk|field/);
  });

  it('retro style references analogue or vintage elements', () => {
    const retroBrand = createTestBrand({ style: 'retro' });
    const result = generateBrandAudio(retroBrand);
    const joined = result.musicalDirection.join(' ').toLowerCase();
    expect(joined).toMatch(/analogue|vintage|rhodes/);
  });

  it('unknown style falls back to minimal sonic personality', () => {
    const unknownBrand = createTestBrand({ style: 'unknown' as never });
    const result = generateBrandAudio(unknownBrand);
    expect(result.sonicPersonality).toContain('Clean');
    expect(result.musicalDirection.length).toBeGreaterThan(0);
  });

  it('accessibility notes mention WCAG', () => {
    const result = generateBrandAudio(brand);
    const joined = result.accessibilityNotes.join(' ');
    expect(joined).toMatch(/WCAG/);
  });
});
