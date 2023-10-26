import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  iconEnd?: ReactNode
  iconStart?: ReactNode
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

export default function Button<T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) {
  const {
    as: Component = 'button',
    className,
    fullWidth,
    iconEnd,
    iconStart,
    variant = 'primary',
    ...rest
  } = props

  return (
    <Component
      className={`${s.btn} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
    >
      {iconStart && iconStart}
      {rest.children}
      {iconEnd && iconEnd}
    </Component>
  )
}
