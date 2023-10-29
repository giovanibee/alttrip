import React from 'react'
// These styles apply to every route in the application
import { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import 'styles/globals.css'
import AuthStatus from 'components/auth-status'
import { ReactQueryProvider } from 'components'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
})

const title = 'happy map :)'
const description = 'A local bucketlist for places that make you happy (:'

export const metadata: Metadata = {
	title,
	description,
	twitter: {
		card: 'summary_large_image',
		title,
		description,
	},
	metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
	themeColor: '#FFF',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ReactQueryProvider>
			<html lang="en">
				<head>
					<link
						rel="stylesheet"
						href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
						integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
						crossOrigin=""
					/>
					<Script
						src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
						integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
						crossOrigin=""
					/>
				</head>
				<body className={inter.variable}>
					<Toaster />
					<Suspense fallback="Loading...">
						<AuthStatus />
					</Suspense>
					{children}
				</body>
			</html>
		</ReactQueryProvider>
	)
}
