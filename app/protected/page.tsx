'use client'

import { Grommet, ResponsiveContext, Tab } from 'grommet'
import { useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'

import { useFetchChapters } from '@/lib/hooks/chapters'
import { Box, Button, Grid } from '@/components/BaseComponents'
import './styles.scss'

// const DEFAULT_LOCATION: LatLngTuple = [37.61044011296472, -115.3930761807285]
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">'

const roundNumber = (num: number, roundTo: number) => {
	const decimalPlace = Math.pow(10, roundTo)
	return Math.round(num*decimalPlace) / decimalPlace
}

export default function Page() {
	const [location, setLocation] = useState<LatLngTuple>()

	// update case when undefined
	const { data: chapters } = useFetchChapters(location)

	navigator.geolocation?.getCurrentPosition((coords) => setLocation(
		[coords.coords.latitude, coords.coords.longitude]
	), (err) => {
		console.error(err)
	})

	const locationString = useMemo(() => {
		if (!location) return null
		let coords = 'loading...'
		coords = location ? roundNumber(location[0], 3) + ', ' + roundNumber(location[1], 3) : 'unknown'
		return (
			<p id="current-location">Current location is {coords}</p>
		)
	}, [location])

	const mapContainer = useMemo(() => {
		if (!location) return null
		const marks = Array.isArray(chapters) && chapters?.map((chapter) => (
			<Marker key={chapter.id} position={[chapter.latitude, chapter.longitude]}>
				<Popup>
					<p>{chapter.name}</p>
					<p>Description: {chapter.description}</p>
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
	}, [chapters, location])

	const orderBasedOnScreensize = (screenSize: string, options: string[]) => {
		if (['xlarge', 'large'].includes(screenSize)) return [options]
		return options.map((option) => ([option, option]))
	}
	return (
		<Grommet>
			<ResponsiveContext.Consumer>
				{(screenSize) => (
				<Grid
					id="create-story-page"
					columns={['auto', 'medium']}
					rows={['xxsmall', 'xxsmall', 'auto', 'auto']}
					gap="small"
					areas={[
						['description', 'description'],
						['options', 'options'],
						...(orderBasedOnScreensize(screenSize, ['map', 'nearby']))
					]}
				>
					<Box gridArea='description'>
						{locationString}
					</Box>
					<Box gridArea='options'>
						WIP options for create a story, edit a story, or delete a story
						<Button label="Create a story" />
					</Box>
					<Box gridArea='map'>
						{mapContainer}
					</Box>
					<Box gridArea='nearby'>
						<h3>Nearby stories</h3>
					</Box>
				</Grid>
				)}
			</ResponsiveContext.Consumer>
		</Grommet>
	)
}
