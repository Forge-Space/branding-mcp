#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any, Dict

ROOT = Path(__file__).resolve().parents[2]
BACKLOG_PATH = Path(
    os.environ.get(
        "ORCHESTRATOR_BACKLOG_PATH",
        str(Path.home() / ".local/share/opencode/orchestrator/backlog.json"),
    )
)
READY_PATH = ROOT / ".tmp/tasks/branding-ready-tasks.json"
EXEC_ORDER = ROOT / ".tmp/tasks/EXECUTION_ORDER.json"
WAVE_INDEX = ROOT / ".tmp/tasks/branding-wave-handoff-index.json"
OUT = ROOT / ".tmp/tasks/branding-backlog.guard-report.json"
WAVE_PLAN = ROOT / ".tmp/tasks/branding-wave-plan.md"
WORKTREE_BASE = ROOT.parent / "branding-mcp-worktrees"


def now_ts() -> int:
    return int(time.time())


def load(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {}
    txt = path.read_text(encoding="utf-8").strip()
    return json.loads(txt) if txt else {}


def status_counts(tasks):
    counts: Dict[str, int] = {}
    for t in tasks:
        s = str(t.get("status", "unknown"))
        counts[s] = counts.get(s, 0) + 1
    return counts


def trusted(path: Path) -> bool:
    try:
        path.resolve().relative_to(WORKTREE_BASE.resolve())
        return True
    except Exception:
        return False


def write_wave_plan(exec_order: Dict[str, Any]) -> None:
    lines = ["## Branding-MCP Wave Plan (Sequencing Only)", ""]

    waves_obj = exec_order.get("waves", {})
    if isinstance(waves_obj, dict):
        wave_items = sorted(waves_obj.items(), key=lambda item: int(str(item[0])))
    elif isinstance(waves_obj, list):
        wave_items = [
            (str(w.get("id", "")), w)
            for w in waves_obj
            if isinstance(w, dict) and w.get("id") is not None
        ]
        wave_items.sort(key=lambda item: int(item[0]))
    else:
        wave_items = []

    for wave_id, w in wave_items:
        lines.extend(
            [
                f"### Wave {wave_id}",
                f"**Worktree branch:** `{w.get('branch', '')}`",
                "**Tasks:**",
            ]
        )
        for task_id in w.get("taskIds", []):
            lines.append(f"- `{task_id}`")

        lines.extend(["", "**Gate commands:**"])
        for cmd in w.get("gateCommands", []):
            lines.append(f"- `{cmd}`")

        lines.extend(
            [
                "",
                f"**GO:** {w.get('goCondition', '')}",
                f"**STOP:** {w.get('stopCondition', '')}",
                "",
            ]
        )

    WAVE_PLAN.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    backlog = load(BACKLOG_PATH)
    ready = load(READY_PATH)
    exec_order = load(EXEC_ORDER)
    wave_index = load(WAVE_INDEX)

    raw_branding = [
        t
        for t in backlog.get("tasks", [])
        if str(t.get("id", "")).startswith("task_branding_")
    ]
    raw_counts = status_counts(raw_branding)
    norm_counts = {
        "ready": int(ready.get("readyCount", 0)),
        "backlog": int(ready.get("backlogCount", 0)),
        "preserved": int(ready.get("preservedCount", 0)),
    }

    waves = {}
    for key, meta in wave_index.get("waveHandoffs", {}).items():
        wt = Path(meta.get("worktree", ""))
        waves[key] = {
            "exists": wt.exists() and wt.is_dir(),
            "trusted": trusted(wt),
            "branch": meta.get("branch"),
            "taskIds": meta.get("taskIds", []),
        }

    report = {
        "project": "branding-mcp",
        "generatedAt": now_ts(),
        "sourceBacklogPath": str(BACKLOG_PATH),
        "taskCount": len(raw_branding),
        "rawStatusCounts": raw_counts,
        "normalizedStatusCounts": norm_counts,
        "worktrees": waves,
    }

    OUT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    write_wave_plan(exec_order)

    print(f"Guard report written: {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
