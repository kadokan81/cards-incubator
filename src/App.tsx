import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from './components/ui/layout'
import { ForgotPassword } from './pages/forgot-password'
import { Login } from './pages/login'
import { SignUp } from './pages/sign-up/sign-up'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Login />,
        path: 'login',
      },
      { element: <SignUp />, path: 'sign-up' },
      {
        element: <ForgotPassword />,
        path: 'forgot-password',
      },
    ],
    element: <Layout />,
    path: '/',
  },
])

export function App() {
  return (
    <div>
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}
