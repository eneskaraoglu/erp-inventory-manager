import { useState } from 'react'

/**
 * EXERCISE 2: Understanding setState is Asynchronous
 * 
 * Open browser console (F12) and watch the logs!
 * 
 * YOUR TASK: Predict what will be logged, then verify
 */

function UseStatePractice() {
  const [count, setCount] = useState(0)

  // ===========================================
  // METHOD A: Direct value (WRONG for multiple updates)
  // ===========================================
  const incrementWrong = () => {
    console.log('--- WRONG WAY ---')
    console.log('Before setCount, count is:', count)
    
    setCount(count + 1)  // Schedules: count (0) + 1 = 1
    setCount(count + 1)  // Schedules: count (0) + 1 = 1 (count is STILL 0!)
    setCount(count + 1)  // Schedules: count (0) + 1 = 1 (count is STILL 0!)
    
    console.log('After setCount, count is:', count)  // Still 0!
    console.log('Expected: 3, Actual result: 1')
  }

  // ===========================================
  // METHOD B: Functional update (CORRECT)
  // ===========================================
  const incrementCorrect = () => {
    console.log('--- CORRECT WAY ---')
    console.log('Before setCount, count is:', count)
    
    setCount(prev => prev + 1)  // 0 → 1
    setCount(prev => prev + 1)  // 1 → 2
    setCount(prev => prev + 1)  // 2 → 3
    
    console.log('After setCount, count is:', count)  // Still shows old value in log!
    console.log('But the actual result will be: 3')
  }

  // ===========================================
  // METHOD C: Reset
  // ===========================================
  const reset = () => {
    setCount(0)
    console.log('--- RESET ---')
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">useState Async Practice</h1>
      
      <div className="bg-gray-100 p-6 rounded mb-6 text-center">
        <p className="text-4xl font-bold text-blue-600">{count}</p>
        <p className="text-gray-500">Current Count</p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={incrementWrong}
          className="w-full bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600"
        >
          ❌ Increment x3 (Wrong Way)
        </button>
        
        <button 
          onClick={incrementCorrect}
          className="w-full bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600"
        >
          ✅ Increment x3 (Correct Way)
        </button>
        
        <button 
          onClick={reset}
          className="w-full bg-gray-500 text-white px-4 py-3 rounded hover:bg-gray-600"
        >
          🔄 Reset to 0
        </button>
      </div>

      <div className="mt-6 bg-yellow-100 p-4 rounded text-sm">
        <p className="font-bold">📋 Instructions:</p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Open browser console (F12)</li>
          <li>Click "Wrong Way" - watch count only go to 1</li>
          <li>Reset, then click "Correct Way" - watch count go to 3</li>
          <li>Notice console.log shows OLD value even after setCount!</li>
        </ol>
      </div>

      {/* EXPLANATION */}
      <div className="mt-6 bg-blue-100 p-4 rounded text-sm">
        <p className="font-bold">💡 Key Lesson:</p>
        <pre className="bg-white p-2 rounded mt-2 overflow-x-auto">
{`// ❌ WRONG: Uses stale value
setCount(count + 1)
setCount(count + 1)  // count is still old!

// ✅ CORRECT: Uses previous value
setCount(prev => prev + 1)
setCount(prev => prev + 1)  // prev is updated!`}
        </pre>
      </div>
    </div>
  )
}

export default UseStatePractice
