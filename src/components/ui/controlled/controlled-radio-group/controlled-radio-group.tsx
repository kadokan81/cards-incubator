import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import s from './controlled-radio-group.module.scss'

type ControlledRadioGroupProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  options: { label: string; value: string }[]
}

export const ControlledRadioGroup = <TFieldValues extends FieldValues>(
  props: ControlledRadioGroupProps<TFieldValues>
) => {
  const {
    field: { onChange, value },
  } = useController({
    control: props.control,
    name: props.name,
  })
  const classNames = {
    groupContainer: s.groupContainer,
    optionLabel: s.optionLabel,
  }

  return (
    <div className={classNames.groupContainer}>
      {props.options.map((option, index) => (
        <label className={classNames.optionLabel} key={`${index}__${option.value}`}>
          <input
            checked={value === option.value}
            onChange={e => onChange(e.target.value)}
            type={'radio'}
            value={option.value}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}
