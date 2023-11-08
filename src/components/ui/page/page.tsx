import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

import s from './page.module.scss'

type PageProps = PropsWithChildren & ComponentPropsWithoutRef<'section'>
export const Page = (props: PageProps) => {
  const { children, ...rest } = props

  return (
    <section className={s.loginSection} {...rest}>
      <div className={s.loginSection__container}>{children}</div>
    </section>
  )
}
