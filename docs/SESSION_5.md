# Session 5 - API Integration
**Date:** January 11, 2026  
**Duration:** ~2 hours  
**Phase:** 3 - Advanced (Started!)

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Create API service layer
- [x] Connect React to FastAPI backend
- [x] Add loading & error states
- [x] Update types to match backend
- [x] Full CRUD operations via API

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

### 3. Async Context Actions

```tsx
// BEFORE (Session 4): Synchronous
const addProduct = (product) => {
  setProducts([...products, product])
}

// AFTER (Session 5): Async with API
const addProduct = async (product) => {
  try {
    setError(null)
    const newProduct = await productApi.create(product)
    setProducts([...products, newProduct])
  } catch (err) {
    setError(err.message)
    throw err  // Re-throw for component to handle
  }
}
```

---

## 🛠️ Features Built

| Feature | Status | Description |
|---------|--------|-------------|
| API Service | ✅ | `src/services/api.ts` |
| Product API | ✅ | CRUD operations |
| Customer API | ✅ | CRUD operations |
| Loading States | ✅ | Spinner while fetching |
| Error States | ✅ | Error messages + retry |
| Types Aligned | ✅ | Match FastAPI backend |

---

## 📁 Files Created/Modified

```
✨ NEW FILES:
src/services/
├── index.ts              # Central exports
└── api.ts                # Product & Customer API

📝 MODIFIED FILES:
src/types/index.ts        # Aligned with backend (stock, email, etc.)
src/validation/schemas.ts # Updated for new fields
src/context/
├── ProductContext.tsx    # API integration + loading/error
└── CustomerContext.tsx   # API integration + loading/error
src/components/
├── ProductCard.tsx       # stock field, isDeleting prop
└── customer/CustomerCard.tsx  # New fields, isDeleting prop
src/pages/
├── Dashboard.tsx         # Loading/error states
├── ProductsPage.tsx      # Loading/error + async delete
├── ProductDetailPage.tsx # Loading/error + async delete
├── AddProductPage.tsx    # Async submit + new fields
├── EditProductPage.tsx   # Async submit + new fields
├── Customer/
│   ├── CustomersPage.tsx      # Loading/error + async delete
│   ├── CustomerDetailPage.tsx # Loading/error + async delete
│   ├── AddCustomerPage.tsx    # Async submit + validation
│   └── EditCustomerPage.tsx   # Async submit
```

---

## 🔗 API Endpoints Used

| Method | Endpoint | React Function |
|--------|----------|----------------|
| GET | `/api/products` | `productApi.getAll()` |
| GET | `/api/products/:id` | `productApi.getById(id)` |
| POST | `/api/products` | `productApi.create(data)` |
| PUT | `/api/products/:id` | `productApi.update(id, data)` |
| DELETE | `/api/products/:id` | `productApi.delete(id)` |
| GET | `/api/customers` | `customerApi.getAll()` |
| GET | `/api/customers/:id` | `customerApi.getById(id)` |
| POST | `/api/customers` | `customerApi.create(data)` |
| PUT | `/api/customers/:id` | `customerApi.update(id, data)` |
| DELETE | `/api/customers/:id` | `customerApi.delete(id)` |

---

## 💡 Key Insights

### 1. fetch() vs axios
```tsx
// fetch - Built into browser
const response = await fetch(url, { method: 'POST', body: JSON.stringify(data) })
const json = await response.json()

// axios - External library (we didn't use this)
const { data } = await axios.post(url, data)
```

### 2. Error Handling Pattern
```tsx
try {
  setLoading(true)
  setError(null)
  const data = await api.getData()
  setData(data)
} catch (err) {
  setError(err instanceof Error ? err.message : 'Unknown error')
} finally {
  setLoading(false)
}
```

### 3. Optimistic vs Pessimistic Updates
```tsx
// Pessimistic (what we did) - Wait for API, then update UI
await productApi.create(product)  // Wait
setProducts([...products, newProduct])  // Then update

// Optimistic - Update UI, then call API
setProducts([...products, tempProduct])  // Update first
await productApi.create(product)  // Then call API
// Roll back if API fails
```

### 4. Type Alignment
```
React (frontend)     ↔     FastAPI (backend)
-----------------          -----------------
stock: number        ↔     stock: int
description?: string ↔     description: Optional[str]
email: string        ↔     email: EmailStr
```

---

## 🏆 Achievement Unlocked!

**"API Master"** 🌐
> Connected React frontend to FastAPI backend with full CRUD operations!

**New Skills:**
- 📡 HTTP Requests with fetch()
- ⏳ Loading state management
- ❌ Error handling
- 🔄 Async/await in React

---

## 📊 Progress Update

```
Phase 1: Fundamentals    [██████████] 100% ✅
Phase 2: Intermediate    [██████████] 100% ✅
Phase 3: Advanced        [████░░░░░░] 40%  ⬆️ NEW!
Phase 4: Professional    [░░░░░░░░░░] 0%
─────────────────────────────────────────────────
Total Progress:          [███████░░░] 60%
```

---

## 🎯 Phase 3 Checklist

- [x] API Integration (fetch) ✅ Session 5
- [x] Loading & Error states ✅ Session 5
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

---

## 📈 Time Invested

| Session | Date | Hours | Topics |
|---------|------|-------|--------|
| 1 | Dec 31, 2025 | ~2 hrs | Fundamentals |
| 2 | Jan 4, 2026 | ~2 hrs | Router, Context |
| 3 | Jan 7, 2026 | ~1.5 hrs | Custom Hooks |
| 4 | Jan 10, 2026 | ~2 hrs | useReducer, useRef, Zod |
| 5 | Jan 11, 2026 | ~2 hrs | API Integration |

**Total: ~9.5 hours**

---

## 🧪 How to Test

1. **Start Backend:**
   ```bash
   cd D:\CODE-BASE\erp-inventory-manager-backend
   python run.py
   ```
   Backend runs at: http://localhost:8000
   API docs at: http://localhost:8000/api/docs

2. **Start Frontend:**
   ```bash
   cd D:\CODE-BASE\erp-inventory-manager
   npm run dev
   ```
   Frontend runs at: http://localhost:5173

3. **Test Flow:**
   - Dashboard shows data from API ✅
   - Products list fetches from backend ✅
   - Add product sends POST request ✅
   - Edit product sends PUT request ✅
   - Delete product sends DELETE request ✅
   - Same for customers ✅

---

## 💪 Great Session!

You've connected your React frontend to a real FastAPI backend!

Key accomplishments:
- ✅ API service layer with fetch()
- ✅ Loading spinners for better UX
- ✅ Error handling with retry option
- ✅ Full CRUD via REST API
- ✅ Types aligned between frontend & backend

**Your app is now a real full-stack application!** 🚀
