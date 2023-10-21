'use client'

import { FormEvent, useMemo, useState } from 'react'
import { signIn } from 'next-auth/react'
import LoadingDots from '@/components/loading-dots'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Form({ type }: { type: 'login' | 'register' }) {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setLoading(true)
		if (type === 'login') {
			const { error } =
				(await signIn('credentials', {
					redirect: false,
					email: event.currentTarget.email.value,
					password: event.currentTarget.password.value,
				})) || {}
			if (error) {
				console.log(error)
				setLoading(false)
				return toast.error(error.toString())
			}
			router.refresh()
			return router.push('/protected')
		}
		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: event.currentTarget.email.value,
				name: event.currentTarget.nameOfUser.value,
				password: event.currentTarget.password.value,
			}),
		})
		setLoading(false)
		if (response.status === 200) {
			toast.success('Account created! Redirecting to login...')
			return setTimeout(() => router.push('/login'), 1000)
		}
		const { error } = await response.json()
		toast.error(error)
	}

	const callToAction = useMemo(() => {
		const className = `${loading ? 'loading' : 'not-loading'} something`
		const content = loading ? (
			<LoadingDots color="#808080" />
		) : (
			<p>{type === 'login' ? 'Sign In' : 'Sign Up'}</p>
		)
		return (
			<button disabled={loading} className={className}>
				{content}
			</button>
		)
	}, [loading, type])

	const additionalText = useMemo(
		() =>
			type === 'login' ? (
				<p className="text-center text-sm text-gray-600">
					{"Don't have an account? "}
					<Link href="/register">Sign up</Link>
					{' for free.'}
				</p>
			) : (
				<p className="text-center text-sm text-gray-600">
					Already have an account? <Link href="/login">Sign in</Link> instead.
				</p>
			),
		[type],
	)

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
			{type !== 'login' && (
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
			)}
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
			{additionalText}
		</form>
	)
}
