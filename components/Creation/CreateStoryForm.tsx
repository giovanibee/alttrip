'use client'

import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import ky from 'ky'
import { Form, FormExtendedEvent } from 'grommet'
import { useRouter } from 'next/navigation'
import LoadingDots from '@/components/Loading/LoadingDots'
import { Button, FormField, Input } from '@/components/BaseComponents'
import { roundNumber } from '@/lib/helpers'
import ChapterForm from './ChapterForm'
import './CreateStory.scss'

const CreateStoryForm = ({
	latitude = 0,
	longitude = 0,
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [numberOfForms, setNumberOfForms] = useState([0])
	const router = useRouter()

	const onSubmit = async (event: FormExtendedEvent) => {
		event.preventDefault()
		setIsLoading(true)
		const {
			storyName: name,
			storyDescription: description,
			...chapters
		} = event.value
		console.log(event.value)
		
		// TODO: VALIDATION!!!
		const story = {
			name,
			description,
			latitude,
			longitude,
		}

		const parsedChapters: { [key: string]: any }[] = []
		Object.keys(chapters).forEach((key) => {
			const [type, idString] = key.split('-') as [string, string]
			const id = parseInt(idString)
			if (!parsedChapters[id]) parsedChapters[id] = {}
			parsedChapters[id][type] = chapters[key]
			parsedChapters[id].latitude = latitude
			parsedChapters[id].longitude = longitude
			parsedChapters[id].order = id
		})

		let response

		try {
			response = await ky.post('/api/auth/stories', {
				json: { story, chapters: parsedChapters },
			})
			if (response.status === 200) {
				toast.success('New story created! You can now view it on the map')
			setTimeout(() => router.push('/login'), 2000)
			}
		} catch (error: Error | any) {
			switch (error?.response?.status) {
				case 422:
					toast.error('Field is missing')
					break
				default:
					toast.error('Server error')
			}
		} finally {
			setIsLoading(false)
		}
	}

	const location = useMemo(() => {
		if (!latitude || !longitude) return <h4>Location unknown</h4>
		const text = `${roundNumber(latitude)}, ${roundNumber(longitude)}`
		return (
			<h4>
				Location: {text}
			</h4>
		)
	}, [latitude, longitude])

	return (
		<Form onSubmit={onSubmit} className="flex">
			{location}
			<FormField name="storyName" htmlFor="story name" label="Name">
				<Input
					id="storyName"
					name="storyName"
					placeholder="Under the Mesquite Tree"
					required
				/>
			</FormField>
			<FormField name="storyDescription" htmlFor="story description" label='Description'>
				<Input
					id="storyDescription"
					name="storyDescription"
					placeholder="A story about a tortoise that makes friends with a rabbit in the desert."
					required
				/>
			</FormField>
			<ChapterForm numberOfForms={numberOfForms} />
			<Button
				label="Add another chapter"
				onClick={() => setNumberOfForms(
					[...numberOfForms, numberOfForms.length + 1]
				)}
			/>
			{isLoading
				? <LoadingDots />
				: (
				<Button
					className={`${isLoading ? 'loading' : 'not-loading'} something`}
					id='sign-up-submit-button'
					type='submit'
				>
					Create story
				</Button>
				)}
		</Form>
	)
}

export default CreateStoryForm