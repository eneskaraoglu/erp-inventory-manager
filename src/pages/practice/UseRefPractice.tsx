import { useRef, useState, useEffect } from 'react'

/**
 * useRef PRACTICE PAGE
 * 
 * useRef returns a mutable object: { current: value }
 * This object persists across re-renders!
 * 
 * JAVA COMPARISON:
 * ----------------
 * Like a class field that doesn't trigger repaint:
 * 
 * public class MyPanel extends JPanel {
 *     private JTextField nameField;  // Reference to component
 *     private int renderCount = 0;   // Value that persists
 *     
 *     public void focusName() {
 *         nameField.requestFocus();  // Direct DOM access
 *     }
 * }
 * 
 * TWO MAIN USES:
 * 1. DOM Reference - Access actual DOM elements
 * 2. Persist Value - Store value without causing re-render
 */

function UseRefPractice() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">🎯 useRef Practice</h1>
      
      <Example1_FocusInput />
      <Example2_PreviousValue />
      <Example3_RenderCounter />
      <Example4_StopwatchTimer />
      <Example5_ScrollToElement />
    </div>
  )
}

// =====================================================
// EXAMPLE 1: Focus Input (Most Common Use!)
// =====================================================
function Example1_FocusInput() {
  /**
   * useRef<HTMLInputElement>(null)
   * 
   * - Creates { current: null }
   * - We attach it to <input ref={inputRef}>
   * - React fills in current with actual DOM element
   * - Now we can call inputRef.current.focus()!
   */
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    // inputRef.current is the actual <input> DOM element!
    inputRef.current?.focus()
  }

  const handleSelect = () => {
    inputRef.current?.select()  // Select all text
  }

  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="font-semibold mb-2">Example 1: Focus Input</h2>
      <p className="text-gray-600 text-sm mb-4">
        useRef gives direct access to DOM element (like Swing's component reference)
      </p>
      
      <div className="flex gap-2">
        <input
          ref={inputRef}  // 👈 Attach ref to element
          type="text"
          defaultValue="Click buttons to control me!"
          className="border px-3 py-2 rounded flex-1"
        />
        <button
          onClick={handleFocus}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Focus
        </button>
        <button
          onClick={handleSelect}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Select All
        </button>
      </div>
      
      <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
{`const inputRef = useRef<HTMLInputElement>(null)

<input ref={inputRef} />

inputRef.current?.focus()  // Direct DOM access!`}
      </pre>
    </div>
  )
}

