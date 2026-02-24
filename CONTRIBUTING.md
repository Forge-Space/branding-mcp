# Contributing to Branding MCP

Thank you for contributing to Branding MCP. This guide covers everything you need to know to submit high-quality contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Review Process](#review-process)

---

## Code of Conduct

All contributors are expected to be respectful, constructive, and professional. Harassment or exclusionary behavior will not be tolerated.

---

## Getting Started

### 1. Fork and clone

```bash
git clone https://github.com/Forge-Space/branding-mcp.git
cd branding-mcp
npm install
```

### 2. Create a feature branch

```bash
git checkout -b feat/my-feature
```

### 3. Validate your environment

```bash
npm run validate
npm test
npm run build
```

---

## Development Workflow

### Repository structure

Branding MCP is a TypeScript-based MCP server that provides brand identity resources for the Forge Space ecosystem.

### Commands

```bash
npm install       # Install dependencies
npm run build     # Build TypeScript to JavaScript
npm run validate  # Validate MCP server configuration
npm test          # Run test suite
npm run dev       # Development mode with watch
```

### Branch flow

```
feature → main
```

This repository uses simplified trunk-based development. Feature branches merge directly to `main` after review.

### Commit message format

Follow Angular conventional commits:

```
feat(tools): add brand color palette tool
fix(server): resolve resource loading error
docs(readme): update usage examples
refactor(types): simplify brand schema types
test(tools): add validation tests
chore(deps): upgrade @modelcontextprotocol/sdk
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `perf`, `chore`

---

## Code Standards

### TypeScript

- Strict mode enabled
- No `any` types without justification
- All functions must have explicit return types
- Use type imports: `import type { ... }`

### Code quality

- Functions: maximum 50 lines
- Cyclomatic complexity: maximum 10
- Line width: maximum 100 characters
- No comments unless explicitly requested or documenting complex algorithms

### MCP conventions

- Follow Model Context Protocol specification
- Tools must have clear descriptions and schemas
- Resources must be properly typed
- Prompts should be concise and actionable

### Security

- Never commit secrets or credentials
- Use environment variables for configuration
- Validate all user inputs
- Sanitize all outputs

---

## Testing Requirements

### Coverage targets

- Overall coverage: minimum 80%
- Tool handlers: 100%
- Edge cases and error conditions required

### What to test

- Tool handler logic
- Resource loading and validation
- Schema validation
- Error handling and edge cases
- MCP protocol compliance

### What NOT to test

- Trivial getters/setters
- Simple enum definitions
- Third-party library behavior

### Running tests

```bash
npm test                    # Run all tests
npm test -- --coverage      # Generate coverage report
npm test -- --watch         # Watch mode
```

---

## Pull Request Process

### Before opening a PR

Ensure all of the following pass:

```
- [ ] npm run validate passes
- [ ] npm test passes with all tests green
- [ ] npm run build succeeds
- [ ] MCP server starts without errors
- [ ] No secrets or credentials committed
- [ ] CHANGELOG.md updated under [Unreleased]
- [ ] README.md updated if tools or resources changed
- [ ] Commit messages follow conventional commit format
```

### PR checklist

1. Push your branch: `git push origin feat/my-feature`
2. Open PR targeting `main` branch
3. Fill in the PR template completely
4. Link related issues using `Closes #123` syntax
5. Request review from maintainers
6. Address all review feedback

### PR title format

```
feat(tools): add logo variants tool
fix(resources): resolve SVG encoding issue
docs: update tool usage guide
```

---

## Review Process

1. **Automated CI** runs lint, type-check, build, tests, and MCP validation
2. **Maintainer review** checks code quality, MCP compliance, and standards
3. **Approval** requires CI passing + at least 1 maintainer approval
4. **Merge** is done by a maintainer using squash merge to `main`

Typical review turnaround: 2-5 business days.

---

## Questions?

Open a [GitHub Discussion](https://github.com/Forge-Space/branding-mcp/discussions) or file an [issue](https://github.com/Forge-Space/branding-mcp/issues).
