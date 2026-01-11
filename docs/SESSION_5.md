# Session 5 - API Integration & User Module
**Date:** January 11, 2026  
**Duration:** ~2.5 hours  
**Phase:** 3 - Advanced (Started!)

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Create API service layer
- [x] Connect React to FastAPI backend
- [x] Add loading & error states
- [x] Update types to match backend
- [x] Full CRUD operations via API
- [x] Add SQLite database to backend
- [x] Build complete User module (self-practice!)

---

## ✅ Concepts Learned

### 1. API Service Layer

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| `api.ts` | Centralized HTTP calls | `@Service` class |
| `fetch()` | Make HTTP requests | `HttpClient` / `RestTemplate` |
| `async/await` | Handle promises | `CompletableFuture` |
| Error handling | Try/catch for API calls | Exception handling |

### 2. Loading & Error States

| State | Purpose | UX |
|-------|---------|-----|
| `loading: true` | Data being fetched | Show spinner |
| `loading: false` | Data ready | Show content |
| `error: string` | Something failed | Show error message + retry |

### 3. SQLite Database (Backend)

| Concept | Python/FastAPI | Java Equivalent |
|---------|----------------|-----------------|
| Database | SQLite | H2 Database |
| ORM | SQLAlchemy | Hibernate/JPA |
| Model | `class Model(Base)` | `@Entity` |
| Session | `Depends(get_db)` | `@Autowired EntityManager` |

### 4. Async Context Actions

```tsx
// BEFORE (Session 4): Synchronous
const addProduct = (product) => {
  setProducts([...products, product])
}

// AFTER (Session 5): Async with API
const addProduct = async (product) => {
  const newProduct = await productApi.create(product)
  setProducts([...products, newProduct])
}
```

---

## 🛠️ Features Built

### API Integration ✅
| Feature | Status | Description |
|---------|--------|-------------|
| API Service | ✅ | `src/services/api.ts` |
| Product API | ✅ | CRUD operations |
| Customer API | ✅ | CRUD operations |
| User API | ✅ | CRUD operations |
| Loading States | ✅ | Spinner while fetching |
| Error States | ✅ | Error messages + retry |

### Backend Database ✅
| Feature | Status | Description |
|---------|--------|-------------|
| SQLite | ✅ | Persistent storage |
| SQLAlchemy | ✅ | ORM for Python |
| User Model | ✅ | With password hashing |
| Seed Data | ✅ | Auto-created on startup |

### User Module ✅ (Self-Built!)
| Feature | Status | Description |
|---------|--------|-------------|
| UsersPage | ✅ | List with search |
| UserDetailPage | ✅ | View single user |
| AddUserPage | ✅ | Create with password |
| EditUserPage | ✅ | Update user |
| UserCard | ✅ | Role-based colors |
| UserContext | ✅ | API integration |

---

## 📁 Files Created/Modified

### Frontend (React)
```
✨ NEW FILES:
src/services/
├── index.ts              # Central exports
└── api.ts                # Product, Customer, User API

src/pages/User/
├── UsersPage.tsx         # List users
├── UserDetailPage.tsx    # View user
├── AddUserPage.tsx       # Create user
└── EditUserPage.tsx      # Edit user

src/components/user/
└── UserCard.tsx          # User card component

src/context/
└── UserContext.tsx       # User state management

📝 MODIFIED FILES:
src/types/index.ts        # Added User types
src/context/AppProviders.tsx  # Added UserProvider
src/App.tsx               # Added User routes
src/pages/Dashboard.tsx   # Added User stats
src/components/layout/Layout.tsx  # Added Users nav link
```

### Backend (FastAPI)
```
✨ NEW FILES:
app/database.py           # SQLite connection
app/models/user.py        # User Pydantic schema
app/models/user_model.py  # User SQLAlchemy model
app/routers/users.py      # User CRUD endpoints
data/erp.db               # SQLite database file

📝 MODIFIED FILES:
app/main.py               # Added users router, seed data
app/models/__init__.py    # Export new models
requirements.txt          # Added sqlalchemy
```

---

