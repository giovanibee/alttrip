'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import anime from 'animejs/lib/anime.es.js'
import globeImage from '/public/images/globe.png'
import previewImage from '/public/images/map-preview.png'
import previewImage2 from '/public/images/add-chapter-preview.png'
import './page.scss'

const Canvas = dynamic(() => import('@/components/Homepage/Canvas'), {
	ssr: false,
})

export default function Home() {
	useEffect(() => {
		anime({
			direction: 'alternate',
			easing: 'spring(4, 60, 10, 0)',
			loop: true,
			targets: '#globe-image',
			keyframes: [{ translateY: 14 }, { translateY: -14 }],
		})
	})

	return (
		<>
			<div id="main-home" className="summary-container">
				<h1 className="summary-headline">
					there's treasure out there, somewhere...
				</h1>
				<div className="summary-row">
					<Image
						alt="preview image of map interface"
						id="map-preview-image"
						className="preview-1"
						src={previewImage}
						height={344.36}
						width={550} // 0.6377 ratio
					/>
					<p className="preview-1">
						Go on adventures by hunting for stories in the real world. 🗺️ 🔎
					</p>
				</div>
				<div className="summary-row">
					<p className="preview-2">
						Make your own and share them with others 🔗 🤝🏽
					</p>
					<Image
						alt="preview image of creation interface"
						id="map-preview-image-2"
						src={previewImage2}
						height={344.36}
						width={550}
					/>
				</div>
				<Image
					alt="photo image of a globe"
					id="globe-image"
					src={globeImage}
					height={200}
					width={200}
				/>
				<Link id="link-enter-explore" href="/explore">
					<h3>Jump in!</h3>
				</Link>
				<p>Still in early development---watch out for bugs! 🐛🤠</p>
			</div>
			<Canvas />
		</>
	)
}
