import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { SignOut } from '@/components/Authentication'

export default async function AuthStatus() {
	const session = await getServerSession()
	return (
		<div>
			{session
				? (
					<div>
						<p className="text-stone-200 text-sm">
							Signed in as {session?.user?.name}
						</p>
						<SignOut />
					</div>
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
