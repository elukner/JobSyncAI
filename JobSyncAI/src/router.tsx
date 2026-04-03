import { createBrowserRouter } from 'react-router-dom'
import App from "./App"
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicOnlyRoute from './components/auth/PublicOnlyRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

/**
 * Browser router configuration for the application.
 * 
 * Defines the routing structure with the following routes:
 * - "/" - Main application entry point
 * - "/dashboard" - Protected dashboard page (requires authentication)
 * - "/login" - Public login page (only accessible when not authenticated)
 * - "/signup" - Public signup page (only accessible when not authenticated)
 * 
 * @constant
 * @type {ReturnType<typeof createBrowserRouter>}
 */
export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dashboard", element: (<ProtectedRoute><Dashboard /></ProtectedRoute>)},
  { path: "/login", element: (<PublicOnlyRoute><Login/></PublicOnlyRoute>)},
  { path: "/signup", element: (<PublicOnlyRoute><SignUp/></PublicOnlyRoute>)},
])