# Session 9 - AG Grid Integration
**Date:** January 12, 2026  
**Duration:** ~45 minutes  
**Topic:** Professional Data Grid for All Modules

---

## 🎯 Session Goals - ✅ All Completed!

- [x] Install AG Grid (v35)
- [x] Create CustomersGridPage with AG Grid
- [x] Create ProductsGridPage with AG Grid
- [x] Create UsersGridPage with AG Grid
- [x] Learn ColDef (column definitions)
- [x] Learn custom cell renderers
- [x] Learn cell styling (conditional colors)
- [x] Add sorting, filtering, pagination

---

## ✅ Concepts Learned

### AG Grid - Java Comparison

| AG Grid | Purpose | Java Equivalent |
|---------|---------|-----------------|
| `AgGridReact` | Grid component | JTable |
| `ColDef[]` | Column definitions | TableColumn[] |
| `rowData` | Data array | TableModel data |
| `cellRenderer` | Custom cell content | TableCellRenderer |
| `cellStyle` | Conditional styling | Custom renderer |
| `valueFormatter` | Format display value | toString() override |
| `onRowClicked` | Row click handler | ListSelectionListener |
| `pagination` | Page through data | Custom pagination |

### AG Grid v35 Setup (Important!)

```tsx
// v35+ requires module registration
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import type { ColDef } from 'ag-grid-community'  // Use 'type' import!

ModuleRegistry.registerModules([AllCommunityModule])
```

### Column Definition Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `field` | Data property | `field: 'name'` |
| `headerName` | Column header | `headerName: 'Name'` |
| `width` | Fixed width | `width: 100` |
| `flex` | Flexible width | `flex: 1` |
| `sortable` | Enable sorting | `sortable: true` |
| `filter` | Enable filtering | `filter: 'agTextColumnFilter'` |
| `cellRenderer` | Custom component | `cellRenderer: MyRenderer` |
| `cellStyle` | Conditional style | `cellStyle: (p) => ({...})` |
| `valueFormatter` | Format value | `valueFormatter: (p) => ...` |

### Filter Types

| Type | Use For |
|------|---------|
| `agTextColumnFilter` | Text columns |
| `agNumberColumnFilter` | Number columns |
| `agDateColumnFilter` | Date columns |

---

## 🛠️ Features Built

### ProductsGridPage ✅
| Feature | Description |
|---------|-------------|
| All columns | ID, Name, Category, Price, Stock |
| Stock colors | Red (0), Orange (<10), Green (10+) |
| Price formatting | `$99.00` format |
| Add to Cart | Button in actions column |
| Edit/Delete | Action buttons |

### CustomersGridPage ✅
| Feature | Description |
|---------|-------------|
| All columns | ID, Name, Email, Phone, Company |
| Company fallback | Shows "N/A" if empty |
| Edit/Delete | Action buttons |

### UsersGridPage ✅
| Feature | Description |
|---------|-------------|
| All columns | ID, Username, Email, Full Name, Role, Status, Created |
| Role badges | Admin (red), Manager (blue), User (gray) |
| Status colors | Active (green), Inactive (red) |
| Date formatting | Formatted created_at |
| Edit/Delete | Action buttons |

---

## 📁 Files Created/Modified

```
✨ NEW FILES:
src/pages/ProductsGridPage.tsx           # Products AG Grid
src/pages/Customer/CustomersGridPage.tsx # Customers AG Grid
src/pages/User/UsersGridPage.tsx         # Users AG Grid

📝 MODIFIED FILES:
src/App.tsx                              # Added grid routes
src/pages/ProductsPage.tsx               # Added "Grid View" button
src/pages/Customer/CustomersPage.tsx     # Added "Grid View" button
src/pages/User/UsersPage.tsx             # Added "Grid View" button
package.json                             # Added ag-grid dependencies
```

---

## 🔗 Routes

| Module | Card View | Grid View |
|--------|-----------|-----------|
| Products | `/products` | `/products/grid` |
| Customers | `/customers` | `/customers/grid` |
| Users | `/users` | `/users/grid` |

---

## 💡 Key Patterns

### 1. Basic AG Grid Setup (v35)
```tsx
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import type { ColDef } from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

<div style={{ height: 500 }}>
  <AgGridReact
    rowData={data}
    columnDefs={columnDefs}
    pagination={true}
    paginationPageSize={10}
  />
</div>
```

### 2. Column with Conditional Styling
```tsx
{
  field: 'stock',
  cellStyle: (params) => {
    if (params.value <= 0) return { color: 'red' }
    if (params.value < 10) return { color: 'orange' }
    return { color: 'green' }
  }
}
```

### 3. Custom Cell Renderer
```tsx
function ActionRenderer(props: ICellRendererParams<Product>) {
  const product = props.data
  return (
    <button onClick={() => handleEdit(product)}>Edit</button>
  )
}

// Use in column
{ cellRenderer: ActionRenderer }
```

### 4. Value Formatter
```tsx
{
  field: 'price',
  valueFormatter: (params) => `$${params.value?.toFixed(2)}`
}
```

---

## 📦 Installation

```bash
npm install ag-grid-react ag-grid-community
```

---

## 🎓 AG Grid vs Card View

| Aspect | Card View | Grid View |
|--------|-----------|-----------|
| Best for | Visual browsing | Data analysis |
| Mobile | ✅ Responsive | ⚠️ Scroll needed |
| Sorting | Manual | ✅ Built-in |
| Filtering | Search only | ✅ Per-column |
| Data density | Low | High |
| Actions | Visible | In row |

**Use Cards:** When visual presentation matters (e.g., product catalog)
**Use Grid:** When data analysis matters (e.g., inventory management, reports)

---

## 📊 Progress Update

```
Session 9: AG Grid       [██████████] 100% ✅
─────────────────────────────────────────────
Total Sessions:          9 completed
Total Time:              ~16 hours
```

---

## 🏆 Achievement Unlocked!

| Badge | Description |
|-------|-------------|
| 📊 Grid Master | Implemented AG Grid for all modules |
| 🎨 Cell Stylist | Added conditional cell styling |
| 🔧 Custom Renderer | Built action button renderers |

---

## 📈 Complete Feature Matrix

| Feature | Products | Customers | Users |
|---------|:--------:|:---------:|:-----:|
| Card View | ✅ | ✅ | ✅ |
| Grid View | ✅ | ✅ | ✅ |
| Sorting | ✅ | ✅ | ✅ |
| Filtering | ✅ | ✅ | ✅ |
| Pagination | ✅ | ✅ | ✅ |
| Search | ✅ | ✅ | ✅ |
| CRUD | ✅ | ✅ | ✅ |
| Conditional Styling | ✅ | - | ✅ |

---

## 🎉 Session Complete!

You now have professional data grids for all modules with:
- Sorting & filtering
- Pagination
- Conditional styling
- Custom action buttons
- Both card and grid views

**Great job!** 🚀
