# WebGIS Client

Next.js frontend that renders an interactive Leaflet map with ward, road, and river layers. Authentication is required to access the map.

## Modules

| Module | Path | README |
|--------|------|--------|
| Routes | `app/` | [README](app/README.md) |
| Auth UI | `components/auth/` | [README](components/auth/README.md) |
| Map | `components/map/` | [README](components/map/README.md) |
| Auth state | `context/` | [README](context/README.md) |
| API URLs | `lib/` | [README](lib/README.md) |

Top-level map shell: `components/Map.tsx` (dynamic import of `LeafletMap.tsx` with SSR disabled).

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend base URL (e.g. `http://localhost:3001`) |

## Setup

```bash
npm install
npm run dev    # http://localhost:3000
```

## User flow

1. Unauthenticated visitors are redirected to `/login`.
2. After login, the JWT is stored in `localStorage` as `accessToken`.
3. The home page (`/`) renders the map inside `ProtectedRoute`.
4. `AuthProvider` (in root layout) validates the token via `GET /users/me` on load.

## Key dependencies

- `react-leaflet` / `leaflet` — map rendering
- Next.js App Router — routing and layout

## Related docs

- Backend API: [docs/api.md](../docs/api.md)
- Architecture: [docs/architecture.md](../docs/architecture.md)
