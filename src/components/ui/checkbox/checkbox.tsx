import { FC } from 'react'
import { clsx } from 'clsx'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import s from './checkbox.module.scss'
import { Typography } from '../typography'
import Check from '@/assets/icons/check'


export type CheckBoxProps = {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
  position?: 'left'
}

export const Checkbox: FC<CheckBoxProps> = ({
  className,
  checked,
  onChange,
  disabled,
  required,
  label,
  id,
  position,
}) => {
  const classNames = {
    container: clsx(s.container, className),
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    root: s.root,
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <LabelRadix.Root asChild>
        <Typography variant="body2" className={classNames.label} as={'label'}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              className={classNames.root}
              checked={checked}
              onCheckedChange={onChange}
              disabled={disabled}
              required={required}
              id={id}
            >
              {checked && (
                <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                  <Check />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {label}
        </Typography>
      </LabelRadix.Root>
    </div>
  )
}