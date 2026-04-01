# Wave 2 Execution Packet

**Objective**
Deliver healthcare vertical implementation, unit coverage, and MCP wrapper so healthcare generation is functional and callable (without server registration yet).

**Current vs Expected**
- Current: no healthcare generator in branding-core, no healthcare unit tests, no `generate_brand_healthcare` MCP wrapper.
- Expected: `generateBrandHealthcare` exists with style-aware + safe fallback behavior, unit tests cover branch/fallback/no-tagline cases, wrapper parses brand JSON and returns serialized text content.

**Exact Files (Deduplicated)**
- `src/lib/branding-core/generators/brand-healthcare.ts`
- `src/__tests__/unit/brand-healthcare.test.ts`
- `src/tools/generate-brand-healthcare.ts`

**Non-Goals**
- Server-level registration in `src/index.ts`
- README/tool inventory updates
- Release/version/publish workflow changes
- MCP transport/HTTP routing coverage

**Checklist (Execution Order)**
1. Confirm Wave 1 contract/export task is complete and healthcare types/exports are available.
2. Re-read Wave 2 task IDs and acceptance criteria before touching files.
3. Implement deterministic `generateBrandHealthcare` output shape matching `BrandHealthcareOutput`.
4. Add at least one style-specific healthcare branch and explicit unknown-style safe fallback.
5. Ensure summary text includes brand name and never leaks `undefined` when tagline is missing.
6. Add unit tests for required output shape/minimum arrays, style branch, unknown fallback, and no-tagline scenario.
7. Implement `generate_brand_healthcare` MCP wrapper with BrandIdentity JSON parsing + text serialization.
8. Verify wrapper imports are aligned with existing module paths and do not introduce circular dependencies.
9. Run validation gates and capture exact pass/fail evidence for handoff.

**Validation Gates (Concrete Commands)**
- `npm run typecheck`
- `npm run check:cycles`
- `npm run test -- src/__tests__/unit/brand-healthcare.test.ts`

**Exit Criteria**
- Generator returns all fields required by `BrandHealthcareOutput`.
- Generator has style-differentiated healthcare behavior plus unknown-style minimal-safe fallback.
- Summary output includes brand name and contains no `undefined` placeholders.
- Wrapper tool name is exactly `generate_brand_healthcare` with healthcare-specific description and successful BrandIdentity parsing path.
- All validation-gate commands pass.

**Handoff to Wave 3**
Provide Wave 3 with: final generator contract assumptions, wrapper entrypoint details, and confirmed command outputs. Wave 3 then wires registration/integration/docs only (no generator logic rework).
