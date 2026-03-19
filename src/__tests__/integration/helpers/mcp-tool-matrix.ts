export type McpToolCategory = 'core' | 'vertical';

export interface McpToolMatrixEntry {
  toolName: string;
  category: McpToolCategory;
  expectedExportSymbol: string;
  minimalPayload: Record<string, unknown>;
}

export const MINIMAL_BRAND_IDENTITY = {
  id: 'brand_test',
  name: 'Acme Health',
  industry: 'healthcare',
  style: 'minimal',
  tagline: 'Care with confidence',
  colors: {
    primary: { hex: '#2563EB', rgb: [37, 99, 235], hsl: [220, 84, 53], name: 'Primary Blue' },
    secondary: {
      hex: '#14B8A6',
      rgb: [20, 184, 166],
      hsl: [173, 80, 40],
      name: 'Secondary Teal',
    },
    accent: { hex: '#F97316', rgb: [249, 115, 22], hsl: [25, 95, 53], name: 'Accent Orange' },
    neutral: [
      { hex: '#111827', rgb: [17, 24, 39], hsl: [221, 39, 11], name: 'Neutral 900' },
      { hex: '#6B7280', rgb: [107, 114, 128], hsl: [220, 9, 46], name: 'Neutral 500' },
      { hex: '#F3F4F6', rgb: [243, 244, 246], hsl: [220, 14, 96], name: 'Neutral 100' },
    ],
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    scale: { ratio: 1.2, base: 16 },
    steps: [
      { name: 'body', size: '16px', lineHeight: 1.5, letterSpacing: '0', weight: 400 },
      { name: 'h2', size: '24px', lineHeight: 1.3, letterSpacing: '-0.01em', weight: 600 },
    ],
  },
  spacing: {
    unit: 8,
    scale: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.08)',
    md: '0 4px 8px rgba(0,0,0,0.12)',
    lg: '0 12px 24px rgba(0,0,0,0.16)',
  },
  borders: { radius: { sm: '4px', md: '8px', lg: '12px' }, width: { sm: '1px', md: '2px' } },
  motion: { duration: { fast: '120ms', base: '200ms' }, easing: { standard: 'ease-in-out' } },
  gradients: { primary: 'linear-gradient(135deg,#2563EB 0%,#14B8A6 100%)', mesh: [] },
  logo: { svg: '<svg viewBox="0 0 120 40"><text x="8" y="28">Acme</text></svg>' },
  createdAt: '2026-03-19T00:00:00.000Z',
};

export const GENERATED_BRAND_PLACEHOLDER = '__GENERATED_BRAND__';

export const CORE_MCP_TOOL_MATRIX: McpToolMatrixEntry[] = [
  {
    toolName: 'generate_brand_identity',
    category: 'core',
    expectedExportSymbol: 'generateColorPalette',
    minimalPayload: { brandName: 'Acme Health', industry: 'healthcare', style: 'minimal' },
  },
  {
    toolName: 'generate_color_palette',
    category: 'core',
    expectedExportSymbol: 'generateColorPalette',
    minimalPayload: {},
  },
  {
    toolName: 'generate_typography_system',
    category: 'core',
    expectedExportSymbol: 'generateTypographySystem',
    minimalPayload: {},
  },
  {
    toolName: 'generate_design_system',
    category: 'core',
    expectedExportSymbol: 'exportDesignTokens',
    minimalPayload: {
      brandName: 'Acme Health',
      industry: 'healthcare',
      style: 'minimal',
      exportFormats: ['json'],
    },
  },
  {
    toolName: 'export_design_tokens',
    category: 'core',
    expectedExportSymbol: 'exportDesignTokens',
    minimalPayload: { brand: GENERATED_BRAND_PLACEHOLDER, format: 'json' },
  },
  {
    toolName: 'create_brand_guidelines',
    category: 'core',
    expectedExportSymbol: 'exportDesignTokens',
    minimalPayload: { brand: GENERATED_BRAND_PLACEHOLDER, format: 'html' },
  },
  {
    toolName: 'validate_brand_consistency',
    category: 'core',
    expectedExportSymbol: 'validateBrandConsistency',
    minimalPayload: { brand: GENERATED_BRAND_PLACEHOLDER },
  },
];

export const VERTICAL_MCP_TOOL_MATRIX: McpToolMatrixEntry[] = [
  {
    toolName: 'generate_brand_b2b',
    category: 'vertical',
    expectedExportSymbol: 'generateBrandB2b',
    minimalPayload: { brand: GENERATED_BRAND_PLACEHOLDER },
  },
  {
    toolName: 'generate_brand_saas',
    category: 'vertical',
    expectedExportSymbol: 'generateBrandSaas',
    minimalPayload: { brand: GENERATED_BRAND_PLACEHOLDER },
  },
  {
    toolName: 'generate_brand_fintech',
    category: 'vertical',
    expectedExportSymbol: 'generateBrandFintech',
    minimalPayload: { brand: GENERATED_BRAND_PLACEHOLDER },
  },
  {
    toolName: 'generate_brand_healthcare',
    category: 'vertical',
    expectedExportSymbol: 'generateBrandHealthcare',
    minimalPayload: { brand: GENERATED_BRAND_PLACEHOLDER },
  },
];

export const MCP_TOOL_MATRIX = [...CORE_MCP_TOOL_MATRIX, ...VERTICAL_MCP_TOOL_MATRIX];

export const MCP_REGISTERED_TOOL_NAMES = [
  'create_brand_guidelines',
  'export_design_tokens',
  'generate_brand_accessibility',
  'generate_brand_affiliate',
  'generate_brand_analytics',
  'generate_brand_assets',
  'generate_brand_audio',
  'generate_brand_b2b',
  'generate_brand_campaign',
  'generate_brand_chatbot',
  'generate_brand_community',
  'generate_brand_competitive',
  'generate_brand_content',
  'generate_brand_crisis',
  'generate_brand_customer',
  'generate_brand_digital',
  'generate_brand_ecommerce',
  'generate_brand_email',
  'generate_brand_employer',
  'generate_brand_event',
  'generate_brand_fintech',
  'generate_brand_franchise',
  'generate_brand_globalisation',
  'generate_brand_healthcare',
  'generate_brand_identity',
  'generate_brand_influencer',
  'generate_brand_innovation',
  'generate_brand_interior',
  'generate_brand_investor',
  'generate_brand_legal',
  'generate_brand_loyalty',
  'generate_brand_marketplace',
  'generate_brand_motion',
  'generate_brand_naming',
  'generate_brand_newsletter',
  'generate_brand_packaging',
  'generate_brand_partnership',
  'generate_brand_photography',
  'generate_brand_pitch',
  'generate_brand_podcast',
  'generate_brand_pr',
  'generate_brand_print',
  'generate_brand_retail',
  'generate_brand_saas',
  'generate_brand_seo',
  'generate_brand_social',
  'generate_brand_subscription',
  'generate_brand_sustainability',
  'generate_brand_training',
  'generate_brand_ux',
  'generate_brand_video',
  'generate_brand_voice',
  'generate_brand_webinar',
  'generate_color_palette',
  'generate_design_system',
  'generate_typography_system',
  'refine_brand_element',
  'validate_brand_consistency',
] as const;

export const MCP_TOOL_MATRIX_NAMES = MCP_TOOL_MATRIX.map((entry) => entry.toolName);
