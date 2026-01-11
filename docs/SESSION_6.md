# Session 6 - React Query, Zustand & Error Boundaries
**Date:** January 11, 2026  
**Duration:** ~2 hours  
**Phase:** 3 - Advanced (COMPLETED! 🎉)

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Learn React Query (TanStack Query)
- [x] Refactor Products to use React Query
- [x] Learn Zustand (simple state management)
- [x] Refactor Cart to use Zustand
- [x] Add Error Boundaries
- [x] Complete Phase 3!

---

## ✅ Concepts Learned

### 1. React Query (TanStack Query)

| Concept | Purpose | Replaces |
|---------|---------|----------|
| `useQuery` | Fetch data (GET) | useState + useEffect |
| `useMutation` | Change data (POST/PUT/DELETE) | async functions in context |
| `queryKey` | Cache identifier | manual cache management |
| `invalidateQueries` | Refetch after mutation | manual refetch |
| `isLoading` | Loading state | manual loading state |
| `error` | Error state | manual error state |

**Key Pattern:**
```tsx
// BEFORE: 15+ lines
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
useEffect(() => { fetch()... }, [])

// AFTER: 3 lines!
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: productApi.getAll
})
```

### 2. Zustand

| Concept | Purpose | Replaces |
|---------|---------|----------|
| `create()` | Create store | createContext + Provider |
| `set()` | Update state | dispatch + reducer |
| `get()` | Access state in actions | - |
| Selector | Get specific state | useContext |

**Key Pattern:**
```tsx
// BEFORE: Context + useReducer (~200 lines)
<CartProvider>
  {children}
</CartProvider>

// AFTER: Zustand (~60 lines, no Provider!)
const items = useCartStore((state) => state.items)
const addItem = useCartStore((state) => state.addItem)
```

### 3. Error Boundaries

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| ErrorBoundary | Catch render errors | try-catch block |
| getDerivedStateFromError | Set error state | catch clause |
| componentDidCatch | Log error | exception logging |
| fallback | Show error UI | error page |

---

## 🛠️ Features Built

| Feature | Status | Description |
|---------|--------|-------------|
| React Query Setup | ✅ | QueryClientProvider in main.tsx |
| Product Queries | ✅ | useProductsQuery, useProductQuery |
| Product Mutations | ✅ | useCreateProduct, useUpdateProduct, useDeleteProduct |
| Zustand Cart Store | ✅ | Replaces CartContext + cartReducer |
| Error Boundary | ✅ | Catches errors app-wide |

---

## 📁 Files Created/Modified

```
✨ NEW FILES:
src/
├── hooks/
│   └── useProductQueries.ts     # React Query hooks for products
├── stores/
│   ├── index.ts                 # Stores export
│   └── cartStore.ts             # Zustand cart store
└── components/
    └── ErrorBoundary.tsx        # Error boundary component

📝 MODIFIED FILES:
src/
├── main.tsx                     # Added QueryClientProvider
├── App.tsx                      # Added ErrorBoundary wrapper
├── hooks/index.ts               # Export React Query hooks
├── context/AppProviders.tsx     # Removed CartProvider
├── components/layout/Layout.tsx # Use Zustand for cart badge
├── pages/
│   ├── ProductsPage.tsx         # Uses useProductsQuery
│   ├── ProductDetailPage.tsx    # Uses useProductQuery
│   ├── AddProductPage.tsx       # Uses useCreateProduct
│   ├── EditProductPage.tsx      # Uses useUpdateProduct
│   ├── Dashboard.tsx            # Uses useProductsQuery
│   └── CartPage.tsx             # Uses Zustand store
```

---

## 📊 State Management Comparison

| Use Case | Solution | Why |
|----------|----------|-----|
| Server data (API) | React Query | Caching, refetching, loading states |
| Client state (Cart) | Zustand | Simple, no Provider, persists |
| Form state | useState or useForm | Local to component |
| Theme/Auth | Context or Zustand | App-wide, rarely changes |

---

## 💡 Key Insights

### 1. React Query = Server State
```tsx
// For data from APIs
const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetch('/api/products')
})
```

### 2. Zustand = Client State
```tsx
// For UI state (cart, theme, sidebar open, etc.)
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] }))
}))
```

### 3. When to Use What

| Scenario | Use |
|----------|-----|
| Fetching API data | React Query |
| Shopping cart | Zustand |
| Form inputs | useState |
| Modal open/close | useState |
| User authentication | Zustand or Context |
| Theme preference | Zustand |

---

## 🏆 Achievements Unlocked!

| Badge | Description |
|-------|-------------|
| 🔄 Query Master | Implemented React Query |
| 🐻 Zustand Pro | Replaced Context with Zustand |
| 🛡️ Error Handler | Added Error Boundaries |
| 🏁 Phase 3 Complete! | Finished Advanced level! |

---

## 📊 Progress Update

```
Phase 1: Fundamentals    [██████████] 100% ✅
Phase 2: Intermediate    [██████████] 100% ✅
Phase 3: Advanced        [██████████] 100% ✅ COMPLETED!
Phase 4: Professional    [░░░░░░░░░░] 0%
─────────────────────────────────────────────────
Total Progress:          [████████░░] 75%
```

---

## 🎯 Phase 3 Checklist - ALL COMPLETE!

- [x] API Integration (fetch) ✅ Session 5
- [x] Loading & Error states ✅ Session 5
- [x] SQLite Database ✅ Session 5
- [x] React Query ✅ Session 6
- [x] Zustand state management ✅ Session 6
- [x] Error boundaries ✅ Session 6

---

## ➡️ Phase 4: Professional (Next!)

1. **Authentication**
   - Login/Logout
   - JWT tokens
   - User sessions

2. **Protected Routes**
   - Route guards
   - Redirect if not logged in

3. **Performance Optimization**
   - React.memo
   - useMemo, useCallback
   - Code splitting

4. **Deployment**
   - Build for production
   - Deploy to hosting

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

**Total: ~12 hours**

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

3. **Test React Query:**
   - Go to /products
   - Add/Edit/Delete products
   - Notice automatic cache updates!

4. **Test Zustand:**
   - Go to /cart
   - Add items from products
   - Notice no Provider needed!

5. **Test Error Boundary:**
   - Any unhandled error shows nice fallback UI

---

## 💪 Amazing Progress!

### What You Learned Today:
- ✅ React Query for server state
- ✅ Zustand for client state
- ✅ Error Boundaries for error handling
- ✅ When to use which state solution

### Your React Skills Now:
- ✅ All fundamental hooks
- ✅ All intermediate patterns
- ✅ All advanced patterns
- ✅ Full-stack development (React + FastAPI)

**You're ready for professional-level React development!** 🚀

---

## 🔗 Quick Links

- [Session 1](./SESSION_1.md) - Fundamentals
- [Session 2](./SESSION_2.md) - Router & Context
- [Session 3](./SESSION_3.md) - Custom Hooks
- [Session 4](./SESSION_4.md) - useReducer, useRef, Zod
- [Session 5](./SESSION_5.md) - API, SQLite, Users
- [Session 6](./SESSION_6.md) - React Query, Zustand, Error Boundaries ✨
- [Concepts Reference](./CONCEPTS.md)
