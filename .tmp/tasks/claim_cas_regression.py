#!/usr/bin/env python3
import json
import os
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Any, Callable, Dict, List, Tuple


ROOT = Path(__file__).resolve().parents[2]
CLAIM_SCRIPT = ROOT / ".tmp/tasks/claim_next_ready_task.py"
PLANNING_CYCLE = ROOT / ".tmp/tasks/run_branding_planning_cycle.sh"
NEXT_READY = ROOT / ".tmp/tasks/NEXT_READY.json"
CLAIM_LOG = ROOT / ".tmp/tasks/LAST_CLAIM.json"
REPORT = ROOT / ".tmp/tasks/CLAIM_REGRESSION_REPORT.json"


def read_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def run_planning_cycle(backlog_path: Path) -> None:
    env = os.environ.copy()
    env["ORCHESTRATOR_BACKLOG_PATH"] = str(backlog_path)
    subprocess.run(["bash", str(PLANNING_CYCLE)], cwd=ROOT, env=env, check=True)


def run_claim(
    backlog_path: Path, manifest_path: Path, disable_retry: bool = False
) -> Tuple[int, Dict[str, Any], str]:
    env = os.environ.copy()
    env["ORCHESTRATOR_BACKLOG_PATH"] = str(backlog_path)
    env["CLAIM_MANIFEST_PATH"] = str(manifest_path)
    if disable_retry:
        env["CLAIM_DISABLE_RETRY"] = "1"

    proc = subprocess.run(
        ["python3", str(CLAIM_SCRIPT)],
        cwd=ROOT,
        env=env,
        capture_output=True,
        text=True,
        check=False,
    )

    claim_log = read_json(CLAIM_LOG) if CLAIM_LOG.exists() else {}
    output = (proc.stdout or "") + (proc.stderr or "")
    return proc.returncode, claim_log, output.strip()


def ready_task_from_manifest(manifest: Dict[str, Any]) -> str:
    selected = manifest.get("selectedTask") or {}
    task_id = str(selected.get("id", ""))
    if not task_id:
        raise RuntimeError("selectedTask.id missing in generated NEXT_READY manifest")
    return task_id


def scenario_success_ready_claim(tmp: Path) -> Dict[str, Any]:
    backlog = tmp / "backlog-success.json"
    run_planning_cycle(backlog)

    manifest = read_json(NEXT_READY)
    manifest_path = tmp / "manifest-success.json"
    write_json(manifest_path, manifest)

    code, log, output = run_claim(backlog, manifest_path)
    passed = code == 0 and bool(log.get("ok")) and log.get("newStatus") == "in_progress"

    return {
        "name": "success_ready_claim",
        "passed": passed,
        "expected": "exit 0 and claimed to in_progress",
        "actual": {
            "exitCode": code,
            "reason": log.get("reason"),
            "newStatus": log.get("newStatus"),
            "retryPerformed": log.get("retryPerformed"),
        },
        "output": output,
    }


def scenario_invalid_manifest_23(tmp: Path) -> Dict[str, Any]:
    backlog = tmp / "backlog-invalid.json"
    run_planning_cycle(backlog)

    manifest = {"selectedTask": {"id": "task_branding_dummy"}}
    manifest_path = tmp / "manifest-invalid.json"
    write_json(manifest_path, manifest)

    code, log, output = run_claim(backlog, manifest_path)
    passed = code == 23 and log.get("exitCode") == 23

    return {
        "name": "invalid_manifest_exit_23",
        "passed": passed,
        "expected": "exit 23 (invalid manifest)",
        "actual": {
            "exitCode": code,
            "loggedExitCode": log.get("exitCode"),
            "reason": log.get("reason"),
        },
        "output": output,
    }


