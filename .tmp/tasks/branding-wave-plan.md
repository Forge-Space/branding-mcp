## Branding-MCP Wave Plan (Sequencing Only)

### Wave 1
**Worktree branch:** `feature/branding-wave1-healthcare-contract-exports`
**Tasks:**
- `task_branding_healthcare_01_define-healthcare-output-contract-and-exports`

**Gate commands:**
- `npx ts-node --compiler-options '{"module":"commonjs"}' "/Users/lucassantana/.config/opencode/skills/task-management/scripts/task-cli.ts" status`
- `npx ts-node --compiler-options '{"module":"commonjs"}' "/Users/lucassantana/.config/opencode/skills/task-management/scripts/task-cli.ts" validate generate-brand-healthcare-tool`
- `npm run typecheck`

**GO:** Wave 1 done and typecheck passes
**STOP:** Any gate fails or scope expands

### Wave 2
**Worktree branch:** `feature/branding-wave2-healthcare-generator-wrapper-tests`
**Tasks:**
- `task_branding_healthcare_02_implement-healthcare-vertical-generator-behavior`
- `task_branding_healthcare_03_add-healthcare-generator-unit-tests-for-branches-and-fallback`
- `task_branding_healthcare_04_create-mcp-wrapper-for-generate-brand-healthcare`

**Gate commands:**
- `npm run typecheck`
- `npm run check:cycles`
- `npm run test -- src/__tests__/unit/brand-healthcare.test.ts`

**GO:** All wave 2 gates pass
**STOP:** Any gate fails

### Wave 3
**Worktree branch:** `feature/branding-wave3-healthcare-registration-docs`
**Tasks:**
- `task_branding_healthcare_05_wire-healthcare-tool-into-server-registration-and-integration-coverage`
- `task_branding_healthcare_06_update-tool-inventory-docs-for-healthcare-vertical`

**Gate commands:**
- `npm run typecheck`
- `npm run test -- src/__tests__/integration/mcp-server.test.ts`
- `npm run test -- src/__tests__/unit/brand-healthcare.test.ts`

**GO:** All wave 3 gates pass
**STOP:** Any gate fails

### Wave 4
**Worktree branch:** `feature/branding-wave4-mcp-matrix-registration-harness`
**Tasks:**
- `task_branding_mcp_01_create-mcp-integration-tool-matrix-fixture`
- `task_branding_mcp_02_expose-reusable-mcp-registration-function`

**Gate commands:**
- `npm run typecheck`
- `npm run check:cycles`
- `npm run test -- src/__tests__/integration/mcp-server.test.ts`

**GO:** All wave 4 gates pass
**STOP:** Any gate fails

### Wave 5
**Worktree branch:** `feature/branding-wave5-registration-invocation-contract-tests`
**Tasks:**
- `task_branding_mcp_03_assert-complete-mcp-tool-registration-set`
- `task_branding_mcp_04_add-core-mcp-tool-invocation-contract-tests`
- `task_branding_mcp_05_add-vertical-mcp-tool-invocation-contract-tests`

**Gate commands:**
- `npm run typecheck`
- `npm run test -- src/__tests__/integration/mcp-server-registration.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-invocation-core.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-invocation-vertical.test.ts`

**GO:** All wave 5 gates pass
**STOP:** Any gate fails

### Wave 6
**Worktree branch:** `feature/branding-wave6-export-consistency-guard`
**Tasks:**
- `task_branding_mcp_06_assert-tool-to-export-consistency-in-integration-suite`

**Gate commands:**
- `npm run typecheck`
- `npm run test -- src/__tests__/integration/mcp-server-export-consistency.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-registration.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-invocation-core.test.ts`
- `npm run test -- src/__tests__/integration/mcp-server-invocation-vertical.test.ts`

**GO:** All wave 6 gates pass
**STOP:** Any gate fails

