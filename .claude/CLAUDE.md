# @forgespace/branding-mcp

MCP server for AI-powered brand identity generation. Part of the Forge Space ecosystem.

## Architecture

- **MCP Server**: stdio transport, 7 tools, 2 resources
- **Core Library**: `src/lib/branding-core/` — reusable generators, exporters, validators
- **Algorithmic-first**: Zero external API calls for generation. Optional AI enhancement via Anthropic API.

## Key Modules

- `generators/color-palette.ts` — HSL color harmony with WCAG contrast
- `generators/typography-system.ts` — Modular type scale + font pairing
- `generators/spacing-scale.ts` — Geometric spacing progression
- `generators/logo-generator.ts` — SVG text-based logos
- `exporters/` — W3C JSON, CSS, Tailwind, Figma, React, Sass
- `validators/` — WCAG contrast, brand consistency scoring
- `tools/` — 7 MCP tool registrations with Zod schemas

## Commands

```bash
npm run build        # TypeScript compilation
npm run validate     # lint + format + test
npm run test         # Jest with ESM support
npm run dev          # Watch mode
```

## Conventions

- Node >=22, ESM, TypeScript strict
- Functions <50 lines, complexity <10
- Test coverage >=80%
- Conventional commits: feat, fix, refactor, chore, docs
- No comments unless asked
