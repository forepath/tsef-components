# Application Guidelines

This document defines the rules and best practices for structuring applications within the monorepo. It enforces consistency, scalability, and maintainability across all application types.

> The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

## General Rules

- Applications **MUST** be structured according to their scope (`frontend`, `backend`, `native`, `keycloak-theme`).
- Applications **MUST** follow the naming convention `{scope}-{name}`, e.g., `frontend-portal`, `backend-api`.
- Applications **MUST** depend only on libraries and shared resources allowed by the monorepo dependency rules.
- Applications **SHOULD** remain modular and leverage libraries instead of embedding large code blocks.
- Applications **MAY** include multiple sub-modules or feature modules as needed.

## Frontend Applications (`scope:frontend`)

- Frontend applications **MUST** contain Angular (or other chosen frontend framework) code only.
- Frontend applications **MUST NOT** contain backend logic.
- Frontend applications **SHOULD** rely on `ui`, `feature`, `util`, and `shared` libraries for functionality.
- Frontend applications **MAY** implement routing, state management, and SSR if needed.
- Frontend applications **SHOULD** integrate design system libraries consistently.

### State Management Guidelines

- Frontend applications **MUST** implement state management using a predictable, immutable pattern.
- Frontend applications **SHOULD** choose from these patterns based on complexity:
  - **Simple applications**: Angular Signals or RxJS BehaviorSubjects
  - **Medium complexity**: NgRx (Redux pattern for Angular)
  - **Complex applications**: Custom state management with clear patterns

> **Example**: For a simple todo app, use Angular Signals. For a complex e-commerce app, use NgRx with domain-based state organization.

- Frontend applications **MUST** maintain type safety throughout the state management layer using TypeScript.
- Frontend applications **MUST** organize state management within `data-access` libraries following the domain structure.
- Frontend applications **MUST** keep state management logic in `data-access` libraries, never in `ui` or `feature` libraries.
- Frontend applications **SHOULD** separate external communication (API calls) from state management within `data-access` libraries.
- Frontend applications **MUST** use domain-based state organization, where each domain has its own state slice.
- Frontend applications **SHOULD** implement cross-domain communication through shared state or event systems.
- Frontend applications **SHOULD** implement state management with the following structure:
  - **Actions**: Define all possible state changes as typed action creators
  - **Reducers**: Pure functions that handle state transitions based on actions
  - **Effects**: Handle side effects (API calls, routing, etc.) triggered by actions
  - **Selectors**: Pure functions for accessing and deriving state
- Frontend applications **MUST** implement proper error handling and loading states in the store.
- Frontend applications **SHOULD** use memoized selectors to prevent unnecessary re-renders and computations.
- Frontend applications **SHOULD** implement state persistence for critical application state when appropriate.
- Frontend applications **MUST** respect dependency boundaries when implementing state management across domains.

## Backend Applications (`scope:backend`)

- Backend applications **MUST** contain backend framework–specific code (e.g. NestJS).
- Backend applications **MUST NOT** depend on frontend or native libraries directly, **except via allowed shared libraries** (e.g., REST clients or cross-cutting integration utilities).
- Backend applications **SHOULD** centralize business logic in `data-access` and `feature` libraries.
- Backend applications **MAY** expose APIs, services, and workers.
- Backend applications **SHOULD** follow consistent security and authentication practices.

### Data Flow Guidelines

- Backend applications **MUST** implement data flow using a predictable, immutable pattern.
- Backend applications **SHOULD** choose from these patterns based on complexity:
  - **Simple applications**: Direct service-to-service communication with DTOs
  - **Medium complexity**: NestJS CQRS with Command/Query separation
  - **Complex applications**: Domain-Driven Design with Aggregate Roots and Domain Events

> **Example**: For a simple CRUD API, use direct service communication. For a complex microservices architecture, use Domain-Driven Design with event sourcing.

- Backend applications **MUST** maintain type safety throughout the data flow layer using TypeScript.
- Backend applications **MUST** organize data flow within `data-access` libraries following the domain structure.
- Backend applications **MUST** keep data flow logic in `data-access` libraries, never in `ui` or `feature` libraries.
- Backend applications **SHOULD** separate external communication (API calls, database access) from internal data flow within `data-access` libraries.
- Backend applications **MUST** use domain-based data organization, where each domain has its own data flow boundaries.
- Backend applications **SHOULD** implement cross-domain communication through event-driven architecture or shared contracts.
- Backend applications **SHOULD** implement data flow with the following structure:
  - **Commands**: Define all possible data changes as typed command handlers
  - **Queries**: Pure functions for accessing and deriving data
  - **Events**: Handle domain events triggered by data changes
  - **Aggregates**: Encapsulate business logic and data transformations
