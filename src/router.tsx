import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { AppLayout } from '@/components/layouts/AppLayout'

import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import CreateFamilyPage from '@/pages/CreateFamilyPage'
import JoinFamilyPage from '@/pages/JoinFamilyPage'
import FamilyDetailPage from '@/pages/FamilyDetailPage'

const router = createBrowserRouter([
  /* ─── Публичные маршруты ─── */
  { path: '/',         element: <LandingPage /> },
  { path: '/login',    element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  /* ─── Защищённые маршруты ─── */
  {
    element: <ProtectedRoute />,
    children: [
      /* Страницы с bottom-навигацией */
      {
        element: <AppLayout />,
        children: [
          { path: '/dashboard',      element: <DashboardPage /> },
          { path: '/profile',        element: (
            <div className="p-8 text-center text-[var(--color-text-muted)]">
              Раздел «Профиль» — скоро
            </div>
          )},
        ],
      },

      /* Страницы без bottom-навигации (полноэкранные) */
      { path: '/families/create',        element: <CreateFamilyPage /> },
      { path: '/families/join',          element: <JoinFamilyPage /> },
      { path: '/families/:familyId',     element: <FamilyDetailPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
