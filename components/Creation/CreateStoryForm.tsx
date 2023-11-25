'use client'

import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import ky from 'ky'
import { Form, FormExtendedEvent } from 'grommet'
import { useRouter } from 'next/navigation'
import LoadingDots from '@/components/Loading/LoadingDots'
import { Button, FormField, Input, Textarea } from '@/components/BaseComponents'
import './CreateStory.scss'

export default function CreateStoryForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [numberOfForms, setNumberOfForms] = useState([1])
	const router = useRouter()

	const onSubmit = async (event: FormExtendedEvent) => {
		event.preventDefault()
		setIsLoading(true)
		// const { email, nameOfUser, password, confirmPassword, inviteCode } = event.value

		// if (password !== confirmPassword) {
		// 	toast.error('Passwords do not match.')
		// 	return setIsLoading(false)
		// }

		// let response

		// try {
			// response = await ky.post('/api/auth/user', {
			// 	json: { email, name: nameOfUser, password, inviteCode },
			// })
			// if (response.status === 201) {
			// 	toast.success('New story created! You can now view it on the map')
			// setTimeout(() => router.push('/login'), 2000)
			// }
		// } catch (error: Error | any) {
		// 	switch (error?.response?.status) {
		// 		case 400:
		// 			toast.error('Field is missing')
		// 			break
		// 		case 409:
		// 			toast.error('Email already in use')
		// 			break
		// 		case 401:
		// 			toast.error('Invalid invite code')
		// 			break
		// 		case 410:
		// 			toast.error('Invite code already redeemed')
		// 			break
		// 		default:
		// 			toast.error('Server error')
		// 	}
		// } finally {
			setIsLoading(false)
		// }
	}

	const addChapterForm = useMemo(() => {
		return numberOfForms.map((id) =>
			<>
				<h3>Chapter {id}</h3>
				<FormField name="name" htmlFor="name" label="Name">
					<Input
						id={`chapter-name-${id}`}
						name={`chapter-name-${id}`}
						placeholder="Prologue"
						required
					/>
				</FormField>
				<FormField name="description" htmlFor="description" label='Description'>
					<Textarea
						id={`chapter-description-${id}`}
						name={`chapter-description-${id}`}
						placeholder="It was a dark and stormy night..."
						required
					/>
				</FormField>
				<FormField name="details" htmlFor="details" label='Hints / Details'>
					<Textarea
						id={`chapter-details-${id}`}
						name={`chapter-details-${id}`}
						placeholder="What color are the mesquite pods?"
						required
					/>
				</FormField>
				<FormField name="passcode" htmlFor='inviteCode' label="Passcode">
					<Input
						id="passcode"
						name="passcode" 
						type="text"
					/>
				</FormField>
			</>
		)
	}, [numberOfForms])

	return (
		<Form onSubmit={onSubmit} className="flex">
			<FormField name="name" htmlFor="name" label="Name">
				<Input
					id="name"
					name="name"
					placeholder="Under the Mesquite Tree"
					required
				/>
			</FormField>
			<FormField name="description" htmlFor="description" label='Description'>
				<Input
					id="description"
					name="description"
					type="description"
					placeholder="A story about a tortoise that makes friends with a rabbit in the desert."
					autoComplete="description"
					required
				/>
			</FormField>
			{addChapterForm}
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
					Sign Up
				</Button>
				)}
		</Form>
	)
}
