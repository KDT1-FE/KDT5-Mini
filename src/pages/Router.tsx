import { createBrowserRouter } from 'react-router-dom'
import { ErrorComponent } from 'components/index'
import {
  SignIn,
  SignUp,
  MainHome,
  SchedulePage,
  UpdatePage,
  ApplyPage,
  ResetPassword
} from 'pages/index'
import { Layout, HeaderLayout } from 'components/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/',
        element: <SignIn />,
        errorElement: <ErrorComponent />
      },
      {
        path: '/signup',
        element: <SignUp />,
        errorElement: <ErrorComponent />
      },
      {
        path: '/reset',
        element: <ResetPassword />,
        errorElement: <ErrorComponent />
      }
    ]
  },
  {
    path: '/',
    element: <HeaderLayout />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/home',
        element: <MainHome />,
        errorElement: <ErrorComponent />
      },
      {
        path: '/profile',
        element: <UpdatePage />,
        errorElement: <ErrorComponent />
      },
      {
        path: '/schedule',
        element: <SchedulePage />,
        errorElement: <ErrorComponent />
      },
      {
        path: '/application',
        element: <ApplyPage />,
        errorElement: <ErrorComponent />
      },
      {
        path: '/logout',
        element: <SchedulePage />,
        errorElement: <ErrorComponent />
      }
    ]
  }
])
