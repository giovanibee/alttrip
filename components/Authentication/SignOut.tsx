'use client'

import { signOut } from 'next-auth/react'

export function SignOut() {
	const logOut = async () => {
		await signOut()
	}
	// TODO: add loading state for parent somehow???
	return <div onClick={logOut}>Sign out</div>
}
