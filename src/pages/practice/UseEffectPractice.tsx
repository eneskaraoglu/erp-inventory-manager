import { useState, useEffect } from 'react'

/**
 * EXERCISE 1: Understanding useEffect Dependency Array
 * 
 * Open browser console (F12) and watch the logs!
 * 
 * YOUR TASK: Predict what will be logged, then verify
 */

function UseEffectPractice() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // ===========================================
  // EFFECT A: Empty dependency array []
  // ===========================================
  useEffect(() => {
    console.log('🟢 EFFECT A: I run ONCE on mount')
  }, [])  // Empty array = only on first render

  // ===========================================
  // EFFECT B: With dependency [count]
  // ===========================================
  useEffect(() => {
    console.log('🔵 EFFECT B: Count changed to:', count)
  }, [count])  // Runs when count changes

  // ===========================================
  // EFFECT C: With dependency [name]
  // ===========================================
  useEffect(() => {
    console.log('🟡 EFFECT C: Name changed to:', name)
  }, [name])  // Runs when name changes

  // ===========================================
  // EFFECT D: NO dependency array (DANGEROUS!)
  // ===========================================
  // ⚠️ Uncomment this to see infinite loop (then comment back!)
  // useEffect(() => {
  //   console.log('🔴 EFFECT D: I run on EVERY render!')
  // })

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">useEffect Practice</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-lg">Count: <strong>{count}</strong></p>
        <button 
          onClick={() => setCount(count + 1)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Increment Count
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-lg">Name: <strong>{name || '(empty)'}</strong></p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name..."
          className="mt-2 w-full p-2 border rounded"
        />
      </div>

      <div className="bg-yellow-100 p-4 rounded text-sm">
        <p className="font-bold">📋 Instructions:</p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Open browser console (F12)</li>
          <li>Refresh the page - which effects run?</li>
          <li>Click "Increment Count" - which effects run?</li>
          <li>Type in the name field - which effects run?</li>
        </ol>
      </div>

      {/* QUIZ SECTION */}
      <div className="mt-6 bg-blue-100 p-4 rounded">
        <p className="font-bold">🧠 Quiz: Fill in the blank</p>
        <pre className="bg-white p-2 rounded mt-2 text-sm">
{`useEffect(() => {
  fetchData()
}, ____)  // Run only ONCE on mount`}
        </pre>
        <p className="mt-2 text-sm">Answer: <code>[]</code> (empty array)</p>
      </div>
    </div>
  )
}

export default UseEffectPractice
