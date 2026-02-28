# branding-mcp — Project Overview

## Identity

- Package: @forgespace/branding-mcp v0.4.0
- GitHub: Forge-Space/branding-mcp
- Local: ~/Desenvolvimento/forge-space/branding-mcp
- Node.js 22, TypeScript, ESM

## Architecture

- MCP server (stdio transport): 8 tools, 2 resources
- Algorithmic-first generation (zero external API calls)
- Optional AI enhancement via Anthropic API (brand-interpreter)
- Core library: `src/lib/branding-core/` — reusable generators, exporters, validators

## Tools

1. `generate_brand_identity` — Full brand system (colors + typography + spacing + shadows + borders + motion)
2. `color_palette` — HSL color harmony with WCAG contrast
3. `typography_system` — Modular type scale + font pairing
4. `export_tokens` — Multi-format design token export (W3C JSON, CSS, Tailwind, Figma, React, Sass)
5. `guidelines` — Brand guidelines document generation (HTML/PDF)
6. `validate` — Brand consistency scoring + WCAG validation
7. `refine_brand_element` — AI-powered natural language refinement

## Generators (10 total)

- `color-palette.ts` — HSL harmonies, WCAG contrast, hexToHsl/hslToHex utilities
- `typography-system.ts` — Modular type scales, curated font pairings
- `spacing-scale.ts` — Geometric spacing progression
- `logo-generator.ts` — 4 SVG variants: wordmark, monogram, abstract, icon (v0.4.0)
- `shadow-system.ts` — 6-level elevation, brand-tinted, light/dark themes (v0.3.0)
- `border-system.ts` — Style-aware radii + border widths for all 8 brand styles (v0.3.0)
- `motion-system.ts` — Durations, cubic-bezier easings, transition presets (v0.3.0)
- `gradient-system.ts` — 5 presets (hero/button/card/text/background), linear/radial/conic (v0.4.0)
- `favicon-generator.ts` — 4 sizes (16/32/180/512), stroke optimization (v0.4.0)
- `og-image-generator.ts` — default/article/social templates with brand gradients (v0.4.0)

## Resources

- Templates catalog (`brand://templates`)
- Knowledge base (`brand://knowledge`)

## Test & Coverage

- 98.36% statement coverage, 100% function coverage, 89.72% branches
- 15 suites, 188 tests
- Generators: shadow (8), border (9), motion (10), plus exporter tests (9 new)

## CI Status

- CI: passing (PR #6 merged — v0.3.0 design system completeness)
- Security scan: passing (trufflehog pinned to @v3.93.4, was @main)
- Release: v0.3.0 tagged and released on GitHub
- .gitignore expanded to 18 lines (was 7) — covers .uiforge/, .serena/, .claude/, SQLite

## Key Files

- `src/index.ts` — MCP server entry + tool registration
- `src/tools/` — 7 tool definitions with Zod schemas
- `src/lib/branding-core/generators/` — 7 generators (color, typography, spacing, logo, shadow, border, motion)
- `src/lib/branding-core/exporters/` — 6 format exporters (CSS, Tailwind, W3C JSON, Figma, React, Sass)
- `src/lib/branding-core/validators/` — WCAG contrast, consistency
- `src/lib/branding-core/ai/` — Brand interpretation layer (keyword/Claude/auto strategies)

## Release History

- v0.1.0 — Initial: 7 tools, 4 generators, 6 exporters
- v0.2.0 — AI interpretation layer for natural language refinement
- v0.3.0 — Design system completeness: shadow, border, motion generators + exporter updates
- v0.4.0 — Brand asset expansion: gradients, multi-variant logos, favicons, OG images, generate_brand_assets tool

## Key Patterns

- Optional field + if-guard for backward compat (gradients?, shadows?, borders?, motion?)
- BrandStyle-aware generation: each of 8 styles maps to different configs
- LogoOutput.svg preserved as wordmark for backward compat; .variants record adds all 4

## Open Issues / PRs

- None
