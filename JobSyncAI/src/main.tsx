import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
       <h1 className="text-center pt-4 text-3xl">JobSyncAINew</h1>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider> 
    </>
  </StrictMode>,
)
