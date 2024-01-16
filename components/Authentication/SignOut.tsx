'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { LoadingDots } from '../Loading'

export function SignOut() {
	const [isLoading, setIsLoading] = useState(false)
	const logOut = async () => {
		setIsLoading(true)
		await signOut()
		setIsLoading(false)
	}
	return isLoading ? <LoadingDots /> : <div onClick={logOut}>Sign out</div>
}
