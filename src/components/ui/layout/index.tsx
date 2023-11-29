import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

// eslint-disable-next-line perfectionist/sort-imports
import { Header } from './header'

export const Layout = () => {
  const isAuth = false

  return (
    <div className={s.container}>
      <Header isAuth={isAuth} />
      <div aria-hidden className={s.placeholder} />
      <Outlet />
    </div>
  )
}
