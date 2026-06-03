# Auth And Profile Product Plan

## Executive Summary

The Auth/Profile subsystem manages basic customer identity entry points in the current frontend. It includes login, signup, auth-form support, profile routing, and app-level logged-in state based on a token in localStorage.

This is currently a lightweight frontend implementation and needs backend authentication integration for production.

## Implemented Journey

```text
1. Customer opens profile/auth route
2. App checks localStorage token
3. Login/signup forms collect user credentials
4. Profile receives logged-in state and setter from App
5. Navbar remains available across routes
```

## Implemented Components

| Component | Purpose |
|---|---|
| `App.tsx` | Owns app-level `isLoggedIn` state and lazy-loaded routes |
| `Navbar.tsx` | Global navigation |
| `LogIn.tsx` | Login screen/form |
| `SignUp.tsx` | Signup screen/form |
| `AuthForms.tsx` | Shared auth form support |
| `profile.tsx` | Profile route using `isLoggedIn` and `setIsLoggedIn` props |

## Current Rules

| Area | Current Behavior |
|---|---|
| Login state | Derived from `localStorage.getItem('token')` on app load |
| Profile route | Receives `isLoggedIn` and `setIsLoggedIn` |
| Routing | Auth/profile route is lazy-loaded through `App.tsx` |
| Navigation | Navbar is eager-loaded as part of app shell |

## Current Limitations

- No production auth API integration in this frontend layer.
- No refresh token or session expiry handling.
- No role-based access control.
- No password reset flow.
- No OTP/email verification flow.
- No profile data API integration.

