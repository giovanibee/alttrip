'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { ResponsiveContext } from 'grommet'

import { LatLngTuple } from '@/lib/types/geospatial'
import { useFetchChapters } from '@/lib/hooks/chapters'
import { Box, Checkbox, Grid, Grommet } from '@/components/BaseComponents'
import { CreateStoryModal } from '@/components/Creation'
import { roundNumber } from '@/lib/helpers'
import './CreateStoryPage.scss'

const MainMap = dynamic(() => import('components/Creation/Maps/MainMap'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
})

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

	const orderBasedOnScreensize = (screenSize: string, options: string[]) => {
		if (['xlarge', 'large'].includes(screenSize)) return [options]
		return options.map((option) => [option, option])
	}

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
								<MainMap
									location={location}
									setLocation={setLocation}
									chapters={chapters}
									setNewStoryLocation={setNewStoryLocation}
									setIsCreateStoryOpen={setIsCreateStoryOpen}
								/>
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