## 🔗 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all |
| GET | `/api/products/:id` | Get one |
| POST | `/api/products` | Create |
| PUT | `/api/products/:id` | Update |
| DELETE | `/api/products/:id` | Delete |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | Get all |
| GET | `/api/customers/:id` | Get one |
| POST | `/api/customers` | Create |
| PUT | `/api/customers/:id` | Update |
| DELETE | `/api/customers/:id` | Delete |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all |
| GET | `/api/users/:id` | Get one |
| POST | `/api/users` | Create (with password) |
| PUT | `/api/users/:id` | Update |
| DELETE | `/api/users/:id` | Delete |

---

## 💡 Key Insights

### 1. fetch() Pattern
```tsx
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
const result = await response.json()
```

### 2. Error Handling Pattern
```tsx
try {
  setLoading(true)
  setError(null)
  const data = await api.getData()
  setData(data)
} catch (err) {
  setError(err.message)
} finally {
  setLoading(false)
}
```

### 3. SQLite = Persistent Storage
```
Before: Data lost on restart (in-memory)
After:  Data saved to file (data/erp.db)
```

### 4. Password Handling
```python
# Backend hashes password
password_hash = hashlib.sha256(password.encode()).hexdigest()

# Frontend sends plain password
{ username, email, password: "secret123" }
```

---

## 🏆 Achievements Unlocked!

| Badge | Description |
|-------|-------------|
| 🌐 API Master | Connected React to FastAPI |
| 💾 Database Pro | Added SQLite persistence |
| 👤 User Builder | Built complete User module |
| 🔐 Security Start | Implemented password hashing |

---

## 📊 Progress Update

```
Phase 1: Fundamentals    [██████████] 100% ✅
Phase 2: Intermediate    [██████████] 100% ✅
Phase 3: Advanced        [██████░░░░] 60%  ⬆️
Phase 4: Professional    [░░░░░░░░░░] 0%
─────────────────────────────────────────────────
Total Progress:          [███████░░░] 65%
```

---

## 🎯 Phase 3 Checklist

- [x] API Integration (fetch) ✅ Session 5
- [x] Loading & Error states ✅ Session 5
- [x] SQLite Database ✅ Session 5
- [ ] React Query (TanStack Query) ← **NEXT**
- [ ] Zustand state management
- [ ] Error boundaries

---

## ➡️ Next Session: React Query

1. **Why React Query?**
   - Automatic caching
   - Background refetching
   - Loading/error states built-in
   - Less boilerplate than useEffect

2. **What We'll Refactor:**
   - Replace `useEffect` + `useState` with `useQuery`
   - Replace manual API calls with `useMutation`
   - Add optimistic updates

---

## 📈 Time Invested

| Session | Date | Hours | Topics |
|---------|------|-------|--------|
| 1 | Dec 31, 2025 | ~2 hrs | Fundamentals |
| 2 | Jan 4, 2026 | ~2 hrs | Router, Context |
| 3 | Jan 7, 2026 | ~1.5 hrs | Custom Hooks |
| 4 | Jan 10, 2026 | ~2 hrs | useReducer, useRef, Zod |
| 5 | Jan 11, 2026 | ~2.5 hrs | API, SQLite, Users |

**Total: ~10 hours**

---

## 🧪 How to Test

1. **Start Backend:**
   ```bash
   cd D:\CODE-BASE\erp-inventory-manager-backend
   python run.py
   ```

2. **Start Frontend:**
   ```bash
   cd D:\CODE-BASE\erp-inventory-manager
   npm run dev
   ```

3. **Test User Module:**
   - Go to http://localhost:5173/users
   - See 3 seed users (admin, manager, johndoe)
   - Create, view, edit, delete users
   - Data persists after restart!

---

## 💪 Great Session!

### What You Learned:
- ✅ API integration with fetch()
- ✅ Loading & error state patterns
- ✅ SQLite database setup
- ✅ SQLAlchemy ORM basics
- ✅ Password hashing

### What You Built Yourself:
- ✅ Complete User module (frontend + backend)
- ✅ Applied all patterns independently
- ✅ Showed strong understanding!

**You're becoming a full-stack developer!** 🚀

See you in Session 6 for React Query!
