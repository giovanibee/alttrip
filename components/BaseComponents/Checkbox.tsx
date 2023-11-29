import { CheckBox as GrommetCheckbox, CheckBoxExtendedProps } from 'grommet'

export default function Checkbox(props: CheckBoxExtendedProps) {
  return (
    <div className='default-checkbox'>
      <GrommetCheckbox {...props} />
    </div>
  )
}
