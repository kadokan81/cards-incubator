import { StoryObj, Meta } from '@storybook/react'

import { Checkbox } from '.'
import { useState } from 'react'

const meta = {
  title: 'Components/Checkbox ',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  args: {
    label: 'Click Here',
    disabled: false,
  },
}
export const CheckedBox = {
  args: {

    checked: true,
    disabled: false,
  
  },
}
export const Disabled = {
  args: {
    label: 'Disabled',
    checked: false,
    disabled: true,
  },
}

const CheckBoxWithLogic = () => {
  const [value, setValue] = useState(false)

  const handleChange = (event: boolean) => {
    setValue(event)
  }

  return <Checkbox label={'Check Logic'} checked={value} onChange={handleChange} />
}

export const CheckBoxWithLogicRender: Story = {
  render: () => <CheckBoxWithLogic />,
}
