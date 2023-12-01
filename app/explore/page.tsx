'use client'

import { CreateStoryPage } from '@/components/Creation'

export default function Page() {
	if (typeof window === 'undefined') return null

	return <CreateStoryPage />
}
