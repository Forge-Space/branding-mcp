#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

STRICT_STALE="false"
STALE_AGE_HOURS="24"

while [[ $# -gt 0 ]]; do
	case "$1" in
	--strict-stale-worktrees)
		STRICT_STALE="true"
		shift
		;;
	--stale-worktree-max-age-hours)
		if [[ $# -lt 2 ]]; then
			echo "Missing value for --stale-worktree-max-age-hours"
			exit 1
		fi
		STALE_AGE_HOURS="$2"
		shift 2
		;;
	*)
		echo "Unknown argument: $1"
		echo "Usage: $0 [--strict-stale-worktrees] [--stale-worktree-max-age-hours <hours>]"
		exit 1
		;;
	esac
done

echo "[1/3] Running full planning cycle..."
bash "$ROOT/.tmp/tasks/run_branding_planning_cycle.sh"

echo "[2/3] Running strict planning doctor..."
DOCTOR_ARGS=(--strict)
if [[ "$STRICT_STALE" == "true" ]]; then
	DOCTOR_ARGS+=(--strict-stale-worktrees --stale-worktree-max-age-hours "$STALE_AGE_HOURS")
fi
python3 "$ROOT/.tmp/tasks/planning_doctor.py" "${DOCTOR_ARGS[@]}"

echo "[3/3] Running claim CAS regression harness..."
python3 "$ROOT/.tmp/tasks/claim_cas_regression.py"

echo "Planning health check passed."
