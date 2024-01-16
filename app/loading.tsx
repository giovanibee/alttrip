'use client'

import { LoadingDots } from '@/components/Loading'

export default function Loading() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<LoadingDots color="grey" size="large" />
		</div>
	)
}
