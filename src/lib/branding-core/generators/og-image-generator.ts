import type { BrandIdentity, OgImageOutput, OgTemplate } from '../../types.js';

function getGradientColors(brand: BrandIdentity): [string, string] {
  return [brand.colors.primary.hex, brand.colors.secondary.hex];
}

function stripSvgWrapper(svg: string): string {
  return svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
}

function buildSvg(
  w: number,
  h: number,
  colors: [string, string],
  font: string,
  title: string,
  subtitle: string,
  logoSection: string
): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
    `  <defs>`,
    `    <style>@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}');</style>`,
    `    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">`,
    `      <stop offset="0%" style="stop-color:${colors[0]}"/>`,
    `      <stop offset="100%" style="stop-color:${colors[1]}"/>`,
    `    </linearGradient>`,
    `  </defs>`,
    `  <rect width="${w}" height="${h}" fill="url(#bg)"/>`,
    logoSection,
    `  <text x="${w / 2}" y="${h / 2 - 20}" fill="white" font-size="56" font-family="'${font}', sans-serif" font-weight="700" text-anchor="middle" dominant-baseline="central">${title}</text>`,
    subtitle
      ? `  <text x="${w / 2}" y="${h / 2 + 40}" fill="white" font-size="28" font-family="'${font}', sans-serif" font-weight="400" text-anchor="middle" dominant-baseline="central" opacity="0.8">${subtitle}</text>`
      : '',
    '</svg>',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildDefaultTemplate(brand: BrandIdentity, title?: string, subtitle?: string): string {
  const displayTitle = title ?? brand.name;
  const displaySub = subtitle ?? brand.tagline ?? '';
  const font = brand.typography.headingFont;
  const logoSvg = brand.logo?.variants?.icon ?? '';
  const logoSection = logoSvg
    ? `<g transform="translate(540, 80) scale(1.5)">${stripSvgWrapper(logoSvg)}</g>`
    : '';

  return buildSvg(1200, 630, getGradientColors(brand), font, displayTitle, displaySub, logoSection);
}

function buildArticleTemplate(brand: BrandIdentity, title?: string, subtitle?: string): string {
  const displayTitle = title ?? 'Untitled Article';
  const displaySub = subtitle ?? '';
  const font = brand.typography.headingFont;
  const logoSvg = brand.logo?.variants?.icon ?? '';
  const logoSection = logoSvg
    ? `<g transform="translate(1080, 30) scale(0.8)">${stripSvgWrapper(logoSvg)}</g>`
    : '';

  return buildSvg(1200, 630, getGradientColors(brand), font, displayTitle, displaySub, logoSection);
}

function buildSocialTemplate(brand: BrandIdentity, title?: string): string {
  const displayTitle = title ?? brand.name;
  const font = brand.typography.headingFont;
  const colors = getGradientColors(brand);
  const logoSvg = brand.logo?.variants?.icon ?? '';
  const logoSection = logoSvg
    ? `<g transform="translate(536, 300) scale(2)">${stripSvgWrapper(logoSvg)}</g>`
    : '';

  return buildSvg(1200, 1200, colors, font, displayTitle, '', logoSection);
}

export function generateOgImage(
  brand: BrandIdentity,
  template: OgTemplate = 'default',
  title?: string,
  subtitle?: string
): OgImageOutput {
  const builders: Record<OgTemplate, () => string> = {
    default: () => buildDefaultTemplate(brand, title, subtitle),
    article: () => buildArticleTemplate(brand, title, subtitle),
    social: () => buildSocialTemplate(brand, title),
  };

  const svg = builders[template]();
  const dimensions: Record<OgTemplate, { width: number; height: number }> = {
    default: { width: 1200, height: 630 },
    article: { width: 1200, height: 630 },
    social: { width: 1200, height: 1200 },
  };

  return { template, svg, ...dimensions[template] };
}
