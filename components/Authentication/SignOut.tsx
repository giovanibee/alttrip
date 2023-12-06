'use client'

import { signOut } from 'next-auth/react'

export function SignOut() {
	return <div onClick={() => signOut()}>Sign out</div>
}
