# Context Module

Global React context for authentication state.

## Purpose

Provide a single source of truth for the logged-in user across all client components, with token validation on app load.

## Files

| File | Description |
|------|-------------|
| `AuthContext.tsx` | `AuthProvider` + `useAuth()` hook |

## `AuthProvider`

Mounted in `app/layout.tsx`, wrapping the entire app.

### State

| Field | Type | Description |
|-------|------|-------------|
| `user` | `{ userId, email, role } \| null` | From JWT validation |
| `loading` | `boolean` | `true` until initial token check completes |

### Methods

| Method | Description |
|--------|-------------|
| `logout()` | Removes `accessToken` from `localStorage`, clears user, navigates to `/login` |
| `refreshUser()` | Re-fetches `GET /users/me` with stored token |

### Boot sequence

1. Read `accessToken` from `localStorage`
2. If missing → `user = null`, `loading = false`
3. If present → `GET /users/me` with `Authorization: Bearer <token>`
4. On success → set `user` from response (`userId`, `email`, `role`)
5. On failure → remove token, `user = null`

## `useAuth()`

```typescript
const { user, loading, logout, refreshUser } = useAuth();
```

Used by:

- `components/auth/ProtectedRoute.tsx`
- `components/auth/UserPanel.tsx`
- `components/LeafletMap.tsx`
- `app/login/page.tsx` (`refreshUser` after login)

## Token storage

Key: `accessToken` in `localStorage`.

Set by `app/login/page.tsx` after `POST /auth/login`. Cleared on logout or failed `/users/me`.

## Backend contract

`GET /users/me` returns the JWT payload shape from `JwtStrategy.validate()`:

```json
{ "userId": 1, "email": "...", "role": "ADMIN" }
```

See [webgis-api/src/modules/auth/README.md](../../webgis-api/src/modules/auth/README.md).
