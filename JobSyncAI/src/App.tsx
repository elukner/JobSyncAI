import { useState } from 'react'
import AuthForm from './components/auth/AuthForm'
import { Navigate } from 'react-router-dom'

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
