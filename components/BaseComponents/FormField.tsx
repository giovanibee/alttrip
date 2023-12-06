import { FormField as GrommetFormField, FormFieldExtendedProps } from 'grommet'
import './FormField.scss'

export function FormField(props: FormFieldExtendedProps) {
	return (
		<GrommetFormField
			{...props}
			className={`${props.className || ''} default-form-field`}
		/>
	)
}
