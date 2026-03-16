# branding-mcp — Project Overview

## Current State (2026-03-16, session 7)
- Version: **0.55.2** (tag pushed, publish workflow triggered)
- **1090 tests, 68 suites, 0 TS errors, 0 lint, 0 knip, 0 audit vulns**
- Main branch: clean, latest commit `0f11f8e`
- 0 open PRs, 0 open issues

## 26 MCP Tools
1. generate_brand_identity
2. generate_color_palette
3. generate_typography_system
4. export_design_tokens (7 formats: json, css, tailwind, figma, react, sass, style-dictionary)
5. create_brand_guidelines
6. validate_brand_consistency
7. refine_brand_element
8. generate_brand_assets
9. generate_design_system
10. generate_brand_voice
11. generate_brand_ecommerce
12. generate_brand_marketplace
13. generate_brand_subscription
14. generate_brand_b2b
15. generate_brand_saas
16. generate_brand_fintech (added v0.55.0)
17-26. Additional vertical tools

## Recent Changes
- v0.55.2: Added 34 new tests (1056→1090). SHA-pinned github/codeql-action to v4.33.0. All missing style/industry branches now covered in brand-social, brand-email, brand-seo.
- v0.55.1: Fixed MCP Registry server ID casing (`io.github.Forge-Space/branding-mcp` — PascalCase required)
- v0.55.0: Added `generate_brand_fintech` tool
- v0.54.0: Added `generate_brand_saas` tool
- Deps updated: jest ^30.3.0, @types/node ^25.5.0, @anthropic-ai/sdk ^0.79.0, knip ^5.87.0, lint-staged ^16.4.0

## Architecture
- `src/lib/branding-core/` — generators, exporters, validators, ai interpreter
- `src/lib/branding-core/tools/` — individual MCP tool implementations
- `src/lib/config.ts` — AppConfig with TransportMode ('stdio' | 'http')
- `src/lib/http-server.ts` — HTTP/SSE transport
- `src/index.ts` — registers all 26 tools, version string, starts transport
- Production deps: @modelcontextprotocol/sdk, pino, zod, @anthropic-ai/sdk

## Release Process
1. Bump version in `package.json`, `server.json`, `src/index.ts` (3 places)
2. Update `CHANGELOG.md`
3. `git tag vX.Y.Z && git push origin vX.Y.Z` — triggers `publish.yml` workflow
4. Publish workflow: builds, publishes to npm, registers with MCP Registry
   - MCP Registry server name MUST be `io.github.Forge-Space/branding-mcp` (PascalCase)

## Known Gotchas
- `jest.unstable_mockModule()` required for ESM module mocking (NOT `jest.mock()`)
- `NODE_OPTIONS=--experimental-vm-modules` for Jest ESM
- Jest 30: `--testPathPatterns` (plural, not --testPathPattern)
- Bump 3 files when releasing: package.json, server.json, src/index.ts
- MCP Registry server name is case-sensitive: `io.github.Forge-Space/` (capital F-S required)
- CodeQL actions SHA-pinned to `f0213c31c702f929cf06ddb900ac315d246a8997` (v4.33.0)

## Next Candidates
1. Add next vertical brand tool (e.g., generate_brand_healthcare, generate_brand_education)
2. Integration tests for full MCP tool chain (end-to-end tool call verification)
3. Further branch coverage improvements (currently ~97%)
