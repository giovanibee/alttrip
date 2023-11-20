import Link from 'next/link'
import Image from 'next/image'
import globeImage from '/public/images/stock-globe-picture.png'
import './page.scss'

export default function Home() {
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
				id="link-enter-protected"
				href="/protected"
			>
				<h3>
					Jump down the hole
				</h3>
			</Link>
		</div>
	)
}
