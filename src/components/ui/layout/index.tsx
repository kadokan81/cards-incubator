import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Page } from '../page'
// eslint-disable-next-line perfectionist/sort-imports
import { TableCards } from '../table'
import { Header } from './header'

export const Layout = () => {
  const isAuth = false

  return (
    <div className={s.container}>
      <Header isAuth={isAuth} />
      <div aria-hidden className={s.placeholder} />
      <Outlet />
      <Page>
        <TableCards />
      </Page>
    </div>
  )
}
