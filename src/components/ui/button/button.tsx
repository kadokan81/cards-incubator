import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import s from './button.module.scss'
import { ExitIcon } from '@/components/icons/ExitIcon'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
  icon?: boolean
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    as: Component = 'button',
    icon = false,
    ...rest
  } = props
  return (
    <Component
      className={`${s.btn} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
    >
      {icon && <ExitIcon />}
      {rest.children}
    </Component>
  )
}
