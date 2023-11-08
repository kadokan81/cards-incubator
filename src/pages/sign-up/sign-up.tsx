/* eslint-disable import/no-unresolved */

import { SignUpForm, SignUpFormVal } from '@/components/auth/sign-up'
import { Page } from '@/components/ui/page'

export const SignUp = () => {
  const handlerSubmit = (arg: SignUpFormVal) => {
    console.warn('🚀 ~ file: login.tsx:9 ~ handlerSubmit ~ arg:', arg)
  }

  return (
    <Page>
      <SignUpForm onSubmit={handlerSubmit} />
    </Page>
  )
}
