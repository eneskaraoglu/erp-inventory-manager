import { useState } from 'react'

/**
 * EXERCISE 3: Create Your Own useToggle Hook
 * 
 * YOUR TASK: 
 * 1. Uncomment the useToggle function below
 * 2. Fill in the missing code
 * 3. Test it with the buttons
 */

// ===========================================
// TODO: Complete this custom hook!
// ===========================================
function useToggle(initialValue: boolean = false): [boolean, () => void] {
  // STEP 1: Create state with initialValue
  const [value, setValue] = useState(initialValue)
  
  // STEP 2: Create toggle function that flips the value
  const toggle = () => {
    setValue(prev => !prev)  // !true = false, !false = true
  }
  
  // STEP 3: Return array with value and toggle function
  return [value, toggle]
}

// ===========================================
// Component to test your hook
// ===========================================
function UseTogglePractice() {
  // Using our custom hook!
  const [isModalOpen, toggleModal] = useToggle(false)
  const [isDarkMode, toggleDarkMode] = useToggle(false)
  const [isMenuOpen, toggleMenu] = useToggle(true)  // starts true!

  return (
    <div className={`p-8 max-w-md mx-auto min-h-screen ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
      <h1 className="text-2xl font-bold mb-6">useToggle Practice</h1>
      
      {/* Toggle 1: Modal */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <div className="flex justify-between items-center">
          <span className={isDarkMode ? 'text-gray-800' : ''}>Modal: <strong>{isModalOpen ? 'OPEN' : 'CLOSED'}</strong></span>
          <button 
            onClick={toggleModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Toggle Modal
          </button>
        </div>
        {isModalOpen && (
          <div className="mt-4 p-4 bg-white border-2 border-blue-500 rounded">
            🎉 Modal Content Here!
          </div>
        )}
      </div>

      {/* Toggle 2: Dark Mode */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <div className="flex justify-between items-center">
          <span className={isDarkMode ? 'text-gray-800' : ''}>Theme: <strong>{isDarkMode ? 'DARK' : 'LIGHT'}</strong></span>
          <button 
            onClick={toggleDarkMode}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Toggle Theme
          </button>
        </div>
      </div>

      {/* Toggle 3: Menu */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <div className="flex justify-between items-center">
          <span className={isDarkMode ? 'text-gray-800' : ''}>Menu: <strong>{isMenuOpen ? 'VISIBLE' : 'HIDDEN'}</strong></span>
          <button 
            onClick={toggleMenu}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Toggle Menu
          </button>
        </div>
        {isMenuOpen && (
          <ul className="mt-4 space-y-2">
            <li className="p-2 bg-white rounded text-gray-800">📦 Products</li>
            <li className="p-2 bg-white rounded text-gray-800">👥 Customers</li>
            <li className="p-2 bg-white rounded text-gray-800">📊 Dashboard</li>
          </ul>
        )}
      </div>

      {/* Code Reference */}
      <div className="bg-yellow-100 p-4 rounded text-sm">
        <p className="font-bold text-gray-800">💡 useToggle Hook Pattern:</p>
        <pre className="bg-white p-2 rounded mt-2 text-gray-800 overflow-x-auto">
{`function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = () => setValue(prev => !prev)
  
  return [value, toggle]
}

// Usage:
const [isOpen, toggleOpen] = useToggle()
toggleOpen()  // false → true
toggleOpen()  // true → false`}
        </pre>
      </div>
    </div>
  )
}

export default UseTogglePractice
