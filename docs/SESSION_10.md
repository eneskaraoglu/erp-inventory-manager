# Session 10 - Dashboard with Charts 📊
**Date:** January 15, 2026  
**Duration:** ~1 hour  
**Topic:** Data Visualization with Recharts

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Learn Recharts library
- [x] Understand data transformation for charts
- [x] Deep dive into useMemo (performance)
- [x] Build: Bar Chart, Pie Chart, Line Chart
- [x] Add Top Products by Value chart (practice)
- [x] Component composition pattern

---

## ✅ Concepts Learned

### 1. Recharts - Java Comparison

| Recharts | Purpose | Java Equivalent |
|----------|---------|-----------------|
| `<BarChart>` | Vertical bar chart | JFreeChart BarChart |
| `<PieChart>` | Circular chart | JFreeChart PieChart |
| `<LineChart>` | Trend line chart | JFreeChart LineChart |
| `<ResponsiveContainer>` | Auto-resize | Layout manager |
| `<Tooltip>` | Hover info | MouseListener |
| `<Legend>` | Chart legend | ChartPanel legend |
| `layout="vertical"` | Horizontal bars | Orientation setting |

### 2. useMemo - Performance Hook

**WHY useMemo?**
```
WITHOUT useMemo:
Component renders → Calculate stats → Render
Component re-renders → Calculate stats AGAIN → Render
...expensive!

WITH useMemo:
Component renders → Calculate stats → Cache result → Render
Component re-renders → Use cached result → Render
...fast! Only recalculates when dependencies change
```

**JAVA EQUIVALENT:**
```java
@Cacheable(value = "categoryStats", key = "#products.hashCode()")
public List<CategoryStat> getCategoryStats(List<Product> products) {
    return products.stream()
        .collect(groupingBy(Product::getCategory, counting()))
        .entrySet().stream()
        .map(e -> new CategoryStat(e.getKey(), e.getValue()))
        .toList();
}
```

**REACT:**
```tsx
const categoryData = useMemo(() => {
  return products.reduce((acc, product) => {
    const category = product.category || 'Uncategorized'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})
}, [products])  // ← Dependency array
```

### 3. When to Use useMemo

| Use useMemo ✅ | Don't Use ❌ |
|----------------|-------------|
| Complex calculations | Simple operations |
| Large array processing | Small arrays |
| Data transformation | Direct value access |
| Chart data preparation | Basic math |

**Rule of Thumb:** If calculation takes >1ms, consider useMemo

### 4. Data Transformation Pattern

```tsx
// API returns this:
const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
  { id: 2, name: 'Phone', category: 'Electronics', price: 599 },
]

// Chart needs this:
const chartData = [
  { name: 'Electronics', count: 2 },
]

// Transformation with useMemo:
const chartData = useMemo(() => {
  const grouped = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})
  return Object.entries(grouped).map(([name, count]) => ({ name, count }))
}, [products])
```

---

## 🛠️ Features Built

### Charts Implemented

| Chart | Type | Data Source | Purpose |
|-------|------|-------------|---------|
| Products by Category | Bar (vertical) | Grouped count | Compare categories |
| Stock Distribution | Pie | Filtered counts | Show proportions |
| Top 5 Products by Value | Bar (horizontal) | Calculated & sorted | Highlight top items |
| Weekly Sales Trend | Line (dual axis) | Simulated | Show trends |

### Component Breakdown

```
DashboardWithCharts.tsx
├── Stats Row (6 StatCard components)
├── Charts Row 1
│   ├── Bar Chart (Products by Category)
│   └── Pie Chart (Stock Distribution)
├── Charts Row 2
│   └── Bar Chart (Top 5 Products by Value) ← NEW!
├── Charts Row 3
│   └── Line Chart (Weekly Sales)
└── Quick Actions Row (3 QuickActionCard components)
```

---

## 📁 Files Created/Modified

```
✨ NEW FILES:
src/pages/DashboardWithCharts.tsx    # Dashboard with 4 chart types
docs/SESSION_10.md                   # This file

📝 MODIFIED FILES:
src/App.tsx                          # Added routes
  - / → DashboardWithCharts (new default)
  - /dashboard-old → Dashboard (original)
docs/CONCEPTS.md                     # Added Recharts patterns
docs/PROGRESS.md                     # Updated progress
```

