# React Concepts - Quick Reference

## Java ↔ React Comparison

| Java/Swing | React | Notes |
|------------|-------|-------|
| JPanel class | Function Component | Both are reusable UI units |
| Constructor params | Props | Data passed from parent |
| Class fields | useState | Mutable component data |
| PropertyChangeListener | useState setter | Triggers UI update |
| componentDidMount | useEffect(() => {}, []) | Runs once on mount |
| componentDidUpdate | useEffect(() => {}, [deps]) | Runs when deps change |
| ActionListener | onClick, onChange | Event handlers |
| for loop + add() | .map() + JSX | Rendering lists |
| if/else for visibility | Conditional rendering | `{show && <Component />}` |
| Servlet URL mapping | React Router | URL → Component |
| Command Pattern | useReducer | Action-based state changes |
| Component reference | useRef | DOM access |
| Bean Validation | Zod | Form validation |

---

## Hook Rules 📜

1. **Only call hooks at top level**
   ```tsx
   // ❌ WRONG
   if (condition) {
     const [state, setState] = useState()
   }
   
   // ✅ CORRECT
   const [state, setState] = useState()
   if (condition) { /* use state */ }
   ```

2. **Only call hooks in React functions**
   ```tsx
   // ❌ WRONG - regular function
   function helper() {
     const [state, setState] = useState()
   }
   
   // ✅ CORRECT - React component
   function MyComponent() {
     const [state, setState] = useState()
   }
   ```

---

## useState Patterns

### Basic
```tsx
const [count, setCount] = useState(0)
setCount(5)           // Set to 5
setCount(c => c + 1)  // Increment (use prev value)
```

### With Object
```tsx
const [user, setUser] = useState({ name: '', age: 0 })
setUser({ ...user, name: 'John' })  // Spread to keep other fields
```

### With Array
```tsx
const [items, setItems] = useState([])
setItems([...items, newItem])       // Add item
setItems(items.filter(i => i.id !== id))  // Remove item
```

### Lazy Initial State
```tsx
// For expensive computation or localStorage
const [data, setData] = useState(() => {
  return JSON.parse(localStorage.getItem('data'))
})
```

---

## useEffect Patterns

### Run Once (on mount)
```tsx
useEffect(() => {
  console.log('Component mounted')
}, [])  // Empty array = only on mount
```

### Run on Dependency Change
```tsx
useEffect(() => {
  console.log('products changed')
}, [products])  // Runs when products changes
```

### Cleanup
```tsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  return () => clearInterval(timer)  // Cleanup
}, [])
```

---

## useReducer Patterns ✨ NEW

### When to Use
- Multiple related state values
- Complex state logic
- Many actions on same state

### Basic Pattern
```tsx
// 1. Define state type
interface State {
  items: Item[]
  total: number
}

// 2. Define actions
type Action =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'CLEAR' }

// 3. Create reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) }
    case 'CLEAR':
      return { items: [], total: 0 }
    default:
      return state
  }
}

// 4. Use in component
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'ADD_ITEM', payload: newItem })
```

### useState vs useReducer
```tsx
// useState - Simple, direct
setCount(count + 1)

// useReducer - Action-based
dispatch({ type: 'INCREMENT' })
```

---

## useRef Patterns ✨ NEW

### DOM Reference
```tsx
const inputRef = useRef<HTMLInputElement>(null)

// Attach to element
<input ref={inputRef} />

// Access DOM
inputRef.current?.focus()
inputRef.current?.select()
```

### Persist Value (no re-render)
```tsx
const renderCount = useRef(0)
renderCount.current += 1  // Doesn't cause re-render!

const prevValue = useRef(value)
useEffect(() => {
  prevValue.current = value  // Store previous
}, [value])
```

### Timer Reference
```tsx
const intervalRef = useRef<number | null>(null)

const start = () => {
  intervalRef.current = setInterval(() => {}, 1000)
}

const stop = () => {
  if (intervalRef.current) clearInterval(intervalRef.current)
}
```

### useRef vs useState
| useRef | useState |
|--------|----------|
| No re-render on change | Triggers re-render |
| `.current` to access | Direct access |
| For DOM / persist value | For UI state |

---

## Zod Validation Patterns ✨ NEW

### Basic Schema
```tsx
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Required').max(100),
  email: z.string().email('Invalid email'),
  age: z.number().min(0).max(120),
})
```

