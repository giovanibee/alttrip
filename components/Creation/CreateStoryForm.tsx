'use client'

import { useMemo, useState } from 'react'
import { Form } from 'antd'
import ky from 'ky'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { Button, Input } from '@/components/BaseComponents'
import { ChapterForm } from '@/components/Creation'
import { LoadingDots } from '@/components/Loading/LoadingDots'
import { roundNumber } from '@/lib/helpers'

import './CreateStory.scss'

export function CreateStoryForm({
	closeModal = () => {},
	latitude = 0,
	longitude = 0,
}) {
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)
	const numberOfForms = [0]
	const router = useRouter()

	// TODO: usehook???
	// get loaading that way
	const onSubmit = async (event: any) => {
		event.preventDefault()
		setIsLoading(true)
		const {
			storyName: name,
			storyDescription: description,
			...chapters
		} = event.value

		// TODO: VALIDATION!!!
		const story = {
			name,
			description,
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
				json: {
					firstChapter: parsedChapters[0],
					story,
				},
			})
			if (response.status === 200) {
				toast.success('New story created! You can now view it on the map')
				closeModal()
				router.push('/explore')
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
		return <h4>Location: {text}</h4>
	}, [latitude, longitude])

	return (
		<Form className="flex" form={form} onFinish={onSubmit}>
			{location}
			<Form.Item
				name="storyName"
				htmlFor="story name"
				label="Name"
				rules={[
					{
						required: true,
						message: 'Please input a name for your story',
					}
				]}
			>
				<Input
					id="storyName"
					name="storyName"
					placeholder="Under the Mesquite Tree"
				/>
			</Form.Item>
			<Form.Item
				name="storyDescription"
				htmlFor="story description"
				label="Description"
				rules={[
					{
						required: true,
						message: 'Please input a name for your story description',
					}
				]}
			>
				<Input
					id="storyDescription"
					name="storyDescription"
					placeholder="A story about a tortoise that makes friends with a rabbit in the desert."
				/>
			</Form.Item>
			<ChapterForm numberOfForms={numberOfForms} />
			{/* <Button
				label="Add another chapter"
				onClick={() =>
					setNumberOfForms([...numberOfForms, numberOfForms.length + 1])
				}
			/> */}
			{isLoading ? (
				<LoadingDots />
			) : (
				<Button id="sign-up-submit-button" type="submit">
					Create story
				</Button>
			)}
		</Form>
	)
}
