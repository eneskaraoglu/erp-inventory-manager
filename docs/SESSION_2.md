# Session 2 - React Router & useContext
**Date:** January 4, 2026  
**Duration:** ~2 hours  
**Phase:** 1 → 2 (Fundamentals → Intermediate)  

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Learn React Router (multiple pages)
- [x] Understand URL parameters (useParams)
- [x] Learn programmatic navigation (useNavigate)
- [x] Learn useContext (global state)
- [x] Solve prop drilling problem

---

## ✅ Concepts Learned

### 1. React Router

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| `<BrowserRouter>` | Enable routing | Application context |
| `<Routes>` | Container for routes | - |
| `<Route path="" element={}>` | URL → Component | `@RequestMapping` |
| `<Link to="">` | Navigation (no reload) | - |
| `useParams()` | Get URL params | `@PathVariable` |
| `useNavigate()` | Redirect in code | `response.sendRedirect()` |

### 2. useContext (Global State)

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| `createContext()` | Create container | Interface definition |
| `<Provider value={}>` | Provide data | `@Bean` / `@Service` |
| `useContext()` | Get data | `@Autowired` |
| Custom hook | Easy access | Factory pattern |

---

## 🛠️ Features Built

| Feature | Status | Description |
|---------|--------|-------------|
| Dashboard | ✅ | Home page with stats |
| Products List | ✅ | View all products |
| Product Detail | ✅ | Single product view |
| Add Product | ✅ | Form to add |
| Customers List | ✅ | View all customers |
| Customer Detail | ✅ | Single customer view |
| Add Customer | ✅ | Form to add |
| Global State | ✅ | Context for Products & Customers |

---

## 📁 Files Created/Modified

```
src/
├── context/                     ✨ NEW FOLDER
│   ├── ProductContext.tsx       ✨ Product state & logic
│   ├── CustomerContext.tsx      ✨ Customer state & logic
│   └── AppProviders.tsx         ✨ Combines all providers
├── types/
│   └── index.ts                 📝 Added Customer type
├── components/
│   ├── layout/
│   │   └── Layout.tsx           📝 Added navigation
│   └── customer/
│       └── CustomerCard.tsx     ✨ NEW
├── pages/
│   ├── Dashboard.tsx            ✨ NEW
│   ├── ProductsPage.tsx         ✨ NEW
│   ├── ProductDetailPage.tsx    ✨ NEW
│   ├── AddProductPage.tsx       ✨ NEW
│   └── Customer/
│       ├── CustomersPage.tsx    ✨ NEW
│       ├── CustomerDetailPage.tsx ✨ NEW
│       └── AddCustomerPage.tsx  ✨ NEW
└── App.tsx                      📝 Clean with router + providers
```

---

## 🗺️ Routes Created

| URL | Page | Description |
|-----|------|-------------|
| `/` | Dashboard | Stats overview |
| `/products` | ProductsPage | List all |
| `/products/new` | AddProductPage | Add form |
| `/products/:id` | ProductDetailPage | View one |
| `/customers` | CustomersPage | List all |
| `/customers/new` | AddCustomerPage | Add form |
| `/customers/:id` | CustomerDetailPage | View one |

---

## 💡 Key Insights

### 1. React Router = Client-side Servlet Mapping
```tsx
// Like web.xml or @RequestMapping
<Route path="/products/:id" element={<ProductDetail />} />
```

### 2. Link vs a href
```tsx
<a href="/page">      // Full reload ❌
<Link to="/page">     // No reload ✅ (SPA)
```

### 3. Context = Dependency Injection
```tsx
// Like @Autowired in Spring
const { products } = useProducts()
```

### 4. Provider Hell is Real
```tsx
// Solution: AppProviders.tsx combines them
// Better solution: Zustand (learn later)
```

---

## 📊 Progress Update

```
Phase 1: Fundamentals    [██████████] 100% ✅
Phase 2: Intermediate    [████░░░░░░] 40%
Phase 3: Advanced        [░░░░░░░░░░] 0%
Phase 4: Professional    [░░░░░░░░░░] 0%
─────────────────────────────────────────
Total Progress:          [████░░░░░░] 35%
```

---

## 🎯 Concepts Mastered

### Session 1 ✅
- Components & JSX
- Props
- useState
- useEffect
- List rendering

### Session 2 ✅
- React Router (pages, navigation)
- useParams (URL parameters)
- useNavigate (redirect)
- useContext (global state)
- Provider pattern

---

## ➡️ Next Session Topics

1. **Custom Hooks** - Reusable logic (like Java utility class)
2. Edit Feature - Update products/customers
3. API Integration - Connect to backend

---

## 📝 Homework (Optional)

- [ ] Add "Edit Product" page
- [ ] Add "Edit Customer" page  
- [ ] Try creating your own custom hook

---

## 💪 Great Job!

You learned two important concepts today:
- **React Router** - Multiple pages in SPA
- **useContext** - Global state without prop drilling

You also built a complete customer module on your own! 🎉

**See you in Session 3!** 🚀