### String Validation
```tsx
z.string()
  .min(1, 'Required')
  .min(2, 'Too short')
  .max(100, 'Too long')
  .email('Invalid email')
  .regex(/pattern/, 'Invalid format')
```

### Number from String (forms)
```tsx
z.string()
  .min(1, 'Required')
  .refine(v => !isNaN(Number(v)), 'Must be number')
  .refine(v => Number(v) > 0, 'Must be positive')
```

### Validate Data
```tsx
// Throws error if invalid
schema.parse(data)

// Returns { success, data, error }
const result = schema.safeParse(data)
if (result.success) {
  console.log(result.data)
} else {
  console.log(result.error.errors)
}
```

### TypeScript Type from Schema
```tsx
type FormData = z.infer<typeof schema>
// Creates: { name: string, email: string, age: number }
```

---

## Props Patterns

### Basic Props
```tsx
interface Props {
  name: string
  price: number
  onDelete: (id: number) => void
}

function Product({ name, price, onDelete }: Props) {
  return <div onClick={() => onDelete(1)}>{name}</div>
}
```

### Optional Props
```tsx
interface Props {
  name: string
  description?: string  // Optional with ?
}
```

### Children Props
```tsx
interface Props {
  children: React.ReactNode
}

function Card({ children }: Props) {
  return <div className="card">{children}</div>
}
```

---

## Event Handling

### Click
```tsx
<button onClick={() => handleClick(id)}>Click</button>
```

### Input Change
```tsx
<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>
```

### Form Submit
```tsx
<form onSubmit={(e) => {
  e.preventDefault()  // Prevent page reload
  handleSubmit()
}}>
```

### Blur (for validation)
```tsx
<input onBlur={(e) => validateField(e.target.name)} />
```

---

## Conditional Rendering

### && Operator
```tsx
{isLoading && <Spinner />}
```

### Ternary
```tsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

### Early Return
```tsx
function Component({ data }) {
  if (!data) return <div>No data</div>
  return <div>{data.name}</div>
}
```

---

## List Rendering

### Basic
```tsx
{items.map(item => (
  <Item key={item.id} {...item} />
))}
```

### With Index (only if no unique id)
```tsx
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
```

---

## TypeScript Tips

### Interface for Props
```tsx
interface ProductProps {
  id: number
  name: string
  price: number
}
```

### Type for Arrays
```tsx
const [products, setProducts] = useState<Product[]>([])
```

### Event Types
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value)
}
```

### Ref Types
```tsx
const inputRef = useRef<HTMLInputElement>(null)
const divRef = useRef<HTMLDivElement>(null)
```

---

## Built-in vs External

### React Built-in Hooks
```tsx
import { useState, useEffect, useContext, useReducer, useRef } from 'react'
```

### External Libraries
```tsx
// Routing
import { useParams, useNavigate } from 'react-router-dom'

// Validation
import { z } from 'zod'

// Future: Data fetching
import { useQuery } from '@tanstack/react-query'
```

---

## Common Mistakes ❌

| Mistake | Fix |
|---------|-----|
| `class="..."` | `className="..."` |
| Forgetting key | `key={item.id}` |
| Mutating state directly | Use setter with spread |
| Missing dependency in useEffect | Add to dependency array |
| Infinite loop in useEffect | Check dependencies |
| Mutating ref and expecting re-render | Use useState for UI updates |
| Calling hooks conditionally | Always call at top level |

---

## Tailwind Quick Reference

### Spacing
- `p-4` = padding 1rem
- `m-4` = margin 1rem
- `px-4` = padding-left/right
- `py-4` = padding-top/bottom
- `gap-4` = gap between flex/grid items

### Flexbox
- `flex` = display: flex
- `justify-center` = justify-content: center
- `items-center` = align-items: center
- `flex-col` = flex-direction: column

### Grid
- `grid` = display: grid
- `grid-cols-3` = 3 columns
- `md:grid-cols-2` = 2 columns on medium screens

### Colors
- `bg-blue-500` = background blue
- `text-white` = white text
- `hover:bg-blue-600` = darker on hover
- `border-red-500` = red border (validation error)

### Responsive
- `sm:` = 640px+
- `md:` = 768px+
- `lg:` = 1024px+
- `xl:` = 1280px+
