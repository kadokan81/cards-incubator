import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@radix-ui/themes'
import { z } from 'zod'

import s from './login-form.module.scss'

import Button from '../../button/button'
import { ControlledCheckbox } from '../../controlled/controlled-checkbox/controlled-checkbox'
import { ControlledRadioGroup } from '../../controlled/controlled-radio-group'
import { ControlledTextField } from '../../controlled/controlled-text-field'
import { Typography } from '../../typography'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
  unswear: z.string(),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const [selectedOption, setSelectedOption] = useState('Option 1')
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  console.log('errors: ', errors)

  const onSubmit = (data: FormValues) => {
    console.log('🚀 ~ file: login-form.tsx:18 ~ onSubmit ~ data:', data)
  }

  const handleRadioChange = (value: string) => {
    setSelectedOption(value)
  }
  const radioOptions = [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
  ]

  return (
    <Card className={s.loginForm}>
      <form className={s.loginForm__form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'}>Sign In</Typography>
        <ControlledTextField control={control} label={'email'} name={'email'} />
        <ControlledTextField control={control} label={'password'} name={'password'} />
        <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
        <Button fullWidth type={'submit'}>
          Sign Up
        </Button>
        <ControlledRadioGroup control={control} name={'unswear'} options={radioOptions} />
      </form>
    </Card>
  )
}
