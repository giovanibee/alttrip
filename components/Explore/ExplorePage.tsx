'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ResponsiveContext } from 'grommet'
import { getDistance } from 'geolib'

import { LatLngTuple } from '@/lib/types/geospatial'
import { useFetchChapters } from '@/lib/hooks/chapters'
import { Box, Checkbox, Grid, Grommet } from '@/components/BaseComponents'
import { CreateStoryModal } from '@/components/Explore'
import { roundNumber } from '@/lib/helpers'
import MainMap from '@/components/Maps/MainMap'
import './ExplorePage.scss'

const DEFAULT_LOCAITON: LatLngTuple = [36.276, -115.17]

export default function CreateStoryPage() {
	const [location, setLocation] = useState<LatLngTuple>()
	const [newStoryLocation, setNewStoryLocation] = useState<LatLngTuple>()
	const [addStory, setAddStory] = useState(false)
	const [addChapter, setAddChapter] = useState(false)
	const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false)
	const router = useRouter()
	// should be in settings page eventually
	const [useMiles, setUseMiles] = useState(true)

	const { data: session } = useSession()
	// const [isCreateChapterOpen, setIsCreateChapterOpen] = useState(false)
	const shouldFilterByDistance = false

	// update case when undefined
	const { data: chapters = null, refetch } = useFetchChapters({
		location,
		shouldFilterByDistance,
	})

	const setLocalLocation = () => {
		navigator.geolocation.getCurrentPosition((location) => {
			setLocation([location.coords.latitude, location.coords.longitude])
		})
	}
	useEffect(() => {
		setLocalLocation()
	}, [])

	useEffect(() => {
		if (Array.isArray(chapters?.incompleteChapters)) refetch()
	}, [chapters])

	const locationString = useMemo(() => {
		if (!location) return null
		refetch()
		let coords = 'loading...'
		coords = Array.isArray(location)
			? roundNumber(location[0]) + ', ' + roundNumber(location[1], 3)
			: 'unknown'
		return (
			<p id="current-location">
				Current location is {coords}
				<a onClick={setLocalLocation}>[Reload]</a>
				<a
					onClick={() => {
						setLocation(DEFAULT_LOCAITON)
					}}
				>
					[Use demo location]
				</a>
			</p>
		)
	}, [location])

	const orderBasedOnScreensize = (screenSize: string, options: string[]) => {
		if (['xlarge', 'large'].includes(screenSize)) return [options]
		return options.map((option) => [option, option])
	}

	const listOfIncompleteChapters = useMemo(() => {
		const canShow = location && chapters?.incompleteChapters
		return (
			canShow &&
			chapters?.incompleteChapters
				.sort((a, b) => {
					/// TODO: NEEDS REFACTORING AAAHHHHH
					const aDistance =
						getDistance(
							{ latitude: location[0], longitude: location[1] },
							{ latitude: a.latitude, longitude: a.longitude },
						) / 1000
					const bDistance =
						getDistance(
							{ latitude: location[0], longitude: location[1] },
							{ latitude: b.latitude, longitude: b.longitude },
						) / 1000
					return aDistance - bDistance
				})
				.map((chapter, id) => {
					let distance =
						getDistance(
							{ latitude: location[0], longitude: location[1] },
							{ latitude: chapter.latitude, longitude: chapter.longitude },
						) / 1000 // convert to km
					if (useMiles) distance = distance * 0.621371
					return (
						<div key={id}>
							{chapter.name} -{' '}
							<span className="story-distance-inline">
								{roundNumber(distance, 2)} {useMiles ? 'miles' : 'km'}
							</span>
						</div>
					)
				})
		)
	}, [chapters, location, useMiles])

	if (!session?.user?.name) {
		router.push('/login')
		return null
	}

	return (
		<Grommet>
			<ResponsiveContext.Consumer>
				{(screenSize) => (
					<>
						<Grid
							id="explore-page-grid"
							columns={['auto', 'auto']}
							rows={['auto', 'auto', 'auto', 'auto', 'auto']}
							gap="small"
							areas={[
								['description', 'description'],
								['options', 'options'],
								...orderBasedOnScreensize(screenSize, ['map', 'nearby']),
							]}
						>
							<Box gridArea="description" className="header-w-bottom-border">
								{locationString}
							</Box>
							<Box gridArea="options" id="map-click-options">
								<p>On map click:</p>
								<Checkbox
									checked={addStory}
									pad="small"
									id="add-story-checkbox"
									label="Add story"
									onChange={(event) => setAddStory(event.target.checked)}
								/>
								<Checkbox
									checked={addChapter}
									disabled
									id="add-chapter-checkbox"
									label="Add chapter"
									onChange={(event) => setAddChapter(event.target.checked)}
								/>
							</Box>
							<Box gridArea="map">
								<MainMap
									location={location ?? DEFAULT_LOCAITON}
									chapters={chapters}
									setLocation={setLocation}
									setNewStoryLocation={setNewStoryLocation}
									setIsCreateStoryOpen={setIsCreateStoryOpen}
								/>
							</Box>
							<Box gridArea="nearby">
								<div
									id="nearby-stories-header"
									className="header-w-bottom-border"
								>
									<h3>Nearby stories</h3>
									<a
										className="use-miles-checkbox"
										onClick={() => setUseMiles(!useMiles)}
									>
										[Use {useMiles ? 'km' : 'miles'}]
									</a>
								</div>
								{listOfIncompleteChapters}
							</Box>
						</Grid>
					</>
				)}
			</ResponsiveContext.Consumer>
			<CreateStoryModal
				closeModal={() => setIsCreateStoryOpen(false)}
				isOpen={addStory && isCreateStoryOpen}
				latitude={newStoryLocation?.[0]}
				longitude={newStoryLocation?.[1]}
			/>
		</Grommet>
	)
}
