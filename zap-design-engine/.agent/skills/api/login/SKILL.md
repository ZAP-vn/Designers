---
name: login
description: Specialized skill for implementing and debugging login flows (specifically Login V4) with standardized headers and environment-driven configurations using a CORS proxy.
---

# Login Implementation Skill

This skill provides expert guidance for implementing the Login V4 authentication flow in the ZAP Design Engine.

## Core Concepts

- **Proxy-First Strategy**: Use Next.js `rewrites` to handle CORS. Always set `NEXT_PUBLIC_API_BASE_URL` to `/api-proxy`.
- **Layered Service Architecture**:
  - `authService.ts`: Core generic methods (GET, POST, etc.) with automatic token handling.
  - `login.service.ts`: Domain-specific service calling core methods.
- **Header Standardization**: Ensure `X-Language` and `Accept-Language` are present.

## Triggers

- When implementing or debugging "Login V4" or general authentication.
- When resolving "CORS" or "Failed to fetch" errors.
- When organizing API service layers.

## Procedural Workflow

1.  **Proxy Configuration**: Ensure `next.config.ts` has the correct `rewrites` destination.
2.  **Environment Check**: Verify `.env.local` uses the proxy path (`/api-proxy`).
3.  **Service Setup**: Implement the core `authService.ts` before creating domain-specific services.
4.  **UI Verification**: Test fields (Merchant, User, Password) and verify the `LoginResponse` model matches the API data.

## Reference Patterns

- See `rules/login/standard.md` for CORS and Header constraints.
- See `workflows/login/process.md` for step-by-step proxy and service setup.
- See `task-groups/login/implementation.md` for the full implementation checklist.
