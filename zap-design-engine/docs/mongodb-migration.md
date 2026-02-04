# MongoDB Integration & Storage Strategy

## Overview

The ZAP Design Engine is moving towards a hybrid storage model. For local development and testing, we rely on `localStorage`. For production and cloud-based collaboration, we will integrate with **MongoDB** via a dedicated API endpoint.

## Storage Tiers

### Tier 1: Local testing

- **Technology**: `localStorage` (Zustand Persist)
- **Usage**: Sandbox testing and rapid prototyping.
- **Data Persistence**: Transient to the browser session.

### Tier 2: Cloud Sync (MongoDB)

- **Technology**: MongoDB Atlas / API Endpoint
- **Role**: Centralized source of truth for design tokens, docs, and project configurations.
- **Integration Status**: **Pending Setup**
- **Process Owners**: Vuong and Linh are currently defining the MCP and API protocols.

## Implementation Roadmap (Transition)

1. **Current**: Pure `localStorage` usage.
2. **Phase 2a**: Design MongoDB schemas (BSON/JSON) matching our current `types.ts`.
3. **Phase 2b**: Implement Next.js Route Handlers to proxy requests to the MongoDB API.
4. **Phase 2c**: Update `store.ts` to support conditional sync (Local vs. Cloud).

> [!NOTE]
> Do not modify the core storage logic in `store.ts` until Vuong and Linh formalize the API specifications.
