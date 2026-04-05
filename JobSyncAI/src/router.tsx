import { createBrowserRouter } from 'react-router-dom'
import App from "./App"
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicOnlyRoute from './components/auth/PublicOnlyRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'


/**
 * Browser router configuration for the JobSyncAI application.
 * 
 * Defines all application routes with their corresponding components and access protection levels.
 * Public routes (login, signup) are wrapped with {@link PublicOnlyRoute} to restrict access to unauthenticated users.
 * Protected routes (dashboard, profile) are wrapped with {@link ProtectedRoute} to require authentication.
 * 
 * @constant
 * @type {ReturnType<typeof createBrowserRouter>}
 * 
 * @example
 * // Usage in RouterProvider
 * <RouterProvider router={router} />
 * 
 * @see {@link App} - Main application component
 * @see {@link Dashboard} - Protected dashboard component
 * @see {@link Profile} - Protected user profile component
 * @see {@link Login} - Public login component
 * @see {@link SignUp} - Public signup component
 * @see {@link ProtectedRoute} - Route guard for authenticated users
 * @see {@link PublicOnlyRoute} - Route guard for unauthenticated users
 */
export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dashboard", element: (<ProtectedRoute><Dashboard/></ProtectedRoute>)},
  { path: "/profile", element: (<ProtectedRoute><Profile/></ProtectedRoute>)},
  { path: "/login", element: (<PublicOnlyRoute><Login/></PublicOnlyRoute>)},
  { path: "/signup", element: (<PublicOnlyRoute><SignUp/></PublicOnlyRoute>)},
])