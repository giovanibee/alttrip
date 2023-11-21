import {
	BoxExtendedProps as BoxProps,
	Card as GrommetCard,
	CardBody as GrommetBody,
	CardFooter as GrommetFooter,
	CardHeader as GrommetHeader,
} from 'grommet'
import './Card.scss'

export default function Card(props: BoxProps) {
	return <GrommetCard {...props} className='default-card'/>
}

export function CardBody(props: BoxProps) {
	return <GrommetBody {...props} className='default-card-body' />
}

export function CardHeader(props: BoxProps) {
	return <GrommetHeader {...props} className='default-card-header' />
}

export function CardFooter(props: BoxProps) {
	return <GrommetFooter {...props} className='default-card-footer' />
}
