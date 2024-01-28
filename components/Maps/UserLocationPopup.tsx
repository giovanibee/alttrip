'use client'

import { LatLngTuple, Icon } from 'leaflet'
import { useEffect } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface LocationMarkerProps {
	location?: LatLngTuple
	setLocation: (param: LatLngTuple) => void
}

export const UserLocationPopup = ({
	location,
	setLocation,
}: LocationMarkerProps) => {
	const map = useMap()

	useEffect(() => {
		map.locate().on('locationfound', function (e) {
			// TODO: cache location
			setLocation([e.latlng.lat, e.latlng.lng])
			map.flyTo(e.latlng, map.getZoom())
		})
	}, [map])

	useEffect(() => {
		if (location) {
			map.flyTo(location, map.getZoom())
		}
	}, [location])

	return (
		location && (
			<Marker
				position={location}
				icon={
					new Icon({
						iconUrl: '/icons/default-viewed-icon.png',
						iconSize: [25, 41],
					})
				}
			>
				<Popup>
					You're around here!
					<br />
				</Popup>
			</Marker>
		)
	)
}
