# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Import cycle detection** — `madge --circular` via `npm run check:cycles`
- **Dead code detection** — knip config with library export exclusions

### Removed

- Unused dependencies: `culori`, `pdfkit`, `satori`, `sharp`, `@types/pdfkit`

## [0.6.2] - 2026-03-07

### Fixed

- **WCAG contrast compliance** — Secondary (#3B82F6→#2563EB) and accent (#F59E0B→#B45309) colors now pass AA 4.5:1 on white backgrounds. Brand consistency score 75→100

## [0.6.1] - 2026-03-06

### Changed

- **Modern Horn brand templates** — Default Forge Space logo SVGs updated to Modern Horn icon geometry and Sora wordmark (#A78BFA/#8B5CF6/#6D28D9)

## [0.6.0] - 2026-03-01

### Added

- Public type exports from package entry point: `BrandIdentity`, `ColorPalette`, `TypographySystem`, `SpacingScale`, `ShadowSystem`, `BorderSystem`, `MotionSystem`, `GradientSystem`, `LogoOutput`, `BrandStyle`, `ColorHarmony`, `ExportFormat`
- Enables downstream packages (`@forgespace/brand-guide`) to re-export types without reaching into internal paths

## [0.5.0] - 2026-02-28

### Added

- New MCP tool: `generate_design_system` — complete design system in one call (identity + token export combined)
- 10 new tests for design system tool (198 total across 16 suites)

## [0.4.0] - 2026-02-28

### Added

- Gradient system generator with 5 style-aware presets (hero, button, card, text, background) across 8 brand styles
- Multi-variant logo generator: wordmark, monogram, abstract, icon (4 SVG variants per brand)
- Favicon generator producing 4 sizes (16, 32, 180, 512) with stroke optimization for small sizes
- OG image templates: default (1200x630), article (1200x630), social (1200x1200) with brand gradient backgrounds
- New MCP tool: `generate_brand_assets` for favicon and OG image generation from existing brand identity
- All 6 exporters support gradient tokens (CSS, Tailwind, W3C JSON, Figma, React, Sass)
- 55 new tests (188 total), 15 test suites

### Changed

- Logo generator uses brand typography font instead of hardcoded Inter
- `LogoOutput` now includes `variants` record alongside backward-compatible `svg` field
- `LogoConfig` accepts optional `style` for style-aware monogram/abstract shapes

## [0.3.0] - 2026-02-28

### Added

- Shadow/elevation system generator with 6 levels (none, sm, md, lg, xl, 2xl), brand-tinted colors, light/dark theme support
- Border/shape system generator with style-aware radius scales and border widths for all 8 brand styles
- Motion/animation system generator with duration scales, cubic-bezier easings, and transition presets per brand style
- New token types in `BrandIdentity`: `shadows`, `borders`, `motion` (backward-compatible, optional)
- All 6 exporters updated: CSS variables, Tailwind preset, W3C JSON, Figma tokens, React theme, Sass variables now include shadow, border, and motion tokens
- `generate_brand_identity` tool now includes shadows, borders, and motion in output
- 36 new tests (133 total), 98.36% statement coverage, 100% function coverage

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
