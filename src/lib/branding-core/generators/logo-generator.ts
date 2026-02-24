import type { LogoConfig, LogoOutput } from '../../types.js';

export function defaultLogoConfig(brandName: string, primaryColor: string): LogoConfig {
  return {
    text: brandName,
    font: 'Inter',
    fontSize: 48,
    color: primaryColor,
    backgroundColor: 'transparent',
    width: 400,
    height: 120,
  };
}

export function generateSvgLogo(config: LogoConfig): LogoOutput {
  const { text, fontSize, color, backgroundColor, width, height } = config;
  const initial = text.charAt(0).toUpperCase();
  const circleR = height * 0.35;
  const circleX = circleR + 20;
  const circleY = height / 2;
  const textX = circleX + circleR + 16;
  const textY = height / 2;

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    backgroundColor !== 'transparent'
      ? `  <rect width="${width}" height="${height}" fill="${backgroundColor}" rx="8"/>`
      : '',
    `  <circle cx="${circleX}" cy="${circleY}" r="${circleR}" fill="${color}"/>`,
    `  <text x="${circleX}" y="${circleY}" fill="white" font-size="${fontSize * 0.7}" font-family="Inter, sans-serif" font-weight="700" text-anchor="middle" dominant-baseline="central">${initial}</text>`,
    `  <text x="${textX}" y="${textY}" fill="${color}" font-size="${fontSize}" font-family="Inter, sans-serif" font-weight="600" dominant-baseline="central">${text}</text>`,
    '</svg>',
  ]
    .filter(Boolean)
    .join('\n');

  return { svg };
}
