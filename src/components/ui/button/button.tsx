import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import s from './button.module.scss'


export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
  iconEnd?: ReactNode
  iconStart?: ReactNode
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    as: Component = 'button',
    iconStart,
    iconEnd,
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
