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

---

## Common Mistakes ❌

| Mistake | Fix |
|---------|-----|
| `class="..."` | `className="..."` |
| Forgetting key | `key={item.id}` |
| Mutating state directly | Use setter with spread |
| Missing dependency in useEffect | Add to dependency array |
| Infinite loop in useEffect | Check dependencies |

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

### Responsive
- `sm:` = 640px+
- `md:` = 768px+
- `lg:` = 1024px+
- `xl:` = 1280px+
