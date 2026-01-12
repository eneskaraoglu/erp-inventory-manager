// ============================================
// PERFORMANCE PRACTICE - useMemo, useCallback, React.memo
// Understanding when and why to optimize
// ============================================

import { useState, useMemo, useCallback, memo } from 'react'

// ============================================
// 1. WITHOUT OPTIMIZATION - Re-calculates every render
// ============================================

function ExpensiveCalculation({ numbers }: { numbers: number[] }) {
  // This runs on EVERY render, even if numbers didn't change!
  console.log('🔴 ExpensiveCalculation running...')
  
  const sum = numbers.reduce((acc, n) => {
    // Simulate expensive work
    let result = acc
    for (let i = 0; i < 1000000; i++) {
      result = acc + n
    }
    return result
  }, 0)

  return <div>Sum (slow): {sum}</div>
}

// ============================================
// 2. WITH useMemo - Only recalculates when dependencies change
// ============================================

function OptimizedCalculation({ numbers }: { numbers: number[] }) {
  // useMemo = "remember this value until dependencies change"
  // Like @Cacheable in Spring
  const sum = useMemo(() => {
    console.log('🟢 OptimizedCalculation running...')
    
    return numbers.reduce((acc, n) => {
      let result = acc
      for (let i = 0; i < 1000000; i++) {
        result = acc + n
      }
      return result
    }, 0)
  }, [numbers])  // Only recalculate when 'numbers' changes

  return <div>Sum (fast with useMemo): {sum}</div>
}

// ============================================
// 3. CHILD COMPONENT - Re-renders when parent re-renders
// ============================================

function ChildComponent({ onClick }: { onClick: () => void }) {
  console.log('🔵 ChildComponent rendered')
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Click me (check console)
    </button>
  )
}

// ============================================
// 4. MEMOIZED CHILD - Only re-renders if props actually change
// ============================================

const MemoizedChild = memo(function MemoizedChild({ 
  onClick 
}: { 
  onClick: () => void 
}) {
  console.log('🟣 MemoizedChild rendered')
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-purple-500 text-white rounded"
    >
      Click me (memoized)
    </button>
  )
})

// ============================================
// 5. PRODUCT LIST - Real-world example
// ============================================

interface Product {
  id: number
  name: string
  price: number
  category: string
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Mouse', price: 29, category: 'Electronics' },
  { id: 3, name: 'Desk', price: 299, category: 'Furniture' },
  { id: 4, name: 'Chair', price: 199, category: 'Furniture' },
  { id: 5, name: 'Monitor', price: 449, category: 'Electronics' },
]

// ============================================
// MAIN PRACTICE COMPONENT
// ============================================

export default function PerformancePractice() {
  const [count, setCount] = useState(0)
  const [numbers] = useState([1, 2, 3, 4, 5])
  const [filter, setFilter] = useState('')
  const [products] = useState<Product[]>(sampleProducts)

  // ❌ BAD: Creates NEW function every render
  // This causes MemoizedChild to re-render even with React.memo!
  const handleClickBad = () => {
    console.log('Clicked!')
  }

  // ✅ GOOD: useCallback = "remember this function"
  // Same function reference unless dependencies change
  const handleClickGood = useCallback(() => {
    console.log('Clicked (memoized function)!')
  }, [])  // Empty deps = same function forever

  // ✅ useMemo for filtered list
  // Only filters when products OR filter changes
  const filteredProducts = useMemo(() => {
    console.log('🟡 Filtering products...')
    return products.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [products, filter])

  // ✅ useMemo for expensive calculation
  const totalValue = useMemo(() => {
    console.log('🟡 Calculating total...')
    return filteredProducts.reduce((sum, p) => sum + p.price, 0)
  }, [filteredProducts])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Performance Optimization</h1>

      {/* Counter to trigger re-renders */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="font-bold mb-2">Re-render Trigger</h2>
        <p className="text-sm text-gray-600 mb-2">
          Click to increment count and trigger re-render. Watch console!
        </p>
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Count: {count} (click to re-render)
        </button>
      </div>

      {/* useMemo Example */}
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h2 className="font-bold mb-2">1. useMemo - Memoize Values</h2>
        <p className="text-sm text-gray-600 mb-4">
          useMemo caches expensive calculations. Compare console logs!
        </p>
        <div className="space-y-2">
          <ExpensiveCalculation numbers={numbers} />
          <OptimizedCalculation numbers={numbers} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Without useMemo: calculates on EVERY render<br />
          💡 With useMemo: only calculates when 'numbers' changes
        </p>
      </div>

      {/* useCallback Example */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h2 className="font-bold mb-2">2. useCallback - Memoize Functions</h2>
        <p className="text-sm text-gray-600 mb-4">
          useCallback keeps the same function reference between renders.
        </p>
        <div className="flex gap-4">
          <div>
            <p className="text-xs mb-1">❌ New function every render:</p>
            <ChildComponent onClick={handleClickBad} />
          </div>
          <div>
            <p className="text-xs mb-1">✅ Same function (useCallback):</p>
            <MemoizedChild onClick={handleClickGood} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 MemoizedChild only re-renders with useCallback function!
        </p>
      </div>

      {/* React.memo Example */}
      <div className="p-4 bg-purple-50 rounded-lg">
        <h2 className="font-bold mb-2">3. React.memo - Memoize Components</h2>
        <p className="text-sm text-gray-600 mb-4">
          React.memo prevents re-render if props haven't changed.
        </p>
        <code className="text-xs bg-gray-200 p-2 rounded block">
          {`const MemoizedChild = memo(function Child({ onClick }) { ... })`}
        </code>
        <p className="text-xs text-gray-500 mt-2">
          💡 But it only works if props are the same reference!<br />
          💡 That's why we need useCallback for function props.
        </p>
      </div>

      {/* Real-world Example */}
      <div className="p-4 bg-green-50 rounded-lg">
        <h2 className="font-bold mb-2">4. Real Example: Product Filter</h2>
        <div className="mb-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search products..."
            className="px-3 py-2 border rounded w-full"
          />
        </div>
        <div className="space-y-2">
          {filteredProducts.map(p => (
            <div key={p.id} className="p-2 bg-white rounded shadow-sm">
              {p.name} - ${p.price}
            </div>
          ))}
        </div>
        <div className="mt-2 font-bold">
          Total: ${totalValue}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Filter and total only recalculate when filter/products change,<br />
          💡 NOT when count changes (check console)
        </p>
      </div>

      {/* Summary */}
      <div className="p-4 bg-gray-800 text-white rounded-lg">
        <h2 className="font-bold mb-2">📋 When to Use</h2>
        <table className="text-sm w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-1">Hook</th>
              <th className="text-left py-1">Use For</th>
              <th className="text-left py-1">Java Equivalent</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="py-1">useMemo</td>
              <td>Expensive calculations</td>
              <td>@Cacheable</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-1">useCallback</td>
              <td>Function props</td>
              <td>Method reference cache</td>
            </tr>
            <tr>
              <td className="py-1">React.memo</td>
              <td>Prevent child re-render</td>
              <td>shouldComponentUpdate</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Warning */}
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="font-bold text-red-800 mb-2">⚠️ Don't Over-Optimize!</h2>
        <p className="text-sm text-red-700">
          useMemo/useCallback have their own cost. Only use when:
        </p>
        <ul className="text-sm text-red-700 list-disc ml-5 mt-2">
          <li>Calculation is actually expensive</li>
          <li>You're passing callbacks to memoized children</li>
          <li>You've measured and found a performance problem</li>
        </ul>
      </div>
    </div>
  )
}
