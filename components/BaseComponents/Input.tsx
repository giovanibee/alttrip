import { Input as AntDInput, InputProps } from 'antd'
import './Input.scss'

export function Input(props: InputProps) {
	return (
		<AntDInput
			{...props}
			className={`${props.className || ''} default-input`}
		/>
	)
}