- Backend applications **MUST** implement proper error handling and validation in data flow.
- Backend applications **SHOULD** use optimistic locking for concurrent data updates.
- Backend applications **SHOULD** implement data persistence for critical application data when appropriate.
- Backend applications **MUST** respect dependency boundaries when implementing data flow across domains.
- Backend applications **SHOULD** implement audit trails for data changes in production environments.

### Microservices Architecture

- Backend applications **SHOULD** implement microservices architecture for complex, scalable systems.
- Microservices **MUST** be independently deployable and scalable.
- Microservices **SHOULD** follow domain-driven design principles.
- Microservices **MUST** implement service discovery and load balancing.
- Microservices **SHOULD** use API gateways for external communication.
- Microservices **MUST** implement circuit breakers and bulkhead patterns for fault tolerance.

### Event-Driven Architecture

- Backend applications **SHOULD** implement event-driven architecture for loose coupling.
- Event-driven systems **MUST** use message queues or event streaming platforms.
- Event-driven systems **SHOULD** implement event sourcing for audit trails.
- Event-driven systems **MUST** handle event ordering and idempotency.
- Event-driven systems **SHOULD** implement event replay capabilities for disaster recovery.

### Distributed Systems Patterns

- Backend applications **MUST** implement distributed tracing for request correlation.
- Distributed systems **SHOULD** use consistent hashing for data distribution.
- Distributed systems **MUST** implement leader election for coordination.
- Distributed systems **SHOULD** use consensus algorithms (Raft, Paxos) for consistency.
- Distributed systems **MUST** implement health checks and service mesh patterns.

## Device Native Applications (`scope:native`)

- Native applications **MUST** contain code targeting mobile/desktop frameworks (e.g. Capacitor).
- Native applications **MUST NOT** depend on frontend or backend libraries directly.
- Native applications **MAY** rely on shared libraries for cross-platform logic.
- Native applications **SHOULD** encapsulate platform-specific features and integrations.
- Native applications **SHOULD** follow platform UI/UX guidelines consistently.

## Keycloak Theme Applications (`scope:keycloak-theme`)

- Keycloak-theme applications **MUST** contain only frontend and email theme customizations for Keycloak.
- Keycloak-theme applications **MUST NOT** include business logic or backend code.
- Keycloak-theme applications **MAY** include custom styles, templates, and branding assets.
- Keycloak-theme applications **SHOULD** integrate with frontend applications for a consistent authentication experience.
- Keycloak-theme applications **MAY** be reused across multiple frontend applications in the monorepo.
- Keycloak-theme applications **MUST** depend only on `shared` libraries for styling and presentation.

## Dependency Guidelines

- Applications **MUST** depend only on allowed libraries for their scope.
- Applications **MUST NOT** directly depend on other applications.
- Applications **MAY** import from `shared` libraries for cross-cutting concerns.

## Build & Deployment

- Applications **SHOULD** include a clearly defined build process.
- Applications **SHOULD** be containerizable and deployable independently.
- Applications **MAY** leverage environment-specific configurations, provided they do not break dependency rules.

## Testing Requirements

- Applications **MUST** implement comprehensive testing strategies.
- Applications **SHOULD** maintain minimum 80% code coverage.
- Applications **MUST** include unit, integration, and end-to-end tests.
- Applications **SHOULD** use test-driven development for critical logic.

> **Related Guidelines**: See [testing.mdc](./testing.mdc) for detailed testing strategies and [agents.mdc](./agents.mdc) for testing validation requirements.

## Security Requirements

- Applications **MUST** implement security best practices.
- Applications **SHOULD** use authentication and authorization.
- Applications **MUST** validate and sanitize all inputs.
- Applications **SHOULD** implement security monitoring and logging.

> **Related Guidelines**: See [security.mdc](./security.mdc) for comprehensive security practices and [agents.mdc](./agents.mdc) for security validation requirements.

## Deployment Requirements

- Applications **MUST** be containerized and deployable.
- Applications **SHOULD** use infrastructure as code.
- Applications **MUST** implement health checks and monitoring.
- Applications **SHOULD** support automated deployment pipelines.

> **Related Guidelines**: See [deployment.mdc](./deployment.mdc) for comprehensive deployment strategies and [agents.mdc](./agents.mdc) for deployment validation requirements.

## Operational Requirements

- Applications **MUST** implement comprehensive monitoring.
- Applications **SHOULD** support 24/7 operations.
- Applications **MUST** have documented operational procedures.
- Applications **SHOULD** implement automated operational tasks.

> **Related Guidelines**: See [operations.mdc](./operations.mdc) for comprehensive operational practices and [agents.mdc](./agents.mdc) for operational validation requirements. Note: Deployment monitoring is covered in [deployment.mdc](./deployment.mdc), operational monitoring in [operations.mdc](./operations.mdc), and security monitoring in [security.mdc](./security.mdc).
