# Skill: branding-planning-cycle

Purpose: run and verify the planning-only orchestration loop for branding-mcp without starting feature implementation.

Use this skill when:

- you need to refresh the branding backlog tasks from TaskManager subtask files,
- you need normalized ready/backlog views despite external status mutations,
- you need per-wave handoff files in all branding worktrees.

## Preconditions

- Repo root: current project root
- Required planning files exist:
  - `.tmp/tasks/sync_branding_backlog.py`
  - `.tmp/tasks/backlog_guard.py`
  - `.tmp/tasks/export_ready_tasks.py`
  - `.tmp/tasks/generate_wave_worktree_handoffs.py`
  - `.tmp/tasks/generate_execution_order.py`
  - `.tmp/tasks/generate_next_ready_brief.py`
  - `.tmp/tasks/generate_current_focus_brief.py`
  - `.tmp/tasks/planning_doctor.py`
  - `.tmp/tasks/claim_cas_regression.py`
  - `.tmp/tasks/planning_health_check.sh`
  - `.tmp/tasks/claim_next_ready_task.py`
  - `.tmp/tasks/run_wave.sh`
  - `.tmp/tasks/run_next_ready.sh`
  - `.tmp/tasks/run_current_focus.sh`
  - `.tmp/tasks/run_branding_planning_cycle.sh`

## One-command cycle

Run:

```bash
bash ".tmp/tasks/run_branding_planning_cycle.sh"
```

Optional override for shared backlog path:

```bash
ORCHESTRATOR_BACKLOG_PATH="$HOME/.local/share/opencode/orchestrator/backlog.json" bash ".tmp/tasks/run_branding_planning_cycle.sh"
```

## One-command health check

Run full planning validation with one pass/fail exit code:

```bash
bash ".tmp/tasks/planning_health_check.sh"
```

Optional stale-worktree hygiene check (fails if extra worktree directories outside
`EXECUTION_ORDER.json` are older than threshold):

```bash
bash ".tmp/tasks/planning_health_check.sh" --strict-stale-worktrees --stale-worktree-max-age-hours 24
```

This wrapper executes:

1. planning cycle,
2. strict doctor check,
3. claim CAS regression harness.

When `--strict-stale-worktrees` is enabled, step 2 includes an extra doctor check for
stale worktree directories under `<repo-parent>/<repo-name>-worktrees`.

## Expected outputs

- Global backlog updated/merged:
  - `~/.local/share/opencode/orchestrator/backlog.json`
- Local normalized snapshot:
  - `.tmp/tasks/branding-backlog.normalized.json`
- Guard report:
  - `.tmp/tasks/branding-backlog.guard-report.json`
- Ready/backlog export:
  - `.tmp/tasks/branding-ready-tasks.json`
- Wave handoff index:
  - `.tmp/tasks/branding-wave-handoff-index.json`
- Worktree handoff docs:
  - `<wave-worktree>/WAVE_HANDOFF.md`
- Consolidated wave runbook:
  - `.tmp/tasks/EXECUTION_ORDER.md`
  - `.tmp/tasks/EXECUTION_ORDER.json`
- Next-ready brief:
  - `.tmp/tasks/NEXT_READY.md`
  - `.tmp/tasks/NEXT_READY.json`
- Current-focus brief (prefers in-progress, then ready):
  - `.tmp/tasks/CURRENT_FOCUS.md`
  - `.tmp/tasks/CURRENT_FOCUS.json`
- Claim log (only when `--claim` is used):
  - `.tmp/tasks/LAST_CLAIM.json`
- Claim CAS regression report:
  - `.tmp/tasks/CLAIM_REGRESSION_REPORT.json`

## Wave helper

After running the cycle, print a wave-specific handoff + gate commands:

```bash
bash ".tmp/tasks/run_wave.sh" 1
```

Optionally execute gate commands inside the wave worktree:

```bash
bash ".tmp/tasks/run_wave.sh" 1 --run-gates
```

Note: when `--run-gates` is used and the target wave worktree has no `node_modules`,
the helper bootstraps dependencies with `npm install` before running gates.

Run the currently ready wave automatically:

```bash
bash ".tmp/tasks/run_next_ready.sh"
```

Run ready wave and execute its gates:

```bash
bash ".tmp/tasks/run_next_ready.sh" --run-gates
```

Run ready wave gates and claim the task as `in_progress` in orchestrator backlog:

```bash
bash ".tmp/tasks/run_next_ready.sh" --run-gates --claim
```

Claim flow is freshness-aware and self-healing:

- it runs `sync_branding_backlog.py` before claim,
- regenerates the selected manifest (`NEXT_READY.json` or `CURRENT_FOCUS.json`) after sync,
- runs `planning_doctor.py` to verify artifact coherence,
- validates `claimContext` freshness (`sourceBacklogPath`, `backlogUpdatedAt`, `expectedTaskUpdatedAt`),
- if stale/missing, re-syncs and refreshes once before retrying.

Claim exit codes:

- `20`: stale manifest/backlog precondition mismatch
- `21`: selected task not found in target backlog
- `22`: task status not claimable (must be `ready` or already `in_progress`)
- `23`: invalid or incomplete claim manifest

Claim only (no gate execution):

```bash
bash ".tmp/tasks/run_next_ready.sh" --claim
```

Run claim-CAS regression harness (planning tooling only):

```bash
python3 ".tmp/tasks/claim_cas_regression.py"
```

Check resolved task-cli path visibility for a wave:

```bash
bash ".tmp/tasks/run_wave.sh" 1
```

`run_wave.sh` now prints the resolved `task-cli.ts` path and whether it exists.

This verifies expected behaviors for:

- successful `ready -> in_progress` claim,
- invalid manifest (`23`),
- stale precondition mismatch (`20`),
- missing selected task (`21`),
- not-claimable status (`22`).

Route to the current focus task (in-progress first, else next ready):

```bash
bash ".tmp/tasks/run_current_focus.sh"
```

Run gates for current focus wave:

```bash
bash ".tmp/tasks/run_current_focus.sh" --run-gates
```

## Verification checklist

- `branding` task count is 12
- normalized status totals are coherent (`completed + in_progress + ready + backlog == taskCount`)
- at most one task is `ready` at a time during active execution waves
- terminal state is valid when `ready=0`, `backlog=0`, and all tasks are `completed`
- all six wave worktrees are present and trusted
- no source code files under `src/` changed

These invariants are machine-enforced by `planning_doctor.py --strict` during the planning cycle and when running `run_next_ready.sh` / `run_current_focus.sh`.

## Post-merge automation (all tasks completed)

When `NEXT_READY.json` and `CURRENT_FOCUS.json` both report no selected task, treat the
planning lane as drained and switch to ship/cleanup automation:

1. verify merged PR checks are green,
2. sync local `main`,
3. prune stale local worktrees,
4. rerun planning health check to confirm `ready=0`, `backlog=0`.

Suggested commands:

```bash
gh pr checks <pr-number> --repo Forge-Space/branding-mcp
git checkout main && git pull --ff-only
git worktree prune
bash ".tmp/tasks/planning_health_check.sh"
```

Optional strict extension:

- `planning_doctor.py --strict --strict-stale-worktrees` checks for worktree directories
  outside execution waves that are older than `--stale-worktree-max-age-hours`.

## Out of scope

- Implementing healthcare generator/tool code
- Running release/version bump/tag workflows
- Changing backlog entries outside `task_branding_*` namespace
