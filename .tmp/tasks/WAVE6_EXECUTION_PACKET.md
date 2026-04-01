# Wave 6 Execution Packet

**Objective**
Add final integration guard that enforces tool-to-export consistency across matrix definitions, branding-core exports, and registered MCP tools.

**Current vs Expected**
- Current: drift between registered tools, matrix mappings, and branding-core exports can occur without a dedicated guard.
- Expected: integration test cross-checks matrix export symbols against branding-core exports and registration inventory; suite fails fast on mismatch with focused MCP chain coverage entrypoint.

**Exact Files (Deduplicated)**
- `src/__tests__/integration/mcp-server-export-consistency.test.ts`
- `src/__tests__/integration/helpers/mcp-tool-matrix.ts`

**Non-Goals**
- Publishing/versioning/release process updates
- Changelog/release notes workflow changes
- New feature/tool additions outside consistency guards

**Checklist (Execution Order)**
1. Confirm Wave 5 registration + invocation contract suites are passing.
2. Reuse existing matrix structure; avoid redefining tool metadata in a second fixture.
3. Implement export-consistency assertions that verify each matrix export symbol exists in branding-core exports.
4. Add assertions that each registered tool has a matrix export mapping.
5. Add mismatch diagnostics that identify missing symbol or unmapped registered tool by name.
6. Ensure test scope is consistency-only and does not duplicate invocation payload validation logic.
7. Run validation gates and confirm MCP integration chain is green end-to-end.

**Validation Gates (Concrete Commands)**
- `npm run typecheck`
- `npm run test -- src/__tests__/integration/mcp-server-export-consistency.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-registration.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-invocation-core.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-invocation-vertical.test.ts`

**Exit Criteria**
- Export-consistency test fails when matrix symbol is absent from branding-core exports.
- Export-consistency test fails when a registered tool lacks matrix mapping.
- Focused MCP chain coverage commands all pass.

**Handoff to Next Phase**
Handoff to release/hardening track with: final green validation command outputs, matrix version baseline, and note that future tool additions must update matrix + registration + export-consistency tests in one change set.
