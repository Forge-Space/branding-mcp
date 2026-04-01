# Wave 3 Execution Packet

**Objective**
Register healthcare MCP tool in server startup flow, extend integration coverage for healthcare registration/export path, and update tool inventory docs accurately.

**Current vs Expected**
- Current: server startup does not expose healthcare vertical; docs/tool inventory still reflect pre-healthcare list/count.
- Expected: healthcare wrapper is imported + registered in existing vertical registration block, integration coverage asserts healthcare export/registration path, README inventory/count reflects reality.

**Exact Files (Deduplicated)**
- `src/index.ts`
- `src/__tests__/integration/mcp-server.test.ts`
- `src/lib/branding-core/index.ts`
- `README.md`

**Non-Goals**
- Package/version bumps or publish actions
- Changelog/release-note updates
- New generator business logic

**Checklist (Execution Order)**
1. Confirm Wave 2 completion and availability of generator + wrapper artifacts.
2. Review existing server registration order and identify correct healthcare insertion point.
3. Import and register `registerGenerateBrandHealthcare` in `src/index.ts` without reordering unrelated tools.
4. Ensure branding-core export path used by integration tests includes healthcare generator symbol.
5. Extend `mcp-server.test.ts` to assert healthcare registration/export availability in the integration path.
6. Update `README.md` MCP tool inventory entry for `generate_brand_healthcare` and correct tool count references.
7. Check that changes remain scoped to registration/integration/docs only.
8. Run validation gates and record results for Wave 4 handoff.

**Validation Gates (Concrete Commands)**
- `npm run typecheck`
- `npm run test -- src/__tests__/integration/mcp-server.test.ts`
- `npm run test -- src/__tests__/unit/brand-healthcare.test.ts`

**Exit Criteria**
- `src/index.ts` imports and registers healthcare tool in the vertical block.
- Integration tests assert healthcare export/registration path.
- README inventory includes `generate_brand_healthcare` and any stated counts are accurate.
- All validation-gate commands pass.

**Handoff to Wave 4**
Provide Wave 4 with finalized registration layout and healthcare-inclusive tool inventory baseline; Wave 4 builds shared matrix + reusable registration function on top of that baseline.
