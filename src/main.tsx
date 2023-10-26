import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './styles/index.scss'
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'
import '@radix-ui/themes/styles.css'

import { App } from './App'
// import RootLayout from './components/ui/RootLayout/RootLayout'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
