# Customer Management Rules

This document defines the standards for handling customer data in the ZAP Design Engine.

## Standards

### 1. Data Fetching
- **Authentication**: All customer API calls MUST include a valid `Authorization: Bearer [token]` header (handled automatically by `authService`).
- **Endpoint Configuration**: Use `NEXT_PUBLIC_API_CUSTOMER_DETAIL` from `.env.local`.
- **Query Parameters**: Customer IDs MUST be properly URL-encoded when passed as query parameters (e.g., `_id=Customer%2F1`).

### 2. Response Handling
- **Type Safety**: Use the `CustomerDetailResponse` interface to ensure type safety.
- **Sensitive Data**: Avoid displaying sensitive fields like `PublicKey` or `Password` in the UI unless explicitly required for administrative purposes.
- **Avatar Display**: Use the `Url` field for the user profile image. If the path is relative, prefix it with the appropriate media base URL.

### 3. State Management
- Fetched customer data should be stored in the global store (Zustand) if needed across multiple screens.
- Implement caching or "freshness" checks to avoid redundant API calls for the same customer ID.
