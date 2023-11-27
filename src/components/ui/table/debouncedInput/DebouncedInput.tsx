import { InputHTMLAttributes, useEffect, useState } from 'react'

import { TextField } from '../../text-field'

export function DebouncedInput({
  debounce = 500,
  onChange,
  value: initialValue,
  ...props
}: {
  debounce?: number
  onChange: (value: number | string) => void
  value: number | string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <TextField {...props} onChange={e => setValue(e.target.value)} value={value} />
}
