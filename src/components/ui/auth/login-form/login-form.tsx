import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@radix-ui/themes'
import { z } from 'zod'

import s from './login-form.module.scss'

import Button from '../../button/button'
import { ControlledCheckbox } from '../../controlled/controlled-checkbox/controlled-checkbox'
import { TextField } from '../../text-field'
import { Typography } from '../../typography'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  console.log('errors: ', errors)

  const onSubmit = (data: FormValues) => {
    console.log('🚀 ~ file: login-form.tsx:18 ~ onSubmit ~ data:', data)
  }

  return (
    <Card className={s.loginForm}>
      <form className={s.loginForm__form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'}>Sign In</Typography>

        <TextField {...register('email')} errorMessage={errors.email?.message} label={'email'} />
        <TextField
          {...register('password')}
          errorMessage={errors.password?.message}
          label={'password'}
        />
        {/* <Checkbox checked={value} label={'remember me'} onChange={onChange} /> */}
        <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
        <Button fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
    </Card>
  )
}
