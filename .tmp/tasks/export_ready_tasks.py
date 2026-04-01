#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any, Dict, List, Tuple

ROOT = Path(__file__).resolve().parents[2]
BACKLOG_PATH = Path(
    os.environ.get(
        "ORCHESTRATOR_BACKLOG_PATH",
        str(Path.home() / ".local/share/opencode/orchestrator/backlog.json"),
    )
)
OUT = ROOT / ".tmp/tasks/branding-ready-tasks.json"

TERMINAL_OR_ACTIVE = {"in_progress", "completed", "cancelled"}
PRIORITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}


def now_ts() -> int:
    return int(time.time())


def load_json(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8").strip()
    return json.loads(text) if text else {}


def sort_key(task: Dict[str, Any]) -> Tuple[int, int, int, str]:
    priority = PRIORITY_ORDER.get(str(task.get("priority", "medium")).lower(), 2)
    dep_count = len(task.get("dependencies", []))
    updated = int(task.get("updatedAt", 0) or 0)
    return (priority, dep_count, -updated, str(task.get("id", "")))


def normalize(
    tasks: List[Dict[str, Any]],
) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], List[Dict[str, Any]]]:
    branding = [t for t in tasks if str(t.get("id", "")).startswith("task_branding_")]
    task_map = {t["id"]: t for t in branding}

    ready: List[Dict[str, Any]] = []
    eligible: List[Dict[str, Any]] = []
    backlog: List[Dict[str, Any]] = []
    preserved: List[Dict[str, Any]] = []

    active_exists = any(t.get("status") == "in_progress" for t in branding)

    for task in branding:
        status = str(task.get("status", "backlog"))
        if status in TERMINAL_OR_ACTIVE:
            preserved.append(task)
            continue

        deps = task.get("dependencies", [])
        deps_done = all(
            task_map.get(dep, {}).get("status") in {"completed", "cancelled"}
            for dep in deps
        )

        if deps_done and not active_exists:
            eligible.append(task)
        else:
            backlog.append(task)

    eligible = sorted(eligible, key=sort_key)
    if eligible:
        ready = [eligible[0]]
        backlog.extend(eligible[1:])

    backlog = sorted(backlog, key=sort_key)
    preserved = sorted(preserved, key=sort_key)
    return ready, backlog, preserved


def main() -> int:
    payload = load_json(BACKLOG_PATH)
    tasks = payload.get("tasks", [])
    ready, backlog, preserved = normalize(tasks)

    out = {
        "project": "branding-mcp",
        "generatedAt": now_ts(),
        "sourceBacklogPath": str(BACKLOG_PATH),
        "backlogUpdatedAt": payload.get("updatedAt"),
        "taskCount": len(
            [t for t in tasks if str(t.get("id", "")).startswith("task_branding_")]
        ),
        "readyCount": len(ready),
        "backlogCount": len(backlog),
        "preservedCount": len(preserved),
        "selectionPolicy": "priority -> dependency-count -> updatedAt(desc) -> id",
        "ready": ready,
        "backlog": backlog,
        "preserved": preserved,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")

    print(f"Ready snapshot written: {OUT}")
    print(f"Normalized counts: ready={len(ready)} backlog={len(backlog)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
