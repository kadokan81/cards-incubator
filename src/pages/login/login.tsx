// eslint-disable-next-line import/no-unresolved
import { FormValues, LoginForm } from '@/components/auth/login-form'
// eslint-disable-next-line import/no-unresolved
import { Page } from '@/components/ui/page'

export const Login = () => {
  const handlerSubmit = (arg: FormValues) => {
    console.warn('🚀 ~ file: login.tsx:9 ~ handlerSubmit ~ arg:', arg)
  }

  return (
    <Page>
      <LoginForm onSubmit={handlerSubmit} />
    </Page>
  )
}
