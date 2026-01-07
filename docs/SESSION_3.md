# Session 3 - Custom Hooks
**Date:** January 7, 2026  
**Duration:** ~1.5 hours  
**Phase:** 2 - Intermediate  

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Understand what custom hooks are
- [x] Learn Rules of Hooks
- [x] Create `useLocalStorage` hook
- [x] Create `useForm` hook
- [x] Refactor existing code to use hooks
- [x] Build Edit Product feature

---

## ✅ Concepts Learned

### Custom Hooks

| Concept | Description | Java Equivalent |
|---------|-------------|-----------------|
| Custom Hook | Reusable stateful logic | Utility class |
| `use` prefix | Required naming convention | - |
| Rules of Hooks | Top-level only, no conditions/loops | - |
| Composition | Hooks can use other hooks | Inheritance/Composition |

### Hooks Created

| Hook | Purpose | Replaces |
|------|---------|----------|
| `useLocalStorage` | Persistent state in localStorage | useState + useEffect |
| `useForm` | Form state management | Multiple useState calls |

---

## 🛠️ Features Built

| Feature | Status | Description |
|---------|--------|-------------|
| useLocalStorage hook | ✅ | Syncs React state with localStorage |
| useForm hook | ✅ | Manages all form fields with one hook |
| Edit Product Page | ✅ | Pre-fill form, update product |
| Refactored AddProductPage | ✅ | Uses useForm |
| Refactored AddCustomerPage | ✅ | Uses useForm |
| Refactored Contexts | ✅ | Uses useLocalStorage |

---

## 📁 Files Created/Modified

```
✨ NEW FILES:
src/hooks/
├── index.ts              # Central exports
├── useLocalStorage.ts    # Persistent state hook
└── useForm.ts            # Form state hook

src/pages/EditProductPage.tsx  # Edit product feature

📝 MODIFIED FILES:
src/App.tsx                           # Added edit route
src/pages/AddProductPage.tsx          # Uses useForm
src/pages/Customer/AddCustomerPage.tsx # Uses useForm
src/context/ProductContext.tsx        # Uses useLocalStorage
src/context/CustomerContext.tsx       # Uses useLocalStorage
src/pages/ProductDetailPage.tsx       # Fixed edit link
```

---

## 💡 Key Insights

### 1. Custom Hooks = Extracted Logic
```tsx
// BEFORE: Duplicate code in every component
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('key')
  return saved ? JSON.parse(saved) : initial
})
useEffect(() => {
  localStorage.setItem('key', JSON.stringify(data))
}, [data])

// AFTER: One line!
const [data, setData] = useLocalStorage('key', initial)
```

### 2. useForm Pattern
```tsx
// BEFORE: One useState per field 😫
const [name, setName] = useState('')
const [price, setPrice] = useState('')
const [qty, setQty] = useState('')

// AFTER: One hook for all! 😎
const { values, handleChange } = useForm({ name: '', price: '', qty: '' })

// KEY: Input "name" attribute must match state key
<input name="price" value={values.price} onChange={handleChange} />
```

### 3. Pre-filling Edit Forms
```tsx
// Use useEffect to load data when component mounts
useEffect(() => {
  if (product) {
    setAllValues({
      name: product.name,
      price: product.price.toString(),
      quantity: product.quantity.toString()
    })
  }
}, [product])
```

### 4. Rules of Hooks
- ✅ Always call at top level
- ✅ Always start with `use`
- ❌ Never in conditions/loops
- ❌ Never in regular functions

---

## 📊 Progress Update

```
Phase 1: Fundamentals    [██████████] 100% ✅
Phase 2: Intermediate    [███████░░░] 70%  ⬆️ (was 40%)
Phase 3: Advanced        [░░░░░░░░░░] 0%
Phase 4: Professional    [░░░░░░░░░░] 0%
─────────────────────────────────────────
Total Progress:          [█████░░░░░] 45%  ⬆️ (was 35%)
```

---

## 🎯 Phase 2 Checklist

- [x] React Router ✅ (Session 2)
- [x] URL parameters (useParams) ✅ (Session 2)
- [x] Programmatic navigation (useNavigate) ✅ (Session 2)
- [x] useContext (global state) ✅ (Session 2)
- [x] Provider pattern ✅ (Session 2)
- [x] Custom Hooks ✅ (Session 3)
- [ ] useReducer ← **NEXT**
- [ ] Form validation with Zod
- [ ] Edit Customer feature

---

## 🏆 Achievement Unlocked!

**"Hook Master"** 🎣
> Created first custom hooks and refactored code to use them!

---

## ➡️ Next Session Topics

1. **useReducer** - Complex state management (like Redux pattern)
2. **Form Validation** - Using Zod for type-safe validation
3. **Edit Customer** - Complete the CRUD

---

## 📝 Homework (Optional)

- [ ] Create `EditCustomerPage.tsx` (follow EditProduct pattern)
- [ ] Add edit route for customers
- [ ] Create a `useSearch` hook for search functionality

---

## 💪 Great Progress!

You now understand:
- Why custom hooks exist (code reuse)
- How to create them (function starting with `use`)
- When to use them (duplicate stateful logic)

**You're thinking like a React developer!** 🚀
