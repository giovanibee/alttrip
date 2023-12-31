import {
	BoxExtendedProps as BoxProps,
	CardFooter as GrommetFooter,
} from 'grommet'
import './Card.scss'

export function CardFooter(props: BoxProps) {
	return (
		<GrommetFooter
			{...props}
			className={`${props.className} default-card-footer`}
		/>
	)
}
