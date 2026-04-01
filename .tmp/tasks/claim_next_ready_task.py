#!/usr/bin/env python3
import json
import os
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from typing import Any, Dict, Optional

import fcntl

REPO = Path(__file__).resolve().parents[2]
BACKLOG_ENV = "ORCHESTRATOR_BACKLOG_PATH"
CLAIM_MANIFEST_ENV = "CLAIM_MANIFEST_PATH"
DEFAULT_BACKLOG = Path.home() / ".local/share/opencode/orchestrator/backlog.json"
GLOBAL_BACKLOG = Path(os.environ.get(BACKLOG_ENV, str(DEFAULT_BACKLOG)))
DEFAULT_MANIFEST = REPO / ".tmp/tasks/NEXT_READY.json"
CLAIM_MANIFEST = Path(os.environ.get(CLAIM_MANIFEST_ENV, str(DEFAULT_MANIFEST)))
CLAIM_LOG = REPO / ".tmp/tasks/LAST_CLAIM.json"
SYNC_SCRIPT = REPO / ".tmp/tasks/sync_branding_backlog.py"
NEXT_READY_MANIFEST = REPO / ".tmp/tasks/NEXT_READY.json"
CURRENT_FOCUS_MANIFEST = REPO / ".tmp/tasks/CURRENT_FOCUS.json"
DISABLE_RETRY = os.environ.get("CLAIM_DISABLE_RETRY", "0") == "1"

EXIT_STALE = 20
EXIT_NOT_FOUND = 21
EXIT_NOT_CLAIMABLE = 22
EXIT_MANIFEST = 23
EXIT_UNKNOWN = 1

REQUIRED_CLAIM_CONTEXT = {
    "manifestType",
    "backlogUpdatedAt",
    "sourceBacklogPath",
    "expectedTaskUpdatedAt",
}


class ClaimError(Exception):
    def __init__(self, message: str, code: int, retryable: bool = False):
        super().__init__(message)
        self.code = code
        self.retryable = retryable


