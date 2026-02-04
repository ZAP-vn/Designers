# Customer Detail Implementation Tasks

This task group outlines the steps to implement the Customer Detail view.

## Tasks

### 1. Environment & API
- [ ] [CUST-001] Add `NEXT_PUBLIC_API_CUSTOMER_DETAIL` to `.env.local`
- [ ] [CUST-002] Implement `customer.service.ts` with `getCustomerDetail` function
- [ ] [CUST-003] Define `CustomerDetailResponse` interface with all 30+ fields

### 2. State & Hooks
- [ ] [CUST-004] Create `useCustomer` hook or update Zustand store to hold customer profile
- [ ] [CUST-005] Implement logic to fetch customer detail automatically after login using `UserGuid`

### 3. UI Development
- [ ] [CUST-006] Create `CustomerProfile` component
- [ ] [CUST-007] Map API fields to UI: `MerchantName`, `BusinessName`, `Email`, `FullName`
- [ ] [CUST-008] Implement loading skeleton for the profile view
- [ ] [CUST-009] Handle "Customer Not Found" or API error states

### 4. Verification
- [ ] [CUST-010] Verify API call with `_id=Customer/1` returns correct JSON
- [ ] [CUST-011] Check that `Bearer` token is correctly sent in the GET request
- [ ] [CUST-012] Verify responsive layout for profile information
