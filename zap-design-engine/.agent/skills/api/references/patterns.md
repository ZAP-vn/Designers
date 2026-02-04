# API Interaction Patterns

This reference provides standardized patterns for performing RESTful API operations in the ZAP Design Engine.

## Core Utility (Optional but Recommended)

It's often helpful to have a wrapper around `fetch` to handle common headers and error states.

```typescript
// @/lib/api-client.ts
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
}
```

## GET Request

Used to fetch data.

```typescript
const searchParams = new URLSearchParams({ category: 'design' });
const data = await apiFetch(`/api/v1/resources?${searchParams}`);
```

## POST Request

Used to create new resources.

```typescript
const newResource = await apiFetch('/api/v1/resources', {
  method: 'POST',
  body: JSON.stringify({ name: 'New Item' }),
});
```

## PUT Request

Used to update existing resources (full update).

```typescript
const updatedResource = await apiFetch('/api/v1/resources/123', {
  method: 'PUT',
  body: JSON.stringify({ name: 'Updated Name' }),
});
```

## DELETE Request

Used to remove resources.

```typescript
await apiFetch('/api/v1/resources/123', {
  method: 'DELETE',
});
```

## Error Handling Pattern

```typescript
try {
  const result = await apiFetch('/api/data');
  setData(result);
} catch (error) {
  console.error('Failed to fetch data:', error);
  setError(error instanceof Error ? error.message : 'Unknown error');
} finally {
  setLoading(false);
}
```
