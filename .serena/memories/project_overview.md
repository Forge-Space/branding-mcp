# branding-mcp — Project Overview

## Identity

- Package: @forgespace/branding-mcp v0.2.0
- GitHub: Forge-Space/branding-mcp
- Local: ~/Desenvolvimento/forge-space/branding-mcp
- Node.js 22, TypeScript, ESM

## Architecture

- MCP server (stdio transport): 7 tools, 2 resources
- Algorithmic-first generation (zero external API calls)
- Optional AI enhancement via Anthropic API (brand-interpreter)
- Core library: `src/lib/branding-core/` — reusable generators, exporters, validators

## Tools

1. `generate_brand_identity` — Full brand system from keywords/description
2. `color_palette` — HSL color harmony with WCAG contrast
3. `typography_system` — Modular type scale + font pairing
4. `export_tokens` — Multi-format design token export (W3C JSON, CSS, Tailwind, Figma, React, Sass)
5. `guidelines` — Brand guidelines document generation (HTML/PDF)
6. `validate` — Brand consistency scoring + WCAG validation
7. `refine_brand_element` — AI-powered natural language refinement

## Resources

- Templates catalog
- Knowledge base

## Test & Coverage

- 97.63% coverage, 8 suites, 97 tests
- Generators: 98.16%, Validators: 97.36%, AI interpreters: 92.45%

## CI Status

- CI: passing (PR #5 merged — fixed Prettier formatting)
- Security scan: passing
- Release workflow: should pass now (was blocked by same Prettier issue)

## Key Files

- `src/index.ts` — MCP server entry + tool registration
- `src/tools/` — 7 tool definitions with Zod schemas
- `src/lib/branding-core/generators/` — Color, typography, spacing, logo
- `src/lib/branding-core/exporters/` — 6 format exporters
- `src/lib/branding-core/validators/` — WCAG contrast, consistency
- `src/ai/` — Brand interpretation layer (keyword/Claude/auto strategies)

## Next: v0.3.0 — Design System Completeness

- Plan at `.claude/plans/design-system-completeness.md`
- 3 new generators: shadow/elevation, border/shape, motion/animation
- 1 new tool: `generate_design_system` (combines all generators)
- All 6 exporters to be updated with new token types
- Task claimed: `branding-mcp-feature-expansion` in queue

## Open Issues

- None

## Open PRs

- None
