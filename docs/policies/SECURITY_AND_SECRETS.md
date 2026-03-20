# Security and Secrets Management Policy

Effective date: January 31, 2026
Owner: [TBD Security Owner]

This policy defines how we create, store, use, and rotate secrets and how we protect production systems.
It applies to all employees, contractors, and systems that handle Reprummble data.

## 1) Scope

This policy applies to:
- Source code repositories
- CI/CD pipelines
- Cloud and on-prem infrastructure
- Developer workstations
- Third-party integrations

## 2) Secret types

Secrets include (but are not limited to):
- API keys and tokens
- Database usernames and passwords
- Service account keys
- OAuth client secrets
- Encryption keys
- Session signing keys and JWT secrets

## 3) Storage rules

- Secrets must never be committed to Git.
- Secrets must be stored in approved secret stores or environment variables.
- Client-side apps (web/mobile) may only use public keys intended for exposure.
- Server-only keys must never appear in client code or public docs.

Approved storage locations:
- Vercel project environment variables (web)
- Oracle VM environment variables or `.env` on the VM (API)
- Supabase dashboard for auth configuration

## 4) Access control

- Access is granted on a least-privilege basis.
- Access is logged and reviewed at least quarterly.
- Admin access requires MFA.
- Shared accounts are prohibited.

## 5) Rotation and revocation

- Rotate secrets at least every 90 days or upon suspected compromise.
- If a secret is leaked, revoke it immediately and replace it.
- After rotation, verify all systems are using the new secret.

## 6) CI/CD and local development

- CI/CD uses dedicated environment-scoped secrets.
- Local development uses `.env` files that are git-ignored.
- Secrets must not be written to logs or error messages.

## 7) Incident response

If a secret is exposed:
1. Revoke the secret immediately.
2. Rotate dependent keys and credentials.
3. Audit access logs.
4. Notify security owner and stakeholders.
5. Record the incident and remediation steps.

## 8) Compliance and reviews

- This policy is reviewed at least annually.
- Violations may result in access removal and disciplinary action.

Contact: [TBD Security Email]

