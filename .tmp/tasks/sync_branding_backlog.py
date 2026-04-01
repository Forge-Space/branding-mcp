#!/usr/bin/env python3
from __future__ import annotations

import fcntl
import json
import os
import tempfile
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
SNAPSHOT_PATH = ROOT / ".tmp/tasks/branding-backlog.normalized.json"

TERMINAL_OR_ACTIVE = {"in_progress", "completed", "cancelled"}
PRIORITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}


def now_ts() -> int:
    return int(time.time())


def sort_key(task: Dict[str, Any]) -> Tuple[int, int, int, str]:
    priority = PRIORITY_ORDER.get(str(task.get("priority", "medium")).lower(), 2)
    dep_count = len(task.get("dependencies", []))
    updated = int(task.get("updatedAt", 0) or 0)
    return (priority, dep_count, -updated, str(task.get("id", "")))


def make_task(
    task_id: str,
    title: str,
    description: str,
    priority: str,
    files: List[str],
    criteria: List[str],
    out_of_scope: List[str],
    deps: List[str],
) -> Dict[str, Any]:
    ts = now_ts()
    return {
        "id": task_id,
        "title": title,
        "description": description,
        "directory": str(ROOT),
        "priority": priority,
        "status": "backlog",
        "dependencies": deps,
        "scope": {
            "files": files,
            "acceptanceCriteria": criteria,
            "outOfScope": out_of_scope,
        },
        "createdAt": ts,
        "updatedAt": ts,
    }


