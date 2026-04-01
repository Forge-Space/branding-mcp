#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any, Dict, List

ROOT = Path(__file__).resolve().parents[2]
WORKTREE_BASE = ROOT.parent / "branding-mcp-worktrees"

OUT_MD = ROOT / ".tmp/tasks/EXECUTION_ORDER.md"
OUT_JSON = ROOT / ".tmp/tasks/EXECUTION_ORDER.json"


def resolve_task_cli() -> str:
    env_path = os.environ.get("TASK_CLI_PATH", "").strip()
    if env_path:
        return env_path

    repo_local = ROOT / ".opencode/skills/task-management/scripts/task-cli.ts"
    if repo_local.exists():
        return str(repo_local)

    global_default = (
        Path.home() / ".config/opencode/skills/task-management/scripts/task-cli.ts"
    )
    return str(global_default)


def now_ts() -> int:
    return int(time.time())


def waves() -> List[Dict[str, Any]]:
    task_cli = resolve_task_cli()
    return [
        {
            "id": 1,
            "title": "Healthcare contract and exports",
            "branch": "feature/branding-wave1-healthcare-contract-exports",
            "worktree": str(WORKTREE_BASE / "wave1-healthcare-contract-exports"),
            "taskIds": [
                "task_branding_healthcare_01_define-healthcare-output-contract-and-exports"
            ],
            "gateCommands": [
                f'npx ts-node --compiler-options \'{{"module":"commonjs"}}\' "{task_cli}" status',
                f'npx ts-node --compiler-options \'{{"module":"commonjs"}}\' "{task_cli}" validate generate-brand-healthcare-tool',
                "npm run typecheck",
            ],
            "goCondition": "Wave 1 done and typecheck passes",
            "stopCondition": "Any gate fails or scope expands",
        },
        {
            "id": 2,
            "title": "Healthcare generator, tests, wrapper",
            "branch": "feature/branding-wave2-healthcare-generator-wrapper-tests",
            "worktree": str(WORKTREE_BASE / "wave2-healthcare-generator-wrapper-tests"),
            "taskIds": [
                "task_branding_healthcare_02_implement-healthcare-vertical-generator-behavior",
                "task_branding_healthcare_03_add-healthcare-generator-unit-tests-for-branches-and-fallback",
                "task_branding_healthcare_04_create-mcp-wrapper-for-generate-brand-healthcare",
            ],
            "gateCommands": [
                "npm run typecheck",
                "npm run check:cycles",
                "npm run test -- src/__tests__/unit/brand-healthcare.test.ts",
            ],
            "goCondition": "All wave 2 gates pass",
            "stopCondition": "Any gate fails",
        },
        {
            "id": 3,
            "title": "Registration and docs",
            "branch": "feature/branding-wave3-healthcare-registration-docs",
            "worktree": str(WORKTREE_BASE / "wave3-healthcare-registration-docs"),
            "taskIds": [
                "task_branding_healthcare_05_wire-healthcare-tool-into-server-registration-and-integration-coverage",
                "task_branding_healthcare_06_update-tool-inventory-docs-for-healthcare-vertical",
            ],
            "gateCommands": [
                "npm run typecheck",
                "npm run test -- src/__tests__/integration/mcp-server.test.ts",
                "npm run test -- src/__tests__/unit/brand-healthcare.test.ts",
            ],
            "goCondition": "All wave 3 gates pass",
            "stopCondition": "Any gate fails",
        },
        {
            "id": 4,
            "title": "MCP matrix and reusable registration",
            "branch": "feature/branding-wave4-mcp-matrix-registration-harness",
            "worktree": str(WORKTREE_BASE / "wave4-mcp-matrix-registration-harness"),
            "taskIds": [
                "task_branding_mcp_01_create-mcp-integration-tool-matrix-fixture",
                "task_branding_mcp_02_expose-reusable-mcp-registration-function",
            ],
            "gateCommands": [
                "npm run typecheck",
                "npm run check:cycles",
                "npm run test -- src/__tests__/integration/mcp-server.test.ts",
            ],
            "goCondition": "All wave 4 gates pass",
            "stopCondition": "Any gate fails",
        },
        {
            "id": 5,
            "title": "Registration and invocation contracts",
            "branch": "feature/branding-wave5-registration-invocation-contract-tests",
            "worktree": str(
                WORKTREE_BASE / "wave5-registration-invocation-contract-tests"
            ),
            "taskIds": [
                "task_branding_mcp_03_assert-complete-mcp-tool-registration-set",
                "task_branding_mcp_04_add-core-mcp-tool-invocation-contract-tests",
                "task_branding_mcp_05_add-vertical-mcp-tool-invocation-contract-tests",
            ],
            "gateCommands": [
                "npm run typecheck",
                "npm run test -- src/__tests__/integration/mcp-server-registration.test.ts",
                "npm run test -- src/__tests__/integration/mcp-server-invocation-core.test.ts",
                "npm run test -- src/__tests__/integration/mcp-server-invocation-vertical.test.ts",
            ],
            "goCondition": "All wave 5 gates pass",
            "stopCondition": "Any gate fails",
        },
        {
            "id": 6,
            "title": "Export consistency guard",
            "branch": "feature/branding-wave6-export-consistency-guard",
            "worktree": str(WORKTREE_BASE / "wave6-export-consistency-guard"),
            "taskIds": [
                "task_branding_mcp_06_assert-tool-to-export-consistency-in-integration-suite"
            ],
            "gateCommands": [
                "npm run typecheck",
                "npm run test -- src/__tests__/integration/mcp-server-export-consistency.test.ts",
                "npm run test -- src/__tests__/integration/mcp-server-registration.test.ts",
                "npm run test -- src/__tests__/integration/mcp-server-invocation-core.test.ts",
                "npm run test -- src/__tests__/integration/mcp-server-invocation-vertical.test.ts",
            ],
            "goCondition": "All wave 6 gates pass",
            "stopCondition": "Any gate fails",
        },
    ]


def write_md(ws: List[Dict[str, Any]]) -> None:
    lines: List[str] = ["# EXECUTION_ORDER", "", "## Waves", ""]
    for w in ws:
        lines.extend(
            [
                f"### Wave {w['id']} - {w['title']}",
                f"- Worktree: `{w['worktree']}`",
                f"- Branch: `{w['branch']}`",
                f"- Tasks: `{', '.join(w['taskIds'])}`",
                "- Gate commands:",
            ]
        )
        for cmd in w["gateCommands"]:
            lines.append(f"  - `{cmd}`")
        lines.extend(
            [
                f"- GO: {w['goCondition']}",
                f"- STOP: {w['stopCondition']}",
                "",
            ]
        )
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    ws = waves()
    payload = {
        "generatedAt": now_ts(),
        "project": "branding-mcp",
        "waves": ws,
    }
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    write_md(ws)
    print(f"Execution order written: {OUT_MD}")
    print(f"Execution manifest written: {OUT_JSON}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
