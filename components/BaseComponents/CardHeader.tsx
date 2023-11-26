import {
	BoxExtendedProps as BoxProps,
	CardHeader as GrommetHeader,
} from 'grommet'
import './Card.scss'

export default function CardHeader(props: BoxProps) {
	return <GrommetHeader {...props} className={`${props.className} default-card-header`} />
}

