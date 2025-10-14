# Monorepo Structure

Understanding the monorepo structure is essential for effective development. This guide explains how our code is organized and why we've chosen this structure.

## Overview

Our monorepo is organized around the principle of **domain-driven design** combined with **clear separation of concerns**. This structure enables:

- **Scalability** - Easy to add new features and teams
- **Maintainability** - Clear boundaries and responsibilities
- **Reusability** - Shared components and utilities
- **Consistency** - Standardized patterns across the codebase

## High-Level Structure

```
monorepo/
├── apps/                    # Applications (entry points)
│   ├── frontend-*          # Frontend applications
│   ├── backend-*           # Backend applications
│   ├── native-*            # Native applications
│   └── keycloak-*          # Keycloak theme applications
├── libs/                   # Libraries (reusable code)
│   ├── {domain}/           # Domain-specific libraries
│   └── shared/             # Cross-domain utilities
├── tools/                  # Development tools and scripts
├── docs/                   # Documentation
└── .cursor/               # AI agent configuration
```

## Applications (`apps/`)

Applications are the **entry points** of our system - the deployable units that users interact with.

### Application Types

**Frontend Applications (`frontend-*`)**

- Web applications built with Angular (or other frontend frameworks)
- Handle user interface and user interactions
- Depend on UI, feature, util, and shared libraries
- Examples: `frontend-portal`, `frontend-admin`

**Backend Applications (`backend-*`)**

- Server applications built with NestJS (or other backend frameworks)
- Handle business logic, APIs, and data processing
- Depend on data-access, feature, util, and shared libraries
- Examples: `backend-api`, `backend-worker`

**Native Applications (`native-*`)**

- Mobile/desktop applications built with Capacitor
- Handle platform-specific functionality
- Depend on shared libraries for cross-platform logic
- Examples: `native-mobile`, `native-desktop`

**Keycloak Theme Applications (`keycloak-*`)**

- Authentication theme customizations
- Handle login, registration, and email templates
- Depend only on shared libraries for styling
- Examples: `keycloak-corporate-theme`

### Application Naming Convention

Applications follow the pattern: `{scope}-{name}`

- **Scope** indicates the type (frontend, backend, native, keycloak)
- **Name** describes the application's purpose
- Examples: `frontend-portal`, `backend-api`, `native-mobile`

## Libraries (`libs/`)

Libraries contain **reusable code** that applications depend on. They're organized by domain and type.

### Library Structure

```
libs/
├── {domain}/               # Domain-specific libraries
│   ├── {domain}-frontend-feature-*     # Frontend feature libraries
│   ├── {domain}-frontend-data-access-* # Frontend data access
│   ├── {domain}-frontend-ui-*          # Frontend UI components
│   ├── {domain}-frontend-util-*        # Frontend utilities
│   ├── {domain}-backend-feature-*      # Backend feature libraries
│   ├── {domain}-backend-data-access-*  # Backend data access
│   └── {domain}-backend-util-*         # Backend utilities
└── shared/                # Cross-domain libraries
    ├── shared-util-*      # Shared utilities
    └── shared-ui-*        # Shared UI components
```

### Library Naming Convention

Libraries follow the pattern: `{domain}-{scope}-{type}-{name}`

- **Domain** - Business context (auth, users, payments, etc.)
- **Scope** - Technology scope (frontend, backend, native, keycloak-theme, shared)
- **Type** - Library purpose (feature, data-access, ui, util)
- **Name** - Specific functionality

Examples:

- `auth-frontend-feature-login` - Login feature for frontend
- `users-backend-data-access-api` - User data access for backend
- `shared-util-validation` - Shared validation utilities

## Domains

Domains represent **bounded business contexts** - areas of functionality that are related and can evolve independently.

### Domain Examples

**Authentication Domain (`auth`)**

- User login, logout, registration
- Password management, password reset
- Session management, token handling
- Multi-factor authentication

**User Management Domain (`users`)**

- User profiles, preferences
- User roles and permissions
- User search and management
- User activity tracking

**Payment Domain (`payments`)**

- Payment processing, billing
- Subscription management
- Invoice generation
- Payment history and reporting

### Domain Principles

- **Bounded Context** - Each domain has clear boundaries
- **Independent Evolution** - Domains can change without affecting others
- **Communication Through Shared** - Domains communicate via shared libraries
- **Business Alignment** - Domains mirror business structure

## Library Types

### Feature Libraries (`type:feature`)

**Purpose**: Implement application-specific business logic and orchestrate workflows.

**Characteristics**:

- Contain business logic and use cases
- Orchestrate state, workflows, and user interactions
- May contain UI components for internal use (not exported)
- Provide clear domain-level APIs (facades, orchestrators)

**Dependencies**: Can depend on data-access, ui, util, or other feature libraries from the same domain.

**Example**: `auth-frontend-feature-login` - Handles the complete login workflow.

