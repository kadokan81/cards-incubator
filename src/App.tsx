import Button from './components/ui/button/button'
import useInput from './components/ui/input/useInput'
import { ExitIcon } from '@/components/icons/ExitIcon'
import { Typography } from './components/ui/typography'

export function App() {

  const emailInput = useInput('')
  return (

    <div>
      <div style={{display:"flex", gap:"20px"}}>
      <Button variant="link" as="a" href={'/link'}>
        Hello
      </Button>

      <Button variant="primary">Hello</Button>
      <Button iconStart={<ExitIcon/>}>Exit Icon</Button>
      <Button iconEnd={<ExitIcon/>} variant='secondary'>Exit Icon</Button>
      </div>
      <div>
        <Typography as={'h1'} variant='large'>
          Hello
        </Typography>
        <form>
     

        </form>
    
      </div>
    </div>
  )
}
