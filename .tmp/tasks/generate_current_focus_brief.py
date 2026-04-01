#!/usr/bin/env python3
from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

ROOT = Path(__file__).resolve().parents[2]
READY_PATH = ROOT / ".tmp/tasks/branding-ready-tasks.json"
EXEC_PATH = ROOT / ".tmp/tasks/EXECUTION_ORDER.json"
OUT_MD = ROOT / ".tmp/tasks/CURRENT_FOCUS.md"
OUT_JSON = ROOT / ".tmp/tasks/CURRENT_FOCUS.json"


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

    source = "none"
    selected = None
    if ready.get("preserved"):
        for t in ready["preserved"]:
            if t.get("status") == "in_progress":
                selected = t
                source = "in_progress"
                break
    if not selected and ready.get("ready"):
        selected = ready["ready"][0]
        source = "ready_fallback"

    if not selected:
        payload = {
            "project": "branding-mcp",
            "generatedAt": now_ts(),
            "focusSource": "none",
            "selectionReason": "no-in-progress-or-ready-task",
            "backlogUpdatedAt": ready.get("backlogUpdatedAt"),
            "sourceBacklogPath": ready.get("sourceBacklogPath"),
            "selectedTask": None,
            "wave": None,
            "message": "No in-progress or ready task found.",
        }
        OUT_MD.write_text("# Current Focus\n\nNo in-progress or ready task found.\n", encoding="utf-8")
    else:
        wave, wave_id = wave_for_task(selected["id"], manifest)
        reason = "prefer-in-progress-then-ready-fallback"
        payload = {
            "project": "branding-mcp",
            "generatedAt": now_ts(),
            "focusSource": source,
            "selectionReason": reason,
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
                "manifestType": "current_focus",
                "readySnapshotGeneratedAt": ready.get("generatedAt"),
                "backlogUpdatedAt": ready.get("backlogUpdatedAt"),
                "sourceBacklogPath": ready.get("sourceBacklogPath"),
                "expectedTaskUpdatedAt": selected.get("updatedAt"),
            },
            "runCommand": f"bash .tmp/tasks/run_wave.sh {wave_id}" if wave_id else None,
        }
        md = [
            "# Current Focus",
            "",
            f"- Task: `{selected['id']}`",
            f"- Title: {selected.get('title')}",
            f"- Focus source: `{source}`",
            f"- Selection: {reason}",
            f"- Wave: `{wave_id}`",
            f"- Branch: `{payload['wave']['branch']}`",
            f"- Worktree: `{payload['wave']['worktree']}`",
            "",
            "## Gate Commands",
        ]
        for cmd in payload["wave"]["gateCommands"]:
            md.append(f"- `{cmd}`")
        OUT_MD.write_text("\n".join(md) + "\n", encoding="utf-8")

    OUT_JSON.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Current-focus brief written: {OUT_MD}")
    print(f"Current-focus manifest written: {OUT_JSON}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
