#!/usr/bin/env python3
from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any, Dict, List

ROOT = Path(__file__).resolve().parents[2]
WORKTREE_BASE = ROOT.parent / "branding-mcp-worktrees"
EXEC_ORDER = ROOT / ".tmp/tasks/EXECUTION_ORDER.json"
INDEX_PATH = ROOT / ".tmp/tasks/branding-wave-handoff-index.json"


def now_ts() -> int:
    return int(time.time())


def is_trusted(path: Path) -> bool:
    try:
        path.resolve().relative_to(WORKTREE_BASE.resolve())
        return True
    except Exception:
        return False


def main() -> int:
    data = json.loads(EXEC_ORDER.read_text(encoding="utf-8"))
    waves_obj = data.get("waves", {})
    if isinstance(waves_obj, dict):
        waves: List[Dict[str, Any]] = []
        for wave_id, wave in sorted(waves_obj.items(), key=lambda item: int(str(item[0]))):
            item = dict(wave)
            item["id"] = int(str(wave_id))
            waves.append(item)
    elif isinstance(waves_obj, list):
        waves = [dict(wave) for wave in waves_obj]
    else:
        waves = []

    index = {
        "project": "branding-mcp",
        "generatedAt": now_ts(),
        "waveHandoffs": {},
    }

    for wave in waves:
        wave_id = str(wave["id"])
        wt = Path(wave["worktree"])
        trusted = is_trusted(wt)
        exists = wt.exists() and wt.is_dir()

        handoff_body = [
            f"# Wave {wave['id']} Handoff",
            "",
            f"- Branch: `{wave['branch']}`",
            f"- Worktree: `{wave['worktree']}`",
            f"- Tasks: `{', '.join(wave['taskIds'])}`",
            "",
            "## Gates",
        ]
        for cmd in wave["gateCommands"]:
            handoff_body.append(f"- `{cmd}`")
        handoff_body.extend(["", f"GO: {wave['goCondition']}", f"STOP: {wave['stopCondition']}"])

        if trusted and exists:
            (wt / "WAVE_HANDOFF.md").write_text("\n".join(handoff_body) + "\n", encoding="utf-8")

        index["waveHandoffs"][f"wave{wave_id}"] = {
            "wave": wave["id"],
            "branch": wave["branch"],
            "worktree": wave["worktree"],
            "taskIds": wave["taskIds"],
            "exists": exists,
            "trusted": trusted,
        }

    INDEX_PATH.write_text(json.dumps(index, indent=2) + "\n", encoding="utf-8")
    print(f"Wave handoff index written: {INDEX_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
