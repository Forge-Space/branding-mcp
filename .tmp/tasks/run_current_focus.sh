#!/usr/bin/env bash
set -euo pipefail

MODE="print"
CLAIM="false"

for arg in "$@"; do
	case "$arg" in
	--run-gates)
		MODE="run-gates"
		;;
	--claim)
		CLAIM="true"
		;;
	*)
		echo "Unknown argument: $arg"
		echo "Usage: $0 [--run-gates] [--claim]"
		exit 1
		;;
	esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

bash "$ROOT/.tmp/tasks/run_branding_planning_cycle.sh"
python3 "$ROOT/.tmp/tasks/planning_doctor.py" --strict

MANIFEST="$ROOT/.tmp/tasks/CURRENT_FOCUS.json"
if [[ ! -f "$MANIFEST" ]]; then
	echo "Missing $MANIFEST"
	exit 1
fi

WAVE="$(
	python3 - "$MANIFEST" <<'PY'
import json
import sys
from pathlib import Path

manifest = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
wave = (manifest.get('wave') or {}).get('id')
if wave:
    print(str(wave))
PY
)"

if [[ -z "$WAVE" ]]; then
	echo "No mapped wave found for current focus."
	echo "See: $ROOT/.tmp/tasks/CURRENT_FOCUS.md"
	exit 0
fi

if [[ "$MODE" == "run-gates" ]]; then
	bash "$ROOT/.tmp/tasks/run_wave.sh" "$WAVE" --run-gates
else
	bash "$ROOT/.tmp/tasks/run_wave.sh" "$WAVE"
fi

if [[ "$CLAIM" == "true" ]]; then
	python3 "$ROOT/.tmp/tasks/sync_branding_backlog.py"
	python3 "$ROOT/.tmp/tasks/generate_current_focus_brief.py"
	python3 "$ROOT/.tmp/tasks/planning_doctor.py" --strict
	if ! CLAIM_MANIFEST_PATH="$ROOT/.tmp/tasks/CURRENT_FOCUS.json" python3 "$ROOT/.tmp/tasks/claim_next_ready_task.py"; then
		echo "Claim failed. See: $ROOT/.tmp/tasks/LAST_CLAIM.json" >&2
		exit 1
	fi
fi
