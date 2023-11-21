import {
	BoxExtendedProps as BoxProps,
	Card as GrommetCard,
	CardBody as GrommetBody,
	CardFooter as GrommetFooter,
	CardHeader as GrommetHeader,
} from 'grommet'

export default function Card(props: BoxProps) {
	return <GrommetCard {...props} />
}

export function CardBody(props: BoxProps) {
	return <GrommetBody {...props} />
}

export function CardHeader(props: BoxProps) {
	return <GrommetHeader {...props} />
}

export function CardFooter(props: BoxProps) {
	return <GrommetFooter {...props} />
}
