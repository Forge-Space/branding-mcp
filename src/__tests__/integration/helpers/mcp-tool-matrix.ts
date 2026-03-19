export type McpToolCategory = 'core' | 'vertical';

export interface McpToolMatrixEntry {
  toolName: string;
  category: McpToolCategory;
  expectedExportSymbol: string;
  minimalPayload: Record<string, unknown>;
}

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

export const MCP_REGISTERED_TOOL_NAMES = `
create_brand_guidelines
export_design_tokens
generate_brand_accessibility
generate_brand_affiliate
generate_brand_analytics
generate_brand_assets
generate_brand_audio
generate_brand_b2b
generate_brand_campaign
generate_brand_chatbot
generate_brand_community
generate_brand_competitive
generate_brand_content
generate_brand_crisis
generate_brand_customer
generate_brand_digital
generate_brand_ecommerce
generate_brand_email
generate_brand_employer
generate_brand_event
generate_brand_fintech
generate_brand_franchise
generate_brand_globalisation
generate_brand_healthcare
generate_brand_identity
generate_brand_influencer
generate_brand_innovation
generate_brand_interior
generate_brand_investor
generate_brand_legal
generate_brand_loyalty
generate_brand_marketplace
generate_brand_motion
generate_brand_naming
generate_brand_newsletter
generate_brand_packaging
generate_brand_partnership
generate_brand_photography
generate_brand_pitch
generate_brand_podcast
generate_brand_pr
generate_brand_print
generate_brand_retail
generate_brand_saas
generate_brand_seo
generate_brand_social
generate_brand_subscription
generate_brand_sustainability
generate_brand_training
generate_brand_ux
generate_brand_video
generate_brand_voice
generate_brand_webinar
generate_color_palette
generate_design_system
generate_typography_system
refine_brand_element
validate_brand_consistency
`
  .trim()
  .split('\n') as readonly string[];

export const MCP_TOOL_MATRIX_NAMES = MCP_TOOL_MATRIX.map((entry) => entry.toolName);
