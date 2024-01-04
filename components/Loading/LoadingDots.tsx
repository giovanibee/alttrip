import { useEffect } from 'react'
import anime from 'animejs/lib/anime.es.js'
import './LoadingDots.scss'

export default function LoadingDots ({
	className = '',
	color = 'blue',
	size = 'small '
}) {
	useEffect(() => {
		anime({
			delay: anime.stagger(200),
			direction: 'normal',
			duration: 600,
			loop: true,
			targets: '.loading-dots > span',
			keyframes: [
				{
					opacity: 0.4,
				},
				{
					opacity: 0.6,
				},
				{
					opacity: 0.8,
				},
				{
					opacity: 1,
				},
				{
					opacity: 1,
				},
			],
		})
	})

	return (
		<span
			className={`${className} loading-dots loading-dots-${color} loading-dots-${size}`}
		>
			<span />
			<span />
			<span />
		</span>
	)
}
