# Wave 5 Execution Packet

**Objective**
Add integration guards for full tool registration set and end-to-end MCP invocation contract coverage for both core and vertical tools using matrix-driven suites.

**Current vs Expected**
- Current: no strict assertion that registered tool set exactly matches expected inventory; invocation contract checks are inconsistent across tool categories.
- Expected: registration test fails on missing/extra/duplicate tools; core and vertical invocation suites run from matrix entries and enforce shared MCP response contract assertions with actionable error messages.

**Exact Files (Deduplicated)**
- `src/__tests__/integration/mcp-server-registration.test.ts`
- `src/__tests__/integration/helpers/mcp-test-server.ts`
- `src/__tests__/integration/mcp-server-invocation-core.test.ts`
- `src/__tests__/integration/helpers/mcp-contract-assertions.ts`
- `src/__tests__/integration/mcp-server-invocation-vertical.test.ts`
- `src/__tests__/integration/helpers/mcp-tool-matrix.ts`

**Non-Goals**
- Deep snapshotting of full business payload bodies
- Performance benchmarking
- Adding new tool registrations
- Rewriting unrelated unit tests or generator capabilities

**Checklist (Execution Order)**
1. Confirm Wave 4 matrix + reusable registration function are complete and stable.
2. Build registration-set test that compares actual registered names to matrix names exactly.
3. Add explicit duplicate-name detection in registration assertions.
4. Ensure failure output highlights missing and extra tool names clearly.
5. Implement shared contract assertion helpers for MCP response shape/serialization/error invariants.
6. Add matrix-driven core invocation suite using minimal valid payloads.
7. Add matrix-driven vertical invocation suite using same shared contract helper.
8. Ensure each failure message includes tool name and fixture/payload source for quick triage.
9. Run validation gates and bundle contract assumptions for Wave 6 export-consistency guard.

**Validation Gates (Concrete Commands)**
- `npm run typecheck`
- `npm run test -- src/__tests__/integration/mcp-server-registration.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-invocation-core.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-invocation-vertical.test.ts`

**Exit Criteria**
- Registration suite enforces exact matrix parity and rejects duplicates.
- Core invocation suite enforces shared MCP contract for all core matrix entries.
- Vertical invocation suite enforces shared MCP contract for all vertical matrix entries.
- Failure diagnostics are actionable per tool.
- All validation-gate commands pass.

**Handoff to Wave 6**
Provide Wave 6 with finalized matrix, registration parity guarantees, and invocation-contract helper behavior so export-consistency assertions can be layered without changing prior suite semantics.
