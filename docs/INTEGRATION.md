# Ecosystem Integration Guide

## mcp-gateway Registration

Register branding-mcp as an upstream server in mcp-gateway:

```json
{
  "name": "branding",
  "command": "node",
  "args": ["/path/to/branding-mcp/dist/index.js"],
  "port": 8033,
  "tools": [
    "generate_brand_identity",
    "generate_color_palette",
    "generate_typography_system",
    "export_design_tokens",
    "create_brand_guidelines",
    "validate_brand_consistency",
    "refine_brand_element"
  ]
}
```

## uiforge-mcp Integration

The UI generator can consume brand tokens to ensure generated components match the brand:

```typescript
// In uiforge-mcp, pass brandId to component generation
const component = await generateComponent({
  type: 'button',
  brandId: 'brand_abc123',
  // Brand tokens auto-applied to colors, fonts, spacing
});
```

## uiforge-webapp Routes

New frontend routes for brand management:

- `/branding` — Brand dashboard
- `/branding/new` — Create new brand identity
- `/branding/:id` — View/edit brand
- `/branding/:id/export` — Export design tokens
- `/branding/:id/guidelines` — View brand guidelines

## Design Token Flow

```
branding-mcp (generate) → export_design_tokens → format selection
  ├── json    → W3C Design Tokens → Style Dictionary pipeline
  ├── css     → CSS custom properties → direct import
  ├── tailwind → Tailwind preset → tailwind.config.ts
  ├── figma   → Figma token format → Tokens Studio sync
  ├── react   → Theme object → ThemeProvider
  └── sass    → SCSS variables → @import
```
