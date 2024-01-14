'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import ky from 'ky'
import { Form, FormExtendedEvent } from 'grommet'
import { useRouter } from 'next/navigation'
import LoadingDots from '@/components/Loading/LoadingDots'
import { Button, FormField, Input } from '@/components/BaseComponents'
import './style.scss'

export function SignUpForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const onSubmit = async (event: FormExtendedEvent) => {
		event.preventDefault()
		setIsLoading(true)
		const { email, nameOfUser, password, confirmPassword, inviteCode } =
			event.value

		if (password !== confirmPassword) {
			toast.error('Passwords do not match.')
			return setIsLoading(false)
		}

		let response

		try {
			response = await ky.post('/api/auth/user', {
				json: { email, name: nameOfUser, password, inviteCode },
			})
			if (response.status === 201) {
				toast.success('Account created! You can now sign in.')
				setTimeout(() => router.push('/login'), 2000)
			}
		} catch (error: unknown) {
			const { response } = (error as { response: { status: number } }) || {}
			switch (response?.status) {
				case 400:
					toast.error('Field is missing')
					break
				case 409:
					toast.error('Email already in use')
					break
				case 401:
					toast.error('Invalid invite code')
					break
				case 410:
					toast.error('Invite code already redeemed')
					break
				default:
					toast.error('Server error')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form onSubmit={onSubmit} className="flex">
			<FormField name="email" htmlFor="email" label="Email address">
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="discoclown@email.co"
					autoComplete="email"
					required
				/>
			</FormField>
			<FormField name="nameOfUser" htmlFor="name" label="Name">
				<Input
					id="nameOfUser"
					name="nameOfUser"
					placeholder="Sir Cottontail"
					required
				/>
			</FormField>
			<FormField name="password" htmlFor="password" label="Password">
				<Input id="password" name="password" type="password" required />
			</FormField>
			<FormField
				name="confirmPassword"
				htmlFor="password"
				label="Confirm password"
			>
				<Input id="password" name="confirmPassword" type="password" required />
			</FormField>
			<FormField name="inviteCode" htmlFor="inviteCode" label="Invite code">
				<Input id="inviteCode" name="inviteCode" type="text" />
			</FormField>
			{isLoading ? (
				<LoadingDots />
			) : (
				<Button
					className={`${isLoading ? 'loading' : 'not-loading'} something`}
					id="sign-up-submit-button"
					type="submit"
				>
					Sign Up
				</Button>
			)}
		</Form>
	)
}
