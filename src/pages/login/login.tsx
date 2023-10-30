// eslint-disable-next-line import/no-unresolved
import { LoginForm } from '@/components/ui/auth/login-form'

import s from './login.module.scss'
export const Login = () => {
  return (
    <div className={s.loginSection}>
      <div className={s.loginSection__container}>
        <LoginForm />
      </div>
    </div>
  )
}
