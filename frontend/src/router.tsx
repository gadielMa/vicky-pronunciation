import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from 'react-router-dom'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { ResendConfirmationPage } from './pages/auth/ResendConfirmationPage'
import { DashboardPage } from './pages/DashboardPage'
import { AppLayout } from './components/layout/AppLayout'
import { useAuth } from './context/AuthContext'
import type { ReactNode } from 'react'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/resend-confirmation', element: <ResendConfirmationPage /> },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/products', element: <DashboardPage /> },
      { path: '/contacts', element: <DashboardPage /> },
      { path: '/media', element: <DashboardPage /> },
      { path: '/website', element: <DashboardPage /> },
      { path: '/marketing', element: <DashboardPage /> },
      { path: '/sales/offers', element: <DashboardPage /> },
      { path: '/sales/coupons', element: <DashboardPage /> },
    ],
  },
]

const basename = import.meta.env.BASE_URL?.replace(/\/$/, '') || ''

export const router = createBrowserRouter(routes, { basename })
