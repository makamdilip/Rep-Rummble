# Security policy

## Supported versions

The current `main` branch and all active production releases are supported.

## Credential and secret management

- **Never commit `.env` files.** The `.gitignore` at the project root excludes all `.env`, `.env.local`, and `.env.*.local` files.
- **Never commit Firebase Admin SDK JSON keys.** The `.gitignore` excludes `*-firebase-adminsdk-*.json` and `*-service-account*.json`. Store these only as environment variables or secrets in your deployment platform (Vercel, Render, etc.).
- The Firebase client config (API key, auth domain, etc.) is safe to expose in `web/` — it is public by design and protected by Firebase Security Rules.
- The Supabase service-role key is **server-only**. It lives in `server/.env` and must never be used in the browser or committed.

## Reporting a vulnerability

Email the security contact at **makamdilip@outlook.com** with:

- Steps to reproduce
- Impact assessment
- Suggested remediation (if any)

We aim to acknowledge within 72 hours and provide status updates until the issue is resolved.
