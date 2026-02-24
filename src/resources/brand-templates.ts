import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

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
}
