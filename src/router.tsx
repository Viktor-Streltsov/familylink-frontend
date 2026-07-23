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
import TrackMoodPage from '@/pages/TrackMoodPage'
import ProfilePage from '@/pages/ProfilePage'
import ConsentsPage from '@/pages/ConsentsPage'
import SituationDetailPage from '@/pages/SituationDetailPage'
import CreateSituationPage from '@/pages/CreateSituationPage'
import SubmitDescriptionPage from '@/pages/SubmitDescriptionPage'

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
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/profile',   element: <ProfilePage /> },
        ],
      },

      /* Страницы без bottom-навигации (полноэкранные) */
      { path: '/families/create',            element: <CreateFamilyPage /> },
      { path: '/families/join',              element: <JoinFamilyPage /> },
      { path: '/families/:familyId',         element: <FamilyDetailPage /> },
      { path: '/families/:familyId/mood',    element: <TrackMoodPage /> },
      {
        path: '/families/:familyId/situations/new',
        element: <CreateSituationPage />,
      },
      { path: '/situations/:situationId', element: <SituationDetailPage /> },
      {
        path: '/situations/:situationId/description',
        element: <SubmitDescriptionPage />,
      },
      { path: '/settings/consents',          element: <ConsentsPage /> },
      { path: '/settings/data',              element: <DataManagementPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
