---
name: resource-mapping
description: Skill for handling CRM resource mapping APIs, managing centralized resource IDs, and populating reference data in UI components.
---

# Resource Mapping Skill

This skill provides expertise in interacting with the Resource Maps API and managing reference data.

## Core Concepts

- **ID Centralization**: All resource IDs (e.g., `CRMResourceMaps/257`) MUST be managed in a dedicated constant file.
- **Data Shape**: Always use the `POST` method with the wrapped `Data` array payload.
- **Reference Management**: Use resource maps to dynamically populate Select, Radio, and Checkbox options.

## Triggers

- When asked to "fetch dropdown data", "load business types", or "map resource IDs".
- When implementing forms that require dynamic configuration from the CRM.
- When debugging payload structure errors for `resourceMaps`.

## Reference Patterns

- **Rules**: `rules/api/resource-maps/rule-resource-maps.md`
- **Task Group**: `task-groups/api/resource-maps/task-resource-maps.md`
- **Workflow**: `workflows/api/resource-maps/workflow-resource-maps.md`
