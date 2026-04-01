#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
	echo "Usage: $0 <wave:1-6> [--run-gates] [--doctor]"
	exit 1
fi

WAVE="$1"
RUN_GATES="false"
DOCTOR="false"

for arg in "${@:2}"; do
	case "$arg" in
	--run-gates)
		RUN_GATES="true"
		;;
	--doctor)
		DOCTOR="true"
		;;
	*)
		echo "Unknown argument: $arg"
		echo "Usage: $0 <wave:1-6> [--run-gates] [--doctor]"
		exit 1
		;;
	esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
MANIFEST="$ROOT/.tmp/tasks/EXECUTION_ORDER.json"

if [[ ! -f "$MANIFEST" ]]; then
	echo "Missing $MANIFEST"
	echo "Run: bash \"$ROOT/.tmp/tasks/run_branding_planning_cycle.sh\""
	exit 1
fi

if ! [[ "$WAVE" =~ ^[1-6]$ ]]; then
	echo "Invalid wave: $WAVE (expected 1-6)"
	exit 1
fi

python3 - "$MANIFEST" "$WAVE" "$RUN_GATES" "$DOCTOR" <<'PY'
import json
import re
import subprocess
import sys
from pathlib import Path

manifest_path = Path(sys.argv[1])
wave = sys.argv[2]
run_gates = sys.argv[3] == "true"
doctor = sys.argv[4] == "true"
repo_root = manifest_path.parents[2]
worktree_base = repo_root.parent / f"{repo_root.name}-worktrees"

data = json.loads(manifest_path.read_text(encoding="utf-8"))
waves_obj = data.get("waves", {})
if isinstance(waves_obj, dict):
    info = waves_obj.get(wave)
elif isinstance(waves_obj, list):
    info = next((w for w in waves_obj if str(w.get("id")) == wave), None)
else:
    info = None

if not info:
    print(f"Wave {wave} not found in {manifest_path}")
    sys.exit(1)

worktree = info["worktree"]
branch = info["branch"]
task_ids = info.get("taskIds", [])
gates = info.get("gateCommands", [])

worktree_path = Path(worktree).resolve()
repo_root_resolved = repo_root.resolve()
worktree_base_resolved = worktree_base.resolve()


def assert_or_exit(condition, message):
    if condition:
        return
    print(f"Doctor check failed: {message}")
    sys.exit(1)


def run_doctor_checks():
    assert_or_exit(worktree_path.exists(), f"worktree does not exist: {worktree_path}")
    assert_or_exit(worktree_path.is_dir(), f"worktree is not a directory: {worktree_path}")

    try:
        worktree_path.relative_to(worktree_base_resolved)
    except ValueError:
        assert_or_exit(False, f"worktree is outside trusted base {worktree_base_resolved}")

    git_dir = worktree_path / ".git"
    assert_or_exit(git_dir.exists(), f"worktree is missing .git metadata: {worktree_path}")

    result = subprocess.run(
        ["git", "-C", str(worktree_path), "branch", "--show-current"],
        check=True,
        capture_output=True,
        text=True,
    )
    current_branch = result.stdout.strip()
    assert_or_exit(
        current_branch == branch,
        f"branch mismatch (expected {branch}, got {current_branch or '<detached>'})",
    )

    print("Doctor checks passed:")
    print(f"- Trusted base: {worktree_base_resolved}")
    print(f"- Worktree exists: {worktree_path}")
    print(f"- Branch matches: {branch}")


def maybe_fast_forward_to_main():
    subprocess.run(
        ["git", "-C", str(worktree_path), "fetch", "origin"],
        check=True,
        capture_output=True,
        text=True,
    )

    dirty_tracked = subprocess.run(
        [
            "git",
            "-C",
            str(worktree_path),
            "status",
            "--porcelain",
            "--untracked-files=no",
        ],
        check=True,
        capture_output=True,
        text=True,
    ).stdout.strip()

    if dirty_tracked:
        print("\nAuto-sync skipped: tracked changes present in worktree.")
        return

    divergence = subprocess.run(
        [
            "git",
            "-C",
            str(worktree_path),
            "rev-list",
            "--left-right",
            "--count",
            "origin/main...HEAD",
        ],
        check=True,
        capture_output=True,
        text=True,
    ).stdout.strip()

    parts = divergence.split()
    if len(parts) != 2:
        print("\nAuto-sync skipped: unable to parse divergence output.")
        return

    behind = int(parts[0])
    ahead = int(parts[1])

    if ahead > 0:
        print(f"\nAuto-sync skipped: branch is ahead of origin/main by {ahead} commit(s).")
        return

    if behind <= 0:
        print("\nWave branch already up to date with origin/main.")
        return

    print(f"\nFast-forwarding wave branch by {behind} commit(s) from origin/main...")
    subprocess.run(
        ["git", "-C", str(worktree_path), "merge", "--ff-only", "origin/main"],
        check=True,
    )


def resolved_task_cli_path(commands):
    for command in commands:
        if "task-cli.ts" not in command:
            continue
        matches = re.findall(r'"([^"]*task-cli\.ts)"', command)
        if matches:
            return matches[-1]
        return "task-cli.ts"
    return None

print(f"Wave {wave}")
print(f"Worktree: {worktree}")
print(f"Branch: {branch}")
print("Tasks:")
for task_id in task_ids:
    print(f"- {task_id}")

print("\nJump command:")
print(f'cd "{worktree}"')

print("\nGate commands:")
for command in gates:
    print(command)

task_cli = resolved_task_cli_path(gates)
if task_cli:
    task_cli_path = Path(task_cli)
    cli_exists = task_cli_path.exists()
    print("\nTask CLI resolution:")
    print(f"- Path: {task_cli_path}")
    print(f"- Exists: {'yes' if cli_exists else 'no'}")

if doctor:
    print("\nRunning doctor checks...")
    run_doctor_checks()

if run_gates:
    run_doctor_checks()
    maybe_fast_forward_to_main()

    needs_npm = any(command.strip().startswith("npm ") for command in gates)
    if needs_npm and not (Path(worktree) / "node_modules").exists():
        print("\nnode_modules not found in wave worktree; bootstrapping dependencies...")
        subprocess.run("npm install", shell=True, check=True, cwd=worktree)

    print("\nExecuting gate commands...")
    for command in gates:
        print(f"$ {command}")
        command_cwd = repo_root if "task-cli.ts" in command else worktree
        subprocess.run(command, shell=True, check=True, cwd=command_cwd)
    print("\nAll gate commands passed.")
PY
