import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { BrandIdentity } from '../lib/types.js';

const TEMPLATES = [
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    style: 'tech',
    baseColor: '#6B4CE6',
    harmony: 'complementary',
    headingCategory: 'sans-serif',
    bodyCategory: 'sans-serif',
  },
  {
    id: 'luxury-brand',
    name: 'Luxury Brand',
    style: 'elegant',
    baseColor: '#1A1A2E',
    harmony: 'analogous',
    headingCategory: 'serif',
    bodyCategory: 'serif',
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    style: 'organic',
    baseColor: '#2D6A4F',
    harmony: 'analogous',
    headingCategory: 'serif',
    bodyCategory: 'sans-serif',
  },
  {
    id: 'creative-agency',
    name: 'Creative Agency',
    style: 'bold',
    baseColor: '#FF6B35',
    harmony: 'triadic',
    headingCategory: 'display',
    bodyCategory: 'sans-serif',
  },
  {
    id: 'fintech',
    name: 'Fintech',
    style: 'corporate',
    baseColor: '#0052CC',
    harmony: 'complementary',
    headingCategory: 'sans-serif',
    bodyCategory: 'sans-serif',
  },
  {
    id: 'education',
    name: 'Education',
    style: 'playful',
    baseColor: '#7C3AED',
    harmony: 'split-complementary',
    headingCategory: 'display',
    bodyCategory: 'sans-serif',
  },
];