// =====================================================
// EXAMPLE 2: Previous Value
// =====================================================
function Example2_PreviousValue() {
  const [count, setCount] = useState(0)
  
  /**
   * useRef to store PREVIOUS value
   * 
   * Key insight: useRef.current changes do NOT cause re-render!
   * So we can update it in useEffect after each render.
   */
  const prevCountRef = useRef<number>(0)
  
  useEffect(() => {
    // After render, save current value as "previous" for next render
    prevCountRef.current = count
  }, [count])

  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="font-semibold mb-2">Example 2: Previous Value</h2>
      <p className="text-gray-600 text-sm mb-4">
        useRef can store previous state value (persists across renders)
      </p>
      
      <div className="space-y-2">
        <p>Current count: <strong>{count}</strong></p>
        <p>Previous count: <strong>{prevCountRef.current}</strong></p>
        
        <button
          onClick={() => setCount(c => c + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
      
      <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
{`const prevCountRef = useRef(0)

useEffect(() => {
  prevCountRef.current = count  // Save after render
}, [count])

// prevCountRef.current = previous value!`}
      </pre>
    </div>
  )
}

// =====================================================
// EXAMPLE 3: Render Counter (Debug Tool)
// =====================================================
function Example3_RenderCounter() {
  const [, forceRender] = useState(0)
  
  /**
   * Count renders WITHOUT causing more renders!
   * 
   * If we used useState for this, incrementing would cause
   * another render, which would increment, which would render...
   * Infinite loop! 💥
   * 
   * useRef doesn't trigger re-render, perfect for this!
   */
  const renderCount = useRef(0)
  
  // This runs every render
  renderCount.current += 1

  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="font-semibold mb-2">Example 3: Render Counter</h2>
      <p className="text-gray-600 text-sm mb-4">
        useRef changes don't trigger re-render (unlike useState)
      </p>
      
      <div className="space-y-2">
        <p>This component rendered: <strong>{renderCount.current}</strong> times</p>
        
        <button
          onClick={() => forceRender(n => n + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Force Re-render
        </button>
      </div>
      
      <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
{`const renderCount = useRef(0)
renderCount.current += 1  // No re-render!

// vs useState - would cause infinite loop:
// const [count, setCount] = useState(0)
// setCount(c => c + 1)  // 💥 Infinite!`}
      </pre>
    </div>
  )
}

// =====================================================
// EXAMPLE 4: Stopwatch with Timer ID
// =====================================================
function Example4_StopwatchTimer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  
  /**
   * Store interval ID in useRef
   * 
   * Why not useState?
   * - We don't need to display the interval ID
   * - We just need to store it to clear later
   * - Changing it shouldn't cause re-render
   */
  const intervalRef = useRef<number | null>(null)

  const start = () => {
    if (isRunning) return
    
    setIsRunning(true)
    intervalRef.current = window.setInterval(() => {
      setTime(t => t + 10)  // Update every 10ms
    }, 10)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }

  const reset = () => {
    stop()
    setTime(0)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Format time as MM:SS.ms
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="font-semibold mb-2">Example 4: Stopwatch Timer</h2>
      <p className="text-gray-600 text-sm mb-4">
        useRef stores interval ID (no re-render needed for ID changes)
      </p>
      
      <div className="space-y-4">
        <p className="text-4xl font-mono">{formatTime(time)}</p>
        
        <div className="flex gap-2">
          <button
            onClick={start}
            disabled={isRunning}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Start
          </button>
          <button
            onClick={stop}
            disabled={!isRunning}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
      
      <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
{`const intervalRef = useRef<number | null>(null)

// Start: save interval ID
intervalRef.current = setInterval(...)

// Stop: use ID to clear
clearInterval(intervalRef.current)`}
      </pre>
    </div>
  )
}

// =====================================================
// EXAMPLE 5: Scroll to Element
// =====================================================
function Example5_ScrollToElement() {
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="font-semibold mb-2">Example 5: Scroll to Element</h2>
      <p className="text-gray-600 text-sm mb-4">
        useRef for scrolling to specific sections (like anchor links)
      </p>
      
      {/* Navigation */}
      <div className="flex gap-2 mb-4 sticky top-0 bg-white py-2">
        <button
          onClick={() => scrollTo(section1Ref)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          → Section 1
        </button>
        <button
          onClick={() => scrollTo(section2Ref)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          → Section 2
        </button>
        <button
          onClick={() => scrollTo(section3Ref)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          → Section 3
        </button>
      </div>
      
      {/* Scrollable Content */}
      <div className="h-48 overflow-y-auto border rounded">
        <div ref={section1Ref} className="h-40 bg-red-100 p-4">
          <h3 className="font-bold">Section 1</h3>
          <p>Red section content</p>
        </div>
        <div ref={section2Ref} className="h-40 bg-green-100 p-4">
          <h3 className="font-bold">Section 2</h3>
          <p>Green section content</p>
        </div>
        <div ref={section3Ref} className="h-40 bg-blue-100 p-4">
          <h3 className="font-bold">Section 3</h3>
          <p>Blue section content</p>
        </div>
      </div>
      
      <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
{`const sectionRef = useRef<HTMLDivElement>(null)

<div ref={sectionRef}>...</div>

sectionRef.current?.scrollIntoView({ behavior: 'smooth' })`}
      </pre>
    </div>
  )
}

export default UseRefPractice