### Data-Access Libraries (`type:data-access`)

**Purpose**: Handle external communication and manage data.

**Characteristics**:

- Handle API calls, database access, state management
- Single source of truth for domain-specific data structures
- Encapsulate caching, retry, and error-handling logic
- Define domain-specific models and DTOs
- **Never contain UI components**

**Dependencies**: Can depend only on util libraries or other data-access libraries from the same domain.

**Example**: `users-backend-data-access-database` - Handles all user database operations.

### UI Libraries (`type:ui`)

**Purpose**: Provide reusable, presentational components.

**Characteristics**:

- Contain purely presentational components
- **No business logic** - purely visual
- Stateless where possible
- Reusable across features and applications
- Follow the project's design system
- Include Storybook stories and documentation

**Dependencies**: Can depend only on util libraries or other ui libraries from the same domain.

**Example**: `shared-ui-button` - Reusable button component.

### Utility Libraries (`type:util`)

**Purpose**: Provide generic, reusable helpers and utilities.

**Characteristics**:

- Domain-agnostic (unless explicitly scoped)
- Pure functions and framework-agnostic logic
- Validation schemas, type definitions, formatting utilities
- **No business logic** - just helpful functions

**Dependencies**: Can depend only on other util libraries (domain-agnostic) or shared libraries.

**Example**: `shared-util-date-formatting` - Date formatting utilities.

## Dependency Rules

### General Principles

- **Applications** depend on libraries, never on other applications
- **Libraries** depend on other libraries, never on applications
- **Domains** don't directly depend on other domains
- **Shared libraries** are domain-agnostic and cross-cutting

### Dependency Flow

```
Applications
    ↓
Feature Libraries
    ↓
Data-Access Libraries
    ↓
Utility Libraries
    ↓
Shared Libraries
```

### Communication Patterns

**Within a Domain**:

- Feature → Data-Access → Util
- Feature → UI → Util
- Feature → Feature (same domain)

**Between Domains**:

- Through shared libraries only
- Using contracts and interfaces
- Event-driven communication
- API boundaries

## Scope Guidelines

### Frontend Scope (`scope:frontend`)

- Contains Angular (or other frontend framework) code
- **Never depends on backend libraries**
- Can depend on shared libraries
- Uses ui and feature libraries for composition

### Backend Scope (`scope:backend`)

- Contains NestJS (or other backend framework) code
- **Never depends on frontend libraries**
- Can depend on shared libraries
- Centralizes services in data-access libraries

### Native Scope (`scope:native`)

- Contains Capacitor or native API code
- **Never depends on frontend or backend libraries**
- Can depend on shared libraries
- Encapsulates platform-specific features

### Keycloak Theme Scope (`scope:keycloak-theme`)

- Contains frontend and email theme customizations
- **No business logic or backend code**
- Can depend only on shared libraries
- Reusable across multiple frontend applications

### Shared Scope (`scope:shared`)

- Contains domain-agnostic, cross-cutting code
- **Never imports from frontend or backend libraries**
- Framework-agnostic utilities and contracts
- Defines interfaces for inter-domain communication

## Benefits of This Structure

### For Developers

- **Clear boundaries** - Easy to understand what goes where
- **Focused development** - Work within well-defined areas
- **Reusable components** - Don't reinvent the wheel
- **Consistent patterns** - Same approach across the codebase

### For Teams

- **Parallel development** - Teams can work on different domains
- **Clear ownership** - Each domain has clear responsibilities
- **Reduced conflicts** - Well-defined boundaries prevent merge conflicts
- **Scalable growth** - Easy to add new domains and teams

### For the Business

- **Faster delivery** - Reusable components speed up development
- **Higher quality** - Consistent patterns and shared utilities
- **Easier maintenance** - Clear structure makes changes predictable
- **Better testing** - Isolated components are easier to test

## Best Practices

### When Creating New Libraries

1. **Choose the right domain** - Does it fit an existing domain or need a new one?
2. **Select the appropriate type** - Feature, data-access, ui, or util?
3. **Follow naming conventions** - Use the established pattern
4. **Consider dependencies** - What does it need to depend on?
5. **Plan for reusability** - Will others need this functionality?

### When Organizing Code

1. **Keep domains focused** - Each domain should have a clear purpose
2. **Minimize cross-domain dependencies** - Use shared libraries for common needs
3. **Maximize reusability** - Put common functionality in shared libraries
4. **Maintain clear boundaries** - Don't mix concerns between library types

## Next Steps

Now that you understand the monorepo structure:

1. **[Review best practices](../best-practices/)** - Proven approaches for common scenarios
2. **[Explore development workflows](../development-workflows/)** - Learn how to work effectively
3. **[Check out the tools](../tools/)** - Understand the development tooling

---

Remember: The monorepo structure is designed to scale with your team and business. Use it to create clear, maintainable, and reusable code that serves your users well.
