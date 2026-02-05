---
description: Workflow for implementing Login V4 with environment variables and standardized headers using a CORS proxy.
---

# Login V4 Implementation Workflow

This workflow guides you through connecting the Login V4 API via a Next.js proxy to bypass CORS.

## Implementation Steps

### Step 1: `next.config.ts` Proxy Setup
Add rewrites to handle CORS by proxying requests through the local server:
```typescript
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: 'https://dev-crm-merchant-api.diadiem.vn/:path*',
      },
    ];
  },
};
```

### Step 2: `.env.local` Configuration
```env
NEXT_PUBLIC_API_BASE_URL=/api-proxy
NEXT_PUBLIC_API_LOGIN_V4=/api/v1/authentication/loginV4
```

### Step 3: Service Layer Structure

#### Core Service (`services/authService.ts`)
Handles generic requests and automatic token injection:
```typescript
export const authService = {
  post: async <T>(endpoint: string, body: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Language': 'vi',
        'Accept-Language': 'vi'
      },
      body: JSON.stringify(body),
    });
    return response.json();
  },
  // ... get, put, delete
};
```

#### Login Specific (`services/login/login.service.ts`)
Uses the core service to perform login:
```typescript
export const loginApi = {
  loginV4: async (payload: LoginRequest) => {
    const endpoint = process.env.NEXT_PUBLIC_API_LOGIN_V4;
    return await authService.post<LoginResponse>(endpoint, payload);
  }
};
```

### 4. Component Implementation
Use `StandardInput` for validation and consistent theming.

**A. Merchant Name Filtering**:
```tsx
const handleMerchantChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setMerchantName(value);
};
```

**B. Form Structure**:
- Use `noValidate` on the form.
- Use `useRef` for each input.
- Use the project's `Button` atom.

### 5. Validation & Auto-Focus
Focus the first field with an error:
```tsx
const validate = () => {
    const newErrors = {};
    let firstRef = null;
    if (!merchantName) { 
        newErrors.mName = 'Error'; 
        firstRef = merchantRef; 
    }
    setErrors(newErrors);
    if (firstRef?.current) firstRef.current.focus();
    return Object.keys(newErrors).length === 0;
};
```

### 6. API Error Extraction
Ensure `authService` handles PascalCase `Message`:
```tsx
const errorMessage = errorData.Message || errorData.message || 'Error occurred';
```

### Step 4: UI Integration (`LoginScreen.tsx`)
- Implement `MerchantName`, `UserName`, `Password` fields.
- Use `lucide-react` icons: `Building2`, `Mail`, `Lock`, `Eye`, `EyeOff`.

## Test Credentials
```json
{
  "MerchantName": "pho24",
  "UserName": "admin@pho24.vn",
  "Password": "backend3.0",
  "IsRemember": true
}
```

## Checklist
- [ ] Next.js `rewrites` configured in `next.config.ts`
- [ ] `NEXT_PUBLIC_API_BASE_URL` set to `/api-proxy`
- [ ] Headers include `X-Language` and `Accept-Language`
- [ ] `AccessToken` saved to `localStorage` on success
- [ ] Password field has show/hide toggle
