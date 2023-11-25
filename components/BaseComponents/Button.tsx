import { Button as GrommetButton, ButtonExtendedProps } from 'grommet'
import './Button.scss'

export default function Button({ children: child, ...props}: ButtonExtendedProps) {
	const isChildrenString = typeof child === 'string'
	const label = isChildrenString ? child : undefined
	const children = isChildrenString ? undefined : child
	return (
		<GrommetButton primary label={label} {...props} className={
			`${props.className || ''} default-button`
		}>
			{children}
		</GrommetButton>
	)
}
