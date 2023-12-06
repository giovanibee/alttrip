import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input'
import './Textarea.scss'

const { TextArea: AntDTextArea } = Input

export function Textarea(props: TextAreaProps) {
	const className = `${props.className || ''} default-textarea`
	return <AntDTextArea {...props} className={className} />
}
