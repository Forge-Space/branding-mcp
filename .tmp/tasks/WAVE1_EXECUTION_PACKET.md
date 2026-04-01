## Objective
Deliver Wave 1 for `task_branding_healthcare_01_define-healthcare-output-contract-and-exports` by adding the healthcare output type contract and export surface only, so Wave 2 can implement generator/tool behavior on a stable API.

## Current vs Expected
- Current backlog state: `readyCount=1`, `backlogCount=11`; only this Wave 1 task is ready and unblocked.
- Current code shape: vertical output types/exports exist (including `BrandSaasOutput`, `BrandFintechOutput`), but no healthcare contract/export path.
- Expected after Wave 1: `BrandHealthcareOutput` is defined in shared types, healthcare generator export path exists in branding-core index, and top-level `src/index.ts` re-exports `BrandHealthcareOutput` without type errors.
- Dependency impact: completing this task unblocks Wave 2 tasks `task_branding_healthcare_02`, `_03`, and `_04`.

## Exact Files
- Edit targets:
  - `src/lib/types.ts`
  - `src/lib/branding-core/index.ts`
  - `src/index.ts`
- Planning/backlog sources (do not edit for Wave 1 implementation):
  - `.tmp/tasks/branding-backlog.normalized.json`
  - `.tmp/tasks/branding-ready-tasks.json`
  - `.tmp/tasks/generate-brand-healthcare-tool/subtask_01.json`
  - `.tmp/tasks/branding-wave-handoff-index.json`

## Non-Goals
- Do not implement healthcare generator business logic.
- Do not register MCP healthcare tool handlers in server startup.
- Do not modify docs/versioning/release metadata.
- Do not expand integration/unit test scope beyond what is needed for compile safety of this contract/export task.

## Step Checklist
1. Confirm task is still the only ready item and Wave 1 target remains unchanged.
2. Inspect existing vertical output type patterns (`BrandSaasOutput`, `BrandFintechOutput`) in `src/lib/types.ts` and mirror structure style for healthcare contract naming/placement.
3. Add `BrandHealthcareOutput` to `src/lib/types.ts` with healthcare-specific fields aligned to current vertical conventions.
4. Update `src/lib/branding-core/index.ts` to expose `generateBrandHealthcare` via the established generator export pattern/path.
5. Update top-level `src/index.ts` type exports to include `BrandHealthcareOutput`.
6. Verify no accidental MCP server registration or generator implementation was introduced.
7. Run type-check gate and resolve any compile/type export mismatches.
8. Re-check that Wave 1 acceptance criteria are all satisfied exactly as written in subtask metadata.

## Validation Gates
- Preflight backlog/status:
  - `npx ts-node --compiler-options '{"module":"commonjs"}' "/Users/lucassantana/.config/opencode/skills/task-management/scripts/task-cli.ts" status`
- Optional task integrity check before/after edits:
  - `npx ts-node --compiler-options '{"module":"commonjs"}' "/Users/lucassantana/.config/opencode/skills/task-management/scripts/task-cli.ts" validate generate-brand-healthcare-tool`
- Hard Wave 1 stop condition:
  - `npm run typecheck`

## Exit Criteria
- `BrandHealthcareOutput` exists in `src/lib/types.ts` and follows existing vertical contract conventions.
- `src/lib/branding-core/index.ts` exports `generateBrandHealthcare` consistently with adjacent generator exports.
- `src/index.ts` includes `BrandHealthcareOutput` in top-level type exports.
- `npm run typecheck` passes cleanly.
- No non-goal scope was touched.

## Handoff to Wave 2
- Wave 2 can now implement `generateBrandHealthcare` behavior against a stable `BrandHealthcareOutput` contract.
- Wave 2 should assume export surface is already wired and focus on:
  1) generator implementation (`task_branding_healthcare_02`),
  2) healthcare generator unit tests (`task_branding_healthcare_03`),
  3) MCP wrapper creation (`task_branding_healthcare_04`).
- Handoff branch/worktree target remains: `feature/branding-wave2-healthcare-generator-wrapper-tests` at `/Users/lucassantana/Desenvolvimento/forge-space/branding-mcp-worktrees/wave2-healthcare-generator-wrapper-tests`.
