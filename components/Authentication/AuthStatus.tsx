import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { Menu } from '@/components/BaseComponents'
import { SignOut } from '@/components/Authentication'
import './style.scss'

export default async function AuthStatus() {
	const session = await getServerSession()
	return (
		<div id="auth-status">
			{session?.user?.name
				? (
					<Menu
						dropBackground='black'
						label={session?.user?.name || 'Unknown'}
						id='auth-status-signed-in'
						items={[
							{
								label: <SignOut />,
							},
						]}
						justifyContent='end'
						margin={{
							top: 'auto',
							bottom: '0',
						}}
					/>
				)
				: (
						<div id='auth-status-options'>
							<Link href="/login">
								Login
							</Link>
							<Link href="/register">
								Sign Up
							</Link>
						</div>
				)}
		</div>
	)
}
