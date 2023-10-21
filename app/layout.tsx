import React from 'react'
// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AuthStatus from '@/components/auth-status'
import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'
import session from 'app/api/auth/[...nextauth]/[...nextauth]'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
})

const title = 'tomkin - a productivity game'
const description =
	'Does the world need another to-do list app? Probably not. Do you? Possibly'

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
		<html lang="en">
			<body className={inter.variable}>
				<SessionProvider session={session}>
					<Toaster />
					<Suspense fallback="Loading...">
						{/* @ts-expect-error Async Server Component */}
						<AuthStatus />
					</Suspense>
					{children}
				</SessionProvider>
			</body>
		</html>
	)
}
