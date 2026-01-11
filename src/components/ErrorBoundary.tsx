import { Component, ReactNode } from 'react'

/**
 * ERROR BOUNDARY
 * 
 * Catches JavaScript errors anywhere in child component tree,
 * logs those errors, and displays a fallback UI.
 * 
 * JAVA COMPARISON:
 * Like a try-catch block for your entire component tree:
 * 
 * try {
 *     renderComponent();
 * } catch (Exception e) {
 *     showErrorPage();
 *     logError(e);
 * }
 * 
 * NOTE: Must be a CLASS component (hooks don't support error boundaries yet)
 */

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  // Called when an error is thrown in a child component
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  // Called after an error has been thrown
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error('Error Boundary caught an error:', error)
    console.error('Component stack:', errorInfo.componentStack)
  }

  // Reset error state
  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
            <div className="text-6xl mb-4">💥</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              An unexpected error occurred. Please try again.
            </p>
            {this.state.error && (
              <p className="text-sm text-red-500 mb-4 p-2 bg-red-50 rounded">
                {this.state.error.message}
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

/**
 * USAGE:
 * 
 * // Wrap your app or specific sections
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * 
 * // With custom fallback
 * <ErrorBoundary fallback={<div>Custom error message</div>}>
 *   <RiskyComponent />
 * </ErrorBoundary>
 * 
 * WHAT IT CATCHES:
 * ✅ Errors during rendering
 * ✅ Errors in lifecycle methods
 * ✅ Errors in constructors
 * 
 * WHAT IT DOESN'T CATCH:
 * ❌ Event handlers (use try-catch)
 * ❌ Async code (use try-catch)
 * ❌ Server-side rendering
 * ❌ Errors in the error boundary itself
 */
