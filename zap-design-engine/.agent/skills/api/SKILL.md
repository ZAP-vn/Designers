---
name: api-connectivity
description: Guide for standardizing API connections (GET, POST, PUT, DELETE) in Next.js/React projects. Use when building data-driven components or implementing service layers.
---

# API Connectivity Skill

This skill provides standardized workflows and code patterns for interacting with REST APIs within the ZAP Design Engine.

## Quick Start

1.  **GET**: Fetch data using `fetch` or the recommended `apiFetch` wrapper.
2.  **POST**: Create resources by sending JSON payloads.
3.  **PUT**: Update resources with full state replacements.
4.  **DELETE**: Remove resources by ID.

## Core Patterns

- Use `references/patterns.md` for copy-pasteable implementation examples.
- Ensure all API calls handle loading and error states gracefully.
- Prefer centralized service files (e.g., `@/services/api.ts`) to manage endpoints.

## Procedural Workflow

When adding a new API connection:

1.  **Define Types**: Create TypeScript interfaces for the request and response data.
2.  **Implement Service**: Add a function to the appropriate service file.
3.  **Integrate with UI**: Call the service from a component or custom hook.
4.  **Handle State**: Use state management (Zustand, React State) to track loading and errors.

## Advanced Usage

For complex scenarios involving multi-step data transformations or specific ZAP Design System integration, consult the project's architecture documents.
