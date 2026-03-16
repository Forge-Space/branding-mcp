# branding-mcp — Project Overview

**Version**: 0.8.0  
**Package**: @forgespace/branding-mcp  
**Last updated**: 2026-03-15

## Quality State
- **252 tests, 22 suites, 0 TS errors, 0 lint, 0 knip, 0 audit vulns**
- Coverage: 99.71% stmt, 91.3% fn, **100% branch**, **100% line**
- Main branch: clean, 0 open PRs, 0 open issues
- v0.8.0 tag pushed → triggers npm publish workflow

## 10 MCP Tools
1. generate_brand_identity
2. generate_color_palette
3. generate_typography_system
4. export_design_tokens (7 formats: json, css, tailwind, figma, react, sass, style-dictionary)
5. create_brand_guidelines
6. validate_brand_consistency
7. refine_brand_element
8. generate_brand_assets
9. generate_design_system
10. generate_brand_voice ← new in v0.8.0

## Architecture
- `src/lib/branding-core/` — generators, exporters, validators, ai interpreter
- `src/lib/config.ts` — AppConfig with TransportMode ('stdio' | 'http')
- `src/lib/http-server.ts` — HTTP/SSE transport (MCP_TRANSPORT=http PORT=3000)
- `src/lib/logger.ts` — pino logger
- Production deps: @modelcontextprotocol/sdk, pino, zod, @anthropic-ai/sdk@0.78.0

## v0.8.0 Changes (2026-03-15)
- Style Dictionary exporter (cross-platform token compatibility)
- generate_brand_voice tool (tone/copy guidelines, inferTone/inferAudience)
- HTTP/SSE transport alongside stdio
- Migrated claude-interpreter.ts from raw fetch to @anthropic-ai/sdk
- Fixed flatted DoS vulnerability via npm audit fix
- Coverage: favicon-generator, contrast-checker, http-server, brand-interpreter AI fallback all at 100%

## Key Gotchas
- Bump package.json + server.json + src/index.ts VERSION_STRING when releasing
- jest.unstable_mockModule() required for ESM module mocking (not jest.mock())
- NODE_OPTIONS=--experimental-vm-modules required for Jest ESM
- describe/it/expect LSP errors in test files are false positives (Jest globals)
- Transport: MCP_TRANSPORT=http, PORT=3000 env vars for HTTP mode
- AI generation: ANTHROPIC_API_KEY required for strategy='ai' | 'auto'

## Release Process
- Bump version in 3 files, update CHANGELOG, commit + push
- `git tag vX.Y.Z && git push origin vX.Y.Z` triggers publish.yml
- publish.yml: validates, npm publish --provenance --access public, MCP Registry, GitHub release
