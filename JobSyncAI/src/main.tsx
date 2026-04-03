/**
 * Application entry point for JobSyncAI.
 * 
 * Renders the root React application with:
 * - StrictMode for development checks
 * - Application header
 * - AuthContextProvider for authentication state management
 * - RouterProvider for client-side routing
 * 
 * @remarks
 * This is the main.tsx file that bootstraps the React application
 * and mounts it to the DOM element with id "root".
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
       <h1 className="text-center pt-4 text-3xl">JobSyncAI</h1>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider> 
    </>
  </StrictMode>,
)
