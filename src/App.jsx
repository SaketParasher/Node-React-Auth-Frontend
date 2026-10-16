
// import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Admin from './pages/Admin'
import AdminUsers from './pages/AdminUsers'
import ApiPlayground from './pages/ApiPlayground'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Unauthorized from './pages/Unauthorized'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'

import UserDetails from './pages/UserDetails'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

import AppLayout from './layouts/AppLayout'
import AdminLayout from './layouts/AdminLayout'
import PublicLayout from './layouts/PublicLayout'
import RoleRoute from './routes/RoleRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        // path: '/dashboard',
        element: <Dashboard />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'api-playground',
            element: <ApiPlayground />
          },
          {
            path: 'admin',
            element: <RoleRoute role="admin" />,
            children: [
              {
                element: <AdminLayout />,
                children: [
                  {
                    index: true,
                    element: <Admin />
                  },
                  {
                    path: 'users',
                    element: <AdminUsers />,
                    children: [
                      {
                        path: ':userId',
                        element: <UserDetails />
                      }
                    ]
                  }

                ]
              }
            ]
          }
        ]
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'signup',
            element: <Signup />
          }

        ]
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
