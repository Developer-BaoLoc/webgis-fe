# Auth UI Module

Client-side authentication gate and logged-in user display.

## Purpose

- Redirect unauthenticated users away from protected pages
- Show current user email, role, and logout button on the map

## Files

| File | Description |
|------|-------------|
| `ProtectedRoute.tsx` | Wraps children; redirects to `/login` if no user |
| `UserPanel.tsx` | Floating panel with email, role, logout button |

## `ProtectedRoute`

Used on the home page (`app/page.tsx`).

Behavior:

1. Reads `user` and `loading` from `useAuth()`
2. While `loading`, shows `"Loading..."`
3. When loaded with no user, redirects to `/login` and renders nothing
4. When authenticated, renders children

## `UserPanel`

Rendered inside `LeafletMap` (top-left overlay). Hidden when `user` is null.

Displays:

- User email
- Role (`ADMIN` / `USER`)
- Logout button → clears `accessToken`, redirects to `/login`

## State source

All auth state comes from [context/AuthContext.tsx](../../context/AuthContext.tsx). These components do not call the API directly except indirectly via context.

## Backend endpoints used (via context / login page)

| Endpoint | Used by |
|----------|---------|
| `POST /auth/login` | `app/login/page.tsx` |
| `GET /users/me` | `AuthContext` on mount |

See [webgis-api/src/modules/auth/README.md](../../../webgis-api/src/modules/auth/README.md).
