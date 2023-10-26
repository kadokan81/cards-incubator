import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '.'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox ',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  args: {
    disabled: false,
    label: 'Click Here',
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
    checked: false,
    disabled: true,
    label: 'Disabled',
  },
}

const CheckBoxWithLogic = () => {
  const [value, setValue] = useState(false)

  const handleChange = (event: boolean) => {
    setValue(event)
  }

  return <Checkbox checked={value} label={'Check Logic'} onChange={handleChange} />
}

export const CheckBoxWithLogicRender: Story = {
  render: () => <CheckBoxWithLogic />,
}
