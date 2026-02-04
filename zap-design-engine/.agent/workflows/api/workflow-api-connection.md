---
description: Workflow for connecting to a new API endpoint, with a focus on authentication.
---

# API Connection Workflow

Follow these steps to connect to a new API endpoint.

## Example: Login V4
**Endpoint**: `https://dev-crm-merchant-api.diadiem.vn/api/v1/authentication/loginV4`
**Method**: `POST`

### Step 1: Define Types
Create or add to your types file (e.g., `types/auth.ts`):

```typescript
export interface LoginRequest {
  username: string;
  password: string;
  merchantCode?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userInfo: {
    id: string;
    fullName: string;
    email: string;
  };
}
```

### Step 2: Implement Service Function
In your service file (e.g., `services/auth.service.ts`):

```typescript
const BASE_URL = 'https://dev-crm-merchant-api.diadiem.vn/api/v1';

export const loginV4 = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/authentication/loginV4`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Login failed');
  }

  return response.json();
};
```

### Step 3: Usage in Component/State
Using Zustand for state management:

```typescript
import { create } from 'zustand';
import { loginV4 } from '@/services/auth.service';

interface AuthState {
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginV4(credentials);
      // Save tokens to cookies/localStorage
      // Update user state
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
```

## Generic implementation checklist
1.  **Check Headers**: Does the API require a Bearer token or specific custom headers?
2.  **Verify Payload**: Match the exact JSON structure required by the backend.
3.  **Handle Status Codes**:
    - `200/201`: Success.
    - `400`: Validation error.
    - `401/403`: Auth error.
    - `500`: Server error.
