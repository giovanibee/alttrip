import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'
import { Marks, UserLocationPopup } from '@/components/Maps'
import { SortedChapters } from 'database/sortedChapters'
import 'leaflet/dist/leaflet.css'
import { LoadingDots } from '../Loading'

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">'
// const DEFAULT_LOCATION: LatLngTuple = [37.61044011296472, -115.3930761807285]

interface MainMapProps {
	chapters: SortedChapters | null
	location: LatLngTuple
	setLocation: (param: LatLngTuple) => void
	setNewStoryLocation: (param: LatLngTuple) => void
	setIsCreateStoryOpen: (param: boolean) => void
}

export default function MainMap({
	chapters,
	location,
	setLocation,
	setNewStoryLocation,
	setIsCreateStoryOpen,
}: MainMapProps) {
	const MapComponent = () => {
		useMapEvents({
			click: ({ latlng }) => {
				const { lat, lng } = latlng
				setNewStoryLocation([lat, lng])
				setIsCreateStoryOpen(true)
			},
		})
		return <div />
	}

	if (typeof window === 'undefined') return <LoadingDots />

	return (
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
			<UserLocationPopup location={location} setLocation={setLocation} />
			<MapComponent />
		</MapContainer>
	)
}
