# branding-mcp — Project Overview

## Current State (2026-03-15, session 4)
- Version: **0.8.0** (published via git tag, npm publish workflow triggered)
- **267 tests, 21 suites, 0 TS errors, 0 lint, 0 knip, 0 audit vulns**
- Coverage: **99.85% stmt, 96.06% branch, 100% fn, 100% line**
- Main branch: clean, latest commit `f9bb3a8`

## 10 MCP Tools
1. generate_brand_identity
2. generate_color_palette
3. generate_typography_system
4. export_design_tokens (7 formats: json, css, tailwind, figma, react, sass, **style-dictionary**)
5. create_brand_guidelines
6. validate_brand_consistency
7. refine_brand_element
8. generate_brand_assets
9. generate_design_system
10. **generate_brand_voice** (new in v0.8.0)

## v0.8.0 Changes
- Style Dictionary exporter (`src/lib/branding-core/exporters/style-dictionary.ts`)
- generate_brand_voice tool (BrandVoiceTone, BrandVoiceAudience, BrandVoiceGuidelines types)
- HTTP/SSE transport: `MCP_TRANSPORT=http PORT=3000`, `src/lib/http-server.ts`
- Migrated claude-interpreter.ts from raw fetch to @anthropic-ai/sdk@0.78.0
- Fixed flatted DoS vulnerability
- Coverage improvements: all test files improved, branch coverage from ~80% to 96%

## Architecture
- `src/lib/branding-core/` — generators, exporters, validators, ai interpreter
- `src/lib/config.ts` — AppConfig with TransportMode ('stdio' | 'http')
- `src/lib/http-server.ts` — HTTP/SSE transport (Node HTTP server, GET/POST/DELETE /mcp)
- `src/index.ts` — registers all 10 tools, reads config, starts transport
- Production deps: @modelcontextprotocol/sdk, pino, zod, @anthropic-ai/sdk@0.78.0

## Release Process
1. Bump `package.json`, `server.json`, `src/index.ts` (version in 3 places)
2. Update `CHANGELOG.md`
3. `git tag vX.Y.Z && git push origin vX.Y.Z` — triggers `publish.yml` workflow

## Known Gotchas
- `jest.unstable_mockModule()` required for ESM module mocking (NOT `jest.mock()`)
- `NODE_OPTIONS=--experimental-vm-modules` for Jest ESM
- `describe/it/expect` LSP errors in test files are false positives — tests run fine
- Bump 3 files when releasing: package.json, server.json, src/index.ts
- SonarCloud needs SHA-pinned third-party actions in CI

## Remaining Impossible/Dead-Code Branches (96% → 100% gap)
- `http-server.ts` line 11: `req.url ?? '/'` — ESM mock limitation
- `color-palette.ts` lines 113-120, `logo-generator.ts` line 62, `shadow-system.ts` line 43 — dead code
- `keyword-interpreter.ts` line 48: `intent.baseColor` branch — no COLOR_KEYWORDS entry sets baseColor

## Next Candidates
1. Publish v0.8.0 to npm registry (no blockers — tag already pushed)
2. Add integration tests for full MCP tool chain
3. Upgrade GitHub Actions to v6 (SonarCloud SHA pinning for CI)
