# Security Guidelines

This document defines comprehensive security practices and patterns for ensuring secure development, deployment, and operation of applications.

> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

## General Security Rules

- Applications **MUST** implement defense in depth security strategies.
- Applications **MUST** follow the principle of least privilege.
- Applications **SHOULD** implement security by design principles.
- Applications **MUST** undergo regular security assessments and penetration testing.

> **Related Guidelines**: See [applications.mdc](./applications.mdc) for application security requirements and [agents.mdc](./agents.mdc) for security validation requirements.

## Authentication and Authorization

### Authentication

- Applications **MUST** implement secure authentication mechanisms.
- Authentication **SHOULD** use industry-standard protocols (OAuth 2.0, OpenID Connect).
- Authentication **MUST** support multi-factor authentication (MFA).
- Authentication **SHOULD** implement session management and timeout policies.

### Authorization

- Applications **MUST** implement role-based access control (RBAC).
- Authorization **SHOULD** use attribute-based access control (ABAC) for complex scenarios.
- Authorization **MUST** validate permissions on every request.
- Authorization **SHOULD** implement principle of least privilege.

### Identity Management

- Identity management **MUST** integrate with enterprise identity providers.
- Identity management **SHOULD** support single sign-on (SSO).
- Identity management **MUST** implement account lifecycle management.
- Identity management **SHOULD** support audit trails for identity events.

## Data Protection

### Data Encryption

- Sensitive data **MUST** be encrypted at rest and in transit.
- Encryption **SHOULD** use industry-standard algorithms (AES-256, RSA-2048).
- Encryption **MUST** implement proper key management practices.
- Encryption **SHOULD** use hardware security modules (HSM) for key storage.

### Data Classification

- Data **MUST** be classified according to sensitivity levels.
- Data classification **SHOULD** drive access controls and protection measures.
- Data classification **MUST** be documented and maintained.
- Data classification **SHOULD** be automated where possible.

### Privacy Protection

- Applications **MUST** comply with privacy regulations (GDPR, CCPA).
- Privacy **SHOULD** implement data minimization principles.
- Privacy **MUST** provide data subject rights (access, rectification, erasure).
- Privacy **SHOULD** implement privacy by design principles.

#### GDPR Compliance Requirements

- **Data Processing Lawfulness**: Applications **MUST** document legal basis for data processing (consent, contract, legal obligation, vital interests, public task, legitimate interests)
- **Consent Management**: Applications **MUST** implement granular consent mechanisms with clear opt-in/opt-out options
- **Data Subject Rights**: Applications **MUST** provide automated systems for:
  - **Right of Access**: Data subjects can request copies of their personal data within 30 days
  - **Right of Rectification**: Data subjects can correct inaccurate personal data
  - **Right of Erasure**: Data subjects can request deletion of personal data ("right to be forgotten")
  - **Right to Portability**: Data subjects can export their data in machine-readable format
  - **Right to Restrict Processing**: Data subjects can limit how their data is processed
  - **Right to Object**: Data subjects can object to processing for marketing or legitimate interests
- **Data Protection Impact Assessment**: Applications **MUST** conduct DPIAs for high-risk processing activities
- **Data Breach Notification**: Applications **MUST** notify supervisory authority within 72 hours of data breaches
- **Privacy by Design**: Applications **MUST** implement privacy controls by default (data minimization, purpose limitation, storage limitation)

#### CCPA Compliance Requirements

- **Consumer Rights**: Applications **MUST** provide California residents with:
  - **Right to Know**: Information about personal information collected, used, and shared
  - **Right to Delete**: Deletion of personal information upon request
  - **Right to Opt-Out**: Opt-out of sale of personal information
  - **Right to Non-Discrimination**: Equal service regardless of privacy choices
- **Data Collection Transparency**: Applications **MUST** provide clear privacy notices explaining data collection practices
- **Third-Party Data Sharing**: Applications **MUST** disclose categories of personal information shared with third parties
- **Financial Incentives**: Applications **MUST** disclose any financial incentives offered for personal information

## API Security

### API Protection

- APIs **MUST** implement authentication and authorization.
- APIs **SHOULD** use HTTPS for all communications.
- APIs **MUST** implement rate limiting and throttling.
- APIs **SHOULD** use API gateways for centralized security.

### Input Validation

- All inputs **MUST** be validated and sanitized.
- Input validation **SHOULD** use whitelist approaches.
- Input validation **MUST** prevent injection attacks (SQL, NoSQL, XSS).
- Input validation **SHOULD** implement schema validation.

### Output Encoding

- All outputs **MUST** be properly encoded.
- Output encoding **SHOULD** prevent XSS and injection attacks.
- Output encoding **MUST** use context-appropriate encoding.
- Output encoding **SHOULD** be automated where possible.

## Infrastructure Security

### Container Security

- Containers **MUST** use minimal base images.
- Containers **SHOULD** run with non-root users.
- Containers **MUST** be scanned for vulnerabilities.
- Containers **SHOULD** use secrets management for sensitive data.

### Network Security

- Networks **MUST** implement network segmentation.
- Networks **SHOULD** use firewalls and intrusion detection systems.
- Networks **MUST** implement secure communication protocols.
- Networks **SHOULD** use VPNs for remote access.

### Cloud Security

- Cloud resources **MUST** follow cloud security best practices.
- Cloud security **SHOULD** use cloud-native security services.
- Cloud security **MUST** implement proper IAM policies.
- Cloud security **SHOULD** use infrastructure as code (IaC).

## Security Monitoring and Incident Response

### Security Monitoring

- Applications **MUST** implement comprehensive security monitoring.
- Security monitoring **SHOULD** use SIEM systems for centralized logging.
- Security monitoring **MUST** detect and alert on security events.
- Security monitoring **SHOULD** implement behavioral analytics.

### Incident Response

- Organizations **MUST** have incident response plans.
- Incident response **SHOULD** be tested regularly.
- Incident response **MUST** include communication procedures.
- Incident response **SHOULD** implement automated response capabilities.

### Vulnerability Management

- Applications **MUST** implement vulnerability scanning.
- Vulnerability management **SHOULD** use automated tools.
- Vulnerability management **MUST** prioritize and remediate vulnerabilities.
- Vulnerability management **SHOULD** implement patch management processes.

## Compliance and Governance

### Security Compliance

- Applications **MUST** comply with relevant security standards.
- Security compliance **SHOULD** be verified through audits.
- Security compliance **MUST** be documented and maintained.
- Security compliance **SHOULD** be automated where possible.

### Security Governance

- Organizations **MUST** implement security governance frameworks.
- Security governance **SHOULD** include security policies and procedures.
- Security governance **MUST** define roles and responsibilities.
- Security governance **SHOULD** include regular security training.

## Security Testing

### Security Testing Requirements

- Applications **MUST** undergo security testing before deployment.
- Security testing **SHOULD** include static and dynamic analysis.
- Security testing **MUST** include penetration testing.
- Security testing **SHOULD** be automated where possible.

### Security Test Types

- **Static Application Security Testing (SAST)**: Code analysis for vulnerabilities
- **Dynamic Application Security Testing (DAST)**: Runtime security testing
- **Interactive Application Security Testing (IAST)**: Real-time security analysis
- **Software Composition Analysis (SCA)**: Dependency vulnerability scanning
