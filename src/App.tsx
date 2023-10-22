import { Button } from './components/ui/button'
import Input from './components/ui/input/Input'
import useInput from './components/ui/input/useInput'
import { ExitIcon } from '@/components/icons/ExitIcon'

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
        <form>
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="Please enter your email"
          {...emailInput}
        />

        </form>
    
      </div>
    </div>
  )
}