const FORGE_SPACE_BRAND: BrandIdentity = {
  id: 'brand_forgespace_001',
  name: 'Forge Space',
  tagline: 'The developer tools ecosystem.',
  industry: 'technology',
  style: 'tech',
  colors: {
    primary: {
      name: 'Forge Purple',
      hex: '#7c3aed',
      hsl: { h: 262, s: 83, l: 58 },
      usage: 'Primary brand color',
    },
    secondary: {
      name: 'Forge Blue',
      hex: '#3B82F6',
      hsl: { h: 217, s: 91, l: 60 },
      usage: 'Secondary brand color',
    },
    accent: {
      name: 'Forge Amber',
      hex: '#F59E0B',
      hsl: { h: 43, s: 96, l: 50 },
      usage: 'Accent and highlight color',
    },
    neutral: [
      {
        name: 'neutral-100',
        hex: '#f2f2f3',
        hsl: { h: 262, s: 5, l: 95 },
        usage: 'Neutral shade 1',
      },
      {
        name: 'neutral-200',
        hex: '#e5e4e7',
        hsl: { h: 262, s: 5, l: 90 },
        usage: 'Neutral shade 2',
      },
      {
        name: 'neutral-300',
        hex: '#cbc9cf',
        hsl: { h: 262, s: 5, l: 80 },
        usage: 'Neutral shade 3',
      },
      {
        name: 'neutral-400',
        hex: '#98949e',
        hsl: { h: 262, s: 5, l: 60 },
        usage: 'Neutral shade 4',
      },
      {
        name: 'neutral-500',
        hex: '#65616b',
        hsl: { h: 262, s: 5, l: 40 },
        usage: 'Neutral shade 5',
      },
      {
        name: 'neutral-600',
        hex: '#323036',
        hsl: { h: 262, s: 5, l: 20 },
        usage: 'Neutral shade 6',
      },
      {
        name: 'neutral-700',
        hex: '#19181b',
        hsl: { h: 262, s: 5, l: 10 },
        usage: 'Neutral shade 7',
      },
      {
        name: 'neutral-800',
        hex: '#0d0c0d',
        hsl: { h: 262, s: 5, l: 5 },
        usage: 'Neutral shade 8',
      },
    ],
    semantic: {
      success: {
        name: 'success',
        hex: '#22c35d',
        hsl: { h: 142, s: 70, l: 45 },
        usage: 'Success states',
      },
      warning: {
        name: 'warning',
        hex: '#f59f0a',
        hsl: { h: 38, s: 92, l: 50 },
        usage: 'Warning states',
      },
      error: { name: 'error', hex: '#ef4343', hsl: { h: 0, s: 84, l: 60 }, usage: 'Error states' },
      info: {
        name: 'info',
        hex: '#368fe7',
        hsl: { h: 210, s: 79, l: 56 },
        usage: 'Informational states',
      },
    },
    contrast: {
      'primary-on-white': { ratio: 5.67, aa: true, aaLarge: true, aaa: false, aaaLarge: true },
      'primary-on-dark': { ratio: 3.07, aa: false, aaLarge: true, aaa: false, aaaLarge: false },
      'secondary-on-white': { ratio: 4.35, aa: false, aaLarge: true, aaa: false, aaaLarge: false },
      'accent-on-white': { ratio: 3.52, aa: false, aaLarge: true, aaa: false, aaaLarge: false },
    },
  },
  typography: {
    headingFont: 'Space Grotesk',
    bodyFont: 'IBM Plex Sans',
    monoFont: 'IBM Plex Mono',
    baseSize: 16,
    scaleRatio: 1.25,
    steps: [
      { name: 'xs', size: '10.24px', lineHeight: '1.6', letterSpacing: '0.02em', weight: 400 },
      { name: 'sm', size: '12.8px', lineHeight: '1.6', letterSpacing: '0.02em', weight: 400 },
      { name: 'base', size: '16px', lineHeight: '1.6', letterSpacing: '0em', weight: 400 },
      { name: 'lg', size: '20px', lineHeight: '1.5', letterSpacing: '0em', weight: 400 },
      { name: 'xl', size: '25px', lineHeight: '1.3', letterSpacing: '-0.01em', weight: 400 },
      { name: '2xl', size: '31.25px', lineHeight: '1.3', letterSpacing: '-0.01em', weight: 600 },
      { name: '3xl', size: '39.06px', lineHeight: '1.2', letterSpacing: '-0.01em', weight: 600 },
      { name: '4xl', size: '48.83px', lineHeight: '1.2', letterSpacing: '-0.01em', weight: 700 },
      { name: '5xl', size: '61.04px', lineHeight: '1.2', letterSpacing: '-0.01em', weight: 700 },
    ],
  },
  spacing: {
    unit: 4,
    values: {
      '0': '0px',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '20px',
      '6': '24px',
      '8': '32px',
      '10': '40px',
      '12': '48px',
      '16': '64px',
      '20': '80px',
      '24': '96px',
      '0.5': '2px',
      '1.5': '6px',
      '2.5': '10px',
    },
  },
  shadows: {
    levels: {
      none: {
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        spread: 0,
        color: 'rgba(47, 36, 66, 0)',
        opacity: 0,
        cssValue: 'none',
      },
      sm: {
        offsetX: 0,
        offsetY: 1,
        blur: 2,
        spread: 0,
        color: 'rgba(47, 36, 66, 0.05)',
        opacity: 0.05,
        cssValue: '1px 1px 2px 0px rgba(47, 36, 66, 0.05)',
      },
      md: {
        offsetX: 0,
        offsetY: 2,
        blur: 4,
        spread: -1,
        color: 'rgba(47, 36, 66, 0.08)',
        opacity: 0.08,
        cssValue: '2px 2px 4px -1px rgba(47, 36, 66, 0.08)',
      },
      lg: {
        offsetX: 0,
        offsetY: 4,
        blur: 8,
        spread: -2,
        color: 'rgba(47, 36, 66, 0.1)',
        opacity: 0.1,
        cssValue: '4px 4px 8px -2px rgba(47, 36, 66, 0.1)',
      },
      xl: {
        offsetX: 0,
        offsetY: 8,
        blur: 16,
        spread: -4,
        color: 'rgba(47, 36, 66, 0.12)',
        opacity: 0.12,
        cssValue: '8px 8px 16px -4px rgba(47, 36, 66, 0.12)',
      },
      '2xl': {
        offsetX: 0,
        offsetY: 16,
        blur: 32,
        spread: -8,
        color: 'rgba(47, 36, 66, 0.15)',
        opacity: 0.15,
        cssValue: '16px 16px 32px -8px rgba(47, 36, 66, 0.15)',
      },
    },
  },
  borders: {
    radii: {
      none: '0px',
      sm: '2px',
      md: '4px',
      lg: '8px',
      xl: '12px',
      full: '9999px',
      circle: '9999px',
    },
    widths: {
      thin: '1px',
      medium: '2px',
      thick: '3px',
    },
  },
  motion: {
    durations: {
      instant: '0ms',
      fast: '80ms',
      normal: '150ms',
      slow: '250ms',
      slower: '350ms',
    },
    easings: {
      'ease-in': 'cubic-bezier(0.55, 0, 1, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.1, 1)',
      'ease-in-out': 'cubic-bezier(0.55, 0, 0.1, 1)',
      spring: 'cubic-bezier(0.2, 1.6, 0.4, 1)',
      bounce: 'cubic-bezier(0.2, 1.4, 0.4, 1)',
    },
    transitions: {
      fade: 'opacity 150ms cubic-bezier(0, 0, 0.1, 1)',
      slide: 'transform 150ms cubic-bezier(0, 0, 0.1, 1)',
      scale: 'transform 80ms cubic-bezier(0, 0, 0.1, 1)',
      color:
        'color 250ms cubic-bezier(0, 0, 0.1, 1), background-color 250ms cubic-bezier(0, 0, 0.1, 1)',
      all: 'all 150ms cubic-bezier(0, 0, 0.1, 1)',
    },
  },
  gradients: {
    presets: {
      hero: {
        type: 'linear',
        angle: 315,
        stops: [
          { color: '#7c3aed', position: 0 },
          { color: '#3B82F6', position: 100 },
        ],
        cssValue: 'linear-gradient(315deg, #7c3aed 0%, #3B82F6 100%)',
      },
      button: {
        type: 'linear',
        angle: 315,
        stops: [
          { color: '#F59E0B', position: 0 },
          { color: '#7c3aed', position: 100 },
        ],
        cssValue: 'linear-gradient(315deg, #F59E0B 0%, #7c3aed 100%)',
      },
      card: {
        type: 'linear',
        angle: 315,
        stops: [
          { color: '#f2f2f3', position: 0 },
          { color: '#cacace', position: 100 },
        ],
        cssValue: 'linear-gradient(315deg, #f2f2f3 0%, #cacace 100%)',
      },
      text: {
        type: 'linear',
        angle: 315,
        stops: [
          { color: '#7c3aed', position: 0 },
          { color: '#F59E0B', position: 100 },
        ],
        cssValue: 'linear-gradient(315deg, #7c3aed 0%, #F59E0B 100%)',
      },
      background: {
        type: 'linear',
        angle: 315,
        stops: [
          { color: '#f2f2f3', position: 0 },
          { color: '#0d0c0d', position: 100 },
        ],
        cssValue: 'linear-gradient(315deg, #f2f2f3 0%, #0d0c0d 100%)',
      },
    },
  },
  logo: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="64" viewBox="0 0 200 64" fill="none">\n  <path d="M14 8 h46 a3 3 0 0 1 3 3 v6 a3 3 0 0 1-3 3 H14 L8 14 L14 8 Z" fill="#F59E0B"/>\n  <rect x="22" y="24" width="24" height="12" rx="2" fill="#3B82F6"/>\n  <rect x="16" y="40" width="38" height="14" rx="3" fill="#7C3AED"/>\n  <text x="78" y="30" fill="#7C3AED" font-size="20" font-family="\'Space Grotesk\', sans-serif" font-weight="700" letter-spacing="0.12em">FORGE</text>\n  <text x="78" y="52" fill="#7C3AED" font-size="20" font-family="\'Space Grotesk\', sans-serif" font-weight="700" letter-spacing="0.12em">SPACE</text>\n</svg>',
    variants: {
      wordmark:
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="64" viewBox="0 0 200 64" fill="none">\n  <path d="M14 8 h46 a3 3 0 0 1 3 3 v6 a3 3 0 0 1-3 3 H14 L8 14 L14 8 Z" fill="#F59E0B"/>\n  <rect x="22" y="24" width="24" height="12" rx="2" fill="#3B82F6"/>\n  <rect x="16" y="40" width="38" height="14" rx="3" fill="#7C3AED"/>\n  <text x="78" y="30" fill="#7C3AED" font-size="20" font-family="\'Space Grotesk\', sans-serif" font-weight="700" letter-spacing="0.12em">FORGE</text>\n  <text x="78" y="52" fill="#7C3AED" font-size="20" font-family="\'Space Grotesk\', sans-serif" font-weight="700" letter-spacing="0.12em">SPACE</text>\n</svg>',
      monogram:
        '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">\n  <path d="M14 8 h46 a3 3 0 0 1 3 3 v6 a3 3 0 0 1-3 3 H14 L8 14 L14 8 Z" fill="#F59E0B"/>\n  <rect x="22" y="24" width="24" height="12" rx="2" fill="#3B82F6"/>\n  <rect x="16" y="40" width="38" height="14" rx="3" fill="#7C3AED"/>\n</svg>',
      abstract:
        '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">\n  <path d="M14 8 h46 a3 3 0 0 1 3 3 v6 a3 3 0 0 1-3 3 H14 L8 14 L14 8 Z" fill="#7C3AED"/>\n  <rect x="22" y="24" width="24" height="12" rx="2" fill="#7C3AED"/>\n  <rect x="16" y="40" width="38" height="14" rx="3" fill="#7C3AED"/>\n</svg>',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">\n  <path d="M14 8 h46 a3 3 0 0 1 3 3 v6 a3 3 0 0 1-3 3 H14 L8 14 L14 8 Z" fill="#F59E0B"/>\n  <rect x="22" y="24" width="24" height="12" rx="2" fill="#3B82F6"/>\n  <rect x="16" y="40" width="38" height="14" rx="3" fill="#7C3AED"/>\n</svg>',
    },
  },
  createdAt: '2026-03-01T05:55:29.414Z',
};

export function registerBrandTemplates(server: McpServer): void {
  server.resource('brand-templates', 'brand://templates', async () => ({
    contents: [
      {
        uri: 'brand://templates',
        text: JSON.stringify(TEMPLATES, null, 2),
        mimeType: 'application/json',
      },
    ],
  }));

  server.resource('forge-space-brand', 'brand://templates/forge-space', async () => ({
    contents: [
      {
        uri: 'brand://templates/forge-space',
        text: JSON.stringify(FORGE_SPACE_BRAND, null, 2),
        mimeType: 'application/json',
      },
    ],
  }));
}
