import { BoxExtendedProps as BoxProps, Card as GrommetCard } from 'grommet'
import './Card.scss'

export function Card(props: BoxProps) {
	return (
		<GrommetCard {...props} className={`${props.className} default-card`} />
	)
}
