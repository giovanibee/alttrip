import { Checkbox as AntDCheckbox, CheckboxProps } from 'antd'

export function Checkbox(props: CheckboxProps) {
  return (
      <AntDCheckbox
        {...props}
        className={props.className ? props.className + ' default-checkbox' : 'default-checkbox'}
      />
  )
}
