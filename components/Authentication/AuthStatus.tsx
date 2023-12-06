'use server'

import { Suspense } from 'react'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { Menu } from '@/components/BaseComponents'
import { SignOut } from '@/components/Authentication'
import './style.scss'

export default async function AuthStatus() {
	const session = await getServerSession()
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div id="auth-status">
				{session?.user?.name ? (
						<div> {session?.user?.name} </div>
					// <Menu
					// 	id="auth-status-signed-in"
					// 	items={[
					// 		{
					// 			label: <SignOut />,
					// 			key: 'sign-out',
					// 		},
					// 	]}
					// 	theme='dark'
					// 	title={session?.user?.name || 'Unknown'}
					// />
				) : (
					<div id="auth-status-options">
						<Link href="/login">Login</Link>
						<Link href="/register">Sign Up</Link>
					</div>
				)}
			</div>
		</Suspense>
	)
}
