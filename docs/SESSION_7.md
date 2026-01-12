# Session 7 - Authentication & Protected Routes
**Date:** January 12, 2026  
**Duration:** ~2 hours  
**Phase:** 4 - Professional (IN PROGRESS)

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Understand JWT authentication
- [x] Add auth endpoints to backend
- [x] Create Auth Store (Zustand)
- [x] Build Login page
- [x] Implement Protected Routes
- [x] Add role-based access control

---

## ✅ Concepts Learned

### 1. JWT (JSON Web Token)

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| JWT | Stateless authentication | Spring Security JWT |
| Access Token | Proves user identity | Session ID |
| Payload | User info in token | SecurityContext |
| Expiration | Token validity period | Session timeout |

**JWT Flow:**
```
1. User submits credentials → POST /auth/login
2. Backend validates → Returns JWT token
3. Frontend stores token → localStorage (via Zustand persist)
4. Every request includes → Authorization: Bearer <token>
5. Backend validates token → Grants/denies access
```

### 2. Auth Store (Zustand)

| State | Purpose |
|-------|---------|
| `user` | Current logged-in user info |
| `token` | JWT access token |
| `isAuthenticated` | Quick boolean check |
| `isLoading` | Login in progress |
| `error` | Login error message |

| Action | Purpose |
|--------|---------|
| `login()` | Authenticate user |
| `logout()` | Clear auth state |
| `checkAuth()` | Verify token on app load |

### 3. Protected Routes

| Pattern | Purpose | Java Equivalent |
|---------|---------|-----------------|
| `<ProtectedRoute>` | Wrap protected pages | `@PreAuthorize` |
| `requiredRoles` | Role-based access | `hasRole('ADMIN')` |
| `Navigate` | Redirect to login | `sendRedirect()` |

---

## 🛠️ Features Built

| Feature | Status | Description |
|---------|--------|-------------|
| JWT Auth Backend | ✅ | /auth/login, /auth/me endpoints |
| Auth Store | ✅ | Zustand with persist |
| Login Page | ✅ | Form with error handling |
| Protected Route | ✅ | Route guard component |
| Role-based Access | ✅ | Admin/Manager restrictions |
| Auto Token in API | ✅ | fetchApi adds Authorization header |
| Session Expiry | ✅ | 401 redirects to login |

---

## 📁 Files Created/Modified

```
✨ NEW FILES (Backend):
app/routers/auth.py              # Auth endpoints

✨ NEW FILES (Frontend):
src/stores/authStore.ts          # Zustand auth store
src/pages/LoginPage.tsx          # Login form
src/components/ProtectedRoute.tsx # Route guard

📝 MODIFIED FILES:
Backend:
  app/main.py                    # Added auth router
  requirements.txt               # Added PyJWT

Frontend:
  src/types/index.ts             # Auth types
  src/services/api.ts            # Auth API + auto token
  src/stores/index.ts            # Export auth store
  src/components/layout/Layout.tsx # User info + logout
  src/App.tsx                    # Protected routes
```

---

## 💡 Key Insights

### 1. Zustand persist = Automatic localStorage
```tsx
// Token survives page refresh!
create<AuthState>()(
  persist(
    (set, get) => ({...}),
    { name: 'auth-storage' }  // localStorage key
  )
)
```

### 2. Protected Route Pattern
```tsx
// Like Spring Security filter
function ProtectedRoute({ children, requiredRoles }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  if (requiredRoles && !hasRole) {
    return <AccessDenied />
  }
  return children
}
```

### 3. Auto Token in API Calls
```tsx
// No need to pass token manually!
const token = getAuthToken()  // From localStorage
headers: {
  'Authorization': `Bearer ${token}`
}
```

### 4. Session Expiry Handling
```tsx
if (response.status === 401) {
  localStorage.removeItem('auth-storage')
  window.location.href = '/login'
}
```

---

## 🏆 Achievements Unlocked!

| Badge | Description |
|-------|-------------|
| 🔐 Auth Master | Implemented JWT authentication |
| 🛡️ Route Guard | Created Protected Routes |
| 👑 Role Manager | Added role-based access |

---

## 📊 Progress Update

