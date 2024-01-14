'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Menu } from '@/components/BaseComponents'
import { SignOut } from '@/components/Authentication'
import './style.scss'

export function AuthStatus() {
	const { data: session } = useSession()
	return (
		<div id="auth-status-options">
			{session?.user?.name ? (
				<>
					<Link href="/explore">Explore</Link>
					<Menu
						dropBackground="black"
						label={session?.user?.name || 'Unknown'}
						id="auth-status-signed-in"
						items={[{ label: <SignOut /> }]}
						justifyContent="end"
						margin={{ top: 'auto', bottom: '0' }}
					/>
				</>
			) : (
				<>
					<Link href={{ pathname: '/login', query: { type: 'guest' } }}>
						Guest
					</Link>
					<div className="divider"> | </div>
					<Link href="/login">Login</Link>
					<Link href="/register">Sign Up</Link>
				</>
			)}
		</div>
	)
}
