import { TextInput as GrommetInput, TextInputProps } from 'grommet'
import './Input.scss'

export function Input(props: TextInputProps) {
	return (
		<GrommetInput
			{...props}
			className={`${props.className || ''} default-input`}
		/>
	)
}
