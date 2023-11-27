'use client'

import { Grommet, ResponsiveContext } from 'grommet'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'

import { useFetchChapters } from '@/lib/hooks/chapters'
import { Box, Checkbox, Grid } from '@/components/BaseComponents'
import { CreateStoryModal } from '@/components/Creation'
import { roundNumber } from '@/lib/helpers'
import './styles.scss'

// const DEFAULT_LOCATION: LatLngTuple = [37.61044011296472, -115.3930761807285]
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">'

export default function Page() {
	const [location, setLocation] = useState<LatLngTuple>()
	const [newStoryLocation, setNewStoryLocation] = useState<LatLngTuple>()
	const [addStory, setAddStory] = useState(false)
	const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false)

	// update case when undefined
	const { data: chapters = [], refetch } = useFetchChapters(location ?? [0, 0])

	useEffect(() => {
		navigator.geolocation?.getCurrentPosition(
			({ coords }) => setLocation([coords.latitude, coords.longitude]),
			(err) => console.error(err)
		)
	}, [])

	useEffect(() => {
		if (location) refetch()
	}, [location])

	const locationString = useMemo(() => {
		if (!location) return null
		let coords = 'loading...'
		coords = location
			? roundNumber(location[0]) + ', ' + roundNumber(location[1], 3)
			: 'unknown'
		return (
			<p id="current-location">
				Current location is {coords}
			</p>
		)
	}, [location])

	const MapComponent = () => {
		// eslint-disable-next-line no-unused-vars
		const _map = useMapEvents({
			click: ({ latlng }) => {
				const { lat, lng } = latlng
				setNewStoryLocation([lat, lng])
				setIsCreateStoryOpen(true)
			}
		})
		return <div />
	}

	const mapContainer = useMemo(() => {
		if (!location) return null
		const marks = chapters?.length && chapters?.map((chapter) => (
			<Marker key={chapter.id} position={[chapter.latitude, chapter.longitude]}>
				<Popup>
					<p>{chapter.name}</p>
					<p>Description: {chapter.description}</p>
				</Popup>
			</Marker>
		))
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
				{marks}
				<MapComponent />
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
				<>
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
							<p>
								Info on WIP options for create a story, edit a story, or delete a story
							</p>
							<Checkbox
								checked={addStory}
								id="add-story-checkbox"
								label="Add story"
								onChange={(event) => setAddStory(event.target.checked)}
							/>
						</Box>
						<Box gridArea='map'>
							{mapContainer}
						</Box>
						<Box gridArea='nearby'>
							<h3>Nearby stories</h3>
						</Box>
					</Grid>
					<CreateStoryModal
						closeModal={() => setIsCreateStoryOpen(false)}
						isOpen={addStory && isCreateStoryOpen}
						latitude={newStoryLocation?.[0]}
						longitude={newStoryLocation?.[1]}
					/>
				</>
			)}
			</ResponsiveContext.Consumer>
		</Grommet>
	)
}
