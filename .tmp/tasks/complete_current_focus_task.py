#!/usr/bin/env python3
from __future__ import annotations

import fcntl
import json
import os
import tempfile
import time
from pathlib import Path
from typing import Any, Dict

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_MANIFEST = ROOT / ".tmp/tasks/CURRENT_FOCUS.json"

MANIFEST_PATH = Path(os.environ.get("COMPLETE_MANIFEST_PATH", str(DEFAULT_MANIFEST)))
BACKLOG_PATH = Path(
    os.environ.get(
        "ORCHESTRATOR_BACKLOG_PATH",
        str(Path.home() / ".local/share/opencode/orchestrator/backlog.json"),
    )
)
SUMMARY = os.environ.get("TASK_COMPLETION_SUMMARY", "completed via automation")


def now_ts() -> int:
    return int(time.time())


def fail(message: str, exit_code: int) -> int:
    payload = {"ok": False, "error": message, "exitCode": exit_code}
    print(json.dumps(payload, indent=2))
    return exit_code


def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json_atomic(path: Path, payload: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(prefix=path.name + ".", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as tmp:
            json.dump(payload, tmp, indent=2)
            tmp.write("\n")
        os.replace(tmp_name, path)
    finally:
        if os.path.exists(tmp_name):
            os.unlink(tmp_name)


def main() -> int:
    if not MANIFEST_PATH.exists():
        return fail(f"Manifest not found: {MANIFEST_PATH}", 2)

    manifest = load_json(MANIFEST_PATH)
    selected = manifest.get("selectedTask") or {}
    claim_context = manifest.get("claimContext") or {}

    task_id = selected.get("id")
    expected_task_updated_at = claim_context.get("expectedTaskUpdatedAt")
    expected_backlog_updated_at = claim_context.get("backlogUpdatedAt")
    source_backlog = claim_context.get("sourceBacklogPath")

    if not task_id:
        return fail("selectedTask.id missing in manifest", 3)
    if not isinstance(expected_task_updated_at, int):
        return fail("claimContext.expectedTaskUpdatedAt missing or invalid", 4)
    if not isinstance(expected_backlog_updated_at, int):
        return fail("claimContext.backlogUpdatedAt missing or invalid", 5)
    if source_backlog and str(source_backlog) != str(BACKLOG_PATH):
        return fail("Backlog path mismatch between manifest and runtime", 6)

    BACKLOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(BACKLOG_PATH, "a+", encoding="utf-8") as lockf:
        fcntl.flock(lockf, fcntl.LOCK_EX)
        lockf.seek(0)
        content = lockf.read().strip()
        data = json.loads(content) if content else {"tasks": [], "version": 1}

        backlog_updated_at = int(data.get("updatedAt", 0) or 0)
        if backlog_updated_at != expected_backlog_updated_at:
            return fail(
                "Stale manifest: backlog updatedAt mismatch "
                f"({backlog_updated_at} != {expected_backlog_updated_at})",
                7,
            )

        tasks = data.get("tasks", [])
        task = next((t for t in tasks if t.get("id") == task_id), None)
        if not task:
            return fail(f"Task not found in backlog: {task_id}", 8)

        actual_task_updated_at = int(task.get("updatedAt", 0) or 0)
        if actual_task_updated_at != expected_task_updated_at:
            return fail(
                "Stale manifest: task updatedAt mismatch "
                f"({actual_task_updated_at} != {expected_task_updated_at})",
                9,
            )

        previous_status = task.get("status")
        if previous_status not in {"in_progress", "ready"}:
            return fail(f"Task is not completable from status '{previous_status}'", 10)

        now = now_ts()
        task["status"] = "completed"
        task["updatedAt"] = now
        task["completionSummary"] = SUMMARY
        data["updatedAt"] = now

        write_json_atomic(BACKLOG_PATH, data)

    payload = {
        "ok": True,
        "taskId": task_id,
        "previousStatus": previous_status,
        "newStatus": "completed",
        "completedAt": now_ts(),
        "backlogPath": str(BACKLOG_PATH),
    }
    print(json.dumps(payload, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
