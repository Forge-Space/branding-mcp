import { z } from 'zod';

export const hexColorSchema = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color (#RRGGBB)');

export const colorHarmonySchema = z.enum([
  'complementary',
  'analogous',
  'triadic',
  'split-complementary',
  'tetradic',
  'monochromatic',
]);

export const colorThemeSchema = z.enum(['light', 'dark', 'both']);

export const fontCategorySchema = z.enum([
  'serif',
  'sans-serif',
  'monospace',
  'display',
  'handwriting',
]);

export const typeScaleRatioSchema = z.enum([
  'minor-second',
  'major-second',
  'minor-third',
  'major-third',
  'perfect-fourth',
  'augmented-fourth',
  'perfect-fifth',
  'golden-ratio',
]);

export const exportFormatSchema = z.enum(['json', 'css', 'tailwind', 'figma', 'react', 'sass']);

export const brandStyleSchema = z.enum([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

export const brandDocFormatSchema = z.enum(['pdf', 'html']);
