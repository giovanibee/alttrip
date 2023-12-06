import { Button as AntDButton, ButtonProps } from 'antd'
import './Button.scss'

export function Button({ children: child, ...props}: ButtonProps) {
	const isChildrenString = typeof child === 'string'
	const children = isChildrenString ? undefined : child
	return (
		<AntDButton type='primary' {...props} className={
			`${props.className || ''} default-button`
		}>
			{children}
		</AntDButton>
	)
}
