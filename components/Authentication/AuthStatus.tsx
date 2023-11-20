import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { Menu } from '@/components/BaseComponents'
import { SignOut } from '@/components/Authentication'
import './AuthStatus.scss'

export default async function AuthStatus() {
	const session = await getServerSession()
	return (
		<div>
			{session?.user?.name
				? (
					<Menu
						dropBackground='black'
						label={session?.user?.name || 'Unknown'}
						id='menu-auth-status'
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
					<Link href="app/login">
						Login
					</Link>
				)
			}
		</div>
	)
}
