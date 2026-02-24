# MCP Tool API Reference

## generate_brand_identity

Generate a complete brand identity from minimal input.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| brandName | string | yes | Brand name (1-100 chars) |
| industry | string | yes | Industry sector |
| style | BrandStyle | yes | Visual direction |
| tagline | string | no | Brand tagline |
| baseColor | hex string | no | Base color preference |
| harmony | ColorHarmony | no | Color harmony type |
| theme | ColorTheme | no | Light/dark/both |
| headingCategory | FontCategory | no | Heading font category |
| bodyCategory | FontCategory | no | Body font category |
| scaleRatio | TypeScaleRatio | no | Typography scale ratio |

**Returns:** Complete `BrandIdentity` JSON with colors, typography, spacing, and logo.

## generate_color_palette

Generate a color palette from a base color and harmony.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| baseColor | hex string | no | Base hex color (#RRGGBB) |
| harmony | ColorHarmony | no | Harmony type |
| theme | ColorTheme | no | Neutral scale direction |

**Returns:** `ColorPalette` with primary, secondary, accent, neutrals, semantic colors, and WCAG contrast data.

## generate_typography_system

Generate a typography system with font pairing.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| headingCategory | FontCategory | no | Heading font type |
| bodyCategory | FontCategory | no | Body font type |
| scaleRatio | TypeScaleRatio | no | Modular scale ratio |
| baseSize | number (12-24) | no | Base font size in px |

**Returns:** `TypographySystem` with fonts, scale ratio, and type steps.

## export_design_tokens

Export a brand identity to various design token formats.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| brand | string (JSON) | yes | Full BrandIdentity JSON |
| format | ExportFormat | yes | json, css, tailwind, figma, react, sass |

**Returns:** Formatted design tokens string.

## create_brand_guidelines

Generate a brand guidelines document.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| brand | string (JSON) | yes | Full BrandIdentity JSON |
| format | BrandDocFormat | no | html (default) or pdf |

**Returns:** HTML brand book document.

## validate_brand_consistency

Check a brand identity for completeness and accessibility compliance.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| brand | string (JSON) | yes | Full BrandIdentity JSON |

**Returns:** `BrandValidationResult` with score (0-100), validity flag, and issues list.

## refine_brand_element

Iterate on a specific element of an existing brand.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| brand | string (JSON) | yes | Full BrandIdentity JSON |
| element | string | yes | colors, typography, or spacing |
| feedback | string | yes | Natural language refinement instruction |

**Returns:** Updated `BrandIdentity` JSON.

## Enums

**BrandStyle:** minimal, bold, elegant, playful, corporate, tech, organic, retro

**ColorHarmony:** complementary, analogous, triadic, split-complementary, tetradic, monochromatic

**ColorTheme:** light, dark, both

**FontCategory:** serif, sans-serif, monospace, display, handwriting

**TypeScaleRatio:** minor-second, major-second, minor-third, major-third, perfect-fourth, augmented-fourth, perfect-fifth, golden-ratio

**ExportFormat:** json, css, tailwind, figma, react, sass
