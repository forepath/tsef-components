# Software Development Principals

This document defines the rules and best practices for general software development. It enforces consistency, reliability, and maintainability across all agent-driven tasks.

> The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## General Rules

> When trade-offs are necessary, prioritize principles in this order: KISS first, then maintainability and readability, then testability.

### Conflict Resolution Guidelines

- **KISS vs. Analysis**: When analysis requirements conflict with simplicity, you **MUST** prioritize analysis for critical systems, security, and compliance requirements
- **Testing vs. Performance**: When testing requirements conflict with performance, you **MUST** prioritize testing for production systems, but **MAY** optimize performance for non-critical paths
- **Security vs. Usability**: When security requirements conflict with usability, you **MUST** prioritize security while **SHOULD** implement user-friendly alternatives
- **Coverage vs. Speed**: When test coverage conflicts with development speed, you **MUST** maintain minimum coverage requirements but **MAY** optimize test execution speed

### Simplicity
- You **MUST** follow the **KISS (Keep It Simple, Stupid)** principle: solutions should be as simple as possible while still meeting requirements. Avoid unnecessary complexity.
- You **MUST** avoid premature optimization unless performance issues are proven or critical.
- You **SHOULD** adhere to **YAGNI (You Aren’t Gonna Need It)**: do not implement features or abstractions until they are actually required.

### Code Reuse and Modularity
- You **SHOULD** apply **DRY (Don’t Repeat Yourself)**: eliminate duplicated code or logic by creating reusable functions, modules, or components.
- You **SHOULD** design code that is modular, readable, maintainable, and self-documenting. Favor clear structure and meaningful names over clever but opaque solutions.

### Readability and Conventions
- You **SHOULD** prefer consistent coding conventions and style guides across the codebase.
- You **MAY** add comments or documentation for complex logic that cannot be simplified or made self-explanatory.

### Testability and Refactoring
- You **SHOULD** write code with testability in mind, enabling unit tests or automated checks where appropriate.
- You **SHOULD** refactor code iteratively to maintain clarity, simplicity, and maintainability.
