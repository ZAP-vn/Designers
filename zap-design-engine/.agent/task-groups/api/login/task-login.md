# Login Implementation Tasks

This task group outlines the steps to implement the Login V4 functionality.

## Tasks

### 1. Project Infrastructure
- [ ] [LGN-001] Configure `rewrites` in `next.config.ts` for `/api-proxy/`
- [ ] [LGN-002] Set `NEXT_PUBLIC_API_BASE_URL=/api-proxy` in `.env.local`
- [ ] [LGN-003] Define `NEXT_PUBLIC_API_LOGIN_V4` in `.env.local`

### 2. Service Layer
- [ ] [LGN-004] Implement core `authService.ts` (GET, POST, PUT, DELETE)
- [ ] [LGN-005] Implement `login.service.ts` using the core service
- [ ] [LGN-006] Update `LoginResponse` interface to match API schema (MerchantName, Avatar, etc.)
- [ ] [LGN-007] Configure standardized headers (`X-Language`, `Accept-Language`)

### Phase 3: UI Implementation
- [ ] Create `LoginScreen.tsx` (or update existing one).
- [ ] Implement `StandardInput` for MerchantName, Email/User, and Password.
    - [ ] Add auto-filter for MerchantName: `value.toLowerCase().replace(/[^a-z0-9-]/g, '')`.
    - [ ] Add Email regex validation.
- [ ] Connect `Button` atom to the form.
- [ ] Implement `noValidate` on the form to use custom error messages.
- [ ] Add `useRef` for each input to handle auto-focus on validation failure.

### Phase 4: Logic & Error Handling
- [ ] Implement `handleSubmit` with `validate()` helper.
- [ ] Focus the first invalid field automatically using refs.
- [ ] Handle API errors using a `try/catch` block.
    - [ ] Extract `Message` (PascalCase) from error response.
    - [ ] Map server errors to specific field `errorText` where applicable.
- [ ] Connect `LoginScreen` to `loginApi.loginV4`
- [ ] [LGN-011] Store `AccessToken` in `localStorage` upon success
- [ ] [LGN-013] Implement redirect to dashboard/setup on successful login

### 5. Verification
- [ ] [LGN-014] Verify successful login with `admin@pho24.vn / backend3.0`
- [ ] [LGN-015] Verify API call goes through `/api-proxy/` in Network tab
- [ ] [LGN-016] Verify token injection in subsequent API calls
