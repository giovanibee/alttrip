import { FormField as GrommetFormField, FormFieldExtendedProps } from 'grommet'
import './FormField.scss'

export default function Input(props: FormFieldExtendedProps) {
	return (
		<GrommetFormField
			{...props}
			className={`${props.className || ''} default-form-field`}
		/>
	)
}