import type { BorderRadiusName, BorderSystem, BrandStyle } from '../../types.js';

const STYLE_RADII: Record<BrandStyle, Record<BorderRadiusName, number>> = {
  minimal: { none: 0, sm: 2, md: 4, lg: 6, xl: 8, full: 9999, circle: 9999 },
  bold: { none: 0, sm: 4, md: 8, lg: 12, xl: 16, full: 9999, circle: 9999 },
  elegant: { none: 0, sm: 1, md: 2, lg: 4, xl: 6, full: 9999, circle: 9999 },
  playful: { none: 0, sm: 8, md: 12, lg: 16, xl: 24, full: 9999, circle: 9999 },
  corporate: { none: 0, sm: 2, md: 4, lg: 6, xl: 8, full: 9999, circle: 9999 },
  tech: { none: 0, sm: 2, md: 4, lg: 8, xl: 12, full: 9999, circle: 9999 },
  organic: { none: 0, sm: 6, md: 12, lg: 20, xl: 28, full: 9999, circle: 9999 },
  retro: { none: 0, sm: 0, md: 2, lg: 4, xl: 8, full: 9999, circle: 9999 },
};

const STYLE_BORDERS: Record<BrandStyle, { thin: number; medium: number; thick: number }> = {
  minimal: { thin: 1, medium: 1, thick: 2 },
  bold: { thin: 2, medium: 3, thick: 4 },
  elegant: { thin: 1, medium: 1, thick: 2 },
  playful: { thin: 2, medium: 3, thick: 4 },
  corporate: { thin: 1, medium: 2, thick: 3 },
  tech: { thin: 1, medium: 2, thick: 3 },
  organic: { thin: 1, medium: 2, thick: 3 },
  retro: { thin: 2, medium: 3, thick: 4 },
};

export function generateBorderSystem(style: BrandStyle = 'minimal'): BorderSystem {
  const radiusMap = STYLE_RADII[style];
  const radii = {} as Record<BorderRadiusName, string>;
  for (const [name, value] of Object.entries(radiusMap)) {
    radii[name as BorderRadiusName] = value === 9999 ? '9999px' : `${value}px`;
  }

  const borderWidths = STYLE_BORDERS[style];
  return {
    radii,
    widths: {
      thin: `${borderWidths.thin}px`,
      medium: `${borderWidths.medium}px`,
      thick: `${borderWidths.thick}px`,
    },
  };
}
