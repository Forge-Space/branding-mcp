<div align="center">
  <a href="https://forgespace.co">
    <img src="https://brand.forgespace.co/logos/wordmark.svg" alt="Forge Space" height="48">
  </a>
  <h1>@forgespace/branding-mcp</h1>
  <p>AI-powered brand identity generation via MCP — part of the <a href="https://github.com/Forge-Space">Forge Space</a> open developer workspace.</p>
</div>

[![CI](https://github.com/Forge-Space/branding-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Forge-Space/branding-mcp/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@forgespace/branding-mcp)](https://www.npmjs.com/package/@forgespace/branding-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Generate complete design systems — colors, typography, spacing, shadows, borders, motion tokens, gradients, multi-variant logos, favicons, and OG images with multi-format export. 58 MCP tools, zero API dependencies, algorithmic-first generation.

## Features

- **Color Palette Generation** — HSL-based color harmonies (complementary, analogous, triadic, etc.) with WCAG contrast validation
- **Typography System** — Modular type scales with curated font pairings
- **Spacing Scale** — Geometric progression spacing system
- **Shadow/Elevation System** — 6-level elevation scale with brand-tinted shadows, light/dark theme support
- **Border/Shape System** — Style-aware radius scales and border widths for all 8 brand styles
- **Motion/Animation System** — Duration scales, cubic-bezier easings, and transition presets per brand style
- **Gradient System** — 5 style-aware gradient presets (hero, button, card, text, background)
- **Multi-Variant Logo** — Wordmark, monogram, abstract, and icon variants with style-aware shapes
- **Favicon Generation** — 4 sizes (16, 32, 180 apple-touch, 512 PWA) from brand icon
- **OG Image Templates** — Default, article, and social formats with brand gradients
- **Multi-Format Export** — W3C Design Tokens, CSS custom properties, Tailwind preset, Figma tokens, React theme, Sass variables
- **Brand Validation** — WCAG contrast checking, completeness scoring, consistency analysis
- **Brand Guidelines** — HTML brand book generation

## Quick Start

```bash
npm install
npm run build
```

### Run from npm (stdio)

```bash
npx -y @forgespace/branding-mcp@latest
```

### Install globally

```bash
npm install -g @forgespace/branding-mcp
forgespace-branding-mcp
```

### IDE / client config

```json
{
  "mcpServers": {
    "forgespace-branding": {
      "command": "npx",
      "args": ["-y", "@forgespace/branding-mcp@latest"]
    }
  }
}
```

Set `ANTHROPIC_API_KEY` when you want AI-assisted refinement. The server also
works in algorithmic-only mode without external APIs.

### MCP Tools

Core and vertical tools are available (58 total). The table below highlights the core set plus key vertical generators, including healthcare.

| Tool                         | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `generate_brand_identity`    | Complete brand from name, industry, and style           |
| `generate_color_palette`     | Color palette with harmony and WCAG data                |
| `generate_typography_system` | Font pairing + modular type scale                       |
| `export_design_tokens`       | Export brand to JSON/CSS/Tailwind/Figma/React/Sass      |
| `create_brand_guidelines`    | Generate HTML brand book                                |
| `validate_brand_consistency` | Check WCAG compliance and completeness                  |
| `refine_brand_element`       | Iterate on specific brand elements                      |
| `generate_brand_assets`      | Generate favicons and OG images from brand              |
| `generate_design_system`     | Complete design system in one call (identity + export)  |
| `generate_brand_fintech`     | Fintech-specific strategy with compliance and security  |
| `generate_brand_healthcare`  | Healthcare strategy with care models and safety signals |

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

## Distribution

- **npm** — installable as
  [`@forgespace/branding-mcp`](https://www.npmjs.com/package/@forgespace/branding-mcp)
- **MCP Registry metadata** — `server.json` and `mcpName` are included for
  registry submission
- **Tag release automation** — pushing `v*` runs npm publish with provenance,
  then publishes the same version to the MCP Registry via GitHub OIDC
- **Weekly registry ops** — `.github/workflows/mcp-registry-status.yml` refreshes
  one issue with npm and MCP Registry drift, visibility, and next actions
- **GitHub** —
  [Forge-Space/branding-mcp](https://github.com/Forge-Space/branding-mcp)

## Architecture

```
src/
├── index.ts                    # MCP server entry
├── lib/
│   ├── branding-core/          # Core library (reusable)
│   │   ├── generators/         # Color, typography, spacing, logo, gradients, favicons, OG
│   │   ├── exporters/          # Multi-format token export
│   │   ├── validators/         # WCAG, consistency checks
│   │   └── documents/          # Brand book generation
│   ├── config.ts               # Environment config
│   ├── logger.ts               # Pino logging
│   └── types.ts                # TypeScript interfaces
├── tools/                      # 58 MCP tool registrations
└── resources/                  # Templates + knowledge base
```

## Ecosystem Integration

Part of the [Forge Space](https://github.com/Forge-Space) ecosystem:

- **mcp-gateway** — Register as MCP server (port 8033)
- **ui-mcp** — Consumes brand tokens via `brandId` parameter
- **uiforge-webapp** — Brand management UI at `/branding/*`
- **forge-patterns** — Shared configs and conventions

## Community

- [Documentation](https://docs.forgespace.co/docs)
- [GitHub Discussions](https://github.com/orgs/Forge-Space/discussions)
- [Issue tracker](https://github.com/Forge-Space/branding-mcp/issues)

## License

MIT
