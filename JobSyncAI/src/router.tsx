import { createBrowserRouter } from 'react-router-dom'
import App from "./App"
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicOnlyRoute from './components/auth/PublicOnlyRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dashboard", element: (<ProtectedRoute><Dashboard /></ProtectedRoute>)},
  { path: "/login", element: (<PublicOnlyRoute><Login/></PublicOnlyRoute>)},
  { path: "/signup", element: (<PublicOnlyRoute><SignUp/></PublicOnlyRoute>)},
])