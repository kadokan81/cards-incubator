import { Error } from './../typography/typography.stories'
import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from '.'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'password',
    type: 'password',
  },
}
export const ErrorType: Story = {
  args: {
    label: 'Input with error',
    value: 'Wrong value',
    errorMessage: 'error message',
  },
}
