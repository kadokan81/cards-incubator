/* eslint-disable import/no-unresolved */
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './recover-password.module.scss'

export const RecoverPasswordForm = () => {
  return (
    <Card className={s.loginForm}>
      <Typography as={'h2'} style={{ fontSize: '24px', textAlign: 'center' }}>
        Forgot your password?
      </Typography>
    </Card>
  )
}
