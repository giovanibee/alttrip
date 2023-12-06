import { CheckBox as GrommetCheckbox, CheckBoxExtendedProps } from 'grommet'

export function Checkbox(props: CheckBoxExtendedProps) {
	return (
		<div className="default-checkbox">
			<GrommetCheckbox {...props} />
		</div>
	)
}
