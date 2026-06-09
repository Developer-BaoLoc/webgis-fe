# App Module

Next.js App Router pages and root layout.

## Purpose

Define routes, global providers, and page-level composition (auth gate + map).

## Files

| File | Route | Description |
|------|-------|-------------|
| `layout.tsx` | — | Root layout; wraps all pages in `AuthProvider` |
| `page.tsx` | `/` | Home — protected map view |
| `login/page.tsx` | `/login` | Login form |
| `globals.css` | — | Global styles including login page |

## Routes

### `/` (home)

Renders `ProtectedRoute` → `Map` (dynamic Leaflet map, SSR disabled).

Unauthenticated users are redirected to `/login` by `ProtectedRoute`.

### `/login`

Public login page. On success:

1. Stores `accessToken` in `localStorage`
2. Calls `refreshUser()` from `AuthContext`
3. Redirects to `/`

## Layout

`layout.tsx` applies Geist fonts and mounts `AuthProvider` so auth state is available on every page.

## Dependencies

- `@/components/Map` — map shell
- `@/components/auth/ProtectedRoute` — auth gate
- `@/context/AuthContext` — global auth provider
- `@/lib/api` — login endpoint URL (login page)

## Related modules

- [components/auth/README.md](../components/auth/README.md)
- [components/map/README.md](../components/map/README.md)
- [context/README.md](../context/README.md)
