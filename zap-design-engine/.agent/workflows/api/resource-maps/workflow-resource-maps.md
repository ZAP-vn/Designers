---
description: Workflow for retrieving resource mapping data using standardized POST requests and centralized IDs.
---

# Resource Maps Workflow

This workflow guides you through implementing and using the Resource Maps API.

## Implementation Steps

### Step 1: Centralized IDs (`@/constants/resourceIds.ts`)
Define your resource IDs in a separate file:
```typescript
export const RESOURCE_IDS = {
  BUSINESS_TYPES: 'CRMResourceMaps/257',
  COUNTRIES: 'CRMResourceMaps/23',
  // ... more IDs
};
```

### Step 2: `.env.local` Setup
```env
NEXT_PUBLIC_API_RESOURCE_MAPS=/api/v1/resourceMaps
```

### Step 3: Service Implementation (`services/resource/resource.service.ts`)
```typescript
import { authService } from '../authService';

export const resourceApi = {
  getMaps: async (resourceIds: string[]) => {
    const endpoint = process.env.NEXT_PUBLIC_API_RESOURCE_MAPS;
    const payload = {
      Data: resourceIds.map(id => ({ _id: id, Filter: null }))
    };
    return await authService.post(endpoint, payload);
  }
};
```

### Step 4: Component Usage
```tsx
import { RESOURCE_IDS } from '@/constants/resourceIds';
import { resourceApi } from '@/services/resource/resource.service';

const fetchBusinessTypes = async () => {
  const maps = await resourceApi.getMaps([RESOURCE_IDS.BUSINESS_TYPES]);
  return maps;
};
```

## Checklist
- [ ] IDs are stored in `resourceIds.ts`
- [ ] Payload follows the `{"Data": [...]}` structure
- [ ] POST method is used despite being a data retrieval operation
- [ ] Results are mapped to UI component options (e.g. Select items)
