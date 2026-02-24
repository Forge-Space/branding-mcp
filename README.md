# @forgespace/branding-mcp

> **AI-powered brand identity generation via MCP — part of the [Forge Space](https://github.com/Forge-Space) open developer workspace.**

[![CI](https://github.com/Forge-Space/branding-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Forge-Space/branding-mcp/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Generate color palettes, typography systems, design tokens, and brand guidelines with multi-format export. 7 MCP tools, zero API dependencies, algorithmic-first generation.

## Features

- **Color Palette Generation** — HSL-based color harmonies (complementary, analogous, triadic, etc.) with WCAG contrast validation
- **Typography System** — Modular type scales with curated font pairings
- **Spacing Scale** — Geometric progression spacing system
- **SVG Logo Generation** — Text-based logos with brand colors
- **Multi-Format Export** — W3C Design Tokens, CSS custom properties, Tailwind preset, Figma tokens, React theme, Sass variables
- **Brand Validation** — WCAG contrast checking, completeness scoring, consistency analysis
- **Brand Guidelines** — HTML brand book generation

## Quick Start

```bash
npm install
npm run build
```

### As MCP Server (stdio)

```json
{
  "mcpServers": {
    "branding": {
      "command": "node",
      "args": ["path/to/branding-mcp/dist/index.js"]
    }
  }
}
```

### MCP Tools

| Tool                         | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| `generate_brand_identity`    | Complete brand from name, industry, and style      |
| `generate_color_palette`     | Color palette with harmony and WCAG data           |
| `generate_typography_system` | Font pairing + modular type scale                  |
| `export_design_tokens`       | Export brand to JSON/CSS/Tailwind/Figma/React/Sass |
| `create_brand_guidelines`    | Generate HTML brand book                           |
| `validate_brand_consistency` | Check WCAG compliance and completeness             |
| `refine_brand_element`       | Iterate on specific brand elements                 |

### MCP Resources

| Resource        | URI                 | Description                       |
| --------------- | ------------------- | --------------------------------- |
| Brand Templates | `brand://templates` | Pre-configured industry templates |
| Brand Knowledge | `brand://knowledge` | Color theory and typography rules |

## Development

```bash
npm run dev          # Watch mode
npm run validate     # Lint + format + test
npm run test         # Run tests
npm run test:coverage # Coverage report
npm run build        # Build TypeScript
```

## Architecture

```
src/
├── index.ts                    # MCP server entry
├── lib/
│   ├── branding-core/          # Core library (reusable)
│   │   ├── generators/         # Color, typography, spacing, logo
│   │   ├── exporters/          # Multi-format token export
│   │   ├── validators/         # WCAG, consistency checks
│   │   └── documents/          # Brand book generation
│   ├── config.ts               # Environment config
│   ├── logger.ts               # Pino logging
│   └── types.ts                # TypeScript interfaces
├── tools/                      # 7 MCP tool registrations
└── resources/                  # Templates + knowledge base
```

## Ecosystem Integration

Part of the [Forge Space](https://github.com/Forge-Space) ecosystem:

- **mcp-gateway** — Register as MCP server (port 8033)
- **uiforge-mcp** — Consumes brand tokens via `brandId` parameter
- **uiforge-webapp** — Brand management UI at `/branding/*`
- **forge-patterns** — Shared configs and conventions

## License

MIT
