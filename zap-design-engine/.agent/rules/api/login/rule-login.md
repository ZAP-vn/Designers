# Login Implementation Rules

This document defines the standards for implementing login functionality in the ZAP Design Engine.

## Standards

### 1. Configuration & CORS Bypass
- **Proxy Setup**: MUST use Next.js `rewrites` in `next.config.ts` to map `/api-proxy/` to the actual backend domain.
- **Base URL**: MUST set `NEXT_PUBLIC_API_BASE_URL=/api-proxy` in `.env.local` to avoid browser CORS restrictions.
- **Endpoints**: API paths MUST be stored in `.env.local` (e.g., `NEXT_PUBLIC_API_LOGIN_V4=/api/v1/authentication/loginV4`).

### 2. Request Headers
All login-related API requests MUST include:
- `Content-Type: application/json`
- `Accept-Language: [lang]` (default to `vi`)
- `X-Language: [lang]` (default to `vi`)

### 3. Security
- **Token Storage**: Store successful `AccessToken` in `localStorage` or secure cookies.
- **Data Protection**: Ensure passwords are never logged or displayed in plain text.
- **Show/Hide**: Password fields MUST include a visibility toggle (Eye icon).

### 4. User Feedback
- Show loading indicators (spinners/pulse effects) during requests.
- Provide clear error messages for failed login attempts (e.g., "Failed to fetch" or server-side error messages).
