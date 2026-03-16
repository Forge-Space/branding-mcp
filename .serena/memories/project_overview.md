# branding-mcp — Project Overview

**Version:** 0.7.1 (pre-release; bump needed before next publish)
**npm published:** 0.7.1 already on npm — bump to 0.8.0 before next release
**Updated:** 2026-03-15 (session 3)

## Quality State
- Tests: 231 passing, 19 suites
- TypeScript: 0 errors
- Lint: 0 errors
- Knip: 0 issues
- Audit: 0 vulnerabilities
- Build: clean

## Tools (10 MCP tools)
1. generate_brand_identity
2. generate_color_palette
3. generate_typography_system
4. export_design_tokens — supports 7 formats: json, css, tailwind, figma, react, sass, style-dictionary
5. create_brand_guidelines
6. validate_brand_consistency
7. refine_brand_element
8. generate_brand_assets
9. generate_design_system
10. generate_brand_voice (NEW in this session)

## Recent Changes (this session)
- Fixed flatted DoS vulnerability via npm audit fix
- Migrated claude-interpreter.ts from raw fetch to @anthropic-ai/sdk v0.78.0
- Added Style Dictionary exporter (src/lib/branding-core/exporters/style-dictionary.ts)
- Added generate_brand_voice tool with tone/audience inference, vocabulary, do/don't guidelines
- Added HTTP/SSE transport: MCP_TRANSPORT=http starts StreamableHTTP server on PORT (default 3000)
  - POST /mcp — JSON-RPC requests
  - GET /mcp — SSE stream (session-based via mcp-session-id header)
  - DELETE /mcp — close session

## Architecture
- Entry: src/index.ts — branches on config.transport ('stdio' | 'http')
- HTTP: src/lib/http-server.ts — StreamableHTTPServerTransport with session map
- Config: src/lib/config.ts — AppConfig adds transport + port fields
- Tools: src/tools/*.ts — each registers one MCP tool
- Core: src/lib/branding-core/ — generators, exporters, validators, ai interpreter
- Tests: src/__tests__/unit/*.test.ts — Jest ESM

## Run Commands
```bash
npm run typecheck     # tsc --noEmit
NODE_OPTIONS=--experimental-vm-modules npm test
npm run lint
npm run knip
npm run registry:check
MCP_TRANSPORT=http PORT=3000 node dist/index.js   # HTTP mode
```

## Next Steps
- Bump version to 0.8.0 (server.json + package.json + src/index.ts)
- Add integration tests for HTTP transport (actual HTTP calls)
- Consider adding OAuth/bearer auth middleware for HTTP transport
- Push to remote and create PR/release
