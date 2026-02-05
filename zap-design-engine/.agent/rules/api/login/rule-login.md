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

### 3. Security & Validation
- **MerchantName Validation**: MUST be auto-filtered to lowercase alphanumeric and hyphens `[a-z0-9-]`. NO uppercase or special characters.
- **Email Validation**: MUST contain `@` and follow a valid email regex pattern. Cannot be empty.
- **Token Storage**: Store successful `AccessToken` in `localStorage` or secure cookies.
- **Data Protection**: Ensure passwords are never logged or displayed in plain text.
- **Show/Hide**: Password fields MUST include a visibility toggle (Eye icon).

### 4. UI Components & Feedback
- **Standard UI**: MUST use `StandardInput` for all form fields and the project's `Button` atom for submission.
- **Theming**: MUST inherit colors and fonts from the global `ThemeState`.
- **Validation Display**: Client-side errors MUST be displayed in red using the `errorText` prop of `StandardInput`.
- **Focus Order**: MUST automatically focus the first field with an error when submission fails validation.
- **API Errors**: Extract and display the `Message` (PascalCase) from failed API responses.
- **Loading State**: Show "Authenticating..." and disable the button during the request.
