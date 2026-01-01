# Session 1 - React Fundamentals
**Date:** December 31, 2025  
**Duration:** ~2 hours  
**Phase:** 1 - Fundamentals  

---

## 🎯 Session Goals
- Understand React component basics
- Learn useState and useEffect hooks
- Build first working components
- Implement basic CRUD operations

---

## ✅ Concepts Learned

### 1. Components
- **What:** Reusable UI building blocks
- **Java Equivalent:** Like a JPanel class
- **Key Point:** Function that returns JSX

```tsx
function ProductCard({ name, price }: Props) {
  return <div>{name} - ${price}</div>
}
```

### 2. Props
- **What:** Data passed from parent to child
- **Java Equivalent:** Constructor parameters
- **Key Point:** Read-only, flows down

### 3. useState
- **What:** Hook for component state
- **Java Equivalent:** Class fields + PropertyChangeListener
- **Key Point:** Changing state triggers re-render

```tsx
const [count, setCount] = useState(0)
// setCount(newValue) triggers re-render
```

### 4. useEffect
- **What:** Handle side effects (API calls, localStorage, etc.)
- **Java Equivalent:** componentDidMount / componentDidUpdate
- **Key Point:** Dependency array controls when it runs

```tsx
useEffect(() => {
  localStorage.setItem('data', JSON.stringify(data))
}, [data])  // Runs when 'data' changes
```

### 5. JSX
- **What:** HTML-like syntax in JavaScript
- **Java Equivalent:** Swing's add() calls, but declarative
- **Key Point:** Use `className` not `class`

### 6. List Rendering
- **What:** Using .map() to render arrays
- **Java Equivalent:** for loop + panel.add()
- **Key Point:** Always use unique `key` prop

```tsx
{products.map(p => <ProductCard key={p.id} {...p} />)}
```

---

## 🛠️ Features Built

| Feature | Status | Description |
|---------|--------|-------------|
| ProductCard | ✅ | Display single product with styling |
| Product List | ✅ | Grid of products using .map() |
| Search/Filter | ✅ | Live search with useState |
| Add Product Form | ✅ | Multiple inputs, form handling |
| Delete Product | ✅ | Remove from list with filter() |
| LocalStorage | ✅ | Data persistence with useEffect |

---

## 📁 Files Created

```
src/
├── App.tsx              # Main component with state
├── components/
│   ├── ProductCard.tsx  # Single product display
│   └── AddProductForm.tsx # Form for adding products
```

---

## 💡 Key Insights

1. **Declarative vs Imperative**
   - Swing: "Add this panel, then add this button, then..."
   - React: "Here's what the UI should look like given this data"

2. **State Triggers Render**
   - Regular variables don't cause re-render
   - Must use useState for reactive data

3. **Props are Immutable**
   - Never modify props directly
   - Call parent's function to update

4. **Keys are Important**
   - React uses keys to track list items
   - Without keys: performance issues + bugs

---

## ⚠️ Common Mistakes Made

| Mistake | Correct Way |
|---------|-------------|
| `class="..."` | `className="..."` |
| Forgetting key in map | `key={item.id}` |
| Direct state mutation | Use setter function |

---

## 📊 Self-Assessment

| Skill | Rating | Notes |
|-------|--------|-------|
| Components | ⭐⭐⭐⭐ | Good understanding |
| Props | ⭐⭐⭐⭐ | Comfortable |
| useState | ⭐⭐⭐⭐ | Need more practice |
| useEffect | ⭐⭐⭐ | Basics understood |
| Tailwind | ⭐⭐⭐ | Learning classes |
| TypeScript | ⭐⭐⭐ | Using interfaces |

---

## 🎉 Wins
- Built complete working app in one session!
- Understood React mental model
- Connected concepts to Java knowledge
- Data persists in LocalStorage

---

## 📚 Resources Used
- React.dev documentation
- Claude explanations with Java comparisons

---

## ➡️ Next Session Topics
- React Router (multiple pages)
- Edit Product (complete CRUD)
- Form Validation
- TypeScript improvements
