import { createBrowserRouter } from 'react-router-dom'
import App from "./App"
import Dashboard from './pages/Dashboard'
import AuthForm from './components/auth/AuthForm'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicOnlyRoute from './components/auth/PublicOnlyRoute'

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/authForm", element: (<PublicOnlyRoute><AuthForm /></PublicOnlyRoute>)},
  { path: "/dashboard", element: (<ProtectedRoute><Dashboard /></ProtectedRoute>)},
  //TODO  { path: "/Login", element: <App/>},
  //TODO  { path: "/SignUP", element: <App/>},
])