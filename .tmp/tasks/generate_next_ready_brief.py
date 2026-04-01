#!/usr/bin/env python3
from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

ROOT = Path(__file__).resolve().parents[2]
READY_PATH = ROOT / ".tmp/tasks/branding-ready-tasks.json"
EXEC_PATH = ROOT / ".tmp/tasks/EXECUTION_ORDER.json"
OUT_MD = ROOT / ".tmp/tasks/NEXT_READY.md"
OUT_JSON = ROOT / ".tmp/tasks/NEXT_READY.json"


def now_ts() -> int:
    return int(time.time())


def load(path: Path) -> Dict[str, Any]:
    txt = path.read_text(encoding="utf-8").strip()
    return json.loads(txt) if txt else {}


def wave_for_task(task_id: str, manifest: Dict[str, Any]) -> Tuple[Optional[Dict[str, Any]], Optional[int]]:
    for w in manifest.get("waves", []):
        if task_id in w.get("taskIds", []):
            return w, w.get("id")
    return None, None


def main() -> int:
    ready = load(READY_PATH)
    manifest = load(EXEC_PATH)

    selected = None
    if ready.get("ready"):
        selected = ready["ready"][0]

    output: Dict[str, Any]
    if not selected:
        output = {
            "project": "branding-mcp",
            "generatedAt": now_ts(),
            "selectionReason": "no-ready-task",
            "backlogUpdatedAt": ready.get("backlogUpdatedAt"),
            "sourceBacklogPath": ready.get("sourceBacklogPath"),
            "selectedTask": None,
            "wave": None,
            "message": "No ready tasks found.",
        }
        OUT_MD.write_text("# Next Ready\n\nNo ready tasks found.\n", encoding="utf-8")
    else:
        wave, wave_id = wave_for_task(selected["id"], manifest)
        output = {
            "project": "branding-mcp",
            "generatedAt": now_ts(),
            "selectionReason": "first-ready-by-deterministic-priority-order",
            "selectedTask": {
                "id": selected["id"],
                "title": selected.get("title"),
                "priority": selected.get("priority"),
                "status": selected.get("status"),
                "updatedAt": selected.get("updatedAt"),
                "files": selected.get("scope", {}).get("files", []),
                "acceptanceCriteria": selected.get("scope", {}).get("acceptanceCriteria", []),
                "outOfScope": selected.get("scope", {}).get("outOfScope", []),
            },
            "wave": {
                "id": wave_id,
                "branch": wave.get("branch") if wave else None,
                "worktree": wave.get("worktree") if wave else None,
                "gateCommands": wave.get("gateCommands", []) if wave else [],
                "goCondition": wave.get("goCondition") if wave else None,
                "stopCondition": wave.get("stopCondition") if wave else None,
            },
            "claimContext": {
                "manifestType": "next_ready",
                "readySnapshotGeneratedAt": ready.get("generatedAt"),
                "backlogUpdatedAt": ready.get("backlogUpdatedAt"),
                "sourceBacklogPath": ready.get("sourceBacklogPath"),
                "expectedTaskUpdatedAt": selected.get("updatedAt"),
            },
            "runCommand": f"bash .tmp/tasks/run_wave.sh {wave_id}" if wave_id else None,
        }
        md = [
            "# Next Ready",
            "",
            f"- Task: `{selected['id']}`",
            f"- Title: {selected.get('title')}",
            f"- Selection: {output['selectionReason']}",
            f"- Wave: `{wave_id}`",
            f"- Branch: `{output['wave']['branch']}`",
            f"- Worktree: `{output['wave']['worktree']}`",
            "",
            "## Gate Commands",
        ]
        for cmd in output["wave"]["gateCommands"]:
            md.append(f"- `{cmd}`")
        OUT_MD.write_text("\n".join(md) + "\n", encoding="utf-8")

    OUT_JSON.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    print(f"Next-ready brief written: {OUT_MD}")
    print(f"Next-ready manifest written: {OUT_JSON}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
