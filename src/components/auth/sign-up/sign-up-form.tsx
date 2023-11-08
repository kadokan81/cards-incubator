/* eslint-disable import/no-unresolved */
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import Button from '@/components/ui/button/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up-form.module.scss'

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3, { message: 'Password must be at least 3 characters' }),
    email: z.string().email(),
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords does not match',
    path: ['confirmPassword'],
  })

export type SignUpFormVal = z.infer<typeof signUpSchema>
type Props = {
  onSubmit: (data: SignUpFormVal) => void
}

export const SignUpForm = (props: Props) => {
  const { control, handleSubmit } = useForm<SignUpFormVal>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const handlerFormSubmit = handleSubmit(props.onSubmit)

  return (
    <Card className={s.loginForm}>
      <Typography
        as={'h2'}
        style={{ fontSize: '24px', fontWeight: '700', marginBottom: '27px', textAlign: 'center' }}
      >
        Sign Up
      </Typography>
      <form className={s.loginForm__form} onSubmit={handlerFormSubmit}>
        <DevTool control={control} />

        <ControlledTextField control={control} label={'Email'} name={'email'} />
        <ControlledTextField
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <ControlledTextField
          control={control}
          label={'Confirm Password'}
          name={'confirmPassword'}
          type={'password'}
        />

        <Button fullWidth style={{ marginBottom: '20px', marginTop: '60px' }} type={'submit'}>
          Sign Up
        </Button>
        <Typography style={{ marginBottom: '11px' }} variant={'caption'}>
          Already have an account?
        </Typography>
        <Typography as={Link} to={'/login'} variant={'link2'}>
          Sign In
        </Typography>
      </form>
    </Card>
  )
}
