'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Form, FormExtendedEvent } from 'grommet'
import { Button, FormField, Input } from '@/components/BaseComponents'
import LoadingDots from '@/components/Loading/LoadingDots'
import { useRouter } from 'next/navigation'
import './style.scss'

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const onSubmit = (event: FormExtendedEvent) => {
		event.preventDefault()
		setIsLoading(true)
		const { email, password = '' } = event.value as {
			email: string
			password: string
		}

		if (password?.length < 8) {
			toast.error('Password must be at least 8 characters long.')
			return setIsLoading(false)
		}

		signIn('credentials', {
			email,
			password,
			redirect: false,
		}).then((response) => {
			setIsLoading(false)
			if (!response?.error) return router.push('/explore')

			console.error(response?.error)
			toast.error('Invalid login credentials--please try again.')
		})
	}

	return (
		<Form onSubmit={onSubmit}>
			<FormField name="email" htmlFor="email" label="Email address">
				<Input
					id="text-input-login-email"
					name="email"
					type="email"
					placeholder="discoclown@email.co"
					autoComplete="email"
					required
				/>
			</FormField>
			<FormField name="password" htmlFor="password" label="Password">
				<Input id="password" name="password" type="password" required />
			</FormField>
			{isLoading ? (
				<LoadingDots />
			) : (
				<Button
					alignSelf="end"
					disabled={isLoading}
					id="login-submit-button"
					type="submit"
				>
					Sign In
				</Button>
			)}
		</Form>
	)
}
