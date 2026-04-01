#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

python3 "$ROOT/.tmp/tasks/sync_branding_backlog.py"
python3 "$ROOT/.tmp/tasks/export_ready_tasks.py"
python3 "$ROOT/.tmp/tasks/generate_wave_worktree_handoffs.py"
python3 "$ROOT/.tmp/tasks/generate_execution_order.py"
python3 "$ROOT/.tmp/tasks/backlog_guard.py"
python3 "$ROOT/.tmp/tasks/generate_next_ready_brief.py"
python3 "$ROOT/.tmp/tasks/generate_current_focus_brief.py"
python3 "$ROOT/.tmp/tasks/planning_doctor.py" --strict

echo "Branding planning cycle complete."
