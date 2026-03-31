import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
       <h1 className="text-center pt-4 text-3xl">JobSyncAI</h1>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider> 
    </>
  </StrictMode>,
)
