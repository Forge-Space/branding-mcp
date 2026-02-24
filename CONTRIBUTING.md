# Contributing to @forgespace/branding-mcp

## Development Setup

```bash
git clone https://github.com/Forge-Space/branding-mcp.git
cd branding-mcp
npm install
npm run build
npm run test
```

## Workflow

1. Create a feature branch from `main`
2. Make changes following project conventions
3. Run `npm run validate` (lint + format + test)
4. Create a PR with conventional commit messages

## Conventions

- **TypeScript**: Strict mode, ES2022, NodeNext modules
- **Functions**: <50 lines, cyclomatic complexity <10
- **Testing**: >80% coverage on new code
- **Commits**: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`
- **Line width**: 100 characters max

## Adding a New Exporter

1. Create `src/lib/branding-core/exporters/your-format.ts`
2. Export a function `exportYourFormat(brand: BrandIdentity): string`
3. Register in `src/lib/branding-core/index.ts`
4. Add to `EXPORTERS` map in `src/tools/export-design-tokens.ts`
5. Add to `ExportFormat` type in `src/lib/types.ts`
6. Write tests in `src/__tests__/unit/design-tokens.test.ts`

## Adding a New MCP Tool

1. Create `src/tools/your-tool.ts` following existing patterns
2. Export a `registerYourTool(server: McpServer)` function
3. Register in `src/index.ts`
4. Add integration test
