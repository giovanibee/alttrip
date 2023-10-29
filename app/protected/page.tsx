'use client'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SignOut from 'components/sign-out'
import { Button } from 'components'
import './styles.scss'

export default function Page() {
	return (
		<div>
			<p>aaaahhh</p>
			<Button primary pad="medium">
				Create quest
			</Button>
			<MapContainer center={[51.505, -0.09]} id="main-map" zoom={13}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
			<SignOut />
		</div>
	)
}
