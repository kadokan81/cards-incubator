import { FC } from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line import/no-unresolved
import { Logo } from '@/assets/icons'

import s from './header.module.scss'

import Button from '../../button/button'
import { Dropdown } from '../../dropdown'

type HeaderProps = {
  isAuth: boolean
}

export const Header: FC<HeaderProps> = ({ isAuth }) => {
  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <nav>
          <ul className={s.header__list}>
            <li className={s.header__list__logo}>
              <Link to={'/'}>
                <Logo />
              </Link>
            </li>
            <li>
              <Dropdown />
              {/* {!isAuth && (
                <Link to={'/login'}>
                  <Button variant={'primary'}>Sign In</Button>
                </Link>
              )} */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
