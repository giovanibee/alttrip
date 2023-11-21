'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Form, FormExtendedEvent, FormField } from 'grommet'
import { Button, Input } from '@/components/BaseComponents'
import LoadingDots from '@/components/Loading/loading-dots'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const onLogin = async (email: string, password: string) => {
		const response = await signIn('credentials', { email, password })

		if (response?.error) {
			console.error(response?.error)
			setIsLoading(false)
			return toast.error(response?.error.toString())
		} else router.push('/protected')
	}

	const onSubmit = async (event: FormExtendedEvent) => {
		event.preventDefault()
		setIsLoading(true)
		const { email, password } = event.value
		// TODO: validate value
		console.log('email', email)
		console.log('password', password)

		if (!email || !password) {
			setIsLoading(false)
			// return toast.error('Please fill out all fields')
		}
	
		// TODO: add something for it fails
		// return onLogin(email, password)
	}

	return (
		<Form onSubmit={onSubmit}>
			<FormField name='email' htmlFor='email' label='Email address'>
				<Input
					id="text-input-login-email"
					name="email"
					type="email"
					placeholder="discoclown@email.co"
					autoComplete="email"
					required
				/>
			</FormField>
			<FormField name='password' htmlFor='password' label='Password'>
				<Input
					id="password"
					name="password"
					type="password"
					required
				/>
			</FormField>
			<Button
				disabled={isLoading}
				id={`submit-button${isLoading ? '-loading' : ''}`}
				type='submit'
			>
				{isLoading ? <LoadingDots color="#808080" /> : 'Sign In'}
			</Button>
		</Form>
	)
}
