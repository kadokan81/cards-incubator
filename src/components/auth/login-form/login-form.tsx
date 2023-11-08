/* eslint-disable react/no-unescaped-entities */
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@radix-ui/themes'
import { z } from 'zod'

import s from './login-form.module.scss'

import Button from '../../ui/button/button'
import { ControlledCheckbox } from '../../ui/controlled/controlled-checkbox/controlled-checkbox'
import { ControlledTextField } from '../../ui/controlled/controlled-text-field'
import { Typography } from '../../ui/typography'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export type FormValues = z.infer<typeof loginSchema>
type Props = {
  onSubmit: (data: FormValues) => void
}

export const LoginForm = (props: Props) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  const handlerFormSubmit = handleSubmit(props.onSubmit)

  return (
    <Card className={s.loginForm}>
      <Typography as={'h2'} style={{ fontSize: '24px', textAlign: 'center' }}>
        Sign In
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
        <div style={{ alignSelf: 'start' }}>
          <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
        </div>
        <Typography
          as={Link}
          style={{ alignSelf: 'end', fontSize: '14px', marginBottom: '60px', textAlign: 'right' }}
          to={'/forgot-password'}
          variant={'link2'}
        >
          Forgot Password?
        </Typography>
        <Button fullWidth style={{ marginBottom: '20px' }} type={'submit'}>
          Sign Up
        </Button>
        <Typography style={{ marginBottom: '11px' }} variant={'caption'}>
          Don't have an account?
        </Typography>
        <Typography as={Link} to={'/sign-up'} variant={'link2'}>
          Sign Up
        </Typography>
      </form>
    </Card>
  )
}
