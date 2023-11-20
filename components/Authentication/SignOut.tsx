'use client'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/BaseComponents'

export default function SignOut() {
	return (
		<Button onClick={() => signOut()}>
			Sign out
		</Button>
	)
}