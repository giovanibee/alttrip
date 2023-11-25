import { TextAreaExtendedProps, TextArea as GrommetTextarea } from 'grommet'
import './Textarea.scss'

export default function Textarea(props: TextAreaExtendedProps) {
	const className = `${props.className || ''} default-textarea`
	return <GrommetTextarea {...props} className={className} />
}
