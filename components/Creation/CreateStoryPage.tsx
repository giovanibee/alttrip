'use client'

import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { ResponsiveContext } from 'grommet'

import { LatLngTuple } from '@/lib/types/geospatial'
import { useFetchChapters } from '@/lib/hooks/chapters'
import { Box, Checkbox, Grid, Grommet } from '@/components/BaseComponents'
import { Marks } from '@/components/Creation'
import { CreateStoryModal } from '@/components/Creation'
import { roundNumber } from '@/lib/helpers'
import './CreateStoryPage.scss'

// const DEFAULT_LOCATION: LatLngTuple = [37.61044011296472, -115.3930761807285]
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">'

export default function CreateStoryPage() {
	const [location, setLocation] = useState<LatLngTuple>()
	const [newStoryLocation, setNewStoryLocation] = useState<LatLngTuple>()
	const [addStory, setAddStory] = useState(false)
	const [addChapter, setAddChapter] = useState(false)
	const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false)
	// const [isCreateChapterOpen, setIsCreateChapterOpen] = useState(false)
	const shouldFilterByDistance = false

	// update case when undefined
	const { data: chapters = null, refetch } = useFetchChapters({
		location,
		shouldFilterByDistance,
	})

	useEffect(() => {
		window.navigator.geolocation?.getCurrentPosition(
			({ coords }) => setLocation([coords.latitude, coords.longitude]),
			(err) => console.error(err),
		)
	}, [])

	const locationString = useMemo(() => {
		if (!location) return null
		refetch()
		let coords = 'loading...'
		coords = Array.isArray(location)
			? roundNumber(location[0]) + ', ' + roundNumber(location[1], 3)
			: 'unknown'
		return <p id="current-location">Current location is {coords}</p>
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])

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

	const orderBasedOnScreensize = (screenSize: string, options: string[]) => {
		if (['xlarge', 'large'].includes(screenSize)) return [options]
		return options.map((option) => [option, option])
	}

	if (typeof window === 'undefined') return null

	return (
		<Grommet>
			<ResponsiveContext.Consumer>
				{(screenSize) => (
					<>
						<Grid
							id="create-story-page"
							columns={['auto', 'medium']}
							rows={['xxsmall', 'xsmall', 'auto', 'auto']}
							gap="small"
							areas={[
								['description', 'description'],
								['options', 'options'],
								...orderBasedOnScreensize(screenSize, ['map', 'nearby']),
							]}
						>
							<Box gridArea="description">{locationString}</Box>
							<Box gridArea="options">
								On map click
								<Checkbox
									checked={addStory}
									id="add-story-checkbox"
									label="Add story"
									onChange={(event) => setAddStory(event.target.checked)}
								/>
								<Checkbox
									checked={addChapter}
									id="add-chapter-checkbox"
									label="Add chapter"
									onChange={(event) => setAddChapter(event.target.checked)}
								/>
							</Box>
							<Box gridArea="map">
								{location && (
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
								)}
							</Box>
							<Box gridArea="nearby">
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
