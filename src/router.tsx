import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { AppLayout } from '@/components/layouts/AppLayout'

import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'

const router = createBrowserRouter([
  /* ─── Публичные маршруты ─── */
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  /* ─── Защищённые маршруты (требуют авторизации) ─── */
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          /* Следующие маршруты будут добавлены позже */
          {
            path: '/families',
            element: (
              <div className="p-8 text-center text-[var(--color-text-muted)]">
                Раздел «Семьи» — в разработке
              </div>
            ),
          },
          {
            path: '/profile',
            element: (
              <div className="p-8 text-center text-[var(--color-text-muted)]">
                Раздел «Профиль» — в разработке
              </div>
            ),
          },
        ],
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
