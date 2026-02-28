import type { BrandStyle, LogoConfig, LogoOutput } from '../../types.js';

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

function generateWordmark(config: LogoConfig): string {
  const { text, font, fontSize, color, backgroundColor, width, height } = config;
  const initial = text.charAt(0).toUpperCase();
  const circleR = height * 0.35;
  const circleX = circleR + 20;
  const circleY = height / 2;
  const textX = circleX + circleR + 16;
  const textY = height / 2;
  const fontFamily = `'${font}', sans-serif`;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120">`,
    backgroundColor !== 'transparent'
      ? `  <rect width="${width}" height="${height}" fill="${backgroundColor}" rx="8"/>`
      : '',
    `  <circle cx="${circleX}" cy="${circleY}" r="${circleR}" fill="${color}"/>`,
    `  <text x="${circleX}" y="${circleY}" fill="white" font-size="${fontSize * 0.7}" font-family="${fontFamily}" font-weight="700" text-anchor="middle" dominant-baseline="central">${initial}</text>`,
    `  <text x="${textX}" y="${textY}" fill="${color}" font-size="${fontSize}" font-family="${fontFamily}" font-weight="600" dominant-baseline="central">${text}</text>`,
    '</svg>',
  ]
    .filter(Boolean)
    .join('\n');
}

const MONOGRAM_SHAPES: Record<BrandStyle, string> = {
  minimal: 'roundedSquare',
  bold: 'hexagon',
  elegant: 'thinCircle',
  playful: 'blob',
  corporate: 'rectangle',
  tech: 'diamond',
  organic: 'ellipse',
  retro: 'octagon',
};

function monogramContainer(style: BrandStyle, color: string): string {
  const shape = MONOGRAM_SHAPES[style] ?? 'thinCircle';
  const containers: Record<string, string> = {
    roundedSquare: `<rect x="10" y="10" width="100" height="100" rx="16" fill="${color}"/>`,
    hexagon: `<polygon points="60,5 110,30 110,90 60,115 10,90 10,30" fill="${color}"/>`,
    thinCircle: `<circle cx="60" cy="60" r="50" fill="none" stroke="${color}" stroke-width="3"/>`,
    blob: `<ellipse cx="60" cy="60" rx="52" ry="48" fill="${color}"/>`,
    rectangle: `<rect x="10" y="15" width="100" height="90" rx="4" fill="${color}"/>`,
    diamond: `<polygon points="60,5 115,60 60,115 5,60" fill="${color}"/>`,
    ellipse: `<ellipse cx="60" cy="60" rx="55" ry="45" fill="${color}"/>`,
    octagon: `<polygon points="35,5 85,5 115,35 115,85 85,115 35,115 5,85 5,35" fill="${color}"/>`,
  };
  return containers[shape] ?? containers.thinCircle;
}

function generateMonogram(config: LogoConfig): string {
  const { text, font, color } = config;
  const initial = text.charAt(0).toUpperCase();
  const style = config.style ?? 'minimal';
  const fontFamily = `'${font}', sans-serif`;
  const isThinCircle = MONOGRAM_SHAPES[style] === 'thinCircle';
  const textColor = isThinCircle ? color : 'white';

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">`,
    `  ${monogramContainer(style, color)}`,
    `  <text x="60" y="60" fill="${textColor}" font-size="56" font-family="${fontFamily}" font-weight="700" text-anchor="middle" dominant-baseline="central">${initial}</text>`,
    '</svg>',
  ].join('\n');
}

