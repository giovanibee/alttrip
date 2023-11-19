'use client'
import { signOut } from 'next-auth/react'
import { Button } from 'components'

export default function SignOut() {
	return (
		<Button onClick={() => signOut()}>
			Sign out
		</Button>
	)
}