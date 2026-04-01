# branding-mcp


## Continuous Delivery Rules (Global)

- If we are not shipping commits, we are not making progress.
- Never create empty commits.
- Every commit must deliver real value.
- Keep commits small, coherent, and reviewable.
- Prioritize commit -> PR -> review/fix -> green CI -> merge.
- Do not stack local-only completed tasks while PRs are unmerged.
- Fix required CI failures before starting unrelated work.
- Do not merge with failing required checks.
- If dispatch is blocked by concurrency, finish or unblock the active task first.
