# Lib Module

Shared utilities and API endpoint configuration.

## Purpose

Centralize backend URL construction so hooks and pages do not hardcode the API base URL.

## Files

| File | Description |
|------|-------------|
| `api.ts` | Endpoint URL helpers |

## `api.ts`

Reads `process.env.NEXT_PUBLIC_API_URL` at build/runtime.

### Exported URLs

| Key | Endpoint | Used by |
|-----|----------|---------|
| `api.wards` | `GET /wards` | `useMapData` |
| `api.roads` | `GET /roads` | `useMapData` |
| `api.rivers` | `GET /rivers` | `useMapData` |
| `api.login` | `POST /auth/login` | `app/login/page.tsx` |
| `api.me` | `GET /users/me` | `AuthContext` |
| `api.currentWard(lat, lng)` | `GET /wards/current?lat=&lng=` | `useCurrentLocation` |

### Example

```typescript
import { api } from '@/lib/api';

const res = await fetch(api.wards);
const geojson = await res.json();
```

## Configuration

Set in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Must match the running [webgis-api](../../webgis-api/README.md) instance.

## Related docs

- [docs/api.md](../../docs/api.md) — full endpoint reference
- [context/README.md](../context/README.md) — auth requests using `api.me`
