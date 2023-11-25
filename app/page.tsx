'use client'

import Link from 'next/link'
import Image from 'next/image'
import anime from 'animejs/lib/anime.es.js'
import globeImage from '/public/images/stock-globe-picture.png'
import './page.scss'
import { useEffect } from 'react'

export default function Home() {
	useEffect(() => {
		anime({
			direction: 'alternate',
			easing: 'spring(4, 60, 10, 0)',
			loop: true,
			targets: '#globe-image',
			keyframes: [
				{
					translateY: 14,
				},
				{
					translateY: -14,
				},
			],
		})
	})
	return (
		<div id="main-home">
			<Image
				alt="photo image of a globe"
				id='globe-image'
				src={globeImage}
				height={280}
				width={280}
			/>
			<div className="summary-container">
				<p>Go on adventures by hunting for stories in the real world.  🗺️ 🔎</p>
				<p>Make your own and share them with others 🔗 🤝🏽</p>
			</div>
			<Link
				id="link-enter-explore"
				href="/explore"
			>
				<h3>
					Jump in!
				</h3>
			</Link>
		</div>
	)
}
