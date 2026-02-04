# Resource Maps Implementation Tasks

This task group outlines the steps to implement the Resource Mapping API.

## Tasks

### 1. Infrastructure & Service
- [ ] [RES-001] Add `NEXT_PUBLIC_API_RESOURCE_MAPS` to `.env.local`
- [ ] [RES-002] Create `@/constants/resourceIds.ts` to store Resource IDs
- [ ] [RES-003] Implement `resource.service.ts` using `authService.post`

### 2. UI & Logic
- [ ] [RES-004] Create a generic hook `useResourceMaps` to fetch mapping data
- [ ] [RES-005] Implement caching logic to avoid redundant POST requests for the same maps
- [ ] [RES-006] Integrate resource data into dropdowns/select components

### 3. Verification
- [ ] [RES-007] Verify POST request payload matches the required `{"Data": [...]}` format
- [ ] [RES-008] Check that Header `X-Language: vi` is correctly sent
- [ ] [RES-009] Verify the API returns valid mapping data for `CRMResourceMaps/257`
