import { TextInput as GrommetInput, TextInputProps } from 'grommet'
import './Input.scss'

export default function Input(props: TextInputProps) {
	return (
		<GrommetInput
			{...props}
			className={`${props.className || ''} default-input`}
		/>
	)
}
