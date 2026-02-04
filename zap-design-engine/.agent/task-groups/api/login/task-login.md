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

### 3. UI Development
- [ ] [LGN-008] Implement `LoginScreen.tsx` with `MerchantName`, `UserName`, and `Password`
- [ ] [LGN-009] Add Password Show/Hide toggle (Eye icons)
- [ ] [LGN-010] Add loading feedback and error message display

### 4. Integration & State
- [ ] [LGN-011] Store `AccessToken` in `localStorage` upon success
- [ ] [LGN-012] Connect `LoginScreen` to `loginApi.loginV4`
- [ ] [LGN-013] Implement redirect to dashboard/setup on successful login

### 5. Verification
- [ ] [LGN-014] Verify successful login with `admin@pho24.vn / backend3.0`
- [ ] [LGN-015] Verify API call goes through `/api-proxy/` in Network tab
- [ ] [LGN-016] Verify token injection in subsequent API calls