```
Phase 1: Fundamentals    [██████████] 100% ✅
Phase 2: Intermediate    [██████████] 100% ✅
Phase 3: Advanced        [██████████] 100% ✅
Phase 4: Professional    [████░░░░░░] 40%  ⬆️
─────────────────────────────────────────────────
Total Progress:          [████████░░] 85%  ⬆️
```

---

## 🎯 Phase 4 Checklist

- [x] JWT Authentication ✅ Session 7
- [x] Login Page ✅ Session 7
- [x] Protected Routes ✅ Session 7
- [x] Role-based Access ✅ Session 7
- [ ] Performance Optimization (useMemo, useCallback)
- [ ] Code Splitting (lazy loading)
- [ ] Deployment

---

## 🧪 How to Test

### 1. Install PyJWT on Backend:
```bash
cd D:\CODE-BASE\erp-inventory-manager-backend
pip install PyJWT
```

### 2. Start Backend:
```bash
python run.py
```

### 3. Start Frontend:
```bash
cd D:\CODE-BASE\erp-inventory-manager
npm run dev
```

### 4. Test Authentication:
1. Open http://localhost:5173
2. You'll be redirected to /login
3. Try these accounts:
   - `admin` / `admin123` → Full access
   - `manager` / `manager123` → Can view users
   - `johndoe` / `password123` → Cannot access users

### 5. Test Protected Routes:
- Try accessing /users as `johndoe` → Access Denied
- Try accessing /users as `admin` → Success

### 6. Test Session:
- Login, refresh page → Still logged in
- Click Logout → Redirected to login

---

## 📈 Java ↔ React Comparison (Complete)

| Concept | Java/Spring | React |
|---------|-------------|-------|
| Auth Filter | OncePerRequestFilter | ProtectedRoute |
| Security Context | SecurityContextHolder | Zustand authStore |
| Token Storage | HttpSession | localStorage |
| User Principal | @AuthenticationPrincipal | useCurrentUser() |
| Role Check | @PreAuthorize | requiredRoles prop |
| Login Endpoint | AuthController | authApi.login() |
| Token Creation | JwtService | Python jwt.encode() |
| Token Validation | JwtFilter | Python jwt.decode() |

---

## ➡️ Next Session Topics

### Performance Optimization
1. **useMemo** - Memoize expensive calculations
2. **useCallback** - Memoize functions
3. **React.memo** - Prevent unnecessary re-renders
4. **Code Splitting** - Lazy load routes

### Deployment
1. Build for production
2. Deploy to hosting (Vercel/Netlify)

---

## 📈 Time Invested

| Session | Date | Hours | Topics |
|---------|------|-------|--------|
| 1 | Dec 31, 2025 | ~2 hrs | Fundamentals |
| 2 | Jan 4, 2026 | ~2 hrs | Router, Context |
| 3 | Jan 7, 2026 | ~1.5 hrs | Custom Hooks |
| 4 | Jan 10, 2026 | ~2 hrs | useReducer, useRef, Zod |
| 5 | Jan 11, 2026 | ~2.5 hrs | API, SQLite, Users |
| 6 | Jan 11, 2026 | ~2 hrs | React Query, Zustand, Error Boundaries |
| 7 | Jan 12, 2026 | ~2 hrs | Authentication, Protected Routes |

**Total: ~14 hours**

---

## 💪 Great Progress!

### What You Learned Today:
- ✅ JWT authentication flow
- ✅ Zustand persist for token storage
- ✅ Protected Route pattern
- ✅ Role-based access control
- ✅ Auto-attaching tokens to API calls

### Your React Skills Now:
- ✅ All fundamental concepts
- ✅ All intermediate patterns
- ✅ All advanced patterns
- ✅ Authentication (Professional!)

**You're building production-ready React apps!** 🚀

---

## 🔗 Quick Links

- [Session 1](./SESSION_1.md) - Fundamentals
- [Session 2](./SESSION_2.md) - Router & Context
- [Session 3](./SESSION_3.md) - Custom Hooks
- [Session 4](./SESSION_4.md) - useReducer, useRef, Zod
- [Session 5](./SESSION_5.md) - API, SQLite, Users
- [Session 6](./SESSION_6.md) - React Query, Zustand
- [Session 7](./SESSION_7.md) - Authentication ✨
- [Concepts Reference](./CONCEPTS.md)
