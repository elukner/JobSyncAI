import { useState } from 'react'
import AuthForm from './components/auth/AuthForm'
import { Navigate } from 'react-router-dom'

/**
 * App component that serves as the main entry point of the application.
 * Currently redirects all users to the login page.
 * 
 * @returns {JSX.Element} A centered flex container with a navigation redirect to the login route.
 */
function App() {
  

  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
      <Navigate to="/login" />
      </div>
    </>
  )
}

export default App
