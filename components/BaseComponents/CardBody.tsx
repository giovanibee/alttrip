import {
	BoxExtendedProps as BoxProps,
	CardBody as GrommetBody,
} from 'grommet'
import './Card.scss'

export default function CardBody(props: BoxProps) {
	return <GrommetBody {...props} className={`${props.className} default-card-body`} />
}