def scenario_stale_custom_manifest_20(tmp: Path) -> Dict[str, Any]:
    backlog = tmp / "backlog-stale.json"
    run_planning_cycle(backlog)

    manifest = read_json(NEXT_READY)
    claim_context = manifest.get("claimContext") or {}
    claim_context["backlogUpdatedAt"] = (
        int(claim_context.get("backlogUpdatedAt", 0)) - 1
    )
    manifest["claimContext"] = claim_context

    manifest_path = tmp / "manifest-stale.json"
    write_json(manifest_path, manifest)

    code, log, output = run_claim(backlog, manifest_path, disable_retry=True)
    passed = code == 20 and log.get("exitCode") == 20

    return {
        "name": "stale_manifest_exit_20",
        "passed": passed,
        "expected": "exit 20 (stale precondition mismatch)",
        "actual": {
            "exitCode": code,
            "loggedExitCode": log.get("exitCode"),
            "reason": log.get("reason"),
        },
        "output": output,
    }


def scenario_missing_task_custom_manifest_21(tmp: Path) -> Dict[str, Any]:
    backlog = tmp / "backlog-missing.json"
    run_planning_cycle(backlog)

    manifest = read_json(NEXT_READY)
    manifest["selectedTask"]["id"] = "task_branding_missing_for_regression"

    manifest_path = tmp / "manifest-missing-task.json"
    write_json(manifest_path, manifest)

    code, log, output = run_claim(backlog, manifest_path, disable_retry=True)
    passed = code == 21 and log.get("exitCode") == 21

    return {
        "name": "missing_task_exit_21",
        "passed": passed,
        "expected": "exit 21 (selected task missing)",
        "actual": {
            "exitCode": code,
            "loggedExitCode": log.get("exitCode"),
            "reason": log.get("reason"),
        },
        "output": output,
    }


def scenario_not_claimable_22(tmp: Path) -> Dict[str, Any]:
    backlog = tmp / "backlog-not-claimable.json"
    run_planning_cycle(backlog)

    manifest = read_json(NEXT_READY)
    task_id = ready_task_from_manifest(manifest)

    backlog_payload = read_json(backlog)
    now = int(time.time())
    for task in backlog_payload.get("tasks", []):
        if task.get("id") == task_id:
            task["status"] = "backlog"
            task["updatedAt"] = now
            break
    backlog_payload["updatedAt"] = now
    write_json(backlog, backlog_payload)

    manifest["selectedTask"]["status"] = "backlog"
    manifest["selectedTask"]["updatedAt"] = now
    claim_context = manifest.get("claimContext") or {}
    claim_context["expectedTaskUpdatedAt"] = now
    claim_context["backlogUpdatedAt"] = now
    manifest["claimContext"] = claim_context

    manifest_path = tmp / "manifest-not-claimable.json"
    write_json(manifest_path, manifest)

    code, log, output = run_claim(backlog, manifest_path)
    passed = code == 22 and log.get("exitCode") == 22

    return {
        "name": "not_claimable_exit_22",
        "passed": passed,
        "expected": "exit 22 (status not claimable)",
        "actual": {
            "exitCode": code,
            "loggedExitCode": log.get("exitCode"),
            "reason": log.get("reason"),
        },
        "output": output,
    }


def main() -> None:
    scenarios: List[Callable[[Path], Dict[str, Any]]] = [
        scenario_success_ready_claim,
        scenario_invalid_manifest_23,
        scenario_stale_custom_manifest_20,
        scenario_missing_task_custom_manifest_21,
        scenario_not_claimable_22,
    ]

    # Preserve current NEXT_READY to avoid surprising operators.
    previous_next_ready = (
        NEXT_READY.read_text(encoding="utf-8") if NEXT_READY.exists() else None
    )

    results: List[Dict[str, Any]] = []
    with tempfile.TemporaryDirectory(prefix="claim-cas-regression-") as temp_dir:
        tmp = Path(temp_dir)
        for scenario in scenarios:
            results.append(scenario(tmp))

    if previous_next_ready is not None:
        NEXT_READY.write_text(previous_next_ready, encoding="utf-8")

    passed = sum(1 for item in results if item.get("passed"))
    payload = {
        "generatedAt": int(time.time()),
        "reportType": "claim_cas_regression",
        "total": len(results),
        "passed": passed,
        "failed": len(results) - passed,
        "results": results,
    }
    write_json(REPORT, payload)

    print("Claim CAS regression report: %s" % REPORT)
    print("Passed: %d/%d" % (passed, len(results)))

    if passed != len(results):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
