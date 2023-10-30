import { ComponentPropsWithRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type CardProps = {} & ComponentPropsWithRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProps }, ref) => {
  const classNames = {
    root: clsx(s.root, className),
  }

  return <div className={classNames.root} ref={ref} {...restProps}></div>
})
