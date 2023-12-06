import { useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { LoadingDots } from '@/components/Loading'
import { Marks } from '@/components/Maps'
import 'leaflet/dist/leaflet.css'

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">'
// const DEFAULT_LOCATION: LatLngTuple = [37.61044011296472, -115.3930761807285]

export default function MainMap({
	chapters,
	location,
	setLocation,
	setNewStoryLocation,
	setIsCreateStoryOpen,
}: {
	chapters: any
	location: any
	setLocation: any
	setNewStoryLocation: any
	setIsCreateStoryOpen: any
}) {
	useEffect(() => {
		if (!navigator?.geolocation) return
		navigator.geolocation.getCurrentPosition(
			({ coords }) => setLocation([coords.latitude, coords.longitude]),
			(err) => console.error(err),
		)
	}, [setLocation])

	const MapComponent = () => {
		// eslint-disable-next-line no-unused-vars
		const _map = useMapEvents({
			click: ({ latlng }) => {
				const { lat, lng } = latlng
				setNewStoryLocation([lat, lng])
				setIsCreateStoryOpen(true)
			},
		})
		return <div />
	}

	if (typeof window === 'undefined') return null

	return location ? (
		<MapContainer
			center={location}
			id="main-map"
			style={{ zIndex: 14 }}
			zoom={13}
		>
			<TileLayer
				attribution={attribution}
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marks chapters={chapters} />
			<MapComponent />
		</MapContainer>
	) : (
		<LoadingDots />
	)
}
