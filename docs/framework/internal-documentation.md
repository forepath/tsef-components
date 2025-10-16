# Internal Documentation Guidelines

This document defines the rules and best practices for how you interact with documentation regarding internal documentation. It enforces consistency, reliability, and maintainability across all agent-driven tasks.

> The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## General Rules

- You **MAY** gather structured information on internal documentation using the `devkit_list_docs` and `devkit_get_doc` tools of the `devkit` mcp server
- You **SHALL PREFER** to interact with internal documentation / Markdown (`.md`) file placed in the root-level `docs/` directory using the `devkit` mcp server
- You **MUST** interact with these files using other tooling only if the preferred action cannot be performed through the `devkit` mcp server
  - It is **RECOMMENDED** to make use of built-in file read functionality (if available) in case no special tooling is provided.

## Tooling Hierarchy for Documentation

- For files in the `docs/` directory, this rule **TAKES PRECEDENCE** over the general tooling hierarchy defined in `agents.mdc`
- For documentation files outside the `docs/` directory, follow the general tooling hierarchy: `devkit` MCP → `nx` MCP → other MCP tools
- When `devkit` MCP tools are unavailable for `docs/` content, fall back to the general tooling hierarchy