def read_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def atomic_write_json(path: Path, payload: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", dir=path.parent, delete=False) as tmp:
        tmp.write(json.dumps(payload, indent=2) + "\n")
        tmp.flush()
        os.fsync(tmp.fileno())
        tmp_name = tmp.name
    os.replace(tmp_name, path)


def with_lock(backlog_path: Path, fn):
    lock_path = backlog_path.with_suffix(backlog_path.suffix + ".lock")
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    with lock_path.open("w", encoding="utf-8") as lock_file:
        fcntl.flock(lock_file.fileno(), fcntl.LOCK_EX)
        return fn()


def select_manifest() -> Dict[str, Any]:
    if not CLAIM_MANIFEST.exists():
        raise ClaimError(
            "Claim manifest not found: %s" % CLAIM_MANIFEST,
            EXIT_MANIFEST,
            retryable=False,
        )
    return read_json(CLAIM_MANIFEST)


def canonical_manifest_path(manifest_type: str) -> Path:
    if manifest_type == "current_focus":
        return CURRENT_FOCUS_MANIFEST
    return NEXT_READY_MANIFEST


def regenerate_manifest(manifest_type: str) -> None:
    export_ready = REPO / ".tmp/tasks/export_ready_tasks.py"
    if export_ready.exists():
        subprocess.run(["python3", str(export_ready)], check=True)

    if manifest_type == "current_focus":
        script = REPO / ".tmp/tasks/generate_current_focus_brief.py"
    else:
        script = REPO / ".tmp/tasks/generate_next_ready_brief.py"
    if script.exists():
        subprocess.run(["python3", str(script)], check=True)


def validate_manifest_payload(manifest_payload: Dict[str, Any]) -> None:
    selected = manifest_payload.get("selectedTask") or {}
    if not selected.get("id"):
        raise ClaimError(
            "No selectedTask.id found in claim manifest: %s" % CLAIM_MANIFEST,
            EXIT_MANIFEST,
            retryable=False,
        )

    claim_context = manifest_payload.get("claimContext") or {}
    missing = sorted(REQUIRED_CLAIM_CONTEXT - set(claim_context.keys()))
    if missing:
        raise ClaimError(
            "Missing claimContext keys in manifest (%s): %s"
            % (CLAIM_MANIFEST, ", ".join(missing)),
            EXIT_MANIFEST,
            retryable=False,
        )


def claim(task_id: str, manifest_payload: Dict[str, Any]) -> Dict[str, Any]:
    now = int(time.time())
    claim_context = manifest_payload.get("claimContext") or {}
    expected_task_updated_at = claim_context.get("expectedTaskUpdatedAt")
    expected_backlog_updated_at = claim_context.get("backlogUpdatedAt")
    source_backlog_path = claim_context.get("sourceBacklogPath")
    manifest_type = claim_context.get("manifestType") or "next_ready"

    def _inner() -> Dict[str, Any]:
        backlog = read_json(GLOBAL_BACKLOG)
        tasks = backlog.get("tasks", [])
        selected_task = None

        if str(GLOBAL_BACKLOG) != str(source_backlog_path):
            raise ClaimError(
                "Stale claim manifest: backlog path mismatch (%s != %s)"
                % (source_backlog_path, GLOBAL_BACKLOG),
                EXIT_STALE,
                retryable=True,
            )

        if backlog.get("updatedAt") != expected_backlog_updated_at:
            raise ClaimError(
                "Stale claim manifest: backlog updatedAt mismatch (%s != %s)"
                % (expected_backlog_updated_at, backlog.get("updatedAt")),
                EXIT_STALE,
                retryable=True,
            )

        for task in tasks:
            if task.get("id") == task_id:
                selected_task = task
                break

        if not selected_task:
            raise ClaimError(
                "Task not found in backlog: %s" % task_id,
                EXIT_NOT_FOUND,
                retryable=True,
            )

        if selected_task.get("updatedAt") != expected_task_updated_at:
            raise ClaimError(
                "Stale claim manifest: task updatedAt mismatch (%s != %s)"
                % (expected_task_updated_at, selected_task.get("updatedAt")),
                EXIT_STALE,
                retryable=True,
            )

        previous_status = selected_task.get("status", "unknown")
        if previous_status == "in_progress":
            return {
                "ok": True,
                "reason": "already_in_progress",
                "retryPerformed": False,
                "claimedAt": now,
                "taskId": task_id,
                "previousStatus": previous_status,
                "newStatus": "in_progress",
                "manifestType": manifest_type,
                "backlogPath": str(GLOBAL_BACKLOG),
                "manifestPath": str(CLAIM_MANIFEST),
                "noop": True,
            }

        if previous_status != "ready":
            raise ClaimError(
                "Task %s is not claimable from status '%s'"
                % (task_id, previous_status),
                EXIT_NOT_CLAIMABLE,
                retryable=False,
            )

        selected_task["status"] = "in_progress"
        selected_task["updatedAt"] = now
        backlog["updatedAt"] = now
        atomic_write_json(GLOBAL_BACKLOG, backlog)

        return {
            "ok": True,
            "reason": "claimed",
            "retryPerformed": False,
            "claimedAt": now,
            "taskId": task_id,
            "previousStatus": previous_status,
            "newStatus": "in_progress",
            "manifestType": manifest_type,
            "backlogPath": str(GLOBAL_BACKLOG),
            "manifestPath": str(CLAIM_MANIFEST),
            "noop": False,
        }

    return with_lock(GLOBAL_BACKLOG, _inner)


def run_claim_with_retry(manifest_payload: Dict[str, Any]) -> Dict[str, Any]:
    validate_manifest_payload(manifest_payload)
    selected = manifest_payload.get("selectedTask") or {}
    task_id = str(selected.get("id"))

    try:
        return claim(task_id, manifest_payload)
    except ClaimError as err:
        if not err.retryable:
            raise
        if DISABLE_RETRY:
            raise
        if not SYNC_SCRIPT.exists():
            raise

        print(
            "Claim precondition failed; syncing and refreshing manifest, retrying once..."
        )
        subprocess.run(["python3", str(SYNC_SCRIPT)], check=True)

        manifest_type = (manifest_payload.get("claimContext") or {}).get(
            "manifestType", "next_ready"
        )
        regenerate_manifest(str(manifest_type))

        refreshed_manifest_path = canonical_manifest_path(str(manifest_type))
        if not refreshed_manifest_path.exists():
            raise ClaimError(
                "Refreshed manifest not found after sync: %s" % refreshed_manifest_path,
                EXIT_MANIFEST,
                retryable=False,
            )

        refreshed = read_json(refreshed_manifest_path)
        validate_manifest_payload(refreshed)
        refreshed_task_id = str((refreshed.get("selectedTask") or {}).get("id"))
        result = claim(refreshed_task_id, refreshed)
        result["retryPerformed"] = True
        result["manifestPath"] = str(refreshed_manifest_path)
        return result


def main() -> None:
    try:
        manifest_payload = select_manifest()
        result = run_claim_with_retry(manifest_payload)
        atomic_write_json(CLAIM_LOG, result)

        print("Claimed task: %s" % result["taskId"])
        print("Status: %s -> %s" % (result["previousStatus"], result["newStatus"]))
        print("Backlog: %s" % result["backlogPath"])
        print("Manifest: %s" % result["manifestPath"])
        print("Claim log: %s" % CLAIM_LOG)
    except ClaimError as err:
        failure = {
            "ok": False,
            "reason": "claim_failed",
            "error": str(err),
            "exitCode": err.code,
            "retryPerformed": False,
            "backlogPath": str(GLOBAL_BACKLOG),
            "manifestPath": str(CLAIM_MANIFEST),
            "failedAt": int(time.time()),
        }
        atomic_write_json(CLAIM_LOG, failure)
        print(str(err), file=sys.stderr)
        print("Claim log: %s" % CLAIM_LOG, file=sys.stderr)
        sys.exit(err.code)
    except Exception as err:  # noqa: BLE001
        failure = {
            "ok": False,
            "reason": "unexpected_error",
            "error": str(err),
            "exitCode": EXIT_UNKNOWN,
            "retryPerformed": False,
            "backlogPath": str(GLOBAL_BACKLOG),
            "manifestPath": str(CLAIM_MANIFEST),
            "failedAt": int(time.time()),
        }
        atomic_write_json(CLAIM_LOG, failure)
        print(str(err), file=sys.stderr)
        print("Claim log: %s" % CLAIM_LOG, file=sys.stderr)
        sys.exit(EXIT_UNKNOWN)


if __name__ == "__main__":
    main()
