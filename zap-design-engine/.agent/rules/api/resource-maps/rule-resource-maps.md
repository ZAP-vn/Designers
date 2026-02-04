# Resource Maps Rules

This document defines the standards for handling resource mapping data in the ZAP Design Engine.

## Standards

### 1. Endpoint Configuration
- **Base URL**: MUST use `/api-proxy` as defined in `.env.local`.
- **Endpoint**: MUST use `NEXT_PUBLIC_API_RESOURCE_MAPS` (e.g., `/api/v1/resourceMaps`).

### 2. Request Specification
- **Method**: `POST`
- **Body Structure**: MUST follow the standardized `Data` array format:
  ```json
  {
    "Data": [{ "_id": "CRMResourceMaps/...", "Filter": null }]
  }
  ```
- **IDs**: Resource IDs MUST be stored in a centralized constant file (e.g., `@/constants/resourceIds.ts`) and never hardcoded in components.

### 3. Usage
- Resource maps are primarily used for populating dropdowns and reference data.
- Ensure efficient loading by batching IDs if the API supports it.
