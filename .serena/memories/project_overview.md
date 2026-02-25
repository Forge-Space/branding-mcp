# Branding MCP — Project Overview

## Identity

- **Package**: @forgespace/branding-mcp v1.3.0
- **GitHub**: Forge-Space/branding-mcp
- **Local**: ~/Desenvolvimento/forge-space/branding-mcp
- **Transport**: MCP stdio, TypeScript, Node 22+, ESM

## Purpose

Algorithmic brand identity generation — palette, typography, spacing, logo design, validation, export, and analysis. No external AI APIs required (purely algorithmic).

## Tools (7)

1. **generate_palette** — Color palette generation with harmony rules
2. **generate_typography** — Type scale and font pairing suggestions
3. **generate_spacing** — Spacing scale generation
4. **generate_logo** — SVG logo generation
5. **validate_brand** — Brand consistency validation
6. **export_brand** — Export brand assets in multiple formats
7. **analyze_brand** — Brand analysis and scoring

## Tech Stack

- **Runtime**: Node.js 22+, ESM
- **Language**: TypeScript
- **Testing**: Jest with ESM
- **Coverage**: 97.63% (highest in ecosystem)
- **Security**: trufflehog + npm audit
- **Linting**: ESLint + Prettier

## Architecture

Pure algorithmic approach — no LLM calls, no external APIs. All generation is deterministic based on input parameters (seed colors, industry, mood).

## Ecosystem Role

Provides brand identity tooling for the Forge Space ecosystem. Can be used standalone or composed with siza-mcp for branded UI generation.
