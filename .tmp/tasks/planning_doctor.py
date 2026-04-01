#!/usr/bin/env python3
import argparse
import json
import sys
import time
from pathlib import Path
from typing import Any, Dict, List


class DoctorError(Exception):
    pass


def read_json(path: Path) -> Dict[str, Any]:
    if not path.exists():
        raise DoctorError(f"Missing required artifact: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def _waves_as_dict(execution: Dict[str, Any]) -> Dict[str, Any]:
    waves_obj = execution.get("waves") or {}
    if isinstance(waves_obj, dict):
        return waves_obj
    if isinstance(waves_obj, list):
        mapped: Dict[str, Any] = {}
        for wave in waves_obj:
            wave_id = str(wave.get("id", ""))
            if wave_id:
                mapped[wave_id] = wave
        return mapped
    return {}


def ensure_wave_mapping(
    manifest: Dict[str, Any], execution: Dict[str, Any], name: str
) -> None:
    selected = manifest.get("selectedTask")
    wave = manifest.get("wave") or {}
    if not selected:
        return

    task_id = selected.get("id")
    wave_id = str(wave.get("id") or "")
    if not task_id:
        raise DoctorError(f"{name}: selectedTask.id is missing")
    if not wave_id:
        raise DoctorError(f"{name}: wave.id is missing for selected task {task_id}")

    waves = _waves_as_dict(execution)
    wave_info = waves.get(wave_id)
    if not wave_info:
        raise DoctorError(f"{name}: wave {wave_id} not found in EXECUTION_ORDER.json")

    task_ids = wave_info.get("taskIds") or []
    if task_id not in task_ids:
        raise DoctorError(
            f"{name}: selected task {task_id} not present in wave {wave_id} taskIds"
        )


def ensure_claim_context(manifest: Dict[str, Any], name: str) -> None:
    selected = manifest.get("selectedTask")
    if not selected:
        return

    claim_context = manifest.get("claimContext") or {}
    required = [
        "manifestType",
        "readySnapshotGeneratedAt",
        "backlogUpdatedAt",
        "sourceBacklogPath",
        "expectedTaskUpdatedAt",
    ]
    missing = [key for key in required if key not in claim_context]
    if missing:
        raise DoctorError(f"{name}: claimContext missing keys: {', '.join(missing)}")


def ensure_ready_consistency(
    ready_snapshot: Dict[str, Any],
    next_ready: Dict[str, Any],
    current_focus: Dict[str, Any],
) -> None:
    backlog_updated_at = ready_snapshot.get("backlogUpdatedAt")

    for name, manifest in [
        ("NEXT_READY", next_ready),
        ("CURRENT_FOCUS", current_focus),
    ]:
        claim_context = manifest.get("claimContext") or {}
        if not claim_context:
            continue
        if claim_context.get("backlogUpdatedAt") != backlog_updated_at:
            raise DoctorError(
                f"{name}: backlogUpdatedAt mismatch with branding-ready-tasks.json"
            )
        if claim_context.get("sourceBacklogPath") != ready_snapshot.get(
            "sourceBacklogPath"
        ):
            raise DoctorError(
                f"{name}: sourceBacklogPath mismatch with branding-ready-tasks.json"
            )


def ensure_stale_worktree_hygiene(
    repo_root: Path, execution: Dict[str, Any], max_age_hours: float
) -> None:
    if max_age_hours < 0:
        raise DoctorError("--stale-worktree-max-age-hours must be >= 0")

    worktree_base = repo_root.parent / f"{repo_root.name}-worktrees"
    if not worktree_base.exists():
        raise DoctorError(f"Worktree base does not exist: {worktree_base}")
    if not worktree_base.is_dir():
        raise DoctorError(f"Worktree base is not a directory: {worktree_base}")

    now = time.time()
    max_age_seconds = max_age_hours * 3600
    waves = _waves_as_dict(execution)

    expected_paths = set()
    for wave in waves.values():
        wave_path = wave.get("worktree")
        if not wave_path:
            continue
        expected_paths.add(str(Path(wave_path).resolve()))

    stale_candidates: List[str] = []
    for entry in worktree_base.iterdir():
        if not entry.is_dir():
            continue

        resolved = str(entry.resolve())
        if resolved in expected_paths:
            continue

        age_seconds = now - entry.stat().st_mtime
        if age_seconds < max_age_seconds:
            continue

        age_hours = age_seconds / 3600
        stale_candidates.append(f"{entry} ({age_hours:.1f}h old)")

    if stale_candidates:
        sample = "\n- ".join(stale_candidates[:10])
        raise DoctorError(
            "Strict stale-worktree check failed: found worktrees outside EXECUTION_ORDER"
            f" older than {max_age_hours:g}h under {worktree_base}:\n- {sample}"
        )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Validate branding planning artifact coherence"
    )
    parser.add_argument("--strict", action="store_true", help="Enable stricter checks")
    parser.add_argument(
        "--strict-stale-worktrees",
        action="store_true",
        help="Fail when extra stale worktrees exist outside EXECUTION_ORDER mapping",
    )
    parser.add_argument(
        "--stale-worktree-max-age-hours",
        type=float,
        default=24.0,
        help="Age threshold used with --strict-stale-worktrees (default: 24)",
    )
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[2]
    tasks_dir = root / ".tmp" / "tasks"

    required_files: List[Path] = [
        tasks_dir / "branding-ready-tasks.json",
        tasks_dir / "EXECUTION_ORDER.json",
        tasks_dir / "NEXT_READY.json",
        tasks_dir / "CURRENT_FOCUS.json",
        tasks_dir / "branding-wave-handoff-index.json",
    ]

    for file_path in required_files:
        if not file_path.exists():
            raise DoctorError(f"Missing required artifact: {file_path}")

    ready_snapshot = read_json(tasks_dir / "branding-ready-tasks.json")
    execution = read_json(tasks_dir / "EXECUTION_ORDER.json")
    next_ready = read_json(tasks_dir / "NEXT_READY.json")
    current_focus = read_json(tasks_dir / "CURRENT_FOCUS.json")

    ensure_wave_mapping(next_ready, execution, "NEXT_READY")
    ensure_wave_mapping(current_focus, execution, "CURRENT_FOCUS")
    ensure_claim_context(next_ready, "NEXT_READY")
    ensure_claim_context(current_focus, "CURRENT_FOCUS")
    ensure_ready_consistency(ready_snapshot, next_ready, current_focus)

    if args.strict:
        wave_index = read_json(tasks_dir / "branding-wave-handoff-index.json")
        guard_report = read_json(tasks_dir / "branding-backlog.guard-report.json")
        wave_index_waves = (
            wave_index.get("waves") or wave_index.get("waveHandoffs") or {}
        )
        execution_waves = _waves_as_dict(execution)
        if len(execution_waves.keys()) != len(wave_index_waves.keys()):
            raise DoctorError(
                "Wave count mismatch between EXECUTION_ORDER and wave handoff index"
            )

        expected_task_count = 12
        task_count = guard_report.get("taskCount")
        if task_count != expected_task_count:
            raise DoctorError(
                f"Strict invariant failed: taskCount={task_count}, expected={expected_task_count}"
            )

        normalized_counts = guard_report.get("normalizedStatusCounts") or {}
        ready_count = int(normalized_counts.get("ready", 0) or 0)
        backlog_count = int(normalized_counts.get("backlog", 0) or 0)
        preserved_count = int(normalized_counts.get("preserved", 0) or 0)

        if ready_count < 0 or ready_count > 1:
            raise DoctorError(
                "Strict invariant failed: normalizedStatusCounts.ready must be 0 or 1"
            )

        expected_backlog = expected_task_count - preserved_count - ready_count
        if expected_backlog < 0:
            raise DoctorError(
                "Strict invariant failed: normalizedStatusCounts totals exceed taskCount"
            )
        if backlog_count != expected_backlog:
            raise DoctorError(
                "Strict invariant failed: normalizedStatusCounts.backlog mismatch "
                f"(got {backlog_count}, expected {expected_backlog})"
            )

        has_active_backlog = (ready_count + backlog_count) > 0
        if has_active_backlog:
            worktrees = guard_report.get("worktrees") or {}
            required_wave_ids = set()
            for manifest in (next_ready, current_focus):
                selected = manifest.get("selectedTask")
                wave = manifest.get("wave") or {}
                if not selected:
                    continue
                wave_id = wave.get("id")
                if wave_id is None:
                    continue
                required_wave_ids.add(f"wave{wave_id}")

            for wave_id in sorted(required_wave_ids):
                info = worktrees.get(wave_id)
                if not isinstance(info, dict):
                    raise DoctorError(
                        f"Strict invariant failed: missing worktree entry for {wave_id}"
                    )
                if info.get("exists") is not True:
                    raise DoctorError(
                        f"Strict invariant failed: {wave_id} worktree is not present"
                    )
                if info.get("trusted") is not True:
                    raise DoctorError(
                        f"Strict invariant failed: {wave_id} worktree is not trusted"
                    )

        if args.strict_stale_worktrees:
            ensure_stale_worktree_hygiene(
                root,
                execution,
                args.stale_worktree_max_age_hours,
            )

    print("Planning doctor passed.")


if __name__ == "__main__":
    try:
        main()
    except DoctorError as err:
        print(str(err), file=sys.stderr)
        sys.exit(1)
