import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from './components/ui/layout'
import { Login } from './pages/login'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Login />,
        path: 'login',
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
