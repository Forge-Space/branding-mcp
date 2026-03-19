import { BrandStyle } from '../../types.js';

export const VALID_BRAND_STYLES = new Set<BrandStyle>([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

export function resolveBrandStyle(style: BrandStyle): BrandStyle {
  return VALID_BRAND_STYLES.has(style) ? style : 'minimal';
}
