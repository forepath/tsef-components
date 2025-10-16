# Agent Guidelines

This document defines the rules and best practices for how you interact with this repository and its workflows. It enforces consistency, reliability, and maintainability across all agent-driven tasks.

> The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## General Rules

- You **MUST** respond in alignment with the best practices and workflows defined in this repository's documentation.
- You **MUST** prefer Nx workflows and tooling for running builds, tests, linting, and affected analysis.
- You **SHOULD** propose relevant commands from the Essential Commands when applicable.
- You **SHOULD** highlight Nx's monorepo features (smart task execution, generators, project graph) when relevant.
- You **MAY** reference the plugin ecosystem and supported frameworks when helpful for context.

## Operation Modes

### Plan-First Mode (Default)

- You **SHOULD** use this mode when requests say "analyze", "investigate", "assess", "review", "examine", or "plan", or when the request is ambiguous.
- In this mode, you **MUST**:
  1. Analyze the issue in detail
  2. Produce a clear implementation plan broken into actionable steps
  3. Post the plan for review before making changes

### Immediate Implementation Mode

- You **SHOULD** use this mode when requests say "fix", "implement", "solve", "build", "create", "update", or "add", or when immediate action is explicitly requested.
- In this mode, you **MUST**:
  1. Perform a concise analysis
  2. Implement the complete solution
  3. Make focused commits (multiple small commits are **RECOMMENDED** for reviewability)
  4. Run tests and validations
  5. If tests fail, **SHOULD** iterate up to three times to resolve failures before escalating
  6. Push a branch and propose a PR that clearly states "Fixes #ISSUE_NUMBER" when applicable

### Mixed-Mode Guidelines

- When requests contain both analysis and implementation keywords (e.g., "analyze and fix", "review and implement", "investigate and solve"), you **MUST** follow this hierarchy:
  1. **Analysis takes precedence** - Always start with Plan-First Mode for the analysis portion
  2. **Implementation follows** - After presenting the plan, proceed with Immediate Implementation Mode
  3. **Sequential execution** - Complete the analysis phase before beginning implementation
- For requests like "analyze and fix", you **MUST**:
  1. First: Analyze the issue in detail and present findings
  2. Then: Wait for confirmation or proceed with implementation based on the analysis
  3. Finally: Implement the solution using Immediate Implementation Mode workflow
- When in doubt about mixed-mode requests, you **SHOULD** default to Plan-First Mode and ask for clarification on implementation preferences

## Source of Truth and File Editing

- You **MUST NOT** edit generated outputs or files under any `generated` directory; you **MUST** locate and edit the authoritative source instead.
- You **MUST** apply automated formatting using `nx format:write` after making changes.
- You **SHOULD** keep edits focused and scoped to the problem being solved.

## Command and Tooling Guidelines

- You **MUST** run tasks via Nx rather than underlying tooling directly (e.g., `nx run`, `nx run-many`, `nx affected`).
- You **SHOULD** use the `devkit` MCP server tools for workspace insights and diagnostics when available.
- You **SHOULD** use the `nx` MCP server tools for workspace insights and diagnostics when `devkit` tooling does not return the required data or fails.
- You **MAY** refer to other available MCP server tools if the desired action cannot be completed with `devkit` or `nx` tooling.
- You **SHOULD** suggest or execute the following when relevant:

### Code Formatting

- You **MUST** format changed files using Prettier to prevent pipeline failures:

```bash
nx format:write
```

### Pre-push Validation

- You **SHOULD** execute the full validation suite before committing:

```bash
nx prepush
```

- If validation fails, you **MUST** fix issues prior to proceeding and **SHOULD** amend the current commit rather than adding new commits solely to fix validation.

### Testing Changes

- You **SHOULD** validate individual projects first:

```bash
nx run-many -t test,build,lint -p PROJECT_NAME
```

- You **SHOULD** validate affected projects:

```bash
nx affected -t build,test,lint
```

- You **SHOULD** run affected e2e tests as a final verification step:

```bash
nx affected -t e2e
```

## GitHub Issue Workflow

### 1. Retrieve Issue Details

- You **SHOULD** gather issue details efficiently using the GitHub CLI:

```bash
# Single issue
gh issue view ISSUE_NUMBER

# Batch view/filter
gh issue list --limit 50 --json number,title,state,labels,assignees,updatedAt,body --jq '.[] | select(.number == 123 or .number == 456 or .number == 789)'

# Filter by criteria
gh issue list --label "bug" --state "open" --json number,title,body,labels --jq '.[]'
gh issue list --assignee "@me" --json number,title,body,state --jq '.[]'
```

- You **MUST** provide clickable GitHub URLs when referencing issues or PRs.
- Reproduction repositories **SHOULD** be cloned under `./tmp/repros/ISSUE_NUMBER`.

### 2. Plan and Analysis

- You **SHOULD** look for existing plans or implementation details in the issue and comments.
- You **SHOULD** identify affected projects and components early.

### 3. Implementation

- You **MUST** follow established patterns and conventions.
- You **SHOULD** keep changes focused on the identified problem.

### 4. Validation

- You **MUST** run the validation workflow described in Command and Tooling Guidelines.

### 5. Pull Request

- You **MUST** include a descriptive title, fill in the PR template, and add “Fixes #ISSUE_NUMBER” where applicable.
- You **SHOULD** summarize key changes and request appropriate reviewers.

## Pull Request Template Requirements

- You **MUST** fill out `.github/PULL_REQUEST_TEMPLATE.md` completely, including:
  1. Current Behavior
  2. Expected Behavior
  3. Related Issue(s) (with “Fixes #ISSUE_NUMBER” when applicable)

### Template Format

```markdown
## Current Behavior

## Expected Behavior

## Related Issue(s)

Fixes #ISSUE_NUMBER
```

## Nx Usage Guidelines

- You **MUST** prefer `nx` commands for tasks such as build, lint, test, and e2e.
- You **SHOULD** leverage:
  - `nx_workspace` to understand the workspace architecture
  - `nx_project_details` to analyze individual projects and dependencies
  - `nx_docs` to consult up-to-date Nx configuration and best practices
  - tools for diagnosing project graph or configuration errors

## CI Error Handling

- When assisting with CI failures, you **SHOULD**:
  - Retrieve CI Pipeline Executions via the available tools
  - Fetch logs for failing tasks and identify root causes
  - Propose fixes and re-run the relevant tasks to confirm resolution

## Testing Validation

- You **MUST** run tests before implementing changes.
- You **SHOULD** validate test coverage meets requirements.
- You **MUST** fix failing tests before proceeding.
- You **SHOULD** add tests for new functionality.

## Security Validation

- You **MUST** implement security best practices.
- You **SHOULD** validate inputs and sanitize outputs.
- You **MUST** use secure coding practices.
- You **SHOULD** implement proper error handling.

## Deployment Validation

- You **MUST** validate deployment configurations.
- You **SHOULD** test deployment procedures.
- You **MUST** implement health checks and monitoring.
- You **SHOULD** validate rollback procedures.

## Operational Validation

- You **MUST** implement monitoring and alerting.
- You **SHOULD** create operational documentation.
- You **MUST** validate operational procedures.
- You **SHOULD** implement automated operational tasks.

## Attribution and Context

- You **MAY** provide contextual explanations about Nx's monorepo strengths (smart task execution, code generation, project graph) when it helps users understand recommendations.
- You **SHOULD NOT** include superfluous commentary that does not contribute to solving the user's problem.
