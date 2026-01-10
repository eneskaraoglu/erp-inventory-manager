# Session 4 - useReducer, useRef & Form Validation
**Date:** January 10, 2026  
**Duration:** ~2 hours  
**Phase:** 2 - Intermediate (COMPLETED! 🎉)

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Learn useReducer (complex state management)
- [x] Build Shopping Cart with useReducer
- [x] Learn useRef (DOM access & persistent values)
- [x] Learn Form Validation with Zod
- [x] Complete Phase 2!

---

## ✅ Concepts Learned

### 1. useReducer

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| `useReducer` | Complex state logic | Command Pattern |
| `reducer` | Pure function that calculates new state | CommandHandler |
| `dispatch` | Send action to reducer | execute() |
| `action` | Object describing what happened | Command object |

**When to use:**
- Multiple related state values
- Complex update logic
- Many actions on same state

### 2. useRef

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| `useRef` | DOM access / persist value | Component reference |
| `ref.current` | The actual value | field.getValue() |
| No re-render | Changes don't trigger re-render | Private field |

**Two use cases:**
1. DOM Reference (focus, scroll, measure)
2. Persist value without re-render (timers, previous value)

### 3. Zod Validation

| Concept | Purpose | Java Equivalent |
|---------|---------|-----------------|
| `z.object()` | Define schema | DTO class |
| `z.string()` | String validation | @NotBlank |
| `.min()` / `.max()` | Length validation | @Size |
| `.email()` | Email format | @Email |
| `.refine()` | Custom validation | Custom validator |
| `schema.parse()` | Validate data | validator.validate() |

---

## 🛠️ Features Built

| Feature | Status | Description |
|---------|--------|-------------|
| Shopping Cart | ✅ | Full cart with useReducer |
| Cart Context | ✅ | Global cart state |
| Add to Cart | ✅ | From products page |
| Update Quantity | ✅ | +/- buttons |
| Remove Item | ✅ | Delete from cart |
| Clear Cart | ✅ | Remove all |
| Cart Badge | ✅ | Item count in nav |
| useRef Practice | ✅ | 5 examples page |
| Form Validation | ✅ | Zod + AddProductPage |

---

## 📁 Files Created/Modified

```
✨ NEW FILES:
src/
├── reducers/
│   ├── index.ts              # Reducers export
│   └── cartReducer.ts        # Cart reducer logic
├── context/
│   └── CartContext.tsx       # Cart with useReducer
├── types/
│   └── cart.ts               # Cart types & actions
├── validation/
│   ├── index.ts              # Validation exports
│   └── schemas.ts            # Zod schemas
├── hooks/
│   └── useFormWithValidation.ts  # Form + Zod hook
├── pages/
│   ├── CartPage.tsx          # Shopping cart page
│   └── practice/
│       └── UseRefPractice.tsx # useRef examples

📝 MODIFIED FILES:
src/
├── App.tsx                   # Added cart & useRef routes
├── context/AppProviders.tsx  # Added CartProvider
├── components/layout/Layout.tsx  # Added cart badge
├── pages/AddProductPage.tsx  # Added Zod validation
├── hooks/index.ts            # Export new hook
```

---

## 📊 Project Structure (Updated)

```
erp-inventory-manager/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Layout.tsx        # With cart badge
│   │   ├── ProductCard.tsx
│   │   ├── AddProductForm.tsx
│   │   └── customer/
│   │       └── CustomerCard.tsx
│   ├── context/
│   │   ├── AppProviders.tsx      # All providers
│   │   ├── ProductContext.tsx
│   │   ├── CustomerContext.tsx
│   │   └── CartContext.tsx       ✨ NEW
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useForm.ts
│   │   └── useFormWithValidation.ts  ✨ NEW
│   ├── reducers/                 ✨ NEW FOLDER
│   │   ├── index.ts
│   │   └── cartReducer.ts
│   ├── validation/               ✨ NEW FOLDER
│   │   ├── index.ts
│   │   └── schemas.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── cart.ts               ✨ NEW
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── AddProductPage.tsx    # With validation
│   │   ├── EditProductPage.tsx
│   │   ├── CartPage.tsx          ✨ NEW
│   │   ├── Customer/
│   │   │   └── ...
│   │   └── practice/
│   │       ├── UseStatePractice.tsx
│   │       ├── UseEffectPractice.tsx
│   │       ├── UseTogglePractice.tsx
│   │       └── UseRefPractice.tsx  ✨ NEW
│   └── App.tsx
└── package.json                  # Added zod
```

---

## 💡 Key Insights

### 1. useReducer vs useState
```tsx
// useState - Simple, direct updates
const [count, setCount] = useState(0)
setCount(5)

// useReducer - Complex, action-based updates
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'INCREMENT', payload: 5 })
```

### 2. useRef - Two Use Cases
```tsx
// 1. DOM Access
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()

// 2. Persist Value (no re-render)
const renderCount = useRef(0)
renderCount.current += 1  // Doesn't cause re-render!
```

### 3. Zod Validation
```tsx
// Define schema (like Java annotations)
const schema = z.object({
  name: z.string().min(1, 'Required'),
  price: z.string().refine(v => Number(v) > 0, 'Must be positive')
})

// Validate
const isValid = schema.safeParse(data).success
```

### 4. Built-in vs External
```
React Built-in: useState, useEffect, useReducer, useRef...
External: react-router-dom, zod, axios, zustand...
```

---

## 🏆 Achievement Unlocked!

**"Phase 2 Complete!"** 🎉
> Mastered all intermediate React concepts!

**New Badges:**
- 🔄 Reducer Master - Implemented useReducer
- 🎯 DOM Controller - Used useRef for DOM access
- ✅ Validator - Added Zod form validation

---

## 📊 Progress Update

```
Phase 1: Fundamentals    [██████████] 100% ✅
Phase 2: Intermediate    [██████████] 100% ✅ COMPLETED!
Phase 3: Advanced        [░░░░░░░░░░] 0%
Phase 4: Professional    [░░░░░░░░░░] 0%
─────────────────────────────────────────
Total Progress:          [██████░░░░] 50%
```

---

## 🎯 Phase 2 Checklist - ALL COMPLETE!

- [x] React Router ✅ (Session 2)
- [x] URL parameters (useParams) ✅ (Session 2)
- [x] Programmatic navigation (useNavigate) ✅ (Session 2)
- [x] useContext (global state) ✅ (Session 2)
- [x] Provider pattern ✅ (Session 2)
- [x] Custom Hooks ✅ (Session 3)
- [x] useReducer ✅ (Session 4)
- [x] useRef ✅ (Session 4)
- [x] Form validation (Zod) ✅ (Session 4)

---

## ➡️ Next Session: Phase 3 - Advanced

1. **API Integration** - Connect to real backend
2. **Loading & Error States** - Professional UX
3. **React Query** - Data fetching & caching
4. **Zustand** - Simpler global state (replace Context)

---

## 📈 Time Invested

| Session | Date | Hours | Topics |
|---------|------|-------|--------|
| 1 | Dec 31, 2025 | ~2 hrs | Fundamentals |
| 2 | Jan 4, 2026 | ~2 hrs | Router, Context |
| 3 | Jan 7, 2026 | ~1.5 hrs | Custom Hooks |
| 4 | Jan 10, 2026 | ~2 hrs | useReducer, useRef, Zod |

**Total: ~7.5 hours**

---

## 💪 Great Session!

You completed Phase 2! In just 4 sessions you've learned:
- All fundamental hooks
- All intermediate patterns
- Form validation
- State management patterns

**You're ready for advanced topics!** 🚀

See you in Session 5 for Phase 3!
