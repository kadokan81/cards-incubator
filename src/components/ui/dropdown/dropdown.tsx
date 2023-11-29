/* eslint-disable import/no-unresolved */
import { Logo, Logout, PersonOutline } from '@/assets/icons'
// eslint-disable-next-line import/extensions
import avatarImg from '@/assets/images/avatar.png'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'

import { Avatar } from '../avatar'
import Button from '../button/button'
import { Typography } from '../typography'
import { Link } from 'react-router-dom'

export const Dropdown = () => {
  const classNames = {
    dropDownContent: s.dropDownContent,
    dropdownMenuItem: s.dropdownMenuItem,
    trigger: s.trigger,
    user_info: s.user_info,
    wrapper: s.wrapper,
  }

  const userInfo = {
    email: 'j&johnson@gmail.com',
    name: 'Alex',
  }

  return (
    <div className={classNames.wrapper}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger style={{ all: 'unset' }}>
          <div className={classNames.trigger}>
            <Typography className={s.userName_decor} variant={'subtitle1'}>
              {userInfo?.name}
            </Typography>
            <Avatar size={36} src={avatarImg} />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={classNames.dropDownContent}>
            <DropdownMenu.Item className={classNames.dropdownMenuItem}>
              <Avatar size={36} src={avatarImg} />
              <div className={classNames.user_info}>
                <Typography className={s.userName} variant={'subtitle1'}>
                  {userInfo?.name}
                </Typography>
                <Typography className={s.userEmail} variant={'subtitle1'}>
                  {userInfo?.email}
                </Typography>
              </div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className={classNames.dropdownMenuItem}>
              <PersonOutline />
              <Typography className={s.userName} variant={'subtitle1'}>
                <Link to={'profile'}>My Profile</Link>
              </Typography>
            </DropdownMenu.Item>
            <DropdownMenu.Item className={classNames.dropdownMenuItem}>
              <Logout />
              <Typography className={s.userName} variant={'subtitle1'}>
                Sign Out
              </Typography>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
