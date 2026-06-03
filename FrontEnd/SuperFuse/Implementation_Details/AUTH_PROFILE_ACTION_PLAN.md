# Auth And Profile Action Plan

## Current Implementation Status

Auth/Profile is a minimal frontend identity shell with login/signup/profile components and app-level token-based login state.

## Immediate Actions

1. Connect login and signup forms to backend auth APIs.
2. Add token storage and refresh strategy.
3. Add logout flow.
4. Add protected-route handling.
5. Add profile API integration.
6. Add validation and error states.

## Backend APIs Needed

| API | Purpose |
|---|---|
| `POST /auth/signup` | Create customer account |
| `POST /auth/login` | Authenticate customer |
| `POST /auth/logout` | End session |
| `POST /auth/refresh` | Refresh access token |
| `GET /users/me` | Current profile |
| `PATCH /users/me` | Update profile |
| `POST /auth/forgot-password` | Start reset flow |
| `POST /auth/reset-password` | Complete reset flow |

## Frontend Work Remaining

| Area | Action |
|---|---|
| Auth state | Centralize auth state instead of checking token only on app load |
| Protected routes | Redirect unauthenticated users where needed |
| Forms | Add validation, loading, and error handling |
| Profile | Add editable profile details |
| Security | Avoid relying only on localStorage token presence |
| UX | Add logout, session expired, and account created states |
| Testing | Add auth state and protected-route tests |

## Production Rules To Add

- Access token expiry should be handled gracefully.
- Refresh token/session policy should be backend-controlled.
- Sensitive routes should require authenticated state.
- Profile updates should be validated on backend.
- Password reset and verification should use short-lived tokens/OTPs.

