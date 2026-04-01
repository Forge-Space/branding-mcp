# Skill: worktree-hygiene

## Purpose

Keep local worktrees clean and low-risk after PRs merge.

## Use When

- Multiple feature worktrees exist for one repo.
- Some branches are already merged (often via squash) but worktrees remain.
- You need safe cleanup without losing uncommitted local notes.

## Workflow

1. Fetch latest remote state.
2. List worktrees and current dirty status.
3. For each candidate worktree, compare its HEAD to `origin/main` with `git diff --stat origin/main..HEAD`.
4. If there is no branch delta and only local residue remains, archive local changes with:
   - `git stash push -u -m "ops: archive before stale worktree cleanup"`
5. Remove stale worktree:
   - `git worktree remove <path> --force`
6. Keep any worktree whose branch still differs from `origin/main`.
7. Print final `git worktree list` and stash references for traceability.

## Safety Rules

- Never delete a worktree with unique branch delta unless explicitly requested.
- Always stash before forced worktree removal.
- Prefer cleaning merged/stale waves first; preserve active investigation branches.

## Evidence

- Before/after `git worktree list` output.
- Candidate selection from direct branch delta (`origin/main..HEAD`).
- Stash messages proving local residue was archived before removal.
