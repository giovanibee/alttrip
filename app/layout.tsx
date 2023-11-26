import React from 'react'
// These styles apply to every route in the application
import { Grommet } from 'grommet'
import { Suspense } from 'react'
import { Metadata } from 'next'
import Script from 'next/script'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import 'styles/globals.css'
import { MainHeader } from '@/components/Homepage'
import { Footer, Main } from '@/components/BaseComponents'
import { ReactQueryProvider } from '@/components/Misc'
import Loading from '@/app/loading'
import '@/lib/themes/global.scss'

const poppins = Poppins({
	display: 'swap',
	subsets: ['latin'],
	weight: '400',
})

const title = 'alt trip 📍 🗺️ 📓'
const description = 'story-driven scavenger hunts'

export const metadata: Metadata = {
	title,
	description,
	twitter: {
		card: 'summary_large_image',
		title,
		description,
	},
	metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
	themeColor: 'black',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
					integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					as="image"
					type="image/png"
					href="/public/logo/logo.png"
				/>
				<link
					rel="preload"
					href="/fonts/Aloja-Extended.woff"
					as="font"
					type="font/woff"
					crossOrigin="use-credentials"
				/>
				<link rel="preload" href="/page.scss" />
				<Script
					src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
					integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
					crossOrigin="anonymous"
				/>
				<Script
					src="https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.min.js"
					crossOrigin="anonymous"
				/>
			</head>
			<body className={poppins.className}>
				<ReactQueryProvider>
					<Toaster />
					<Grommet>
						<Suspense fallback={<Loading />}>
							<MainHeader />
							<Main style={{ margin: '56px' }}>{children}</Main>
							<Footer>
								<div
									style={{
										color: 'grey',
										display: 'block',
										margin: '0px 56px 28px auto',
									}}
								>
									⊛ hello.alttrip@gmail.com ⊛ made with love from las vegas, nv,
									usa © 2023
								</div>
							</Footer>
						</Suspense>
					</Grommet>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