const ABSTRACT_BUILDERS: Record<BrandStyle, (c: string) => string> = {
  minimal: (c) =>
    `  <circle cx="40" cy="60" r="30" fill="${c}" opacity="0.8"/>` +
    `\n  <circle cx="60" cy="40" r="30" fill="${c}" opacity="0.5"/>` +
    `\n  <circle cx="80" cy="60" r="30" fill="${c}" opacity="0.3"/>`,
  bold: (c) =>
    `  <rect x="10" y="10" width="50" height="50" fill="${c}" opacity="0.9"/>` +
    `\n  <rect x="40" y="40" width="50" height="50" fill="${c}" opacity="0.6"/>` +
    `\n  <rect x="60" y="20" width="40" height="40" fill="${c}" opacity="0.3"/>`,
  elegant: (c) =>
    `  <path d="M60,10 A50,50 0 0,1 110,60" fill="none" stroke="${c}" stroke-width="2"/>` +
    `\n  <path d="M60,25 A35,35 0 0,1 95,60" fill="none" stroke="${c}" stroke-width="2"/>` +
    `\n  <path d="M60,40 A20,20 0 0,1 80,60" fill="none" stroke="${c}" stroke-width="2"/>`,
  playful: (c) =>
    `  <circle cx="30" cy="40" r="8" fill="${c}"/>` +
    `\n  <circle cx="60" cy="25" r="12" fill="${c}" opacity="0.7"/>` +
    `\n  <circle cx="90" cy="50" r="10" fill="${c}" opacity="0.5"/>` +
    `\n  <circle cx="50" cy="80" r="14" fill="${c}" opacity="0.6"/>`,
  corporate: (c) =>
    `  <rect x="10" y="10" width="30" height="100" fill="${c}" opacity="0.3"/>` +
    `\n  <rect x="45" y="10" width="30" height="100" fill="${c}" opacity="0.5"/>` +
    `\n  <rect x="80" y="10" width="30" height="100" fill="${c}" opacity="0.7"/>`,
  tech: (c) =>
    `  <line x1="10" y1="60" x2="50" y2="30" stroke="${c}" stroke-width="2"/>` +
    `\n  <line x1="50" y1="30" x2="90" y2="50" stroke="${c}" stroke-width="2"/>` +
    `\n  <line x1="90" y1="50" x2="110" y2="20" stroke="${c}" stroke-width="2"/>` +
    `\n  <circle cx="50" cy="30" r="4" fill="${c}"/>` +
    `\n  <circle cx="90" cy="50" r="4" fill="${c}"/>`,
  organic: (c) =>
    `  <path d="M10,60 Q30,20 60,60 Q90,100 110,60" fill="none" stroke="${c}" stroke-width="3"/>` +
    `\n  <path d="M10,80 Q30,40 60,80 Q90,120 110,80" fill="none" stroke="${c}" stroke-width="2" opacity="0.5"/>`,
  retro: (c) =>
    `  <polygon points="60,10 75,35 110,35 82,55 93,85 60,67 27,85 38,55 10,35 45,35" fill="${c}"/>` +
    `\n  <polygon points="60,25 70,42 90,42 74,53 80,70 60,60 40,70 46,53 30,42 50,42" fill="white" opacity="0.3"/>`,
};

function generateAbstract(config: LogoConfig): string {
  const { color } = config;
  const style = config.style ?? 'minimal';
  const builder = ABSTRACT_BUILDERS[style] ?? ABSTRACT_BUILDERS.minimal;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">`,
    builder(color),
    '</svg>',
  ].join('\n');
}

function generateIcon(config: LogoConfig): string {
  const { text, font, color } = config;
  const initial = text.charAt(0).toUpperCase();
  const fontFamily = `'${font}', sans-serif`;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">`,
    `  <circle cx="32" cy="32" r="28" fill="${color}"/>`,
    `  <text x="32" y="32" fill="white" font-size="32" font-family="${fontFamily}" font-weight="700" text-anchor="middle" dominant-baseline="central">${initial}</text>`,
    '</svg>',
  ].join('\n');
}

export function generateSvgLogo(config: LogoConfig): LogoOutput {
  const wordmark = generateWordmark(config);
  const monogram = generateMonogram(config);
  const abstract = generateAbstract(config);
  const icon = generateIcon(config);

  return {
    svg: wordmark,
    variants: { wordmark, monogram, abstract, icon },
  };
}
