'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from '@/components/BaseComponents'
import { LoginForm } from '@/components/Authentication'
import { useMemo, useState } from 'react'
import { LoadingDots } from '@/components/Loading'

export default function Login() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const isGuest = useSearchParams()?.get?.('type') === 'guest'

	const loginPage = useMemo(() => {
		if (isGuest) {
			setIsLoading(true)
			// redirect to explore page and set session to guest
			console.log('logging in as guest')
			console.log(
				process.env.NEXT_PUBLIC_GUEST_EMAIL,
				process.env.NEXT_PUBLIC_GUEST_PASSWORD,
			)
			signIn('credentials', {
				email: process.env.NEXT_PUBLIC_GUEST_EMAIL,
				password: process.env.NEXT_PUBLIC_GUEST_PASSWORD,
				redirect: false,
			}).then(() => {
				router.push('/explore')
			})
		}
		return (
			<Card id="login-card">
				<CardHeader id="login-card-header">Login ★</CardHeader>
				<CardBody id="login-card-body">
					<LoginForm />
				</CardBody>
				<CardFooter id="login-card-footer">
					Don&apos;t have an account? <Link href="/register">Sign up here</Link>
				</CardFooter>
			</Card>
		)
	}, [isGuest])

	return isLoading ? <LoadingDots /> : loginPage
}
