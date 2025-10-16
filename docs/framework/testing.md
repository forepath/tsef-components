# Testing Guidelines

This document defines comprehensive testing strategies and patterns for ensuring code quality, reliability, and maintainability across all applications and libraries.

> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

## General Testing Rules

- Applications **MUST** maintain minimum 80% code coverage for production code.
- Applications **MUST** implement unit, integration, and end-to-end testing strategies.
- Applications **SHOULD** use test-driven development (TDD) for critical business logic.
- Applications **MUST** run all tests in CI/CD pipelines before deployment.

> **Related Guidelines**: See [applications.mdc](./applications.mdc) for application testing requirements and [agents.mdc](./agents.mdc) for testing validation requirements.

## Testing Pyramid

### Unit Tests (`type:unit`)

- Unit tests **MUST** test individual functions, methods, and components in isolation.
- Unit tests **SHOULD** use mocking for external dependencies.
- Unit tests **MUST** be fast (< 100ms per individual test) and deterministic.
- Unit tests **SHOULD** cover edge cases and error conditions.

### Integration Tests (`type:integration`)

- Integration tests **MUST** test component interactions within a single domain.
- Integration tests **SHOULD** use real dependencies where possible.
- Integration tests **MAY** use test databases and mock external services.
- Integration tests **SHOULD** verify data flow and state management.

### End-to-End Tests (`type:e2e`)

- E2E tests **MUST** test complete user workflows across multiple domains.
- E2E tests **SHOULD** use real browsers and test environments.
- E2E tests **MAY** use visual regression testing for UI components.
- E2E tests **SHOULD** cover critical user journeys and business processes.

## Frontend Testing Guidelines

### Component Testing

- Angular components **MUST** be tested using Angular Testing Utilities.
- Components **SHOULD** test rendering, user interactions, and state changes.
- Components **MUST** test accessibility compliance (WCAG 2.1 AA).
- Components **SHOULD** use Storybook for visual testing and documentation.

### State Management Testing

- State management **MUST** test actions, reducers, and selectors in isolation.
- State management **SHOULD** test state transitions and side effects.
- State management **MUST** test error handling and loading states.
- State management **SHOULD** use test utilities for complex state scenarios.

### Service Testing

- Services **MUST** test business logic and API interactions.
- Services **SHOULD** mock HTTP requests and external dependencies.
- Services **MUST** test error handling and retry mechanisms.
- Services **SHOULD** test caching and performance optimizations.

## Backend Testing Guidelines

### API Testing

- API endpoints **MUST** test request/response validation and business logic.
- API endpoints **SHOULD** test authentication and authorization.
- API endpoints **MUST** test error handling and status codes.
- API endpoints **SHOULD** test rate limiting and security measures.

### Database Testing

- Database operations **MUST** test CRUD operations and data integrity.
- Database operations **SHOULD** use test databases and transactions.
- Database operations **MUST** test migrations and schema changes.
- Database operations **SHOULD** test performance and query optimization.

### Domain Logic Testing

- Domain logic **MUST** test business rules and validation.
- Domain logic **SHOULD** test domain events and aggregates.
- Domain logic **MUST** test error handling and edge cases.
- Domain logic **SHOULD** use domain-specific test utilities.

## Testing Tools and Frameworks

### Frontend Testing Stack

- **Unit Testing**: Jest + Angular Testing Utilities
- **Component Testing**: Angular Testing Utilities + Testing Library
- **E2E Testing**: Playwright or Cypress
- **Visual Testing**: Storybook + Chromatic
- **Coverage**: Istanbul/nyc

### Backend Testing Stack

- **Unit Testing**: Jest + NestJS Testing Utilities
- **Integration Testing**: Supertest + Test Containers
- **E2E Testing**: Jest + Test Database
- **API Testing**: Supertest + OpenAPI Testing
- **Coverage**: Istanbul/nyc

## Test Organization and Structure

### Test File Organization

- Test files **MUST** mirror source file structure.
- Test files **SHOULD** use descriptive naming conventions.
- Test files **MUST** be placed in `__tests__` directories or `.test.ts` files.
- Test files **SHOULD** group related tests using `describe` blocks.

### Test Data Management

- Test data **MUST** be isolated and deterministic.
- Test data **SHOULD** use factories and builders for complex objects.
- Test data **MUST** clean up after each test.
- Test data **SHOULD** use realistic but anonymized data.

## Performance Testing

### Load Testing

- Applications **SHOULD** implement load testing for critical endpoints.
- Load tests **MUST** simulate realistic user scenarios.
- Load tests **SHOULD** measure response times and throughput.
- Load tests **MUST** identify performance bottlenecks.

### Stress Testing

- Applications **SHOULD** implement stress testing for system limits.
- Stress tests **MUST** test system behavior under extreme conditions.
- Stress tests **SHOULD** verify graceful degradation.
- Stress tests **MUST** test recovery mechanisms.

## Test Automation and CI/CD

### Continuous Integration

- All tests **MUST** run on every pull request.
- Test failures **MUST** block deployment.
- Test results **SHOULD** be reported and tracked.
- Test coverage **MUST** be monitored and maintained.

### Test Environment Management

- Test environments **MUST** mirror production configurations.
- Test environments **SHOULD** use containerization for consistency.
- Test environments **MUST** be isolated and secure.
- Test environments **SHOULD** support parallel test execution.
