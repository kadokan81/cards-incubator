import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import { Layout } from './components/ui/layout'
import { CardsTable } from './pages/cards-table'
import { ForgotPassword } from './pages/forgot-password'
import { Login } from './pages/login'
import { SignUp } from './pages/sign-up/sign-up'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Login />,
        path: '/login',
      },
      { element: <SignUp />, path: '/sign-up' },
      {
        element: <ForgotPassword />,
        path: '/forgot-password',
      },
      {
        element: <CardsTable />,
        path: '/cards',
      },
    ],
    element: <Layout />,
    path: '/',
  },
])

export function App() {
  return <RouterProvider router={router} />
}
