# Conventional Commit Guidelines

This document defines the rules and best practices for writing commit messages. It enforces consistency, readability, and tooling compatibility across the monorepo.

> The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## General Rules

- Commit messages **MUST** be prefixed with a type.
- The type **MUST** be a verb such as `feat`, `fix`, `docs`, `chore`, etc., followed by:
  - An optional scope in parentheses, e.g., `feat(parser)`.
  - An optional `!` to indicate a breaking change.
  - A required colon `:` and space.
- Commit messages **MUST** contain a short description immediately following the type/scope prefix.
- Commit messages **MAY** include a longer body, separated by one blank line from the short description.
- Commit messages **MAY** include one or more footers, separated by one blank line from the body.

## Types

- `feat` **MUST** be used for commits that add a new feature.
- `fix` **MUST** be used for commits that fix a bug.
- Other types (e.g., `docs`, `chore`, `refactor`) **MAY** be used as appropriate.

## Scope

- A scope **MAY** be provided to indicate the section of the codebase affected.
- A scope **MUST** consist of a verb describing a section of the codebase, surrounded by parentheses, e.g., `fix(parser)`.

## Description

- A short description **MUST** follow the colon and space.
- The description **SHOULD** be concise and descriptive of the change, e.g., `fix: array parsing issue`.

## Body

- A longer body **MAY** be included for additional context.
- The body **MUST** begin one blank line after the description.
- The body **CAN** include multiple newline-separated paragraphs.

## Footers

- Footers **MAY** be provided one blank line after the body.
- Each footer **MUST** consist of a token followed by either `:<space>` or `<space>#` and a string value.
- Footer tokens **MUST** replace whitespace with `-`, e.g., `Acked-by`.
- An exception is `BREAKING CHANGE`, which **MAY** also be used as a token.

## Breaking Changes

- Breaking changes **MUST** be indicated in either:
  - The type/scope prefix with `!`, or
  - A footer entry with `BREAKING CHANGE: description`.
- If `!` is used in the prefix, the footer **MAY** omit `BREAKING CHANGE`.
- Breaking change descriptions **SHALL** clearly explain the impact.

## Additional Rules

- Commit units (type, scope, description) **MUST NOT** be treated as case sensitive, except `BREAKING CHANGE` which **MUST** be uppercase.
- `BREAKING-CHANGE` **MUST** be treated as synonymous with `BREAKING CHANGE` when used as a footer token.
- Commit messages **SHOULD** be readable by humans and compatible with automation tools.
