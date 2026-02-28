import type { FaviconSet, FaviconSize } from '../../types.js';

function rescaleSvg(iconSvg: string, size: FaviconSize, brandColor: string): string {
  const strokeScale = size <= 32 ? 2 : 1;
  let svg = iconSvg
    .replace(/width="[^"]*"/, `width="${size}"`)
    .replace(/height="[^"]*"/, `height="${size}"`)
    .replace(/viewBox="[^"]*"/, `viewBox="0 0 64 64"`);

  if (strokeScale > 1) {
    svg = svg.replace(
      /stroke-width="(\d+)"/g,
      (_, w) => `stroke-width="${Number(w) * strokeScale}"`
    );
  }

  if (!svg.includes('fill=') && !svg.includes('<circle')) {
    svg = svg.replace('<svg ', `<svg style="color:${brandColor}" `);
  }

  return svg;
}

export function generateFavicons(iconSvg: string, brandColor: string): FaviconSet {
  const sizes: FaviconSize[] = [16, 32, 180, 512];
  const result = {} as Record<FaviconSize, string>;

  for (const size of sizes) {
    result[size] = rescaleSvg(iconSvg, size, brandColor);
  }

  return { sizes: result };
}
