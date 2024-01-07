'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Menu } from '@/components/BaseComponents'
import { SignOut } from '@/components/Authentication'
import './style.scss'

export async function AuthStatus() {
	const { data: session } = useSession()
	return (
		<div id="auth-status">
			{session?.user?.name ? (
				<Menu
					dropBackground="black"
					label={session?.user?.name || 'Unknown'}
					id="auth-status-signed-in"
					items={[
						{
							label: <SignOut />,
						},
					]}
					justifyContent="end"
					margin={{
						top: 'auto',
						bottom: '0',
					}}
				/>
			) : (
				<div id="auth-status-options">
					<Link href={{ pathname: '/login', query: { type: 'guest' } }}>
						Guest
					</Link>
					<Link href="/login">Login</Link>
					<Link href="/register">Sign Up</Link>
				</div>
			)}
		</div>
	)
}