---

## 📊 Recharts Components Explained

### Bar Chart (Vertical)
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={categoryData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="count" fill="#3B82F6" />
  </BarChart>
</ResponsiveContainer>
```

### Bar Chart (Horizontal)
```tsx
<BarChart data={topProducts} layout="vertical">
  <XAxis type="number" />
  <YAxis type="category" dataKey="name" width={120} />
  <Bar dataKey="value" fill="#10B981" />
</BarChart>
```

### Pie Chart
```tsx
<PieChart>
  <Pie
    data={stockDistribution}
    cx="50%" cy="50%"
    outerRadius={100}
    dataKey="value"
    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
  >
    {data.map((_, i) => (
      <Cell key={i} fill={COLORS[i % COLORS.length]} />
    ))}
  </Pie>
  <Legend />
</PieChart>
```

### Line Chart (Dual Axis)
```tsx
<LineChart data={salesTrend}>
  <XAxis dataKey="day" />
  <YAxis yAxisId="left" />
  <YAxis yAxisId="right" orientation="right" />
  <Line yAxisId="left" dataKey="sales" stroke="#3B82F6" />
  <Line yAxisId="right" dataKey="orders" stroke="#10B981" />
</LineChart>
```

---

## 💡 Key Patterns

### 1. Always Wrap Charts in ResponsiveContainer
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>...</BarChart>
</ResponsiveContainer>
```

### 2. Handle Empty Data
```tsx
{data.length > 0 ? (
  <BarChart data={data}>...</BarChart>
) : (
  <div>No data to display</div>
)}
```

### 3. Format Values in Tooltip
```tsx
<Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
```

### 4. Custom Colors for Pie Slices
```tsx
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

{data.map((_, index) => (
  <Cell fill={COLORS[index % COLORS.length]} />
))}
```

---

## 🎓 useMemo Deep Dive

### Dependency Array Rules

| Dependency Array | Behavior |
|------------------|----------|
| `[]` | Calculate once, cache forever |
| `[products]` | Recalculate when products changes |
| `[products, filter]` | Recalculate when either changes |
| (no array) | ❌ NEVER do this |

### Example: Top Products Calculation
```tsx
const topProductsByValue = useMemo(() => {
  return products
    .map(p => ({
      name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
      value: p.price * p.stock,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
}, [products])
```

---

## 🔗 Routes Summary

| URL | Page | Description |
|-----|------|-------------|
| `/` | DashboardWithCharts | New dashboard with 4 charts |
| `/dashboard-old` | Dashboard | Original simple dashboard |

---

## 📊 Progress Update

```
Session 10: Charts       [██████████] 100% ✅
─────────────────────────────────────────────
Total Sessions:          10 completed
Total Time:              ~17.25 hours
```

---

## 🏆 Achievements Unlocked!

| Badge | Description |
|-------|-------------|
| 📊 Chart Master | Built 4 different chart types |
| ⚡ Memo Expert | Used useMemo for performance |
| 🔄 Data Transformer | Reshaped API data for charts |

---

## 📈 Skills Updated

| Skill | Level | Notes |
|-------|-------|-------|
| useMemo | ⭐⭐⭐⭐ | Performance caching |
| Recharts | ⭐⭐⭐⭐ | Chart library |
| Data Transformation | ⭐⭐⭐⭐⭐ | Array → Chart format |
| Component Composition | ⭐⭐⭐⭐⭐ | Breaking into pieces |

---

## ➡️ Next Session: Forms & Testing

Topics to cover:
1. **React Hook Form** - Better form handling
2. **Form validation patterns** - Advanced Zod usage
3. **Unit Testing** - Jest & React Testing Library
4. **Component Testing** - Test user interactions

---

## 📚 Resources

- [Recharts Documentation](https://recharts.org/en-US/)
- [useMemo React Docs](https://react.dev/reference/react/useMemo)

---

**Session 10 Complete! 🎉**