def branding_task_template() -> List[Dict[str, Any]]:
    return [
        make_task(
            "task_branding_healthcare_01_define-healthcare-output-contract-and-exports",
            "Define BrandHealthcareOutput contract and exports",
            "Current: healthcare contract/export path is missing. Expected: add healthcare output type and export surface without generator logic or registration.",
            "high",
            ["src/lib/types.ts", "src/lib/branding-core/index.ts", "src/index.ts"],
            [
                "BrandHealthcareOutput is defined in shared types",
                "branding-core exports healthcare generator symbol path",
                "Top-level type exports include BrandHealthcareOutput",
            ],
            [
                "No generator business logic",
                "No MCP handler registration",
                "No version/release updates",
            ],
            [],
        ),
        make_task(
            "task_branding_healthcare_02_implement-healthcare-vertical-generator-behavior",
            "Implement healthcare vertical generator behavior",
            "Current: no healthcare generator behavior. Expected: deterministic style-aware healthcare output with unknown-style safe fallback.",
            "high",
            ["src/lib/branding-core/generators/brand-healthcare.ts"],
            [
                "Generator returns BrandHealthcareOutput shape",
                "Unknown style falls back safely",
                "Summary handles missing tagline safely",
            ],
            ["No wrapper registration", "No docs/version changes"],
            [
                "task_branding_healthcare_01_define-healthcare-output-contract-and-exports"
            ],
        ),
        make_task(
            "task_branding_healthcare_03_add-healthcare-generator-unit-tests-for-branches-and-fallback",
            "Add healthcare generator unit tests",
            "Current: no unit tests for healthcare generator. Expected: branch/fallback/no-tagline coverage for healthcare generator behavior.",
            "high",
            ["src/__tests__/unit/brand-healthcare.test.ts"],
            [
                "Tests cover style branch and unknown fallback",
                "Tests verify output shape and required arrays",
                "Tests verify no-tagline summary safety",
            ],
            ["No integration suite expansion", "No release tasks"],
            [
                "task_branding_healthcare_02_implement-healthcare-vertical-generator-behavior"
            ],
        ),
        make_task(
            "task_branding_healthcare_04_create-mcp-wrapper-for-generate-brand-healthcare",
            "Create MCP wrapper for generate_brand_healthcare",
            "Current: no healthcare MCP wrapper. Expected: wrapper parses BrandIdentity JSON and serializes healthcare output as text.",
            "high",
            ["src/tools/generate-brand-healthcare.ts"],
            [
                "Tool name is generate_brand_healthcare",
                "Input parsing and output serialization follow existing wrappers",
                "Wrapper compiles with stable imports",
            ],
            ["No server registration", "No generator refactor beyond required calls"],
            [
                "task_branding_healthcare_02_implement-healthcare-vertical-generator-behavior"
            ],
        ),
        make_task(
            "task_branding_healthcare_05_wire-healthcare-tool-into-server-registration-and-integration-coverage",
            "Wire healthcare tool registration and integration assertion",
            "Current: healthcare tool is not guaranteed in server registration contract. Expected: register healthcare tool and assert coverage in integration tests.",
            "high",
            ["src/index.ts", "src/__tests__/integration/mcp-server.test.ts"],
            [
                "Healthcare tool is registered in server startup",
                "Integration test asserts healthcare registration path",
                "Typecheck and targeted tests pass",
            ],
            ["No release/version changes", "No unrelated tool reordering"],
            [
                "task_branding_healthcare_03_add-healthcare-generator-unit-tests-for-branches-and-fallback",
                "task_branding_healthcare_04_create-mcp-wrapper-for-generate-brand-healthcare",
            ],
        ),
        make_task(
            "task_branding_healthcare_06_update-tool-inventory-docs-for-healthcare-vertical",
            "Update tool inventory docs for healthcare vertical",
            "Current: docs do not include healthcare tool and counts. Expected: README inventory and tool counts include healthcare entry.",
            "medium",
            ["README.md"],
            [
                "Healthcare tool is listed in inventory",
                "Tool count references are accurate",
            ],
            ["No changelog/version bump", "No unrelated doc rewrites"],
            [
                "task_branding_healthcare_05_wire-healthcare-tool-into-server-registration-and-integration-coverage"
            ],
        ),
        make_task(
            "task_branding_mcp_01_create-mcp-integration-tool-matrix-fixture",
            "Create MCP integration tool matrix fixture",
            "Current: no single matrix for integration contract checks. Expected: create shared core/vertical matrix with payload and export metadata.",
            "high",
            ["src/__tests__/integration/helpers/mcp-tool-matrix.ts"],
            [
                "Matrix defines core and vertical entries",
                "Each entry includes minimal payload and expected export symbol",
                "Fixture imports compile in integration tests",
            ],
            ["No business logic changes", "No new tools added"],
            [
                "task_branding_healthcare_05_wire-healthcare-tool-into-server-registration-and-integration-coverage"
            ],
        ),
        make_task(
            "task_branding_mcp_02_expose-reusable-mcp-registration-function",
            "Expose reusable MCP registration function",
            "Current: registration logic is inline and hard to reuse in tests. Expected: exported reusable registration function with unchanged runtime behavior.",
            "high",
            ["src/index.ts", "src/__tests__/integration/mcp-server.test.ts"],
            [
                "Reusable registration function is exported",
                "main delegates to reusable function without drift",
                "Integration smoke uses reusable function",
            ],
            ["No generator behavior changes", "No transport/CLI changes"],
            [
                "task_branding_healthcare_05_wire-healthcare-tool-into-server-registration-and-integration-coverage"
            ],
        ),
        make_task(
            "task_branding_mcp_03_assert-complete-mcp-tool-registration-set",
            "Assert complete MCP tool registration set",
            "Current: no strict parity guard for registered tools. Expected: integration test fails on missing/extra/duplicate tool names.",
            "high",
            ["src/__tests__/integration/mcp-server-registration.test.ts"],
            [
                "Registered set matches matrix exactly",
                "Duplicate tool names are rejected",
                "Failure output lists missing/extra names",
            ],
            ["No payload-level invocation assertions"],
            [
                "task_branding_mcp_01_create-mcp-integration-tool-matrix-fixture",
                "task_branding_mcp_02_expose-reusable-mcp-registration-function",
            ],
        ),
        make_task(
            "task_branding_mcp_04_add-core-mcp-tool-invocation-contract-tests",
            "Add core MCP invocation contract tests",
            "Current: core invocation contracts are not enforced uniformly. Expected: matrix-driven core invocation suite with shared contract assertions.",
            "medium",
            [
                "src/__tests__/integration/mcp-server-invocation-core.test.ts",
                "src/__tests__/integration/helpers/mcp-contract-assertions.ts",
            ],
            [
                "All core matrix entries execute shared contract assertions",
                "Errors include tool-specific diagnostics",
            ],
            ["No deep payload snapshotting", "No performance benchmarking"],
            [
                "task_branding_mcp_01_create-mcp-integration-tool-matrix-fixture",
                "task_branding_mcp_02_expose-reusable-mcp-registration-function",
            ],
        ),
        make_task(
            "task_branding_mcp_05_add-vertical-mcp-tool-invocation-contract-tests",
            "Add vertical MCP invocation contract tests",
            "Current: vertical invocation contracts are not enforced uniformly. Expected: matrix-driven vertical suite with shared contract assertions.",
            "medium",
            ["src/__tests__/integration/mcp-server-invocation-vertical.test.ts"],
            [
                "All vertical matrix entries execute shared contract assertions",
                "Errors include tool-specific diagnostics",
            ],
            ["No new vertical features", "No release metadata updates"],
            [
                "task_branding_mcp_01_create-mcp-integration-tool-matrix-fixture",
                "task_branding_mcp_02_expose-reusable-mcp-registration-function",
            ],
        ),
        make_task(
            "task_branding_mcp_06_assert-tool-to-export-consistency-in-integration-suite",
            "Assert tool-to-export consistency in integration suite",
            "Current: tool registration and branding-core exports can drift. Expected: consistency suite cross-checks matrix symbols, exports, and registration inventory.",
            "medium",
            ["src/__tests__/integration/mcp-server-export-consistency.test.ts"],
            [
                "Fails when matrix symbol missing from branding-core exports",
                "Fails when registered tool lacks matrix mapping",
                "Focused MCP chain tests pass together",
            ],
            ["No version/changelog changes", "No new tools"],
            [
                "task_branding_mcp_03_assert-complete-mcp-tool-registration-set",
                "task_branding_mcp_04_add-core-mcp-tool-invocation-contract-tests",
                "task_branding_mcp_05_add-vertical-mcp-tool-invocation-contract-tests",
            ],
        ),
    ]


