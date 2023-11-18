'use client'

import { useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'

import { useFetchPlaces } from '@/lib/hooks/place'
import SignOut from 'components/sign-out'
import { Button } from 'components'
import './styles.scss'

// const DEFAULT_LOCATION: LatLngTuple = [37.61044011296472, -115.3930761807285]
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">'

const roundNumber = (num: number, roundTo: number) => {
	const decimalPlace = Math.pow(10, roundTo)
	return Math.round(num*decimalPlace) / decimalPlace
}

export default function Page() {
	// TODO: Fetch places from API
	const { data: areasOfInterest } = useFetchPlaces()
	const [location, setLocation] = useState<LatLngTuple>()

	navigator.geolocation?.getCurrentPosition((coords) => setLocation(
		[coords.coords.latitude, coords.coords.longitude]
	), (err) => {
		console.error(err)
	})

	const locationString = useMemo(() => {
		if (!location) return null
		let coords = 'loading...'
		coords = location ? roundNumber(location[0], 3) + ', ' + roundNumber(location[1], 3) : 'unknown'
		return <p>Current location is {coords}</p>
	}, [location])

	const mapContainer = useMemo(() => {
		if (!location) return null
		const marks = Array.isArray(areasOfInterest) && areasOfInterest?.map((area) => (
			<Marker key={area.id} position={area.coords}>
				<Popup>
					<p>{area.name}</p>
					<p>Description: {area.summary}</p>
				</Popup>
			</Marker>
		))
		return (
			<MapContainer center={location} id="main-map" zoom={13}>
				<TileLayer
					attribution={attribution}
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{marks}
			</MapContainer>
		)
	}, [areasOfInterest, location])

	return (
		<div>
			{locationString}
			{mapContainer}
			<Button primary pad="medium">
				Create quest
			</Button>
			<SignOut />
		</div>
	)
}
