'use client'

import { FormEvent, useMemo, useState } from 'react'
import LoadingDots from '@/components/Loading/loading-dots'
import toast from 'react-hot-toast'
import ky from 'ky'
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const onRegister = async (email: string, name: string, password: string) => {
		const response = await ky.post('/api/auth/user', {
			json: { email, name, password },
		})

		if (response.ok) {
			toast.success('Account created! You can now sign in.')
			return setTimeout(() => router.push('/login'), 2000)
		}

		const { message = 'Unknown error' } = await response.json() as { message?: string }
		return toast.error(message)
	}

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setLoading(true)
		const { email, nameOfUser, password } = event.currentTarget

		console.log('registering', email.value, nameOfUser.value, password.value)
		await onRegister(email.value, nameOfUser.value, password.value)
	}

	const callToAction = useMemo(() => {
		const className = `${loading ? 'loading' : 'not-loading'} something`
		const content = loading ? (
			<LoadingDots color="#808080" />
		) : (
			<p>{'Sign Up'}</p>
		)
		return (
			<button disabled={loading} className={className}>
				{content}
			</button>
		)
	}, [loading])

	return (
		<form onSubmit={onSubmit} className="flex">
			<div>
				<label htmlFor="email" className="block">
					Email Address
				</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="discoclown@email.co"
					autoComplete="email"
					required
					className="border"
				/>
			</div>
			<div>
				<label htmlFor="name" className="block">
					Name
				</label>
				<input
					id="nameOfUser"
					name="nameOfUser"
					placeholder="Sir Cottontail"
					required
					className="border"
				/>
			</div>
			<div>
				<label htmlFor="password" className="block">
					Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					className="border"
				/>
			</div>
			{callToAction}
		</form>
	)
}
