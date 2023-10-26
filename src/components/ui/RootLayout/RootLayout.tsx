import { Theme } from '@radix-ui/themes'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme appearance="dark" radius="small">
      {children}
    </Theme>
  )
}
