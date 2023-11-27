'use client'

import { LoadingDots } from '@/components/Loading'

export default function Loading() {
	return (
		<div className="loading">
			<LoadingDots color="grey" size="large" />
		</div>
	)
}
