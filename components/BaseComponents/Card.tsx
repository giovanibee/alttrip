import {
	CardProps,
	Card as AntDCard,
} from 'antd'
import './Card.scss'

export function Card (props: CardProps) {
	return <AntDCard {...props} className={`${props.className} default-card`} />
}