# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-02-24

### Added

- AI interpretation layer for natural language brand refinement (`src/lib/branding-core/ai/`)
- Strategy pattern: keyword (zero-cost), Claude API (Anthropic Messages), and auto (fallback) interpreters
- `BrandIntent` abstraction decoupling NL understanding from generator execution
- 20+ color keywords (warm, vibrant, premium, muted, dark, elegant, etc.) with HSL shift values
- 15+ typography keywords (serif, editorial, dramatic, modern, compact, etc.) with font/scale mapping
- `intent-applier` module applying HSL hue/saturation/lightness shifts before palette generation
- Structured Claude prompts with brand context, JSON schema, and design principles
- Optional `strategy` parameter on `refine_brand_element` tool (keyword/ai/auto)
- `_interpretation` metadata in refinement responses showing strategy used and reasoning
- 24 new tests for AI interpreter, intent applier, and strategy selection (97 total)

## [0.1.0] - 2026-02-24

### Added

- Initial project structure with MCP server architecture
- Color palette generator with 6 harmony modes (complementary, analogous, triadic, split-complementary, tetradic, monochromatic)
- Typography system generator with modular type scales and curated font pairings
- Spacing scale generator with geometric progression
- SVG logo generator with brand colors and initials
- 6 design token exporters: W3C JSON, CSS custom properties, Tailwind preset, Figma tokens, React theme, Sass variables
- WCAG contrast checker (AA/AAA compliance)
- Brand consistency validator with scoring
- HTML brand guidelines generator
- 7 MCP tools: generate_brand_identity, generate_color_palette, generate_typography_system, export_design_tokens, create_brand_guidelines, validate_brand_consistency, refine_brand_element
- 2 MCP resources: brand templates catalog, brand knowledge base
- Unit and integration test suite
- CI/CD workflows (lint, test, build, security scan)
