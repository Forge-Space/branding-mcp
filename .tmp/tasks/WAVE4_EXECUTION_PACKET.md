# Wave 4 Execution Packet

**Objective**
Create the MCP integration tool matrix fixture and expose a reusable server registration function so integration suites can assert registration/invocation contracts from a single source of truth.

**Current vs Expected**
- Current: no unified matrix for tool names/payloads/expected exports; tool registration is inline in `main()` and not reusable by tests.
- Expected: matrix fixture defines core vs vertical entries and expected export symbols; exported registration function wires tools/resources; `main()` delegates without behavior change; integration smoke can use it directly.

**Exact Files (Deduplicated)**
- `src/__tests__/integration/helpers/mcp-tool-matrix.ts`
- `src/index.ts`
- `src/__tests__/integration/mcp-server.test.ts`

**Non-Goals**
- Business logic changes in generator functions
- Adding new MCP tools or schemas
- CLI flag/transport behavior changes
- Version/publish metadata updates

**Checklist (Execution Order)**
1. Confirm Wave 3 completion and pull latest healthcare registration baseline.
2. Define matrix schema with: tool name, minimal valid payload, expected branding-core export symbol.
3. Partition matrix entries into core and vertical groups for selective suites.
4. Add `src/index.ts` exported registration function that preserves existing tool/resource wiring.
5. Refactor `main()` to call the new registration function while keeping startup semantics unchanged.
6. Update integration smoke test to import and execute the registration function against a mock/test server.
7. Verify matrix fixture is importable in integration tests with no TypeScript errors.
8. Run validation gates and publish matrix/registration contract assumptions to Wave 5.

**Validation Gates (Concrete Commands)**
- `npm run typecheck`
- `npm run check:cycles`
- `npm run test -- src/__tests__/integration/mcp-server.test.ts`

**Exit Criteria**
- Shared matrix fixture exists and exports core + vertical tool entries with payload + expected export symbol.
- `src/index.ts` exposes reusable registration function and `main()` delegates to it with no behavior drift.
- Integration smoke confirms registration function works in test harness.
- All validation-gate commands pass.

**Handoff to Wave 5**
Provide Wave 5 with stable matrix format, reusable registration API signature, and any helper assumptions so registration/invocation contract suites can be implemented without redefining fixtures.
