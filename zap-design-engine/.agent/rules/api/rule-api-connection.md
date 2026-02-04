# API Connection Standards (GET, POST, PUT, DELETE)

This document defines the standard patterns for API interactions in this project.

## Implementation Guidelines

### 1. GET Request (Read)
Used for fetching data without side effects.
```javascript
const response = await fetch('/api/v1/resource', {
  method: 'GET',
  headers: { 'Accept': 'application/json' }
});
const data = await response.json();
```

### 2. POST Request (Create)
Used for creating new resources.
```javascript
const response = await fetch('/api/v1/resource', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New Item' })
});
const result = await response.json();
```

### 3. PUT Request (Update)
Used for updating existing resources.
```javascript
const response = await fetch('/api/v1/resource/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Updated Name' })
});
const result = await response.json();
```

### 4. DELETE Request (Remove)
Used for deleting resources.
```javascript
const response = await fetch('/api/v1/resource/123', {
  method: 'DELETE'
});
if (response.ok) {
  console.log('Deleted successfully');
}
```

## Error Handling
Always wrap API calls in try-catch blocks and handle non-OK responses.
```javascript
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network response was not ok');
  // ...
} catch (error) {
  console.error('API Error:', error);
}
```
