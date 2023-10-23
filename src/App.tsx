import { useState } from 'react'
import Logout from './assets/icons/logout'
import Button from './components/ui/button/button'
import { Checkbox } from './components/ui/checkbox'
import { TextField } from './components/ui/text-field'

import { Typography } from './components/ui/typography'

export function App() {

  const [value, setValue] = useState(false)

  const handleChange = (event: boolean) => {
    setValue(event)
  }
  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button variant="link" as="a" href={'/link'}>
          Hello
        </Button>

        <Button variant="primary">Hello</Button>
        <Button iconStart={<Logout />}>Exit Icon</Button>
        <Button iconEnd={<Logout />} variant="secondary">
          Exit Icon
        </Button>
      </div>
      <div>
        <Typography as={'h1'} variant="large">
          Hello
        </Typography>
        <form>
          <TextField type='password' />
     
        </form>
        <Checkbox  label='test' checked={value} onChange={handleChange}/>
      </div>
    </div>
  )
}
