---
description: Workflow for retrieving customer details using the standardized authService and id parameters.
---

# Customer Detail Retrieval Workflow

This workflow guides you through implementing the "Get Customer Detail" feature.

## Implementation Steps

### Step 1: `.env.local` Setup
Ensure the endpoint path is configured:
```env
NEXT_PUBLIC_API_CUSTOMER_DETAIL=/api/v2/customer/detail
```

### Step 2: Service Implementation
Implementation in `services/customer/customer.service.ts`:
```typescript
export const customerApi = {
  getCustomerDetail: async (id: string) => {
    const endpoint = process.env.NEXT_PUBLIC_API_CUSTOMER_DETAIL;
    // Parameters are passed as query strings for GET requests
    return await authService.get<CustomerDetailResponse>(`${endpoint}?_id=${id}`);
  }
};
```

### Step 3: Component Integration
Example of fetching data in a React component:
```tsx
const loadCustomer = async () => {
  setIsLoading(true);
  try {
    const data = await customerApi.getCustomerDetail('Customer/1');
    setProfile(data);
  } catch (error) {
    console.error('Failed to load profile', error);
  } finally {
    setIsLoading(false);
  }
};
```

## Checklist
- [ ] Endpoint uses correct query parameter key (`_id`)
- [ ] `authService.get` is used to ensure Token injection
- [ ] UI handles fields like `FullName` (concatenation of FirstName + LastName if needed)
- [ ] Date strings (`StartedDate`, `CreateDate`) are formatted for display
