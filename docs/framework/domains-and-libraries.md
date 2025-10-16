# Domain and Library Guidelines

This document defines the rules and best practices for structuring domains and libraries within the monorepo. It enforces consistency, scalability, and maintainability across applications.

> The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## Domain Rules

- Domains **MUST** represent a bounded business context (e.g., auth, users, payments).
- Domains **SHOULD** group related feature, data-access, ui, and util libraries.
- Domains **SHOULD** mirror the structure of the business or product.
- Domains **MUST NOT** cross-reference other domains directly (inter-domain communication goes through shared).
- Domains **CAN** evolve independently as long as it respects dependency boundaries.

## Library Rules

- Libraries **MUST** follow the naming convention `{domain}-{scope}-{type}-{name}`.
- Libraries **MUST** declare a domain, scope (`frontend`, `backend`, `native`, `keycloak-theme`, `shared`) and type (`feature`, `data-access`, `ui`, `util`).
- Libraries **MUST** respect dependency rules enforced by `@nx/enforce-module-boundaries`.
- Libraries **MUST NOT** directly depend on applications (`type:app`).
- Libraries **SHOULD** remain small and focused (single responsibility principle).
- Libraries **CAN** be combined if the business case requires tight cohesion.

### Feature Libraries (`type:feature`)

- Feature libraries **SHOULD** implement application-specific business logic.
- Feature libraries **SHOULD** orchestrate state, workflows, or use-cases.
- Feature libraries **MAY** contain standalone Angular UI components for internal use within the feature.
- Feature libraries **MUST NOT** export UI components for external reuse; use dedicated `ui` libraries for reusable standalone Angular components.
- Feature libraries **SHOULD** provide clear domain-level APIs (facades, orchestrators).
- Feature libraries **MUST** depend only on `data-access`, `ui`, `util`, or other `feature` libraries from the same domain.

### Data-Access Libraries (`type:data-access`)

- Data-Access libraries **SHOULD** handle external communication (API calls, database access, state management).
- Data-Access libraries **MUST** be the single source of truth for domain-specific data structures.
- Data-Access libraries **MUST NOT** contain UI components.
- Data-Access libraries **CAN** expose services, repositories, or facades for use by feature libraries.
- Data-Access libraries **SHOULD** encapsulate caching, retry, and error-handling logic.
- Data-Access libraries **CAN** define domain-specific models and DTOs.
- Data-Access libraries **MUST** depend only on `util` libraries or other `data-access` libraries from the same domain.

### UI Libraries (`type:ui`)

- UI libraries **MUST** contain purely presentational standalone Angular components.
- UI libraries **MUST NOT** contain business logic.
- UI libraries **MUST** be stateless where possible.
- UI libraries **MUST** be reusable across features and applications.
- UI libraries **SHOULD** follow the project's chosen design system.
- UI libraries **CAN** include Storybook stories, visual tests, and documentation.
- UI libraries **MUST** depend only on `util` libraries or other `ui` libraries from the same domain.

### Utility Libraries (`type:util`)

- Utility libraries **SHOULD** provide generic, reusable helpers or types.
- Utility libraries **MUST** be domain-agnostic unless explicitly scoped.
- Utility libraries **SHOULD** include pure functions and framework-agnostic logic.
- Utility libraries **CAN** include validation schemas, type definitions, or date/number formatting utilities.
- Utility libraries **MUST** depend only on other `util` libraries (domain-agnostic) or `shared` libraries.

## Scope Rules

### Frontend (`scope:frontend`)

- Frontend libraries **MUST** contain only frontend framework–specific code (e.g. Angular).
- Frontend libraries **MUST NOT** depend on `backend` libraries.
- Frontend libraries **MUST** be allowed to depend on `shared` libraries.
- Frontend libraries **SHOULD** use `ui` and `feature` libraries for composition.

### Backend (`scope:backend`)

- Backend libraries **MUST** contain only backend framework–specific code (e.g. NestJS).
- Backend libraries **MUST NOT** depend on `frontend` libraries.
- Backend libraries **MUST** be allowed to depend on `shared` libraries.
- Backend libraries **SHOULD** centralize domain-specific services in `data-access` libraries.

### Device native (`scope:native`)

- Device native libraries **MUST** contain only code targeting Capacitor or native APIs.
- Device native libraries **MUST NOT** depend on `backend` or `frontend`.
- Device native libraries **MUST** be allowed to depend on `shared` libraries.

### Keycloak Theme (`scope:keycloak-theme`)

- Keycloak-theme libraries **MUST** contain only frontend and email theme customizations for Keycloak.
- Keycloak-theme libraries **MUST NOT** include business logic or backend code.
- Keycloak-theme libraries **MAY** include custom styles, templates, and branding assets.
- Keycloak-theme libraries **SHOULD** integrate with frontend applications for a consistent authentication experience.
- Keycloak-theme libraries **MAY** be reused across multiple frontend applications in the monorepo.
- Keycloak-theme libraries **MUST** depend only on `shared` libraries for styling and presentation utilities.

### Shared (`scope:shared`)

- Shared libraries **MUST** contain only domain-agnostic, cross-cutting code.
- Shared libraries **MUST NOT** import from `frontend` or `backend` libraries.
- Shared libraries **MUST** contain utilities, DTOs, validation schemas, or design system code reused across scopes.
- Shared libraries **SHOULD** be framework-agnostic.
- Shared libraries **CAN** define strongly typed contracts for frontend and/or backend communication.

## Dependency Rules - Exceptions and Clarifications

### Shared Library Dependencies
- Shared libraries **MUST NOT** depend on domain-specific libraries to maintain their domain-agnostic nature
- If shared functionality requires domain-specific logic, **SHOULD** use dependency injection, interfaces, or callback patterns instead of direct dependencies
- Shared libraries **MAY** define contracts (interfaces, types, DTOs) that domain libraries implement, but **MUST NOT** import domain-specific implementations

### Inter-Domain Communication Patterns
- When domains need to communicate, they **MUST** use one of these patterns:
  1. **Shared contracts** - Define interfaces in shared libraries, implement in domain libraries
  2. **Event-driven communication** - Use shared event systems for loose coupling
  3. **API boundaries** - Expose domain functionality through shared API contracts
- Direct domain-to-domain dependencies **MUST NOT** be created, even through shared libraries

### Circular Dependency Prevention
- If a circular dependency is detected, **MUST** refactor using one of these approaches:
  1. **Extract shared functionality** - Move common logic to a shared library
  2. **Dependency inversion** - Use interfaces/contracts instead of concrete implementations
  3. **Event-driven architecture** - Replace direct calls with events/messages
  4. **API boundaries** - Create clear service boundaries with defined contracts