def read_backlog(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {"tasks": [], "version": 1}
    raw = path.read_text(encoding="utf-8").strip()
    if not raw:
        return {"tasks": [], "version": 1}
    return json.loads(raw)


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


def merge_status(
    existing: Dict[str, Dict[str, Any]], tasks: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    now = now_ts()
    for task in tasks:
        prev = existing.get(task["id"])
        if not prev:
            continue
        task["createdAt"] = prev.get("createdAt", task["createdAt"])
        status = prev.get("status")
        if status in TERMINAL_OR_ACTIVE:
            task["status"] = status
            task["updatedAt"] = prev.get("updatedAt", now)
    task_map = {t["id"]: t for t in tasks}

    for task in tasks:
        if task["status"] not in TERMINAL_OR_ACTIVE:
            task["status"] = "backlog"

    active_exists = any(t["status"] == "in_progress" for t in tasks)
    if not active_exists:
        eligible: List[Dict[str, Any]] = []
        for task in tasks:
            if task["status"] in TERMINAL_OR_ACTIVE:
                continue
            deps = task.get("dependencies", [])
            deps_done = all(
                task_map[d]["status"] in {"completed", "cancelled"} for d in deps
            )
            if deps_done:
                eligible.append(task)

        if eligible:
            selected = sorted(eligible, key=sort_key)[0]
            selected["status"] = "ready"
            selected["updatedAt"] = now

    return tasks


def validate_dependencies(tasks: List[Dict[str, Any]]) -> None:
    ids = {t["id"] for t in tasks}
    for t in tasks:
        for dep in t.get("dependencies", []):
            if dep not in ids:
                raise ValueError(f"Missing dependency: {t['id']} -> {dep}")


def main() -> int:
    templates = branding_task_template()
    validate_dependencies(templates)

    BACKLOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(BACKLOG_PATH, "a+", encoding="utf-8") as lockf:
        fcntl.flock(lockf, fcntl.LOCK_EX)
        lockf.seek(0)
        content = lockf.read().strip()
        data: Dict[str, Any]
        if content:
            data = json.loads(content)
        else:
            data = {"tasks": [], "version": 1}

        existing_tasks = data.get("tasks", [])
        existing_branding = {
            t["id"]: t
            for t in existing_tasks
            if str(t.get("id", "")).startswith("task_branding_")
        }
        non_branding = [
            t
            for t in existing_tasks
            if not str(t.get("id", "")).startswith("task_branding_")
        ]

        branding_tasks = merge_status(existing_branding, templates)
        merged = non_branding + branding_tasks

        data["tasks"] = merged
        data["version"] = int(data.get("version", 1))
        data["updatedAt"] = now_ts()

        write_json_atomic(BACKLOG_PATH, data)

    snapshot = {
        "project": "branding-mcp",
        "generatedAt": now_ts(),
        "sourceBacklogPath": str(BACKLOG_PATH),
        "brandingTasks": branding_tasks,
    }
    write_json_atomic(SNAPSHOT_PATH, snapshot)

    print(f"Backlog synced: {BACKLOG_PATH}")
    print(f"Branding tasks present: {len(branding_tasks)}")
    print(f"Snapshot written: {SNAPSHOT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
